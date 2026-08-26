<script setup>
import { ref, onMounted } from 'vue'
import { store, loadUser } from '../../store/index.js'
import Icon from '../../components/Icon.vue'

const loggedIn = ref(false)

onMounted(() => {
  loadUser()
  loggedIn.value = !!(store.user && store.user.username)
})

function start() {
  if (loggedIn.value) uni.reLaunch({ url: '/pages/home/home' })
  else uni.reLaunch({ url: '/pages/login/login' })
}
</script>

<template>
  <view class="welcome">
    <view class="sky"></view>
    <view class="sun"></view>

    <!-- 卡通渲染山峦（原创 SVG，多层大气透视 + 白色描边高光） -->
    <view class="scene">
      <svg class="scene-svg" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="wm1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cdd9ee"/><stop offset="1" stop-color="#b9c8e6"/></linearGradient>
          <linearGradient id="wm2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9bce0"/><stop offset="1" stop-color="#8ba3d2"/></linearGradient>
          <linearGradient id="wm3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7e98c8"/><stop offset="1" stop-color="#5e79b0"/></linearGradient>
          <linearGradient id="wm4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#566fa6"/><stop offset="1" stop-color="#3c5488"/></linearGradient>
          <linearGradient id="whill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe0c4"/><stop offset="1" stop-color="#aecba0"/></linearGradient>
        </defs>
        <path d="M0,300 L160,210 L300,270 L470,180 L640,260 L820,190 L1010,270 L1200,210 L1200,600 L0,600 Z" fill="url(#wm1)" opacity=".75"/>
        <path d="M0,300 L160,210 L300,270 L470,180 L640,260 L820,190 L1010,270 L1200,210" fill="none" stroke="#ffffff" stroke-opacity=".55" stroke-width="2"/>
        <path d="M0,360 L210,260 L380,330 L560,250 L760,330 L980,255 L1200,330 L1200,600 L0,600 Z" fill="url(#wm2)"/>
        <path d="M0,360 L210,260 L380,330 L560,250 L760,330 L980,255 L1200,330" fill="none" stroke="#ffffff" stroke-opacity=".5" stroke-width="2"/>
        <path d="M0,430 L180,330 L360,410 L540,320 L740,410 L940,330 L1200,420 L1200,600 L0,600 Z" fill="url(#wm3)"/>
        <path d="M0,430 L180,330 L360,410 L540,320 L740,410 L940,330 L1200,420" fill="none" stroke="#eaf1ff" stroke-opacity=".45" stroke-width="2.5"/>
        <path d="M0,500 L220,400 L430,480 L650,395 L880,485 L1100,405 L1200,470 L1200,600 L0,600 Z" fill="url(#wm4)"/>
        <path d="M0,500 L220,400 L430,480 L650,395 L880,485 L1100,405 L1200,470" fill="none" stroke="#dfe9ff" stroke-opacity=".4" stroke-width="3"/>
        <path d="M0,540 Q300,510 600,535 T1200,530 L1200,600 L0,600 Z" fill="url(#whill)" opacity=".9"/>
        <ellipse cx="300" cy="350" rx="220" ry="26" fill="#ffffff" opacity=".35"/>
        <ellipse cx="860" cy="300" rx="260" ry="22" fill="#ffffff" opacity=".3"/>
      </svg>
    </view>
    <view class="water"></view>

    <!-- 风元素光尘 -->
    <view class="motes">
      <view class="mote m1"></view><view class="mote m2"></view><view class="mote m3"></view>
      <view class="mote m4"></view><view class="mote m5"></view>
    </view>

    <view class="center">
      <view class="logo">同学录</view>
      <view class="sub">Classbook</view>
    </view>

    <view class="actions">
      <button class="btn" hover-class="btn-hover" @click="start">{{ loggedIn ? '进入同学录' : '开始使用' }}</button>
      <text class="hint" v-if="loggedIn">已登录：{{ store.user.name || store.user.username }}</text>
    </view>
    <view class="foot">CLASSBOOK · 同学录系统</view>
  </view>
</template>

