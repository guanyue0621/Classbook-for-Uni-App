<script setup>
import { ref, computed, onMounted } from 'vue'
import { request } from '../../utils/request.js'
import { store } from '../../store/index.js'
import { resURL } from '../../utils/util.js'
import BottomNav from '../../components/BottomNav.vue'
import SideBar from '../../components/SideBar.vue'
import Icon from '../../components/Icon.vue'
import BgLayer from '../../components/BgLayer.vue'
import { isWideScreen } from '../../utils/layout.js'

const wide = ref(false)
const list = ref([])
const kw = ref('')
const loading = ref(false)

async function load() {
  loading.value = true
  const r = await request('/api/students')
  if (r.data && r.data.students) list.value = r.data.students
  loading.value = false
}

const filtered = computed(() => {
  const k = kw.value.trim().toLowerCase()
  if (!k) return list.value
  return list.value.filter(s =>
    (s.name || '').toLowerCase().includes(k) ||
    (String(s.student_no || '')).includes(k))
})

function portraitUrl(s) {
  return resURL(s.portrait, store.base)
}

function goDetail(s) {
  uni.navigateTo({ url: '/pages/classmate/detail?no=' + s.student_no })
}

onMounted(() => { wide.value = isWideScreen(); load() })
</script>

<template>
  <view class="page" :class="{ wide: wide }">
    <BgLayer />
    <SideBar v-if="wide" active="home" />
    <view class="main">
      <view class="top">
        <text class="title">同学录</text>
        <input class="search" v-model="kw" placeholder="搜索姓名 / 学号" />
      </view>
      <view v-if="loading" class="tip">加载中...</view>
      <view v-else-if="!filtered.length" class="tip">暂无同学</view>
      <view v-else class="gate-hero">
        <svg class="gate-svg" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs><linearGradient id="skyH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BFE0FF"/><stop offset="1" stop-color="#EAF4FF"/></linearGradient>
          <linearGradient id="penH" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#F6C95B"/><stop offset="1" stop-color="#E9A23B"/></linearGradient></defs>
          <rect width="1200" height="400" fill="url(#skyH)"/>
          <circle cx="170" cy="92" r="46" fill="#F4CE5E"/>
          <g stroke="#F4CE5E" stroke-width="5" stroke-linecap="round"><line x1="170" y1="20" x2="170" y2="40"/><line x1="240" y1="92" x2="220" y2="92"/><line x1="120" y1="92" x2="100" y2="92"/><line x1="216" y1="46" x2="202" y2="32"/><line x1="124" y1="46" x2="138" y2="32"/></g>
          <g fill="#fff" opacity=".9"><ellipse cx="430" cy="70" rx="60" ry="26"/><ellipse cx="480" cy="58" rx="44" ry="22"/><ellipse cx="960" cy="60" rx="54" ry="24"/><ellipse cx="1010" cy="74" rx="40" ry="18"/></g>
          <rect y="300" width="1200" height="100" fill="#BFE3C6"/>
          <g><rect x="250" y="120" width="34" height="200" rx="6" fill="url(#penH)"/><rect x="248" y="92" width="38" height="34" rx="6" fill="#2563EB"/><polygon points="250,92 285,92 267,60 250,92" fill="#E9C46A"/></g>
          <g><rect x="916" y="120" width="34" height="200" rx="6" fill="url(#penH)"/><rect x="914" y="92" width="38" height="34" rx="6" fill="#2563EB"/><polygon points="916,92 951,92 933,60 916,92" fill="#E9C46A"/></g>
          <rect x="238" y="92" width="724" height="34" rx="8" fill="#E11D48"/>
          <text x="600" y="117" text-anchor="middle" font-family="Nunito,Noto Sans SC,sans-serif" font-size="24" font-weight="900" fill="#fff" letter-spacing="6">开 学 啦</text>
          <g transform="translate(600,300)"><circle cx="0" cy="-66" r="20" fill="#F3C9A0"/><rect x="-16" y="-50" width="32" height="40" rx="10" fill="#2563EB"/><rect x="-16" y="-26" width="14" height="26" fill="#F3C9A0"/><rect x="2" y="-26" width="14" height="26" fill="#F3C9A0"/><rect x="-20" y="-50" width="16" height="34" rx="6" fill="#E11D48"/></g>
          <g transform="translate(820,140) rotate(16)"><polygon points="0,0 54,-12 22,18" fill="#fff" stroke="#2563EB" stroke-width="2"/><polygon points="0,0 22,18 6,22" fill="#E7EEFB"/></g>
          <g fill="#F4CE5E"><path d="M150 200l4 10 10 4-10 4-4 10-4-10-10-4 10-4z"/><path d="M1050 230l3 8 8 3-8 3-3 8-3-8-8-3 8-3z"/></g>
        </svg>
        <view class="gh-text"><view class="gh-h">新学期 · 新气象</view><view class="gh-p">2019级 · 六年级二班 · 一份留给未来的档案</view><view class="gh-tag">欢迎回到同学录</view></view>
      </view>
      <view class="list">
        <view v-for="s in filtered" :key="s.student_no" class="item" hover-class="item-hover" @click="goDetail(s)">
          <image v-if="s.portrait" class="avatar ava-pendant" :src="portraitUrl(s)" mode="aspectFill" />
          <view v-else class="avatar ph ava-pendant gold">{{ (s.name || '?').slice(0, 1) }}</view>
          <view class="meta">
            <text class="name">{{ s.name }}<text class="no"> #{{ s.student_no }}</text></text>
            <text class="line">{{ s.school || '未填写学校' }}</text>
            <text v-if="s.nickname_display" class="line nick">昵称：{{ s.nickname_display }}</text>
          </view>
          <Icon name="arrow" :size="40" color="#c9c7c1" />
        </view>
      </view>
    </view>
    <BottomNav v-if="!wide" active="home" />
  </view>
