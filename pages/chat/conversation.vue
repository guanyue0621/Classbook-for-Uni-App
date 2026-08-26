<script setup>
import { ref, nextTick } from 'vue'
import { onLoad, onShow, onHide, onUnload } from '@dcloudio/uni-app'
import { get, post, upload, uploadFileObj, getBase } from '../../utils/request.js'
import { store, setUnreadChat } from '../../store/index.js'
import { localNotify } from '../../utils/push.js'
import { connectChatWS, addChatWSListener, removeChatWSListener } from '../../utils/chatws.js'
import BgLayer from '../../components/BgLayer.vue'
import Icon from '../../components/Icon.vue'

const peerNo = ref('')
const peerName = ref('')
const isGroup = ref(false)
const messages = ref([])
const input = ref('')
const sending = ref(false)
const loading = ref(false)
const err = ref('')
const scrollInto = ref('')
const seenIds = ref(new Set())
const count = ref(0)          // 已加载消息总数（用于增量 since）
const panelOpen = ref('')     // '' | 'emoji' | 'media'
let scrollTimer = null
let wsListener = null

const EMOJI = ['😀','😂','🤣','😊','😍','🥰','😘','😜','😎','🤩','😭','😢','😤','😡','🥺','😱','🤔','😴','🤯','🥳','👍','👎','👏','🙌','🤝','🙏','💪','👋','🤙','❤️','🧡','💛','💚','💙','💜','🖤','💔','💕','💯','🔥','✨','🎉','🎊','🎁','🎵','🎶','🏆','🍕','🍔','🍣','🍜','🍦','🎂','☕','🍺','🥂','🍷','🌹','🌈','🐶','🐱','🐰','🦊','🐼','🐨','🦁','🐸','🦄','🐙','😈','👻','💀','🤡','👽','🤖','💩','🙈','🙉','🙊']

onLoad((q) => {
  peerNo.value = (q && q.no) || ''
  peerName.value = (q && q.name) ? decodeURIComponent(q.name) : ''
  isGroup.value = String(peerNo.value).indexOf('group_') === 0
  uni.setNavigationBarTitle({ title: peerName.value || (isGroup.value ? '群聊' : '消息') })
})

onShow(async () => {
  await loadHistory(true)
  // 实时推送：建立 WebSocket 并注册监听（取代前端轮询）
  connectChatWS()
  if (wsListener) removeChatWSListener(wsListener)
  wsListener = addChatWSListener(onWs)
})

onHide(() => { if (wsListener) { removeChatWSListener(wsListener); wsListener = null } })
onUnload(() => {
  if (wsListener) { removeChatWSListener(wsListener); wsListener = null }
  if (scrollTimer) clearTimeout(scrollTimer)
})

// 收到服务端实时推送的新消息
function onWs(d) {
  if (!d) return
  // 撤回事件：实时从当前会话移除该气泡（双方同步）
  if (d.type === 'withdraw') {
    const id = d.id
    const had = messages.value.some(m => m.id === id)
    if (had) {
      messages.value = messages.value.filter(m => m.id !== id)
      scrollToBottom()
      uni.showToast({ title: '对方撤回了一条消息', icon: 'none' })
    }
    return
  }
  if (d.type !== 'chat') return
  const m = d.msg
  if (!m) return
  const myNo = (store.user && store.user.student_no) || ''
  // 后端广播的 d.to 永远是原始收件人；会话的另一方才是匹配当前视图的 key。
  // 群聊固定为群号；单聊为「除自己外的那一方」（接收时 d.to 是自己、d.from 是对方；
  // 多端同步时 d.from 是自己、d.to 是对方）。否则接收方打开的会话收不到实时刷新。
  const isGroup = String(d.to).indexOf('group_') === 0
  const peer = isGroup ? d.to : (d.from === myNo ? d.to : d.from)
  if (peer === peerNo.value) {
    // 正在看这个会话：直接追加（按 id 去重，不重复通知）
    if (!seenIds.value.has(m.id)) {
      seenIds.value.add(m.id)
      messages.value.push(m)
      scrollToBottom()
    }
  } else if (m.from !== myNo) {
    // 别的会话来消息：角标 +1，并轻提示
    setUnreadChat((store.unreadChat || 0) + 1)
    localNotify(peerNameOf(peer), contentPreview(m.content))
  }
}
function peerNameOf(peer) {
  if (String(peer).indexOf('group_') === 0) return '群聊'
  return peer
}

