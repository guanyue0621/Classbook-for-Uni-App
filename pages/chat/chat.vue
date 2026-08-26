<script setup>
import { ref, computed } from 'vue'
import { onShow, onHide, onUnload } from '@dcloudio/uni-app'
import { get } from '../../utils/request.js'
import { store, setUnreadChat } from '../../store/index.js'
import { connectChatWS, addChatWSListener, removeChatWSListener } from '../../utils/chatws.js'
import BottomNav from '../../components/BottomNav.vue'
import SideBar from '../../components/SideBar.vue'
import Icon from '../../components/Icon.vue'
import BgLayer from '../../components/BgLayer.vue'
import { isWideScreen } from '../../utils/layout.js'

const wide = ref(false)
const list = ref([])
const loading = ref(false)
const err = ref('')

// ── 发起新聊天：同学选择器 ──
const pickerOpen = ref(false)
const pickerLoading = ref(false)
const pickerErr = ref('')
const classmates = ref([])
const kw = ref('')

const filtered = computed(() => {
  const k = (kw.value || '').trim().toLowerCase()
  const me = (store.user && store.user.student_no) || ''
  return classmates.value.filter(c => c.student_no !== me)
    .filter(c => !k || (c.name || '').toLowerCase().includes(k) || String(c.student_no).includes(k))
})

onShow(async () => {
  wide.value = isWideScreen()
  await loadList()
  // 实时推送：建立 WebSocket 并注册监听（取代前端轮询）
  connectChatWS()
  if (wsListener) removeChatWSListener(wsListener)
  wsListener = addChatWSListener(onWs)
})

onHide(() => { if (wsListener) { removeChatWSListener(wsListener); wsListener = null } })
onUnload(() => { if (wsListener) { removeChatWSListener(wsListener); wsListener = null } })

let wsListener = null
// 收到服务端实时推送的新消息：刷新列表 + 未读角标
function onWs(d) {
  if (d && (d.type === 'chat' || d.type === 'withdraw')) loadList(true)
}

async function loadList(silent) {
  if (!silent) loading.value = true
  err.value = ''
  try {
    const r = await get('/api/chat/list')
    if (r.data && r.data.ok) {
      list.value = r.data.list || []
      const total = list.value.reduce((s, it) => s + (it.unread || 0), 0)
      setUnreadChat(total)
    } else if (r.statusCode === 401) {
      uni.reLaunch({ url: '/pages/login/login' })
    } else if (!silent) {
      err.value = '加载失败'
    }
  } catch (e) {
    if (!silent) err.value = '连接服务器超时'
  }
  if (!silent) loading.value = false
}

function goChat(it) {
  uni.navigateTo({ url: '/pages/chat/conversation?no=' + it.student_no + '&name=' + encodeURIComponent(it.name) })
}

function fmtTime(ts) {
  if (!ts) return ''
  const d = new Date(ts * 1000)
  const now = new Date()
  if (d.toDateString() === now.toDateString()) {
    return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0')
  }
  const diff = (now - d) / 86400000
  if (diff < 7) return ['周日','周一','周二','周三','周四','周五','周六'][d.getDay()]
  return (d.getMonth() + 1) + '/' + d.getDate()
}

// ── 选择器 ──
async function openPicker() {
  pickerOpen.value = true
  kw.value = ''
  if (classmates.value.length) return
  pickerLoading.value = true
  pickerErr.value = ''
  try {
    const r = await get('/api/chat/contacts')
    if (r.data && r.data.ok) classmates.value = r.data.contacts || []
    else pickerErr.value = '同学列表加载失败'
  } catch (e) { pickerErr.value = '网络错误' }
  pickerLoading.value = false
}
function closePicker() { pickerOpen.value = false }
function pickClassmate(c) {
  pickerOpen.value = false
  uni.navigateTo({ url: '/pages/chat/conversation?no=' + c.student_no + '&name=' + encodeURIComponent(c.name || c.student_no) })
}
</script>