<style scoped>
.welcome {
  position: relative; min-height: 100vh; overflow: hidden;
  background: radial-gradient(120% 80% at 50% 12%, #ffffff 0%, #eef3fb 38%, #e6eefb 70%, #dfe9f7 100%);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 60rpx;
}
.sky { position: absolute; inset: 0; }
.sun {
  position: absolute; left: 50%; top: 14%; width: 360rpx; height: 360rpx;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(255,247,224,.9) 0%, rgba(255,243,210,.45) 30%, rgba(255,240,200,0) 62%);
  animation: w-breath 7s ease-in-out infinite;
}
@keyframes w-breath { 0%,100%{opacity:.8;transform:translate(-50%,-50%) scale(1)} 50%{opacity:1;transform:translate(-50%,-50%) scale(1.06)} }
.scene { position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: 460rpx; }
.scene-svg { width: 100%; height: 100%; display: block; }
.water { position: absolute; left: 0; right: 0; bottom: 0; height: 130rpx;
  background: linear-gradient(180deg, rgba(214,228,247,0) 0%, rgba(208,224,246,.55) 55%, rgba(200,219,244,.8) 100%); }
.motes { position: absolute; inset: 0; pointer-events: none; }
.mote { position: absolute; width: 10rpx; height: 10rpx; border-radius: 50%; background: rgba(255,244,210,.9); box-shadow: 0 0 12rpx rgba(255,244,210,.8); animation: w-float 6s ease-in-out infinite; }
.m1{left:18%;top:30%;animation-delay:0s}.m2{left:36%;top:46%;animation-delay:1.2s}
.m3{left:54%;top:24%;animation-delay:2.1s}.m4{left:70%;top:40%;animation-delay:.6s}
.m5{left:84%;top:32%;animation-delay:1.8s}
@keyframes w-float { 0%,100%{transform:translateY(0);opacity:.4} 50%{transform:translateY(-24rpx);opacity:1} }
.center { position: absolute; left: 50%; top: 42%; transform: translate(-50%,-50%); text-align: center; z-index: 5; }
.logo {
  font-size: 96rpx; font-weight: 800; letter-spacing: 8rpx; line-height: 1;
  background: linear-gradient(180deg, #5a6a86 0%, #3a4a63 55%, #2b3a52 100%);
  -webkit-background-clip: text; background-clip: text; color: #3a4a63;
  text-shadow: 0 2rpx 18rpx rgba(120,140,180,.35);
  animation: w-glow 1.6s 0.3s cubic-bezier(.2,.7,.2,1) both;
}
.sub { margin-top: 18rpx; font-size: 26rpx; letter-spacing: 10rpx; color: #8a96ad; font-weight: 500;
  animation: w-up 1.4s 0.8s ease both; text-transform: uppercase; }
@keyframes w-glow { from{opacity:0;filter:blur(14rpx);transform:scale(.96)} to{opacity:1;filter:blur(0);transform:scale(1)} }
@keyframes w-up { from{opacity:0;transform:translateY(12rpx)} to{opacity:1;transform:translateY(0)} }
.actions { position: absolute; left: 50%; bottom: 14%; transform: translateX(-50%); width: 80%; z-index: 6; }
.btn {
  height: 96rpx; line-height: 96rpx; color: #8a7338; font-size: 32rpx; font-weight: 700; letter-spacing: 6rpx;
  border: 1px solid rgba(201,162,75,.65); border-radius: 48rpx;
  background: linear-gradient(180deg, rgba(255,255,255,.7), rgba(244,247,252,.55));
  box-shadow: 0 6rpx 22rpx rgba(150,170,210,.28), inset 0 0 0 1px rgba(255,255,255,.6);
  transition: transform .12s ease, opacity .12s ease;
}
.btn-hover { transform: scale(.97); opacity: .9; box-shadow: 0 8rpx 30rpx rgba(201,162,75,.35); }
.hint { display: block; text-align: center; color: #7C7A74; font-size: 24rpx; margin-top: 24rpx; }
.foot { position: absolute; bottom: 48rpx; color: #b8b4ac; font-size: 22rpx; letter-spacing: 2rpx; }
</style>
