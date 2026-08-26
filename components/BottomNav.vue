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
  // reLaunch 避免 navigateTo 无限压栈导致返回崩溃
  uni.reLaunch({ url: it.url })
}
</script>

<template>
  <view class="bottom-nav">
    <view
      v-for="it in items" :key="it.key"
      class="nav-item" :class="{ on: it.key === active }"
      hover-class="nav-hover"
      @click="go(it)"
    >
      <view class="ic-wrap">
        <Icon :name="it.icon" :size="42" :color="it.key === active ? '#E11D48' : '#7C7A74'" />
        <view v-if="it.key === 'chat' && chatUnread > 0" class="dot">{{ chatUnread > 99 ? '99+' : chatUnread }}</view>
      </view>
      <text class="nav-txt">{{ it.text }}</text>
    </view>
  </view>
</template>

<style scoped>
.bottom-nav {
  position: fixed;
  left: 0; right: 0; bottom: 0;
  height: 110rpx;
  display: flex;
  background: rgba(255,255,255,.72);
  -webkit-backdrop-filter: blur(18px) saturate(1.4);
  backdrop-filter: blur(18px) saturate(1.4);
  border-top: 1px solid rgba(255,255,255,.6);
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 50;
  box-shadow: 0 -8rpx 30rpx -16rpx rgba(31,38,80,.3);
}
.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #7C7A74;
  font-size: 22rpx;
  min-height: 88rpx;
  transition: transform .15s ease, opacity .15s ease;
}
.nav-item.on { color: #E11D48; }
.nav-item.on :deep(.icon) { transform: translateY(-2rpx); }
.nav-hover { opacity: .6; }
.nav-txt { line-height: 1; margin-top: 6rpx; }
.ic-wrap { position: relative; display: flex; }
.dot { position: absolute; top: -10rpx; right: -14rpx; min-width: 30rpx; height: 30rpx; padding: 0 6rpx; border-radius: 15rpx; background: #E11D48; color: #fff; font-size: 18rpx; font-weight: 700; display: flex; align-items: center; justify-content: center; box-sizing: border-box; }
</style>