async function loadHistory(initial) {
  if (!peerNo.value) return
  if (initial) { loading.value = true; err.value = '' }
  try {
    let url = '/api/chat/msgs?to=' + encodeURIComponent(peerNo.value)
    if (!initial && count.value > 0) url += '&since=' + count.value
    const r = await get(url)
    if (r.data && r.data.ok) {
      const arr = r.data.msgs || []
      const myNo = (store.user && store.user.student_no) || ''
      if (initial) {
        messages.value = arr
        arr.forEach(m => seenIds.value.add(m.id))   // 首屏全部标为已见基线
      } else {
        let changed = false
        arr.forEach(m => {
          if (!seenIds.value.has(m.id)) {
            seenIds.value.add(m.id)
            messages.value.push(m)
            changed = true
            if (m.from !== myNo) localNotify(peerName.value || peerNo.value, contentPreview(m.content))
          }
        })
        if (changed) scrollToBottom()
      }
      if (r.data.peer_name && !peerName.value) {
        peerName.value = r.data.peer_name
        uni.setNavigationBarTitle({ title: peerName.value })
      }
      count.value = r.data.total || count.value
    } else if (r.statusCode === 401) {
      uni.reLaunch({ url: '/pages/login/login' })
    } else if (initial) {
      err.value = '加载失败'
    }
  } catch (e) { if (initial) err.value = '连接超时' }
  if (initial) loading.value = false
}

async function sendText() {
  const text = (input.value || '').trim()
  if (!text || sending.value) return
  sending.value = true
  input.value = ''
  closePanel()
  try {
    const r = await post('/api/chat/send', { to: peerNo.value, message: text })
    const d = r.data || {}
    if (d.ok && d.msg) {
      if (!seenIds.value.has(d.msg.id)) { seenIds.value.add(d.msg.id); messages.value.push(d.msg) }
      count.value = d.total || count.value
      scrollToBottom()
    } else {
      uni.showToast({ title: d.msg || '发送失败', icon: 'none' })
      input.value = text
    }
  } catch (e) {
    uni.showToast({ title: '网络错误', icon: 'none' })
    input.value = text
  }
  sending.value = false
}

async function sendContent(message) {
  if (sending.value) return
  sending.value = true
  try {
    const r = await post('/api/chat/send', { to: peerNo.value, message })
    const d = r.data || {}
    if (d.ok && d.msg) {
      if (!seenIds.value.has(d.msg.id)) { seenIds.value.add(d.msg.id); messages.value.push(d.msg) }
      count.value = d.total || count.value
      scrollToBottom()
    } else {
      uni.showToast({ title: d.msg || '发送失败', icon: 'none' })
    }
  } catch (e) {
    uni.showToast({ title: '网络错误', icon: 'none' })
  }
  sending.value = false
}

function pickMedia(type) {
  closePanel()
  // #ifdef APP-PLUS
  if (type === 'file') {
    uni.showToast({ title: 'App 端暂仅支持图片/视频', icon: 'none' })
    return
  }
  plus.gallery.pick((path) => doUpload(path, type), (e) => {}, { filter: type === 'image' ? 'image' : (type === 'video' ? 'video' : 'none'), multiple: false })
  // #endif
  // #ifndef APP-PLUS
  if (type === 'image') {
    uni.chooseImage({
      count: 1,
      success: (res) => {
        // #ifdef H5
        const file = res.tempFiles && res.tempFiles[0] && res.tempFiles[0].file
        if (file) doUploadH5(file)
        // #endif
        // #ifndef H5
        const f = res.tempFilePaths && res.tempFilePaths[0]
        if (f) doUpload(f, type)
        // #endif
      },
      fail: () => {}
    })
  } else if (type === 'video') {
    uni.chooseVideo({
      success: (res) => {
        // #ifdef H5
        const file = res.tempFiles && res.tempFiles[0] && res.tempFiles[0].file
        if (file) doUploadH5(file)
        // #endif
        // #ifndef H5
        if (res.tempFilePath) doUpload(res.tempFilePath, type)
        // #endif
      },
      fail: () => {}
    })
  } else {
    // #ifdef H5
    const inp = document.createElement('input')
    inp.type = 'file'
    inp.onchange = () => { const f = inp.files && inp.files[0]; if (f) doUploadH5(f) }
    inp.click()
    // #endif
    // #ifndef H5
    uni.showToast({ title: '该平台暂不支持选择文件', icon: 'none' })
    // #endif
  }
  // #endif
}

