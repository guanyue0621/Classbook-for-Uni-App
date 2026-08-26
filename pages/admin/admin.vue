<script setup>
import { ref, onMounted } from 'vue'
import { get, post } from '../../utils/request.js'
import BottomNav from '../../components/BottomNav.vue'
import Icon from '../../components/Icon.vue'

const form = ref({
  allow_login: true,
  passkey: true,
  yicloud: true,
  email: true,
  otp: true,
  ai_enabled: true,
  ai_sched_enabled: false,
  ai_start: '08:00',
  ai_end: '22:00',
  max_fails: 5,
  ip_lock_sec: 3600,
  account_lock_sec: 86400,
  yicloud_secret: '',
  app_version: '1.11.01'
})
const loading = ref(false)
const saved = ref('')

async function load() {
  loading.value = true
  const r = await get('/api/settings')
  if (r.data && r.data.ok) {
    const c = r.data
    const lm = c.login_methods || {}
    const sys = c.system || {}
    const sec = c.security || {}
    const lg = sec.login || {}
    form.value = {
      allow_login: sys.allow_login !== false,
      passkey: lm.passkey !== false,
      yicloud: lm.yicloud !== false,
      email: lm.email !== false,
      otp: lm.otp !== false,
      ai_enabled: !!c.ai_enabled,
      ai_sched_enabled: !!(c.ai_schedule && c.ai_schedule.enabled),
      ai_start: (c.ai_schedule && c.ai_schedule.start) || '08:00',
      ai_end: (c.ai_schedule && c.ai_schedule.end) || '22:00',
      max_fails: lg.max_fails || 5,
      ip_lock_sec: lg.ip_lock_sec || 3600,
      account_lock_sec: lg.account_lock_sec || 86400,
      yicloud_secret: '',
      app_version: c.app_version || '1.11.01'
    }
  } else if (r.statusCode === 403) {
    uni.showToast({ title: '无权限（需管理员）', icon: 'none' })
  }
  loading.value = false
}

async function save() {
  const payload = {
    system: { allow_login: form.value.allow_login },
    login_methods: {
      passkey: form.value.passkey, yicloud: form.value.yicloud,
      email: form.value.email, otp: form.value.otp
    },
    ai_manual: form.value.ai_enabled,
    ai_schedule: {
      enabled: form.value.ai_sched_enabled,
      start: form.value.ai_start, end: form.value.ai_end
    },
    security: {
      login: {
        max_fails: Number(form.value.max_fails),
        ip_lock_sec: Number(form.value.ip_lock_sec),
        account_lock_sec: Number(form.value.account_lock_sec)
      }
    },
    yicloud_secret: form.value.yicloud_secret,
    app_version: form.value.app_version
  }
  const r = await post('/api/settings', payload)
  saved.value = (r.data && r.data.ok) ? '已保存' : ((r.data && r.data.msg) || '保存失败')
  if (!r.data || !r.data.ok) uni.showToast({ title: saved.value, icon: 'none' })
}

function bool(key, e) { form.value[key] = e.detail.value }

onMounted(load)
</script>

<template>
  <view class="page">
    <view class="title">权限管理面板</view>

    <view class="card glass">
      <view class="card-head"><Icon name="key" :size="34" color="#E11D48" /><view class="sec">登录与方式</view></view>
      <view class="row"><text>允许登录</text><switch :checked="form.allow_login" @change="bool('allow_login', $event)" /></view>
      <view class="row"><text>Passkey 登录</text><switch :checked="form.passkey" @change="bool('passkey', $event)" /></view>
      <view class="row"><text>亦云账号登录</text><switch :checked="form.yicloud" @change="bool('yicloud', $event)" /></view>
      <view class="row"><text>邮箱登录</text><switch :checked="form.email" @change="bool('email', $event)" /></view>
      <view class="row"><text>OTP 动态码</text><switch :checked="form.otp" @change="bool('otp', $event)" /></view>
    </view>

    <view class="card glass">
      <view class="card-head"><Icon name="key" :size="34" color="#E11D48" /><view class="sec">AI 助手</view></view>
      <view class="row"><text>AI 开关</text><switch :checked="form.ai_enabled" @change="bool('ai_enabled', $event)" /></view>
      <view class="row"><text>定时开启</text><switch :checked="form.ai_sched_enabled" @change="bool('ai_sched_enabled', $event)" /></view>
      <view class="row"><text>开始时间</text><input class="mini" v-model="form.ai_start" placeholder="08:00" /></view>
      <view class="row"><text>结束时间</text><input class="mini" v-model="form.ai_end" placeholder="22:00" /></view>
    </view>

    <view class="card glass">
      <view class="card-head"><Icon name="shield" :size="34" color="#E11D48" /><view class="sec">安全阈值</view></view>
      <view class="row"><text>最大失败次数</text><input class="mini" type="number" v-model="form.max_fails" /></view>
      <view class="row"><text>IP 锁定时长(秒)</text><input class="mini" type="number" v-model="form.ip_lock_sec" /></view>
      <view class="row"><text>账号锁定时长(秒)</text><input class="mini" type="number" v-model="form.account_lock_sec" /></view>
    </view>

    <view class="card glass">
      <view class="card-head"><Icon name="gear" :size="34" color="#E11D48" /><view class="sec">其他</view></view>
      <view class="row col"><text>亦云校验秘钥</text><input class="field" v-model="form.yicloud_secret" placeholder="留空则保持不变" /></view>
      <view class="row col"><text>应用版本号</text><input class="field" v-model="form.app_version" placeholder="如 1.11.01" /></view>
    </view>

    <button class="btn" @click="save">保存设置</button>
    <text v-if="saved" class="saved">{{ saved }}</text>
    <view v-if="loading" class="tip">加载中...</view>
    <BottomNav active="home" />
  </view>
</template>

<style scoped>
.page { padding: 24rpx 24rpx 160rpx; min-height: 100vh; }
.title { font-size: 40rpx; font-weight: 800; color: #14141A; margin: 8rpx 0 20rpx; }
.card { border-radius: 18rpx; padding: 8rpx 24rpx; margin-bottom: 16rpx; }
.card-head { display: flex; align-items: center; gap: 10rpx; }
.card-head .sec { padding: 18rpx 0 6rpx; }
.sec { font-size: 28rpx; font-weight: 700; color: #E11D48; padding: 18rpx 0 6rpx; }
.row { display: flex; align-items: center; justify-content: space-between; padding: 18rpx 0; border-bottom: 1px solid rgba(231,228,221,.6); }
.row:last-child { border-bottom: none; }
.row.col { flex-direction: column; align-items: stretch; gap: 10rpx; }
.mini { width: 220rpx; text-align: right; font-size: 28rpx; color: #14141A; background: transparent; }
.field { height: 80rpx; background: rgba(255,255,255,.66); border: 1.5px solid rgba(255,255,255,.8); border-radius: 12rpx; padding: 0 20rpx; font-size: 28rpx; color: #14141A; box-shadow: inset 0 1px 0 rgba(255,255,255,.85); }
.btn { background: #E11D48; color: #fff; height: 88rpx; line-height: 88rpx; border-radius: 12rpx; margin-top: 8rpx; font-weight: 700; width: 100%; transition: transform .12s ease, opacity .12s ease; }
.btn:active { transform: scale(.97); opacity: .9; }
.saved { display: block; text-align: center; color: #18a058; font-size: 26rpx; margin-top: 14rpx; }
.tip { text-align: center; color: #7C7A74; padding: 20rpx 0; }
</style>
