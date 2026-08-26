<script setup>
import { ref, onMounted } from 'vue'
import { get } from '../../utils/request.js'
import BottomNav from '../../components/BottomNav.vue'
import SideBar from '../../components/SideBar.vue'
import Icon from '../../components/Icon.vue'
import BgLayer from '../../components/BgLayer.vue'
import { isWideScreen } from '../../utils/layout.js'

const wide = ref(false)
const latest = ref('')
const local = ref('')
const status = ref('')
const ai = ref({})
const loading = ref(false)

async function load() {
  loading.value = true
  const [av, cfg] = await Promise.all([get('/api/app-version'), get('/api/config')])
  if (av.data) latest.value = typeof av.data === 'string' ? av.data : (av.data.version || JSON.stringify(av.data))
  if (cfg.data) {
    ai.value = {
      enabled: cfg.data.ai_enabled,
      model: cfg.data.ai_model,
      base: cfg.data.ai_base_url
    }
    status.value = cfg.data.system && cfg.data.system.allow_login ? '正常运行' : '维护中'
  }
  loading.value = false
}

onMounted(() => { wide.value = isWideScreen(); load() })
</script>

<template>
  <view class="page" :class="{ wide: wide }">
    <BgLayer />
    <SideBar v-if="wide" active="about" />
    <view class="main">
      <view class="brand">
        <Icon name="info" :size="52" color="#E11D48" />
        <view class="logo">同学录系统</view>
        <view class="sub">CLASSBOOK · 一份留给未来的档案</view>
      </view>
    <view class="card glass">
      <view class="row"><text class="k">线上最新版本</text><text class="v">{{ latest || '—' }}</text></view>
      <view class="row"><text class="k">本地版本</text><text class="v">1.11.01</text></view>
      <view class="row"><text class="k">运行状态</text><text class="v"><text class="pill" :class="status==='正常运行'?'on':'warn'">{{ status || '—' }}</text></text></view>
      <view class="row"><text class="k">Copyright</text><text class="v">© 2026 同学录</text></view>
    </view>
    <view class="card glass">
      <view class="card-head"><Icon name="key" :size="34" color="#E11D48" /><view class="sec">AI 信息</view></view>
      <view class="row"><text class="k">AI 开关</text><text class="pill" :class="ai.enabled ? 'on' : 'off'">{{ ai.enabled ? '已开启' : '已关闭' }}</text></view>
      <view class="row"><text class="k">模型</text><text class="v">{{ ai.model || '—' }}</text></view>
      <view class="row"><text class="k">接口地址</text><text class="v">{{ ai.base || '—' }}</text></view>
    </view>
    <view class="card glass">
      <view class="card-head"><Icon name="shield" :size="34" color="#E11D48" /><view class="sec">隐私与协议</view></view>
      <view class="txt">本应用收集的资料仅用于同学间互相联系与留念，按字段权限向不同查看者打码展示；你可随时在「我的」修改或申请撤回资料。详细用户协议与隐私政策以网页版为准。</view>
    </view>
    <view v-if="loading" class="tip">加载中...</view>
    </view>
    <BottomNav v-if="!wide" active="about" />
  </view>
</template>

<style scoped>
.page { padding: 24rpx 24rpx 160rpx; min-height: 100vh; background: transparent; position: relative; z-index: 1; }
.page.wide { display: flex; padding: 0; }
.page.wide .main { flex: 1; margin-left: 240rpx; padding: 24rpx 28rpx 160rpx; }
.brand { text-align: center; padding: 30rpx 0; display: flex; flex-direction: column; align-items: center; }
.brand :deep(.icon) { margin-bottom: 12rpx; }
.logo { font-size: 44rpx; font-weight: 800; color: #14141A; letter-spacing: 3rpx; }
.sub { color: #7C7A74; font-size: 26rpx; margin-top: 8rpx; }
.card { border-radius: 18rpx; padding: 8rpx 24rpx; margin-top: 16rpx; }
.row { display: flex; padding: 20rpx 0; border-bottom: 1px solid rgba(231,228,221,.6); align-items: center; }
.row:last-child { border-bottom: none; }
.k { width: 220rpx; color: #7C7A74; font-size: 27rpx; }
.v { flex: 1; font-size: 27rpx; color: #14141A; }
.sec { font-size: 28rpx; font-weight: 700; color: #E11D48; padding: 18rpx 0 6rpx; }
.card-head { display: flex; align-items: center; gap: 10rpx; }
.card-head .sec { padding: 18rpx 0 6rpx; }
.txt { font-size: 25rpx; color: #666; line-height: 1.7; padding: 10rpx 0 18rpx; }
.tip { text-align: center; color: #7C7A74; padding: 30rpx 0; }
</style>