// H5：用原生 File 对象上传（<input type=file> 或 chooseImage/Video 的 tempFiles[].file）
async function doUploadH5(file) {
  uni.showLoading({ title: '上传中…' })
  try {
    const r = await uploadFileObj('/api/chat/upload', file, {})
    const d = r.data || {}
    if (d.ok) {
      const mc = { type: d.type, url: d.url, name: d.name }
      if (d.size) mc.size = d.size
      await sendContent(mc)
    } else {
      uni.showToast({ title: (d.msg || '上传失败'), icon: 'none' })
    }
  } catch (e) {
    uni.showToast({ title: '上传失败', icon: 'none' })
  }
  uni.hideLoading()
}

async function doUpload(path, type) {
  uni.showLoading({ title: '上传中…' })
  try {
    const r = await upload('/api/chat/upload', [{ name: 'file', uri: path }], {})
    const d = r.data || {}
    if (d.ok) {
      const mc = { type: d.type, url: d.url, name: d.name }
      if (d.size) mc.size = d.size
      await sendContent(mc)
    } else {
      uni.showToast({ title: (d.msg || '上传失败'), icon: 'none' })
    }
  } catch (e) {
    uni.showToast({ title: '上传失败', icon: 'none' })
  }
  uni.hideLoading()
}

// ── 长按菜单：撤回 / 举报 ──
const menuShow = ref(false)
const menuX = ref(0)
const menuY = ref(0)
const menuMsg = ref(null)
let touchTimer = null

function onMsgLongPress(m, e) {
  menuMsg.value = m
  const x = (e && e.touches && e.touches[0]) ? e.touches[0].clientX : (e && e.clientX || 100)
  const y = (e && e.touches && e.touches[0]) ? e.touches[0].clientY : (e && e.clientY || 100)
  menuX.value = Math.min(x, (uni.getSystemInfoSync().windowWidth || 360) - 180)
  menuY.value = Math.min(y, (uni.getSystemInfoSync().windowHeight || 640) - 160)
  menuShow.value = true
}
function onTouchStart(m, e) { touchTimer = setTimeout(() => onMsgLongPress(m, e), 600) }
function onTouchEnd() { if (touchTimer) { clearTimeout(touchTimer); touchTimer = null } }
function closeMenu() { menuShow.value = false; menuMsg.value = null }

async function doWithdraw() {
  const m = menuMsg.value; closeMenu()
  if (!m) return
  try {
    const r = await post('/api/chat/withdraw', { to: peerNo.value, msgid: m.id })
    if (r.data && r.data.ok) {
      messages.value = messages.value.filter(x => x.id !== m.id)
      uni.showToast({ title: '已撤回', icon: 'none' })
    } else uni.showToast({ title: '撤回失败', icon: 'none' })
  } catch (e) { uni.showToast({ title: '网络异常', icon: 'none' }) }
}
async function doReport() {
  const m = menuMsg.value; closeMenu()
  if (!m) return
  try {
    const r = await post('/api/chat/report', { target_uid: m.from, msgid: m.id })
    if (r.data && r.data.ok) uni.showToast({ title: '举报已提交', icon: 'none' })
    else uni.showToast({ title: '举报失败', icon: 'none' })
  } catch (e) { uni.showToast({ title: '网络异常', icon: 'none' }) }
}

// ── 面板 ──
function togglePanel(name) { panelOpen.value = panelOpen.value === name ? '' : name }
function closePanel() { panelOpen.value = '' }
function sendEmoji(e) { closePanel(); sendContent({ type: 'emoji', emoji: e }) }

function scrollToBottom() {
  scrollInto.value = ''
  nextTick(() => {
    if (scrollTimer) clearTimeout(scrollTimer)
    scrollTimer = setTimeout(() => { scrollInto.value = 'msg-bottom' }, 50)
  })
}

