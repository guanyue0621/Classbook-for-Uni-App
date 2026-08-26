<script setup>
import { onLaunch, onShow } from '@dcloudio/uni-app'
import { ensureBase, getBase, get } from './utils/request.js'
import { loadUser, store, setBg } from './store/index.js'
import { registerPush } from './utils/push.js'

onLaunch(() => {
  loadUser()
  ensureBase().then(async (b) => {
    store.base = b
    // 已登录用户：拉 /api/me 同步背景图
    if (store.user && store.user.username) {
      try {
        const r = await get('/api/me')
        if (r.data && r.data.ok && r.data.bg) setBg(r.data.bg)
      } catch (e) {}
    }
  })
  initPush()
  registerPush()  // 上报推送 ClientID，便于后续跨设备 Push（未配置 Uni-Push 时安全无效）
})

// Uni-Push 初始化（安全：未配置推送平台也不报错）
function initPush() {
  // #ifdef APP-PLUS
  try {
    plus.push.addEventListener('click', (msg) => {
      // 点击推送通知：可在此处做路由跳转
      console.log('[push] click', msg)
    })
    plus.push.addEventListener('receive', (msg) => {
      // 收到推送：默认系统已显示通知，这里仅记录
      console.log('[push] receive', msg)
    })
  } catch (e) { /* 无 plus 环境（H5/小程序）安全跳过 */ }
  // #endif
}

// 可选：应用从后台回到前台时刷新 base（处理服务器设置变更）
onShow(() => {
  const b = getBase()
  if (b && b !== store.base) store.base = b
})
</script>

<style>
@import "./styles/theme.css";
</style>
