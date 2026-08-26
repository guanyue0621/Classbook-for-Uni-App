<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { post, get } from '../../utils/request.js'
import BottomNav from '../../components/BottomNav.vue'
import SideBar from '../../components/SideBar.vue'
import Icon from '../../components/Icon.vue'
import BgLayer from '../../components/BgLayer.vue'
import { isWideScreen } from '../../utils/layout.js'

const wide = ref(false)
const messages = ref([])
const input = ref('')
const sending = ref(false)
const typing = ref(false)
const disabled = ref(false)
const scrollTop = ref(0)

const quick = [
  '介绍一下我们班',
  '帮我找一下爱好是画画的女生',
  '怎么找回密码？',
  '怎么设置背景？'
]

onMounted(() => {
  wide.value = isWideScreen()
  messages.value.push({ role: 'bot', text: '你好，我是同学录 AI 助手～ 可以帮你介绍同学、按条件找人、讲解同学录功能。' })
  checkStatus()
})

async function checkStatus() {
  try {
    const r = await get('/api/ai/status')
    if (r.data && r.data.enabled === false) disabled.value = true
  } catch (e) {}
}

function scrollBottom() {
  nextTick(() => { scrollTop.value += 100000 })
}

async function send(text) {
  const msg = (text != null ? text : input.value).trim()
  if (!msg || sending.value) return
  if (disabled.value) { uni.showToast({ title: 'AI 助手当前已关闭', icon: 'none' }); return }
  input.value = ''
  messages.value.push({ role: 'me', text: msg })
  sending.value = true
  typing.value = true
  scrollBottom()
  try {
    const r = await post('/api/ai/chat', { message: msg, from: '/pages/ai/ai' })
    const d = r.data || {}
    if (d.ok) {
      messages.value.push({ role: 'bot', text: d.reply || '（无回复）' })
      if (d.anomaly) {
        uni.showToast({ title: '触发安全验证，请在网页端完成', icon: 'none' })
      }
    } else if (d.disabled) {
      disabled.value = true
      uni.showToast({ title: 'AI 助手已关闭', icon: 'none' })
    } else {
      uni.showToast({ title: (d.msg || '调用失败') + '', icon: 'none' })
      messages.value.push({ role: 'bot', text: '⚠️ ' + (d.msg || '调用失败') })
    }
  } catch (e) {
    uni.showToast({ title: '网络错误，请稍后再试', icon: 'none' })
    messages.value.push({ role: 'bot', text: '⚠️ 网络错误，请稍后再试' })
  } finally {
    sending.value = false
    typing.value = false
    scrollBottom()
  }
}

function onInput(e) { input.value = e.detail.value }

function clearChat() {
  uni.showModal({
    title: '清空对话',
    content: '确定要清空当前对话吗？',
    success: (r) => {
      if (r.confirm) {
        messages.value = [{ role: 'bot', text: '对话已清空，有什么可以帮你的？' }]
      }
    }
  })
}
</script>

<template>
  <view class="page" :class="{ wide: wide }">
    <BgLayer />
    <SideBar v-if="wide" active="ai" />
    <view class="main">
      <view class="head">
        <view class="title"><Icon name="ai" :size="44" color="#E11D48" /><text>AI 助手</text></view>
        <view class="clear" @click="clearChat">清空</view>
      </view>

      <scroll-view scroll-y class="msgs" :scroll-top="scrollTop" :scroll-with-animation="true">
        <view v-for="(m, i) in messages" :key="i" class="row" :class="m.role">
          <view class="bubble">{{ m.text }}</view>
        </view>
        <view v-if="typing" class="row bot">
          <view class="bubble typing"><text class="tdot" /><text class="tdot" /><text class="tdot" /></view>
        </view>
        <view v-if="disabled" class="disabled-tip">AI 助手当前已关闭（由管理端控制）</view>
      </scroll-view>

      <view class="quick" v-if="messages.length <= 1">
        <view class="chip" v-for="(q, i) in quick" :key="i" @click="send(q)">{{ q }}</view>
      </view>

      <view class="input-bar">
        <input
          class="inp"
          v-model="input"
          placeholder="问问 AI 关于同学录的事…"
          confirm-type="send"
          :disabled="sending"
          @confirm="send()"
          @input="onInput"
        />
        <view class="send" :class="{ busy: sending }" @click="send()">
          <Icon :name="sending ? 'refresh' : 'arrow'" :size="40" color="#fff" />
        </view>
      </view>
    </view>
    <BottomNav v-if="!wide" active="ai" />
  </view>
</template>

<style scoped>
.page { min-height: 100vh; display: flex; background: #F4F3EF; }
.page.wide .main { margin-left: 240rpx; }
.main { flex: 1; display: flex; flex-direction: column; height: 100vh; box-sizing: border-box; }
.head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 28rpx 32rpx 18rpx;
}
.title { display: flex; align-items: center; gap: 14rpx; font-size: 38rpx; font-weight: 800; color: #2A2722; }
.clear { font-size: 26rpx; color: #E11D48; padding: 8rpx 18rpx; border: 1rpx solid rgba(225,29,72,.4); border-radius: 20rpx; }
.msgs { flex: 1; padding: 12rpx 28rpx; overflow: hidden; }
.row { display: flex; margin: 14rpx 0; }
.row.me { justify-content: flex-end; }
.row.bot { justify-content: flex-start; }
.bubble {
  max-width: 78%; padding: 18rpx 22rpx; border-radius: 22rpx; font-size: 30rpx; line-height: 1.55;
  white-space: pre-wrap; word-break: break-word;
}
.row.me .bubble { background: linear-gradient(135deg, #E11D48, #E8743F); color: #fff; border-bottom-right-radius: 6rpx; }
.row.bot .bubble { background: #fff; color: #2A2722; border-bottom-left-radius: 6rpx; box-shadow: 0 6rpx 20rpx -12rpx rgba(31,38,80,.25); }
.typing { display: flex; gap: 8rpx; align-items: center; }
.tdot { width: 12rpx; height: 12rpx; border-radius: 50%; background: #C9C4BB; animation: tk 1s infinite; }
.tdot:nth-child(2) { animation-delay: .15s; }
.tdot:nth-child(3) { animation-delay: .3s; }
@keyframes tk { 0%,100% { opacity: .3; } 50% { opacity: 1; } }
.disabled-tip { text-align: center; color: #b8b4ac; font-size: 24rpx; margin: 20rpx 0; }
.quick { display: flex; flex-wrap: wrap; gap: 12rpx; padding: 10rpx 28rpx; }
.chip { font-size: 24rpx; padding: 10rpx 18rpx; border-radius: 24rpx; background: #fff; color: #5A554C; border: 1rpx solid rgba(0,0,0,.06); }
.chip:active { background: rgba(225,29,72,.1); }
.input-bar {
  display: flex; align-items: center; gap: 16rpx;
  padding: 18rpx 24rpx calc(18rpx + env(safe-area-inset-bottom));
  background: rgba(255,255,255,.7);
  -webkit-backdrop-filter: blur(18px); backdrop-filter: blur(18px);
  border-top: 1rpx solid rgba(255,255,255,.6);
}
.inp {
  flex: 1; height: 76rpx; background: #fff; border: 1rpx solid rgba(0,0,0,.08);
  border-radius: 38rpx; padding: 0 26rpx; font-size: 28rpx;
}
.send {
  width: 76rpx; height: 76rpx; border-radius: 50%; flex: none;
  background: linear-gradient(135deg, #E11D48, #E8743F);
  display: flex; align-items: center; justify-content: center;
}
.send.busy { opacity: .6; }
.send:active { transform: scale(.94); }
</style>
