// 同学录 Classbook · uni-app 启动配置
// 后端地址解析优先级：localStorage 覆盖 > 远程下发 > 内置默认
export const DEFAULT_BASES = [
  'https://classmate6.bew.guru',
  'https://classmate.bew.guru'
]
// 远程地址下发脚本（托管于稳定域名；更新此文件即可变更 App 后端地址，无需重打包）
export const REMOTE_ADDR = 'https://guanyue.ueuo.com/classmateupload.js'
export const LS_BASE = 'cb_api_base'
export const LS_USER = 'cb_user'
export const LS_BG = 'cb_bg'
