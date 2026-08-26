<script setup>
import { ref } from 'vue'
import { store } from '../../store/index.js'
import BottomNav from '../../components/BottomNav.vue'
import SideBar from '../../components/SideBar.vue'
import Icon from '../../components/Icon.vue'
import BgLayer from '../../components/BgLayer.vue'
import { isWideScreen } from '../../utils/layout.js'

const wide = ref(false)
const items = ref([
  { icon: 'home', text: '首页 / 同学列表', url: '/pages/home/home' },
  { icon: 'chat', text: '消息 / 聊天', url: '/pages/chat/chat' },
  { icon: 'music', text: '音乐', url: '/pages/music/music' },
  { icon: 'user', text: '我的', url: '/pages/me/me' },
  { icon: 'info', text: '关于', url: '/pages/about/about' },
  { icon: 'gift', text: '赞助与支持', url: '/pages/sponsor/sponsor' }
])
if (store.isAdmin) {
  items.value.push({ icon: 'gear', text: '权限管理面板', url: '/pages/admin/admin' })
}

function go(it) { uni.reLaunch({ url: it.url }) }
wide.value = isWideScreen()
</script>

<template>
  <view class="page" :class="{ wide: wide }">
    <BgLayer />
    <SideBar v-if="wide" active="links" />
    <view class="main">
      <view class="title">可用链接</view>
      <view class="card glass">
        <view v-for="(it, i) in items" :key="i" class="item" hover-class="item-hover" @click="go(it)">
          <Icon :name="it.icon" :size="40" color="#7C7A74" />
          <text class="tx">{{ it.text }}</text>
          <Icon name="arrow" :size="40" color="#c9c7c1" />
        </view>
      </view>
      <view class="note">兼容版与更多功能页面将在后续版本补充。</view>
    </view>
    <BottomNav v-if="!wide" active="links" />
  </view>
</template>

<style scoped>
.page { padding: 24rpx 24rpx 160rpx; min-height: 100vh; background: transparent; position: relative; z-index: 1; }
.page.wide { display: flex; padding: 0; }
.page.wide .main { flex: 1; margin-left: 240rpx; padding: 24rpx 28rpx 160rpx; }
.title { font-size: 40rpx; font-weight: 800; color: #14141A; margin: 8rpx 0 20rpx; }
.card { border-radius: 18rpx; padding: 6rpx 24rpx; margin-bottom: 22rpx; }
.item { display: flex; align-items: center; padding: 26rpx 0; min-height: 88rpx; box-sizing: border-box; border-bottom: 1px solid rgba(231,228,221,.6); transition: transform .12s ease, background .15s ease; }
.item:active, .item-hover { background: rgba(255,255,255,.4); }
.item:last-child { border-bottom: none; }
.tx { flex: 1; font-size: 30rpx; color: #14141A; margin-left: 20rpx; }
.note { text-align: center; color: #7C7A74; font-size: 24rpx; margin-top: 28rpx; }
</style>

