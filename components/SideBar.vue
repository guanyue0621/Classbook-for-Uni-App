<script setup>
import { computed } from 'vue'
import Icon from './Icon.vue'
import { store } from '../store/index.js'
const props = defineProps({ active: { type: String, default: 'home' } })
const items = [
  { key: 'home', text: '首页', url: '/pages/home/home', icon: 'home' },
  { key: 'chat', text: '消息', url: '/pages/chat/chat', icon: 'chat' },
  { key: 'music', text: '音乐', url: '/pages/music/music', icon: 'music' },
  { key: 'ai', text: 'AI', url: '/pages/ai/ai', icon: 'ai' },
  { key: 'me', text: '我的', url: '/pages/me/me', icon: 'user' },
  { key: 'about', text: '关于', url: '/pages/about/about', icon: 'info' }
]
const chatUnread = computed(() => store.unreadChat || 0)
function go(it) {
  if (it.key === props.active) return
  uni.reLaunch({ url: it.url })
}
</script>

<template>
  <view class="side">
    <view class="brand">
      <view class="logo">同学录</view>
      <view class="sub">CLASSBOOK</view>
    </view>
    <view
      v-for="it in items" :key="it.key"
      class="item" :class="{ on: it.key === active }"
      hover-class="item-hover"
      @click="go(it)"
    >
      <view class="ic-wrap">
        <Icon :name="it.icon" :size="40" :color="it.key === active ? '#E11D48' : '#7C7A74'" />
        <view v-if="it.key === 'chat' && chatUnread > 0" class="dot">{{ chatUnread > 99 ? '99+' : chatUnread }}</view>
      </view>
      <text class="txt">{{ it.text }}</text>
    </view>
    <view class="spacer" />
    <view class="tip">宽屏模式 · 自适应</view>
  </view>
</template>

<style scoped>
.side {
  position: fixed;
  left: 0;
  top: 0;
  width: 240rpx;
  height: 100vh;
  background: rgba(255,255,255,.55);
  -webkit-backdrop-filter: blur(18px) saturate(1.4);
  backdrop-filter: blur(18px) saturate(1.4);
  border-right: 1px solid rgba(255,255,255,.6);
  display: flex; flex-direction: column;
  padding: 48rpx 0;
  box-sizing: border-box;
  z-index: 100;
  overflow-y: auto;
}
.brand { text-align: center; margin-bottom: 56rpx; padding: 0 16rpx; }
.logo { font-size: 40rpx; font-weight: 800; color: #E11D48; letter-spacing: 2rpx; }
.sub { font-size: 20rpx; color: #b8b4ac; letter-spacing: 3rpx; margin-top: 6rpx; }
.item {
  display: flex; align-items: center;
  padding: 26rpx 32rpx; margin: 8rpx 20rpx;
  border-radius: 16rpx; color: #7C7A74; font-size: 30rpx;
  min-height: 88rpx; box-sizing: border-box;
  transition: background .18s ease, transform .15s ease;
}
.item.on { background: rgba(225,29,72,.12); color: #E11D48; font-weight: 700; }
.item-hover { opacity: .7; transform: scale(.98); }
.txt { margin-left: 18rpx; }
.ic-wrap { position: relative; display: flex; }
.dot { position: absolute; top: -6rpx; right: -10rpx; min-width: 28rpx; height: 28rpx; padding: 0 6rpx; border-radius: 14rpx; background: #E11D48; color: #fff; font-size: 18rpx; font-weight: 700; display: flex; align-items: center; justify-content: center; box-sizing: border-box; }
.spacer { flex: 1; }
.tip { text-align: center; font-size: 20rpx; color: #b8b4ac; padding: 0 16rpx; }
</style>
