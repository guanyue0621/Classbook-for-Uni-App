# 同学录系统 Classbook · uni-app 版（Vue3）

把原 Web 单页应用（Flask + 原生 JS SPA）用 **uni-app（Vue3 / `<script setup>`）** 重写，
可一键打包为 **Android / iOS / 鸿蒙 HarmonyOS NEXT** App，也可发行到 H5 与微信小程序。后端复用原有 Flask 服务。

> **鸿蒙支持**：本项目为 Vue3，已开启 `manifest.json` 的 `vueVersion:"3"` 与 `app-harmony` 配置，
> 支持 HBuilderX「运行/发行到鸿蒙」。Vue2 项目不支持鸿蒙，请勿在工程里降级为 Vue2。

## 目录结构
```
同学录系统_uni-app/
├── manifest.json          # uni-app 应用配置（vueVersion:3 + app-plus + app-harmony 鸿蒙）
├── pages.json             # 页面路由注册
├── App.vue                # 应用入口（启动时解析 BASE + 读取登录态）
├── main.js
├── uni.scss               # 全局样式变量
├── index.html             # H5 构建模板
├── static/logo.png        # 应用图标
├── classmateupload.js     # 远程地址下发改名文件（部署到公网后供 App 拉取）
├── utils/
│   ├── config.js          # 后端地址常量（默认地址 / 远程下发地址 / 存储键）
│   ├── request.js         # BASE 解析 + uni.request 封装（替代 Web 版 api()）
│   └── util.js            # 验证码求解 / 资源 URL 归一化
├── store/index.js         # 极简全局状态（user / bg / isAdmin / base）
├── components/BottomNav.vue  # 共享底部导航（玻璃风）
├── styles/theme.css        # 全局统一液态玻璃主题（暖白 + 珊瑚）
└── pages/
    ├── login/login.vue        # 登录（图片验证码 + 密码 + 服务器设置入口）
    ├── home/home.vue          # 同学列表（搜索 + 详情入口）
    ├── classmate/detail.vue   # 同学档案详情
    ├── music/music.vue        # 音乐播放列表 + 播放器
    ├── contribute/contribute.vue  # 音乐投稿（含音频/封面/歌词上传）
    ├── me/me.vue              # 我的（背景设置 / 服务器地址 / 退出）
    ├── links/links.vue        # 可用链接导航（含赞助入口）
    ├── about/about.vue        # 关于（版本/状态/AI/隐私）
    ├── sponsor/sponsor.vue    # 赞助与支持（Uni-AD 插屏/激励视频）
    └── admin/admin.vue        # 权限管理面板（登录开关/AI/安全阈值/秘钥）
```

## 后端地址（BASE）解析优先级
1. App 内手动设置（`我的 → 服务器地址`，存 `uni.setStorageSync`）
2. **H5 本地开发自动同源**：运行在 `localhost` / `127.0.0.1` 时，直接拿当前页面源（如 `http://localhost:5173`）作为后端，开发者同源跑 Flask 即可，无需手填。
3. 远程下发：`https://guanyue.ueuo.com/classmateupload.js` 中 `var CLASSMATE_API_BASE='...'`
   （更新该文件即可变更 App 后端地址，无需重打包；注意用 `var` 声明以兼容鸿蒙/小程序）
4. 内置默认：`https://classmate6.bew.guru` / `https://classmate.bew.guru`

> 后端 `app_web.py` 已开启 CORS（反射 Origin + 允许凭证），App 跨域/H5 调用均可用。
> 请求超时已统一为 10s，超时/网络错误会在「我的」页给出「点击屏幕重试」提示，不会卡死白屏。

## 用 HBuilderX 运行 / 打包
1. HBuilderX 打开本目录（需 **HBuilderX 4.x+** 且已配置鸿蒙环境以支持鸿蒙）。
2. 运行：菜单「运行」→ 运行到手机/模拟器 / 浏览器；鸿蒙选「运行到鸿蒙」。
3. 打包：菜单「发行」→「原生 App-云打包」，填应用名、Android 包名等即可。
   - `manifest.json` 的 `appid` 首次打包会被引导替换为你的 DCloud appid。
   - 鸿蒙：`app-harmony.package` 已设为 `com.classbook.app`，如需改成自有反向域名包名请改此处。
4. 微信小程序：发行 → 小程序，填 `mp-weixin.appid`（`manifest.json` 已设 `urlCheck:false`）。

## 已实现（核心优先）
- 登录（**图片验证码** + 密码；含服务器设置入口；H5 本地自动同源）
- 同学列表 / 搜索 / 档案详情（敏感字段按服务端权限打码）
- 音乐列表、播放（上一首/下一首/播放暂停）、投稿（音频+封面+歌词，待审）
- 我的（个性化背景、服务器地址设置、退出登录；网络错误可点击重试）
- 关于（版本/状态/AI 信息/隐私说明）
- **赞助与支持页**（`pages/sponsor`，Uni-AD 插屏 + 激励视频，仅 App 端）
- **Uni-Push**（App.vue 已初始化 `plus.push`，支持点击/接收回调）
- 权限管理面板（登录开关、各登录方式开关、AI 开关与定时、安全阈值、亦云秘钥、版本号）

## 全局 UI 规范（液态玻璃 / 暖白 + 珊瑚）
- 主题色：墨色 `#14141A`、弱化字 `#7C7A74`、珊瑚强调 `#DA4F33`、暖白底 `#F4F3EF`。
- 玻璃质感统一走 `styles/theme.css` 的 `.glass` / `.glass-input` 与 `App.vue` 全局样式；
  各页面不再各自定义蓝色 `#2B6CB0`，保证与网页端 `index.html` 视觉一致。
- 页面底部预留 `160rpx` 给底部导航；播放器固定条也改为玻璃风。

## Uni-AD / Uni-Push 配置
- **uni-AD**：`manifest.json` 已加 `"uni-ad"`（插屏/激励视频）与 `app-plus.distribute.sdkConfigs.ad`。
  在 DCloud 开发者中心申请广告位 ID 后，填入 `pages/sponsor/sponsor.vue` 顶部
  `AD_INTERSTITIAL` / `AD_REWARD` 常量即可。H5/小程序端不支持广告组件，已做优雅降级提示。
- **Uni-Push**：`manifest.json` 已加 `"uni-push": { "enable": true }` 与 `app-plus.modules.Push`、
  `sdkConfigs.push`。`App.vue` 在 `onLaunch` 用 `// #ifdef APP-PLUS` 包裹初始化，未配置推送平台也不报错。
  需在 DCloud 控制台开通 uni-push 并绑定应用后，云端推送才会下发到 App。

## 后续补充（本版暂留接口）
- 兼容版页面 `/compatibility`（Web 现有，待移植）
- AI 助手对话 UI（`/api/ai/chat` 已具备，待做对话界面）
- 音乐审核队列（`/api/music/pending` + 通过/拒绝，待做管理界面）
- 找回密码全流程、Passkey/亦云/邮箱/OTP 二次验证的前端引导

## 说明
- 本环境无 HBuilderX/模拟器，无法真机运行验证；逻辑已按后端真实接口字段对接，
  请在 HBuilderX 中联调。所有 App 文件不含具体班级名。
