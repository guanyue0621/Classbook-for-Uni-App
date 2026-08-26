<script setup>
import { ref } from 'vue'
import BottomNav from '../../components/BottomNav.vue'
import Icon from '../../components/Icon.vue'

// Uni-AD 广告位 ID（在「DCloud 开发者中心 → uniAD」申请后填入；留空则按钮提示未配置）
// 注意：插屏/激励视频直接调用引擎原生 API（plus.ad / uni.createRewardedVideoAd），
// 不依赖 js_sdk，因此无需 import 任何 uni-ad 包，避免构建报 Cannot find module。
const AD_INTERSTITIAL = ''   // 插屏广告位 id
const AD_REWARD = ''          // 激励视频广告位 id

const rewardedReady = ref(false)
const tip = ref('')

function showInterstitial() {
  // #ifdef APP-PLUS
  if (!AD_INTERSTITIAL) { tip.value = '插屏广告位未配置（在 uniAD 后台申请后填入 manifest 的 uni-ad）'; return }
  try {
    plus.ad.showInterstitialAd({
      adpid: AD_INTERSTITIAL,
      success: () => { tip.value = '感谢观看，赞助已收到 ❤' },
      fail: (e) => { tip.value = '广告展示失败：' + (e && e.message ? e.message : '未知错误') }
    })
  } catch (e) { tip.value = '当前环境不支持插屏广告' }
  // #endif
  // #ifndef APP-PLUS
  tip.value = '广告仅支持 App 端（Android/iOS），H5/小程序请到应用商店下载 App 版本'
  // #endif
}

function showRewarded() {
  // #ifdef APP-PLUS
  if (!AD_REWARD) { tip.value = '激励视频广告位未配置（在 uniAD 后台申请后填入 manifest 的 uni-ad）'; return }
  try {
    const adObj = uni.createRewardedVideoAd({ adpid: AD_REWARD })
    adObj.onLoad(() => rewardedReady.value = true)
    adObj.onError((e) => { tip.value = '激励视频加载失败：' + (e && e.errMsg ? e.errMsg : '未知错误') })
    adObj.onClose((res) => {
      if (res && res.isEnded) tip.value = '感谢支持！你的赞助将用于维持服务器运转 ❤'
      else tip.value = '视频未完成，未计入赞助'
    })
    adObj.load()
    adObj.show().catch(() => adObj.load().then(() => adObj.show()))
  } catch (e) { tip.value = '当前环境不支持激励视频' }
  // #endif
  // #ifndef APP-PLUS
  tip.value = '激励视频仅支持 App 端（Android/iOS）'
  // #endif
}

function goDonate() {
  // 可在此放置收款码/第三方赞助链接
  uni.showToast({ title: '可通过网页版「关于」页扫码赞助', icon: 'none' })
}
</script>

<template>
  <view class="page">
    <view class="brand">
      <Icon name="gift" :size="56" color="#E11D48" />
      <view class="logo">支持同学录</view>
      <view class="sub">你的赞助，让这份档案长久留存</view>
    </view>

    <view class="card glass">
      <view class="card-head"><Icon name="gift" :size="34" color="#E11D48" /><text class="sec">为什么需要赞助</text></view>
      <text class="txt">同学录的服务器、存储与带宽都需要成本。观看一段广告或小额赞助，都能帮它继续运转下去，免费服务每一位同学。</text>
    </view>

    <view class="card glass">
      <view class="card-head"><Icon name="play" :size="34" color="#E11D48" /><text class="sec">观看广告赞助（App 端）</text></view>
      <button class="btn primary" @click="showInterstitial">观看插屏广告</button>
      <button class="btn" @click="showRewarded">观看激励视频（约 30s）</button>
      <text v-if="tip" class="msg">{{ tip }}</text>
    </view>

    <view class="card glass">
      <view class="card-head"><Icon name="server" :size="34" color="#E11D48" /><text class="sec">直接赞助</text></view>
      <button class="btn" @click="goDonate">扫码 / 跳转赞助页</button>
    </view>

    <view class="note">广告由 DCloud uniAD 提供。H5 / 小程序端暂不支持广告组件，请使用 App 版本。</view>

    <BottomNav active="links" />
  </view>
</template>

<style scoped>
.page { padding: 28rpx 28rpx 160rpx; min-height: 100vh; }
.brand { text-align: center; padding: 30rpx 0 10rpx; display: flex; flex-direction: column; align-items: center; }
.brand :deep(.icon) { margin-bottom: 12rpx; }
.logo { font-size: 46rpx; font-weight: 800; color: #14141A; }
.sub { color: #7C7A74; font-size: 26rpx; margin-top: 8rpx; }
.card { border-radius: 24rpx; padding: 30rpx 28rpx; margin-bottom: 22rpx; }
.card-head { display: flex; align-items: center; gap: 12rpx; margin-bottom: 12rpx; }
.card-head .sec { margin-bottom: 0; }
.sec { display: block; font-size: 28rpx; font-weight: 700; color: #E11D48; margin-bottom: 12rpx; }
.txt { display: block; font-size: 26rpx; color: #14141A; line-height: 1.7; }
.btn { height: 84rpx; line-height: 84rpx; border-radius: 14rpx; font-size: 30rpx; font-weight: 700; color: #fff; background: #14141A; margin-top: 14rpx; width: 100%; transition: transform .12s ease, opacity .12s ease; }
.btn:active { transform: scale(.97); opacity: .9; }
.btn.primary { background: #E11D48; }
.msg { display: block; margin-top: 14rpx; font-size: 24rpx; color: #E11D48; }
.note { text-align: center; color: #7C7A74; font-size: 24rpx; margin-top: 20rpx; }
</style>
