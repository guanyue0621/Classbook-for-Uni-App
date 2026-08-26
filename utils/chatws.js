// 聊天 WebSocket 单例：App / H5 统一实时推送入口
// - connectChatWS() 建立连接并发送 auth；自动重连（指数退避）
// - addChatWSListener(fn) 注册事件回调（fn(d)，d={type:'chat',to,from,msg}）
// - 多个页面（列表/会话）共享同一条连接，各自注册/注销监听即可
import { ensureBase, getBase } from './request.js'
import { store } from '../store/index.js'

let task = null
let connected = false
let connecting = false
let listeners = new Set()
let retry = 0
let retryTimer = null
let closed = false

function wsUrl() {
  const base = getBase() || ''
  return base.replace(/^http/, 'ws') + '/ws/chat'
}

export function addChatWSListener(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
export function removeChatWSListener(fn) {
  listeners.delete(fn)
}

export function connectChatWS() {
  closed = false
  if (task && (connecting || connected)) return
  ensureBase().then(() => {
    if (task && (connecting || connected)) return
    const url = wsUrl()
    if (!url) return
    connecting = true
    task = uni.connectSocket({ url, complete: () => {} })
    task.onOpen(() => {
      connected = true
      connecting = false
      retry = 0
      const u = store.user || {}
      task.send({
        data: JSON.stringify({ type: 'auth', no: u.student_no, token: u.login_token || '' })
      })
    })
    task.onMessage((res) => {
      let d = null
      try { d = JSON.parse(res.data) } catch (e) { return }
      listeners.forEach((fn) => { try { fn(d) } catch (e) {} })
    })
    task.onClose(() => {
      connected = false
      connecting = false
      task = null
      scheduleReconnect()
    })
    task.onError(() => {
      connected = false
      connecting = false
      try { task.close() } catch (e) {}
      task = null
      scheduleReconnect()
    })
  })
}

function scheduleReconnect() {
  if (closed || task) return
  const delay = Math.min(1000 * Math.pow(2, Math.min(retry, 6)), 15000)
  retry++
  if (retryTimer) clearTimeout(retryTimer)
  retryTimer = setTimeout(connectChatWS, delay)
}

export function disconnectChatWS() {
  closed = true
  if (retryTimer) clearTimeout(retryTimer)
  if (task) { try { task.close() } catch (e) {} task = null }
  connected = false
  connecting = false
}
