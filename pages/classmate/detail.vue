<script setup>
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { request } from '../../utils/request.js'
import { store } from '../../store/index.js'
import { resURL } from '../../utils/util.js'
import BottomNav from '../../components/BottomNav.vue'
import SideBar from '../../components/SideBar.vue'
import Icon from '../../components/Icon.vue'
import BgLayer from '../../components/BgLayer.vue'
import { isWideScreen } from '../../utils/layout.js'

const no = ref('')
const stu = ref(null)
const err = ref('')
const wide = ref(false)

function portrait() {
  return stu.value && stu.value.portrait_path ? resURL('/portrait/' + no.value, store.base) : ''
}

async function load() {
  const r = await request('/api/student/' + no.value)
  if (r.data && r.data.ok) stu.value = r.data.student
  else err.value = (r.data && r.data.msg) || '加载失败'
}

onLoad((q) => { no.value = q.no || '' })
onMounted(() => { wide.value = isWideScreen(); load() })

function goChat() {
  if (!stu.value) return
  const name = encodeURIComponent(stu.value.name || no.value)
  uni.navigateTo({ url: '/pages/chat/conversation?no=' + no.value + '&name=' + name })
}
</script>

<template>
  <view class="page" :class="{ wide: wide }">
    <BgLayer />
    <SideBar v-if="wide" active="home" />
    <view class="main">
      <view v-if="err" class="tip err">{{ err }}</view>
      <block v-else-if="stu">
        <view class="head">
          <image v-if="stu.portrait_path" class="big ava-pendant" :src="portrait()" mode="aspectFill" />
          <view v-else class="big ph ava-pendant gold">{{ (stu.name || '?').slice(0, 1) }}</view>
          <text class="hname">{{ stu.name }}</text>
          <text class="hno">#{{ stu.student_no }}</text>
        </view>
        <view class="card glass">
          <view class="row"><text class="k">性别</text><text class="v">{{ stu.gender || '—' }}</text></view>
          <view class="row"><text class="k">学校</text><text class="v">{{ stu.school || '—' }}</text></view>
          <view class="row"><text class="k">昵称</text><text class="v">{{ stu.nickname || '—' }}</text></view>
          <view class="row"><text class="k">手机</text><text class="v">{{ stu.phone || '—' }}</text></view>
          <view class="row"><text class="k">身份证号</text><text class="v">{{ stu.id_number || '—' }}</text></view>
          <view class="row"><text class="k">家乡</text><text class="v">{{ stu.hometown || '—' }}</text></view>
          <view class="row"><text class="k">爱好</text><text class="v">{{ stu.hobby || '—' }}</text></view>
          <view class="row"><text class="k">寄语</text><text class="v">{{ stu.poem || '—' }}</text></view>
        </view>
        <view class="chat-btn glass" hover-class="chat-hover" @click="goChat">
          <Icon name="chat" :size="36" color="#fff" />
          <text class="chat-tx">发消息</text>
        </view>
      </block>
      <view v-else class="tip">加载中...</view>
    </view>
    <BottomNav v-if="!wide" active="home" />
  </view>
</template>

<style scoped>
.page { padding: 24rpx 24rpx 160rpx; min-height: 100vh; background: transparent; position: relative; z-index: 1; }
.page.wide { display: flex; padding: 0; }
.page.wide .main { flex: 1; margin-left: 240rpx; padding: 24rpx 28rpx 160rpx; }
.tip { text-align: center; color: #7C7A74; padding: 80rpx 0; font-size: 28rpx; }
.tip.err { color: #E11D48; }
.head { display: flex; flex-direction: column; align-items: center; padding: 30rpx 0; }
.big { width: 160rpx; height: 160rpx; border-radius: 50%; background: linear-gradient(135deg,#E11D48,#F0A48C); box-shadow: 0 12rpx 30rpx -12rpx rgba(225,29,72,.5); }
.big.ph { display: flex; align-items: center; justify-content: center; color: #fff; font-size: 72rpx; font-weight: 700; }
.hname { font-size: 38rpx; font-weight: 700; margin-top: 16rpx; color: #14141A; }
.hno { color: #7C7A74; font-size: 26rpx; margin-top: 4rpx; }
.card { border-radius: 18rpx; padding: 8rpx 24rpx; margin-top: 16rpx; }
.row { display: flex; padding: 22rpx 0; border-bottom: 1px solid rgba(231,228,221,.6); min-height: 64rpx; align-items: center; }
.row:last-child { border-bottom: none; }
.k { width: 180rpx; color: #7C7A74; font-size: 28rpx; }
.v { flex: 1; font-size: 28rpx; color: #14141A; }
.chat-btn { display: flex; align-items: center; justify-content: center; gap: 12rpx; margin-top: 24rpx; height: 88rpx; border-radius: 18rpx; background: linear-gradient(135deg, #E11D48, #E0673F); transition: transform .12s ease, opacity .12s ease; }
.chat-btn:active, .chat-hover { transform: scale(.97); opacity: .9; }
.chat-tx { color: #fff; font-size: 30rpx; font-weight: 700; }
</style>

