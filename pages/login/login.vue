<script setup>
import { ref, onMounted } from 'vue'
import { request, post, setBase, getBase } from '../../utils/request.js'
import { setUser } from '../../store/index.js'
import { localNotify } from '../../utils/push.js'

const username = ref('')
const password = ref('')
const answer = ref('')
const captchaImg = ref('')   // 图片验证码 data URL
const captchaText = ref('')  // PIL 缺失时的文本降级
const loading = ref(false)
const err = ref('')

// 两步登录：pwd（学号+密码+验证码） -> email（邮箱验证码）
const step = ref('pwd')
const pre = ref('')
const emailCode = ref('')
const emailMask = ref('')
const emailErr = ref('')
const resendLeft = ref(0)

// 服务器地址（首屏即可设置，便于浏览器/H5 直接指向自己的后端）
const showServer = ref(false)
const serverInput = ref(getBase() || '')

function saveServer() {
  let v = (serverInput.value || '').trim().replace(/\/+$/, '')
  if (!v) { err.value = '请填写服务器地址'; return }
  setBase(v)
  err.value = ''
  loadCaptcha()
}

function loadCaptcha() {
  request('/api/captcha').then(r => {
    if (r.data && r.data.ok) {
      captchaImg.value = r.data.image || ''
      captchaText.value = r.data.text || ''
      answer.value = ''
    }
  }).catch(() => {})
}

async function doLogin() {
  if (step.value !== 'pwd') return
  if (!username.value || !password.value || !answer.value) { err.value = '请填写学号、密码与验证码'; return }
  loading.value = true
  err.value = ''
  try {
    const c = await post('/api/captcha/check', { answer: answer.value })
    if (!c.data || !c.data.ok) {
      err.value = (c.data && c.data.msg) || '人机验证失败'
      answer.value = ''
      loadCaptcha()
      loading.value = false
      return
    }
    const lg = await post('/api/login', { username: username.value, password: password.value, remember: true, client: 'app' })
    // 手机端：账号已绑定邮箱且系统启用 → 进入邮箱验证码二次验证（与网页端并存）
    if (lg.data && lg.data.ok && lg.data.need_email) {
      step.value = 'email'
      pre.value = lg.data.pre
      emailMask.value = lg.data.email_mask || ''
      emailErr.value = ''
      startResend()
      loading.value = false
      return
    }
    if (lg.data && lg.data.ok) {
      await finishLogin()
    } else {
      err.value = (lg.data && lg.data.msg) || '登录失败'
      answer.value = ''
      loadCaptcha()
    }
  } catch (e) {
    err.value = '网络错误，请检查服务器地址或网络'
  }
  loading.value = false
}

async function finishLogin() {
  const me = await request('/api/me')
  if (me.data && me.data.ok) setUser(me.data.user, me.data.bg)
  localNotify('登录成功', '欢迎回来，' + ((me.data && me.data.user && me.data.user.name) || ''))
  uni.reLaunch({ url: '/pages/home/home' })
}

async function verifyEmail() {
  if (!emailCode.value) { emailErr.value = '请输入验证码'; return }
  loading.value = true
  emailErr.value = ''
  try {
    const r = await post('/api/login/email/verify', { pre: pre.value, code: emailCode.value })
    if (r.data && r.data.ok) {
      await finishLogin()
    } else {
      emailErr.value = (r.data && r.data.msg) || '验证失败'
    }
  } catch (e) {
    emailErr.value = '网络错误'
  }
  loading.value = false
}

function startResend() {
  resendLeft.value = 60
  const t = setInterval(() => { resendLeft.value--; if (resendLeft.value <= 0) clearInterval(t) }, 1000)
}
async function resendCode() {
  if (resendLeft.value > 0) return
  try {
    const r = await post('/api/login/email/resend', { pre: pre.value })
    if (!(r.data && r.data.ok)) emailErr.value = (r.data && r.data.msg) || '重发失败'
  } catch (e) { emailErr.value = '网络错误' }
  startResend()
}
function backToPwd() { step.value = 'pwd'; emailCode.value = ''; emailErr.value = '' }

onMounted(loadCaptcha)
</script>

