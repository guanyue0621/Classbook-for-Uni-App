// 同学录 Classbook · 远程地址下发改名文件
// 用途：部署到可公网访问的位置（如 guanyue.ueuo.com/classmateupload.js），
//       App 启动时会拉取此文件获取最新后端地址，可远程改地址 / 热更新，无需重打包。
// 注意：必须使用 `var` 声明（鸿蒙/小程序无 window 全局），不要写成 window.CLASSMATE_API_BASE。

var CLASSMATE_API_BASE = 'http://classmate6.bew.guru:1234';
