<script setup>
import { computed, watch } from 'vue'
import { store } from '../store/index.js'

// 读取 store.bg，支持 image / video / none
const bgStyle = computed(() => {
  const bg = store.bg
  if (!bg || !bg.type || bg.type === 'none' || !bg.url) return ''
  if (bg.type === 'video') return '' // 视频用单独层
  return bg.url
})
const isVideo = computed(() => {
  const bg = store.bg
  return !!(bg && bg.type === 'video' && bg.url)
})
const videoUrl = computed(() => {
  const bg = store.bg
  return (bg && bg.url) || ''
})
const hasBg = computed(() => !!bgStyle.value || isVideo.value)
</script>

<template>
  <!-- 全局背景层（和网页端 #appBg 一样：fixed inset:0, z-index:0, pointer-events:none） -->
  <view v-if="hasBg" class="bg-layer">
    <video v-if="isVideo" class="bg-video" :src="videoUrl" autoplay muted loop playsinline
           :enable-progress-gesture="false" :show-fullscreen-btn="false" :show-play-btn="false" :controls="false" />
    <view v-else class="bg-img" :style="{ backgroundImage: 'url(' + bgStyle + ')' }" />
    <view class="bg-overlay" />
  </view>
  <!-- 无自定义背景时的默认：开学季「作业本 + 校门」主视觉 -->
  <view v-else class="bg-default">
    <!-- 笔记本横纹 -->
    <view class="bg-paper" />
    <!-- 走入校门场景 -->
    <view class="bg-gate">
      <svg class="bg-gate-svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="skyA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BFE0FF"/><stop offset="1" stop-color="#EAF4FF"/></linearGradient>
          <linearGradient id="penA" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#F6C95B"/><stop offset="1" stop-color="#E9A23B"/></linearGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#skyA)"/>
        <circle cx="200" cy="150" r="64" fill="#F4CE5E"/>
        <g stroke="#F4CE5E" stroke-width="7" stroke-linecap="round">
          <line x1="200" y1="44" x2="200" y2="74"/><line x1="306" y1="150" x2="276" y2="150"/>
          <line x1="94" y1="150" x2="124" y2="150"/><line x1="268" y1="82" x2="247" y2="61"/><line x1="132" y1="82" x2="153" y2="61"/>
        </g>
        <g fill="#fff" opacity=".9"><ellipse cx="520" cy="120" rx="80" ry="34"/><ellipse cx="585" cy="104" rx="58" ry="28"/><ellipse cx="1040" cy="96" rx="72" ry="30"/><ellipse cx="1100" cy="120" rx="54" ry="22"/></g>
        <rect y="600" width="1200" height="200" fill="#BFE3C6"/>
        <g><rect x="300" y="220" width="56" height="380" rx="10" fill="url(#penA)"/><rect x="297" y="184" width="62" height="52" rx="10" fill="#2563EB"/><polygon points="300,184 359,184 330,136 300,184" fill="#E9C46A"/></g>
        <g><rect x="844" y="220" width="56" height="380" rx="10" fill="url(#penA)"/><rect x="841" y="184" width="62" height="52" rx="10" fill="#2563EB"/><polygon points="844,184 903,184 874,136 844,184" fill="#E9C46A"/></g>
        <rect x="282" y="184" width="636" height="56" rx="12" fill="#E11D48"/>
        <text x="600" y="224" text-anchor="middle" font-family="Nunito,Noto Sans SC,sans-serif" font-size="38" font-weight="900" fill="#fff" letter-spacing="10">开 学 啦</text>
        <g transform="translate(600,610)"><circle cx="0" cy="-92" r="30" fill="#F3C9A0"/><rect x="-26" y="-72" width="52" height="60" rx="14" fill="#2563EB"/><rect x="-26" y="-38" width="22" height="38" fill="#F3C9A0"/><rect x="4" y="-38" width="22" height="38" fill="#F3C9A0"/><rect x="-34" y="-72" width="26" height="50" rx="8" fill="#E11D48"/></g>
        <g transform="translate(960,320) rotate(16)"><polygon points="0,0 86,-18 34,28" fill="#fff" stroke="#2563EB" stroke-width="3"/><polygon points="0,0 34,28 10,34" fill="#E7EEFB"/></g>
        <g fill="#F4CE5E"><path d="M210 360l6 16 16 6-16 6-6 16-6-16-16-6 16-6z"/><path d="M1010 400l5 12 12 5-12 5-5 12-5-12-12-5 12-5z"/></g>
      </svg>
    </view>
    <view class="bg-tint" />
  </view>
</template>

<style scoped>
.bg-layer { position: fixed; left: 0; top: 0; right: 0; bottom: 0; z-index: 0; pointer-events: none; overflow: hidden; }
.bg-img { position: absolute; left: 0; top: 0; width: 100%; height: 100%; background-size: cover; background-position: center; }
.bg-video { position: absolute; left: 0; top: 0; width: 100%; height: 100%; object-fit: cover; }
.bg-overlay { position: absolute; left: 0; top: 0; width: 100%; height: 100%; background: rgba(255,255,255,.20); }
.bg-default { position: fixed; left: 0; top: 0; right: 0; bottom: 0; z-index: 0; pointer-events: none;
  background: #FBF7EE; }
/* 笔记本横纹（作业本） */
.bg-paper { position: absolute; left: 0; top: 0; width: 100%; height: 100%;
  background-image: repeating-linear-gradient(0deg, transparent 0 26px, rgba(37,99,235,.07) 26px 27px); }
/* 校门场景置于上方，向下渐隐，正文内容在其上 */
.bg-gate { position: absolute; left: 0; top: 0; width: 100%; height: 62%; opacity: .9; }
.bg-gate-svg { width: 100%; height: 100%; display: block; }
.bg-tint { position: absolute; left: 0; top: 0; width: 100%; height: 100%;
  background: linear-gradient(180deg, rgba(251,247,238,0) 40%, rgba(251,247,238,.82) 72%, #FBF7EE 100%); }
</style>