</template>

<style scoped>
.page { padding: 24rpx 24rpx 160rpx; min-height: 100vh; background: transparent; position: relative; z-index: 1; }
.page.wide { display: flex; padding: 0; }
.page.wide .main { flex: 1; margin-left: 240rpx; padding: 24rpx 28rpx 160rpx; }
.top { display: flex; align-items: center; gap: 20rpx; margin-bottom: 20rpx; }
.title { font-size: 40rpx; font-weight: 800; color: #14141A; }
.search { flex: 1; height: 72rpx; background: rgba(255,255,255,.66); border: 1.5px solid rgba(255,255,255,.8); border-radius: 36rpx; padding: 0 28rpx; font-size: 28rpx; color: #14141A; box-shadow: inset 0 1px 0 rgba(255,255,255,.85); }
.tip { text-align: center; color: #7C7A74; padding: 60rpx 0; font-size: 28rpx; }
.list { display: flex; flex-direction: column; gap: 16rpx; }
.item { display: flex; align-items: center; min-height: 112rpx; box-sizing: border-box; background: rgba(255,255,255,.55); -webkit-backdrop-filter: blur(16px) saturate(1.35); backdrop-filter: blur(16px) saturate(1.35); border: 1px solid rgba(255,255,255,.65); border-radius: 18rpx; padding: 20rpx; box-shadow: 0 8rpx 28rpx -14rpx rgba(31,38,80,.25); transition: transform .12s ease, background .15s ease; }
.item-hover { transform: scale(.99); background: rgba(255,255,255,.7); }
.avatar { width: 88rpx; height: 88rpx; border-radius: 50%; background: linear-gradient(135deg,#2563EB,#7CA8F0); flex: none; }
.avatar.ph { display: flex; align-items: center; justify-content: center; color: #fff; font-size: 36rpx; font-weight: 700; }
.meta { flex: 1; margin-left: 20rpx; min-width: 0; }
.name { font-size: 30rpx; font-weight: 600; color: #14141A; }
.no { color: #7C7A74; font-size: 24rpx; font-weight: 400; }
.line { display: block; font-size: 24rpx; color: #7C7A74; margin-top: 6rpx; }
.nick { color: #E11D48; }
</style>