function goBack() {
  uni.navigateBack({ fail: () => { uni.reLaunch({ url: '/pages/chat/chat' }) } })
}

function fmtTime(ts) {
  if (!ts) return ''
  const d = new Date(ts * 1000)
  const now = new Date()
  if (d.toDateString() === now.toDateString()) {
    return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0')
  }
  return (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0')
}

function isMe(m) {
  const myNo = (store.user && store.user.student_no) || ''
  return m.from === myNo
}
function previewImg(url) {
  if (!url) return
  uni.previewImage({ urls: [url], current: url })
}
function openFile(url) {
  if (!url) return
  // #ifdef APP-PLUS
  plus.runtime.openURL(url)
  // #endif
  // #ifndef APP-PLUS
  uni.openDocument({
    filePath: url,
    showMenu: true,
    fail: () => { uni.showToast({ title: '暂不支持预览该文件', icon: 'none' }) }
  })
  // #endif
}
function contentPreview(c) {
  if (typeof c === 'string') return c
  if (c && c.type === 'emoji') return c.emoji || '[表情]'
  if (c && c.type === 'image') return '[图片]'
  if (c && c.type === 'video') return '[视频]'
  if (c && c.type === 'file') return '[文件] ' + (c.name || '')
  return '[消息]'
}
// 媒体地址解析：后端返回的是相对路径（/chat_uploads/...），
// App 端 <image>/<video> 需要绝对地址（带主机），H5 同源可直接用。
function mediaUrl(u) {
  if (!u) return u
  if (/^https?:\/\//.test(u)) return u
  const b = (getBase() || '').replace(/\/+$/, '')
  if (b) return b + u
  return u
}
function nickOf(m) {
  const myNo = (store.user && store.user.student_no) || ''
  if (m.from === myNo) return '我'
  return m.nick || (isGroup.value ? '群友' : (peerName.value || '对方'))
}
</script>

<template>
  <view class="page">
    <BgLayer />
    <view class="hd">
      <view class="back" hover-class="back-h" @click="goBack">
        <Icon name="back" :size="40" color="#14141A" />
      </view>
      <text class="hd-name">{{ peerName || (isGroup ? '群聊' : peerNo) }}</text>
      <view class="hd-spacer" />
    </view>

    <view v-if="loading && !messages.length" class="tip">加载中…</view>
    <view v-else-if="err && !messages.length" class="tip err" @click="loadHistory(true)">{{ err }}（点击重试）</view>
    <scroll-view v-else class="msg-list" scroll-y :scroll-into-view="scrollInto" :scroll-with-animation="true" @click="closePanel">
      <view class="msg-list-inner">
        <view v-for="m in messages" :key="m.id" class="msg" :class="isMe(m) ? 'me' : 'other'"
              @longpress="onMsgLongPress(m, $event)" @touchstart="onTouchStart(m, $event)" @touchend="onTouchEnd">
          <view v-if="!isMe(m) && isGroup" class="nick">{{ nickOf(m) }}</view>
          <view class="bubble" :class="isMe(m) ? 'bubble-me' : 'bubble-other'">
            <!-- 文本 -->
            <text v-if="typeof m.content === 'string'" class="text">{{ m.content }}</text>
            <!-- 表情 -->
            <text v-else-if="m.content && m.content.type === 'emoji'" class="emoji">{{ m.content.emoji }}</text>
            <!-- 图片 -->
            <image v-else-if="m.content && m.content.type === 'image'" class="img" :src="mediaUrl(m.content.url)" mode="widthFix" @click="previewImg(mediaUrl(m.content.url))" />
            <!-- 视频 -->
            <video v-else-if="m.content && m.content.type === 'video'" class="video" :src="mediaUrl(m.content.url)" controls playsinline />
            <!-- 文件 -->
            <view v-else-if="m.content && m.content.type === 'file'" class="file" @click="openFile(mediaUrl(m.content.url))">
              <text class="file-ico">📎</text>
              <view class="file-meta">
                <text class="file-name">{{ m.content.name || '文件' }}</text>
                <text v-if="m.content.size" class="file-size">{{ Math.round(m.content.size / 1024) }}KB</text>
              </view>
            </view>
            <text v-else class="text">[消息]</text>
          </view>
          <text class="ts">{{ fmtTime(m.time) }}</text>
        </view>
        <view id="msg-bottom" class="anchor" />
      </view>
    </scroll-view>

    <!-- 工具栏 -->
    <view class="toolbar glass" @click="closePanel">
      <view class="tb" hover-class="tb-h" @click.stop="togglePanel('emoji')">
        <Icon name="smile" :size="40" color="#5b5750" />
      </view>
      <input class="input" v-model="input" placeholder="输入消息…" confirm-type="send" @confirm="sendText" @focus="closePanel" />
      <view class="tb" hover-class="tb-h" @click.stop="togglePanel('media')">
        <Icon name="plus" :size="40" color="#5b5750" />
      </view>
      <view class="send-btn" :class="{ disabled: sending || !input.trim() }" @click.stop="sendText">
        <text class="send-text">{{ sending ? '…' : '发送' }}</text>
      </view>
    </view>

    <!-- 表情面板 -->
    <view v-if="panelOpen === 'emoji'" class="ext-panel">
      <scroll-view class="emoji-grid" scroll-y>
        <view v-for="e in EMOJI" :key="e" class="emj" @click="sendEmoji(e)">{{ e }}</view>
      </scroll-view>
    </view>
    <!-- 媒体面板 -->
    <view v-if="panelOpen === 'media'" class="ext-panel">
      <view class="media-grid">
        <view class="mp-btn" @click="pickMedia('image')"><view class="ico">🖼️</view><text class="lbl">图片</text></view>
        <view class="mp-btn" @click="pickMedia('video')"><view class="ico">🎬</view><text class="lbl">视频</text></view>
        <view class="mp-btn" @click="pickMedia('file')"><view class="ico">📁</view><text class="lbl">文件</text></view>
      </view>
    </view>

    <!-- 长按菜单 -->
    <view v-if="menuShow" class="ctx-mask" @click="closeMenu" @touchstart="closeMenu">
      <view class="ctx-menu" :style="{ left: menuX + 'px', top: menuY + 'px' }" @click.stop @touchstart.stop>
        <view class="ctx-item" v-if="menuMsg && isMe(menuMsg)" @click="doWithdraw">↩️ 撤回</view>
        <view class="ctx-sep" v-if="menuMsg && isMe(menuMsg)" />
        <view class="ctx-item danger" @click="doReport">⚠️ 举报</view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.page { min-height: 100vh; background: transparent; position: relative; z-index: 1; display: flex; flex-direction: column; }
.hd { position: relative; z-index: 2; display: flex; align-items: center; gap: 8rpx; padding: calc(16rpx + env(safe-area-inset-top)) 20rpx 16rpx; background: rgba(255,255,255,.62); -webkit-backdrop-filter: blur(16px) saturate(1.35); backdrop-filter: blur(16px) saturate(1.35); border-bottom: 1px solid rgba(255,255,255,.6); }
.back { width: 64rpx; height: 64rpx; border-radius: 16rpx; display: flex; align-items: center; justify-content: center; }
.back:active, .back-h { background: rgba(0,0,0,.06); }
.hd-name { flex: 1; text-align: center; font-size: 32rpx; font-weight: 700; color: #14141A; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hd-spacer { width: 64rpx; }
.tip { text-align: center; color: #7C7A74; font-size: 28rpx; padding: 80rpx 0; }
.tip.err { color: #E11D48; }
.msg-list { flex: 1; height: calc(100vh - 140rpx - env(safe-area-inset-top) - env(safe-area-inset-bottom)); }
.msg-list-inner { padding: 24rpx 24rpx 40rpx; display: flex; flex-direction: column; gap: 20rpx; }
.anchor { height: 2rpx; }
.msg { display: flex; flex-direction: column; max-width: 82%; }
.msg.me { align-self: flex-end; align-items: flex-end; }
.msg.other { align-self: flex-start; align-items: flex-start; }
.nick { font-size: 22rpx; color: #7C7A74; margin-bottom: 6rpx; padding-left: 4rpx; }
.bubble { padding: 18rpx 24rpx; border-radius: 20rpx; max-width: 100%; }
.bubble-me { background: linear-gradient(135deg, #E11D48, #E0673F); color: #fff; border-bottom-right-radius: 6rpx; box-shadow: 0 4rpx 16rpx -8rpx rgba(225,29,72,.5); }
.bubble-other { background: rgba(255,255,255,.7); -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,.65); color: #14141A; border-bottom-left-radius: 6rpx; box-shadow: 0 4rpx 16rpx -8rpx rgba(31,38,80,.2); }
.text { font-size: 28rpx; line-height: 1.5; word-break: break-word; }
.emoji { font-size: 56rpx; line-height: 1.1; }
.img { max-width: 320rpx; border-radius: 10rpx; }
.video { width: 360rpx; border-radius: 10rpx; background: #000; }
.file { display: flex; align-items: center; gap: 14rpx; background: rgba(240,247,255,.6); border: 1px solid rgba(208,232,255,.5); border-radius: 12rpx; padding: 14rpx 18rpx; min-width: 240rpx; }
.file-ico { font-size: 40rpx; }
.file-name { font-size: 26rpx; color: #14141A; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block; max-width: 320rpx; }
.file-size { font-size: 22rpx; color: #7C7A74; }
.ts { font-size: 20rpx; color: #b8b4ac; margin-top: 6rpx; }
/* ── 工具栏 ── */
.toolbar { display: flex; align-items: center; gap: 12rpx; padding: 14rpx 20rpx; padding-bottom: calc(14rpx + env(safe-area-inset-bottom)); border-top: 1px solid rgba(255,255,255,.6); background: rgba(255,255,255,.55); -webkit-backdrop-filter: blur(16px) saturate(1.35); backdrop-filter: blur(16px) saturate(1.35); }
.glass { }
.tb { width: 64rpx; height: 64rpx; border-radius: 14rpx; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.tb:active, .tb-h { background: rgba(0,0,0,.06); }
.input { flex: 1; height: 72rpx; background: rgba(255,255,255,.66); border: 1.5px solid rgba(255,255,255,.8); border-radius: 14rpx; padding: 0 22rpx; font-size: 28rpx; color: #14141A; }
.send-btn { min-width: 100rpx; height: 72rpx; border-radius: 14rpx; background: linear-gradient(135deg, #E11D48, #E0673F); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: transform .12s ease, opacity .12s ease; }
.send-btn:active { transform: scale(.95); }
.send-btn.disabled { opacity: .4; }
.send-text { color: #fff; font-size: 28rpx; font-weight: 700; }
/* ── 面板 ── */
.ext-panel { background: rgba(255,255,255,.82); -webkit-backdrop-filter: blur(18px); backdrop-filter: blur(18px); border-top: 1px solid rgba(255,255,255,.6); max-height: 280rpx; padding: 16rpx; }
.emoji-grid { display: flex; flex-wrap: wrap; gap: 4rpx; }
.emj { width: 72rpx; height: 72rpx; font-size: 40rpx; display: flex; align-items: center; justify-content: center; border-radius: 12rpx; }
.emj:active { background: rgba(0,0,0,.06); }
.media-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24rpx; }
.mp-btn { display: flex; flex-direction: column; align-items: center; gap: 10rpx; }
.mp-btn .ico { width: 96rpx; height: 96rpx; border-radius: 22rpx; background: rgba(255,255,255,.6); display: flex; align-items: center; justify-content: center; font-size: 44rpx; box-shadow: 0 4rpx 14rpx -8rpx rgba(0,0,0,.3); }
.mp-btn .lbl { font-size: 22rpx; color: #5b5750; }
/* ── 长按菜单 ── */
.ctx-mask { position: fixed; inset: 0; z-index: 300; background: rgba(0,0,0,.25); }
.ctx-menu { position: fixed; z-index: 301; background: rgba(255,255,255,.92); -webkit-backdrop-filter: blur(18px); backdrop-filter: blur(18px); border: 1px solid rgba(255,255,255,.6); border-radius: 16rpx; box-shadow: 0 8rpx 32rpx rgba(0,0,0,.18); padding: 6rpx 0; min-width: 220rpx; }
.ctx-item { display: block; width: 100%; text-align: left; padding: 22rpx 32rpx; font-size: 28rpx; border: none; background: none; color: #14141A; }
.ctx-item:active { background: rgba(225,29,72,.12); }
.ctx-item.danger { color: #E11D48; }
.ctx-sep { height: 1px; background: rgba(0,0,0,.08); margin: 6rpx 0; }
</style>