<template>
  <view class="login">
    <view class="gate-hero login-gate">
      <svg class="gate-svg" viewBox="0 0 1200 360" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="skyL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BFE0FF"/><stop offset="1" stop-color="#EAF4FF"/></linearGradient>
        <linearGradient id="penL" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#F6C95B"/><stop offset="1" stop-color="#E9A23B"/></linearGradient></defs>
        <rect width="1200" height="360" fill="url(#skyL)"/>
        <circle cx="170" cy="86" r="44" fill="#F4CE5E"/>
        <g stroke="#F4CE5E" stroke-width="5" stroke-linecap="round"><line x1="170" y1="18" x2="170" y2="38"/><line x1="236" y1="86" x2="216" y2="86"/><line x1="104" y1="86" x2="124" y2="86"/><line x1="214" y1="42" x2="201" y2="29"/><line x1="126" y1="42" x2="139" y2="29"/></g>
        <g fill="#fff" opacity=".9"><ellipse cx="430" cy="66" rx="58" ry="24"/><ellipse cx="478" cy="54" rx="42" ry="20"/><ellipse cx="960" cy="56" rx="50" ry="22"/></g>
        <rect y="270" width="1200" height="90" fill="#BFE3C6"/>
        <g><rect x="250" y="110" width="32" height="180" rx="6" fill="url(#penL)"/><rect x="248" y="84" width="36" height="32" rx="6" fill="#2563EB"/><polygon points="250,84 284,84 267,54 250,84" fill="#E9C46A"/></g>
        <g><rect x="918" y="110" width="32" height="180" rx="6" fill="url(#penL)"/><rect x="916" y="84" width="36" height="32" rx="6" fill="#2563EB"/><polygon points="918,84 952,84 935,54 918,84" fill="#E9C46A"/></g>
        <rect x="238" y="84" width="724" height="32" rx="8" fill="#E11D48"/>
        <text x="600" y="107" text-anchor="middle" font-family="Nunito,Noto Sans SC,sans-serif" font-size="22" font-weight="900" fill="#fff" letter-spacing="6">开 学 啦</text>
        <g transform="translate(600,272)"><circle cx="0" cy="-62" r="19" fill="#F3C9A0"/><rect x="-15" y="-46" width="30" height="38" rx="9" fill="#2563EB"/><rect x="-15" y="-24" width="13" height="24" fill="#F3C9A0"/><rect x="2" y="-24" width="13" height="24" fill="#F3C9A0"/><rect x="-19" y="-46" width="15" height="32" rx="6" fill="#E11D48"/></g>
        <g transform="translate(820,128) rotate(16)"><polygon points="0,0 50,-11 20,16" fill="#fff" stroke="#2563EB" stroke-width="2"/><polygon points="0,0 20,16 6,20" fill="#E7EEFB"/></g>
      </svg>
      <view class="gh-text"><view class="gh-h">新学期 · 新气象</view><view class="gh-p">同学录 · 一份留给未来的档案</view><view class="gh-tag">欢迎回来</view></view>
    </view>
    <view class="brand">
      <view class="logo">CLASSBOOK</view>
      <view class="sub">同学录 · 一份留给未来的档案</view>
    </view>

    <!-- 第一步：学号 + 密码 + 验证码 -->
    <view v-if="step === 'pwd'" class="card glass">
      <input class="inp" v-model="username" placeholder="学号" />
      <input class="inp" v-model="password" placeholder="密码" password />
      <view class="cap">
        <view class="cap-img-box" @click="loadCaptcha">
          <image v-if="captchaImg" :src="captchaImg" class="cap-img" mode="aspectFit" />
          <text v-else-if="captchaText" class="cap-text">{{ captchaText }}</text>
          <text v-else class="cap-loading">验证码加载中...</text>
        </view>
        <input class="inp cap-a" v-model="answer" placeholder="输入图片中的字符" />
      </view>
      <text class="cap-tip" @click="loadCaptcha">看不清？点击图片换一张</text>
      <text v-if="err" class="err">{{ err }}</text>
      <button class="btn" :loading="loading" @click="doLogin">登 录</button>
      <view class="srv-toggle" @click="showServer = !showServer">
        {{ showServer ? '收起服务器设置 ▲' : '服务器设置 ▼' }}
      </view>
      <view v-if="showServer" class="srv-box glass">
        <input class="inp" v-model="serverInput" placeholder="服务器地址，如 http://localhost:1234" />
        <button class="btn srv-btn" @click="saveServer">保存并刷新验证码</button>
        <text class="srv-tip">当前：{{ getBase() || '（未设置，将尝试远程/默认地址）' }}</text>
      </view>
    </view>

    <!-- 第二步：邮箱验证码（仅手机端、已绑定邮箱时） -->
    <view v-else class="card glass">
      <view class="email-hd">📧 邮箱验证</view>
      <view class="email-tip">验证码已发送至 <text class="email-mask">{{ emailMask }}</text></view>
      <input class="inp" v-model="emailCode" placeholder="请输入 6 位验证码" maxlength="6" />
      <text v-if="emailErr" class="err">{{ emailErr }}</text>
      <button class="btn" :loading="loading" @click="verifyEmail">验 证 并 登 录</button>
      <view class="email-row">
        <text class="email-resend" @click="resendCode">{{ resendLeft > 0 ? resendLeft + ' 秒后重发' : '重新发送验证码' }}</text>
        <text class="email-back" @click="backToPwd">← 返回</text>
      </view>
    </view>
  </view>
