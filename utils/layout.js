// 布局判断：宽屏（平板/PC）显示左侧边栏，窄屏（手机）显示底部导航。
const WIDE_PX = 768 // 窗口 CSS 像素宽度 >= 768 视为宽屏（平板竖屏及以上）

let _wide = false

export function isWideScreen() {
  // #ifdef H5
  try { return window.innerWidth >= WIDE_PX } catch (e) {}
  // #endif
  // #ifndef H5
  try {
    const info = (uni.getWindowInfo && uni.getWindowInfo()) || uni.getSystemInfoSync()
    return (info.windowWidth || 0) >= WIDE_PX
  } catch (e) {}
  // #endif
  return _wide
}

// 同步读取并缓存一次（App/小程序端无 resize 监听，启动判定即可）
export function initLayout() {
  _wide = isWideScreen()
  return _wide
}