<template>
  <view class="page" :class="{ wide: wide }">
    <BgLayer />
    <SideBar v-if="wide" active="chat" />
    <view class="main">
      <view class="top">
        <text class="title">消息</text>
        <view class="new-btn" hover-class="new-hover" @click="openPicker">
          <Icon name="plus" :size="30" color="#fff" />
        </view>
      </view>

      <view v-if="loading" class="tip">加载中…</view>
      <view v-else-if="err" class="tip err" @click="loadList">{{ err }}（点击重试）</view>
      <view v-else-if="!list.length" class="empty">
        <Icon name="chat" :size="80" color="#c9c7c1" />
        <text class="empty-t">还没有聊天记录</text>
        <text class="empty-s">点击右上角 + 选择同学，开始聊天</text>
        <view class="start-btn glass" hover-class="start-hover" @click="openPicker">发起新聊天</view>
      </view>
      <view v-else class="list">
        <view v-for="it in list" :key="it.student_no" class="item glass" hover-class="item-hover" @click="goChat(it)">
          <view class="ava ava-pendant">{{ (it.name || '?').slice(0, 1) }}</view>
          <view class="meta">
            <view class="row1">
              <text class="nm">{{ it.name }}</text>
              <text class="ts">{{ fmtTime(it.last_ts) }}</text>
            </view>
            <text class="lm">{{ it.last_msg }}</text>
          </view>
          <view v-if="it.unread > 0" class="badge">{{ it.unread > 99 ? '99+' : it.unread }}</view>
        </view>
      </view>
    </view>
    <BottomNav v-if="!wide" active="chat" />

    <!-- 发起新聊天：同学选择器 -->
    <view v-if="pickerOpen" class="picker-mask" @click="closePicker">
      <view class="picker" @click.stop>
        <view class="picker-hd">
          <text class="picker-t">选择同学</text>
          <view class="picker-close" @click="closePicker">✕</view>
        </view>
        <input class="picker-search" v-model="kw" placeholder="搜索姓名 / 学号" />
        <view v-if="pickerLoading" class="picker-tip">加载中…</view>
        <view v-else-if="pickerErr" class="picker-tip err">{{ pickerErr }}</view>
        <scroll-view v-else class="picker-list" scroll-y>
          <view v-for="c in filtered" :key="c.student_no" class="picker-item" hover-class="picker-item-h" @click="pickClassmate(c)">
            <view class="p-ava ava-pendant">{{ (c.name || '?').slice(0, 1) }}</view>
            <view class="p-meta">
              <text class="p-name">{{ c.name }}</text>
              <text class="p-no">#{{ c.student_no }}{{ c.school ? ' · ' + c.school : '' }}</text>
            </view>
          </view>
          <view v-if="!filtered.length" class="picker-tip">没有匹配的同学</view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.page { min-height: 100vh; padding: 24rpx 24rpx 160rpx; background: transparent; position: relative; z-index: 1; }
