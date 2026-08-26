import { post } from './request.js'

// App 端本地推送通知（原生 plus.push，无需任何后端凭证即可工作）
// type 仅用于点击通知时的语义标识（login / chat 等）
export function localNotify(title, content, type) {
  // #ifdef APP-PLUS
  try {
    plus.push.createMessage(content || '', JSON.stringify({ type: type || 'notify' }), {
      title: title || '同学录',
      cover: false,
    })
  } catch (e) { /* 无 plus 环境（H5/小程序）安全跳过 */ }
  // #endif
}

// 向自建后端注册推送 ClientID（用于真正的跨设备远端 Push；需配置 Uni-Push 凭证）
export function registerPush() {
  // #ifdef APP-PLUS
  try {
    const info = plus.push.getClientInfo()
    const cid = (info && (info.clientid || info.cid)) || ''
    if (cid) post('/api/push/register', { cid }).catch(() => {})
  } catch (e) { /* 无 plus 环境安全跳过 */ }
  // #endif
}
