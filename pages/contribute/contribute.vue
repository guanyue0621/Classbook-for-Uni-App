<script setup>
import { ref } from 'vue'
import { upload } from '../../utils/request.js'
import Icon from '../../components/Icon.vue'

const title = ref('')
const artist = ref('')
const audioFile = ref(null)
const coverFile = ref(null)
const lrcFile = ref(null)
const submitting = ref(false)

function pickAudio() {
  uni.chooseFile({
    count: 1, type: 'file', extension: ['mp3', 'm4a', 'ogg', 'wav', 'flac'],
    success: (r) => { audioFile.value = r.tempFiles[0] }
  })
}
function pickCover() {
  uni.chooseImage({ count: 1, success: (r) => { coverFile.value = { name: 'cover.jpg', path: r.tempFilePaths[0] } } })
}
function pickLrc() {
  uni.chooseFile({ count: 1, type: 'file', extension: ['lrc', 'txt'], success: (r) => { lrcFile.value = r.tempFiles[0] } })
}

async function submit() {
  if (!title.value || !audioFile.value) {
    uni.showToast({ title: '请填写标题并选择音频', icon: 'none' }); return
  }
  const files = [{ name: 'audio', uri: audioFile.value.path }]
  const formData = { title: title.value, artist: artist.value || '' }
  if (coverFile.value) files.push({ name: 'cover', uri: coverFile.value.path })
  if (lrcFile.value) files.push({ name: 'lrc', uri: lrcFile.value.path })
  submitting.value = true
  const r = await upload('/api/music/contribute', files, formData)
  submitting.value = false
  if (r.data && r.data.ok) {
    uni.showToast({ title: '投稿成功，等待审核', icon: 'success' })
    setTimeout(() => uni.navigateBack(), 1200)
  } else {
    uni.showToast({ title: (r.data && r.data.msg) || '投稿失败', icon: 'none' })
  }
}
</script>

<template>
  <view class="page">
    <view class="card glass">
      <view class="card-head"><Icon name="music" :size="36" color="#E11D48" /><text class="label">音乐投稿</text></view>
      <text class="label">歌曲标题 *</text>
      <input class="field" v-model="title" placeholder="必填" />

      <text class="label">歌手</text>
      <input class="field" v-model="artist" placeholder="选填" />

      <text class="label">音频文件 *</text>
      <button class="pick" hover-class="pick-hover" @click="pickAudio">{{ audioFile ? audioFile.name : '选择音频（mp3/m4a/ogg/wav/flac）' }}</button>

      <text class="label">封面（选填）</text>
      <button class="pick" hover-class="pick-hover" @click="pickCover">{{ coverFile ? coverFile.name : '选择封面图片' }}</button>

      <text class="label">歌词（选填）</text>
      <button class="pick" hover-class="pick-hover" @click="pickLrc">{{ lrcFile ? lrcFile.name : '选择歌词文件（lrc/txt）' }}</button>

      <button class="btn primary" :loading="submitting" @click="submit">提交投稿</button>
      <text class="hint">投稿后将进入待审队列，管理员审核通过才会上架。</text>
    </view>
  </view>
</template>

<style scoped>
.page { padding: 28rpx; min-height: 100vh; }
.card { border-radius: 18rpx; padding: 28rpx; margin-bottom: 22rpx; }
.card-head { display: flex; align-items: center; gap: 12rpx; margin-bottom: 8rpx; }
.card-head .label { margin: 0; }
.label { display: block; font-size: 26rpx; color: #7C7A74; margin: 18rpx 0 8rpx; }
.field { height: 84rpx; background: rgba(255,255,255,.66); border: 1.5px solid rgba(255,255,255,.8); border-radius: 12rpx; padding: 0 22rpx; font-size: 28rpx; color: #14141A; box-shadow: inset 0 1px 0 rgba(255,255,255,.85); }
.pick { margin: 6rpx 0 4rpx; background: rgba(225,29,72,.12); color: #E11D48; font-size: 26rpx; height: 84rpx; line-height: 84rpx; border-radius: 12rpx; transition: transform .12s ease, opacity .12s ease; }
.pick-hover { transform: scale(.98); opacity: .85; }
.btn { margin-top: 26rpx; background: #E11D48; color: #fff; height: 88rpx; line-height: 88rpx; border-radius: 12rpx; font-weight: 700; width: 100%; transition: transform .12s ease, opacity .12s ease; }
.btn:active { transform: scale(.97); opacity: .9; }
.hint { display: block; text-align: center; color: #7C7A74; font-size: 24rpx; margin-top: 16rpx; }
</style>
