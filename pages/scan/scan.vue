<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { post } from '../../utils/request.js'
import { localNotify } from '../../utils/push.js'

const qid = ref('')
const status = ref('idle')   // idle | scanning | confirming | success | fail
const msg = ref('')

onLoad((q) => {
  // 支持从 me 页直接传 qid（如果已通过其他渠道拿到）
  if (q && q.qid) {
    qid.value = q.qid
    doConfirm()
  }
})

function doScan() {
  status.value = 'scanning'
  msg.value = ''
  // #ifdef APP-PLUS
  uni.scanCode({
    onlyFromCamera: true,
    scanType: ['qrCode'],
    success: (res) => {
      const raw = (res.result || '').trim()
      // 支持格式：cbqr:{qid} 或 qr:{qid} 或纯 qid
      let parsed = raw
      const m = raw.match(/(?:cbqr|qr)?[:]{0,1}([0-9a-fA-F]{16,})/)
      if (m) parsed = m[1]
      if (!parsed || parsed.length < 16) {
        status.value = 'fail'
        msg.value = '无法识别二维码内容：' + raw
        return
      }
      qid.value = parsed
      doConfirm()
    },
    fail: () => {
      status.value = 'idle'
      msg.value = '已取消扫码'
    }
  })
  // #endif
  // #ifndef APP-PLUS
  status.value = 'fail'
  msg.value = '扫码功能仅在 App 端可用。H5 / 小程序请使用 App 扫码。'
  // #endif
}

async function doConfirm() {
  if (!qid.value) return
  status.value = 'confirming'
  msg.value = '正在确认登录…'
  try {
    const r = await post('/api/qr/confirm', { qid: qid.value })
    const d = r.data || {}
    if (d.ok) {
      status.value = 'success'
      msg.value = d.msg || '已确认，电脑端已登录'
      localNotify('扫码登录成功', '电脑端已登录')
      uni.showToast({ title: '登录成功', icon: 'success' })
      setTimeout(() => uni.navigateBack(), 1500)
    } else {
      status.value = 'fail'
      msg.value = d.msg || '二维码已失效或不存在'
    }
  } catch (e) {
    status.value = 'fail'
    msg.value = '网络错误，请重试'
  }
}
</script>

<template>
  <view class="page">
    <view class="card glass">
      <text class="title">扫码登录电脑端</text>
      <text class="note">用电脑打开同学录网页端，点击「扫码登录」显示二维码，再用此处扫码即可在电脑端登录当前账号。</text>

      <view v-if="status === 'idle'" class="scan-area" @click="doScan">
        <text class="scan-icon">⌖</text>
        <text class="scan-text">点击扫码</text>
      </view>

      <view v-else-if="status === 'scanning'" class="scan-area">
        <text class="scan-text">正在调起相机…</text>
      </view>

      <view v-else-if="status === 'confirming'" class="scan-area">
        <text class="scan-text">正在确认…</text>
      </view>

      <view v-else-if="status === 'success'" class="scan-area ok">
        <text class="scan-icon">✓</text>
        <text class="scan-text">{{ msg }}</text>
      </view>

      <view v-else-if="status === 'fail'" class="scan-area fail">
        <text class="scan-icon">✕</text>
        <text class="scan-text">{{ msg }}</text>
        <button class="btn retry" @click="doScan">重新扫码</button>
      </view>
    </view>
  </view>
</template>

<style scoped>
.page { min-height: 100vh; padding: 40rpx 32rpx; background: radial-gradient(120% 120% at 50% 0%, #FBF7F3 0%, #F4F3EF 60%); }
.glass { background: rgba(255,255,255,.55); -webkit-backdrop-filter: blur(16px) saturate(1.35); backdrop-filter: blur(16px) saturate(1.35); border: 1px solid rgba(255,255,255,.65); box-shadow: 0 12rpx 40rpx -14rpx rgba(31,38,80,.30), inset 0 1px 0 rgba(255,255,255,.7); }
.card { border-radius: 28rpx; padding: 48rpx 36rpx; }
.title { display: block; font-size: 38rpx; font-weight: 800; color: #14141A; text-align: center; margin-bottom: 20rpx; }
.note { display: block; font-size: 25rpx; color: #7C7A74; line-height: 1.7; text-align: center; margin-bottom: 40rpx; }
.scan-area { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400rpx; border: 3rpx dashed rgba(225,29,72,.35); border-radius: 24rpx; padding: 40rpx; }
.scan-area.ok { border-color: #43A047; background: rgba(67,160,71,.06); }
.scan-area.fail { border-color: #E11D48; background: rgba(225,29,72,.06); }
.scan-icon { font-size: 96rpx; color: #E11D48; margin-bottom: 20rpx; }
.scan-area.ok .scan-icon { color: #43A047; }
.scan-area.fail .scan-icon { color: #E11D48; }
.scan-text { font-size: 30rpx; color: #14141A; text-align: center; line-height: 1.6; }
.btn.retry { margin-top: 24rpx; background: #E11D48; color: #fff; height: 80rpx; line-height: 80rpx; border-radius: 14rpx; font-size: 28rpx; font-weight: 700; padding: 0 48rpx; width: auto; }
.btn.retry:active { transform: scale(.97); }
</style>
