<script setup>
// 矢量图标组件：统一替换 emoji，保证跨平台一致、可用设计令牌控制。
// 规避 window/document/plus，鸿蒙/小程序/App 均安全。
const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 44 },   // rpx
  color: { type: String, default: 'currentColor' }
})

// 24x24 viewBox 的 stroke 风格图标（统一 1.8 描边，圆角端点）
const PATHS = {
  home: 'M3 10.5 12 3l9 7.5M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5',
  music: 'M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm11-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 20a8 8 0 0 1 16 0',
  link: 'M9 15l6-6M10.5 6.5l1.8-1.8a4 4 0 0 1 5.7 5.7L16.2 12.2M13.5 17.5l-1.8 1.8a4 4 0 0 1-5.7-5.7L7.8 11.8',
  info: 'M12 12m-9 0a9 9 0 1 0 18 0 9 9 0 0 0-18 0ZM12 11v5M12 8h.01',
  gift: 'M20 12v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8h16ZM3 12h18M12 12v9M12 12C12 8 9 7 7.5 7 6 7 5 8.5 5 10c0 1.6 1.6 2 7 2ZM12 12c0-4 3-5 4.5-5 1.5 0 2.5 1.5 2.5 3 0 1.6-1.6 2-7 2Z',
  gear: 'M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0M19.4 13.5a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-2.87 1.2V21a2 2 0 0 1-4 0v-.09A1.7 1.7 0 0 0 7.5 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 13.5 1.7 1.7 0 0 0 3.4 12 1.7 1.7 0 0 0 3.5 10.1a1.7 1.7 0 0 0-1.2-2.87H2.2a2 2 0 0 1 0-4h.09A1.7 1.7 0 0 0 4.6 3.5a1.7 1.7 0 0 0 1.87-.34l.06-.06A2 2 0 1 1 9.4 4.3l-.06.06A1.7 1.7 0 0 0 10.5 4.6 1.7 1.7 0 0 0 12 3.4a1.7 1.7 0 0 0 2.83 0H16.9a2 2 0 0 1 0 4h-.09a1.7 1.7 0 0 0-1.2 2.87 1.7 1.7 0 0 0 1.34 1.87 1.7 1.7 0 0 0 1.87 1.2 2 2 0 0 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 13.5Z',
  lock: 'M6 10V8a6 6 0 0 1 12 0v2M5 10h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z',
  key: 'M14 8a4 4 0 1 0-3.9 5l-5.1 5.1V21h3.9l1.1-1.1V18h2v-2h2a4 4 0 0 0 3-7Z',
  qr: 'M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 3h3M17 17v3M14 14v.01M17 14v.01',
  shield: 'M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3Z',
  play: 'M7 5l12 7-12 7V5Z',
  pause: 'M8 5v14M16 5v14',
  prev: 'M7 5v14M19 5l-9 7 9 7V5Z',
  next: 'M17 5v14M5 5l9 7-9 7V5Z',
  arrow: 'M9 6l6 6-6 6',
  check: 'M5 12l5 5 9-11',
  refresh: 'M4 12a8 8 0 0 1 14-5l2 2M20 12a8 8 0 0 1-14 5l-2-2M18 4v5h-5M6 20v-5h5',
  server: 'M4 5h16v5H4V5Zm0 9h16v5H4v-5Zm3-3h.01M3 10h.01m0 9h.01',
  chat: 'M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.6-.8L3 21l1.8-5.9a8.5 8.5 0 0 1-.8-3.6 8.38 8.38 0 0 1 8.5-8.5 8.38 8.38 0 0 1 8.5 8.5Z',
  plus: 'M12 5v14M5 12h14',
  back: 'M15 6l-6 6 6 6',
  smile: 'M12 12m-9 0a9 9 0 1 0 18 0 9 9 0 0 0-18 0ZM8.5 14a4 4 0 0 0 7 0M9 9.5h.01M15 9.5h.01',
  ai: 'M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3ZM19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z'
}
</script>

<template>
  <svg
    class="icon"
    :style="{ width: size + 'rpx', height: size + 'rpx' }"
    viewBox="0 0 24 24"
    fill="none"
    :stroke="color"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="PATHS[name]" />
  </svg>
</template>

<style scoped>
.icon { display: block; flex: none; }
</style>
