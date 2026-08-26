<script setup>
import { ref, onUnmounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { request } from '../../utils/request.js'
import { store } from '../../store/index.js'
import { resURL } from '../../utils/util.js'
import BottomNav from '../../components/BottomNav.vue'
import SideBar from '../../components/SideBar.vue'
import Icon from '../../components/Icon.vue'
import BgLayer from '../../components/BgLayer.vue'
import { isWideScreen } from '../../utils/layout.js'

const wide = ref(false)
const tracks = ref([])
const cur = ref(-1)
const playing = ref(false)
let audio = null

function audioUrl(t) { return resURL(t.audio, store.base) }
function coverUrl(t) { return resURL(t.cover, store.base) }

async function load() {
  const r = await request('/api/music')
  if (Array.isArray(r.data)) tracks.value = r.data
}

function ensureAudio() {
  if (!audio) audio = uni.createInnerAudioContext()
  audio.onError(() => { uni.showToast({ title: '播放失败', icon: 'none' }) })
}

function play(i) {
  ensureAudio()
  if (cur.value === i) { toggle(); return }
  cur.value = i
  audio.src = audioUrl(tracks.value[i])
  audio.play()
  playing.value = true
}

function toggle() {
  if (!audio || cur.value < 0) return
  if (playing.value) { audio.pause(); playing.value = false }
  else { audio.play(); playing.value = true }
}

function prev() { if (cur.value > 0) play(cur.value - 1) }
function next() { if (cur.value < tracks.value.length - 1) play(cur.value + 1) }

function goContribute() { uni.navigateTo({ url: '/pages/contribute/contribute' }) }

onShow(() => { wide.value = isWideScreen(); load() })
onUnmounted(() => { if (audio) audio.destroy() })
</script>

<template>
  <view class="page" :class="{ wide: wide }">
    <BgLayer />
    <SideBar v-if="wide" active="music" />
    <view class="main">
      <view class="top">
        <text class="title">音乐</text>
        <button class="mini" size="mini" @click="goContribute">投稿</button>
      </view>
    <view v-if="!tracks.length" class="tip">暂无音乐</view>
    <view class="list">
      <view v-for="(t, i) in tracks" :key="t.id" class="item" :class="{ on: i === cur && playing }" hover-class="item-hover" @click="play(i)">
        <image v-if="t.cover" class="cv" :src="coverUrl(t)" mode="aspectFill" />
        <view v-else class="cv ph"><Icon name="music" :size="40" color="#fff" /></view>
        <view class="meta">
          <text class="t1">{{ t.title }}</text>
          <text class="t2">{{ t.artist || '未知歌手' }}</text>
        </view>
        <Icon :name="(i === cur && playing) ? 'pause' : 'play'" :size="40" color="#E11D48" />
      </view>
    </view>

    <view v-if="cur >= 0" class="player">
      <image v-if="tracks[cur].cover" class="p-cv" :src="coverUrl(tracks[cur])" mode="aspectFill" />
      <view v-else class="p-cv ph"><Icon name="music" :size="36" color="#fff" /></view>
      <view class="p-meta">
        <text class="p-t">{{ tracks[cur].title }}</text>
        <text class="p-a">{{ tracks[cur].artist || '未知歌手' }}</text>
      </view>
      <view class="p-ctrl">
        <view class="ctrl-btn" hover-class="ctrl-hover" @click="prev"><Icon name="prev" :size="44" color="#E11D48" /></view>
        <view class="ctrl-btn big" hover-class="ctrl-hover" @click="toggle"><Icon :name="playing ? 'pause' : 'play'" :size="56" color="#E11D48" /></view>
        <view class="ctrl-btn" hover-class="ctrl-hover" @click="next"><Icon name="next" :size="44" color="#E11D48" /></view>
      </view>
    </view>
    </view>
    <BottomNav v-if="!wide" active="music" />
  </view>
</template>

<style scoped>
.page { padding: 24rpx 24rpx 200rpx; min-height: 100vh; background: transparent; position: relative; z-index: 1; }
.page.wide { display: flex; padding: 0; }
.page.wide .main { flex: 1; margin-left: 240rpx; padding: 24rpx 28rpx 200rpx; }
.top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16rpx; }
.title { font-size: 40rpx; font-weight: 800; color: #14141A; }
.mini { background: #E11D48; color: #fff; margin: 0; }
.tip { text-align: center; color: #7C7A74; padding: 60rpx 0; font-size: 28rpx; }
.list { display: flex; flex-direction: column; gap: 14rpx; }
.item { display: flex; align-items: center; min-height: 100rpx; box-sizing: border-box; background: rgba(255,255,255,.55); -webkit-backdrop-filter: blur(16px) saturate(1.35); backdrop-filter: blur(16px) saturate(1.35); border: 1px solid rgba(255,255,255,.65); border-radius: 16rpx; padding: 16rpx; box-shadow: 0 8rpx 28rpx -14rpx rgba(31,38,80,.25); transition: transform .12s ease, background .15s ease; }
.item.on { background: rgba(225,29,72,.10); border-color: rgba(225,29,72,.4); }
.item-hover { background: rgba(255,255,255,.7); }
.cv { width: 80rpx; height: 80rpx; border-radius: 12rpx; background: linear-gradient(135deg,#E11D48,#F0A48C); flex: none; }
.cv.ph { display: flex; align-items: center; justify-content: center; color: #fff; }
.meta { flex: 1; margin-left: 18rpx; min-width: 0; }
.t1 { display: block; font-size: 30rpx; font-weight: 600; color: #14141A; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.t2 { display: block; font-size: 24rpx; color: #7C7A74; margin-top: 4rpx; }
.player { position: fixed; left: 0; right: 0; bottom: 110rpx; display: flex; align-items: center; background: rgba(255,255,255,.75); -webkit-backdrop-filter: blur(18px) saturate(1.4); backdrop-filter: blur(18px) saturate(1.4); border-top: 1px solid rgba(255,255,255,.6); padding: 14rpx 24rpx; padding-bottom: calc(14rpx + env(safe-area-inset-bottom)); box-shadow: 0 -8rpx 30rpx -16rpx rgba(31,38,80,.3); }
.p-cv { width: 72rpx; height: 72rpx; border-radius: 10rpx; background: linear-gradient(135deg,#E11D48,#F0A48C); flex: none; }
.p-cv.ph { display: flex; align-items: center; justify-content: center; color:#fff; }
.p-meta { flex: 1; margin-left: 16rpx; min-width: 0; }
.p-t { display: block; font-size: 28rpx; font-weight: 600; color: #14141A; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.p-a { display: block; font-size: 22rpx; color: #7C7A74; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.p-ctrl { display: flex; gap: 20rpx; align-items: center; }
.ctrl-btn { display: flex; align-items: center; justify-content: center; width: 72rpx; height: 72rpx; border-radius: 50%; transition: transform .12s ease, background .15s ease; }
.ctrl-btn.big { width: 88rpx; height: 88rpx; background: rgba(225,29,72,.10); }
.ctrl-hover { transform: scale(.9); background: rgba(225,29,72,.18); }
</style>