</template>

<style scoped>
.login {
  min-height: 100vh;
  background: #FBF7EE;
  background-image: repeating-linear-gradient(0deg, transparent 0 26px, rgba(37,99,235,.07) 26px 27px);
  display: flex; flex-direction: column; align-items: center; padding-top: 120rpx;
}
.brand { color: #14141A; text-align: center; margin-bottom: 56rpx; }
.logo { font-size: 66rpx; font-weight: 800; letter-spacing: 4rpx; }
.sub { font-size: 26rpx; opacity: .7; margin-top: 12rpx; color: #7C7A74; }
/* 液态玻璃卡片 */
.glass {
  background: rgba(255,255,255,.55);
  -webkit-backdrop-filter: blur(16px) saturate(1.35);
  backdrop-filter: blur(16px) saturate(1.35);
  border: 1px solid rgba(255,255,255,.65);
  box-shadow: 0 12rpx 40rpx -14rpx rgba(31,38,80,.30), inset 0 1px 0 rgba(255,255,255,.7);
}
.card { width: 86%; border-radius: 28rpx; padding: 52rpx 40rpx; }
.inp {
  height: 88rpx; background: rgba(255,255,255,.66);
  border: 1.5px solid rgba(255,255,255,.8); border-radius: 14rpx;
  padding: 0 24rpx; margin-bottom: 24rpx; font-size: 30rpx; color: #14141A;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.85), 0 4rpx 14rpx -10rpx rgba(31,38,80,.4);
}
.inp:focus { border-color: #E11D48; background: rgba(255,255,255,.86); }
.cap { display: flex; align-items: center; gap: 16rpx; margin-bottom: 8rpx; }
.cap-img-box {
  width: 200rpx; height: 88rpx; background: rgba(255,255,255,.7);
  border: 1.5px solid rgba(255,255,255,.8); border-radius: 14rpx;
  display: flex; align-items: center; justify-content: center; overflow: hidden;
}
.cap-img { width: 200rpx; height: 88rpx; }
.cap-text { font-size: 34rpx; font-weight: 800; letter-spacing: 6rpx; color: #E11D48; }
.cap-loading { font-size: 22rpx; color: #999; }
.cap-a { flex: 1; margin-bottom: 0; }
.cap-tip { font-size: 22rpx; color: #E11D48; margin: 8rpx 0 20rpx; display: block; text-align: right; }
.err { color: #E11D48; font-size: 26rpx; margin: 4rpx 0 16rpx; display: block; }
.btn {
  height: 92rpx; line-height: 92rpx; background: #14141A; color: #fff;
  border-radius: 14rpx; font-size: 32rpx; margin-top: 12rpx; font-weight: 700;
}
.btn:active { background: #000; }
.srv-toggle { margin-top: 24rpx; color: #7C7A74; font-size: 24rpx; text-align: center; }
.srv-box { margin-top: 16rpx; border-radius: 18rpx; padding: 20rpx; }
.srv-btn { background: #E11D48; height: 76rpx; line-height: 76rpx; font-size: 28rpx; }
.srv-tip { display: block; margin-top: 12rpx; font-size: 22rpx; color: #7C7A74; word-break: break-all; }
/* ── 邮箱验证步骤 ── */
.email-hd { font-size: 36rpx; font-weight: 800; text-align: center; margin-bottom: 8rpx; color: #14141A; }
.email-tip { font-size: 24rpx; color: #7C7A74; text-align: center; margin-bottom: 24rpx; }
.email-mask { color: #E11D48; font-weight: 700; }
.email-row { display: flex; align-items: center; justify-content: space-between; margin-top: 20rpx; }
.email-resend { font-size: 24rpx; color: #E11D48; }
.email-back { font-size: 24rpx; color: #7C7A74; }
</style>