.page.wide { display: flex; padding: 0; }
.page.wide .main { flex: 1; margin-left: 240rpx; padding: 24rpx 28rpx 160rpx; }
.glass { background: rgba(255,255,255,.55); -webkit-backdrop-filter: blur(16px) saturate(1.35); backdrop-filter: blur(16px) saturate(1.35); border: 1px solid rgba(255,255,255,.65); box-shadow: 0 8rpx 28rpx -14rpx rgba(31,38,80,.25); }
.top { display: flex; align-items: center; justify-content: space-between; padding: 12rpx 0 20rpx; }
.title { font-size: 44rpx; font-weight: 800; color: #14141A; }
.new-btn { width: 64rpx; height: 64rpx; border-radius: 18rpx; background: linear-gradient(135deg,#E11D48,#E0673F); display: flex; align-items: center; justify-content: center; box-shadow: 0 8rpx 20rpx -10rpx rgba(225,29,72,.6); }
.new-btn:active, .new-hover { transform: scale(.94); }
.tip { text-align: center; color: #7C7A74; font-size: 28rpx; padding: 60rpx 0; }
.tip.err { color: #E11D48; }
.empty { display: flex; flex-direction: column; align-items: center; padding: 120rpx 0; }
.empty-t { font-size: 30rpx; color: #7C7A74; margin-top: 24rpx; }
.empty-s { font-size: 24rpx; color: #b8b4ac; margin-top: 8rpx; }
.start-btn { margin-top: 40rpx; padding: 20rpx 44rpx; border-radius: 16rpx; color: #E11D48; font-size: 28rpx; font-weight: 700; }
.start-btn:active, .start-hover { transform: scale(.97); }
.list { display: flex; flex-direction: column; gap: 14rpx; }
.item { display: flex; align-items: center; border-radius: 18rpx; padding: 24rpx; min-height: 112rpx; transition: transform .12s ease, background .15s ease; }
.item-hover { transform: scale(.99); background: rgba(255,255,255,.72); }
.ava { width: 88rpx; height: 88rpx; border-radius: 50%; background: linear-gradient(135deg,#E11D48,#F0A48C); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 36rpx; font-weight: 700; flex-shrink: 0; }
.meta { flex: 1; margin-left: 20rpx; overflow: hidden; }
.row1 { display: flex; justify-content: space-between; align-items: center; }
.nm { font-size: 30rpx; font-weight: 600; color: #14141A; }
.ts { font-size: 22rpx; color: #b8b4ac; }
.lm { display: block; font-size: 25rpx; color: #7C7A74; margin-top: 6rpx; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.badge { min-width: 36rpx; height: 36rpx; border-radius: 18rpx; background: #E11D48; color: #fff; font-size: 20rpx; font-weight: 700; display: flex; align-items: center; justify-content: center; padding: 0 10rpx; margin-left: 12rpx; }

/* ── 选择器 ── */
.picker-mask { position: fixed; inset: 0; background: rgba(20,20,26,.42); z-index: 300; display: flex; align-items: flex-end; }
.picker { width: 100%; max-height: 78vh; background: #F4F3EF; border-radius: 28rpx 28rpx 0 0; display: flex; flex-direction: column; padding: 24rpx 24rpx calc(24rpx + env(safe-area-inset-bottom)); box-shadow: 0 -10rpx 40rpx -10rpx rgba(0,0,0,.3); }
.picker-hd { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18rpx; }
.picker-t { font-size: 32rpx; font-weight: 800; color: #14141A; }
.picker-close { width: 56rpx; height: 56rpx; border-radius: 50%; background: rgba(0,0,0,.06); color: #7C7A74; display: flex; align-items: center; justify-content: center; font-size: 30rpx; }
.picker-search { height: 76rpx; background: #fff; border: 1.5px solid rgba(0,0,0,.06); border-radius: 14rpx; padding: 0 22rpx; font-size: 28rpx; color: #14141A; margin-bottom: 14rpx; }
.picker-list { flex: 1; overflow-y: auto; }
.picker-tip { text-align: center; color: #7C7A74; font-size: 26rpx; padding: 40rpx 0; }
.picker-tip.err { color: #E11D48; }
.picker-item { display: flex; align-items: center; padding: 18rpx 12rpx; border-radius: 14rpx; }
.picker-item:active, .picker-item-h { background: rgba(225,29,72,.08); }
.p-ava { width: 72rpx; height: 72rpx; border-radius: 50%; background: linear-gradient(135deg,#E11D48,#F0A48C); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 30rpx; font-weight: 700; flex-shrink: 0; }
.p-meta { margin-left: 18rpx; display: flex; flex-direction: column; }
.p-name { font-size: 28rpx; font-weight: 600; color: #14141A; }
.p-no { font-size: 22rpx; color: #b8b4ac; margin-top: 4rpx; }
</style>
