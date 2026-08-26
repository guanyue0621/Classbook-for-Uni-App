<script setup>
import { ref, reactive, computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { post, request } from '../../utils/request.js'
import { store, clearUser, setBg } from '../../store/index.js'
import { getBase, setBase } from '../../utils/request.js'
import SideBar from '../../components/SideBar.vue'
import BottomNav from '../../components/BottomNav.vue'
import Icon from '../../components/Icon.vue'
import BgLayer from '../../components/BgLayer.vue'
import { isWideScreen } from '../../utils/layout.js'

const wide = ref(false)
const loading = ref(false)
const err = ref('')
const serverInput = ref('')

// 只读资料（来自 /api/me 的 student 完整档案）
const profile = reactive({})
const profileKeys = [
  ['name', '姓名'], ['nickname', '昵称'], ['gender', '性别'], ['hometown', '家乡'],
  ['phone', '电话'], ['class', '班级'], ['actual_class', '实际班级'],
  ['actual_school', '实际学校'], ['hobby', '爱好'], ['games', '常玩游戏'],
  ['social', '社交账号'], ['poem', '寄语']
]

// 改密码
const pwd = reactive({ old: '', new: '', again: '' })
const savingPwd = ref(false)
const pwdMsg = ref('')

// 安全状态
const sec = reactive({ has_passkey: false, yicloud_id: '', has_email: false, has_otp: false })

const displayName = computed(() => {
  const u = store.user
  if (!u) return '未登录'
  return u.name || u.nickname || u.student_no || u.username || '同学'
})
const roleText = computed(() => store.isAdmin ? '管理员' : '同学')
const studentNo = computed(() => (store.user && store.user.student_no) || '—')

onShow(async () => {
  wide.value = isWideScreen()
  serverInput.value = getBase() || ''
  await loadMe()
})

async function loadMe() {
  loading.value = true
  err.value = ''
  try {
    const r = await request('/api/me')
    if (r.data && r.data.ok) {
      const u = r.data.user || {}
      const st = r.data.student || {}
      store.user = u
      store.isAdmin = !!u.is_admin
      if (r.data.bg) setBg(r.data.bg)
      sec.has_passkey = !!u.has_passkey
      sec.yicloud_id = u.yicloud_id || ''
      sec.has_email = !!u.has_email
      sec.has_otp = !!u.has_otp
      for (const [k] of profileKeys) profile[k] = st[k] || ''
    } else if (r.statusCode === 401) {
      clearUser()
      uni.reLaunch({ url: '/pages/login/login' })
    } else {
      err.value = '加载失败，请点击重试'
    }
  } catch (e) {
    err.value = '连接服务器超时，点击屏幕重试（可在下方「服务器地址」修正）'
  }
  loading.value = false
}

async function savePwd() {
  if (pwd.new !== pwd.again) { pwdMsg.value = '两次新密码不一致'; return }
  if (!pwd.new) { pwdMsg.value = '新密码不能为空'; return }
  savingPwd.value = true
  pwdMsg.value = ''
  const r = await post('/api/me/password', { old_password: pwd.old, new_password: pwd.new })
  savingPwd.value = false
  const d = r.data || {}
  pwdMsg.value = d.ok ? '密码已修改' : (d.msg || '修改失败')
  if (d.ok) { pwd.old = pwd.new = pwd.again = '' }
  uni.showToast({ title: pwdMsg.value, icon: 'none' })
}

function saveServer() {
  const v = (serverInput.value || '').trim().replace(/\/+$/, '')
  if (!v) { uni.showToast({ title: '地址不能为空', icon: 'none' }); return }
  setBase(v)
  uni.showToast({ title: '服务器地址已保存', icon: 'none' })
}

function goScan() { uni.navigateTo({ url: '/pages/scan/scan' }) }
async function logout() {
  await post('/api/logout', {})
  clearUser()
  uni.reLaunch({ url: '/pages/login/login' })
}
function goAdmin() { uni.navigateTo({ url: '/pages/admin/admin' }) }
</script>

<template>
  <view class="page" :class="{ wide: wide }">
    <BgLayer />
    <SideBar v-if="wide" active="me" />
    <view class="main">
      <view v-if="loading" class="loading">加载中…</view>
      <view v-else-if="err" class="loading err" @click="loadMe">{{ err }}（点击重试）</view>

      <!-- 顶部资料卡 -->
      <view class="head glass">
        <view class="ava ava-pendant">{{ displayName.slice(0, 1) }}</view>
        <view class="info">
          <text class="nm">{{ displayName }}</text>
          <text class="rl">{{ roleText }} · #{{ studentNo }}</text>
        </view>
      </view>

      <!-- 只读资料 -->
      <view class="card glass">
        <view class="card-head"><Icon name="user" :size="36" color="#E11D48" /><text class="label">我的资料（只读）</text></view>
        <view class="note">App 端仅可查看；正式修改请到电脑网页端「我的」页面编辑并提交。</view>
        <view v-for="[k, t] in profileKeys" :key="k" class="row">
          <text class="row-k">{{ t }}</text>
          <text class="row-v">{{ profile[k] || '—' }}</text>
        </view>
      </view>

      <!-- 修改密码 -->
      <view class="card glass">
        <view class="card-head"><Icon name="key" :size="36" color="#E11D48" /><text class="label">修改密码</text></view>
        <text class="label">旧密码</text>
        <input class="field" password v-model="pwd.old" placeholder="请输入旧密码" />
        <text class="label">新密码</text>
        <input class="field" password v-model="pwd.new" placeholder="至少 6 位" />
        <text class="label">再次输入新密码</text>
        <input class="field" password v-model="pwd.again" placeholder="再次输入新密码" />
        <button class="btn" :loading="savingPwd" @click="savePwd">修改密码</button>
        <text v-if="pwdMsg" class="msg">{{ pwdMsg }}</text>
      </view>

      <!-- 扫码登录电脑端 -->
      <view class="card glass">
        <view class="card-head"><Icon name="qr" :size="36" color="#E11D48" /><text class="label">扫码登录电脑端</text></view>
        <view class="note">用电脑打开同学录网页端，点击「扫码登录」，再用此处扫码即可在电脑端登录当前账号。</view>
        <button class="btn primary" @click="goScan">扫一扫登录电脑端</button>
      </view>

      <!-- 服务器地址 -->
      <view class="card glass">
        <view class="card-head"><Icon name="server" :size="36" color="#E11D48" /><text class="label">服务器地址</text></view>
        <text class="label">API 地址</text>
        <input class="field" v-model="serverInput" placeholder="https://…" />
        <button class="btn sm" @click="saveServer">保存地址</button>
      </view>

      <!-- 安全状态 -->
      <view class="card glass">
        <view class="card-head"><Icon name="shield" :size="36" color="#E11D48" /><text class="label">安全验证方式</text></view>
        <view class="row"><text class="row-k">Passkey</text><text class="pill" :class="sec.has_passkey ? 'on' : 'off'">{{ sec.has_passkey ? '已注册' : '未注册' }}</text></view>
        <view class="row"><text class="row-k">亦云账号</text><text class="row-v">{{ sec.yicloud_id ? ('已绑定：' + sec.yicloud_id) : '未绑定' }}</text></view>
        <view class="row"><text class="row-k">两步验证 OTP</text><text class="pill" :class="sec.has_otp ? 'on' : 'off'">{{ sec.has_otp ? '已启用' : '未启用' }}</text></view>
        <view class="row"><text class="row-k">邮箱</text><text class="pill" :class="sec.has_email ? 'on' : 'off'">{{ sec.has_email ? '已设置' : '未设置' }}</text></view>
      </view>

      <view v-if="store.isAdmin" class="card link glass" hover-class="link-hover" @click="goAdmin">
        <view class="link-l"><Icon name="gear" :size="36" color="#7C7A74" /><text>权限管理面板</text></view><Icon name="arrow" :size="40" color="#c9c7c1" />
      </view>
      <view class="card link danger glass" hover-class="link-hover" @click="logout">
        <view class="link-l"><Icon name="lock" :size="36" color="#E11D48" /><text>退出登录</text></view><Icon name="arrow" :size="40" color="#c9c7c1" />
      </view>
    </view>
    <BottomNav v-if="!wide" active="me" />
  </view>
</template>

<style scoped>
.page { min-height: 100vh; padding: 28rpx 28rpx 160rpx; background: transparent; position: relative; z-index: 1; }
.page.wide { display: flex; padding: 0; }
.page.wide .main { flex: 1; margin-left: 240rpx; padding: 28rpx 28rpx 160rpx; }
.glass { background: rgba(255,255,255,.55); -webkit-backdrop-filter: blur(16px) saturate(1.35); backdrop-filter: blur(16px) saturate(1.35); border: 1px solid rgba(255,255,255,.65); box-shadow: 0 12rpx 40rpx -14rpx rgba(31,38,80,.30), inset 0 1px 0 rgba(255,255,255,.7); }
.head { display: flex; align-items: center; border-radius: 28rpx; padding: 36rpx 32rpx; margin-bottom: 22rpx; }
.ava { width: 110rpx; height: 110rpx; border-radius: 50%; background: linear-gradient(135deg, #E11D48, #F0A48C); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 50rpx; font-weight: 700; box-shadow: 0 8rpx 22rpx -10rpx rgba(225,29,72,.5); }
.info { margin-left: 26rpx; }
.nm { display: block; font-size: 38rpx; font-weight: 800; color: #14141A; }
.rl { display: block; color: #7C7A74; font-size: 26rpx; margin-top: 8rpx; }
.card { border-radius: 24rpx; padding: 30rpx 28rpx; margin-bottom: 22rpx; }
.card-head { display: flex; align-items: center; gap: 12rpx; margin-bottom: 16rpx; }
.card-head .label { margin-bottom: 0; }
.label { display: block; font-size: 28rpx; font-weight: 700; color: #14141A; margin-bottom: 16rpx; }
.note { display: block; font-size: 24rpx; color: #7C7A74; line-height: 1.6; margin-bottom: 16rpx; }
.row { display: flex; align-items: center; justify-content: space-between; padding: 14rpx 0; border-bottom: 1px solid rgba(231,228,221,.6); }
.row:last-child { border-bottom: none; }
.row-k { font-size: 28rpx; color: #14141A; }
.row-v { font-size: 26rpx; color: #7C7A74; max-width: 60%; text-align: right; word-break: break-all; }
.btn { width: 100%; background: #14141A; color: #fff; height: 84rpx; line-height: 84rpx; border-radius: 14rpx; font-size: 29rpx; font-weight: 700; margin-top: 12rpx; transition: transform .12s ease, opacity .12s ease; }
.btn:active { transform: scale(.97); opacity: .9; }
.btn.sm { width: auto; padding: 0 36rpx; height: 78rpx; line-height: 78rpx; font-size: 27rpx; }
.btn.primary { background: #E11D48; }
.msg { display: block; color: #18a058; font-size: 24rpx; margin-top: 12rpx; }
.link { display: flex; align-items: center; justify-content: space-between; font-size: 32rpx; color: #14141A; min-height: 88rpx; transition: transform .12s ease, background .15s ease; }
.link-hover { transform: scale(.99); background: rgba(225,29,72,.08); }
.link-l { display: flex; align-items: center; gap: 16rpx; }
.danger { color: #E11D48; }
.loading { text-align: center; color: #7C7A74; font-size: 28rpx; padding: 40rpx 0; }
.loading.err { color: #E11D48; }
</style>
