if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const DEFAULT_BASES = [
    "https://classmate6.bew.guru",
    "https://classmate.bew.guru"
  ];
  const REMOTE_ADDR = "https://guanyue.ueuo.com/classmateupload.js";
  const LS_BASE = "cb_api_base";
  const LS_USER = "cb_user";
  const LS_BG = "cb_bg";
  const store = vue.reactive({
    base: "",
    user: null,
    bg: null,
    isAdmin: false,
    unreadChat: 0
  });
  function setUser(u, bg) {
    store.user = u;
    store.bg = bg;
    store.isAdmin = !!(u && u.is_admin);
    try {
      uni.setStorageSync(LS_USER, JSON.stringify(u));
    } catch (e) {
    }
    if (bg) {
      try {
        uni.setStorageSync(LS_BG, JSON.stringify(bg));
      } catch (e) {
      }
    }
  }
  function setUnreadChat(n2) {
    const v = Math.max(0, Number(n2) || 0);
    store.unreadChat = v;
  }
  function setBg(bg) {
    store.bg = bg;
    if (bg) {
      try {
        uni.setStorageSync(LS_BG, JSON.stringify(bg));
      } catch (e) {
      }
    }
  }
  function loadUser() {
    try {
      const s2 = uni.getStorageSync(LS_USER);
      if (s2) {
        store.user = JSON.parse(s2);
        store.isAdmin = !!store.user.is_admin;
      }
    } catch (e) {
    }
    try {
      const b = uni.getStorageSync(LS_BG);
      if (b)
        store.bg = JSON.parse(b);
    } catch (e) {
    }
  }
  function clearUser() {
    store.user = null;
    store.bg = null;
    store.isAdmin = false;
    try {
      uni.removeStorageSync(LS_USER);
    } catch (e) {
    }
    try {
      uni.removeStorageSync(LS_BG);
    } catch (e) {
    }
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$i = {
    __name: "Icon",
    props: {
      name: { type: String, required: true },
      size: { type: [Number, String], default: 44 },
      // rpx
      color: { type: String, default: "currentColor" }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const PATHS = {
        home: "M3 10.5 12 3l9 7.5M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5",
        music: "M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm11-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
        user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 20a8 8 0 0 1 16 0",
        link: "M9 15l6-6M10.5 6.5l1.8-1.8a4 4 0 0 1 5.7 5.7L16.2 12.2M13.5 17.5l-1.8 1.8a4 4 0 0 1-5.7-5.7L7.8 11.8",
        info: "M12 12m-9 0a9 9 0 1 0 18 0 9 9 0 0 0-18 0ZM12 11v5M12 8h.01",
        gift: "M20 12v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8h16ZM3 12h18M12 12v9M12 12C12 8 9 7 7.5 7 6 7 5 8.5 5 10c0 1.6 1.6 2 7 2ZM12 12c0-4 3-5 4.5-5 1.5 0 2.5 1.5 2.5 3 0 1.6-1.6 2-7 2Z",
        gear: "M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0M19.4 13.5a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-2.87 1.2V21a2 2 0 0 1-4 0v-.09A1.7 1.7 0 0 0 7.5 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 13.5 1.7 1.7 0 0 0 3.4 12 1.7 1.7 0 0 0 3.5 10.1a1.7 1.7 0 0 0-1.2-2.87H2.2a2 2 0 0 1 0-4h.09A1.7 1.7 0 0 0 4.6 3.5a1.7 1.7 0 0 0 1.87-.34l.06-.06A2 2 0 1 1 9.4 4.3l-.06.06A1.7 1.7 0 0 0 10.5 4.6 1.7 1.7 0 0 0 12 3.4a1.7 1.7 0 0 0 2.83 0H16.9a2 2 0 0 1 0 4h-.09a1.7 1.7 0 0 0-1.2 2.87 1.7 1.7 0 0 0 1.34 1.87 1.7 1.7 0 0 0 1.87 1.2 2 2 0 0 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 13.5Z",
        lock: "M6 10V8a6 6 0 0 1 12 0v2M5 10h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z",
        key: "M14 8a4 4 0 1 0-3.9 5l-5.1 5.1V21h3.9l1.1-1.1V18h2v-2h2a4 4 0 0 0 3-7Z",
        qr: "M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 3h3M17 17v3M14 14v.01M17 14v.01",
        shield: "M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3Z",
        play: "M7 5l12 7-12 7V5Z",
        pause: "M8 5v14M16 5v14",
        prev: "M7 5v14M19 5l-9 7 9 7V5Z",
        next: "M17 5v14M5 5l9 7-9 7V5Z",
        arrow: "M9 6l6 6-6 6",
        check: "M5 12l5 5 9-11",
        refresh: "M4 12a8 8 0 0 1 14-5l2 2M20 12a8 8 0 0 1-14 5l-2-2M18 4v5h-5M6 20v-5h5",
        server: "M4 5h16v5H4V5Zm0 9h16v5H4v-5Zm3-3h.01M3 10h.01m0 9h.01",
        chat: "M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.6-.8L3 21l1.8-5.9a8.5 8.5 0 0 1-.8-3.6 8.38 8.38 0 0 1 8.5-8.5 8.38 8.38 0 0 1 8.5 8.5Z",
        plus: "M12 5v14M5 12h14",
        back: "M15 6l-6 6 6 6",
        smile: "M12 12m-9 0a9 9 0 1 0 18 0 9 9 0 0 0-18 0ZM8.5 14a4 4 0 0 0 7 0M9 9.5h.01M15 9.5h.01"
      };
      const __returned__ = { props, PATHS };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", {
      class: "icon",
      style: vue.normalizeStyle({ width: $props.size + "rpx", height: $props.size + "rpx" }),
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: $props.color,
      "stroke-width": "1.8",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": "true"
    }, [
      vue.createElementVNode("path", {
        d: $setup.PATHS[$props.name]
      }, null, 8, ["d"])
    ], 12, ["stroke"]);
  }
  const Icon = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__scopeId", "data-v-ca7f3f1d"], ["__file", "E:/WorkBuddy/2026-07-13-23-25-59/同学录系统_uni-app/components/Icon.vue"]]);
  const _sfc_main$h = {
    __name: "welcome",
    setup(__props, { expose: __expose }) {
      __expose();
      const loggedIn = vue.ref(false);
      vue.onMounted(() => {
        loadUser();
        loggedIn.value = !!(store.user && store.user.username);
      });
      function start() {
        if (loggedIn.value)
          uni.reLaunch({ url: "/pages/home/home" });
        else
          uni.reLaunch({ url: "/pages/login/login" });
      }
      const __returned__ = { loggedIn, start, ref: vue.ref, onMounted: vue.onMounted, get store() {
        return store;
      }, get loadUser() {
        return loadUser;
      }, Icon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "welcome" }, [
      vue.createElementVNode("view", { class: "hero" }, [
        vue.createElementVNode("view", { class: "badge" }, [
          vue.createVNode($setup["Icon"], {
            name: "user",
            size: 64,
            color: "#fff"
          })
        ]),
        vue.createElementVNode("view", { class: "logo" }, "同学录"),
        vue.createElementVNode("view", { class: "title" }, "欢迎来到同学录"),
        vue.createElementVNode("view", { class: "sub" }, "一份留给未来的档案 · 在这里找到每一个同窗")
      ]),
      vue.createElementVNode("view", { class: "actions" }, [
        vue.createElementVNode(
          "button",
          {
            class: "btn",
            "hover-class": "btn-hover",
            onClick: $setup.start
          },
          vue.toDisplayString($setup.loggedIn ? "进入同学录" : "开始使用"),
          1
          /* TEXT */
        ),
        $setup.loggedIn ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: "hint"
          },
          "已登录：" + vue.toDisplayString($setup.store.user.name || $setup.store.user.username),
          1
          /* TEXT */
        )) : vue.createCommentVNode("v-if", true)
      ]),
      vue.createElementVNode("view", { class: "foot" }, "CLASSBOOK · 同学录系统")
    ]);
  }
  const PagesWelcomeWelcome = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-085f0530"], ["__file", "E:/WorkBuddy/2026-07-13-23-25-59/同学录系统_uni-app/pages/welcome/welcome.vue"]]);
  let _base = "";
  let _ready = null;
  function savedBase() {
    try {
      return uni.getStorageSync(LS_BASE) || "";
    } catch (e) {
      return "";
    }
  }
  function getBase() {
    return _base;
  }
  function setBase(b) {
    _base = b;
    try {
      uni.setStorageSync(LS_BASE, b);
    } catch (e) {
    }
  }
  function h5CurrentOrigin() {
    return "";
  }
  function ensureBase() {
    if (_ready)
      return _ready;
    _ready = new Promise((resolve) => {
      const saved = savedBase();
      if (saved) {
        _base = saved;
        resolve(saved);
        return;
      }
      let done = false;
      const finish = (b) => {
        if (done)
          return;
        done = true;
        _base = b || DEFAULT_BASES[0];
        resolve(_base);
      };
      uni.request({
        url: REMOTE_ADDR + "?_=" + Date.now(),
        timeout: 3e3,
        success: (res) => {
          try {
            const js = typeof res.data === "string" ? res.data : "";
            const fn = new Function(js + '\n;return (typeof CLASSMATE_API_BASE!=="undefined")?CLASSMATE_API_BASE:null;');
            const remote = fn();
            finish(remote || DEFAULT_BASES[0]);
          } catch (e) {
            probeDefaults(finish);
          }
        },
        fail: () => probeDefaults(finish)
      });
      setTimeout(() => finish(_base || DEFAULT_BASES[0]), 4e3);
    });
    return _ready;
  }
  function probeDefaults(finish) {
    let i = 0;
    const next = () => {
      if (i >= DEFAULT_BASES.length) {
        finish(DEFAULT_BASES[0]);
        return;
      }
      const url = DEFAULT_BASES[i] + "/api/config";
      uni.request({
        url,
        timeout: 2500,
        success: (r) => {
          if (r.statusCode === 200)
            finish(DEFAULT_BASES[i]);
          else {
            i++;
            next();
          }
        },
        fail: () => {
          i++;
          next();
        }
      });
    };
    next();
  }
  function request(path, opts = {}) {
    return new Promise((resolve, reject) => {
      const base = opts.full ? "" : _base || h5CurrentOrigin() || "";
      uni.request({
        url: base + path,
        method: (opts.method || "GET").toUpperCase(),
        data: opts.data,
        header: Object.assign({ "Content-Type": "application/json" }, opts.header || {}),
        timeout: opts.timeout || 1e4,
        withCredentials: true,
        // H5 平台需要；App 原生网络自动管 cookie
        success: (res) => {
          let body = res.data;
          if (typeof body === "string") {
            try {
              body = JSON.parse(body);
            } catch (e) {
            }
          }
          resolve({ statusCode: res.statusCode, data: body });
        },
        fail: (err) => reject(err)
      });
    });
  }
  async function get$1(path, opts = {}) {
    return request(path, { ...opts, method: "GET" });
  }
  async function post(path, data, opts = {}) {
    return request(path, { ...opts, method: "POST", data });
  }
  function upload(path, files, formData = {}) {
    return new Promise((resolve, reject) => {
      uni.uploadFile({
        url: (_base || h5CurrentOrigin() || "") + path,
        files,
        formData,
        success: (res) => {
          let body = res.data;
          if (typeof body === "string") {
            try {
              body = JSON.parse(body);
            } catch (e) {
            }
          }
          resolve({ statusCode: res.statusCode, data: body });
        },
        fail: reject
      });
    });
  }
  function localNotify(title, content, type) {
    try {
      plus.push.createMessage(content || "", JSON.stringify({ type: type || "notify" }), {
        title: title || "同学录",
        cover: false
      });
    } catch (e) {
    }
  }
  function registerPush() {
    try {
      const info = plus.push.getClientInfo();
      const cid = info && (info.clientid || info.cid) || "";
      if (cid)
        post("/api/push/register", { cid }).catch(() => {
        });
    } catch (e) {
    }
  }
  const _sfc_main$g = {
    __name: "login",
    setup(__props, { expose: __expose }) {
      __expose();
      const username = vue.ref("");
      const password = vue.ref("");
      const answer = vue.ref("");
      const captchaImg = vue.ref("");
      const captchaText = vue.ref("");
      const loading = vue.ref(false);
      const err = vue.ref("");
      const showServer = vue.ref(false);
      const serverInput = vue.ref(getBase() || "");
      function saveServer() {
        let v = (serverInput.value || "").trim().replace(/\/+$/, "");
        if (!v) {
          err.value = "请填写服务器地址";
          return;
        }
        setBase(v);
        err.value = "";
        loadCaptcha();
      }
      function loadCaptcha() {
        request("/api/captcha").then((r) => {
          if (r.data && r.data.ok) {
            captchaImg.value = r.data.image || "";
            captchaText.value = r.data.text || "";
            answer.value = "";
          }
        }).catch(() => {
        });
      }
      async function doLogin() {
        if (!username.value || !password.value || !answer.value) {
          err.value = "请填写学号、密码与验证码";
          return;
        }
        loading.value = true;
        err.value = "";
        try {
          const c = await post("/api/captcha/check", { answer: answer.value });
          if (!c.data || !c.data.ok) {
            err.value = c.data && c.data.msg || "人机验证失败";
            answer.value = "";
            loadCaptcha();
            loading.value = false;
            return;
          }
          const lg = await post("/api/login", { username: username.value, password: password.value, remember: true, client: "app" });
          if (lg.data && lg.data.ok) {
            const me = await request("/api/me");
            if (me.data && me.data.ok)
              setUser(me.data.user, me.data.bg);
            localNotify("登录成功", "欢迎回来，" + (me.data && me.data.user && me.data.user.name || ""));
            uni.reLaunch({ url: "/pages/home/home" });
          } else {
            err.value = lg.data && lg.data.msg || "登录失败";
            answer.value = "";
            loadCaptcha();
          }
        } catch (e) {
          err.value = "网络错误，请检查服务器地址或网络";
        }
        loading.value = false;
      }
      vue.onMounted(loadCaptcha);
      const __returned__ = { username, password, answer, captchaImg, captchaText, loading, err, showServer, serverInput, saveServer, loadCaptcha, doLogin, ref: vue.ref, onMounted: vue.onMounted, get request() {
        return request;
      }, get post() {
        return post;
      }, get setBase() {
        return setBase;
      }, get getBase() {
        return getBase;
      }, get setUser() {
        return setUser;
      }, get localNotify() {
        return localNotify;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "login" }, [
      vue.createElementVNode("view", { class: "brand" }, [
        vue.createElementVNode("view", { class: "logo" }, "CLASSBOOK"),
        vue.createElementVNode("view", { class: "sub" }, "同学录 · 一份留给未来的档案")
      ]),
      vue.createElementVNode("view", { class: "card glass" }, [
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            class: "inp",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.username = $event),
            placeholder: "学号"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.username]
        ]),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            class: "inp",
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.password = $event),
            placeholder: "密码",
            password: ""
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.password]
        ]),
        vue.createElementVNode("view", { class: "cap" }, [
          vue.createElementVNode("view", {
            class: "cap-img-box",
            onClick: $setup.loadCaptcha
          }, [
            $setup.captchaImg ? (vue.openBlock(), vue.createElementBlock("image", {
              key: 0,
              src: $setup.captchaImg,
              class: "cap-img",
              mode: "aspectFit"
            }, null, 8, ["src"])) : $setup.captchaText ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 1,
                class: "cap-text"
              },
              vue.toDisplayString($setup.captchaText),
              1
              /* TEXT */
            )) : (vue.openBlock(), vue.createElementBlock("text", {
              key: 2,
              class: "cap-loading"
            }, "验证码加载中..."))
          ]),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "inp cap-a",
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.answer = $event),
              placeholder: "输入图片中的字符"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.answer]
          ])
        ]),
        vue.createElementVNode("text", {
          class: "cap-tip",
          onClick: $setup.loadCaptcha
        }, "看不清？点击图片换一张"),
        $setup.err ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: "err"
          },
          vue.toDisplayString($setup.err),
          1
          /* TEXT */
        )) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("button", {
          class: "btn",
          loading: $setup.loading,
          onClick: $setup.doLogin
        }, "登 录", 8, ["loading"]),
        vue.createElementVNode(
          "view",
          {
            class: "srv-toggle",
            onClick: _cache[3] || (_cache[3] = ($event) => $setup.showServer = !$setup.showServer)
          },
          vue.toDisplayString($setup.showServer ? "收起服务器设置 ▲" : "服务器设置 ▼"),
          1
          /* TEXT */
        ),
        $setup.showServer ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "srv-box glass"
        }, [
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "inp",
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.serverInput = $event),
              placeholder: "服务器地址，如 http://localhost:1234"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.serverInput]
          ]),
          vue.createElementVNode("button", {
            class: "btn srv-btn",
            onClick: $setup.saveServer
          }, "保存并刷新验证码"),
          vue.createElementVNode(
            "text",
            { class: "srv-tip" },
            "当前：" + vue.toDisplayString($setup.getBase() || "（未设置，将尝试远程/默认地址）"),
            1
            /* TEXT */
          )
        ])) : vue.createCommentVNode("v-if", true)
      ])
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__scopeId", "data-v-e4e4508d"], ["__file", "E:/WorkBuddy/2026-07-13-23-25-59/同学录系统_uni-app/pages/login/login.vue"]]);
  function resURL(u, base) {
    if (!u)
      return u;
    if (/^(https?:|data:|blob:)/i.test(u))
      return u;
    return (base || "") + u;
  }
  const _sfc_main$f = {
    __name: "BottomNav",
    props: { active: { type: String, default: "home" } },
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const items = [
        { key: "home", text: "首页", url: "/pages/home/home", icon: "home" },
        { key: "chat", text: "消息", url: "/pages/chat/chat", icon: "chat" },
        { key: "music", text: "音乐", url: "/pages/music/music", icon: "music" },
        { key: "me", text: "我的", url: "/pages/me/me", icon: "user" },
        { key: "about", text: "关于", url: "/pages/about/about", icon: "info" }
      ];
      const chatUnread = vue.computed(() => store.unreadChat || 0);
      function go(it) {
        if (it.key === props.active)
          return;
        uni.reLaunch({ url: it.url });
      }
      const __returned__ = { props, items, chatUnread, go, computed: vue.computed, Icon, get store() {
        return store;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "bottom-nav" }, [
      (vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($setup.items, (it) => {
          return vue.createElementVNode("view", {
            key: it.key,
            class: vue.normalizeClass(["nav-item", { on: it.key === $props.active }]),
            "hover-class": "nav-hover",
            onClick: ($event) => $setup.go(it)
          }, [
            vue.createElementVNode("view", { class: "ic-wrap" }, [
              vue.createVNode($setup["Icon"], {
                name: it.icon,
                size: 42,
                color: it.key === $props.active ? "#DA4F33" : "#7C7A74"
              }, null, 8, ["name", "color"]),
              it.key === "chat" && $setup.chatUnread > 0 ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 0,
                  class: "dot"
                },
                vue.toDisplayString($setup.chatUnread > 99 ? "99+" : $setup.chatUnread),
                1
                /* TEXT */
              )) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createElementVNode(
              "text",
              { class: "nav-txt" },
              vue.toDisplayString(it.text),
              1
              /* TEXT */
            )
          ], 10, ["onClick"]);
        }),
        64
        /* STABLE_FRAGMENT */
      ))
    ]);
  }
  const BottomNav = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-53d1cde7"], ["__file", "E:/WorkBuddy/2026-07-13-23-25-59/同学录系统_uni-app/components/BottomNav.vue"]]);
  const _sfc_main$e = {
    __name: "SideBar",
    props: { active: { type: String, default: "home" } },
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const items = [
        { key: "home", text: "首页", url: "/pages/home/home", icon: "home" },
        { key: "chat", text: "消息", url: "/pages/chat/chat", icon: "chat" },
        { key: "music", text: "音乐", url: "/pages/music/music", icon: "music" },
        { key: "me", text: "我的", url: "/pages/me/me", icon: "user" },
        { key: "about", text: "关于", url: "/pages/about/about", icon: "info" }
      ];
      const chatUnread = vue.computed(() => store.unreadChat || 0);
      function go(it) {
        if (it.key === props.active)
          return;
        uni.reLaunch({ url: it.url });
      }
      const __returned__ = { props, items, chatUnread, go, computed: vue.computed, Icon, get store() {
        return store;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "side" }, [
      vue.createElementVNode("view", { class: "brand" }, [
        vue.createElementVNode("view", { class: "logo" }, "同学录"),
        vue.createElementVNode("view", { class: "sub" }, "CLASSBOOK")
      ]),
      (vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($setup.items, (it) => {
          return vue.createElementVNode("view", {
            key: it.key,
            class: vue.normalizeClass(["item", { on: it.key === $props.active }]),
            "hover-class": "item-hover",
            onClick: ($event) => $setup.go(it)
          }, [
            vue.createElementVNode("view", { class: "ic-wrap" }, [
              vue.createVNode($setup["Icon"], {
                name: it.icon,
                size: 40,
                color: it.key === $props.active ? "#DA4F33" : "#7C7A74"
              }, null, 8, ["name", "color"]),
              it.key === "chat" && $setup.chatUnread > 0 ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 0,
                  class: "dot"
                },
                vue.toDisplayString($setup.chatUnread > 99 ? "99+" : $setup.chatUnread),
                1
                /* TEXT */
              )) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createElementVNode(
              "text",
              { class: "txt" },
              vue.toDisplayString(it.text),
              1
              /* TEXT */
            )
          ], 10, ["onClick"]);
        }),
        64
        /* STABLE_FRAGMENT */
      )),
      vue.createElementVNode("view", { class: "spacer" }),
      vue.createElementVNode("view", { class: "tip" }, "宽屏模式 · 自适应")
    ]);
  }
  const SideBar = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-51213749"], ["__file", "E:/WorkBuddy/2026-07-13-23-25-59/同学录系统_uni-app/components/SideBar.vue"]]);
  const _sfc_main$d = {
    __name: "BgLayer",
    setup(__props, { expose: __expose }) {
      __expose();
      const bgStyle = vue.computed(() => {
        const bg = store.bg;
        if (!bg || !bg.type || bg.type === "none" || !bg.url)
          return "";
        if (bg.type === "video")
          return "";
        return bg.url;
      });
      const isVideo = vue.computed(() => {
        const bg = store.bg;
        return !!(bg && bg.type === "video" && bg.url);
      });
      const videoUrl = vue.computed(() => {
        const bg = store.bg;
        return bg && bg.url || "";
      });
      const hasBg = vue.computed(() => !!bgStyle.value || isVideo.value);
      const __returned__ = { bgStyle, isVideo, videoUrl, hasBg, computed: vue.computed, watch: vue.watch, get store() {
        return store;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return $setup.hasBg ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: "bg-layer"
    }, [
      $setup.isVideo ? (vue.openBlock(), vue.createElementBlock("video", {
        key: 0,
        class: "bg-video",
        src: $setup.videoUrl,
        autoplay: "",
        muted: "",
        loop: "",
        playsinline: "",
        "enable-progress-gesture": false,
        "show-fullscreen-btn": false,
        "show-play-btn": false,
        controls: false
      }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 1,
          class: "bg-img",
          style: vue.normalizeStyle({ backgroundImage: "url(" + $setup.bgStyle + ")" })
        },
        null,
        4
        /* STYLE */
      )),
      vue.createElementVNode("view", { class: "bg-overlay" })
    ])) : (vue.openBlock(), vue.createElementBlock("view", {
      key: 1,
      class: "bg-default"
    }));
  }
  const BgLayer = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-65c59a96"], ["__file", "E:/WorkBuddy/2026-07-13-23-25-59/同学录系统_uni-app/components/BgLayer.vue"]]);
  const WIDE_PX = 768;
  let _wide = false;
  function isWideScreen() {
    try {
      const info = uni.getWindowInfo && uni.getWindowInfo() || uni.getSystemInfoSync();
      return (info.windowWidth || 0) >= WIDE_PX;
    } catch (e) {
    }
    return _wide;
  }
  const _sfc_main$c = {
    __name: "home",
    setup(__props, { expose: __expose }) {
      __expose();
      const wide = vue.ref(false);
      const list = vue.ref([]);
      const kw = vue.ref("");
      const loading = vue.ref(false);
      async function load() {
        loading.value = true;
        const r = await request("/api/students");
        if (r.data && r.data.students)
          list.value = r.data.students;
        loading.value = false;
      }
      const filtered = vue.computed(() => {
        const k = kw.value.trim().toLowerCase();
        if (!k)
          return list.value;
        return list.value.filter((s2) => (s2.name || "").toLowerCase().includes(k) || String(s2.student_no || "").includes(k));
      });
      function portraitUrl(s2) {
        return resURL(s2.portrait, store.base);
      }
      function goDetail(s2) {
        uni.navigateTo({ url: "/pages/classmate/detail?no=" + s2.student_no });
      }
      vue.onMounted(() => {
        wide.value = isWideScreen();
        load();
      });
      const __returned__ = { wide, list, kw, loading, load, filtered, portraitUrl, goDetail, ref: vue.ref, computed: vue.computed, onMounted: vue.onMounted, get request() {
        return request;
      }, get store() {
        return store;
      }, get resURL() {
        return resURL;
      }, BottomNav, SideBar, Icon, BgLayer, get isWideScreen() {
        return isWideScreen;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["page", { wide: $setup.wide }])
      },
      [
        vue.createVNode($setup["BgLayer"]),
        $setup.wide ? (vue.openBlock(), vue.createBlock($setup["SideBar"], {
          key: 0,
          active: "home"
        })) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "main" }, [
          vue.createElementVNode("view", { class: "top" }, [
            vue.createElementVNode("text", { class: "title" }, "同学录"),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "search",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.kw = $event),
                placeholder: "搜索姓名 / 学号"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $setup.kw]
            ])
          ]),
          $setup.loading ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "tip"
          }, "加载中...")) : !$setup.filtered.length ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "tip"
          }, "暂无同学")) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { class: "list" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.filtered, (s2) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: s2.student_no,
                  class: "item",
                  "hover-class": "item-hover",
                  onClick: ($event) => $setup.goDetail(s2)
                }, [
                  s2.portrait ? (vue.openBlock(), vue.createElementBlock("image", {
                    key: 0,
                    class: "avatar",
                    src: $setup.portraitUrl(s2),
                    mode: "aspectFill"
                  }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: 1,
                      class: "avatar ph"
                    },
                    vue.toDisplayString((s2.name || "?").slice(0, 1)),
                    1
                    /* TEXT */
                  )),
                  vue.createElementVNode("view", { class: "meta" }, [
                    vue.createElementVNode("text", { class: "name" }, [
                      vue.createTextVNode(
                        vue.toDisplayString(s2.name),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "no" },
                        " #" + vue.toDisplayString(s2.student_no),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode(
                      "text",
                      { class: "line" },
                      vue.toDisplayString(s2.school || "未填写学校"),
                      1
                      /* TEXT */
                    ),
                    s2.nickname_display ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      {
                        key: 0,
                        class: "line nick"
                      },
                      "昵称：" + vue.toDisplayString(s2.nickname_display),
                      1
                      /* TEXT */
                    )) : vue.createCommentVNode("v-if", true)
                  ]),
                  vue.createVNode($setup["Icon"], {
                    name: "arrow",
                    size: 40,
                    color: "#c9c7c1"
                  })
                ], 8, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]),
        !$setup.wide ? (vue.openBlock(), vue.createBlock($setup["BottomNav"], {
          key: 1,
          active: "home"
        })) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const PagesHomeHome = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-07e72d3c"], ["__file", "E:/WorkBuddy/2026-07-13-23-25-59/同学录系统_uni-app/pages/home/home.vue"]]);
  const ON_SHOW = "onShow";
  const ON_HIDE = "onHide";
  const ON_LAUNCH = "onLaunch";
  const ON_LOAD = "onLoad";
  const ON_UNLOAD = "onUnload";
  function requireNativePlugin(name) {
    return weex.requireModule(name);
  }
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const createLifeCycleHook = (lifecycle, flag = 0) => (hook, target = vue.getCurrentInstance()) => {
    if (vue.isInSSRComponentSetup)
      return;
    vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createLifeCycleHook(
    ON_SHOW,
    2
    /* HookFlags.PAGE */
  );
  const onHide = /* @__PURE__ */ createLifeCycleHook(
    ON_HIDE,
    2
    /* HookFlags.PAGE */
  );
  const onLaunch = /* @__PURE__ */ createLifeCycleHook(
    ON_LAUNCH,
    1
    /* HookFlags.APP */
  );
  const onLoad = /* @__PURE__ */ createLifeCycleHook(
    ON_LOAD,
    2
    /* HookFlags.PAGE */
  );
  const onUnload = /* @__PURE__ */ createLifeCycleHook(
    ON_UNLOAD,
    2
    /* HookFlags.PAGE */
  );
  const _sfc_main$b = {
    __name: "detail",
    setup(__props, { expose: __expose }) {
      __expose();
      const no = vue.ref("");
      const stu = vue.ref(null);
      const err = vue.ref("");
      const wide = vue.ref(false);
      function portrait() {
        return stu.value && stu.value.portrait_path ? resURL("/portrait/" + no.value, store.base) : "";
      }
      async function load() {
        const r = await request("/api/student/" + no.value);
        if (r.data && r.data.ok)
          stu.value = r.data.student;
        else
          err.value = r.data && r.data.msg || "加载失败";
      }
      onLoad((q) => {
        no.value = q.no || "";
      });
      vue.onMounted(() => {
        wide.value = isWideScreen();
        load();
      });
      function goChat() {
        if (!stu.value)
          return;
        const name = encodeURIComponent(stu.value.name || no.value);
        uni.navigateTo({ url: "/pages/chat/conversation?no=" + no.value + "&name=" + name });
      }
      const __returned__ = { no, stu, err, wide, portrait, load, goChat, ref: vue.ref, onMounted: vue.onMounted, get onLoad() {
        return onLoad;
      }, get request() {
        return request;
      }, get store() {
        return store;
      }, get resURL() {
        return resURL;
      }, BottomNav, SideBar, Icon, BgLayer, get isWideScreen() {
        return isWideScreen;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["page", { wide: $setup.wide }])
      },
      [
        vue.createVNode($setup["BgLayer"]),
        $setup.wide ? (vue.openBlock(), vue.createBlock($setup["SideBar"], {
          key: 0,
          active: "home"
        })) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "main" }, [
          $setup.err ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 0,
              class: "tip err"
            },
            vue.toDisplayString($setup.err),
            1
            /* TEXT */
          )) : $setup.stu ? (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            [
              vue.createElementVNode("view", { class: "head" }, [
                $setup.stu.portrait_path ? (vue.openBlock(), vue.createElementBlock("image", {
                  key: 0,
                  class: "big",
                  src: $setup.portrait(),
                  mode: "aspectFill"
                }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: 1,
                    class: "big ph"
                  },
                  vue.toDisplayString(($setup.stu.name || "?").slice(0, 1)),
                  1
                  /* TEXT */
                )),
                vue.createElementVNode(
                  "text",
                  { class: "hname" },
                  vue.toDisplayString($setup.stu.name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "hno" },
                  "#" + vue.toDisplayString($setup.stu.student_no),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "card glass" }, [
                vue.createElementVNode("view", { class: "row" }, [
                  vue.createElementVNode("text", { class: "k" }, "性别"),
                  vue.createElementVNode(
                    "text",
                    { class: "v" },
                    vue.toDisplayString($setup.stu.gender || "—"),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "row" }, [
                  vue.createElementVNode("text", { class: "k" }, "学校"),
                  vue.createElementVNode(
                    "text",
                    { class: "v" },
                    vue.toDisplayString($setup.stu.school || "—"),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "row" }, [
                  vue.createElementVNode("text", { class: "k" }, "昵称"),
                  vue.createElementVNode(
                    "text",
                    { class: "v" },
                    vue.toDisplayString($setup.stu.nickname || "—"),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "row" }, [
                  vue.createElementVNode("text", { class: "k" }, "手机"),
                  vue.createElementVNode(
                    "text",
                    { class: "v" },
                    vue.toDisplayString($setup.stu.phone || "—"),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "row" }, [
                  vue.createElementVNode("text", { class: "k" }, "身份证号"),
                  vue.createElementVNode(
                    "text",
                    { class: "v" },
                    vue.toDisplayString($setup.stu.id_number || "—"),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "row" }, [
                  vue.createElementVNode("text", { class: "k" }, "家乡"),
                  vue.createElementVNode(
                    "text",
                    { class: "v" },
                    vue.toDisplayString($setup.stu.hometown || "—"),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "row" }, [
                  vue.createElementVNode("text", { class: "k" }, "爱好"),
                  vue.createElementVNode(
                    "text",
                    { class: "v" },
                    vue.toDisplayString($setup.stu.hobby || "—"),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "row" }, [
                  vue.createElementVNode("text", { class: "k" }, "寄语"),
                  vue.createElementVNode(
                    "text",
                    { class: "v" },
                    vue.toDisplayString($setup.stu.poem || "—"),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              vue.createElementVNode("view", {
                class: "chat-btn glass",
                "hover-class": "chat-hover",
                onClick: $setup.goChat
              }, [
                vue.createVNode($setup["Icon"], {
                  name: "chat",
                  size: 36,
                  color: "#fff"
                }),
                vue.createElementVNode("text", { class: "chat-tx" }, "发消息")
              ])
            ],
            64
            /* STABLE_FRAGMENT */
          )) : (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "tip"
          }, "加载中..."))
        ]),
        !$setup.wide ? (vue.openBlock(), vue.createBlock($setup["BottomNav"], {
          key: 1,
          active: "home"
        })) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const PagesClassmateDetail = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-5f2f3840"], ["__file", "E:/WorkBuddy/2026-07-13-23-25-59/同学录系统_uni-app/pages/classmate/detail.vue"]]);
  const _sfc_main$a = {
    __name: "music",
    setup(__props, { expose: __expose }) {
      __expose();
      const wide = vue.ref(false);
      const tracks = vue.ref([]);
      const cur = vue.ref(-1);
      const playing = vue.ref(false);
      let audio = null;
      function audioUrl(t) {
        return resURL(t.audio, store.base);
      }
      function coverUrl(t) {
        return resURL(t.cover, store.base);
      }
      async function load() {
        const r = await request("/api/music");
        if (Array.isArray(r.data))
          tracks.value = r.data;
      }
      function ensureAudio() {
        if (!audio)
          audio = uni.createInnerAudioContext();
        audio.onError(() => {
          uni.showToast({ title: "播放失败", icon: "none" });
        });
      }
      function play(i) {
        ensureAudio();
        if (cur.value === i) {
          toggle();
          return;
        }
        cur.value = i;
        audio.src = audioUrl(tracks.value[i]);
        audio.play();
        playing.value = true;
      }
      function toggle() {
        if (!audio || cur.value < 0)
          return;
        if (playing.value) {
          audio.pause();
          playing.value = false;
        } else {
          audio.play();
          playing.value = true;
        }
      }
      function prev() {
        if (cur.value > 0)
          play(cur.value - 1);
      }
      function next() {
        if (cur.value < tracks.value.length - 1)
          play(cur.value + 1);
      }
      function goContribute() {
        uni.navigateTo({ url: "/pages/contribute/contribute" });
      }
      onShow(() => {
        wide.value = isWideScreen();
        load();
      });
      vue.onUnmounted(() => {
        if (audio)
          audio.destroy();
      });
      const __returned__ = { wide, tracks, cur, playing, get audio() {
        return audio;
      }, set audio(v) {
        audio = v;
      }, audioUrl, coverUrl, load, ensureAudio, play, toggle, prev, next, goContribute, ref: vue.ref, onUnmounted: vue.onUnmounted, get onShow() {
        return onShow;
      }, get request() {
        return request;
      }, get store() {
        return store;
      }, get resURL() {
        return resURL;
      }, BottomNav, SideBar, Icon, BgLayer, get isWideScreen() {
        return isWideScreen;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["page", { wide: $setup.wide }])
      },
      [
        vue.createVNode($setup["BgLayer"]),
        $setup.wide ? (vue.openBlock(), vue.createBlock($setup["SideBar"], {
          key: 0,
          active: "music"
        })) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "main" }, [
          vue.createElementVNode("view", { class: "top" }, [
            vue.createElementVNode("text", { class: "title" }, "音乐"),
            vue.createElementVNode("button", {
              class: "mini",
              size: "mini",
              onClick: $setup.goContribute
            }, "投稿")
          ]),
          !$setup.tracks.length ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "tip"
          }, "暂无音乐")) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { class: "list" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.tracks, (t, i) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: t.id,
                  class: vue.normalizeClass(["item", { on: i === $setup.cur && $setup.playing }]),
                  "hover-class": "item-hover",
                  onClick: ($event) => $setup.play(i)
                }, [
                  t.cover ? (vue.openBlock(), vue.createElementBlock("image", {
                    key: 0,
                    class: "cv",
                    src: $setup.coverUrl(t),
                    mode: "aspectFill"
                  }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "cv ph"
                  }, [
                    vue.createVNode($setup["Icon"], {
                      name: "music",
                      size: 40,
                      color: "#fff"
                    })
                  ])),
                  vue.createElementVNode("view", { class: "meta" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "t1" },
                      vue.toDisplayString(t.title),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "t2" },
                      vue.toDisplayString(t.artist || "未知歌手"),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createVNode($setup["Icon"], {
                    name: i === $setup.cur && $setup.playing ? "pause" : "play",
                    size: 40,
                    color: "#DA4F33"
                  }, null, 8, ["name"])
                ], 10, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          $setup.cur >= 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "player"
          }, [
            $setup.tracks[$setup.cur].cover ? (vue.openBlock(), vue.createElementBlock("image", {
              key: 0,
              class: "p-cv",
              src: $setup.coverUrl($setup.tracks[$setup.cur]),
              mode: "aspectFill"
            }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "p-cv ph"
            }, [
              vue.createVNode($setup["Icon"], {
                name: "music",
                size: 36,
                color: "#fff"
              })
            ])),
            vue.createElementVNode("view", { class: "p-meta" }, [
              vue.createElementVNode(
                "text",
                { class: "p-t" },
                vue.toDisplayString($setup.tracks[$setup.cur].title),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "text",
                { class: "p-a" },
                vue.toDisplayString($setup.tracks[$setup.cur].artist || "未知歌手"),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "p-ctrl" }, [
              vue.createElementVNode("view", {
                class: "ctrl-btn",
                "hover-class": "ctrl-hover",
                onClick: $setup.prev
              }, [
                vue.createVNode($setup["Icon"], {
                  name: "prev",
                  size: 44,
                  color: "#DA4F33"
                })
              ]),
              vue.createElementVNode("view", {
                class: "ctrl-btn big",
                "hover-class": "ctrl-hover",
                onClick: $setup.toggle
              }, [
                vue.createVNode($setup["Icon"], {
                  name: $setup.playing ? "pause" : "play",
                  size: 56,
                  color: "#DA4F33"
                }, null, 8, ["name"])
              ]),
              vue.createElementVNode("view", {
                class: "ctrl-btn",
                "hover-class": "ctrl-hover",
                onClick: $setup.next
              }, [
                vue.createVNode($setup["Icon"], {
                  name: "next",
                  size: 44,
                  color: "#DA4F33"
                })
              ])
            ])
          ])) : vue.createCommentVNode("v-if", true)
        ]),
        !$setup.wide ? (vue.openBlock(), vue.createBlock($setup["BottomNav"], {
          key: 1,
          active: "music"
        })) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const PagesMusicMusic = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-c9f7182c"], ["__file", "E:/WorkBuddy/2026-07-13-23-25-59/同学录系统_uni-app/pages/music/music.vue"]]);
  const _sfc_main$9 = {
    __name: "contribute",
    setup(__props, { expose: __expose }) {
      __expose();
      const title = vue.ref("");
      const artist = vue.ref("");
      const audioFile = vue.ref(null);
      const coverFile = vue.ref(null);
      const lrcFile = vue.ref(null);
      const submitting = vue.ref(false);
      function pickAudio() {
        uni.chooseFile({
          count: 1,
          type: "file",
          extension: ["mp3", "m4a", "ogg", "wav", "flac"],
          success: (r) => {
            audioFile.value = r.tempFiles[0];
          }
        });
      }
      function pickCover() {
        uni.chooseImage({ count: 1, success: (r) => {
          coverFile.value = { name: "cover.jpg", path: r.tempFilePaths[0] };
        } });
      }
      function pickLrc() {
        uni.chooseFile({ count: 1, type: "file", extension: ["lrc", "txt"], success: (r) => {
          lrcFile.value = r.tempFiles[0];
        } });
      }
      async function submit() {
        if (!title.value || !audioFile.value) {
          uni.showToast({ title: "请填写标题并选择音频", icon: "none" });
          return;
        }
        const files = [{ name: "audio", uri: audioFile.value.path }];
        const formData = { title: title.value, artist: artist.value || "" };
        if (coverFile.value)
          files.push({ name: "cover", uri: coverFile.value.path });
        if (lrcFile.value)
          files.push({ name: "lrc", uri: lrcFile.value.path });
        submitting.value = true;
        const r = await upload("/api/music/contribute", files, formData);
        submitting.value = false;
        if (r.data && r.data.ok) {
          uni.showToast({ title: "投稿成功，等待审核", icon: "success" });
          setTimeout(() => uni.navigateBack(), 1200);
        } else {
          uni.showToast({ title: r.data && r.data.msg || "投稿失败", icon: "none" });
        }
      }
      const __returned__ = { title, artist, audioFile, coverFile, lrcFile, submitting, pickAudio, pickCover, pickLrc, submit, ref: vue.ref, get upload() {
        return upload;
      }, Icon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "card glass" }, [
        vue.createElementVNode("view", { class: "card-head" }, [
          vue.createVNode($setup["Icon"], {
            name: "music",
            size: 36,
            color: "#DA4F33"
          }),
          vue.createElementVNode("text", { class: "label" }, "音乐投稿")
        ]),
        vue.createElementVNode("text", { class: "label" }, "歌曲标题 *"),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            class: "field",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.title = $event),
            placeholder: "必填"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.title]
        ]),
        vue.createElementVNode("text", { class: "label" }, "歌手"),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            class: "field",
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.artist = $event),
            placeholder: "选填"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.artist]
        ]),
        vue.createElementVNode("text", { class: "label" }, "音频文件 *"),
        vue.createElementVNode(
          "button",
          {
            class: "pick",
            "hover-class": "pick-hover",
            onClick: $setup.pickAudio
          },
          vue.toDisplayString($setup.audioFile ? $setup.audioFile.name : "选择音频（mp3/m4a/ogg/wav/flac）"),
          1
          /* TEXT */
        ),
        vue.createElementVNode("text", { class: "label" }, "封面（选填）"),
        vue.createElementVNode(
          "button",
          {
            class: "pick",
            "hover-class": "pick-hover",
            onClick: $setup.pickCover
          },
          vue.toDisplayString($setup.coverFile ? $setup.coverFile.name : "选择封面图片"),
          1
          /* TEXT */
        ),
        vue.createElementVNode("text", { class: "label" }, "歌词（选填）"),
        vue.createElementVNode(
          "button",
          {
            class: "pick",
            "hover-class": "pick-hover",
            onClick: $setup.pickLrc
          },
          vue.toDisplayString($setup.lrcFile ? $setup.lrcFile.name : "选择歌词文件（lrc/txt）"),
          1
          /* TEXT */
        ),
        vue.createElementVNode("button", {
          class: "btn primary",
          loading: $setup.submitting,
          onClick: $setup.submit
        }, "提交投稿", 8, ["loading"]),
        vue.createElementVNode("text", { class: "hint" }, "投稿后将进入待审队列，管理员审核通过才会上架。")
      ])
    ]);
  }
  const PagesContributeContribute = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-43f66588"], ["__file", "E:/WorkBuddy/2026-07-13-23-25-59/同学录系统_uni-app/pages/contribute/contribute.vue"]]);
  const _sfc_main$8 = {
    __name: "me",
    setup(__props, { expose: __expose }) {
      __expose();
      const wide = vue.ref(false);
      const loading = vue.ref(false);
      const err = vue.ref("");
      const serverInput = vue.ref("");
      const profile = vue.reactive({});
      const profileKeys = [
        ["name", "姓名"],
        ["nickname", "昵称"],
        ["gender", "性别"],
        ["hometown", "家乡"],
        ["phone", "电话"],
        ["class", "班级"],
        ["actual_class", "实际班级"],
        ["actual_school", "实际学校"],
        ["hobby", "爱好"],
        ["games", "常玩游戏"],
        ["social", "社交账号"],
        ["poem", "寄语"]
      ];
      const pwd = vue.reactive({ old: "", new: "", again: "" });
      const savingPwd = vue.ref(false);
      const pwdMsg = vue.ref("");
      const sec = vue.reactive({ has_passkey: false, yicloud_id: "", has_email: false, has_otp: false });
      const displayName = vue.computed(() => {
        const u = store.user;
        if (!u)
          return "未登录";
        return u.name || u.nickname || u.student_no || u.username || "同学";
      });
      const roleText = vue.computed(() => store.isAdmin ? "管理员" : "同学");
      const studentNo = vue.computed(() => store.user && store.user.student_no || "—");
      onShow(async () => {
        wide.value = isWideScreen();
        serverInput.value = getBase() || "";
        await loadMe();
      });
      async function loadMe() {
        loading.value = true;
        err.value = "";
        try {
          const r = await request("/api/me");
          if (r.data && r.data.ok) {
            const u = r.data.user || {};
            const st = r.data.student || {};
            store.user = u;
            store.isAdmin = !!u.is_admin;
            if (r.data.bg)
              setBg(r.data.bg);
            sec.has_passkey = !!u.has_passkey;
            sec.yicloud_id = u.yicloud_id || "";
            sec.has_email = !!u.has_email;
            sec.has_otp = !!u.has_otp;
            for (const [k] of profileKeys)
              profile[k] = st[k] || "";
          } else if (r.statusCode === 401) {
            clearUser();
            uni.reLaunch({ url: "/pages/login/login" });
          } else {
            err.value = "加载失败，请点击重试";
          }
        } catch (e) {
          err.value = "连接服务器超时，点击屏幕重试（可在下方「服务器地址」修正）";
        }
        loading.value = false;
      }
      async function savePwd() {
        if (pwd.new !== pwd.again) {
          pwdMsg.value = "两次新密码不一致";
          return;
        }
        if (!pwd.new) {
          pwdMsg.value = "新密码不能为空";
          return;
        }
        savingPwd.value = true;
        pwdMsg.value = "";
        const r = await post("/api/me/password", { old_password: pwd.old, new_password: pwd.new });
        savingPwd.value = false;
        const d = r.data || {};
        pwdMsg.value = d.ok ? "密码已修改" : d.msg || "修改失败";
        if (d.ok) {
          pwd.old = pwd.new = pwd.again = "";
        }
        uni.showToast({ title: pwdMsg.value, icon: "none" });
      }
      function saveServer() {
        const v = (serverInput.value || "").trim().replace(/\/+$/, "");
        if (!v) {
          uni.showToast({ title: "地址不能为空", icon: "none" });
          return;
        }
        setBase(v);
        uni.showToast({ title: "服务器地址已保存", icon: "none" });
      }
      function goScan() {
        uni.navigateTo({ url: "/pages/scan/scan" });
      }
      async function logout() {
        await post("/api/logout", {});
        clearUser();
        uni.reLaunch({ url: "/pages/login/login" });
      }
      function goAdmin() {
        uni.navigateTo({ url: "/pages/admin/admin" });
      }
      const __returned__ = { wide, loading, err, serverInput, profile, profileKeys, pwd, savingPwd, pwdMsg, sec, displayName, roleText, studentNo, loadMe, savePwd, saveServer, goScan, logout, goAdmin, ref: vue.ref, reactive: vue.reactive, computed: vue.computed, get onShow() {
        return onShow;
      }, get post() {
        return post;
      }, get request() {
        return request;
      }, get store() {
        return store;
      }, get clearUser() {
        return clearUser;
      }, get setBg() {
        return setBg;
      }, get getBase() {
        return getBase;
      }, get setBase() {
        return setBase;
      }, SideBar, BottomNav, Icon, BgLayer, get isWideScreen() {
        return isWideScreen;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["page", { wide: $setup.wide }])
      },
      [
        vue.createVNode($setup["BgLayer"]),
        $setup.wide ? (vue.openBlock(), vue.createBlock($setup["SideBar"], {
          key: 0,
          active: "me"
        })) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "main" }, [
          $setup.loading ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "loading"
          }, "加载中…")) : $setup.err ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 1,
              class: "loading err",
              onClick: $setup.loadMe
            },
            vue.toDisplayString($setup.err) + "（点击重试）",
            1
            /* TEXT */
          )) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { class: "head glass" }, [
            vue.createElementVNode(
              "view",
              { class: "ava" },
              vue.toDisplayString($setup.displayName.slice(0, 1)),
              1
              /* TEXT */
            ),
            vue.createElementVNode("view", { class: "info" }, [
              vue.createElementVNode(
                "text",
                { class: "nm" },
                vue.toDisplayString($setup.displayName),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "text",
                { class: "rl" },
                vue.toDisplayString($setup.roleText) + " · #" + vue.toDisplayString($setup.studentNo),
                1
                /* TEXT */
              )
            ])
          ]),
          vue.createElementVNode("view", { class: "card glass" }, [
            vue.createElementVNode("view", { class: "card-head" }, [
              vue.createVNode($setup["Icon"], {
                name: "user",
                size: 36,
                color: "#DA4F33"
              }),
              vue.createElementVNode("text", { class: "label" }, "我的资料（只读）")
            ]),
            vue.createElementVNode("view", { class: "note" }, "App 端仅可查看；正式修改请到电脑网页端「我的」页面编辑并提交。"),
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.profileKeys, ([k, t]) => {
                return vue.createElementVNode("view", {
                  key: k,
                  class: "row"
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "row-k" },
                    vue.toDisplayString(t),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "row-v" },
                    vue.toDisplayString($setup.profile[k] || "—"),
                    1
                    /* TEXT */
                  )
                ]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ]),
          vue.createElementVNode("view", { class: "card glass" }, [
            vue.createElementVNode("view", { class: "card-head" }, [
              vue.createVNode($setup["Icon"], {
                name: "key",
                size: 36,
                color: "#DA4F33"
              }),
              vue.createElementVNode("text", { class: "label" }, "修改密码")
            ]),
            vue.createElementVNode("text", { class: "label" }, "旧密码"),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "field",
                password: "",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.pwd.old = $event),
                placeholder: "请输入旧密码"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $setup.pwd.old]
            ]),
            vue.createElementVNode("text", { class: "label" }, "新密码"),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "field",
                password: "",
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.pwd.new = $event),
                placeholder: "至少 6 位"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $setup.pwd.new]
            ]),
            vue.createElementVNode("text", { class: "label" }, "再次输入新密码"),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "field",
                password: "",
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.pwd.again = $event),
                placeholder: "再次输入新密码"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $setup.pwd.again]
            ]),
            vue.createElementVNode("button", {
              class: "btn",
              loading: $setup.savingPwd,
              onClick: $setup.savePwd
            }, "修改密码", 8, ["loading"]),
            $setup.pwdMsg ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 0,
                class: "msg"
              },
              vue.toDisplayString($setup.pwdMsg),
              1
              /* TEXT */
            )) : vue.createCommentVNode("v-if", true)
          ]),
          vue.createElementVNode("view", { class: "card glass" }, [
            vue.createElementVNode("view", { class: "card-head" }, [
              vue.createVNode($setup["Icon"], {
                name: "qr",
                size: 36,
                color: "#DA4F33"
              }),
              vue.createElementVNode("text", { class: "label" }, "扫码登录电脑端")
            ]),
            vue.createElementVNode("view", { class: "note" }, "用电脑打开同学录网页端，点击「扫码登录」，再用此处扫码即可在电脑端登录当前账号。"),
            vue.createElementVNode("button", {
              class: "btn primary",
              onClick: $setup.goScan
            }, "扫一扫登录电脑端")
          ]),
          vue.createElementVNode("view", { class: "card glass" }, [
            vue.createElementVNode("view", { class: "card-head" }, [
              vue.createVNode($setup["Icon"], {
                name: "server",
                size: 36,
                color: "#DA4F33"
              }),
              vue.createElementVNode("text", { class: "label" }, "服务器地址")
            ]),
            vue.createElementVNode("text", { class: "label" }, "API 地址"),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "field",
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.serverInput = $event),
                placeholder: "https://…"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $setup.serverInput]
            ]),
            vue.createElementVNode("button", {
              class: "btn sm",
              onClick: $setup.saveServer
            }, "保存地址")
          ]),
          vue.createElementVNode("view", { class: "card glass" }, [
            vue.createElementVNode("view", { class: "card-head" }, [
              vue.createVNode($setup["Icon"], {
                name: "shield",
                size: 36,
                color: "#DA4F33"
              }),
              vue.createElementVNode("text", { class: "label" }, "安全验证方式")
            ]),
            vue.createElementVNode("view", { class: "row" }, [
              vue.createElementVNode("text", { class: "row-k" }, "Passkey"),
              vue.createElementVNode(
                "text",
                {
                  class: vue.normalizeClass(["pill", $setup.sec.has_passkey ? "on" : "off"])
                },
                vue.toDisplayString($setup.sec.has_passkey ? "已注册" : "未注册"),
                3
                /* TEXT, CLASS */
              )
            ]),
            vue.createElementVNode("view", { class: "row" }, [
              vue.createElementVNode("text", { class: "row-k" }, "亦云账号"),
              vue.createElementVNode(
                "text",
                { class: "row-v" },
                vue.toDisplayString($setup.sec.yicloud_id ? "已绑定：" + $setup.sec.yicloud_id : "未绑定"),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "row" }, [
              vue.createElementVNode("text", { class: "row-k" }, "两步验证 OTP"),
              vue.createElementVNode(
                "text",
                {
                  class: vue.normalizeClass(["pill", $setup.sec.has_otp ? "on" : "off"])
                },
                vue.toDisplayString($setup.sec.has_otp ? "已启用" : "未启用"),
                3
                /* TEXT, CLASS */
              )
            ]),
            vue.createElementVNode("view", { class: "row" }, [
              vue.createElementVNode("text", { class: "row-k" }, "邮箱"),
              vue.createElementVNode(
                "text",
                {
                  class: vue.normalizeClass(["pill", $setup.sec.has_email ? "on" : "off"])
                },
                vue.toDisplayString($setup.sec.has_email ? "已设置" : "未设置"),
                3
                /* TEXT, CLASS */
              )
            ])
          ]),
          $setup.store.isAdmin ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "card link glass",
            "hover-class": "link-hover",
            onClick: $setup.goAdmin
          }, [
            vue.createElementVNode("view", { class: "link-l" }, [
              vue.createVNode($setup["Icon"], {
                name: "gear",
                size: 36,
                color: "#7C7A74"
              }),
              vue.createElementVNode("text", null, "权限管理面板")
            ]),
            vue.createVNode($setup["Icon"], {
              name: "arrow",
              size: 40,
              color: "#c9c7c1"
            })
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", {
            class: "card link danger glass",
            "hover-class": "link-hover",
            onClick: $setup.logout
          }, [
            vue.createElementVNode("view", { class: "link-l" }, [
              vue.createVNode($setup["Icon"], {
                name: "lock",
                size: 36,
                color: "#DA4F33"
              }),
              vue.createElementVNode("text", null, "退出登录")
            ]),
            vue.createVNode($setup["Icon"], {
              name: "arrow",
              size: 40,
              color: "#c9c7c1"
            })
          ])
        ]),
        !$setup.wide ? (vue.openBlock(), vue.createBlock($setup["BottomNav"], {
          key: 1,
          active: "me"
        })) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const PagesMeMe = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-19c123a7"], ["__file", "E:/WorkBuddy/2026-07-13-23-25-59/同学录系统_uni-app/pages/me/me.vue"]]);
  const _sfc_main$7 = {
    __name: "links",
    setup(__props, { expose: __expose }) {
      __expose();
      const wide = vue.ref(false);
      const items = vue.ref([
        { icon: "home", text: "首页 / 同学列表", url: "/pages/home/home" },
        { icon: "chat", text: "消息 / 聊天", url: "/pages/chat/chat" },
        { icon: "music", text: "音乐", url: "/pages/music/music" },
        { icon: "user", text: "我的", url: "/pages/me/me" },
        { icon: "info", text: "关于", url: "/pages/about/about" },
        { icon: "gift", text: "赞助与支持", url: "/pages/sponsor/sponsor" }
      ]);
      if (store.isAdmin) {
        items.value.push({ icon: "gear", text: "权限管理面板", url: "/pages/admin/admin" });
      }
      function go(it) {
        uni.reLaunch({ url: it.url });
      }
      wide.value = isWideScreen();
      const __returned__ = { wide, items, go, ref: vue.ref, get store() {
        return store;
      }, BottomNav, SideBar, Icon, BgLayer, get isWideScreen() {
        return isWideScreen;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["page", { wide: $setup.wide }])
      },
      [
        vue.createVNode($setup["BgLayer"]),
        $setup.wide ? (vue.openBlock(), vue.createBlock($setup["SideBar"], {
          key: 0,
          active: "links"
        })) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "main" }, [
          vue.createElementVNode("view", { class: "title" }, "可用链接"),
          vue.createElementVNode("view", { class: "card glass" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.items, (it, i) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: i,
                  class: "item",
                  "hover-class": "item-hover",
                  onClick: ($event) => $setup.go(it)
                }, [
                  vue.createVNode($setup["Icon"], {
                    name: it.icon,
                    size: 40,
                    color: "#7C7A74"
                  }, null, 8, ["name"]),
                  vue.createElementVNode(
                    "text",
                    { class: "tx" },
                    vue.toDisplayString(it.text),
                    1
                    /* TEXT */
                  ),
                  vue.createVNode($setup["Icon"], {
                    name: "arrow",
                    size: 40,
                    color: "#c9c7c1"
                  })
                ], 8, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          vue.createElementVNode("view", { class: "note" }, "兼容版与更多功能页面将在后续版本补充。")
        ]),
        !$setup.wide ? (vue.openBlock(), vue.createBlock($setup["BottomNav"], {
          key: 1,
          active: "links"
        })) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const PagesLinksLinks = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-3892fef1"], ["__file", "E:/WorkBuddy/2026-07-13-23-25-59/同学录系统_uni-app/pages/links/links.vue"]]);
  const _sfc_main$6 = {
    __name: "about",
    setup(__props, { expose: __expose }) {
      __expose();
      const wide = vue.ref(false);
      const latest = vue.ref("");
      const local = vue.ref("");
      const status = vue.ref("");
      const ai = vue.ref({});
      const loading = vue.ref(false);
      async function load() {
        loading.value = true;
        const [av, cfg] = await Promise.all([get$1("/api/app-version"), get$1("/api/config")]);
        if (av.data)
          latest.value = typeof av.data === "string" ? av.data : av.data.version || JSON.stringify(av.data);
        if (cfg.data) {
          ai.value = {
            enabled: cfg.data.ai_enabled,
            model: cfg.data.ai_model,
            base: cfg.data.ai_base_url
          };
          status.value = cfg.data.system && cfg.data.system.allow_login ? "正常运行" : "维护中";
        }
        loading.value = false;
      }
      vue.onMounted(() => {
        wide.value = isWideScreen();
        load();
      });
      const __returned__ = { wide, latest, local, status, ai, loading, load, ref: vue.ref, onMounted: vue.onMounted, get get() {
        return get$1;
      }, BottomNav, SideBar, Icon, BgLayer, get isWideScreen() {
        return isWideScreen;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["page", { wide: $setup.wide }])
      },
      [
        vue.createVNode($setup["BgLayer"]),
        $setup.wide ? (vue.openBlock(), vue.createBlock($setup["SideBar"], {
          key: 0,
          active: "about"
        })) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "main" }, [
          vue.createElementVNode("view", { class: "brand" }, [
            vue.createVNode($setup["Icon"], {
              name: "info",
              size: 52,
              color: "#DA4F33"
            }),
            vue.createElementVNode("view", { class: "logo" }, "同学录系统"),
            vue.createElementVNode("view", { class: "sub" }, "CLASSBOOK · 一份留给未来的档案")
          ]),
          vue.createElementVNode("view", { class: "card glass" }, [
            vue.createElementVNode("view", { class: "row" }, [
              vue.createElementVNode("text", { class: "k" }, "线上最新版本"),
              vue.createElementVNode(
                "text",
                { class: "v" },
                vue.toDisplayString($setup.latest || "—"),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "row" }, [
              vue.createElementVNode("text", { class: "k" }, "本地版本"),
              vue.createElementVNode("text", { class: "v" }, "1.11.01")
            ]),
            vue.createElementVNode("view", { class: "row" }, [
              vue.createElementVNode("text", { class: "k" }, "运行状态"),
              vue.createElementVNode("text", { class: "v" }, [
                vue.createElementVNode(
                  "text",
                  {
                    class: vue.normalizeClass(["pill", $setup.status === "正常运行" ? "on" : "warn"])
                  },
                  vue.toDisplayString($setup.status || "—"),
                  3
                  /* TEXT, CLASS */
                )
              ])
            ]),
            vue.createElementVNode("view", { class: "row" }, [
              vue.createElementVNode("text", { class: "k" }, "Copyright"),
              vue.createElementVNode("text", { class: "v" }, "© 2026 同学录")
            ])
          ]),
          vue.createElementVNode("view", { class: "card glass" }, [
            vue.createElementVNode("view", { class: "card-head" }, [
              vue.createVNode($setup["Icon"], {
                name: "key",
                size: 34,
                color: "#DA4F33"
              }),
              vue.createElementVNode("view", { class: "sec" }, "AI 信息")
            ]),
            vue.createElementVNode("view", { class: "row" }, [
              vue.createElementVNode("text", { class: "k" }, "AI 开关"),
              vue.createElementVNode(
                "text",
                {
                  class: vue.normalizeClass(["pill", $setup.ai.enabled ? "on" : "off"])
                },
                vue.toDisplayString($setup.ai.enabled ? "已开启" : "已关闭"),
                3
                /* TEXT, CLASS */
              )
            ]),
            vue.createElementVNode("view", { class: "row" }, [
              vue.createElementVNode("text", { class: "k" }, "模型"),
              vue.createElementVNode(
                "text",
                { class: "v" },
                vue.toDisplayString($setup.ai.model || "—"),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "row" }, [
              vue.createElementVNode("text", { class: "k" }, "接口地址"),
              vue.createElementVNode(
                "text",
                { class: "v" },
                vue.toDisplayString($setup.ai.base || "—"),
                1
                /* TEXT */
              )
            ])
          ]),
          vue.createElementVNode("view", { class: "card glass" }, [
            vue.createElementVNode("view", { class: "card-head" }, [
              vue.createVNode($setup["Icon"], {
                name: "shield",
                size: 34,
                color: "#DA4F33"
              }),
              vue.createElementVNode("view", { class: "sec" }, "隐私与协议")
            ]),
            vue.createElementVNode("view", { class: "txt" }, "本应用收集的资料仅用于同学间互相联系与留念，按字段权限向不同查看者打码展示；你可随时在「我的」修改或申请撤回资料。详细用户协议与隐私政策以网页版为准。")
          ]),
          $setup.loading ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "tip"
          }, "加载中...")) : vue.createCommentVNode("v-if", true)
        ]),
        !$setup.wide ? (vue.openBlock(), vue.createBlock($setup["BottomNav"], {
          key: 1,
          active: "about"
        })) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const PagesAboutAbout = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-13a78ac6"], ["__file", "E:/WorkBuddy/2026-07-13-23-25-59/同学录系统_uni-app/pages/about/about.vue"]]);
  const _sfc_main$5 = {
    __name: "admin",
    setup(__props, { expose: __expose }) {
      __expose();
      const form = vue.ref({
        allow_login: true,
        passkey: true,
        yicloud: true,
        email: true,
        otp: true,
        ai_enabled: true,
        ai_sched_enabled: false,
        ai_start: "08:00",
        ai_end: "22:00",
        max_fails: 5,
        ip_lock_sec: 3600,
        account_lock_sec: 86400,
        yicloud_secret: "",
        app_version: "1.11.01"
      });
      const loading = vue.ref(false);
      const saved = vue.ref("");
      async function load() {
        loading.value = true;
        const r = await get$1("/api/settings");
        if (r.data && r.data.ok) {
          const c = r.data;
          const lm = c.login_methods || {};
          const sys = c.system || {};
          const sec = c.security || {};
          const lg = sec.login || {};
          form.value = {
            allow_login: sys.allow_login !== false,
            passkey: lm.passkey !== false,
            yicloud: lm.yicloud !== false,
            email: lm.email !== false,
            otp: lm.otp !== false,
            ai_enabled: !!c.ai_enabled,
            ai_sched_enabled: !!(c.ai_schedule && c.ai_schedule.enabled),
            ai_start: c.ai_schedule && c.ai_schedule.start || "08:00",
            ai_end: c.ai_schedule && c.ai_schedule.end || "22:00",
            max_fails: lg.max_fails || 5,
            ip_lock_sec: lg.ip_lock_sec || 3600,
            account_lock_sec: lg.account_lock_sec || 86400,
            yicloud_secret: "",
            app_version: c.app_version || "1.11.01"
          };
        } else if (r.statusCode === 403) {
          uni.showToast({ title: "无权限（需管理员）", icon: "none" });
        }
        loading.value = false;
      }
      async function save() {
        const payload = {
          system: { allow_login: form.value.allow_login },
          login_methods: {
            passkey: form.value.passkey,
            yicloud: form.value.yicloud,
            email: form.value.email,
            otp: form.value.otp
          },
          ai_manual: form.value.ai_enabled,
          ai_schedule: {
            enabled: form.value.ai_sched_enabled,
            start: form.value.ai_start,
            end: form.value.ai_end
          },
          security: {
            login: {
              max_fails: Number(form.value.max_fails),
              ip_lock_sec: Number(form.value.ip_lock_sec),
              account_lock_sec: Number(form.value.account_lock_sec)
            }
          },
          yicloud_secret: form.value.yicloud_secret,
          app_version: form.value.app_version
        };
        const r = await post("/api/settings", payload);
        saved.value = r.data && r.data.ok ? "已保存" : r.data && r.data.msg || "保存失败";
        if (!r.data || !r.data.ok)
          uni.showToast({ title: saved.value, icon: "none" });
      }
      function bool(key, e) {
        form.value[key] = e.detail.value;
      }
      vue.onMounted(load);
      const __returned__ = { form, loading, saved, load, save, bool, ref: vue.ref, onMounted: vue.onMounted, get get() {
        return get$1;
      }, get post() {
        return post;
      }, BottomNav, Icon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "title" }, "权限管理面板"),
      vue.createElementVNode("view", { class: "card glass" }, [
        vue.createElementVNode("view", { class: "card-head" }, [
          vue.createVNode($setup["Icon"], {
            name: "key",
            size: 34,
            color: "#DA4F33"
          }),
          vue.createElementVNode("view", { class: "sec" }, "登录与方式")
        ]),
        vue.createElementVNode("view", { class: "row" }, [
          vue.createElementVNode("text", null, "允许登录"),
          vue.createElementVNode("switch", {
            checked: $setup.form.allow_login,
            onChange: _cache[0] || (_cache[0] = ($event) => $setup.bool("allow_login", $event))
          }, null, 40, ["checked"])
        ]),
        vue.createElementVNode("view", { class: "row" }, [
          vue.createElementVNode("text", null, "Passkey 登录"),
          vue.createElementVNode("switch", {
            checked: $setup.form.passkey,
            onChange: _cache[1] || (_cache[1] = ($event) => $setup.bool("passkey", $event))
          }, null, 40, ["checked"])
        ]),
        vue.createElementVNode("view", { class: "row" }, [
          vue.createElementVNode("text", null, "亦云账号登录"),
          vue.createElementVNode("switch", {
            checked: $setup.form.yicloud,
            onChange: _cache[2] || (_cache[2] = ($event) => $setup.bool("yicloud", $event))
          }, null, 40, ["checked"])
        ]),
        vue.createElementVNode("view", { class: "row" }, [
          vue.createElementVNode("text", null, "邮箱登录"),
          vue.createElementVNode("switch", {
            checked: $setup.form.email,
            onChange: _cache[3] || (_cache[3] = ($event) => $setup.bool("email", $event))
          }, null, 40, ["checked"])
        ]),
        vue.createElementVNode("view", { class: "row" }, [
          vue.createElementVNode("text", null, "OTP 动态码"),
          vue.createElementVNode("switch", {
            checked: $setup.form.otp,
            onChange: _cache[4] || (_cache[4] = ($event) => $setup.bool("otp", $event))
          }, null, 40, ["checked"])
        ])
      ]),
      vue.createElementVNode("view", { class: "card glass" }, [
        vue.createElementVNode("view", { class: "card-head" }, [
          vue.createVNode($setup["Icon"], {
            name: "key",
            size: 34,
            color: "#DA4F33"
          }),
          vue.createElementVNode("view", { class: "sec" }, "AI 助手")
        ]),
        vue.createElementVNode("view", { class: "row" }, [
          vue.createElementVNode("text", null, "AI 开关"),
          vue.createElementVNode("switch", {
            checked: $setup.form.ai_enabled,
            onChange: _cache[5] || (_cache[5] = ($event) => $setup.bool("ai_enabled", $event))
          }, null, 40, ["checked"])
        ]),
        vue.createElementVNode("view", { class: "row" }, [
          vue.createElementVNode("text", null, "定时开启"),
          vue.createElementVNode("switch", {
            checked: $setup.form.ai_sched_enabled,
            onChange: _cache[6] || (_cache[6] = ($event) => $setup.bool("ai_sched_enabled", $event))
          }, null, 40, ["checked"])
        ]),
        vue.createElementVNode("view", { class: "row" }, [
          vue.createElementVNode("text", null, "开始时间"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "mini",
              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.form.ai_start = $event),
              placeholder: "08:00"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.form.ai_start]
          ])
        ]),
        vue.createElementVNode("view", { class: "row" }, [
          vue.createElementVNode("text", null, "结束时间"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "mini",
              "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.form.ai_end = $event),
              placeholder: "22:00"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.form.ai_end]
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "card glass" }, [
        vue.createElementVNode("view", { class: "card-head" }, [
          vue.createVNode($setup["Icon"], {
            name: "shield",
            size: 34,
            color: "#DA4F33"
          }),
          vue.createElementVNode("view", { class: "sec" }, "安全阈值")
        ]),
        vue.createElementVNode("view", { class: "row" }, [
          vue.createElementVNode("text", null, "最大失败次数"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "mini",
              type: "number",
              "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $setup.form.max_fails = $event)
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.form.max_fails]
          ])
        ]),
        vue.createElementVNode("view", { class: "row" }, [
          vue.createElementVNode("text", null, "IP 锁定时长(秒)"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "mini",
              type: "number",
              "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $setup.form.ip_lock_sec = $event)
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.form.ip_lock_sec]
          ])
        ]),
        vue.createElementVNode("view", { class: "row" }, [
          vue.createElementVNode("text", null, "账号锁定时长(秒)"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "mini",
              type: "number",
              "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $setup.form.account_lock_sec = $event)
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.form.account_lock_sec]
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "card glass" }, [
        vue.createElementVNode("view", { class: "card-head" }, [
          vue.createVNode($setup["Icon"], {
            name: "gear",
            size: 34,
            color: "#DA4F33"
          }),
          vue.createElementVNode("view", { class: "sec" }, "其他")
        ]),
        vue.createElementVNode("view", { class: "row col" }, [
          vue.createElementVNode("text", null, "亦云校验秘钥"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "field",
              "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $setup.form.yicloud_secret = $event),
              placeholder: "留空则保持不变"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.form.yicloud_secret]
          ])
        ]),
        vue.createElementVNode("view", { class: "row col" }, [
          vue.createElementVNode("text", null, "应用版本号"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "field",
              "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => $setup.form.app_version = $event),
              placeholder: "如 1.11.01"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.form.app_version]
          ])
        ])
      ]),
      vue.createElementVNode("button", {
        class: "btn",
        onClick: $setup.save
      }, "保存设置"),
      $setup.saved ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 0,
          class: "saved"
        },
        vue.toDisplayString($setup.saved),
        1
        /* TEXT */
      )) : vue.createCommentVNode("v-if", true),
      $setup.loading ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "tip"
      }, "加载中...")) : vue.createCommentVNode("v-if", true),
      vue.createVNode($setup["BottomNav"], { active: "home" })
    ]);
  }
  const PagesAdminAdmin = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-dbc77958"], ["__file", "E:/WorkBuddy/2026-07-13-23-25-59/同学录系统_uni-app/pages/admin/admin.vue"]]);
  const AD_INTERSTITIAL = "";
  const AD_REWARD = "";
  const _sfc_main$4 = {
    __name: "sponsor",
    setup(__props, { expose: __expose }) {
      __expose();
      const rewardedReady = vue.ref(false);
      const tip = vue.ref("");
      function showInterstitial() {
        {
          tip.value = "插屏广告位未配置（在 uniAD 后台申请后填入 manifest 的 uni-ad）";
          return;
        }
      }
      function showRewarded() {
        {
          tip.value = "激励视频广告位未配置（在 uniAD 后台申请后填入 manifest 的 uni-ad）";
          return;
        }
      }
      function goDonate() {
        uni.showToast({ title: "可通过网页版「关于」页扫码赞助", icon: "none" });
      }
      const __returned__ = { AD_INTERSTITIAL, AD_REWARD, rewardedReady, tip, showInterstitial, showRewarded, goDonate, ref: vue.ref, BottomNav, Icon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "brand" }, [
        vue.createVNode($setup["Icon"], {
          name: "gift",
          size: 56,
          color: "#DA4F33"
        }),
        vue.createElementVNode("view", { class: "logo" }, "支持同学录"),
        vue.createElementVNode("view", { class: "sub" }, "你的赞助，让这份档案长久留存")
      ]),
      vue.createElementVNode("view", { class: "card glass" }, [
        vue.createElementVNode("view", { class: "card-head" }, [
          vue.createVNode($setup["Icon"], {
            name: "gift",
            size: 34,
            color: "#DA4F33"
          }),
          vue.createElementVNode("text", { class: "sec" }, "为什么需要赞助")
        ]),
        vue.createElementVNode("text", { class: "txt" }, "同学录的服务器、存储与带宽都需要成本。观看一段广告或小额赞助，都能帮它继续运转下去，免费服务每一位同学。")
      ]),
      vue.createElementVNode("view", { class: "card glass" }, [
        vue.createElementVNode("view", { class: "card-head" }, [
          vue.createVNode($setup["Icon"], {
            name: "play",
            size: 34,
            color: "#DA4F33"
          }),
          vue.createElementVNode("text", { class: "sec" }, "观看广告赞助（App 端）")
        ]),
        vue.createElementVNode("button", {
          class: "btn primary",
          onClick: $setup.showInterstitial
        }, "观看插屏广告"),
        vue.createElementVNode("button", {
          class: "btn",
          onClick: $setup.showRewarded
        }, "观看激励视频（约 30s）"),
        $setup.tip ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: "msg"
          },
          vue.toDisplayString($setup.tip),
          1
          /* TEXT */
        )) : vue.createCommentVNode("v-if", true)
      ]),
      vue.createElementVNode("view", { class: "card glass" }, [
        vue.createElementVNode("view", { class: "card-head" }, [
          vue.createVNode($setup["Icon"], {
            name: "server",
            size: 34,
            color: "#DA4F33"
          }),
          vue.createElementVNode("text", { class: "sec" }, "直接赞助")
        ]),
        vue.createElementVNode("button", {
          class: "btn",
          onClick: $setup.goDonate
        }, "扫码 / 跳转赞助页")
      ]),
      vue.createElementVNode("view", { class: "note" }, "广告由 DCloud uniAD 提供。H5 / 小程序端暂不支持广告组件，请使用 App 版本。"),
      vue.createVNode($setup["BottomNav"], { active: "links" })
    ]);
  }
  const PagesSponsorSponsor = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-6b79d586"], ["__file", "E:/WorkBuddy/2026-07-13-23-25-59/同学录系统_uni-app/pages/sponsor/sponsor.vue"]]);
  const _sfc_main$3 = {
    __name: "scan",
    setup(__props, { expose: __expose }) {
      __expose();
      const qid = vue.ref("");
      const status = vue.ref("idle");
      const msg = vue.ref("");
      onLoad((q) => {
        if (q && q.qid) {
          qid.value = q.qid;
          doConfirm();
        }
      });
      function doScan() {
        status.value = "scanning";
        msg.value = "";
        uni.scanCode({
          onlyFromCamera: true,
          scanType: ["qrCode"],
          success: (res) => {
            const raw = (res.result || "").trim();
            let parsed = raw;
            const m = raw.match(/(?:cbqr|qr)?[:]{0,1}([0-9a-fA-F]{16,})/);
            if (m)
              parsed = m[1];
            if (!parsed || parsed.length < 16) {
              status.value = "fail";
              msg.value = "无法识别二维码内容：" + raw;
              return;
            }
            qid.value = parsed;
            doConfirm();
          },
          fail: () => {
            status.value = "idle";
            msg.value = "已取消扫码";
          }
        });
      }
      async function doConfirm() {
        if (!qid.value)
          return;
        status.value = "confirming";
        msg.value = "正在确认登录…";
        try {
          const r = await post("/api/qr/confirm", { qid: qid.value });
          const d = r.data || {};
          if (d.ok) {
            status.value = "success";
            msg.value = d.msg || "已确认，电脑端已登录";
            localNotify("扫码登录成功", "电脑端已登录");
            uni.showToast({ title: "登录成功", icon: "success" });
            setTimeout(() => uni.navigateBack(), 1500);
          } else {
            status.value = "fail";
            msg.value = d.msg || "二维码已失效或不存在";
          }
        } catch (e) {
          status.value = "fail";
          msg.value = "网络错误，请重试";
        }
      }
      const __returned__ = { qid, status, msg, doScan, doConfirm, ref: vue.ref, get onLoad() {
        return onLoad;
      }, get post() {
        return post;
      }, get localNotify() {
        return localNotify;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "card glass" }, [
        vue.createElementVNode("text", { class: "title" }, "扫码登录电脑端"),
        vue.createElementVNode("text", { class: "note" }, "用电脑打开同学录网页端，点击「扫码登录」显示二维码，再用此处扫码即可在电脑端登录当前账号。"),
        $setup.status === "idle" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "scan-area",
          onClick: $setup.doScan
        }, [
          vue.createElementVNode("text", { class: "scan-icon" }, "⌖"),
          vue.createElementVNode("text", { class: "scan-text" }, "点击扫码")
        ])) : $setup.status === "scanning" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "scan-area"
        }, [
          vue.createElementVNode("text", { class: "scan-text" }, "正在调起相机…")
        ])) : $setup.status === "confirming" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 2,
          class: "scan-area"
        }, [
          vue.createElementVNode("text", { class: "scan-text" }, "正在确认…")
        ])) : $setup.status === "success" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 3,
          class: "scan-area ok"
        }, [
          vue.createElementVNode("text", { class: "scan-icon" }, "✓"),
          vue.createElementVNode(
            "text",
            { class: "scan-text" },
            vue.toDisplayString($setup.msg),
            1
            /* TEXT */
          )
        ])) : $setup.status === "fail" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 4,
          class: "scan-area fail"
        }, [
          vue.createElementVNode("text", { class: "scan-icon" }, "✕"),
          vue.createElementVNode(
            "text",
            { class: "scan-text" },
            vue.toDisplayString($setup.msg),
            1
            /* TEXT */
          ),
          vue.createElementVNode("button", {
            class: "btn retry",
            onClick: $setup.doScan
          }, "重新扫码")
        ])) : vue.createCommentVNode("v-if", true)
      ])
    ]);
  }
  const PagesScanScan = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-344f468c"], ["__file", "E:/WorkBuddy/2026-07-13-23-25-59/同学录系统_uni-app/pages/scan/scan.vue"]]);
  const _sfc_main$2 = {
    __name: "chat",
    setup(__props, { expose: __expose }) {
      __expose();
      const wide = vue.ref(false);
      const list = vue.ref([]);
      const loading = vue.ref(false);
      const err = vue.ref("");
      const pickerOpen = vue.ref(false);
      const pickerLoading = vue.ref(false);
      const pickerErr = vue.ref("");
      const classmates = vue.ref([]);
      const kw = vue.ref("");
      const filtered = vue.computed(() => {
        const k = (kw.value || "").trim().toLowerCase();
        const me = store.user && store.user.student_no || "";
        return classmates.value.filter((c) => c.student_no !== me).filter((c) => !k || (c.name || "").toLowerCase().includes(k) || String(c.student_no).includes(k));
      });
      onShow(async () => {
        wide.value = isWideScreen();
        await loadList();
        startPoll();
      });
      onHide(() => stopPoll());
      onUnload(() => stopPoll());
      let pollTimer = null;
      function startPoll() {
        stopPoll();
        pollTimer = setInterval(() => {
          loadList(true);
        }, 4e3);
      }
      function stopPoll() {
        if (pollTimer) {
          clearInterval(pollTimer);
          pollTimer = null;
        }
      }
      async function loadList(silent) {
        if (!silent)
          loading.value = true;
        err.value = "";
        try {
          const r = await get$1("/api/chat/list");
          if (r.data && r.data.ok) {
            list.value = r.data.list || [];
            const total = list.value.reduce((s2, it) => s2 + (it.unread || 0), 0);
            setUnreadChat(total);
          } else if (r.statusCode === 401) {
            uni.reLaunch({ url: "/pages/login/login" });
          } else if (!silent) {
            err.value = "加载失败";
          }
        } catch (e) {
          if (!silent)
            err.value = "连接服务器超时";
        }
        if (!silent)
          loading.value = false;
      }
      function goChat(it) {
        uni.navigateTo({ url: "/pages/chat/conversation?no=" + it.student_no + "&name=" + encodeURIComponent(it.name) });
      }
      function fmtTime(ts) {
        if (!ts)
          return "";
        const d = new Date(ts * 1e3);
        const now = /* @__PURE__ */ new Date();
        if (d.toDateString() === now.toDateString()) {
          return d.getHours().toString().padStart(2, "0") + ":" + d.getMinutes().toString().padStart(2, "0");
        }
        const diff = (now - d) / 864e5;
        if (diff < 7)
          return ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][d.getDay()];
        return d.getMonth() + 1 + "/" + d.getDate();
      }
      async function openPicker() {
        pickerOpen.value = true;
        kw.value = "";
        if (classmates.value.length)
          return;
        pickerLoading.value = true;
        pickerErr.value = "";
        try {
          const r = await get$1("/api/chat/contacts");
          if (r.data && r.data.ok)
            classmates.value = r.data.contacts || [];
          else
            pickerErr.value = "同学列表加载失败";
        } catch (e) {
          pickerErr.value = "网络错误";
        }
        pickerLoading.value = false;
      }
      function closePicker() {
        pickerOpen.value = false;
      }
      function pickClassmate(c) {
        pickerOpen.value = false;
        uni.navigateTo({ url: "/pages/chat/conversation?no=" + c.student_no + "&name=" + encodeURIComponent(c.name || c.student_no) });
      }
      const __returned__ = { wide, list, loading, err, pickerOpen, pickerLoading, pickerErr, classmates, kw, filtered, get pollTimer() {
        return pollTimer;
      }, set pollTimer(v) {
        pollTimer = v;
      }, startPoll, stopPoll, loadList, goChat, fmtTime, openPicker, closePicker, pickClassmate, ref: vue.ref, computed: vue.computed, get onShow() {
        return onShow;
      }, get onHide() {
        return onHide;
      }, get onUnload() {
        return onUnload;
      }, get get() {
        return get$1;
      }, get store() {
        return store;
      }, get setUnreadChat() {
        return setUnreadChat;
      }, BottomNav, SideBar, Icon, BgLayer, get isWideScreen() {
        return isWideScreen;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["page", { wide: $setup.wide }])
      },
      [
        vue.createVNode($setup["BgLayer"]),
        $setup.wide ? (vue.openBlock(), vue.createBlock($setup["SideBar"], {
          key: 0,
          active: "chat"
        })) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "main" }, [
          vue.createElementVNode("view", { class: "top" }, [
            vue.createElementVNode("text", { class: "title" }, "消息"),
            vue.createElementVNode("view", {
              class: "new-btn",
              "hover-class": "new-hover",
              onClick: $setup.openPicker
            }, [
              vue.createVNode($setup["Icon"], {
                name: "plus",
                size: 30,
                color: "#fff"
              })
            ])
          ]),
          $setup.loading ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "tip"
          }, "加载中…")) : $setup.err ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 1,
              class: "tip err",
              onClick: $setup.loadList
            },
            vue.toDisplayString($setup.err) + "（点击重试）",
            1
            /* TEXT */
          )) : !$setup.list.length ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "empty"
          }, [
            vue.createVNode($setup["Icon"], {
              name: "chat",
              size: 80,
              color: "#c9c7c1"
            }),
            vue.createElementVNode("text", { class: "empty-t" }, "还没有聊天记录"),
            vue.createElementVNode("text", { class: "empty-s" }, "点击右上角 + 选择同学，开始聊天"),
            vue.createElementVNode("view", {
              class: "start-btn glass",
              "hover-class": "start-hover",
              onClick: $setup.openPicker
            }, "发起新聊天")
          ])) : (vue.openBlock(), vue.createElementBlock("view", {
            key: 3,
            class: "list"
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.list, (it) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: it.student_no,
                  class: "item glass",
                  "hover-class": "item-hover",
                  onClick: ($event) => $setup.goChat(it)
                }, [
                  vue.createElementVNode(
                    "view",
                    { class: "ava" },
                    vue.toDisplayString((it.name || "?").slice(0, 1)),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "meta" }, [
                    vue.createElementVNode("view", { class: "row1" }, [
                      vue.createElementVNode(
                        "text",
                        { class: "nm" },
                        vue.toDisplayString(it.name),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "ts" },
                        vue.toDisplayString($setup.fmtTime(it.last_ts)),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode(
                      "text",
                      { class: "lm" },
                      vue.toDisplayString(it.last_msg),
                      1
                      /* TEXT */
                    )
                  ]),
                  it.unread > 0 ? (vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: 0,
                      class: "badge"
                    },
                    vue.toDisplayString(it.unread > 99 ? "99+" : it.unread),
                    1
                    /* TEXT */
                  )) : vue.createCommentVNode("v-if", true)
                ], 8, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]))
        ]),
        !$setup.wide ? (vue.openBlock(), vue.createBlock($setup["BottomNav"], {
          key: 1,
          active: "chat"
        })) : vue.createCommentVNode("v-if", true),
        $setup.pickerOpen ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 2,
          class: "picker-mask",
          onClick: $setup.closePicker
        }, [
          vue.createElementVNode("view", {
            class: "picker",
            onClick: _cache[1] || (_cache[1] = vue.withModifiers(() => {
            }, ["stop"]))
          }, [
            vue.createElementVNode("view", { class: "picker-hd" }, [
              vue.createElementVNode("text", { class: "picker-t" }, "选择同学"),
              vue.createElementVNode("view", {
                class: "picker-close",
                onClick: $setup.closePicker
              }, "✕")
            ]),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "picker-search",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.kw = $event),
                placeholder: "搜索姓名 / 学号"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $setup.kw]
            ]),
            $setup.pickerLoading ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "picker-tip"
            }, "加载中…")) : $setup.pickerErr ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 1,
                class: "picker-tip err"
              },
              vue.toDisplayString($setup.pickerErr),
              1
              /* TEXT */
            )) : (vue.openBlock(), vue.createElementBlock("scroll-view", {
              key: 2,
              class: "picker-list",
              "scroll-y": ""
            }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.filtered, (c) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: c.student_no,
                    class: "picker-item",
                    "hover-class": "picker-item-h",
                    onClick: ($event) => $setup.pickClassmate(c)
                  }, [
                    vue.createElementVNode(
                      "view",
                      { class: "p-ava" },
                      vue.toDisplayString((c.name || "?").slice(0, 1)),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { class: "p-meta" }, [
                      vue.createElementVNode(
                        "text",
                        { class: "p-name" },
                        vue.toDisplayString(c.name),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "p-no" },
                        "#" + vue.toDisplayString(c.student_no) + vue.toDisplayString(c.school ? " · " + c.school : ""),
                        1
                        /* TEXT */
                      )
                    ])
                  ], 8, ["onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              !$setup.filtered.length ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "picker-tip"
              }, "没有匹配的同学")) : vue.createCommentVNode("v-if", true)
            ]))
          ])
        ])) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const PagesChatChat = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-0a633310"], ["__file", "E:/WorkBuddy/2026-07-13-23-25-59/同学录系统_uni-app/pages/chat/chat.vue"]]);
  const _sfc_main$1 = {
    __name: "conversation",
    setup(__props, { expose: __expose }) {
      __expose();
      const peerNo = vue.ref("");
      const peerName = vue.ref("");
      const isGroup = vue.ref(false);
      const messages = vue.ref([]);
      const input = vue.ref("");
      const sending = vue.ref(false);
      const loading = vue.ref(false);
      const err = vue.ref("");
      const scrollInto = vue.ref("");
      const seenIds = vue.ref(/* @__PURE__ */ new Set());
      const count = vue.ref(0);
      const panelOpen = vue.ref("");
      let scrollTimer = null;
      let pollTimer = null;
      const EMOJI = ["😀", "😂", "🤣", "😊", "😍", "🥰", "😘", "😜", "😎", "🤩", "😭", "😢", "😤", "😡", "🥺", "😱", "🤔", "😴", "🤯", "🥳", "👍", "👎", "👏", "🙌", "🤝", "🙏", "💪", "👋", "🤙", "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "💔", "💕", "💯", "🔥", "✨", "🎉", "🎊", "🎁", "🎵", "🎶", "🏆", "🍕", "🍔", "🍣", "🍜", "🍦", "🎂", "☕", "🍺", "🥂", "🍷", "🌹", "🌈", "🐶", "🐱", "🐰", "🦊", "🐼", "🐨", "🦁", "🐸", "🦄", "🐙", "😈", "👻", "💀", "🤡", "👽", "🤖", "💩", "🙈", "🙉", "🙊"];
      onLoad((q) => {
        peerNo.value = q && q.no || "";
        peerName.value = q && q.name ? decodeURIComponent(q.name) : "";
        isGroup.value = String(peerNo.value).indexOf("group_") === 0;
        uni.setNavigationBarTitle({ title: peerName.value || (isGroup.value ? "群聊" : "消息") });
      });
      onShow(async () => {
        await loadHistory(true);
        startPoll();
      });
      onHide(() => stopPoll());
      onUnload(() => {
        stopPoll();
        if (scrollTimer)
          clearTimeout(scrollTimer);
      });
      async function loadHistory(initial) {
        if (!peerNo.value)
          return;
        if (initial) {
          loading.value = true;
          err.value = "";
        }
        try {
          let url = "/api/chat/msgs?to=" + encodeURIComponent(peerNo.value);
          if (!initial && count.value > 0)
            url += "&since=" + count.value;
          const r = await get$1(url);
          if (r.data && r.data.ok) {
            const arr = r.data.msgs || [];
            const myNo = store.user && store.user.student_no || "";
            if (initial) {
              messages.value = arr;
              arr.forEach((m) => seenIds.value.add(m.id));
            } else {
              let changed = false;
              arr.forEach((m) => {
                if (!seenIds.value.has(m.id)) {
                  seenIds.value.add(m.id);
                  messages.value.push(m);
                  changed = true;
                  if (m.from !== myNo)
                    localNotify(peerName.value || peerNo.value, contentPreview(m.content));
                }
              });
              if (changed)
                scrollToBottom();
            }
            if (r.data.peer_name && !peerName.value) {
              peerName.value = r.data.peer_name;
              uni.setNavigationBarTitle({ title: peerName.value });
            }
            count.value = r.data.total || count.value;
          } else if (r.statusCode === 401) {
            uni.reLaunch({ url: "/pages/login/login" });
          } else if (initial) {
            err.value = "加载失败";
          }
        } catch (e) {
          if (initial)
            err.value = "连接超时";
        }
        if (initial)
          loading.value = false;
      }
      function startPoll() {
        stopPoll();
        pollTimer = setInterval(() => {
          if (!peerNo.value)
            return;
          loadHistory(false);
        }, 2200);
      }
      function stopPoll() {
        if (pollTimer) {
          clearInterval(pollTimer);
          pollTimer = null;
        }
      }
      async function sendText() {
        const text = (input.value || "").trim();
        if (!text || sending.value)
          return;
        sending.value = true;
        input.value = "";
        closePanel();
        try {
          const r = await post("/api/chat/send", { to: peerNo.value, message: text });
          const d = r.data || {};
          if (d.ok && d.msg) {
            if (!seenIds.value.has(d.msg.id)) {
              seenIds.value.add(d.msg.id);
              messages.value.push(d.msg);
            }
            count.value = d.total || count.value;
            scrollToBottom();
          } else {
            uni.showToast({ title: d.msg || "发送失败", icon: "none" });
            input.value = text;
          }
        } catch (e) {
          uni.showToast({ title: "网络错误", icon: "none" });
          input.value = text;
        }
        sending.value = false;
      }
      async function sendContent(message) {
        if (sending.value)
          return;
        sending.value = true;
        try {
          const r = await post("/api/chat/send", { to: peerNo.value, message });
          const d = r.data || {};
          if (d.ok && d.msg) {
            if (!seenIds.value.has(d.msg.id)) {
              seenIds.value.add(d.msg.id);
              messages.value.push(d.msg);
            }
            count.value = d.total || count.value;
            scrollToBottom();
          } else {
            uni.showToast({ title: d.msg || "发送失败", icon: "none" });
          }
        } catch (e) {
          uni.showToast({ title: "网络错误", icon: "none" });
        }
        sending.value = false;
      }
      function pickMedia(type) {
        closePanel();
        plus.gallery.pick((path) => doUpload(path), (e) => {
        }, { filter: type === "image" ? "image" : type === "video" ? "video" : "none", multiple: false });
      }
      async function doUpload(path, type) {
        uni.showLoading({ title: "上传中…" });
        try {
          const r = await upload("/api/chat/upload", [{ name: "file", uri: path }], {});
          const d = r.data || {};
          if (d.ok) {
            const mc = { type: d.type, url: d.url, name: d.name };
            if (d.size)
              mc.size = d.size;
            await sendContent(mc);
          } else {
            uni.showToast({ title: d.msg || "上传失败", icon: "none" });
          }
        } catch (e) {
          uni.showToast({ title: "上传失败", icon: "none" });
        }
        uni.hideLoading();
      }
      const menuShow = vue.ref(false);
      const menuX = vue.ref(0);
      const menuY = vue.ref(0);
      const menuMsg = vue.ref(null);
      let touchTimer = null;
      function onMsgLongPress(m, e) {
        menuMsg.value = m;
        const x = e && e.touches && e.touches[0] ? e.touches[0].clientX : e && e.clientX || 100;
        const y = e && e.touches && e.touches[0] ? e.touches[0].clientY : e && e.clientY || 100;
        menuX.value = Math.min(x, (uni.getSystemInfoSync().windowWidth || 360) - 180);
        menuY.value = Math.min(y, (uni.getSystemInfoSync().windowHeight || 640) - 160);
        menuShow.value = true;
      }
      function onTouchStart(m, e) {
        touchTimer = setTimeout(() => onMsgLongPress(m, e), 600);
      }
      function onTouchEnd() {
        if (touchTimer) {
          clearTimeout(touchTimer);
          touchTimer = null;
        }
      }
      function closeMenu() {
        menuShow.value = false;
        menuMsg.value = null;
      }
      async function doWithdraw() {
        const m = menuMsg.value;
        closeMenu();
        if (!m)
          return;
        try {
          const r = await post("/api/chat/withdraw", { to: peerNo.value, msgid: m.id });
          if (r.data && r.data.ok) {
            messages.value = messages.value.filter((x) => x.id !== m.id);
            uni.showToast({ title: "已撤回", icon: "none" });
          } else
            uni.showToast({ title: "撤回失败", icon: "none" });
        } catch (e) {
          uni.showToast({ title: "网络异常", icon: "none" });
        }
      }
      async function doReport() {
        const m = menuMsg.value;
        closeMenu();
        if (!m)
          return;
        try {
          const r = await post("/api/chat/report", { target_uid: m.from, msgid: m.id });
          if (r.data && r.data.ok)
            uni.showToast({ title: "举报已提交", icon: "none" });
          else
            uni.showToast({ title: "举报失败", icon: "none" });
        } catch (e) {
          uni.showToast({ title: "网络异常", icon: "none" });
        }
      }
      function togglePanel(name) {
        panelOpen.value = panelOpen.value === name ? "" : name;
      }
      function closePanel() {
        panelOpen.value = "";
      }
      function sendEmoji(e) {
        closePanel();
        sendContent({ type: "emoji", emoji: e });
      }
      function scrollToBottom() {
        scrollInto.value = "";
        vue.nextTick(() => {
          if (scrollTimer)
            clearTimeout(scrollTimer);
          scrollTimer = setTimeout(() => {
            scrollInto.value = "msg-bottom";
          }, 50);
        });
      }
      function goBack() {
        uni.navigateBack({ fail: () => {
          uni.reLaunch({ url: "/pages/chat/chat" });
        } });
      }
      function fmtTime(ts) {
        if (!ts)
          return "";
        const d = new Date(ts * 1e3);
        const now = /* @__PURE__ */ new Date();
        if (d.toDateString() === now.toDateString()) {
          return d.getHours().toString().padStart(2, "0") + ":" + d.getMinutes().toString().padStart(2, "0");
        }
        return d.getMonth() + 1 + "/" + d.getDate() + " " + d.getHours().toString().padStart(2, "0") + ":" + d.getMinutes().toString().padStart(2, "0");
      }
      function isMe(m) {
        const myNo = store.user && store.user.student_no || "";
        return m.from === myNo;
      }
      function previewImg(url) {
        if (!url)
          return;
        uni.previewImage({ urls: [url], current: url });
      }
      function openFile(url) {
        if (!url)
          return;
        plus.runtime.openURL(url);
      }
      function contentPreview(c) {
        if (typeof c === "string")
          return c;
        if (c && c.type === "emoji")
          return c.emoji || "[表情]";
        if (c && c.type === "image")
          return "[图片]";
        if (c && c.type === "video")
          return "[视频]";
        if (c && c.type === "file")
          return "[文件] " + (c.name || "");
        return "[消息]";
      }
      function nickOf(m) {
        const myNo = store.user && store.user.student_no || "";
        if (m.from === myNo)
          return "我";
        return m.nick || (isGroup.value ? "群友" : peerName.value || "对方");
      }
      const __returned__ = { peerNo, peerName, isGroup, messages, input, sending, loading, err, scrollInto, seenIds, count, panelOpen, get scrollTimer() {
        return scrollTimer;
      }, set scrollTimer(v) {
        scrollTimer = v;
      }, get pollTimer() {
        return pollTimer;
      }, set pollTimer(v) {
        pollTimer = v;
      }, EMOJI, loadHistory, startPoll, stopPoll, sendText, sendContent, pickMedia, doUpload, menuShow, menuX, menuY, menuMsg, get touchTimer() {
        return touchTimer;
      }, set touchTimer(v) {
        touchTimer = v;
      }, onMsgLongPress, onTouchStart, onTouchEnd, closeMenu, doWithdraw, doReport, togglePanel, closePanel, sendEmoji, scrollToBottom, goBack, fmtTime, isMe, previewImg, openFile, contentPreview, nickOf, ref: vue.ref, nextTick: vue.nextTick, get onLoad() {
        return onLoad;
      }, get onShow() {
        return onShow;
      }, get onHide() {
        return onHide;
      }, get onUnload() {
        return onUnload;
      }, get get() {
        return get$1;
      }, get post() {
        return post;
      }, get upload() {
        return upload;
      }, get store() {
        return store;
      }, get setUnreadChat() {
        return setUnreadChat;
      }, get localNotify() {
        return localNotify;
      }, BgLayer, Icon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createVNode($setup["BgLayer"]),
      vue.createElementVNode("view", { class: "hd" }, [
        vue.createElementVNode("view", {
          class: "back",
          "hover-class": "back-h",
          onClick: $setup.goBack
        }, [
          vue.createVNode($setup["Icon"], {
            name: "back",
            size: 40,
            color: "#14141A"
          })
        ]),
        vue.createElementVNode(
          "text",
          { class: "hd-name" },
          vue.toDisplayString($setup.peerName || ($setup.isGroup ? "群聊" : $setup.peerNo)),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", { class: "hd-spacer" })
      ]),
      $setup.loading && !$setup.messages.length ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "tip"
      }, "加载中…")) : $setup.err && !$setup.messages.length ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 1,
          class: "tip err",
          onClick: _cache[0] || (_cache[0] = ($event) => $setup.loadHistory(true))
        },
        vue.toDisplayString($setup.err) + "（点击重试）",
        1
        /* TEXT */
      )) : (vue.openBlock(), vue.createElementBlock("scroll-view", {
        key: 2,
        class: "msg-list",
        "scroll-y": "",
        "scroll-into-view": $setup.scrollInto,
        "scroll-with-animation": true,
        onClick: $setup.closePanel
      }, [
        vue.createElementVNode("view", { class: "msg-list-inner" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.messages, (m) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: m.id,
                class: vue.normalizeClass(["msg", $setup.isMe(m) ? "me" : "other"]),
                onLongpress: ($event) => $setup.onMsgLongPress(m, $event),
                onTouchstart: ($event) => $setup.onTouchStart(m, $event),
                onTouchend: $setup.onTouchEnd
              }, [
                !$setup.isMe(m) && $setup.isGroup ? (vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: 0,
                    class: "nick"
                  },
                  vue.toDisplayString($setup.nickOf(m)),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["bubble", $setup.isMe(m) ? "bubble-me" : "bubble-other"])
                  },
                  [
                    typeof m.content === "string" ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      {
                        key: 0,
                        class: "text"
                      },
                      vue.toDisplayString(m.content),
                      1
                      /* TEXT */
                    )) : m.content && m.content.type === "emoji" ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      {
                        key: 1,
                        class: "emoji"
                      },
                      vue.toDisplayString(m.content.emoji),
                      1
                      /* TEXT */
                    )) : m.content && m.content.type === "image" ? (vue.openBlock(), vue.createElementBlock("image", {
                      key: 2,
                      class: "img",
                      src: m.content.url,
                      mode: "widthFix",
                      onClick: ($event) => $setup.previewImg(m.content.url)
                    }, null, 8, ["src", "onClick"])) : m.content && m.content.type === "video" ? (vue.openBlock(), vue.createElementBlock("video", {
                      key: 3,
                      class: "video",
                      src: m.content.url,
                      controls: "",
                      playsinline: ""
                    }, null, 8, ["src"])) : m.content && m.content.type === "file" ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 4,
                      class: "file",
                      onClick: ($event) => $setup.openFile(m.content.url)
                    }, [
                      vue.createElementVNode("text", { class: "file-ico" }, "📎"),
                      vue.createElementVNode("view", { class: "file-meta" }, [
                        vue.createElementVNode(
                          "text",
                          { class: "file-name" },
                          vue.toDisplayString(m.content.name || "文件"),
                          1
                          /* TEXT */
                        ),
                        m.content.size ? (vue.openBlock(), vue.createElementBlock(
                          "text",
                          {
                            key: 0,
                            class: "file-size"
                          },
                          vue.toDisplayString(Math.round(m.content.size / 1024)) + "KB",
                          1
                          /* TEXT */
                        )) : vue.createCommentVNode("v-if", true)
                      ])
                    ], 8, ["onClick"])) : (vue.openBlock(), vue.createElementBlock("text", {
                      key: 5,
                      class: "text"
                    }, "[消息]"))
                  ],
                  2
                  /* CLASS */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "ts" },
                  vue.toDisplayString($setup.fmtTime(m.time)),
                  1
                  /* TEXT */
                )
              ], 42, ["onLongpress", "onTouchstart"]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          vue.createElementVNode("view", {
            id: "msg-bottom",
            class: "anchor"
          })
        ])
      ], 8, ["scroll-into-view"])),
      vue.createElementVNode("view", {
        class: "toolbar glass",
        onClick: $setup.closePanel
      }, [
        vue.createElementVNode("view", {
          class: "tb",
          "hover-class": "tb-h",
          onClick: _cache[1] || (_cache[1] = vue.withModifiers(($event) => $setup.togglePanel("emoji"), ["stop"]))
        }, [
          vue.createVNode($setup["Icon"], {
            name: "smile",
            size: 40,
            color: "#5b5750"
          })
        ]),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            class: "input",
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.input = $event),
            placeholder: "输入消息…",
            "confirm-type": "send",
            onConfirm: $setup.sendText,
            onFocus: $setup.closePanel
          },
          null,
          544
          /* NEED_HYDRATION, NEED_PATCH */
        ), [
          [vue.vModelText, $setup.input]
        ]),
        vue.createElementVNode("view", {
          class: "tb",
          "hover-class": "tb-h",
          onClick: _cache[3] || (_cache[3] = vue.withModifiers(($event) => $setup.togglePanel("media"), ["stop"]))
        }, [
          vue.createVNode($setup["Icon"], {
            name: "plus",
            size: 40,
            color: "#5b5750"
          })
        ]),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["send-btn", { disabled: $setup.sending || !$setup.input.trim() }]),
            onClick: vue.withModifiers($setup.sendText, ["stop"])
          },
          [
            vue.createElementVNode(
              "text",
              { class: "send-text" },
              vue.toDisplayString($setup.sending ? "…" : "发送"),
              1
              /* TEXT */
            )
          ],
          2
          /* CLASS */
        )
      ]),
      $setup.panelOpen === "emoji" ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 3,
        class: "ext-panel"
      }, [
        vue.createElementVNode("scroll-view", {
          class: "emoji-grid",
          "scroll-y": ""
        }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.EMOJI, (e) => {
              return vue.createElementVNode("view", {
                key: e,
                class: "emj",
                onClick: ($event) => $setup.sendEmoji(e)
              }, vue.toDisplayString(e), 9, ["onClick"]);
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ])
      ])) : vue.createCommentVNode("v-if", true),
      $setup.panelOpen === "media" ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 4,
        class: "ext-panel"
      }, [
        vue.createElementVNode("view", { class: "media-grid" }, [
          vue.createElementVNode("view", {
            class: "mp-btn",
            onClick: _cache[4] || (_cache[4] = ($event) => $setup.pickMedia("image"))
          }, [
            vue.createElementVNode("view", { class: "ico" }, "🖼️"),
            vue.createElementVNode("text", { class: "lbl" }, "图片")
          ]),
          vue.createElementVNode("view", {
            class: "mp-btn",
            onClick: _cache[5] || (_cache[5] = ($event) => $setup.pickMedia("video"))
          }, [
            vue.createElementVNode("view", { class: "ico" }, "🎬"),
            vue.createElementVNode("text", { class: "lbl" }, "视频")
          ]),
          vue.createElementVNode("view", {
            class: "mp-btn",
            onClick: _cache[6] || (_cache[6] = ($event) => $setup.pickMedia("file"))
          }, [
            vue.createElementVNode("view", { class: "ico" }, "📁"),
            vue.createElementVNode("text", { class: "lbl" }, "文件")
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true),
      $setup.menuShow ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 5,
          class: "ctx-mask",
          onClick: $setup.closeMenu,
          onTouchstart: $setup.closeMenu
        },
        [
          vue.createElementVNode(
            "view",
            {
              class: "ctx-menu",
              style: vue.normalizeStyle({ left: $setup.menuX + "px", top: $setup.menuY + "px" }),
              onClick: _cache[7] || (_cache[7] = vue.withModifiers(() => {
              }, ["stop"])),
              onTouchstart: _cache[8] || (_cache[8] = vue.withModifiers(() => {
              }, ["stop"]))
            },
            [
              $setup.menuMsg && $setup.isMe($setup.menuMsg) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "ctx-item",
                onClick: $setup.doWithdraw
              }, "↩️ 撤回")) : vue.createCommentVNode("v-if", true),
              $setup.menuMsg && $setup.isMe($setup.menuMsg) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "ctx-sep"
              })) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", {
                class: "ctx-item danger",
                onClick: $setup.doReport
              }, "⚠️ 举报")
            ],
            36
            /* STYLE, NEED_HYDRATION */
          )
        ],
        32
        /* NEED_HYDRATION */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesChatConversation = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-ad2b89bd"], ["__file", "E:/WorkBuddy/2026-07-13-23-25-59/同学录系统_uni-app/pages/chat/conversation.vue"]]);
  __definePage("pages/welcome/welcome", PagesWelcomeWelcome);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/home/home", PagesHomeHome);
  __definePage("pages/classmate/detail", PagesClassmateDetail);
  __definePage("pages/music/music", PagesMusicMusic);
  __definePage("pages/contribute/contribute", PagesContributeContribute);
  __definePage("pages/me/me", PagesMeMe);
  __definePage("pages/links/links", PagesLinksLinks);
  __definePage("pages/about/about", PagesAboutAbout);
  __definePage("pages/admin/admin", PagesAdminAdmin);
  __definePage("pages/sponsor/sponsor", PagesSponsorSponsor);
  __definePage("pages/scan/scan", PagesScanScan);
  __definePage("pages/chat/chat", PagesChatChat);
  __definePage("pages/chat/conversation", PagesChatConversation);
  var lookup = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    62,
    0,
    62,
    0,
    63,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    0,
    0,
    0,
    0,
    63,
    0,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51
  ];
  function base64Decode(source, target) {
    var sourceLength = source.length;
    var paddingLength = source[sourceLength - 2] === "=" ? 2 : source[sourceLength - 1] === "=" ? 1 : 0;
    var tmp;
    var byteIndex = 0;
    var baseLength = sourceLength - paddingLength & 4294967292;
    for (var i = 0; i < baseLength; i += 4) {
      tmp = lookup[source.charCodeAt(i)] << 18 | lookup[source.charCodeAt(i + 1)] << 12 | lookup[source.charCodeAt(i + 2)] << 6 | lookup[source.charCodeAt(i + 3)];
      target[byteIndex++] = tmp >> 16 & 255;
      target[byteIndex++] = tmp >> 8 & 255;
      target[byteIndex++] = tmp & 255;
    }
    if (paddingLength === 1) {
      tmp = lookup[source.charCodeAt(i)] << 10 | lookup[source.charCodeAt(i + 1)] << 4 | lookup[source.charCodeAt(i + 2)] >> 2;
      target[byteIndex++] = tmp >> 8 & 255;
      target[byteIndex++] = tmp & 255;
    }
    if (paddingLength === 2) {
      tmp = lookup[source.charCodeAt(i)] << 2 | lookup[source.charCodeAt(i + 1)] >> 4;
      target[byteIndex++] = tmp & 255;
    }
  }
  const $inject_window_crypto = {
    getRandomValues(arr) {
      if (!(arr instanceof Int8Array || arr instanceof Uint8Array || arr instanceof Int16Array || arr instanceof Uint16Array || arr instanceof Int32Array || arr instanceof Uint32Array || arr instanceof Uint8ClampedArray)) {
        throw new Error("Expected an integer array");
      }
      if (arr.byteLength > 65536) {
        throw new Error("Can only request a maximum of 65536 bytes");
      }
      var crypto = requireNativePlugin("DCloud-Crypto");
      base64Decode(crypto.getRandomValues(arr.byteLength), new Uint8Array(
        arr.buffer,
        arr.byteOffset,
        arr.byteLength
      ));
      return arr;
    }
  };
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var gtpushMin = { exports: {} };
  /*! For license information please see gtpush-min.js.LICENSE.txt */
  (function(module, exports) {
    (function t(e, r) {
      module.exports = r();
    })(self, () => (() => {
      var t = { 19: function(t2, e2, r2) {
        (function(i2, n2, s2) {
          t2.exports = n2(r2(9021), r2(3009), r2(1025));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i2 = r3.Base;
            var n2 = r3.WordArray;
            var s2 = e3.algo;
            var a = s2.SHA256;
            var o = s2.HMAC;
            var u = s2.PBKDF2 = i2.extend({ cfg: i2.extend({ keySize: 128 / 32, hasher: a, iterations: 25e4 }), init: function(t4) {
              this.cfg = this.cfg.extend(t4);
            }, compute: function(t4, e4) {
              var r4 = this.cfg;
              var i3 = o.create(r4.hasher, t4);
              var s22 = n2.create();
              var a2 = n2.create([1]);
              var u2 = s22.words;
              var c = a2.words;
              var l = r4.keySize;
              var f = r4.iterations;
              while (u2.length < l) {
                var h = i3.update(e4).finalize(a2);
                i3.reset();
                var d = h.words;
                var v = d.length;
                var p = h;
                for (var g = 1; g < f; g++) {
                  p = i3.finalize(p);
                  i3.reset();
                  var y = p.words;
                  for (var m = 0; m < v; m++)
                    d[m] ^= y[m];
                }
                s22.concat(h);
                c[0]++;
              }
              s22.sigBytes = l * 4;
              return s22;
            } });
            e3.PBKDF2 = function(t4, e4, r4) {
              return u.create(r4).compute(t4, e4);
            };
          })();
          return t3.PBKDF2;
        });
      }, 25: function(t2, e2, r2) {
        (function(i2, n2, s2) {
          t2.exports = n2(r2(9021), r2(7165));
        })(this, function(t3) {
          (function(e3) {
            var r3 = t3;
            var i2 = r3.lib;
            var n2 = i2.CipherParams;
            var s2 = r3.enc;
            var a = s2.Hex;
            var o = r3.format;
            o.Hex = { stringify: function(t4) {
              return t4.ciphertext.toString(a);
            }, parse: function(t4) {
              var e4 = a.parse(t4);
              return n2.create({ ciphertext: e4 });
            } };
          })();
          return t3.format.Hex;
        });
      }, 213: (t2, e2) => {
        Object.defineProperty(e2, "__esModule", { value: true });
        var r2;
        (function(t3) {
          t3.SDK_VERSION = `GTMP-${"2.0.6"}`;
          t3.DEFAULT_SOCKET_URL = "wss://wshzn.gepush.com:5223/nws";
          t3.SOCKET_PROTOCOL_VERSION = "1.0";
          t3.SERVER_PUBLIC_KEY = "MHwwDQYJKoZIhvcNAQEBBQADawAwaAJhAJp1rROuvBF7sBSnvLaesj2iFhMcY8aXyLvpnNLKs2wjL3JmEnyr++SlVa35liUlzi83tnAFkn3A9GB7pHBNzawyUkBh8WUhq5bnFIkk2RaDa6+5MpG84DEv52p7RR+aWwIDAQAB";
          t3.SERVER_PUBLIC_KEY_ID = "69d747c4b9f641baf4004be4297e9f3b";
        })(r2 || (r2 = {}));
        e2["default"] = r2;
      }, 384: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        const n2 = i2(r2(7374));
        class s2 extends n2.default {
          constructor() {
            super(...arguments);
            this.setModeResultData = new a();
          }
          static parse(t3) {
            let e3 = new s2();
            super.parseActionMsg(e3, t3);
            e3.setModeResultData = a.parse(e3.actionMsgData.msgData);
            return e3;
          }
          receive() {
            var t3;
            this.setModeResultData;
            let e3 = n2.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
            if (e3)
              (t3 = e3.callback) === null || t3 === void 0 || t3.call(e3.callback, { resultCode: this.setModeResultData.errorCode, message: this.setModeResultData.errorMsg });
          }
        }
        class a {
          constructor() {
            this.errorCode = -1;
            this.errorMsg = "";
          }
          static parse(t3) {
            let e3 = new a();
            let r3 = JSON.parse(t3);
            e3.errorCode = r3.errorCode;
            e3.errorMsg = r3.errorMsg;
            return e3;
          }
        }
        e2["default"] = s2;
      }, 477: () => {
      }, 482: function(t2, e2, r2) {
        (function(i2, n2, s2) {
          t2.exports = n2(r2(9021), r2(7165));
        })(this, function(t3) {
          t3.pad.Iso97971 = { pad: function(e3, r3) {
            e3.concat(t3.lib.WordArray.create([2147483648], 1));
            t3.pad.ZeroPadding.pad(e3, r3);
          }, unpad: function(e3) {
            t3.pad.ZeroPadding.unpad(e3);
            e3.sigBytes--;
          } };
          return t3.pad.Iso97971;
        });
      }, 669: (t2, e2) => {
        Object.defineProperty(e2, "__esModule", { value: true });
        class r2 {
          static info(...t3) {
            if (this.debugMode)
              console.info(`[GtPush]`, t3);
          }
          static warn(...t3) {
            console.warn(`[GtPush]`, t3);
          }
          static error(...t3) {
            console.error(`[GtPush]`, t3);
          }
        }
        r2.debugMode = false;
        e2["default"] = r2;
      }, 754: function(t2, e2, r2) {
        (function(i2, n2) {
          t2.exports = n2(r2(9021));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i2 = r3.WordArray;
            var n2 = e3.enc;
            n2.Base64 = { stringify: function(t4) {
              var e4 = t4.words;
              var r4 = t4.sigBytes;
              var i3 = this._map;
              t4.clamp();
              var n22 = [];
              for (var s2 = 0; s2 < r4; s2 += 3) {
                var a2 = e4[s2 >>> 2] >>> 24 - s2 % 4 * 8 & 255;
                var o = e4[s2 + 1 >>> 2] >>> 24 - (s2 + 1) % 4 * 8 & 255;
                var u = e4[s2 + 2 >>> 2] >>> 24 - (s2 + 2) % 4 * 8 & 255;
                var c = a2 << 16 | o << 8 | u;
                for (var l = 0; l < 4 && s2 + l * 0.75 < r4; l++)
                  n22.push(i3.charAt(c >>> 6 * (3 - l) & 63));
              }
              var f = i3.charAt(64);
              if (f)
                while (n22.length % 4)
                  n22.push(f);
              return n22.join("");
            }, parse: function(t4) {
              var e4 = t4.length;
              var r4 = this._map;
              var i3 = this._reverseMap;
              if (!i3) {
                i3 = this._reverseMap = [];
                for (var n22 = 0; n22 < r4.length; n22++)
                  i3[r4.charCodeAt(n22)] = n22;
              }
              var s2 = r4.charAt(64);
              if (s2) {
                var o = t4.indexOf(s2);
                if (o !== -1)
                  e4 = o;
              }
              return a(t4, e4, i3);
            }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
            function a(t4, e4, r4) {
              var n22 = [];
              var s2 = 0;
              for (var a2 = 0; a2 < e4; a2++)
                if (a2 % 4) {
                  var o = r4[t4.charCodeAt(a2 - 1)] << a2 % 4 * 2;
                  var u = r4[t4.charCodeAt(a2)] >>> 6 - a2 % 4 * 2;
                  var c = o | u;
                  n22[s2 >>> 2] |= c << 24 - s2 % 4 * 8;
                  s2++;
                }
              return i2.create(n22, s2);
            }
          })();
          return t3.enc.Base64;
        });
      }, 955: function(t2, e2, r2) {
        (function(i2, n2, s2) {
          t2.exports = n2(r2(9021), r2(754), r2(4636), r2(9506), r2(7165));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i2 = r3.BlockCipher;
            var n2 = e3.algo;
            var s2 = [];
            var a = [];
            var o = [];
            var u = [];
            var c = [];
            var l = [];
            var f = [];
            var h = [];
            var d = [];
            var v = [];
            (function() {
              var t4 = [];
              for (var e4 = 0; e4 < 256; e4++)
                if (e4 < 128)
                  t4[e4] = e4 << 1;
                else
                  t4[e4] = e4 << 1 ^ 283;
              var r4 = 0;
              var i3 = 0;
              for (var e4 = 0; e4 < 256; e4++) {
                var n22 = i3 ^ i3 << 1 ^ i3 << 2 ^ i3 << 3 ^ i3 << 4;
                n22 = n22 >>> 8 ^ n22 & 255 ^ 99;
                s2[r4] = n22;
                a[n22] = r4;
                var p2 = t4[r4];
                var g2 = t4[p2];
                var y = t4[g2];
                var m = t4[n22] * 257 ^ n22 * 16843008;
                o[r4] = m << 24 | m >>> 8;
                u[r4] = m << 16 | m >>> 16;
                c[r4] = m << 8 | m >>> 24;
                l[r4] = m;
                var m = y * 16843009 ^ g2 * 65537 ^ p2 * 257 ^ r4 * 16843008;
                f[n22] = m << 24 | m >>> 8;
                h[n22] = m << 16 | m >>> 16;
                d[n22] = m << 8 | m >>> 24;
                v[n22] = m;
                if (!r4)
                  r4 = i3 = 1;
                else {
                  r4 = p2 ^ t4[t4[t4[y ^ p2]]];
                  i3 ^= t4[t4[i3]];
                }
              }
            })();
            var p = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
            var g = n2.AES = i2.extend({ _doReset: function() {
              var t4;
              if (this._nRounds && this._keyPriorReset === this._key)
                return;
              var e4 = this._keyPriorReset = this._key;
              var r4 = e4.words;
              var i3 = e4.sigBytes / 4;
              var n22 = this._nRounds = i3 + 6;
              var a2 = (n22 + 1) * 4;
              var o2 = this._keySchedule = [];
              for (var u2 = 0; u2 < a2; u2++)
                if (u2 < i3)
                  o2[u2] = r4[u2];
                else {
                  t4 = o2[u2 - 1];
                  if (!(u2 % i3)) {
                    t4 = t4 << 8 | t4 >>> 24;
                    t4 = s2[t4 >>> 24] << 24 | s2[t4 >>> 16 & 255] << 16 | s2[t4 >>> 8 & 255] << 8 | s2[t4 & 255];
                    t4 ^= p[u2 / i3 | 0] << 24;
                  } else if (i3 > 6 && u2 % i3 == 4)
                    t4 = s2[t4 >>> 24] << 24 | s2[t4 >>> 16 & 255] << 16 | s2[t4 >>> 8 & 255] << 8 | s2[t4 & 255];
                  o2[u2] = o2[u2 - i3] ^ t4;
                }
              var c2 = this._invKeySchedule = [];
              for (var l2 = 0; l2 < a2; l2++) {
                var u2 = a2 - l2;
                if (l2 % 4)
                  var t4 = o2[u2];
                else
                  var t4 = o2[u2 - 4];
                if (l2 < 4 || u2 <= 4)
                  c2[l2] = t4;
                else
                  c2[l2] = f[s2[t4 >>> 24]] ^ h[s2[t4 >>> 16 & 255]] ^ d[s2[t4 >>> 8 & 255]] ^ v[s2[t4 & 255]];
              }
            }, encryptBlock: function(t4, e4) {
              this._doCryptBlock(t4, e4, this._keySchedule, o, u, c, l, s2);
            }, decryptBlock: function(t4, e4) {
              var r4 = t4[e4 + 1];
              t4[e4 + 1] = t4[e4 + 3];
              t4[e4 + 3] = r4;
              this._doCryptBlock(t4, e4, this._invKeySchedule, f, h, d, v, a);
              var r4 = t4[e4 + 1];
              t4[e4 + 1] = t4[e4 + 3];
              t4[e4 + 3] = r4;
            }, _doCryptBlock: function(t4, e4, r4, i3, n22, s22, a2, o2) {
              var u2 = this._nRounds;
              var c2 = t4[e4] ^ r4[0];
              var l2 = t4[e4 + 1] ^ r4[1];
              var f2 = t4[e4 + 2] ^ r4[2];
              var h2 = t4[e4 + 3] ^ r4[3];
              var d2 = 4;
              for (var v2 = 1; v2 < u2; v2++) {
                var p2 = i3[c2 >>> 24] ^ n22[l2 >>> 16 & 255] ^ s22[f2 >>> 8 & 255] ^ a2[h2 & 255] ^ r4[d2++];
                var g2 = i3[l2 >>> 24] ^ n22[f2 >>> 16 & 255] ^ s22[h2 >>> 8 & 255] ^ a2[c2 & 255] ^ r4[d2++];
                var y = i3[f2 >>> 24] ^ n22[h2 >>> 16 & 255] ^ s22[c2 >>> 8 & 255] ^ a2[l2 & 255] ^ r4[d2++];
                var m = i3[h2 >>> 24] ^ n22[c2 >>> 16 & 255] ^ s22[l2 >>> 8 & 255] ^ a2[f2 & 255] ^ r4[d2++];
                c2 = p2;
                l2 = g2;
                f2 = y;
                h2 = m;
              }
              var p2 = (o2[c2 >>> 24] << 24 | o2[l2 >>> 16 & 255] << 16 | o2[f2 >>> 8 & 255] << 8 | o2[h2 & 255]) ^ r4[d2++];
              var g2 = (o2[l2 >>> 24] << 24 | o2[f2 >>> 16 & 255] << 16 | o2[h2 >>> 8 & 255] << 8 | o2[c2 & 255]) ^ r4[d2++];
              var y = (o2[f2 >>> 24] << 24 | o2[h2 >>> 16 & 255] << 16 | o2[c2 >>> 8 & 255] << 8 | o2[l2 & 255]) ^ r4[d2++];
              var m = (o2[h2 >>> 24] << 24 | o2[c2 >>> 16 & 255] << 16 | o2[l2 >>> 8 & 255] << 8 | o2[f2 & 255]) ^ r4[d2++];
              t4[e4] = p2;
              t4[e4 + 1] = g2;
              t4[e4 + 2] = y;
              t4[e4 + 3] = m;
            }, keySize: 256 / 32 });
            e3.AES = i2._createHelper(g);
          })();
          return t3.AES;
        });
      }, 1025: function(t2, e2, r2) {
        (function(i2, n2) {
          t2.exports = n2(r2(9021));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i2 = r3.Base;
            var n2 = e3.enc;
            var s2 = n2.Utf8;
            var a = e3.algo;
            a.HMAC = i2.extend({ init: function(t4, e4) {
              t4 = this._hasher = new t4.init();
              if (typeof e4 == "string")
                e4 = s2.parse(e4);
              var r4 = t4.blockSize;
              var i3 = r4 * 4;
              if (e4.sigBytes > i3)
                e4 = t4.finalize(e4);
              e4.clamp();
              var n22 = this._oKey = e4.clone();
              var a2 = this._iKey = e4.clone();
              var o = n22.words;
              var u = a2.words;
              for (var c = 0; c < r4; c++) {
                o[c] ^= 1549556828;
                u[c] ^= 909522486;
              }
              n22.sigBytes = a2.sigBytes = i3;
              this.reset();
            }, reset: function() {
              var t4 = this._hasher;
              t4.reset();
              t4.update(this._iKey);
            }, update: function(t4) {
              this._hasher.update(t4);
              return this;
            }, finalize: function(t4) {
              var e4 = this._hasher;
              var r4 = e4.finalize(t4);
              e4.reset();
              var i3 = e4.finalize(this._oKey.clone().concat(r4));
              return i3;
            } });
          })();
        });
      }, 1161: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        const n2 = i2(r2(7574));
        class s2 extends n2.default {
          static create() {
            let t3 = new s2();
            super.initMsg(t3);
            t3.command = n2.default.Command.HEART_BEAT;
            return t3;
          }
        }
        e2["default"] = s2;
      }, 1235: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        var n2, s2;
        Object.defineProperty(e2, "__esModule", { value: true });
        const a = i2(r2(9420));
        const o = r2(1458);
        const u = i2(r2(7374));
        class c extends u.default {
          constructor() {
            super(...arguments);
            this.feedbackData = new l();
          }
          static create(t3, e3) {
            let r3 = new c();
            super.initActionMsg(r3);
            r3.callback = (t4) => {
              if (t4.resultCode != o.ErrorCode.SUCCESS && t4.resultCode != o.ErrorCode.REPEAT_MESSAGE)
                setTimeout(function() {
                  r3.send();
                }, 30 * 1e3);
            };
            r3.feedbackData = l.create(t3, e3);
            r3.actionMsgData.msgAction = u.default.ClientAction.FEED_BACK;
            r3.actionMsgData.msgData = JSON.stringify(r3.feedbackData);
            return r3;
          }
          send() {
            super.send();
          }
        }
        c.ActionId = (n2 = class {
        }, n2.RECEIVE = "0", n2.MP_RECEIVE = "210000", n2.WEB_RECEIVE = "220000", n2.BEGIN = "1", n2);
        c.RESULT = (s2 = class {
        }, s2.OK = "ok", s2);
        class l {
          constructor() {
            this.messageid = "";
            this.appkey = "";
            this.appid = "";
            this.taskid = "";
            this.actionid = "";
            this.result = "";
            this.timestamp = "";
          }
          static create(t3, e3) {
            let r3 = new l();
            r3.messageid = t3.pushMessageData.messageid;
            r3.appkey = t3.pushMessageData.appKey;
            r3.appid = a.default.appid;
            r3.taskid = t3.pushMessageData.taskId;
            r3.actionid = e3;
            r3.result = c.RESULT.OK;
            r3.timestamp = (/* @__PURE__ */ new Date()).getTime().toString();
            return r3;
          }
        }
        e2["default"] = c;
      }, 1302: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        const n2 = i2(r2(8036));
        const s2 = i2(r2(669));
        const a = i2(r2(7374));
        class o extends a.default {
          constructor() {
            super(...arguments);
            this.bindAliasResultData = new u();
          }
          static parse(t3) {
            let e3 = new o();
            super.parseActionMsg(e3, t3);
            e3.bindAliasResultData = u.parse(e3.actionMsgData.msgData);
            return e3;
          }
          receive() {
            var t3;
            s2.default.info(`bind alias result`, this.bindAliasResultData);
            let e3 = a.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
            if (e3)
              (t3 = e3.callback) === null || t3 === void 0 || t3.call(e3.callback, { resultCode: this.bindAliasResultData.errorCode, message: this.bindAliasResultData.errorMsg });
            n2.default.set({ key: n2.default.KEY_BIND_ALIAS_TIME, data: (/* @__PURE__ */ new Date()).getTime() });
          }
        }
        class u {
          constructor() {
            this.errorCode = -1;
            this.errorMsg = "";
          }
          static parse(t3) {
            let e3 = new u();
            let r3 = JSON.parse(t3);
            e3.errorCode = r3.errorCode;
            e3.errorMsg = r3.errorMsg;
            return e3;
          }
        }
        e2["default"] = o;
      }, 1380: function(t2, e2, r2) {
        (function(i2, n2, s2) {
          t2.exports = n2(r2(9021), r2(3240));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i2 = r3.Hasher;
            var n2 = e3.x64;
            var s2 = n2.Word;
            var a = n2.WordArray;
            var o = e3.algo;
            function u() {
              return s2.create.apply(s2, arguments);
            }
            var c = [u(1116352408, 3609767458), u(1899447441, 602891725), u(3049323471, 3964484399), u(3921009573, 2173295548), u(961987163, 4081628472), u(1508970993, 3053834265), u(2453635748, 2937671579), u(2870763221, 3664609560), u(3624381080, 2734883394), u(310598401, 1164996542), u(607225278, 1323610764), u(1426881987, 3590304994), u(1925078388, 4068182383), u(2162078206, 991336113), u(2614888103, 633803317), u(3248222580, 3479774868), u(3835390401, 2666613458), u(4022224774, 944711139), u(264347078, 2341262773), u(604807628, 2007800933), u(770255983, 1495990901), u(1249150122, 1856431235), u(1555081692, 3175218132), u(1996064986, 2198950837), u(2554220882, 3999719339), u(2821834349, 766784016), u(2952996808, 2566594879), u(3210313671, 3203337956), u(3336571891, 1034457026), u(3584528711, 2466948901), u(113926993, 3758326383), u(338241895, 168717936), u(666307205, 1188179964), u(773529912, 1546045734), u(1294757372, 1522805485), u(1396182291, 2643833823), u(1695183700, 2343527390), u(1986661051, 1014477480), u(2177026350, 1206759142), u(2456956037, 344077627), u(2730485921, 1290863460), u(2820302411, 3158454273), u(3259730800, 3505952657), u(3345764771, 106217008), u(3516065817, 3606008344), u(3600352804, 1432725776), u(4094571909, 1467031594), u(275423344, 851169720), u(430227734, 3100823752), u(506948616, 1363258195), u(659060556, 3750685593), u(883997877, 3785050280), u(958139571, 3318307427), u(1322822218, 3812723403), u(1537002063, 2003034995), u(1747873779, 3602036899), u(1955562222, 1575990012), u(2024104815, 1125592928), u(2227730452, 2716904306), u(2361852424, 442776044), u(2428436474, 593698344), u(2756734187, 3733110249), u(3204031479, 2999351573), u(3329325298, 3815920427), u(3391569614, 3928383900), u(3515267271, 566280711), u(3940187606, 3454069534), u(4118630271, 4000239992), u(116418474, 1914138554), u(174292421, 2731055270), u(289380356, 3203993006), u(460393269, 320620315), u(685471733, 587496836), u(852142971, 1086792851), u(1017036298, 365543100), u(1126000580, 2618297676), u(1288033470, 3409855158), u(1501505948, 4234509866), u(1607167915, 987167468), u(1816402316, 1246189591)];
            var l = [];
            (function() {
              for (var t4 = 0; t4 < 80; t4++)
                l[t4] = u();
            })();
            var f = o.SHA512 = i2.extend({ _doReset: function() {
              this._hash = new a.init([new s2.init(1779033703, 4089235720), new s2.init(3144134277, 2227873595), new s2.init(1013904242, 4271175723), new s2.init(2773480762, 1595750129), new s2.init(1359893119, 2917565137), new s2.init(2600822924, 725511199), new s2.init(528734635, 4215389547), new s2.init(1541459225, 327033209)]);
            }, _doProcessBlock: function(t4, e4) {
              var r4 = this._hash.words;
              var i3 = r4[0];
              var n22 = r4[1];
              var s22 = r4[2];
              var a2 = r4[3];
              var o2 = r4[4];
              var u2 = r4[5];
              var f2 = r4[6];
              var h = r4[7];
              var d = i3.high;
              var v = i3.low;
              var p = n22.high;
              var g = n22.low;
              var y = s22.high;
              var m = s22.low;
              var _ = a2.high;
              var w = a2.low;
              var S = o2.high;
              var b = o2.low;
              var E = u2.high;
              var D = u2.low;
              var T = f2.high;
              var M = f2.low;
              var I = h.high;
              var A = h.low;
              var R = d;
              var x = v;
              var B = p;
              var C = g;
              var O = y;
              var k = m;
              var N = _;
              var P = w;
              var V = S;
              var H = b;
              var L = E;
              var K = D;
              var U = T;
              var j = M;
              var q = I;
              var z = A;
              for (var F = 0; F < 80; F++) {
                var G;
                var Y;
                var W = l[F];
                if (F < 16) {
                  Y = W.high = t4[e4 + F * 2] | 0;
                  G = W.low = t4[e4 + F * 2 + 1] | 0;
                } else {
                  var J = l[F - 15];
                  var Z = J.high;
                  var $ = J.low;
                  var X = (Z >>> 1 | $ << 31) ^ (Z >>> 8 | $ << 24) ^ Z >>> 7;
                  var Q = ($ >>> 1 | Z << 31) ^ ($ >>> 8 | Z << 24) ^ ($ >>> 7 | Z << 25);
                  var tt = l[F - 2];
                  var et = tt.high;
                  var rt = tt.low;
                  var it = (et >>> 19 | rt << 13) ^ (et << 3 | rt >>> 29) ^ et >>> 6;
                  var nt = (rt >>> 19 | et << 13) ^ (rt << 3 | et >>> 29) ^ (rt >>> 6 | et << 26);
                  var st = l[F - 7];
                  var at = st.high;
                  var ot = st.low;
                  var ut = l[F - 16];
                  var ct = ut.high;
                  var lt = ut.low;
                  G = Q + ot;
                  Y = X + at + (G >>> 0 < Q >>> 0 ? 1 : 0);
                  G += nt;
                  Y = Y + it + (G >>> 0 < nt >>> 0 ? 1 : 0);
                  G += lt;
                  Y = Y + ct + (G >>> 0 < lt >>> 0 ? 1 : 0);
                  W.high = Y;
                  W.low = G;
                }
                var ft = V & L ^ ~V & U;
                var ht = H & K ^ ~H & j;
                var dt = R & B ^ R & O ^ B & O;
                var vt = x & C ^ x & k ^ C & k;
                var pt = (R >>> 28 | x << 4) ^ (R << 30 | x >>> 2) ^ (R << 25 | x >>> 7);
                var gt = (x >>> 28 | R << 4) ^ (x << 30 | R >>> 2) ^ (x << 25 | R >>> 7);
                var yt = (V >>> 14 | H << 18) ^ (V >>> 18 | H << 14) ^ (V << 23 | H >>> 9);
                var mt = (H >>> 14 | V << 18) ^ (H >>> 18 | V << 14) ^ (H << 23 | V >>> 9);
                var _t = c[F];
                var wt = _t.high;
                var St = _t.low;
                var bt = z + mt;
                var Et = q + yt + (bt >>> 0 < z >>> 0 ? 1 : 0);
                var bt = bt + ht;
                var Et = Et + ft + (bt >>> 0 < ht >>> 0 ? 1 : 0);
                var bt = bt + St;
                var Et = Et + wt + (bt >>> 0 < St >>> 0 ? 1 : 0);
                var bt = bt + G;
                var Et = Et + Y + (bt >>> 0 < G >>> 0 ? 1 : 0);
                var Dt = gt + vt;
                var Tt = pt + dt + (Dt >>> 0 < gt >>> 0 ? 1 : 0);
                q = U;
                z = j;
                U = L;
                j = K;
                L = V;
                K = H;
                H = P + bt | 0;
                V = N + Et + (H >>> 0 < P >>> 0 ? 1 : 0) | 0;
                N = O;
                P = k;
                O = B;
                k = C;
                B = R;
                C = x;
                x = bt + Dt | 0;
                R = Et + Tt + (x >>> 0 < bt >>> 0 ? 1 : 0) | 0;
              }
              v = i3.low = v + x;
              i3.high = d + R + (v >>> 0 < x >>> 0 ? 1 : 0);
              g = n22.low = g + C;
              n22.high = p + B + (g >>> 0 < C >>> 0 ? 1 : 0);
              m = s22.low = m + k;
              s22.high = y + O + (m >>> 0 < k >>> 0 ? 1 : 0);
              w = a2.low = w + P;
              a2.high = _ + N + (w >>> 0 < P >>> 0 ? 1 : 0);
              b = o2.low = b + H;
              o2.high = S + V + (b >>> 0 < H >>> 0 ? 1 : 0);
              D = u2.low = D + K;
              u2.high = E + L + (D >>> 0 < K >>> 0 ? 1 : 0);
              M = f2.low = M + j;
              f2.high = T + U + (M >>> 0 < j >>> 0 ? 1 : 0);
              A = h.low = A + z;
              h.high = I + q + (A >>> 0 < z >>> 0 ? 1 : 0);
            }, _doFinalize: function() {
              var t4 = this._data;
              var e4 = t4.words;
              var r4 = this._nDataBytes * 8;
              var i3 = t4.sigBytes * 8;
              e4[i3 >>> 5] |= 128 << 24 - i3 % 32;
              e4[(i3 + 128 >>> 10 << 5) + 30] = Math.floor(r4 / 4294967296);
              e4[(i3 + 128 >>> 10 << 5) + 31] = r4;
              t4.sigBytes = e4.length * 4;
              this._process();
              var n22 = this._hash.toX32();
              return n22;
            }, clone: function() {
              var t4 = i2.clone.call(this);
              t4._hash = this._hash.clone();
              return t4;
            }, blockSize: 1024 / 32 });
            e3.SHA512 = i2._createHelper(f);
            e3.HmacSHA512 = i2._createHmacHelper(f);
          })();
          return t3.SHA512;
        });
      }, 1396: function(t2, e2, r2) {
        (function(i2, n2, s2) {
          t2.exports = n2(r2(9021), r2(3240), r2(6440), r2(5503), r2(754), r2(4725), r2(4636), r2(5471), r2(3009), r2(6308), r2(1380), r2(9557), r2(5953), r2(8056), r2(1025), r2(19), r2(9506), r2(7165), r2(2169), r2(6939), r2(6372), r2(3797), r2(8454), r2(2073), r2(4905), r2(482), r2(2155), r2(8124), r2(25), r2(955), r2(7628), r2(7193), r2(6298), r2(2696), r2(3128));
        })(this, function(t3) {
          return t3;
        });
      }, 1458: (t2, e2) => {
        Object.defineProperty(e2, "__esModule", { value: true });
        e2.ErrorCode = void 0;
        (function(t3) {
          t3[t3["SUCCESS"] = 0] = "SUCCESS";
          t3[t3["CLIENT_ID_NOT_FOUND"] = 1] = "CLIENT_ID_NOT_FOUND";
          t3[t3["OPERATION_TOO_OFTEN"] = 2] = "OPERATION_TOO_OFTEN";
          t3[t3["REPEAT_MESSAGE"] = 3] = "REPEAT_MESSAGE";
          t3[t3["TIME_OUT"] = 4] = "TIME_OUT";
        })(e2.ErrorCode || (e2.ErrorCode = {}));
      }, 1649: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        const n2 = i2(r2(7574));
        const s2 = i2(r2(8036));
        const a = i2(r2(9420));
        const o = i2(r2(2620));
        const u = i2(r2(669));
        class c extends n2.default {
          constructor() {
            super(...arguments);
            this.registerResultData = new l();
          }
          static parse(t3) {
            let e3 = new c();
            super.parseMsg(e3, t3);
            e3.registerResultData = l.parse(e3.data);
            return e3;
          }
          receive() {
            var t3, e3;
            if (this.registerResultData.errorCode != 0 || !this.registerResultData.cid || !this.registerResultData.session) {
              u.default.error(`register fail: ${this.data}`);
              (t3 = a.default.onError) === null || t3 === void 0 || t3.call(a.default.onError, { error: `register fail: ${this.data}` });
              return;
            }
            if (a.default.cid != this.registerResultData.cid)
              s2.default.setSync(s2.default.KEY_ADD_PHONE_INFO_TIME, 0);
            a.default.cid = this.registerResultData.cid;
            (e3 = a.default.onClientId) === null || e3 === void 0 || e3.call(a.default.onClientId, { cid: a.default.cid });
            s2.default.set({ key: s2.default.KEY_CID, data: a.default.cid });
            a.default.session = this.registerResultData.session;
            s2.default.set({ key: s2.default.KEY_SESSION, data: a.default.session });
            a.default.deviceId = this.registerResultData.deviceId;
            s2.default.set({ key: s2.default.KEY_DEVICE_ID, data: a.default.deviceId });
            o.default.create().send();
          }
        }
        class l {
          constructor() {
            this.errorCode = -1;
            this.errorMsg = "";
            this.cid = "";
            this.session = "";
            this.deviceId = "";
            this.regId = "";
          }
          static parse(t3) {
            let e3 = new l();
            let r3 = JSON.parse(t3);
            e3.errorCode = r3.errorCode;
            e3.errorMsg = r3.errorMsg;
            e3.cid = r3.cid;
            e3.session = r3.session;
            e3.deviceId = r3.deviceId;
            e3.regId = r3.regId;
            return e3;
          }
        }
        e2["default"] = c;
      }, 2037: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        const n2 = i2(r2(7574));
        const s2 = i2(r2(6068));
        const a = i2(r2(2620));
        const o = i2(r2(669));
        const u = i2(r2(9420));
        class c extends n2.default {
          constructor() {
            super(...arguments);
            this.keyNegotiateResultData = new l();
          }
          static parse(t3) {
            let e3 = new c();
            super.parseMsg(e3, t3);
            e3.keyNegotiateResultData = l.parse(e3.data);
            return e3;
          }
          receive() {
            var t3, e3;
            if (this.keyNegotiateResultData.errorCode != 0) {
              o.default.error(`key negotiate fail: ${this.data}`);
              (t3 = u.default.onError) === null || t3 === void 0 || t3.call(u.default.onError, { error: `key negotiate fail: ${this.data}` });
              return;
            }
            let r3 = this.keyNegotiateResultData.encryptType.split("/");
            if (!s2.default.algorithmMap.has(r3[0].trim().toLowerCase()) || !s2.default.modeMap.has(r3[1].trim().toLowerCase()) || !s2.default.paddingMap.has(r3[2].trim().toLowerCase())) {
              o.default.error(`key negotiate fail: ${this.data}`);
              (e3 = u.default.onError) === null || e3 === void 0 || e3.call(u.default.onError, { error: `key negotiate fail: ${this.data}` });
              return;
            }
            s2.default.setEncryptParams(r3[0].trim().toLowerCase(), r3[1].trim().toLowerCase(), r3[2].trim().toLowerCase());
            a.default.create().send();
          }
        }
        class l {
          constructor() {
            this.errorCode = -1;
            this.errorMsg = "";
            this.encryptType = "";
          }
          static parse(t3) {
            let e3 = new l();
            let r3 = JSON.parse(t3);
            e3.errorCode = r3.errorCode;
            e3.errorMsg = r3.errorMsg;
            e3.encryptType = r3.encryptType;
            return e3;
          }
        }
        e2["default"] = c;
      }, 2073: function(t2, e2, r2) {
        (function(i2, n2, s2) {
          t2.exports = n2(r2(9021), r2(7165));
        })(this, function(t3) {
          t3.pad.AnsiX923 = { pad: function(t4, e3) {
            var r3 = t4.sigBytes;
            var i2 = e3 * 4;
            var n2 = i2 - r3 % i2;
            var s2 = r3 + n2 - 1;
            t4.clamp();
            t4.words[s2 >>> 2] |= n2 << 24 - s2 % 4 * 8;
            t4.sigBytes += n2;
          }, unpad: function(t4) {
            var e3 = t4.words[t4.sigBytes - 1 >>> 2] & 255;
            t4.sigBytes -= e3;
          } };
          return t3.pad.Ansix923;
        });
      }, 2096: (t2, e2, r2) => {
        t2 = r2.nmd(t2);
        var i2;
        var n2 = function(t3) {
          var e3 = 1e7, r3 = 7, i3 = 9007199254740992, s2 = d(i3), a = "0123456789abcdefghijklmnopqrstuvwxyz";
          var o = typeof BigInt === "function";
          function u(t4, e4, r4, i4) {
            if (typeof t4 === "undefined")
              return u[0];
            if (typeof e4 !== "undefined")
              return +e4 === 10 && !r4 ? st(t4) : X(t4, e4, r4, i4);
            return st(t4);
          }
          function c(t4, e4) {
            this.value = t4;
            this.sign = e4;
            this.isSmall = false;
          }
          c.prototype = Object.create(u.prototype);
          function l(t4) {
            this.value = t4;
            this.sign = t4 < 0;
            this.isSmall = true;
          }
          l.prototype = Object.create(u.prototype);
          function f(t4) {
            this.value = t4;
          }
          f.prototype = Object.create(u.prototype);
          function h(t4) {
            return -i3 < t4 && t4 < i3;
          }
          function d(t4) {
            if (t4 < 1e7)
              return [t4];
            if (t4 < 1e14)
              return [t4 % 1e7, Math.floor(t4 / 1e7)];
            return [t4 % 1e7, Math.floor(t4 / 1e7) % 1e7, Math.floor(t4 / 1e14)];
          }
          function v(t4) {
            p(t4);
            var r4 = t4.length;
            if (r4 < 4 && N(t4, s2) < 0)
              switch (r4) {
                case 0:
                  return 0;
                case 1:
                  return t4[0];
                case 2:
                  return t4[0] + t4[1] * e3;
                default:
                  return t4[0] + (t4[1] + t4[2] * e3) * e3;
              }
            return t4;
          }
          function p(t4) {
            var e4 = t4.length;
            while (t4[--e4] === 0)
              ;
            t4.length = e4 + 1;
          }
          function g(t4) {
            var e4 = new Array(t4);
            var r4 = -1;
            while (++r4 < t4)
              e4[r4] = 0;
            return e4;
          }
          function y(t4) {
            if (t4 > 0)
              return Math.floor(t4);
            return Math.ceil(t4);
          }
          function m(t4, r4) {
            var i4 = t4.length, n22 = r4.length, s22 = new Array(i4), a2 = 0, o2 = e3, u2, c2;
            for (c2 = 0; c2 < n22; c2++) {
              u2 = t4[c2] + r4[c2] + a2;
              a2 = u2 >= o2 ? 1 : 0;
              s22[c2] = u2 - a2 * o2;
            }
            while (c2 < i4) {
              u2 = t4[c2] + a2;
              a2 = u2 === o2 ? 1 : 0;
              s22[c2++] = u2 - a2 * o2;
            }
            if (a2 > 0)
              s22.push(a2);
            return s22;
          }
          function _(t4, e4) {
            if (t4.length >= e4.length)
              return m(t4, e4);
            return m(e4, t4);
          }
          function w(t4, r4) {
            var i4 = t4.length, n22 = new Array(i4), s22 = e3, a2, o2;
            for (o2 = 0; o2 < i4; o2++) {
              a2 = t4[o2] - s22 + r4;
              r4 = Math.floor(a2 / s22);
              n22[o2] = a2 - r4 * s22;
              r4 += 1;
            }
            while (r4 > 0) {
              n22[o2++] = r4 % s22;
              r4 = Math.floor(r4 / s22);
            }
            return n22;
          }
          c.prototype.add = function(t4) {
            var e4 = st(t4);
            if (this.sign !== e4.sign)
              return this.subtract(e4.negate());
            var r4 = this.value, i4 = e4.value;
            if (e4.isSmall)
              return new c(w(r4, Math.abs(i4)), this.sign);
            return new c(_(r4, i4), this.sign);
          };
          c.prototype.plus = c.prototype.add;
          l.prototype.add = function(t4) {
            var e4 = st(t4);
            var r4 = this.value;
            if (r4 < 0 !== e4.sign)
              return this.subtract(e4.negate());
            var i4 = e4.value;
            if (e4.isSmall) {
              if (h(r4 + i4))
                return new l(r4 + i4);
              i4 = d(Math.abs(i4));
            }
            return new c(w(i4, Math.abs(r4)), r4 < 0);
          };
          l.prototype.plus = l.prototype.add;
          f.prototype.add = function(t4) {
            return new f(this.value + st(t4).value);
          };
          f.prototype.plus = f.prototype.add;
          function S(t4, r4) {
            var i4 = t4.length, n22 = r4.length, s22 = new Array(i4), a2 = 0, o2 = e3, u2, c2;
            for (u2 = 0; u2 < n22; u2++) {
              c2 = t4[u2] - a2 - r4[u2];
              if (c2 < 0) {
                c2 += o2;
                a2 = 1;
              } else
                a2 = 0;
              s22[u2] = c2;
            }
            for (u2 = n22; u2 < i4; u2++) {
              c2 = t4[u2] - a2;
              if (c2 < 0)
                c2 += o2;
              else {
                s22[u2++] = c2;
                break;
              }
              s22[u2] = c2;
            }
            for (; u2 < i4; u2++)
              s22[u2] = t4[u2];
            p(s22);
            return s22;
          }
          function b(t4, e4, r4) {
            var i4;
            if (N(t4, e4) >= 0)
              i4 = S(t4, e4);
            else {
              i4 = S(e4, t4);
              r4 = !r4;
            }
            i4 = v(i4);
            if (typeof i4 === "number") {
              if (r4)
                i4 = -i4;
              return new l(i4);
            }
            return new c(i4, r4);
          }
          function E(t4, r4, i4) {
            var n22 = t4.length, s22 = new Array(n22), a2 = -r4, o2 = e3, u2, f2;
            for (u2 = 0; u2 < n22; u2++) {
              f2 = t4[u2] + a2;
              a2 = Math.floor(f2 / o2);
              f2 %= o2;
              s22[u2] = f2 < 0 ? f2 + o2 : f2;
            }
            s22 = v(s22);
            if (typeof s22 === "number") {
              if (i4)
                s22 = -s22;
              return new l(s22);
            }
            return new c(s22, i4);
          }
          c.prototype.subtract = function(t4) {
            var e4 = st(t4);
            if (this.sign !== e4.sign)
              return this.add(e4.negate());
            var r4 = this.value, i4 = e4.value;
            if (e4.isSmall)
              return E(r4, Math.abs(i4), this.sign);
            return b(r4, i4, this.sign);
          };
          c.prototype.minus = c.prototype.subtract;
          l.prototype.subtract = function(t4) {
            var e4 = st(t4);
            var r4 = this.value;
            if (r4 < 0 !== e4.sign)
              return this.add(e4.negate());
            var i4 = e4.value;
            if (e4.isSmall)
              return new l(r4 - i4);
            return E(i4, Math.abs(r4), r4 >= 0);
          };
          l.prototype.minus = l.prototype.subtract;
          f.prototype.subtract = function(t4) {
            return new f(this.value - st(t4).value);
          };
          f.prototype.minus = f.prototype.subtract;
          c.prototype.negate = function() {
            return new c(this.value, !this.sign);
          };
          l.prototype.negate = function() {
            var t4 = this.sign;
            var e4 = new l(-this.value);
            e4.sign = !t4;
            return e4;
          };
          f.prototype.negate = function() {
            return new f(-this.value);
          };
          c.prototype.abs = function() {
            return new c(this.value, false);
          };
          l.prototype.abs = function() {
            return new l(Math.abs(this.value));
          };
          f.prototype.abs = function() {
            return new f(this.value >= 0 ? this.value : -this.value);
          };
          function D(t4, r4) {
            var i4 = t4.length, n22 = r4.length, s22 = i4 + n22, a2 = g(s22), o2 = e3, u2, c2, l2, f2, h2;
            for (l2 = 0; l2 < i4; ++l2) {
              f2 = t4[l2];
              for (var d2 = 0; d2 < n22; ++d2) {
                h2 = r4[d2];
                u2 = f2 * h2 + a2[l2 + d2];
                c2 = Math.floor(u2 / o2);
                a2[l2 + d2] = u2 - c2 * o2;
                a2[l2 + d2 + 1] += c2;
              }
            }
            p(a2);
            return a2;
          }
          function T(t4, r4) {
            var i4 = t4.length, n22 = new Array(i4), s22 = e3, a2 = 0, o2, u2;
            for (u2 = 0; u2 < i4; u2++) {
              o2 = t4[u2] * r4 + a2;
              a2 = Math.floor(o2 / s22);
              n22[u2] = o2 - a2 * s22;
            }
            while (a2 > 0) {
              n22[u2++] = a2 % s22;
              a2 = Math.floor(a2 / s22);
            }
            return n22;
          }
          function M(t4, e4) {
            var r4 = [];
            while (e4-- > 0)
              r4.push(0);
            return r4.concat(t4);
          }
          function I(t4, e4) {
            var r4 = Math.max(t4.length, e4.length);
            if (r4 <= 30)
              return D(t4, e4);
            r4 = Math.ceil(r4 / 2);
            var i4 = t4.slice(r4), n22 = t4.slice(0, r4), s22 = e4.slice(r4), a2 = e4.slice(0, r4);
            var o2 = I(n22, a2), u2 = I(i4, s22), c2 = I(_(n22, i4), _(a2, s22));
            var l2 = _(_(o2, M(S(S(c2, o2), u2), r4)), M(u2, 2 * r4));
            p(l2);
            return l2;
          }
          function A(t4, e4) {
            return -0.012 * t4 - 0.012 * e4 + 15e-6 * t4 * e4 > 0;
          }
          c.prototype.multiply = function(t4) {
            var r4 = st(t4), i4 = this.value, n22 = r4.value, s22 = this.sign !== r4.sign, a2;
            if (r4.isSmall) {
              if (n22 === 0)
                return u[0];
              if (n22 === 1)
                return this;
              if (n22 === -1)
                return this.negate();
              a2 = Math.abs(n22);
              if (a2 < e3)
                return new c(T(i4, a2), s22);
              n22 = d(a2);
            }
            if (A(i4.length, n22.length))
              return new c(I(i4, n22), s22);
            return new c(D(i4, n22), s22);
          };
          c.prototype.times = c.prototype.multiply;
          function R(t4, r4, i4) {
            if (t4 < e3)
              return new c(T(r4, t4), i4);
            return new c(D(r4, d(t4)), i4);
          }
          l.prototype._multiplyBySmall = function(t4) {
            if (h(t4.value * this.value))
              return new l(t4.value * this.value);
            return R(Math.abs(t4.value), d(Math.abs(this.value)), this.sign !== t4.sign);
          };
          c.prototype._multiplyBySmall = function(t4) {
            if (t4.value === 0)
              return u[0];
            if (t4.value === 1)
              return this;
            if (t4.value === -1)
              return this.negate();
            return R(Math.abs(t4.value), this.value, this.sign !== t4.sign);
          };
          l.prototype.multiply = function(t4) {
            return st(t4)._multiplyBySmall(this);
          };
          l.prototype.times = l.prototype.multiply;
          f.prototype.multiply = function(t4) {
            return new f(this.value * st(t4).value);
          };
          f.prototype.times = f.prototype.multiply;
          function x(t4) {
            var r4 = t4.length, i4 = g(r4 + r4), n22 = e3, s22, a2, o2, u2, c2;
            for (o2 = 0; o2 < r4; o2++) {
              u2 = t4[o2];
              a2 = 0 - u2 * u2;
              for (var l2 = o2; l2 < r4; l2++) {
                c2 = t4[l2];
                s22 = 2 * (u2 * c2) + i4[o2 + l2] + a2;
                a2 = Math.floor(s22 / n22);
                i4[o2 + l2] = s22 - a2 * n22;
              }
              i4[o2 + r4] = a2;
            }
            p(i4);
            return i4;
          }
          c.prototype.square = function() {
            return new c(x(this.value), false);
          };
          l.prototype.square = function() {
            var t4 = this.value * this.value;
            if (h(t4))
              return new l(t4);
            return new c(x(d(Math.abs(this.value))), false);
          };
          f.prototype.square = function(t4) {
            return new f(this.value * this.value);
          };
          function B(t4, r4) {
            var i4 = t4.length, n22 = r4.length, s22 = e3, a2 = g(r4.length), o2 = r4[n22 - 1], u2 = Math.ceil(s22 / (2 * o2)), c2 = T(t4, u2), l2 = T(r4, u2), f2, h2, d2, p2, y2, m2, _2;
            if (c2.length <= i4)
              c2.push(0);
            l2.push(0);
            o2 = l2[n22 - 1];
            for (h2 = i4 - n22; h2 >= 0; h2--) {
              f2 = s22 - 1;
              if (c2[h2 + n22] !== o2)
                f2 = Math.floor((c2[h2 + n22] * s22 + c2[h2 + n22 - 1]) / o2);
              d2 = 0;
              p2 = 0;
              m2 = l2.length;
              for (y2 = 0; y2 < m2; y2++) {
                d2 += f2 * l2[y2];
                _2 = Math.floor(d2 / s22);
                p2 += c2[h2 + y2] - (d2 - _2 * s22);
                d2 = _2;
                if (p2 < 0) {
                  c2[h2 + y2] = p2 + s22;
                  p2 = -1;
                } else {
                  c2[h2 + y2] = p2;
                  p2 = 0;
                }
              }
              while (p2 !== 0) {
                f2 -= 1;
                d2 = 0;
                for (y2 = 0; y2 < m2; y2++) {
                  d2 += c2[h2 + y2] - s22 + l2[y2];
                  if (d2 < 0) {
                    c2[h2 + y2] = d2 + s22;
                    d2 = 0;
                  } else {
                    c2[h2 + y2] = d2;
                    d2 = 1;
                  }
                }
                p2 += d2;
              }
              a2[h2] = f2;
            }
            c2 = O(c2, u2)[0];
            return [v(a2), v(c2)];
          }
          function C(t4, r4) {
            var i4 = t4.length, n22 = r4.length, s22 = [], a2 = [], o2 = e3, u2, c2, l2, f2, h2;
            while (i4) {
              a2.unshift(t4[--i4]);
              p(a2);
              if (N(a2, r4) < 0) {
                s22.push(0);
                continue;
              }
              c2 = a2.length;
              l2 = a2[c2 - 1] * o2 + a2[c2 - 2];
              f2 = r4[n22 - 1] * o2 + r4[n22 - 2];
              if (c2 > n22)
                l2 = (l2 + 1) * o2;
              u2 = Math.ceil(l2 / f2);
              do {
                h2 = T(r4, u2);
                if (N(h2, a2) <= 0)
                  break;
                u2--;
              } while (u2);
              s22.push(u2);
              a2 = S(a2, h2);
            }
            s22.reverse();
            return [v(s22), v(a2)];
          }
          function O(t4, r4) {
            var i4 = t4.length, n22 = g(i4), s22 = e3, a2, o2, u2, c2;
            u2 = 0;
            for (a2 = i4 - 1; a2 >= 0; --a2) {
              c2 = u2 * s22 + t4[a2];
              o2 = y(c2 / r4);
              u2 = c2 - o2 * r4;
              n22[a2] = o2 | 0;
            }
            return [n22, u2 | 0];
          }
          function k(t4, r4) {
            var i4, n22 = st(r4);
            if (o)
              return [new f(t4.value / n22.value), new f(t4.value % n22.value)];
            var s22 = t4.value, a2 = n22.value;
            var h2;
            if (a2 === 0)
              throw new Error("Cannot divide by zero");
            if (t4.isSmall) {
              if (n22.isSmall)
                return [new l(y(s22 / a2)), new l(s22 % a2)];
              return [u[0], t4];
            }
            if (n22.isSmall) {
              if (a2 === 1)
                return [t4, u[0]];
              if (a2 == -1)
                return [t4.negate(), u[0]];
              var p2 = Math.abs(a2);
              if (p2 < e3) {
                i4 = O(s22, p2);
                h2 = v(i4[0]);
                var g2 = i4[1];
                if (t4.sign)
                  g2 = -g2;
                if (typeof h2 === "number") {
                  if (t4.sign !== n22.sign)
                    h2 = -h2;
                  return [new l(h2), new l(g2)];
                }
                return [new c(h2, t4.sign !== n22.sign), new l(g2)];
              }
              a2 = d(p2);
            }
            var m2 = N(s22, a2);
            if (m2 === -1)
              return [u[0], t4];
            if (m2 === 0)
              return [u[t4.sign === n22.sign ? 1 : -1], u[0]];
            if (s22.length + a2.length <= 200)
              i4 = B(s22, a2);
            else
              i4 = C(s22, a2);
            h2 = i4[0];
            var _2 = t4.sign !== n22.sign, w2 = i4[1], S2 = t4.sign;
            if (typeof h2 === "number") {
              if (_2)
                h2 = -h2;
              h2 = new l(h2);
            } else
              h2 = new c(h2, _2);
            if (typeof w2 === "number") {
              if (S2)
                w2 = -w2;
              w2 = new l(w2);
            } else
              w2 = new c(w2, S2);
            return [h2, w2];
          }
          c.prototype.divmod = function(t4) {
            var e4 = k(this, t4);
            return { quotient: e4[0], remainder: e4[1] };
          };
          f.prototype.divmod = l.prototype.divmod = c.prototype.divmod;
          c.prototype.divide = function(t4) {
            return k(this, t4)[0];
          };
          f.prototype.over = f.prototype.divide = function(t4) {
            return new f(this.value / st(t4).value);
          };
          l.prototype.over = l.prototype.divide = c.prototype.over = c.prototype.divide;
          c.prototype.mod = function(t4) {
            return k(this, t4)[1];
          };
          f.prototype.mod = f.prototype.remainder = function(t4) {
            return new f(this.value % st(t4).value);
          };
          l.prototype.remainder = l.prototype.mod = c.prototype.remainder = c.prototype.mod;
          c.prototype.pow = function(t4) {
            var e4 = st(t4), r4 = this.value, i4 = e4.value, n22, s22, a2;
            if (i4 === 0)
              return u[1];
            if (r4 === 0)
              return u[0];
            if (r4 === 1)
              return u[1];
            if (r4 === -1)
              return e4.isEven() ? u[1] : u[-1];
            if (e4.sign)
              return u[0];
            if (!e4.isSmall)
              throw new Error("The exponent " + e4.toString() + " is too large.");
            if (this.isSmall) {
              if (h(n22 = Math.pow(r4, i4)))
                return new l(y(n22));
            }
            s22 = this;
            a2 = u[1];
            while (true) {
              if (i4 & true) {
                a2 = a2.times(s22);
                --i4;
              }
              if (i4 === 0)
                break;
              i4 /= 2;
              s22 = s22.square();
            }
            return a2;
          };
          l.prototype.pow = c.prototype.pow;
          f.prototype.pow = function(t4) {
            var e4 = st(t4);
            var r4 = this.value, i4 = e4.value;
            var n22 = BigInt(0), s22 = BigInt(1), a2 = BigInt(2);
            if (i4 === n22)
              return u[1];
            if (r4 === n22)
              return u[0];
            if (r4 === s22)
              return u[1];
            if (r4 === BigInt(-1))
              return e4.isEven() ? u[1] : u[-1];
            if (e4.isNegative())
              return new f(n22);
            var o2 = this;
            var c2 = u[1];
            while (true) {
              if ((i4 & s22) === s22) {
                c2 = c2.times(o2);
                --i4;
              }
              if (i4 === n22)
                break;
              i4 /= a2;
              o2 = o2.square();
            }
            return c2;
          };
          c.prototype.modPow = function(t4, e4) {
            t4 = st(t4);
            e4 = st(e4);
            if (e4.isZero())
              throw new Error("Cannot take modPow with modulus 0");
            var r4 = u[1], i4 = this.mod(e4);
            if (t4.isNegative()) {
              t4 = t4.multiply(u[-1]);
              i4 = i4.modInv(e4);
            }
            while (t4.isPositive()) {
              if (i4.isZero())
                return u[0];
              if (t4.isOdd())
                r4 = r4.multiply(i4).mod(e4);
              t4 = t4.divide(2);
              i4 = i4.square().mod(e4);
            }
            return r4;
          };
          f.prototype.modPow = l.prototype.modPow = c.prototype.modPow;
          function N(t4, e4) {
            if (t4.length !== e4.length)
              return t4.length > e4.length ? 1 : -1;
            for (var r4 = t4.length - 1; r4 >= 0; r4--)
              if (t4[r4] !== e4[r4])
                return t4[r4] > e4[r4] ? 1 : -1;
            return 0;
          }
          c.prototype.compareAbs = function(t4) {
            var e4 = st(t4), r4 = this.value, i4 = e4.value;
            if (e4.isSmall)
              return 1;
            return N(r4, i4);
          };
          l.prototype.compareAbs = function(t4) {
            var e4 = st(t4), r4 = Math.abs(this.value), i4 = e4.value;
            if (e4.isSmall) {
              i4 = Math.abs(i4);
              return r4 === i4 ? 0 : r4 > i4 ? 1 : -1;
            }
            return -1;
          };
          f.prototype.compareAbs = function(t4) {
            var e4 = this.value;
            var r4 = st(t4).value;
            e4 = e4 >= 0 ? e4 : -e4;
            r4 = r4 >= 0 ? r4 : -r4;
            return e4 === r4 ? 0 : e4 > r4 ? 1 : -1;
          };
          c.prototype.compare = function(t4) {
            if (t4 === 1 / 0)
              return -1;
            if (t4 === -1 / 0)
              return 1;
            var e4 = st(t4), r4 = this.value, i4 = e4.value;
            if (this.sign !== e4.sign)
              return e4.sign ? 1 : -1;
            if (e4.isSmall)
              return this.sign ? -1 : 1;
            return N(r4, i4) * (this.sign ? -1 : 1);
          };
          c.prototype.compareTo = c.prototype.compare;
          l.prototype.compare = function(t4) {
            if (t4 === 1 / 0)
              return -1;
            if (t4 === -1 / 0)
              return 1;
            var e4 = st(t4), r4 = this.value, i4 = e4.value;
            if (e4.isSmall)
              return r4 == i4 ? 0 : r4 > i4 ? 1 : -1;
            if (r4 < 0 !== e4.sign)
              return r4 < 0 ? -1 : 1;
            return r4 < 0 ? 1 : -1;
          };
          l.prototype.compareTo = l.prototype.compare;
          f.prototype.compare = function(t4) {
            if (t4 === 1 / 0)
              return -1;
            if (t4 === -1 / 0)
              return 1;
            var e4 = this.value;
            var r4 = st(t4).value;
            return e4 === r4 ? 0 : e4 > r4 ? 1 : -1;
          };
          f.prototype.compareTo = f.prototype.compare;
          c.prototype.equals = function(t4) {
            return this.compare(t4) === 0;
          };
          f.prototype.eq = f.prototype.equals = l.prototype.eq = l.prototype.equals = c.prototype.eq = c.prototype.equals;
          c.prototype.notEquals = function(t4) {
            return this.compare(t4) !== 0;
          };
          f.prototype.neq = f.prototype.notEquals = l.prototype.neq = l.prototype.notEquals = c.prototype.neq = c.prototype.notEquals;
          c.prototype.greater = function(t4) {
            return this.compare(t4) > 0;
          };
          f.prototype.gt = f.prototype.greater = l.prototype.gt = l.prototype.greater = c.prototype.gt = c.prototype.greater;
          c.prototype.lesser = function(t4) {
            return this.compare(t4) < 0;
          };
          f.prototype.lt = f.prototype.lesser = l.prototype.lt = l.prototype.lesser = c.prototype.lt = c.prototype.lesser;
          c.prototype.greaterOrEquals = function(t4) {
            return this.compare(t4) >= 0;
          };
          f.prototype.geq = f.prototype.greaterOrEquals = l.prototype.geq = l.prototype.greaterOrEquals = c.prototype.geq = c.prototype.greaterOrEquals;
          c.prototype.lesserOrEquals = function(t4) {
            return this.compare(t4) <= 0;
          };
          f.prototype.leq = f.prototype.lesserOrEquals = l.prototype.leq = l.prototype.lesserOrEquals = c.prototype.leq = c.prototype.lesserOrEquals;
          c.prototype.isEven = function() {
            return (this.value[0] & 1) === 0;
          };
          l.prototype.isEven = function() {
            return (this.value & 1) === 0;
          };
          f.prototype.isEven = function() {
            return (this.value & BigInt(1)) === BigInt(0);
          };
          c.prototype.isOdd = function() {
            return (this.value[0] & 1) === 1;
          };
          l.prototype.isOdd = function() {
            return (this.value & 1) === 1;
          };
          f.prototype.isOdd = function() {
            return (this.value & BigInt(1)) === BigInt(1);
          };
          c.prototype.isPositive = function() {
            return !this.sign;
          };
          l.prototype.isPositive = function() {
            return this.value > 0;
          };
          f.prototype.isPositive = l.prototype.isPositive;
          c.prototype.isNegative = function() {
            return this.sign;
          };
          l.prototype.isNegative = function() {
            return this.value < 0;
          };
          f.prototype.isNegative = l.prototype.isNegative;
          c.prototype.isUnit = function() {
            return false;
          };
          l.prototype.isUnit = function() {
            return Math.abs(this.value) === 1;
          };
          f.prototype.isUnit = function() {
            return this.abs().value === BigInt(1);
          };
          c.prototype.isZero = function() {
            return false;
          };
          l.prototype.isZero = function() {
            return this.value === 0;
          };
          f.prototype.isZero = function() {
            return this.value === BigInt(0);
          };
          c.prototype.isDivisibleBy = function(t4) {
            var e4 = st(t4);
            if (e4.isZero())
              return false;
            if (e4.isUnit())
              return true;
            if (e4.compareAbs(2) === 0)
              return this.isEven();
            return this.mod(e4).isZero();
          };
          f.prototype.isDivisibleBy = l.prototype.isDivisibleBy = c.prototype.isDivisibleBy;
          function P(t4) {
            var e4 = t4.abs();
            if (e4.isUnit())
              return false;
            if (e4.equals(2) || e4.equals(3) || e4.equals(5))
              return true;
            if (e4.isEven() || e4.isDivisibleBy(3) || e4.isDivisibleBy(5))
              return false;
            if (e4.lesser(49))
              return true;
          }
          function V(t4, e4) {
            var r4 = t4.prev(), i4 = r4, s22 = 0, a2, u2, c2;
            while (i4.isEven())
              i4 = i4.divide(2), s22++;
            t:
              for (u2 = 0; u2 < e4.length; u2++) {
                if (t4.lesser(e4[u2]))
                  continue;
                c2 = n2(e4[u2]).modPow(i4, t4);
                if (c2.isUnit() || c2.equals(r4))
                  continue;
                for (a2 = s22 - 1; a2 != 0; a2--) {
                  c2 = c2.square().mod(t4);
                  if (c2.isUnit())
                    return false;
                  if (c2.equals(r4))
                    continue t;
                }
                return false;
              }
            return true;
          }
          c.prototype.isPrime = function(e4) {
            var r4 = P(this);
            if (r4 !== t3)
              return r4;
            var i4 = this.abs();
            var s22 = i4.bitLength();
            if (s22 <= 64)
              return V(i4, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]);
            var a2 = Math.log(2) * s22.toJSNumber();
            var o2 = Math.ceil(e4 === true ? 2 * Math.pow(a2, 2) : a2);
            for (var u2 = [], c2 = 0; c2 < o2; c2++)
              u2.push(n2(c2 + 2));
            return V(i4, u2);
          };
          f.prototype.isPrime = l.prototype.isPrime = c.prototype.isPrime;
          c.prototype.isProbablePrime = function(e4, r4) {
            var i4 = P(this);
            if (i4 !== t3)
              return i4;
            var s22 = this.abs();
            var a2 = e4 === t3 ? 5 : e4;
            for (var o2 = [], u2 = 0; u2 < a2; u2++)
              o2.push(n2.randBetween(2, s22.minus(2), r4));
            return V(s22, o2);
          };
          f.prototype.isProbablePrime = l.prototype.isProbablePrime = c.prototype.isProbablePrime;
          c.prototype.modInv = function(t4) {
            var e4 = n2.zero, r4 = n2.one, i4 = st(t4), s22 = this.abs(), a2, o2, u2;
            while (!s22.isZero()) {
              a2 = i4.divide(s22);
              o2 = e4;
              u2 = i4;
              e4 = r4;
              i4 = s22;
              r4 = o2.subtract(a2.multiply(r4));
              s22 = u2.subtract(a2.multiply(s22));
            }
            if (!i4.isUnit())
              throw new Error(this.toString() + " and " + t4.toString() + " are not co-prime");
            if (e4.compare(0) === -1)
              e4 = e4.add(t4);
            if (this.isNegative())
              return e4.negate();
            return e4;
          };
          f.prototype.modInv = l.prototype.modInv = c.prototype.modInv;
          c.prototype.next = function() {
            var t4 = this.value;
            if (this.sign)
              return E(t4, 1, this.sign);
            return new c(w(t4, 1), this.sign);
          };
          l.prototype.next = function() {
            var t4 = this.value;
            if (t4 + 1 < i3)
              return new l(t4 + 1);
            return new c(s2, false);
          };
          f.prototype.next = function() {
            return new f(this.value + BigInt(1));
          };
          c.prototype.prev = function() {
            var t4 = this.value;
            if (this.sign)
              return new c(w(t4, 1), true);
            return E(t4, 1, this.sign);
          };
          l.prototype.prev = function() {
            var t4 = this.value;
            if (t4 - 1 > -i3)
              return new l(t4 - 1);
            return new c(s2, true);
          };
          f.prototype.prev = function() {
            return new f(this.value - BigInt(1));
          };
          var H = [1];
          while (2 * H[H.length - 1] <= e3)
            H.push(2 * H[H.length - 1]);
          var L = H.length, K = H[L - 1];
          function U(t4) {
            return Math.abs(t4) <= e3;
          }
          c.prototype.shiftLeft = function(t4) {
            var e4 = st(t4).toJSNumber();
            if (!U(e4))
              throw new Error(String(e4) + " is too large for shifting.");
            if (e4 < 0)
              return this.shiftRight(-e4);
            var r4 = this;
            if (r4.isZero())
              return r4;
            while (e4 >= L) {
              r4 = r4.multiply(K);
              e4 -= L - 1;
            }
            return r4.multiply(H[e4]);
          };
          f.prototype.shiftLeft = l.prototype.shiftLeft = c.prototype.shiftLeft;
          c.prototype.shiftRight = function(t4) {
            var e4;
            var r4 = st(t4).toJSNumber();
            if (!U(r4))
              throw new Error(String(r4) + " is too large for shifting.");
            if (r4 < 0)
              return this.shiftLeft(-r4);
            var i4 = this;
            while (r4 >= L) {
              if (i4.isZero() || i4.isNegative() && i4.isUnit())
                return i4;
              e4 = k(i4, K);
              i4 = e4[1].isNegative() ? e4[0].prev() : e4[0];
              r4 -= L - 1;
            }
            e4 = k(i4, H[r4]);
            return e4[1].isNegative() ? e4[0].prev() : e4[0];
          };
          f.prototype.shiftRight = l.prototype.shiftRight = c.prototype.shiftRight;
          function j(t4, e4, r4) {
            e4 = st(e4);
            var i4 = t4.isNegative(), s22 = e4.isNegative();
            var a2 = i4 ? t4.not() : t4, o2 = s22 ? e4.not() : e4;
            var u2 = 0, c2 = 0;
            var l2 = null, f2 = null;
            var h2 = [];
            while (!a2.isZero() || !o2.isZero()) {
              l2 = k(a2, K);
              u2 = l2[1].toJSNumber();
              if (i4)
                u2 = K - 1 - u2;
              f2 = k(o2, K);
              c2 = f2[1].toJSNumber();
              if (s22)
                c2 = K - 1 - c2;
              a2 = l2[0];
              o2 = f2[0];
              h2.push(r4(u2, c2));
            }
            var d2 = r4(i4 ? 1 : 0, s22 ? 1 : 0) !== 0 ? n2(-1) : n2(0);
            for (var v2 = h2.length - 1; v2 >= 0; v2 -= 1)
              d2 = d2.multiply(K).add(n2(h2[v2]));
            return d2;
          }
          c.prototype.not = function() {
            return this.negate().prev();
          };
          f.prototype.not = l.prototype.not = c.prototype.not;
          c.prototype.and = function(t4) {
            return j(this, t4, function(t5, e4) {
              return t5 & e4;
            });
          };
          f.prototype.and = l.prototype.and = c.prototype.and;
          c.prototype.or = function(t4) {
            return j(this, t4, function(t5, e4) {
              return t5 | e4;
            });
          };
          f.prototype.or = l.prototype.or = c.prototype.or;
          c.prototype.xor = function(t4) {
            return j(this, t4, function(t5, e4) {
              return t5 ^ e4;
            });
          };
          f.prototype.xor = l.prototype.xor = c.prototype.xor;
          var q = 1 << 30, z = (e3 & -e3) * (e3 & -e3) | q;
          function F(t4) {
            var r4 = t4.value, i4 = typeof r4 === "number" ? r4 | q : typeof r4 === "bigint" ? r4 | BigInt(q) : r4[0] + r4[1] * e3 | z;
            return i4 & -i4;
          }
          function G(t4, e4) {
            if (e4.compareTo(t4) <= 0) {
              var r4 = G(t4, e4.square(e4));
              var i4 = r4.p;
              var s22 = r4.e;
              var a2 = i4.multiply(e4);
              return a2.compareTo(t4) <= 0 ? { p: a2, e: s22 * 2 + 1 } : { p: i4, e: s22 * 2 };
            }
            return { p: n2(1), e: 0 };
          }
          c.prototype.bitLength = function() {
            var t4 = this;
            if (t4.compareTo(n2(0)) < 0)
              t4 = t4.negate().subtract(n2(1));
            if (t4.compareTo(n2(0)) === 0)
              return n2(0);
            return n2(G(t4, n2(2)).e).add(n2(1));
          };
          f.prototype.bitLength = l.prototype.bitLength = c.prototype.bitLength;
          function Y(t4, e4) {
            t4 = st(t4);
            e4 = st(e4);
            return t4.greater(e4) ? t4 : e4;
          }
          function W(t4, e4) {
            t4 = st(t4);
            e4 = st(e4);
            return t4.lesser(e4) ? t4 : e4;
          }
          function J(t4, e4) {
            t4 = st(t4).abs();
            e4 = st(e4).abs();
            if (t4.equals(e4))
              return t4;
            if (t4.isZero())
              return e4;
            if (e4.isZero())
              return t4;
            var r4 = u[1], i4, n22;
            while (t4.isEven() && e4.isEven()) {
              i4 = W(F(t4), F(e4));
              t4 = t4.divide(i4);
              e4 = e4.divide(i4);
              r4 = r4.multiply(i4);
            }
            while (t4.isEven())
              t4 = t4.divide(F(t4));
            do {
              while (e4.isEven())
                e4 = e4.divide(F(e4));
              if (t4.greater(e4)) {
                n22 = e4;
                e4 = t4;
                t4 = n22;
              }
              e4 = e4.subtract(t4);
            } while (!e4.isZero());
            return r4.isUnit() ? t4 : t4.multiply(r4);
          }
          function Z(t4, e4) {
            t4 = st(t4).abs();
            e4 = st(e4).abs();
            return t4.divide(J(t4, e4)).multiply(e4);
          }
          function $(t4, r4, i4) {
            t4 = st(t4);
            r4 = st(r4);
            var n22 = i4 || Math.random;
            var s22 = W(t4, r4), a2 = Y(t4, r4);
            var o2 = a2.subtract(s22).add(1);
            if (o2.isSmall)
              return s22.add(Math.floor(n22() * o2));
            var c2 = et(o2, e3).value;
            var l2 = [], f2 = true;
            for (var h2 = 0; h2 < c2.length; h2++) {
              var d2 = f2 ? c2[h2] + (h2 + 1 < c2.length ? c2[h2 + 1] / e3 : 0) : e3;
              var v2 = y(n22() * d2);
              l2.push(v2);
              if (v2 < c2[h2])
                f2 = false;
            }
            return s22.add(u.fromArray(l2, e3, false));
          }
          var X = function(t4, e4, r4, i4) {
            r4 = r4 || a;
            t4 = String(t4);
            if (!i4) {
              t4 = t4.toLowerCase();
              r4 = r4.toLowerCase();
            }
            var n22 = t4.length;
            var s22;
            var o2 = Math.abs(e4);
            var u2 = {};
            for (s22 = 0; s22 < r4.length; s22++)
              u2[r4[s22]] = s22;
            for (s22 = 0; s22 < n22; s22++) {
              var c2 = t4[s22];
              if (c2 === "-")
                continue;
              if (c2 in u2) {
                if (u2[c2] >= o2) {
                  if (c2 === "1" && o2 === 1)
                    continue;
                  throw new Error(c2 + " is not a valid digit in base " + e4 + ".");
                }
              }
            }
            e4 = st(e4);
            var l2 = [];
            var f2 = t4[0] === "-";
            for (s22 = f2 ? 1 : 0; s22 < t4.length; s22++) {
              var c2 = t4[s22];
              if (c2 in u2)
                l2.push(st(u2[c2]));
              else if (c2 === "<") {
                var h2 = s22;
                do {
                  s22++;
                } while (t4[s22] !== ">" && s22 < t4.length);
                l2.push(st(t4.slice(h2 + 1, s22)));
              } else
                throw new Error(c2 + " is not a valid character");
            }
            return Q(l2, e4, f2);
          };
          function Q(t4, e4, r4) {
            var i4 = u[0], n22 = u[1], s22;
            for (s22 = t4.length - 1; s22 >= 0; s22--) {
              i4 = i4.add(t4[s22].times(n22));
              n22 = n22.times(e4);
            }
            return r4 ? i4.negate() : i4;
          }
          function tt(t4, e4) {
            e4 = e4 || a;
            if (t4 < e4.length)
              return e4[t4];
            return "<" + t4 + ">";
          }
          function et(t4, e4) {
            e4 = n2(e4);
            if (e4.isZero()) {
              if (t4.isZero())
                return { value: [0], isNegative: false };
              throw new Error("Cannot convert nonzero numbers to base 0.");
            }
            if (e4.equals(-1)) {
              if (t4.isZero())
                return { value: [0], isNegative: false };
              if (t4.isNegative())
                return { value: [].concat.apply([], Array.apply(null, Array(-t4.toJSNumber())).map(Array.prototype.valueOf, [1, 0])), isNegative: false };
              var r4 = Array.apply(null, Array(t4.toJSNumber() - 1)).map(Array.prototype.valueOf, [0, 1]);
              r4.unshift([1]);
              return { value: [].concat.apply([], r4), isNegative: false };
            }
            var i4 = false;
            if (t4.isNegative() && e4.isPositive()) {
              i4 = true;
              t4 = t4.abs();
            }
            if (e4.isUnit()) {
              if (t4.isZero())
                return { value: [0], isNegative: false };
              return { value: Array.apply(null, Array(t4.toJSNumber())).map(Number.prototype.valueOf, 1), isNegative: i4 };
            }
            var s22 = [];
            var a2 = t4, o2;
            while (a2.isNegative() || a2.compareAbs(e4) >= 0) {
              o2 = a2.divmod(e4);
              a2 = o2.quotient;
              var u2 = o2.remainder;
              if (u2.isNegative()) {
                u2 = e4.minus(u2).abs();
                a2 = a2.next();
              }
              s22.push(u2.toJSNumber());
            }
            s22.push(a2.toJSNumber());
            return { value: s22.reverse(), isNegative: i4 };
          }
          function rt(t4, e4, r4) {
            var i4 = et(t4, e4);
            return (i4.isNegative ? "-" : "") + i4.value.map(function(t5) {
              return tt(t5, r4);
            }).join("");
          }
          c.prototype.toArray = function(t4) {
            return et(this, t4);
          };
          l.prototype.toArray = function(t4) {
            return et(this, t4);
          };
          f.prototype.toArray = function(t4) {
            return et(this, t4);
          };
          c.prototype.toString = function(e4, r4) {
            if (e4 === t3)
              e4 = 10;
            if (e4 !== 10 || r4)
              return rt(this, e4, r4);
            var i4 = this.value, n22 = i4.length, s22 = String(i4[--n22]), a2 = "0000000", o2;
            while (--n22 >= 0) {
              o2 = String(i4[n22]);
              s22 += a2.slice(o2.length) + o2;
            }
            var u2 = this.sign ? "-" : "";
            return u2 + s22;
          };
          l.prototype.toString = function(e4, r4) {
            if (e4 === t3)
              e4 = 10;
            if (e4 != 10 || r4)
              return rt(this, e4, r4);
            return String(this.value);
          };
          f.prototype.toString = l.prototype.toString;
          f.prototype.toJSON = c.prototype.toJSON = l.prototype.toJSON = function() {
            return this.toString();
          };
          c.prototype.valueOf = function() {
            return parseInt(this.toString(), 10);
          };
          c.prototype.toJSNumber = c.prototype.valueOf;
          l.prototype.valueOf = function() {
            return this.value;
          };
          l.prototype.toJSNumber = l.prototype.valueOf;
          f.prototype.valueOf = f.prototype.toJSNumber = function() {
            return parseInt(this.toString(), 10);
          };
          function it(t4) {
            if (h(+t4)) {
              var e4 = +t4;
              if (e4 === y(e4))
                return o ? new f(BigInt(e4)) : new l(e4);
              throw new Error("Invalid integer: " + t4);
            }
            var i4 = t4[0] === "-";
            if (i4)
              t4 = t4.slice(1);
            var n22 = t4.split(/e/i);
            if (n22.length > 2)
              throw new Error("Invalid integer: " + n22.join("e"));
            if (n22.length === 2) {
              var s22 = n22[1];
              if (s22[0] === "+")
                s22 = s22.slice(1);
              s22 = +s22;
              if (s22 !== y(s22) || !h(s22))
                throw new Error("Invalid integer: " + s22 + " is not a valid exponent.");
              var a2 = n22[0];
              var u2 = a2.indexOf(".");
              if (u2 >= 0) {
                s22 -= a2.length - u2 - 1;
                a2 = a2.slice(0, u2) + a2.slice(u2 + 1);
              }
              if (s22 < 0)
                throw new Error("Cannot include negative exponent part for integers");
              a2 += new Array(s22 + 1).join("0");
              t4 = a2;
            }
            var d2 = /^([0-9][0-9]*)$/.test(t4);
            if (!d2)
              throw new Error("Invalid integer: " + t4);
            if (o)
              return new f(BigInt(i4 ? "-" + t4 : t4));
            var v2 = [], g2 = t4.length, m2 = r3, _2 = g2 - m2;
            while (g2 > 0) {
              v2.push(+t4.slice(_2, g2));
              _2 -= m2;
              if (_2 < 0)
                _2 = 0;
              g2 -= m2;
            }
            p(v2);
            return new c(v2, i4);
          }
          function nt(t4) {
            if (o)
              return new f(BigInt(t4));
            if (h(t4)) {
              if (t4 !== y(t4))
                throw new Error(t4 + " is not an integer.");
              return new l(t4);
            }
            return it(t4.toString());
          }
          function st(t4) {
            if (typeof t4 === "number")
              return nt(t4);
            if (typeof t4 === "string")
              return it(t4);
            if (typeof t4 === "bigint")
              return new f(t4);
            return t4;
          }
          for (var at = 0; at < 1e3; at++) {
            u[at] = st(at);
            if (at > 0)
              u[-at] = st(-at);
          }
          u.one = u[1];
          u.zero = u[0];
          u.minusOne = u[-1];
          u.max = Y;
          u.min = W;
          u.gcd = J;
          u.lcm = Z;
          u.isInstance = function(t4) {
            return t4 instanceof c || t4 instanceof l || t4 instanceof f;
          };
          u.randBetween = $;
          u.fromArray = function(t4, e4, r4) {
            return Q(t4.map(st), st(e4 || 10), r4);
          };
          return u;
        }();
        if (t2.hasOwnProperty("exports"))
          t2.exports = n2;
        i2 = (function() {
          return n2;
        }).call(e2, r2, e2, t2), i2 !== void 0 && (t2.exports = i2);
      }, 2155: function(t2, e2, r2) {
        (function(i2, n2, s2) {
          t2.exports = n2(r2(9021), r2(7165));
        })(this, function(t3) {
          t3.pad.ZeroPadding = { pad: function(t4, e3) {
            var r3 = e3 * 4;
            t4.clamp();
            t4.sigBytes += r3 - (t4.sigBytes % r3 || r3);
          }, unpad: function(t4) {
            var e3 = t4.words;
            var r3 = t4.sigBytes - 1;
            for (var r3 = t4.sigBytes - 1; r3 >= 0; r3--)
              if (e3[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255) {
                t4.sigBytes = r3 + 1;
                break;
              }
          } };
          return t3.pad.ZeroPadding;
        });
      }, 2169: function(t2, e2, r2) {
        (function(i2, n2, s2) {
          t2.exports = n2(r2(9021), r2(7165));
        })(this, function(t3) {
          t3.mode.CFB = function() {
            var e3 = t3.lib.BlockCipherMode.extend();
            e3.Encryptor = e3.extend({ processBlock: function(t4, e4) {
              var i2 = this._cipher;
              var n2 = i2.blockSize;
              r3.call(this, t4, e4, n2, i2);
              this._prevBlock = t4.slice(e4, e4 + n2);
            } });
            e3.Decryptor = e3.extend({ processBlock: function(t4, e4) {
              var i2 = this._cipher;
              var n2 = i2.blockSize;
              var s2 = t4.slice(e4, e4 + n2);
              r3.call(this, t4, e4, n2, i2);
              this._prevBlock = s2;
            } });
            function r3(t4, e4, r4, i2) {
              var n2;
              var s2 = this._iv;
              if (s2) {
                n2 = s2.slice(0);
                this._iv = void 0;
              } else
                n2 = this._prevBlock;
              i2.encryptBlock(n2, 0);
              for (var a = 0; a < r4; a++)
                t4[e4 + a] ^= n2[a];
            }
            return e3;
          }();
          return t3.mode.CFB;
        });
      }, 2180: (t2, e2, r2) => {
        r2.r(e2);
        r2.d(e2, { JSEncrypt: () => _t, default: () => wt });
        var i2 = "0123456789abcdefghijklmnopqrstuvwxyz";
        function n2(t3) {
          return i2.charAt(t3);
        }
        function s2(t3, e3) {
          return t3 & e3;
        }
        function a(t3, e3) {
          return t3 | e3;
        }
        function o(t3, e3) {
          return t3 ^ e3;
        }
        function u(t3, e3) {
          return t3 & ~e3;
        }
        function c(t3) {
          if (t3 == 0)
            return -1;
          var e3 = 0;
          if ((t3 & 65535) == 0) {
            t3 >>= 16;
            e3 += 16;
          }
          if ((t3 & 255) == 0) {
            t3 >>= 8;
            e3 += 8;
          }
          if ((t3 & 15) == 0) {
            t3 >>= 4;
            e3 += 4;
          }
          if ((t3 & 3) == 0) {
            t3 >>= 2;
            e3 += 2;
          }
          if ((t3 & 1) == 0)
            ++e3;
          return e3;
        }
        function l(t3) {
          var e3 = 0;
          while (t3 != 0) {
            t3 &= t3 - 1;
            ++e3;
          }
          return e3;
        }
        var f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var h = "=";
        function d(t3) {
          var e3;
          var r3;
          var i3 = "";
          for (e3 = 0; e3 + 3 <= t3.length; e3 += 3) {
            r3 = parseInt(t3.substring(e3, e3 + 3), 16);
            i3 += f.charAt(r3 >> 6) + f.charAt(r3 & 63);
          }
          if (e3 + 1 == t3.length) {
            r3 = parseInt(t3.substring(e3, e3 + 1), 16);
            i3 += f.charAt(r3 << 2);
          } else if (e3 + 2 == t3.length) {
            r3 = parseInt(t3.substring(e3, e3 + 2), 16);
            i3 += f.charAt(r3 >> 2) + f.charAt((r3 & 3) << 4);
          }
          while ((i3.length & 3) > 0)
            i3 += h;
          return i3;
        }
        function v(t3) {
          var e3 = "";
          var r3;
          var i3 = 0;
          var s22 = 0;
          for (r3 = 0; r3 < t3.length; ++r3) {
            if (t3.charAt(r3) == h)
              break;
            var a2 = f.indexOf(t3.charAt(r3));
            if (a2 < 0)
              continue;
            if (i3 == 0) {
              e3 += n2(a2 >> 2);
              s22 = a2 & 3;
              i3 = 1;
            } else if (i3 == 1) {
              e3 += n2(s22 << 2 | a2 >> 4);
              s22 = a2 & 15;
              i3 = 2;
            } else if (i3 == 2) {
              e3 += n2(s22);
              e3 += n2(a2 >> 2);
              s22 = a2 & 3;
              i3 = 3;
            } else {
              e3 += n2(s22 << 2 | a2 >> 4);
              e3 += n2(a2 & 15);
              i3 = 0;
            }
          }
          if (i3 == 1)
            e3 += n2(s22 << 2);
          return e3;
        }
        var g;
        var y = { decode: function(t3) {
          var e3;
          if (g === void 0) {
            var r3 = "0123456789ABCDEF";
            var i3 = " \f\n\r	 \u2028\u2029";
            g = {};
            for (e3 = 0; e3 < 16; ++e3)
              g[r3.charAt(e3)] = e3;
            r3 = r3.toLowerCase();
            for (e3 = 10; e3 < 16; ++e3)
              g[r3.charAt(e3)] = e3;
            for (e3 = 0; e3 < i3.length; ++e3)
              g[i3.charAt(e3)] = -1;
          }
          var n22 = [];
          var s22 = 0;
          var a2 = 0;
          for (e3 = 0; e3 < t3.length; ++e3) {
            var o2 = t3.charAt(e3);
            if (o2 == "=")
              break;
            o2 = g[o2];
            if (o2 == -1)
              continue;
            if (o2 === void 0)
              throw new Error("Illegal character at offset " + e3);
            s22 |= o2;
            if (++a2 >= 2) {
              n22[n22.length] = s22;
              s22 = 0;
              a2 = 0;
            } else
              s22 <<= 4;
          }
          if (a2)
            throw new Error("Hex encoding incomplete: 4 bits missing");
          return n22;
        } };
        var m;
        var _ = { decode: function(t3) {
          var e3;
          if (m === void 0) {
            var r3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var i3 = "= \f\n\r	 \u2028\u2029";
            m = /* @__PURE__ */ Object.create(null);
            for (e3 = 0; e3 < 64; ++e3)
              m[r3.charAt(e3)] = e3;
            m["-"] = 62;
            m["_"] = 63;
            for (e3 = 0; e3 < i3.length; ++e3)
              m[i3.charAt(e3)] = -1;
          }
          var n22 = [];
          var s22 = 0;
          var a2 = 0;
          for (e3 = 0; e3 < t3.length; ++e3) {
            var o2 = t3.charAt(e3);
            if (o2 == "=")
              break;
            o2 = m[o2];
            if (o2 == -1)
              continue;
            if (o2 === void 0)
              throw new Error("Illegal character at offset " + e3);
            s22 |= o2;
            if (++a2 >= 4) {
              n22[n22.length] = s22 >> 16;
              n22[n22.length] = s22 >> 8 & 255;
              n22[n22.length] = s22 & 255;
              s22 = 0;
              a2 = 0;
            } else
              s22 <<= 6;
          }
          switch (a2) {
            case 1:
              throw new Error("Base64 encoding incomplete: at least 2 bits missing");
            case 2:
              n22[n22.length] = s22 >> 10;
              break;
            case 3:
              n22[n22.length] = s22 >> 16;
              n22[n22.length] = s22 >> 8 & 255;
              break;
          }
          return n22;
        }, re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/, unarmor: function(t3) {
          var e3 = _.re.exec(t3);
          if (e3)
            if (e3[1])
              t3 = e3[1];
            else if (e3[2])
              t3 = e3[2];
            else
              throw new Error("RegExp out of sync");
          return _.decode(t3);
        } };
        var w = 1e13;
        var S = function() {
          function t3(t4) {
            this.buf = [+t4 || 0];
          }
          t3.prototype.mulAdd = function(t4, e3) {
            var r3 = this.buf;
            var i3 = r3.length;
            var n22;
            var s22;
            for (n22 = 0; n22 < i3; ++n22) {
              s22 = r3[n22] * t4 + e3;
              if (s22 < w)
                e3 = 0;
              else {
                e3 = 0 | s22 / w;
                s22 -= e3 * w;
              }
              r3[n22] = s22;
            }
            if (e3 > 0)
              r3[n22] = e3;
          };
          t3.prototype.sub = function(t4) {
            var e3 = this.buf;
            var r3 = e3.length;
            var i3;
            var n22;
            for (i3 = 0; i3 < r3; ++i3) {
              n22 = e3[i3] - t4;
              if (n22 < 0) {
                n22 += w;
                t4 = 1;
              } else
                t4 = 0;
              e3[i3] = n22;
            }
            while (e3[e3.length - 1] === 0)
              e3.pop();
          };
          t3.prototype.toString = function(t4) {
            if ((t4 || 10) != 10)
              throw new Error("only base 10 is supported");
            var e3 = this.buf;
            var r3 = e3[e3.length - 1].toString();
            for (var i3 = e3.length - 2; i3 >= 0; --i3)
              r3 += (w + e3[i3]).toString().substring(1);
            return r3;
          };
          t3.prototype.valueOf = function() {
            var t4 = this.buf;
            var e3 = 0;
            for (var r3 = t4.length - 1; r3 >= 0; --r3)
              e3 = e3 * w + t4[r3];
            return e3;
          };
          t3.prototype.simplify = function() {
            var t4 = this.buf;
            return t4.length == 1 ? t4[0] : this;
          };
          return t3;
        }();
        var b = "…";
        var E = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
        var D = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
        function T(t3, e3) {
          if (t3.length > e3)
            t3 = t3.substring(0, e3) + b;
          return t3;
        }
        var M = function() {
          function t3(e3, r3) {
            this.hexDigits = "0123456789ABCDEF";
            if (e3 instanceof t3) {
              this.enc = e3.enc;
              this.pos = e3.pos;
            } else {
              this.enc = e3;
              this.pos = r3;
            }
          }
          t3.prototype.get = function(t4) {
            if (t4 === void 0)
              t4 = this.pos++;
            if (t4 >= this.enc.length)
              throw new Error("Requesting byte offset " + t4 + " on a stream of length " + this.enc.length);
            return "string" === typeof this.enc ? this.enc.charCodeAt(t4) : this.enc[t4];
          };
          t3.prototype.hexByte = function(t4) {
            return this.hexDigits.charAt(t4 >> 4 & 15) + this.hexDigits.charAt(t4 & 15);
          };
          t3.prototype.hexDump = function(t4, e3, r3) {
            var i3 = "";
            for (var n22 = t4; n22 < e3; ++n22) {
              i3 += this.hexByte(this.get(n22));
              if (r3 !== true)
                switch (n22 & 15) {
                  case 7:
                    i3 += "  ";
                    break;
                  case 15:
                    i3 += "\n";
                    break;
                  default:
                    i3 += " ";
                }
            }
            return i3;
          };
          t3.prototype.isASCII = function(t4, e3) {
            for (var r3 = t4; r3 < e3; ++r3) {
              var i3 = this.get(r3);
              if (i3 < 32 || i3 > 176)
                return false;
            }
            return true;
          };
          t3.prototype.parseStringISO = function(t4, e3) {
            var r3 = "";
            for (var i3 = t4; i3 < e3; ++i3)
              r3 += String.fromCharCode(this.get(i3));
            return r3;
          };
          t3.prototype.parseStringUTF = function(t4, e3) {
            var r3 = "";
            for (var i3 = t4; i3 < e3; ) {
              var n22 = this.get(i3++);
              if (n22 < 128)
                r3 += String.fromCharCode(n22);
              else if (n22 > 191 && n22 < 224)
                r3 += String.fromCharCode((n22 & 31) << 6 | this.get(i3++) & 63);
              else
                r3 += String.fromCharCode((n22 & 15) << 12 | (this.get(i3++) & 63) << 6 | this.get(i3++) & 63);
            }
            return r3;
          };
          t3.prototype.parseStringBMP = function(t4, e3) {
            var r3 = "";
            var i3;
            var n22;
            for (var s22 = t4; s22 < e3; ) {
              i3 = this.get(s22++);
              n22 = this.get(s22++);
              r3 += String.fromCharCode(i3 << 8 | n22);
            }
            return r3;
          };
          t3.prototype.parseTime = function(t4, e3, r3) {
            var i3 = this.parseStringISO(t4, e3);
            var n22 = (r3 ? E : D).exec(i3);
            if (!n22)
              return "Unrecognized time: " + i3;
            if (r3) {
              n22[1] = +n22[1];
              n22[1] += +n22[1] < 70 ? 2e3 : 1900;
            }
            i3 = n22[1] + "-" + n22[2] + "-" + n22[3] + " " + n22[4];
            if (n22[5]) {
              i3 += ":" + n22[5];
              if (n22[6]) {
                i3 += ":" + n22[6];
                if (n22[7])
                  i3 += "." + n22[7];
              }
            }
            if (n22[8]) {
              i3 += " UTC";
              if (n22[8] != "Z") {
                i3 += n22[8];
                if (n22[9])
                  i3 += ":" + n22[9];
              }
            }
            return i3;
          };
          t3.prototype.parseInteger = function(t4, e3) {
            var r3 = this.get(t4);
            var i3 = r3 > 127;
            var n22 = i3 ? 255 : 0;
            var s22;
            var a2 = "";
            while (r3 == n22 && ++t4 < e3)
              r3 = this.get(t4);
            s22 = e3 - t4;
            if (s22 === 0)
              return i3 ? -1 : 0;
            if (s22 > 4) {
              a2 = r3;
              s22 <<= 3;
              while (((+a2 ^ n22) & 128) == 0) {
                a2 = +a2 << 1;
                --s22;
              }
              a2 = "(" + s22 + " bit)\n";
            }
            if (i3)
              r3 -= 256;
            var o2 = new S(r3);
            for (var u2 = t4 + 1; u2 < e3; ++u2)
              o2.mulAdd(256, this.get(u2));
            return a2 + o2.toString();
          };
          t3.prototype.parseBitString = function(t4, e3, r3) {
            var i3 = this.get(t4);
            var n22 = (e3 - t4 - 1 << 3) - i3;
            var s22 = "(" + n22 + " bit)\n";
            var a2 = "";
            for (var o2 = t4 + 1; o2 < e3; ++o2) {
              var u2 = this.get(o2);
              var c2 = o2 == e3 - 1 ? i3 : 0;
              for (var l2 = 7; l2 >= c2; --l2)
                a2 += u2 >> l2 & 1 ? "1" : "0";
              if (a2.length > r3)
                return s22 + T(a2, r3);
            }
            return s22 + a2;
          };
          t3.prototype.parseOctetString = function(t4, e3, r3) {
            if (this.isASCII(t4, e3))
              return T(this.parseStringISO(t4, e3), r3);
            var i3 = e3 - t4;
            var n22 = "(" + i3 + " byte)\n";
            r3 /= 2;
            if (i3 > r3)
              e3 = t4 + r3;
            for (var s22 = t4; s22 < e3; ++s22)
              n22 += this.hexByte(this.get(s22));
            if (i3 > r3)
              n22 += b;
            return n22;
          };
          t3.prototype.parseOID = function(t4, e3, r3) {
            var i3 = "";
            var n22 = new S();
            var s22 = 0;
            for (var a2 = t4; a2 < e3; ++a2) {
              var o2 = this.get(a2);
              n22.mulAdd(128, o2 & 127);
              s22 += 7;
              if (!(o2 & 128)) {
                if (i3 === "") {
                  n22 = n22.simplify();
                  if (n22 instanceof S) {
                    n22.sub(80);
                    i3 = "2." + n22.toString();
                  } else {
                    var u2 = n22 < 80 ? n22 < 40 ? 0 : 1 : 2;
                    i3 = u2 + "." + (n22 - u2 * 40);
                  }
                } else
                  i3 += "." + n22.toString();
                if (i3.length > r3)
                  return T(i3, r3);
                n22 = new S();
                s22 = 0;
              }
            }
            if (s22 > 0)
              i3 += ".incomplete";
            return i3;
          };
          return t3;
        }();
        var I = function() {
          function t3(t4, e3, r3, i3, n22) {
            if (!(i3 instanceof A))
              throw new Error("Invalid tag value.");
            this.stream = t4;
            this.header = e3;
            this.length = r3;
            this.tag = i3;
            this.sub = n22;
          }
          t3.prototype.typeName = function() {
            switch (this.tag.tagClass) {
              case 0:
                switch (this.tag.tagNumber) {
                  case 0:
                    return "EOC";
                  case 1:
                    return "BOOLEAN";
                  case 2:
                    return "INTEGER";
                  case 3:
                    return "BIT_STRING";
                  case 4:
                    return "OCTET_STRING";
                  case 5:
                    return "NULL";
                  case 6:
                    return "OBJECT_IDENTIFIER";
                  case 7:
                    return "ObjectDescriptor";
                  case 8:
                    return "EXTERNAL";
                  case 9:
                    return "REAL";
                  case 10:
                    return "ENUMERATED";
                  case 11:
                    return "EMBEDDED_PDV";
                  case 12:
                    return "UTF8String";
                  case 16:
                    return "SEQUENCE";
                  case 17:
                    return "SET";
                  case 18:
                    return "NumericString";
                  case 19:
                    return "PrintableString";
                  case 20:
                    return "TeletexString";
                  case 21:
                    return "VideotexString";
                  case 22:
                    return "IA5String";
                  case 23:
                    return "UTCTime";
                  case 24:
                    return "GeneralizedTime";
                  case 25:
                    return "GraphicString";
                  case 26:
                    return "VisibleString";
                  case 27:
                    return "GeneralString";
                  case 28:
                    return "UniversalString";
                  case 30:
                    return "BMPString";
                }
                return "Universal_" + this.tag.tagNumber.toString();
              case 1:
                return "Application_" + this.tag.tagNumber.toString();
              case 2:
                return "[" + this.tag.tagNumber.toString() + "]";
              case 3:
                return "Private_" + this.tag.tagNumber.toString();
            }
          };
          t3.prototype.content = function(t4) {
            if (this.tag === void 0)
              return null;
            if (t4 === void 0)
              t4 = 1 / 0;
            var e3 = this.posContent();
            var r3 = Math.abs(this.length);
            if (!this.tag.isUniversal()) {
              if (this.sub !== null)
                return "(" + this.sub.length + " elem)";
              return this.stream.parseOctetString(e3, e3 + r3, t4);
            }
            switch (this.tag.tagNumber) {
              case 1:
                return this.stream.get(e3) === 0 ? "false" : "true";
              case 2:
                return this.stream.parseInteger(e3, e3 + r3);
              case 3:
                return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(e3, e3 + r3, t4);
              case 4:
                return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e3, e3 + r3, t4);
              case 6:
                return this.stream.parseOID(e3, e3 + r3, t4);
              case 16:
              case 17:
                if (this.sub !== null)
                  return "(" + this.sub.length + " elem)";
                else
                  return "(no elem)";
              case 12:
                return T(this.stream.parseStringUTF(e3, e3 + r3), t4);
              case 18:
              case 19:
              case 20:
              case 21:
              case 22:
              case 26:
                return T(this.stream.parseStringISO(e3, e3 + r3), t4);
              case 30:
                return T(this.stream.parseStringBMP(e3, e3 + r3), t4);
              case 23:
              case 24:
                return this.stream.parseTime(e3, e3 + r3, this.tag.tagNumber == 23);
            }
            return null;
          };
          t3.prototype.toString = function() {
            return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (this.sub === null ? "null" : this.sub.length) + "]";
          };
          t3.prototype.toPrettyString = function(t4) {
            if (t4 === void 0)
              t4 = "";
            var e3 = t4 + this.typeName() + " @" + this.stream.pos;
            if (this.length >= 0)
              e3 += "+";
            e3 += this.length;
            if (this.tag.tagConstructed)
              e3 += " (constructed)";
            else if (this.tag.isUniversal() && (this.tag.tagNumber == 3 || this.tag.tagNumber == 4) && this.sub !== null)
              e3 += " (encapsulates)";
            e3 += "\n";
            if (this.sub !== null) {
              t4 += "  ";
              for (var r3 = 0, i3 = this.sub.length; r3 < i3; ++r3)
                e3 += this.sub[r3].toPrettyString(t4);
            }
            return e3;
          };
          t3.prototype.posStart = function() {
            return this.stream.pos;
          };
          t3.prototype.posContent = function() {
            return this.stream.pos + this.header;
          };
          t3.prototype.posEnd = function() {
            return this.stream.pos + this.header + Math.abs(this.length);
          };
          t3.prototype.toHexString = function() {
            return this.stream.hexDump(this.posStart(), this.posEnd(), true);
          };
          t3.decodeLength = function(t4) {
            var e3 = t4.get();
            var r3 = e3 & 127;
            if (r3 == e3)
              return r3;
            if (r3 > 6)
              throw new Error("Length over 48 bits not supported at position " + (t4.pos - 1));
            if (r3 === 0)
              return null;
            e3 = 0;
            for (var i3 = 0; i3 < r3; ++i3)
              e3 = e3 * 256 + t4.get();
            return e3;
          };
          t3.prototype.getHexStringValue = function() {
            var t4 = this.toHexString();
            var e3 = this.header * 2;
            var r3 = this.length * 2;
            return t4.substr(e3, r3);
          };
          t3.decode = function(e3) {
            var r3;
            if (!(e3 instanceof M))
              r3 = new M(e3, 0);
            else
              r3 = e3;
            var i3 = new M(r3);
            var n22 = new A(r3);
            var s22 = t3.decodeLength(r3);
            var a2 = r3.pos;
            var o2 = a2 - i3.pos;
            var u2 = null;
            var c2 = function() {
              var e4 = [];
              if (s22 !== null) {
                var i4 = a2 + s22;
                while (r3.pos < i4)
                  e4[e4.length] = t3.decode(r3);
                if (r3.pos != i4)
                  throw new Error("Content size is not correct for container starting at offset " + a2);
              } else
                try {
                  for (; ; ) {
                    var n3 = t3.decode(r3);
                    if (n3.tag.isEOC())
                      break;
                    e4[e4.length] = n3;
                  }
                  s22 = a2 - r3.pos;
                } catch (t4) {
                  throw new Error("Exception while decoding undefined length content: " + t4);
                }
              return e4;
            };
            if (n22.tagConstructed)
              u2 = c2();
            else if (n22.isUniversal() && (n22.tagNumber == 3 || n22.tagNumber == 4))
              try {
                if (n22.tagNumber == 3) {
                  if (r3.get() != 0)
                    throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
                }
                u2 = c2();
                for (var l2 = 0; l2 < u2.length; ++l2)
                  if (u2[l2].tag.isEOC())
                    throw new Error("EOC is not supposed to be actual content.");
              } catch (t4) {
                u2 = null;
              }
            if (u2 === null) {
              if (s22 === null)
                throw new Error("We can't skip over an invalid tag with undefined length at offset " + a2);
              r3.pos = a2 + Math.abs(s22);
            }
            return new t3(i3, o2, s22, n22, u2);
          };
          return t3;
        }();
        var A = function() {
          function t3(t4) {
            var e3 = t4.get();
            this.tagClass = e3 >> 6;
            this.tagConstructed = (e3 & 32) !== 0;
            this.tagNumber = e3 & 31;
            if (this.tagNumber == 31) {
              var r3 = new S();
              do {
                e3 = t4.get();
                r3.mulAdd(128, e3 & 127);
              } while (e3 & 128);
              this.tagNumber = r3.simplify();
            }
          }
          t3.prototype.isUniversal = function() {
            return this.tagClass === 0;
          };
          t3.prototype.isEOC = function() {
            return this.tagClass === 0 && this.tagNumber === 0;
          };
          return t3;
        }();
        var R;
        var x = 244837814094590;
        var B = (x & 16777215) == 15715070;
        var C = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
        var O = (1 << 26) / C[C.length - 1];
        var k = function() {
          function t3(t4, e3, r3) {
            if (t4 != null)
              if ("number" == typeof t4)
                this.fromNumber(t4, e3, r3);
              else if (e3 == null && "string" != typeof t4)
                this.fromString(t4, 256);
              else
                this.fromString(t4, e3);
          }
          t3.prototype.toString = function(t4) {
            if (this.s < 0)
              return "-" + this.negate().toString(t4);
            var e3;
            if (t4 == 16)
              e3 = 4;
            else if (t4 == 8)
              e3 = 3;
            else if (t4 == 2)
              e3 = 1;
            else if (t4 == 32)
              e3 = 5;
            else if (t4 == 4)
              e3 = 2;
            else
              return this.toRadix(t4);
            var r3 = (1 << e3) - 1;
            var i3;
            var s22 = false;
            var a2 = "";
            var o2 = this.t;
            var u2 = this.DB - o2 * this.DB % e3;
            if (o2-- > 0) {
              if (u2 < this.DB && (i3 = this[o2] >> u2) > 0) {
                s22 = true;
                a2 = n2(i3);
              }
              while (o2 >= 0) {
                if (u2 < e3) {
                  i3 = (this[o2] & (1 << u2) - 1) << e3 - u2;
                  i3 |= this[--o2] >> (u2 += this.DB - e3);
                } else {
                  i3 = this[o2] >> (u2 -= e3) & r3;
                  if (u2 <= 0) {
                    u2 += this.DB;
                    --o2;
                  }
                }
                if (i3 > 0)
                  s22 = true;
                if (s22)
                  a2 += n2(i3);
              }
            }
            return s22 ? a2 : "0";
          };
          t3.prototype.negate = function() {
            var e3 = L();
            t3.ZERO.subTo(this, e3);
            return e3;
          };
          t3.prototype.abs = function() {
            return this.s < 0 ? this.negate() : this;
          };
          t3.prototype.compareTo = function(t4) {
            var e3 = this.s - t4.s;
            if (e3 != 0)
              return e3;
            var r3 = this.t;
            e3 = r3 - t4.t;
            if (e3 != 0)
              return this.s < 0 ? -e3 : e3;
            while (--r3 >= 0)
              if ((e3 = this[r3] - t4[r3]) != 0)
                return e3;
            return 0;
          };
          t3.prototype.bitLength = function() {
            if (this.t <= 0)
              return 0;
            return this.DB * (this.t - 1) + W(this[this.t - 1] ^ this.s & this.DM);
          };
          t3.prototype.mod = function(e3) {
            var r3 = L();
            this.abs().divRemTo(e3, null, r3);
            if (this.s < 0 && r3.compareTo(t3.ZERO) > 0)
              e3.subTo(r3, r3);
            return r3;
          };
          t3.prototype.modPowInt = function(t4, e3) {
            var r3;
            if (t4 < 256 || e3.isEven())
              r3 = new P(e3);
            else
              r3 = new V(e3);
            return this.exp(t4, r3);
          };
          t3.prototype.clone = function() {
            var t4 = L();
            this.copyTo(t4);
            return t4;
          };
          t3.prototype.intValue = function() {
            if (this.s < 0) {
              if (this.t == 1)
                return this[0] - this.DV;
              else if (this.t == 0)
                return -1;
            } else if (this.t == 1)
              return this[0];
            else if (this.t == 0)
              return 0;
            return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
          };
          t3.prototype.byteValue = function() {
            return this.t == 0 ? this.s : this[0] << 24 >> 24;
          };
          t3.prototype.shortValue = function() {
            return this.t == 0 ? this.s : this[0] << 16 >> 16;
          };
          t3.prototype.signum = function() {
            if (this.s < 0)
              return -1;
            else if (this.t <= 0 || this.t == 1 && this[0] <= 0)
              return 0;
            else
              return 1;
          };
          t3.prototype.toByteArray = function() {
            var t4 = this.t;
            var e3 = [];
            e3[0] = this.s;
            var r3 = this.DB - t4 * this.DB % 8;
            var i3;
            var n22 = 0;
            if (t4-- > 0) {
              if (r3 < this.DB && (i3 = this[t4] >> r3) != (this.s & this.DM) >> r3)
                e3[n22++] = i3 | this.s << this.DB - r3;
              while (t4 >= 0) {
                if (r3 < 8) {
                  i3 = (this[t4] & (1 << r3) - 1) << 8 - r3;
                  i3 |= this[--t4] >> (r3 += this.DB - 8);
                } else {
                  i3 = this[t4] >> (r3 -= 8) & 255;
                  if (r3 <= 0) {
                    r3 += this.DB;
                    --t4;
                  }
                }
                if ((i3 & 128) != 0)
                  i3 |= -256;
                if (n22 == 0 && (this.s & 128) != (i3 & 128))
                  ++n22;
                if (n22 > 0 || i3 != this.s)
                  e3[n22++] = i3;
              }
            }
            return e3;
          };
          t3.prototype.equals = function(t4) {
            return this.compareTo(t4) == 0;
          };
          t3.prototype.min = function(t4) {
            return this.compareTo(t4) < 0 ? this : t4;
          };
          t3.prototype.max = function(t4) {
            return this.compareTo(t4) > 0 ? this : t4;
          };
          t3.prototype.and = function(t4) {
            var e3 = L();
            this.bitwiseTo(t4, s2, e3);
            return e3;
          };
          t3.prototype.or = function(t4) {
            var e3 = L();
            this.bitwiseTo(t4, a, e3);
            return e3;
          };
          t3.prototype.xor = function(t4) {
            var e3 = L();
            this.bitwiseTo(t4, o, e3);
            return e3;
          };
          t3.prototype.andNot = function(t4) {
            var e3 = L();
            this.bitwiseTo(t4, u, e3);
            return e3;
          };
          t3.prototype.not = function() {
            var t4 = L();
            for (var e3 = 0; e3 < this.t; ++e3)
              t4[e3] = this.DM & ~this[e3];
            t4.t = this.t;
            t4.s = ~this.s;
            return t4;
          };
          t3.prototype.shiftLeft = function(t4) {
            var e3 = L();
            if (t4 < 0)
              this.rShiftTo(-t4, e3);
            else
              this.lShiftTo(t4, e3);
            return e3;
          };
          t3.prototype.shiftRight = function(t4) {
            var e3 = L();
            if (t4 < 0)
              this.lShiftTo(-t4, e3);
            else
              this.rShiftTo(t4, e3);
            return e3;
          };
          t3.prototype.getLowestSetBit = function() {
            for (var t4 = 0; t4 < this.t; ++t4)
              if (this[t4] != 0)
                return t4 * this.DB + c(this[t4]);
            if (this.s < 0)
              return this.t * this.DB;
            return -1;
          };
          t3.prototype.bitCount = function() {
            var t4 = 0;
            var e3 = this.s & this.DM;
            for (var r3 = 0; r3 < this.t; ++r3)
              t4 += l(this[r3] ^ e3);
            return t4;
          };
          t3.prototype.testBit = function(t4) {
            var e3 = Math.floor(t4 / this.DB);
            if (e3 >= this.t)
              return this.s != 0;
            return (this[e3] & 1 << t4 % this.DB) != 0;
          };
          t3.prototype.setBit = function(t4) {
            return this.changeBit(t4, a);
          };
          t3.prototype.clearBit = function(t4) {
            return this.changeBit(t4, u);
          };
          t3.prototype.flipBit = function(t4) {
            return this.changeBit(t4, o);
          };
          t3.prototype.add = function(t4) {
            var e3 = L();
            this.addTo(t4, e3);
            return e3;
          };
          t3.prototype.subtract = function(t4) {
            var e3 = L();
            this.subTo(t4, e3);
            return e3;
          };
          t3.prototype.multiply = function(t4) {
            var e3 = L();
            this.multiplyTo(t4, e3);
            return e3;
          };
          t3.prototype.divide = function(t4) {
            var e3 = L();
            this.divRemTo(t4, e3, null);
            return e3;
          };
          t3.prototype.remainder = function(t4) {
            var e3 = L();
            this.divRemTo(t4, null, e3);
            return e3;
          };
          t3.prototype.divideAndRemainder = function(t4) {
            var e3 = L();
            var r3 = L();
            this.divRemTo(t4, e3, r3);
            return [e3, r3];
          };
          t3.prototype.modPow = function(t4, e3) {
            var r3 = t4.bitLength();
            var i3;
            var n22 = Y(1);
            var s22;
            if (r3 <= 0)
              return n22;
            else if (r3 < 18)
              i3 = 1;
            else if (r3 < 48)
              i3 = 3;
            else if (r3 < 144)
              i3 = 4;
            else if (r3 < 768)
              i3 = 5;
            else
              i3 = 6;
            if (r3 < 8)
              s22 = new P(e3);
            else if (e3.isEven())
              s22 = new H(e3);
            else
              s22 = new V(e3);
            var a2 = [];
            var o2 = 3;
            var u2 = i3 - 1;
            var c2 = (1 << i3) - 1;
            a2[1] = s22.convert(this);
            if (i3 > 1) {
              var l2 = L();
              s22.sqrTo(a2[1], l2);
              while (o2 <= c2) {
                a2[o2] = L();
                s22.mulTo(l2, a2[o2 - 2], a2[o2]);
                o2 += 2;
              }
            }
            var f2 = t4.t - 1;
            var h2;
            var d2 = true;
            var v2 = L();
            var p;
            r3 = W(t4[f2]) - 1;
            while (f2 >= 0) {
              if (r3 >= u2)
                h2 = t4[f2] >> r3 - u2 & c2;
              else {
                h2 = (t4[f2] & (1 << r3 + 1) - 1) << u2 - r3;
                if (f2 > 0)
                  h2 |= t4[f2 - 1] >> this.DB + r3 - u2;
              }
              o2 = i3;
              while ((h2 & 1) == 0) {
                h2 >>= 1;
                --o2;
              }
              if ((r3 -= o2) < 0) {
                r3 += this.DB;
                --f2;
              }
              if (d2) {
                a2[h2].copyTo(n22);
                d2 = false;
              } else {
                while (o2 > 1) {
                  s22.sqrTo(n22, v2);
                  s22.sqrTo(v2, n22);
                  o2 -= 2;
                }
                if (o2 > 0)
                  s22.sqrTo(n22, v2);
                else {
                  p = n22;
                  n22 = v2;
                  v2 = p;
                }
                s22.mulTo(v2, a2[h2], n22);
              }
              while (f2 >= 0 && (t4[f2] & 1 << r3) == 0) {
                s22.sqrTo(n22, v2);
                p = n22;
                n22 = v2;
                v2 = p;
                if (--r3 < 0) {
                  r3 = this.DB - 1;
                  --f2;
                }
              }
            }
            return s22.revert(n22);
          };
          t3.prototype.modInverse = function(e3) {
            var r3 = e3.isEven();
            if (this.isEven() && r3 || e3.signum() == 0)
              return t3.ZERO;
            var i3 = e3.clone();
            var n22 = this.clone();
            var s22 = Y(1);
            var a2 = Y(0);
            var o2 = Y(0);
            var u2 = Y(1);
            while (i3.signum() != 0) {
              while (i3.isEven()) {
                i3.rShiftTo(1, i3);
                if (r3) {
                  if (!s22.isEven() || !a2.isEven()) {
                    s22.addTo(this, s22);
                    a2.subTo(e3, a2);
                  }
                  s22.rShiftTo(1, s22);
                } else if (!a2.isEven())
                  a2.subTo(e3, a2);
                a2.rShiftTo(1, a2);
              }
              while (n22.isEven()) {
                n22.rShiftTo(1, n22);
                if (r3) {
                  if (!o2.isEven() || !u2.isEven()) {
                    o2.addTo(this, o2);
                    u2.subTo(e3, u2);
                  }
                  o2.rShiftTo(1, o2);
                } else if (!u2.isEven())
                  u2.subTo(e3, u2);
                u2.rShiftTo(1, u2);
              }
              if (i3.compareTo(n22) >= 0) {
                i3.subTo(n22, i3);
                if (r3)
                  s22.subTo(o2, s22);
                a2.subTo(u2, a2);
              } else {
                n22.subTo(i3, n22);
                if (r3)
                  o2.subTo(s22, o2);
                u2.subTo(a2, u2);
              }
            }
            if (n22.compareTo(t3.ONE) != 0)
              return t3.ZERO;
            if (u2.compareTo(e3) >= 0)
              return u2.subtract(e3);
            if (u2.signum() < 0)
              u2.addTo(e3, u2);
            else
              return u2;
            if (u2.signum() < 0)
              return u2.add(e3);
            else
              return u2;
          };
          t3.prototype.pow = function(t4) {
            return this.exp(t4, new N());
          };
          t3.prototype.gcd = function(t4) {
            var e3 = this.s < 0 ? this.negate() : this.clone();
            var r3 = t4.s < 0 ? t4.negate() : t4.clone();
            if (e3.compareTo(r3) < 0) {
              var i3 = e3;
              e3 = r3;
              r3 = i3;
            }
            var n22 = e3.getLowestSetBit();
            var s22 = r3.getLowestSetBit();
            if (s22 < 0)
              return e3;
            if (n22 < s22)
              s22 = n22;
            if (s22 > 0) {
              e3.rShiftTo(s22, e3);
              r3.rShiftTo(s22, r3);
            }
            while (e3.signum() > 0) {
              if ((n22 = e3.getLowestSetBit()) > 0)
                e3.rShiftTo(n22, e3);
              if ((n22 = r3.getLowestSetBit()) > 0)
                r3.rShiftTo(n22, r3);
              if (e3.compareTo(r3) >= 0) {
                e3.subTo(r3, e3);
                e3.rShiftTo(1, e3);
              } else {
                r3.subTo(e3, r3);
                r3.rShiftTo(1, r3);
              }
            }
            if (s22 > 0)
              r3.lShiftTo(s22, r3);
            return r3;
          };
          t3.prototype.isProbablePrime = function(t4) {
            var e3;
            var r3 = this.abs();
            if (r3.t == 1 && r3[0] <= C[C.length - 1]) {
              for (e3 = 0; e3 < C.length; ++e3)
                if (r3[0] == C[e3])
                  return true;
              return false;
            }
            if (r3.isEven())
              return false;
            e3 = 1;
            while (e3 < C.length) {
              var i3 = C[e3];
              var n22 = e3 + 1;
              while (n22 < C.length && i3 < O)
                i3 *= C[n22++];
              i3 = r3.modInt(i3);
              while (e3 < n22)
                if (i3 % C[e3++] == 0)
                  return false;
            }
            return r3.millerRabin(t4);
          };
          t3.prototype.copyTo = function(t4) {
            for (var e3 = this.t - 1; e3 >= 0; --e3)
              t4[e3] = this[e3];
            t4.t = this.t;
            t4.s = this.s;
          };
          t3.prototype.fromInt = function(t4) {
            this.t = 1;
            this.s = t4 < 0 ? -1 : 0;
            if (t4 > 0)
              this[0] = t4;
            else if (t4 < -1)
              this[0] = t4 + this.DV;
            else
              this.t = 0;
          };
          t3.prototype.fromString = function(e3, r3) {
            var i3;
            if (r3 == 16)
              i3 = 4;
            else if (r3 == 8)
              i3 = 3;
            else if (r3 == 256)
              i3 = 8;
            else if (r3 == 2)
              i3 = 1;
            else if (r3 == 32)
              i3 = 5;
            else if (r3 == 4)
              i3 = 2;
            else {
              this.fromRadix(e3, r3);
              return;
            }
            this.t = 0;
            this.s = 0;
            var n22 = e3.length;
            var s22 = false;
            var a2 = 0;
            while (--n22 >= 0) {
              var o2 = i3 == 8 ? +e3[n22] & 255 : G(e3, n22);
              if (o2 < 0) {
                if (e3.charAt(n22) == "-")
                  s22 = true;
                continue;
              }
              s22 = false;
              if (a2 == 0)
                this[this.t++] = o2;
              else if (a2 + i3 > this.DB) {
                this[this.t - 1] |= (o2 & (1 << this.DB - a2) - 1) << a2;
                this[this.t++] = o2 >> this.DB - a2;
              } else
                this[this.t - 1] |= o2 << a2;
              a2 += i3;
              if (a2 >= this.DB)
                a2 -= this.DB;
            }
            if (i3 == 8 && (+e3[0] & 128) != 0) {
              this.s = -1;
              if (a2 > 0)
                this[this.t - 1] |= (1 << this.DB - a2) - 1 << a2;
            }
            this.clamp();
            if (s22)
              t3.ZERO.subTo(this, this);
          };
          t3.prototype.clamp = function() {
            var t4 = this.s & this.DM;
            while (this.t > 0 && this[this.t - 1] == t4)
              --this.t;
          };
          t3.prototype.dlShiftTo = function(t4, e3) {
            var r3;
            for (r3 = this.t - 1; r3 >= 0; --r3)
              e3[r3 + t4] = this[r3];
            for (r3 = t4 - 1; r3 >= 0; --r3)
              e3[r3] = 0;
            e3.t = this.t + t4;
            e3.s = this.s;
          };
          t3.prototype.drShiftTo = function(t4, e3) {
            for (var r3 = t4; r3 < this.t; ++r3)
              e3[r3 - t4] = this[r3];
            e3.t = Math.max(this.t - t4, 0);
            e3.s = this.s;
          };
          t3.prototype.lShiftTo = function(t4, e3) {
            var r3 = t4 % this.DB;
            var i3 = this.DB - r3;
            var n22 = (1 << i3) - 1;
            var s22 = Math.floor(t4 / this.DB);
            var a2 = this.s << r3 & this.DM;
            for (var o2 = this.t - 1; o2 >= 0; --o2) {
              e3[o2 + s22 + 1] = this[o2] >> i3 | a2;
              a2 = (this[o2] & n22) << r3;
            }
            for (var o2 = s22 - 1; o2 >= 0; --o2)
              e3[o2] = 0;
            e3[s22] = a2;
            e3.t = this.t + s22 + 1;
            e3.s = this.s;
            e3.clamp();
          };
          t3.prototype.rShiftTo = function(t4, e3) {
            e3.s = this.s;
            var r3 = Math.floor(t4 / this.DB);
            if (r3 >= this.t) {
              e3.t = 0;
              return;
            }
            var i3 = t4 % this.DB;
            var n22 = this.DB - i3;
            var s22 = (1 << i3) - 1;
            e3[0] = this[r3] >> i3;
            for (var a2 = r3 + 1; a2 < this.t; ++a2) {
              e3[a2 - r3 - 1] |= (this[a2] & s22) << n22;
              e3[a2 - r3] = this[a2] >> i3;
            }
            if (i3 > 0)
              e3[this.t - r3 - 1] |= (this.s & s22) << n22;
            e3.t = this.t - r3;
            e3.clamp();
          };
          t3.prototype.subTo = function(t4, e3) {
            var r3 = 0;
            var i3 = 0;
            var n22 = Math.min(t4.t, this.t);
            while (r3 < n22) {
              i3 += this[r3] - t4[r3];
              e3[r3++] = i3 & this.DM;
              i3 >>= this.DB;
            }
            if (t4.t < this.t) {
              i3 -= t4.s;
              while (r3 < this.t) {
                i3 += this[r3];
                e3[r3++] = i3 & this.DM;
                i3 >>= this.DB;
              }
              i3 += this.s;
            } else {
              i3 += this.s;
              while (r3 < t4.t) {
                i3 -= t4[r3];
                e3[r3++] = i3 & this.DM;
                i3 >>= this.DB;
              }
              i3 -= t4.s;
            }
            e3.s = i3 < 0 ? -1 : 0;
            if (i3 < -1)
              e3[r3++] = this.DV + i3;
            else if (i3 > 0)
              e3[r3++] = i3;
            e3.t = r3;
            e3.clamp();
          };
          t3.prototype.multiplyTo = function(e3, r3) {
            var i3 = this.abs();
            var n22 = e3.abs();
            var s22 = i3.t;
            r3.t = s22 + n22.t;
            while (--s22 >= 0)
              r3[s22] = 0;
            for (s22 = 0; s22 < n22.t; ++s22)
              r3[s22 + i3.t] = i3.am(0, n22[s22], r3, s22, 0, i3.t);
            r3.s = 0;
            r3.clamp();
            if (this.s != e3.s)
              t3.ZERO.subTo(r3, r3);
          };
          t3.prototype.squareTo = function(t4) {
            var e3 = this.abs();
            var r3 = t4.t = 2 * e3.t;
            while (--r3 >= 0)
              t4[r3] = 0;
            for (r3 = 0; r3 < e3.t - 1; ++r3) {
              var i3 = e3.am(r3, e3[r3], t4, 2 * r3, 0, 1);
              if ((t4[r3 + e3.t] += e3.am(r3 + 1, 2 * e3[r3], t4, 2 * r3 + 1, i3, e3.t - r3 - 1)) >= e3.DV) {
                t4[r3 + e3.t] -= e3.DV;
                t4[r3 + e3.t + 1] = 1;
              }
            }
            if (t4.t > 0)
              t4[t4.t - 1] += e3.am(r3, e3[r3], t4, 2 * r3, 0, 1);
            t4.s = 0;
            t4.clamp();
          };
          t3.prototype.divRemTo = function(e3, r3, i3) {
            var n22 = e3.abs();
            if (n22.t <= 0)
              return;
            var s22 = this.abs();
            if (s22.t < n22.t) {
              if (r3 != null)
                r3.fromInt(0);
              if (i3 != null)
                this.copyTo(i3);
              return;
            }
            if (i3 == null)
              i3 = L();
            var a2 = L();
            var o2 = this.s;
            var u2 = e3.s;
            var c2 = this.DB - W(n22[n22.t - 1]);
            if (c2 > 0) {
              n22.lShiftTo(c2, a2);
              s22.lShiftTo(c2, i3);
            } else {
              n22.copyTo(a2);
              s22.copyTo(i3);
            }
            var l2 = a2.t;
            var f2 = a2[l2 - 1];
            if (f2 == 0)
              return;
            var h2 = f2 * (1 << this.F1) + (l2 > 1 ? a2[l2 - 2] >> this.F2 : 0);
            var d2 = this.FV / h2;
            var v2 = (1 << this.F1) / h2;
            var p = 1 << this.F2;
            var g2 = i3.t;
            var y2 = g2 - l2;
            var m2 = r3 == null ? L() : r3;
            a2.dlShiftTo(y2, m2);
            if (i3.compareTo(m2) >= 0) {
              i3[i3.t++] = 1;
              i3.subTo(m2, i3);
            }
            t3.ONE.dlShiftTo(l2, m2);
            m2.subTo(a2, a2);
            while (a2.t < l2)
              a2[a2.t++] = 0;
            while (--y2 >= 0) {
              var _2 = i3[--g2] == f2 ? this.DM : Math.floor(i3[g2] * d2 + (i3[g2 - 1] + p) * v2);
              if ((i3[g2] += a2.am(0, _2, i3, y2, 0, l2)) < _2) {
                a2.dlShiftTo(y2, m2);
                i3.subTo(m2, i3);
                while (i3[g2] < --_2)
                  i3.subTo(m2, i3);
              }
            }
            if (r3 != null) {
              i3.drShiftTo(l2, r3);
              if (o2 != u2)
                t3.ZERO.subTo(r3, r3);
            }
            i3.t = l2;
            i3.clamp();
            if (c2 > 0)
              i3.rShiftTo(c2, i3);
            if (o2 < 0)
              t3.ZERO.subTo(i3, i3);
          };
          t3.prototype.invDigit = function() {
            if (this.t < 1)
              return 0;
            var t4 = this[0];
            if ((t4 & 1) == 0)
              return 0;
            var e3 = t4 & 3;
            e3 = e3 * (2 - (t4 & 15) * e3) & 15;
            e3 = e3 * (2 - (t4 & 255) * e3) & 255;
            e3 = e3 * (2 - ((t4 & 65535) * e3 & 65535)) & 65535;
            e3 = e3 * (2 - t4 * e3 % this.DV) % this.DV;
            return e3 > 0 ? this.DV - e3 : -e3;
          };
          t3.prototype.isEven = function() {
            return (this.t > 0 ? this[0] & 1 : this.s) == 0;
          };
          t3.prototype.exp = function(e3, r3) {
            if (e3 > 4294967295 || e3 < 1)
              return t3.ONE;
            var i3 = L();
            var n22 = L();
            var s22 = r3.convert(this);
            var a2 = W(e3) - 1;
            s22.copyTo(i3);
            while (--a2 >= 0) {
              r3.sqrTo(i3, n22);
              if ((e3 & 1 << a2) > 0)
                r3.mulTo(n22, s22, i3);
              else {
                var o2 = i3;
                i3 = n22;
                n22 = o2;
              }
            }
            return r3.revert(i3);
          };
          t3.prototype.chunkSize = function(t4) {
            return Math.floor(Math.LN2 * this.DB / Math.log(t4));
          };
          t3.prototype.toRadix = function(t4) {
            if (t4 == null)
              t4 = 10;
            if (this.signum() == 0 || t4 < 2 || t4 > 36)
              return "0";
            var e3 = this.chunkSize(t4);
            var r3 = Math.pow(t4, e3);
            var i3 = Y(r3);
            var n22 = L();
            var s22 = L();
            var a2 = "";
            this.divRemTo(i3, n22, s22);
            while (n22.signum() > 0) {
              a2 = (r3 + s22.intValue()).toString(t4).substr(1) + a2;
              n22.divRemTo(i3, n22, s22);
            }
            return s22.intValue().toString(t4) + a2;
          };
          t3.prototype.fromRadix = function(e3, r3) {
            this.fromInt(0);
            if (r3 == null)
              r3 = 10;
            var i3 = this.chunkSize(r3);
            var n22 = Math.pow(r3, i3);
            var s22 = false;
            var a2 = 0;
            var o2 = 0;
            for (var u2 = 0; u2 < e3.length; ++u2) {
              var c2 = G(e3, u2);
              if (c2 < 0) {
                if (e3.charAt(u2) == "-" && this.signum() == 0)
                  s22 = true;
                continue;
              }
              o2 = r3 * o2 + c2;
              if (++a2 >= i3) {
                this.dMultiply(n22);
                this.dAddOffset(o2, 0);
                a2 = 0;
                o2 = 0;
              }
            }
            if (a2 > 0) {
              this.dMultiply(Math.pow(r3, a2));
              this.dAddOffset(o2, 0);
            }
            if (s22)
              t3.ZERO.subTo(this, this);
          };
          t3.prototype.fromNumber = function(e3, r3, i3) {
            if ("number" == typeof r3)
              if (e3 < 2)
                this.fromInt(1);
              else {
                this.fromNumber(e3, i3);
                if (!this.testBit(e3 - 1))
                  this.bitwiseTo(t3.ONE.shiftLeft(e3 - 1), a, this);
                if (this.isEven())
                  this.dAddOffset(1, 0);
                while (!this.isProbablePrime(r3)) {
                  this.dAddOffset(2, 0);
                  if (this.bitLength() > e3)
                    this.subTo(t3.ONE.shiftLeft(e3 - 1), this);
                }
              }
            else {
              var n22 = [];
              var s22 = e3 & 7;
              n22.length = (e3 >> 3) + 1;
              r3.nextBytes(n22);
              if (s22 > 0)
                n22[0] &= (1 << s22) - 1;
              else
                n22[0] = 0;
              this.fromString(n22, 256);
            }
          };
          t3.prototype.bitwiseTo = function(t4, e3, r3) {
            var i3;
            var n22;
            var s22 = Math.min(t4.t, this.t);
            for (i3 = 0; i3 < s22; ++i3)
              r3[i3] = e3(this[i3], t4[i3]);
            if (t4.t < this.t) {
              n22 = t4.s & this.DM;
              for (i3 = s22; i3 < this.t; ++i3)
                r3[i3] = e3(this[i3], n22);
              r3.t = this.t;
            } else {
              n22 = this.s & this.DM;
              for (i3 = s22; i3 < t4.t; ++i3)
                r3[i3] = e3(n22, t4[i3]);
              r3.t = t4.t;
            }
            r3.s = e3(this.s, t4.s);
            r3.clamp();
          };
          t3.prototype.changeBit = function(e3, r3) {
            var i3 = t3.ONE.shiftLeft(e3);
            this.bitwiseTo(i3, r3, i3);
            return i3;
          };
          t3.prototype.addTo = function(t4, e3) {
            var r3 = 0;
            var i3 = 0;
            var n22 = Math.min(t4.t, this.t);
            while (r3 < n22) {
              i3 += this[r3] + t4[r3];
              e3[r3++] = i3 & this.DM;
              i3 >>= this.DB;
            }
            if (t4.t < this.t) {
              i3 += t4.s;
              while (r3 < this.t) {
                i3 += this[r3];
                e3[r3++] = i3 & this.DM;
                i3 >>= this.DB;
              }
              i3 += this.s;
            } else {
              i3 += this.s;
              while (r3 < t4.t) {
                i3 += t4[r3];
                e3[r3++] = i3 & this.DM;
                i3 >>= this.DB;
              }
              i3 += t4.s;
            }
            e3.s = i3 < 0 ? -1 : 0;
            if (i3 > 0)
              e3[r3++] = i3;
            else if (i3 < -1)
              e3[r3++] = this.DV + i3;
            e3.t = r3;
            e3.clamp();
          };
          t3.prototype.dMultiply = function(t4) {
            this[this.t] = this.am(0, t4 - 1, this, 0, 0, this.t);
            ++this.t;
            this.clamp();
          };
          t3.prototype.dAddOffset = function(t4, e3) {
            if (t4 == 0)
              return;
            while (this.t <= e3)
              this[this.t++] = 0;
            this[e3] += t4;
            while (this[e3] >= this.DV) {
              this[e3] -= this.DV;
              if (++e3 >= this.t)
                this[this.t++] = 0;
              ++this[e3];
            }
          };
          t3.prototype.multiplyLowerTo = function(t4, e3, r3) {
            var i3 = Math.min(this.t + t4.t, e3);
            r3.s = 0;
            r3.t = i3;
            while (i3 > 0)
              r3[--i3] = 0;
            for (var n22 = r3.t - this.t; i3 < n22; ++i3)
              r3[i3 + this.t] = this.am(0, t4[i3], r3, i3, 0, this.t);
            for (var n22 = Math.min(t4.t, e3); i3 < n22; ++i3)
              this.am(0, t4[i3], r3, i3, 0, e3 - i3);
            r3.clamp();
          };
          t3.prototype.multiplyUpperTo = function(t4, e3, r3) {
            --e3;
            var i3 = r3.t = this.t + t4.t - e3;
            r3.s = 0;
            while (--i3 >= 0)
              r3[i3] = 0;
            for (i3 = Math.max(e3 - this.t, 0); i3 < t4.t; ++i3)
              r3[this.t + i3 - e3] = this.am(e3 - i3, t4[i3], r3, 0, 0, this.t + i3 - e3);
            r3.clamp();
            r3.drShiftTo(1, r3);
          };
          t3.prototype.modInt = function(t4) {
            if (t4 <= 0)
              return 0;
            var e3 = this.DV % t4;
            var r3 = this.s < 0 ? t4 - 1 : 0;
            if (this.t > 0)
              if (e3 == 0)
                r3 = this[0] % t4;
              else
                for (var i3 = this.t - 1; i3 >= 0; --i3)
                  r3 = (e3 * r3 + this[i3]) % t4;
            return r3;
          };
          t3.prototype.millerRabin = function(e3) {
            var r3 = this.subtract(t3.ONE);
            var i3 = r3.getLowestSetBit();
            if (i3 <= 0)
              return false;
            var n22 = r3.shiftRight(i3);
            e3 = e3 + 1 >> 1;
            if (e3 > C.length)
              e3 = C.length;
            var s22 = L();
            for (var a2 = 0; a2 < e3; ++a2) {
              s22.fromInt(C[Math.floor(Math.random() * C.length)]);
              var o2 = s22.modPow(n22, this);
              if (o2.compareTo(t3.ONE) != 0 && o2.compareTo(r3) != 0) {
                var u2 = 1;
                while (u2++ < i3 && o2.compareTo(r3) != 0) {
                  o2 = o2.modPowInt(2, this);
                  if (o2.compareTo(t3.ONE) == 0)
                    return false;
                }
                if (o2.compareTo(r3) != 0)
                  return false;
              }
            }
            return true;
          };
          t3.prototype.square = function() {
            var t4 = L();
            this.squareTo(t4);
            return t4;
          };
          t3.prototype.gcda = function(t4, e3) {
            var r3 = this.s < 0 ? this.negate() : this.clone();
            var i3 = t4.s < 0 ? t4.negate() : t4.clone();
            if (r3.compareTo(i3) < 0) {
              var n22 = r3;
              r3 = i3;
              i3 = n22;
            }
            var s22 = r3.getLowestSetBit();
            var a2 = i3.getLowestSetBit();
            if (a2 < 0) {
              e3(r3);
              return;
            }
            if (s22 < a2)
              a2 = s22;
            if (a2 > 0) {
              r3.rShiftTo(a2, r3);
              i3.rShiftTo(a2, i3);
            }
            var o2 = function() {
              if ((s22 = r3.getLowestSetBit()) > 0)
                r3.rShiftTo(s22, r3);
              if ((s22 = i3.getLowestSetBit()) > 0)
                i3.rShiftTo(s22, i3);
              if (r3.compareTo(i3) >= 0) {
                r3.subTo(i3, r3);
                r3.rShiftTo(1, r3);
              } else {
                i3.subTo(r3, i3);
                i3.rShiftTo(1, i3);
              }
              if (!(r3.signum() > 0)) {
                if (a2 > 0)
                  i3.lShiftTo(a2, i3);
                setTimeout(function() {
                  e3(i3);
                }, 0);
              } else
                setTimeout(o2, 0);
            };
            setTimeout(o2, 10);
          };
          t3.prototype.fromNumberAsync = function(e3, r3, i3, n22) {
            if ("number" == typeof r3)
              if (e3 < 2)
                this.fromInt(1);
              else {
                this.fromNumber(e3, i3);
                if (!this.testBit(e3 - 1))
                  this.bitwiseTo(t3.ONE.shiftLeft(e3 - 1), a, this);
                if (this.isEven())
                  this.dAddOffset(1, 0);
                var s22 = this;
                var o2 = function() {
                  s22.dAddOffset(2, 0);
                  if (s22.bitLength() > e3)
                    s22.subTo(t3.ONE.shiftLeft(e3 - 1), s22);
                  if (s22.isProbablePrime(r3))
                    setTimeout(function() {
                      n22();
                    }, 0);
                  else
                    setTimeout(o2, 0);
                };
                setTimeout(o2, 0);
              }
            else {
              var u2 = [];
              var c2 = e3 & 7;
              u2.length = (e3 >> 3) + 1;
              r3.nextBytes(u2);
              if (c2 > 0)
                u2[0] &= (1 << c2) - 1;
              else
                u2[0] = 0;
              this.fromString(u2, 256);
            }
          };
          return t3;
        }();
        var N = function() {
          function t3() {
          }
          t3.prototype.convert = function(t4) {
            return t4;
          };
          t3.prototype.revert = function(t4) {
            return t4;
          };
          t3.prototype.mulTo = function(t4, e3, r3) {
            t4.multiplyTo(e3, r3);
          };
          t3.prototype.sqrTo = function(t4, e3) {
            t4.squareTo(e3);
          };
          return t3;
        }();
        var P = function() {
          function t3(t4) {
            this.m = t4;
          }
          t3.prototype.convert = function(t4) {
            if (t4.s < 0 || t4.compareTo(this.m) >= 0)
              return t4.mod(this.m);
            else
              return t4;
          };
          t3.prototype.revert = function(t4) {
            return t4;
          };
          t3.prototype.reduce = function(t4) {
            t4.divRemTo(this.m, null, t4);
          };
          t3.prototype.mulTo = function(t4, e3, r3) {
            t4.multiplyTo(e3, r3);
            this.reduce(r3);
          };
          t3.prototype.sqrTo = function(t4, e3) {
            t4.squareTo(e3);
            this.reduce(e3);
          };
          return t3;
        }();
        var V = function() {
          function t3(t4) {
            this.m = t4;
            this.mp = t4.invDigit();
            this.mpl = this.mp & 32767;
            this.mph = this.mp >> 15;
            this.um = (1 << t4.DB - 15) - 1;
            this.mt2 = 2 * t4.t;
          }
          t3.prototype.convert = function(t4) {
            var e3 = L();
            t4.abs().dlShiftTo(this.m.t, e3);
            e3.divRemTo(this.m, null, e3);
            if (t4.s < 0 && e3.compareTo(k.ZERO) > 0)
              this.m.subTo(e3, e3);
            return e3;
          };
          t3.prototype.revert = function(t4) {
            var e3 = L();
            t4.copyTo(e3);
            this.reduce(e3);
            return e3;
          };
          t3.prototype.reduce = function(t4) {
            while (t4.t <= this.mt2)
              t4[t4.t++] = 0;
            for (var e3 = 0; e3 < this.m.t; ++e3) {
              var r3 = t4[e3] & 32767;
              var i3 = r3 * this.mpl + ((r3 * this.mph + (t4[e3] >> 15) * this.mpl & this.um) << 15) & t4.DM;
              r3 = e3 + this.m.t;
              t4[r3] += this.m.am(0, i3, t4, e3, 0, this.m.t);
              while (t4[r3] >= t4.DV) {
                t4[r3] -= t4.DV;
                t4[++r3]++;
              }
            }
            t4.clamp();
            t4.drShiftTo(this.m.t, t4);
            if (t4.compareTo(this.m) >= 0)
              t4.subTo(this.m, t4);
          };
          t3.prototype.mulTo = function(t4, e3, r3) {
            t4.multiplyTo(e3, r3);
            this.reduce(r3);
          };
          t3.prototype.sqrTo = function(t4, e3) {
            t4.squareTo(e3);
            this.reduce(e3);
          };
          return t3;
        }();
        var H = function() {
          function t3(t4) {
            this.m = t4;
            this.r2 = L();
            this.q3 = L();
            k.ONE.dlShiftTo(2 * t4.t, this.r2);
            this.mu = this.r2.divide(t4);
          }
          t3.prototype.convert = function(t4) {
            if (t4.s < 0 || t4.t > 2 * this.m.t)
              return t4.mod(this.m);
            else if (t4.compareTo(this.m) < 0)
              return t4;
            else {
              var e3 = L();
              t4.copyTo(e3);
              this.reduce(e3);
              return e3;
            }
          };
          t3.prototype.revert = function(t4) {
            return t4;
          };
          t3.prototype.reduce = function(t4) {
            t4.drShiftTo(this.m.t - 1, this.r2);
            if (t4.t > this.m.t + 1) {
              t4.t = this.m.t + 1;
              t4.clamp();
            }
            this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
            this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
            while (t4.compareTo(this.r2) < 0)
              t4.dAddOffset(1, this.m.t + 1);
            t4.subTo(this.r2, t4);
            while (t4.compareTo(this.m) >= 0)
              t4.subTo(this.m, t4);
          };
          t3.prototype.mulTo = function(t4, e3, r3) {
            t4.multiplyTo(e3, r3);
            this.reduce(r3);
          };
          t3.prototype.sqrTo = function(t4, e3) {
            t4.squareTo(e3);
            this.reduce(e3);
          };
          return t3;
        }();
        function L() {
          return new k(null);
        }
        function K(t3, e3) {
          return new k(t3, e3);
        }
        var U = typeof navigator !== "undefined";
        if (U && B && navigator.appName == "Microsoft Internet Explorer") {
          k.prototype.am = function t3(e3, r3, i3, n22, s22, a2) {
            var o2 = r3 & 32767;
            var u2 = r3 >> 15;
            while (--a2 >= 0) {
              var c2 = this[e3] & 32767;
              var l2 = this[e3++] >> 15;
              var f2 = u2 * c2 + l2 * o2;
              c2 = o2 * c2 + ((f2 & 32767) << 15) + i3[n22] + (s22 & 1073741823);
              s22 = (c2 >>> 30) + (f2 >>> 15) + u2 * l2 + (s22 >>> 30);
              i3[n22++] = c2 & 1073741823;
            }
            return s22;
          };
          R = 30;
        } else if (U && B && navigator.appName != "Netscape") {
          k.prototype.am = function t3(e3, r3, i3, n22, s22, a2) {
            while (--a2 >= 0) {
              var o2 = r3 * this[e3++] + i3[n22] + s22;
              s22 = Math.floor(o2 / 67108864);
              i3[n22++] = o2 & 67108863;
            }
            return s22;
          };
          R = 26;
        } else {
          k.prototype.am = function t3(e3, r3, i3, n22, s22, a2) {
            var o2 = r3 & 16383;
            var u2 = r3 >> 14;
            while (--a2 >= 0) {
              var c2 = this[e3] & 16383;
              var l2 = this[e3++] >> 14;
              var f2 = u2 * c2 + l2 * o2;
              c2 = o2 * c2 + ((f2 & 16383) << 14) + i3[n22] + s22;
              s22 = (c2 >> 28) + (f2 >> 14) + u2 * l2;
              i3[n22++] = c2 & 268435455;
            }
            return s22;
          };
          R = 28;
        }
        k.prototype.DB = R;
        k.prototype.DM = (1 << R) - 1;
        k.prototype.DV = 1 << R;
        var j = 52;
        k.prototype.FV = Math.pow(2, j);
        k.prototype.F1 = j - R;
        k.prototype.F2 = 2 * R - j;
        var q = [];
        var z;
        var F;
        z = "0".charCodeAt(0);
        for (F = 0; F <= 9; ++F)
          q[z++] = F;
        z = "a".charCodeAt(0);
        for (F = 10; F < 36; ++F)
          q[z++] = F;
        z = "A".charCodeAt(0);
        for (F = 10; F < 36; ++F)
          q[z++] = F;
        function G(t3, e3) {
          var r3 = q[t3.charCodeAt(e3)];
          return r3 == null ? -1 : r3;
        }
        function Y(t3) {
          var e3 = L();
          e3.fromInt(t3);
          return e3;
        }
        function W(t3) {
          var e3 = 1;
          var r3;
          if ((r3 = t3 >>> 16) != 0) {
            t3 = r3;
            e3 += 16;
          }
          if ((r3 = t3 >> 8) != 0) {
            t3 = r3;
            e3 += 8;
          }
          if ((r3 = t3 >> 4) != 0) {
            t3 = r3;
            e3 += 4;
          }
          if ((r3 = t3 >> 2) != 0) {
            t3 = r3;
            e3 += 2;
          }
          if ((r3 = t3 >> 1) != 0) {
            t3 = r3;
            e3 += 1;
          }
          return e3;
        }
        k.ZERO = Y(0);
        k.ONE = Y(1);
        var J = function() {
          function t3() {
            this.i = 0;
            this.j = 0;
            this.S = [];
          }
          t3.prototype.init = function(t4) {
            var e3;
            var r3;
            var i3;
            for (e3 = 0; e3 < 256; ++e3)
              this.S[e3] = e3;
            r3 = 0;
            for (e3 = 0; e3 < 256; ++e3) {
              r3 = r3 + this.S[e3] + t4[e3 % t4.length] & 255;
              i3 = this.S[e3];
              this.S[e3] = this.S[r3];
              this.S[r3] = i3;
            }
            this.i = 0;
            this.j = 0;
          };
          t3.prototype.next = function() {
            var t4;
            this.i = this.i + 1 & 255;
            this.j = this.j + this.S[this.i] & 255;
            t4 = this.S[this.i];
            this.S[this.i] = this.S[this.j];
            this.S[this.j] = t4;
            return this.S[t4 + this.S[this.i] & 255];
          };
          return t3;
        }();
        function Z() {
          return new J();
        }
        var $ = 256;
        var X;
        var Q = null;
        var tt;
        if (Q == null) {
          Q = [];
          tt = 0;
        }
        function nt() {
          if (X == null) {
            X = Z();
            while (tt < $) {
              var t3 = Math.floor(65536 * Math.random());
              Q[tt++] = t3 & 255;
            }
            X.init(Q);
            for (tt = 0; tt < Q.length; ++tt)
              Q[tt] = 0;
            tt = 0;
          }
          return X.next();
        }
        var st = function() {
          function t3() {
          }
          t3.prototype.nextBytes = function(t4) {
            for (var e3 = 0; e3 < t4.length; ++e3)
              t4[e3] = nt();
          };
          return t3;
        }();
        function at(t3, e3) {
          if (e3 < t3.length + 22) {
            console.error("Message too long for RSA");
            return null;
          }
          var r3 = e3 - t3.length - 6;
          var i3 = "";
          for (var n22 = 0; n22 < r3; n22 += 2)
            i3 += "ff";
          var s22 = "0001" + i3 + "00" + t3;
          return K(s22, 16);
        }
        function ot(t3, e3) {
          if (e3 < t3.length + 11) {
            console.error("Message too long for RSA");
            return null;
          }
          var r3 = [];
          var i3 = t3.length - 1;
          while (i3 >= 0 && e3 > 0) {
            var n22 = t3.charCodeAt(i3--);
            if (n22 < 128)
              r3[--e3] = n22;
            else if (n22 > 127 && n22 < 2048) {
              r3[--e3] = n22 & 63 | 128;
              r3[--e3] = n22 >> 6 | 192;
            } else {
              r3[--e3] = n22 & 63 | 128;
              r3[--e3] = n22 >> 6 & 63 | 128;
              r3[--e3] = n22 >> 12 | 224;
            }
          }
          r3[--e3] = 0;
          var s22 = new st();
          var a2 = [];
          while (e3 > 2) {
            a2[0] = 0;
            while (a2[0] == 0)
              s22.nextBytes(a2);
            r3[--e3] = a2[0];
          }
          r3[--e3] = 2;
          r3[--e3] = 0;
          return new k(r3);
        }
        var ut = function() {
          function t3() {
            this.n = null;
            this.e = 0;
            this.d = null;
            this.p = null;
            this.q = null;
            this.dmp1 = null;
            this.dmq1 = null;
            this.coeff = null;
          }
          t3.prototype.doPublic = function(t4) {
            return t4.modPowInt(this.e, this.n);
          };
          t3.prototype.doPrivate = function(t4) {
            if (this.p == null || this.q == null)
              return t4.modPow(this.d, this.n);
            var e3 = t4.mod(this.p).modPow(this.dmp1, this.p);
            var r3 = t4.mod(this.q).modPow(this.dmq1, this.q);
            while (e3.compareTo(r3) < 0)
              e3 = e3.add(this.p);
            return e3.subtract(r3).multiply(this.coeff).mod(this.p).multiply(this.q).add(r3);
          };
          t3.prototype.setPublic = function(t4, e3) {
            if (t4 != null && e3 != null && t4.length > 0 && e3.length > 0) {
              this.n = K(t4, 16);
              this.e = parseInt(e3, 16);
            } else
              console.error("Invalid RSA public key");
          };
          t3.prototype.encrypt = function(t4) {
            var e3 = this.n.bitLength() + 7 >> 3;
            var r3 = ot(t4, e3);
            if (r3 == null)
              return null;
            var i3 = this.doPublic(r3);
            if (i3 == null)
              return null;
            var n22 = i3.toString(16);
            var s22 = n22.length;
            for (var a2 = 0; a2 < e3 * 2 - s22; a2++)
              n22 = "0" + n22;
            return n22;
          };
          t3.prototype.setPrivate = function(t4, e3, r3) {
            if (t4 != null && e3 != null && t4.length > 0 && e3.length > 0) {
              this.n = K(t4, 16);
              this.e = parseInt(e3, 16);
              this.d = K(r3, 16);
            } else
              console.error("Invalid RSA private key");
          };
          t3.prototype.setPrivateEx = function(t4, e3, r3, i3, n22, s22, a2, o2) {
            if (t4 != null && e3 != null && t4.length > 0 && e3.length > 0) {
              this.n = K(t4, 16);
              this.e = parseInt(e3, 16);
              this.d = K(r3, 16);
              this.p = K(i3, 16);
              this.q = K(n22, 16);
              this.dmp1 = K(s22, 16);
              this.dmq1 = K(a2, 16);
              this.coeff = K(o2, 16);
            } else
              console.error("Invalid RSA private key");
          };
          t3.prototype.generate = function(t4, e3) {
            var r3 = new st();
            var i3 = t4 >> 1;
            this.e = parseInt(e3, 16);
            var n22 = new k(e3, 16);
            for (; ; ) {
              for (; ; ) {
                this.p = new k(t4 - i3, 1, r3);
                if (this.p.subtract(k.ONE).gcd(n22).compareTo(k.ONE) == 0 && this.p.isProbablePrime(10))
                  break;
              }
              for (; ; ) {
                this.q = new k(i3, 1, r3);
                if (this.q.subtract(k.ONE).gcd(n22).compareTo(k.ONE) == 0 && this.q.isProbablePrime(10))
                  break;
              }
              if (this.p.compareTo(this.q) <= 0) {
                var s22 = this.p;
                this.p = this.q;
                this.q = s22;
              }
              var a2 = this.p.subtract(k.ONE);
              var o2 = this.q.subtract(k.ONE);
              var u2 = a2.multiply(o2);
              if (u2.gcd(n22).compareTo(k.ONE) == 0) {
                this.n = this.p.multiply(this.q);
                this.d = n22.modInverse(u2);
                this.dmp1 = this.d.mod(a2);
                this.dmq1 = this.d.mod(o2);
                this.coeff = this.q.modInverse(this.p);
                break;
              }
            }
          };
          t3.prototype.decrypt = function(t4) {
            var e3 = K(t4, 16);
            var r3 = this.doPrivate(e3);
            if (r3 == null)
              return null;
            return ct(r3, this.n.bitLength() + 7 >> 3);
          };
          t3.prototype.generateAsync = function(t4, e3, r3) {
            var i3 = new st();
            var n22 = t4 >> 1;
            this.e = parseInt(e3, 16);
            var s22 = new k(e3, 16);
            var a2 = this;
            var o2 = function() {
              var e4 = function() {
                if (a2.p.compareTo(a2.q) <= 0) {
                  var t5 = a2.p;
                  a2.p = a2.q;
                  a2.q = t5;
                }
                var e5 = a2.p.subtract(k.ONE);
                var i4 = a2.q.subtract(k.ONE);
                var n3 = e5.multiply(i4);
                if (n3.gcd(s22).compareTo(k.ONE) == 0) {
                  a2.n = a2.p.multiply(a2.q);
                  a2.d = s22.modInverse(n3);
                  a2.dmp1 = a2.d.mod(e5);
                  a2.dmq1 = a2.d.mod(i4);
                  a2.coeff = a2.q.modInverse(a2.p);
                  setTimeout(function() {
                    r3();
                  }, 0);
                } else
                  setTimeout(o2, 0);
              };
              var u2 = function() {
                a2.q = L();
                a2.q.fromNumberAsync(n22, 1, i3, function() {
                  a2.q.subtract(k.ONE).gcda(s22, function(t5) {
                    if (t5.compareTo(k.ONE) == 0 && a2.q.isProbablePrime(10))
                      setTimeout(e4, 0);
                    else
                      setTimeout(u2, 0);
                  });
                });
              };
              var c2 = function() {
                a2.p = L();
                a2.p.fromNumberAsync(t4 - n22, 1, i3, function() {
                  a2.p.subtract(k.ONE).gcda(s22, function(t5) {
                    if (t5.compareTo(k.ONE) == 0 && a2.p.isProbablePrime(10))
                      setTimeout(u2, 0);
                    else
                      setTimeout(c2, 0);
                  });
                });
              };
              setTimeout(c2, 0);
            };
            setTimeout(o2, 0);
          };
          t3.prototype.sign = function(t4, e3, r3) {
            var i3 = ht(r3);
            var n22 = i3 + e3(t4).toString();
            var s22 = at(n22, this.n.bitLength() / 4);
            if (s22 == null)
              return null;
            var a2 = this.doPrivate(s22);
            if (a2 == null)
              return null;
            var o2 = a2.toString(16);
            if ((o2.length & 1) == 0)
              return o2;
            else
              return "0" + o2;
          };
          t3.prototype.verify = function(t4, e3, r3) {
            var i3 = K(e3, 16);
            var n22 = this.doPublic(i3);
            if (n22 == null)
              return null;
            var s22 = n22.toString(16).replace(/^1f+00/, "");
            var a2 = dt(s22);
            return a2 == r3(t4).toString();
          };
          t3.prototype.encryptLong = function(t4) {
            var e3 = this;
            var r3 = "";
            var i3 = (this.n.bitLength() + 7 >> 3) - 11;
            var n22 = this.setSplitChn(t4, i3);
            n22.forEach(function(t5) {
              r3 += e3.encrypt(t5);
            });
            return r3;
          };
          t3.prototype.decryptLong = function(t4) {
            var e3 = "";
            var r3 = this.n.bitLength() + 7 >> 3;
            var i3 = r3 * 2;
            if (t4.length > i3) {
              var n22 = t4.match(new RegExp(".{1," + i3 + "}", "g")) || [];
              var s22 = [];
              for (var a2 = 0; a2 < n22.length; a2++) {
                var o2 = K(n22[a2], 16);
                var u2 = this.doPrivate(o2);
                if (u2 == null)
                  return null;
                s22.push(u2);
              }
              e3 = lt(s22, r3);
            } else
              e3 = this.decrypt(t4);
            return e3;
          };
          t3.prototype.setSplitChn = function(t4, e3, r3) {
            if (r3 === void 0)
              r3 = [];
            var i3 = t4.split("");
            var n22 = 0;
            for (var s22 = 0; s22 < i3.length; s22++) {
              var a2 = i3[s22].charCodeAt(0);
              if (a2 <= 127)
                n22 += 1;
              else if (a2 <= 2047)
                n22 += 2;
              else if (a2 <= 65535)
                n22 += 3;
              else
                n22 += 4;
              if (n22 > e3) {
                var o2 = t4.substring(0, s22);
                r3.push(o2);
                return this.setSplitChn(t4.substring(s22), e3, r3);
              }
            }
            r3.push(t4);
            return r3;
          };
          return t3;
        }();
        function ct(t3, e3) {
          var r3 = t3.toByteArray();
          var i3 = 0;
          while (i3 < r3.length && r3[i3] == 0)
            ++i3;
          if (r3.length - i3 != e3 - 1 || r3[i3] != 2)
            return null;
          ++i3;
          while (r3[i3] != 0)
            if (++i3 >= r3.length)
              return null;
          var n22 = "";
          while (++i3 < r3.length) {
            var s22 = r3[i3] & 255;
            if (s22 < 128)
              n22 += String.fromCharCode(s22);
            else if (s22 > 191 && s22 < 224) {
              n22 += String.fromCharCode((s22 & 31) << 6 | r3[i3 + 1] & 63);
              ++i3;
            } else {
              n22 += String.fromCharCode((s22 & 15) << 12 | (r3[i3 + 1] & 63) << 6 | r3[i3 + 2] & 63);
              i3 += 2;
            }
          }
          return n22;
        }
        function lt(t3, e3) {
          var r3 = [];
          for (var i3 = 0; i3 < t3.length; i3++) {
            var n22 = t3[i3];
            var s22 = n22.toByteArray();
            var a2 = 0;
            while (a2 < s22.length && s22[a2] == 0)
              ++a2;
            if (s22.length - a2 != e3 - 1 || s22[a2] != 2)
              return null;
            ++a2;
            while (s22[a2] != 0)
              if (++a2 >= s22.length)
                return null;
            r3 = r3.concat(s22.slice(a2 + 1));
          }
          var o2 = r3;
          var u2 = -1;
          var c2 = "";
          while (++u2 < o2.length) {
            var l2 = o2[u2] & 255;
            if (l2 < 128)
              c2 += String.fromCharCode(l2);
            else if (l2 > 191 && l2 < 224) {
              c2 += String.fromCharCode((l2 & 31) << 6 | o2[u2 + 1] & 63);
              ++u2;
            } else {
              c2 += String.fromCharCode((l2 & 15) << 12 | (o2[u2 + 1] & 63) << 6 | o2[u2 + 2] & 63);
              u2 += 2;
            }
          }
          return c2;
        }
        var ft = { md2: "3020300c06082a864886f70d020205000410", md5: "3020300c06082a864886f70d020505000410", sha1: "3021300906052b0e03021a05000414", sha224: "302d300d06096086480165030402040500041c", sha256: "3031300d060960864801650304020105000420", sha384: "3041300d060960864801650304020205000430", sha512: "3051300d060960864801650304020305000440", ripemd160: "3021300906052b2403020105000414" };
        function ht(t3) {
          return ft[t3] || "";
        }
        function dt(t3) {
          for (var e3 in ft)
            if (ft.hasOwnProperty(e3)) {
              var r3 = ft[e3];
              var i3 = r3.length;
              if (t3.substr(0, i3) == r3)
                return t3.substr(i3);
            }
          return t3;
        }
        var vt = {};
        vt.lang = { extend: function(t3, e3, r3) {
          if (!e3 || !t3)
            throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
          var i3 = function() {
          };
          i3.prototype = e3.prototype;
          t3.prototype = new i3();
          t3.prototype.constructor = t3;
          t3.superclass = e3.prototype;
          if (e3.prototype.constructor == Object.prototype.constructor)
            e3.prototype.constructor = e3;
          if (r3) {
            var n22;
            for (n22 in r3)
              t3.prototype[n22] = r3[n22];
            var s22 = function() {
            }, a2 = ["toString", "valueOf"];
            try {
              if (/MSIE/.test(navigator.userAgent))
                s22 = function(t4, e4) {
                  for (n22 = 0; n22 < a2.length; n22 += 1) {
                    var r4 = a2[n22], i4 = e4[r4];
                    if (typeof i4 === "function" && i4 != Object.prototype[r4])
                      t4[r4] = i4;
                  }
                };
            } catch (t4) {
            }
            s22(t3.prototype, r3);
          }
        } };
        var pt = {};
        if (typeof pt.asn1 == "undefined" || !pt.asn1)
          pt.asn1 = {};
        pt.asn1.ASN1Util = new function() {
          this.integerToByteHex = function(t3) {
            var e3 = t3.toString(16);
            if (e3.length % 2 == 1)
              e3 = "0" + e3;
            return e3;
          };
          this.bigIntToMinTwosComplementsHex = function(t3) {
            var e3 = t3.toString(16);
            if (e3.substr(0, 1) != "-") {
              if (e3.length % 2 == 1)
                e3 = "0" + e3;
              else if (!e3.match(/^[0-7]/))
                e3 = "00" + e3;
            } else {
              var r3 = e3.substr(1);
              var i3 = r3.length;
              if (i3 % 2 == 1)
                i3 += 1;
              else if (!e3.match(/^[0-7]/))
                i3 += 2;
              var n22 = "";
              for (var s22 = 0; s22 < i3; s22++)
                n22 += "f";
              var a2 = new k(n22, 16);
              var o2 = a2.xor(t3).add(k.ONE);
              e3 = o2.toString(16).replace(/^-/, "");
            }
            return e3;
          };
          this.getPEMStringFromHex = function(t3, e3) {
            return hextopem(t3, e3);
          };
          this.newObject = function(t3) {
            var e3 = pt, r3 = e3.asn1, i3 = r3.DERBoolean, n22 = r3.DERInteger, s22 = r3.DERBitString, a2 = r3.DEROctetString, o2 = r3.DERNull, u2 = r3.DERObjectIdentifier, c2 = r3.DEREnumerated, l2 = r3.DERUTF8String, f2 = r3.DERNumericString, h2 = r3.DERPrintableString, d2 = r3.DERTeletexString, v2 = r3.DERIA5String, p = r3.DERUTCTime, g2 = r3.DERGeneralizedTime, y2 = r3.DERSequence, m2 = r3.DERSet, _2 = r3.DERTaggedObject, w2 = r3.ASN1Util.newObject;
            var S2 = Object.keys(t3);
            if (S2.length != 1)
              throw "key of param shall be only one.";
            var b2 = S2[0];
            if (":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + b2 + ":") == -1)
              throw "undefined key: " + b2;
            if (b2 == "bool")
              return new i3(t3[b2]);
            if (b2 == "int")
              return new n22(t3[b2]);
            if (b2 == "bitstr")
              return new s22(t3[b2]);
            if (b2 == "octstr")
              return new a2(t3[b2]);
            if (b2 == "null")
              return new o2(t3[b2]);
            if (b2 == "oid")
              return new u2(t3[b2]);
            if (b2 == "enum")
              return new c2(t3[b2]);
            if (b2 == "utf8str")
              return new l2(t3[b2]);
            if (b2 == "numstr")
              return new f2(t3[b2]);
            if (b2 == "prnstr")
              return new h2(t3[b2]);
            if (b2 == "telstr")
              return new d2(t3[b2]);
            if (b2 == "ia5str")
              return new v2(t3[b2]);
            if (b2 == "utctime")
              return new p(t3[b2]);
            if (b2 == "gentime")
              return new g2(t3[b2]);
            if (b2 == "seq") {
              var E2 = t3[b2];
              var D2 = [];
              for (var T2 = 0; T2 < E2.length; T2++) {
                var M2 = w2(E2[T2]);
                D2.push(M2);
              }
              return new y2({ array: D2 });
            }
            if (b2 == "set") {
              var E2 = t3[b2];
              var D2 = [];
              for (var T2 = 0; T2 < E2.length; T2++) {
                var M2 = w2(E2[T2]);
                D2.push(M2);
              }
              return new m2({ array: D2 });
            }
            if (b2 == "tag") {
              var I2 = t3[b2];
              if (Object.prototype.toString.call(I2) === "[object Array]" && I2.length == 3) {
                var A2 = w2(I2[2]);
                return new _2({ tag: I2[0], explicit: I2[1], obj: A2 });
              } else {
                var R2 = {};
                if (I2.explicit !== void 0)
                  R2.explicit = I2.explicit;
                if (I2.tag !== void 0)
                  R2.tag = I2.tag;
                if (I2.obj === void 0)
                  throw "obj shall be specified for 'tag'.";
                R2.obj = w2(I2.obj);
                return new _2(R2);
              }
            }
          };
          this.jsonToASN1HEX = function(t3) {
            var e3 = this.newObject(t3);
            return e3.getEncodedHex();
          };
        }();
        pt.asn1.ASN1Util.oidHexToInt = function(t3) {
          var e3 = "";
          var r3 = parseInt(t3.substr(0, 2), 16);
          var i3 = Math.floor(r3 / 40);
          var n22 = r3 % 40;
          var e3 = i3 + "." + n22;
          var s22 = "";
          for (var a2 = 2; a2 < t3.length; a2 += 2) {
            var o2 = parseInt(t3.substr(a2, 2), 16);
            var u2 = ("00000000" + o2.toString(2)).slice(-8);
            s22 += u2.substr(1, 7);
            if (u2.substr(0, 1) == "0") {
              var c2 = new k(s22, 2);
              e3 = e3 + "." + c2.toString(10);
              s22 = "";
            }
          }
          return e3;
        };
        pt.asn1.ASN1Util.oidIntToHex = function(t3) {
          var e3 = function(t4) {
            var e4 = t4.toString(16);
            if (e4.length == 1)
              e4 = "0" + e4;
            return e4;
          };
          var r3 = function(t4) {
            var r4 = "";
            var i4 = new k(t4, 10);
            var n3 = i4.toString(2);
            var s3 = 7 - n3.length % 7;
            if (s3 == 7)
              s3 = 0;
            var a3 = "";
            for (var o2 = 0; o2 < s3; o2++)
              a3 += "0";
            n3 = a3 + n3;
            for (var o2 = 0; o2 < n3.length - 1; o2 += 7) {
              var u2 = n3.substr(o2, 7);
              if (o2 != n3.length - 7)
                u2 = "1" + u2;
              r4 += e3(parseInt(u2, 2));
            }
            return r4;
          };
          if (!t3.match(/^[0-9.]+$/))
            throw "malformed oid string: " + t3;
          var i3 = "";
          var n22 = t3.split(".");
          var s22 = parseInt(n22[0]) * 40 + parseInt(n22[1]);
          i3 += e3(s22);
          n22.splice(0, 2);
          for (var a2 = 0; a2 < n22.length; a2++)
            i3 += r3(n22[a2]);
          return i3;
        };
        pt.asn1.ASN1Object = function() {
          var n22 = "";
          this.getLengthHexFromValue = function() {
            if (typeof this.hV == "undefined" || this.hV == null)
              throw "this.hV is null or undefined.";
            if (this.hV.length % 2 == 1)
              throw "value hex must be even length: n=" + n22.length + ",v=" + this.hV;
            var t3 = this.hV.length / 2;
            var e3 = t3.toString(16);
            if (e3.length % 2 == 1)
              e3 = "0" + e3;
            if (t3 < 128)
              return e3;
            else {
              var r3 = e3.length / 2;
              if (r3 > 15)
                throw "ASN.1 length too long to represent by 8x: n = " + t3.toString(16);
              var i3 = 128 + r3;
              return i3.toString(16) + e3;
            }
          };
          this.getEncodedHex = function() {
            if (this.hTLV == null || this.isModified) {
              this.hV = this.getFreshValueHex();
              this.hL = this.getLengthHexFromValue();
              this.hTLV = this.hT + this.hL + this.hV;
              this.isModified = false;
            }
            return this.hTLV;
          };
          this.getValueHex = function() {
            this.getEncodedHex();
            return this.hV;
          };
          this.getFreshValueHex = function() {
            return "";
          };
        };
        pt.asn1.DERAbstractString = function(t3) {
          pt.asn1.DERAbstractString.superclass.constructor.call(this);
          this.getString = function() {
            return this.s;
          };
          this.setString = function(t4) {
            this.hTLV = null;
            this.isModified = true;
            this.s = t4;
            this.hV = stohex(this.s);
          };
          this.setStringHex = function(t4) {
            this.hTLV = null;
            this.isModified = true;
            this.s = null;
            this.hV = t4;
          };
          this.getFreshValueHex = function() {
            return this.hV;
          };
          if (typeof t3 != "undefined") {
            if (typeof t3 == "string")
              this.setString(t3);
            else if (typeof t3["str"] != "undefined")
              this.setString(t3["str"]);
            else if (typeof t3["hex"] != "undefined")
              this.setStringHex(t3["hex"]);
          }
        };
        vt.lang.extend(pt.asn1.DERAbstractString, pt.asn1.ASN1Object);
        pt.asn1.DERAbstractTime = function(t3) {
          pt.asn1.DERAbstractTime.superclass.constructor.call(this);
          this.localDateToUTC = function(t4) {
            utc = t4.getTime() + t4.getTimezoneOffset() * 6e4;
            var e3 = new Date(utc);
            return e3;
          };
          this.formatDate = function(t4, e3, r3) {
            var i3 = this.zeroPadding;
            var n22 = this.localDateToUTC(t4);
            var s22 = String(n22.getFullYear());
            if (e3 == "utc")
              s22 = s22.substr(2, 2);
            var a2 = i3(String(n22.getMonth() + 1), 2);
            var o2 = i3(String(n22.getDate()), 2);
            var u2 = i3(String(n22.getHours()), 2);
            var c2 = i3(String(n22.getMinutes()), 2);
            var l2 = i3(String(n22.getSeconds()), 2);
            var f2 = s22 + a2 + o2 + u2 + c2 + l2;
            if (r3 === true) {
              var h2 = n22.getMilliseconds();
              if (h2 != 0) {
                var d2 = i3(String(h2), 3);
                d2 = d2.replace(/[0]+$/, "");
                f2 = f2 + "." + d2;
              }
            }
            return f2 + "Z";
          };
          this.zeroPadding = function(t4, e3) {
            if (t4.length >= e3)
              return t4;
            return new Array(e3 - t4.length + 1).join("0") + t4;
          };
          this.getString = function() {
            return this.s;
          };
          this.setString = function(t4) {
            this.hTLV = null;
            this.isModified = true;
            this.s = t4;
            this.hV = stohex(t4);
          };
          this.setByDateValue = function(t4, e3, r3, i3, n22, s22) {
            var a2 = new Date(Date.UTC(t4, e3 - 1, r3, i3, n22, s22, 0));
            this.setByDate(a2);
          };
          this.getFreshValueHex = function() {
            return this.hV;
          };
        };
        vt.lang.extend(pt.asn1.DERAbstractTime, pt.asn1.ASN1Object);
        pt.asn1.DERAbstractStructured = function(t3) {
          pt.asn1.DERAbstractString.superclass.constructor.call(this);
          this.setByASN1ObjectArray = function(t4) {
            this.hTLV = null;
            this.isModified = true;
            this.asn1Array = t4;
          };
          this.appendASN1Object = function(t4) {
            this.hTLV = null;
            this.isModified = true;
            this.asn1Array.push(t4);
          };
          this.asn1Array = new Array();
          if (typeof t3 != "undefined") {
            if (typeof t3["array"] != "undefined")
              this.asn1Array = t3["array"];
          }
        };
        vt.lang.extend(pt.asn1.DERAbstractStructured, pt.asn1.ASN1Object);
        pt.asn1.DERBoolean = function() {
          pt.asn1.DERBoolean.superclass.constructor.call(this);
          this.hT = "01";
          this.hTLV = "0101ff";
        };
        vt.lang.extend(pt.asn1.DERBoolean, pt.asn1.ASN1Object);
        pt.asn1.DERInteger = function(t3) {
          pt.asn1.DERInteger.superclass.constructor.call(this);
          this.hT = "02";
          this.setByBigInteger = function(t4) {
            this.hTLV = null;
            this.isModified = true;
            this.hV = pt.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t4);
          };
          this.setByInteger = function(t4) {
            var e3 = new k(String(t4), 10);
            this.setByBigInteger(e3);
          };
          this.setValueHex = function(t4) {
            this.hV = t4;
          };
          this.getFreshValueHex = function() {
            return this.hV;
          };
          if (typeof t3 != "undefined") {
            if (typeof t3["bigint"] != "undefined")
              this.setByBigInteger(t3["bigint"]);
            else if (typeof t3["int"] != "undefined")
              this.setByInteger(t3["int"]);
            else if (typeof t3 == "number")
              this.setByInteger(t3);
            else if (typeof t3["hex"] != "undefined")
              this.setValueHex(t3["hex"]);
          }
        };
        vt.lang.extend(pt.asn1.DERInteger, pt.asn1.ASN1Object);
        pt.asn1.DERBitString = function(t3) {
          if (t3 !== void 0 && typeof t3.obj !== "undefined") {
            var e3 = pt.asn1.ASN1Util.newObject(t3.obj);
            t3.hex = "00" + e3.getEncodedHex();
          }
          pt.asn1.DERBitString.superclass.constructor.call(this);
          this.hT = "03";
          this.setHexValueIncludingUnusedBits = function(t4) {
            this.hTLV = null;
            this.isModified = true;
            this.hV = t4;
          };
          this.setUnusedBitsAndHexValue = function(t4, e4) {
            if (t4 < 0 || 7 < t4)
              throw "unused bits shall be from 0 to 7: u = " + t4;
            var r3 = "0" + t4;
            this.hTLV = null;
            this.isModified = true;
            this.hV = r3 + e4;
          };
          this.setByBinaryString = function(t4) {
            t4 = t4.replace(/0+$/, "");
            var e4 = 8 - t4.length % 8;
            if (e4 == 8)
              e4 = 0;
            for (var r3 = 0; r3 <= e4; r3++)
              t4 += "0";
            var i3 = "";
            for (var r3 = 0; r3 < t4.length - 1; r3 += 8) {
              var n22 = t4.substr(r3, 8);
              var s22 = parseInt(n22, 2).toString(16);
              if (s22.length == 1)
                s22 = "0" + s22;
              i3 += s22;
            }
            this.hTLV = null;
            this.isModified = true;
            this.hV = "0" + e4 + i3;
          };
          this.setByBooleanArray = function(t4) {
            var e4 = "";
            for (var r3 = 0; r3 < t4.length; r3++)
              if (t4[r3] == true)
                e4 += "1";
              else
                e4 += "0";
            this.setByBinaryString(e4);
          };
          this.newFalseArray = function(t4) {
            var e4 = new Array(t4);
            for (var r3 = 0; r3 < t4; r3++)
              e4[r3] = false;
            return e4;
          };
          this.getFreshValueHex = function() {
            return this.hV;
          };
          if (typeof t3 != "undefined") {
            if (typeof t3 == "string" && t3.toLowerCase().match(/^[0-9a-f]+$/))
              this.setHexValueIncludingUnusedBits(t3);
            else if (typeof t3["hex"] != "undefined")
              this.setHexValueIncludingUnusedBits(t3["hex"]);
            else if (typeof t3["bin"] != "undefined")
              this.setByBinaryString(t3["bin"]);
            else if (typeof t3["array"] != "undefined")
              this.setByBooleanArray(t3["array"]);
          }
        };
        vt.lang.extend(pt.asn1.DERBitString, pt.asn1.ASN1Object);
        pt.asn1.DEROctetString = function(t3) {
          if (t3 !== void 0 && typeof t3.obj !== "undefined") {
            var e3 = pt.asn1.ASN1Util.newObject(t3.obj);
            t3.hex = e3.getEncodedHex();
          }
          pt.asn1.DEROctetString.superclass.constructor.call(this, t3);
          this.hT = "04";
        };
        vt.lang.extend(pt.asn1.DEROctetString, pt.asn1.DERAbstractString);
        pt.asn1.DERNull = function() {
          pt.asn1.DERNull.superclass.constructor.call(this);
          this.hT = "05";
          this.hTLV = "0500";
        };
        vt.lang.extend(pt.asn1.DERNull, pt.asn1.ASN1Object);
        pt.asn1.DERObjectIdentifier = function(t3) {
          var e3 = function(t4) {
            var e4 = t4.toString(16);
            if (e4.length == 1)
              e4 = "0" + e4;
            return e4;
          };
          var r3 = function(t4) {
            var r4 = "";
            var i3 = new k(t4, 10);
            var n22 = i3.toString(2);
            var s22 = 7 - n22.length % 7;
            if (s22 == 7)
              s22 = 0;
            var a2 = "";
            for (var o2 = 0; o2 < s22; o2++)
              a2 += "0";
            n22 = a2 + n22;
            for (var o2 = 0; o2 < n22.length - 1; o2 += 7) {
              var u2 = n22.substr(o2, 7);
              if (o2 != n22.length - 7)
                u2 = "1" + u2;
              r4 += e3(parseInt(u2, 2));
            }
            return r4;
          };
          pt.asn1.DERObjectIdentifier.superclass.constructor.call(this);
          this.hT = "06";
          this.setValueHex = function(t4) {
            this.hTLV = null;
            this.isModified = true;
            this.s = null;
            this.hV = t4;
          };
          this.setValueOidString = function(t4) {
            if (!t4.match(/^[0-9.]+$/))
              throw "malformed oid string: " + t4;
            var i3 = "";
            var n22 = t4.split(".");
            var s22 = parseInt(n22[0]) * 40 + parseInt(n22[1]);
            i3 += e3(s22);
            n22.splice(0, 2);
            for (var a2 = 0; a2 < n22.length; a2++)
              i3 += r3(n22[a2]);
            this.hTLV = null;
            this.isModified = true;
            this.s = null;
            this.hV = i3;
          };
          this.setValueName = function(t4) {
            var e4 = pt.asn1.x509.OID.name2oid(t4);
            if (e4 !== "")
              this.setValueOidString(e4);
            else
              throw "DERObjectIdentifier oidName undefined: " + t4;
          };
          this.getFreshValueHex = function() {
            return this.hV;
          };
          if (t3 !== void 0) {
            if (typeof t3 === "string")
              if (t3.match(/^[0-2].[0-9.]+$/))
                this.setValueOidString(t3);
              else
                this.setValueName(t3);
            else if (t3.oid !== void 0)
              this.setValueOidString(t3.oid);
            else if (t3.hex !== void 0)
              this.setValueHex(t3.hex);
            else if (t3.name !== void 0)
              this.setValueName(t3.name);
          }
        };
        vt.lang.extend(pt.asn1.DERObjectIdentifier, pt.asn1.ASN1Object);
        pt.asn1.DEREnumerated = function(t3) {
          pt.asn1.DEREnumerated.superclass.constructor.call(this);
          this.hT = "0a";
          this.setByBigInteger = function(t4) {
            this.hTLV = null;
            this.isModified = true;
            this.hV = pt.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t4);
          };
          this.setByInteger = function(t4) {
            var e3 = new k(String(t4), 10);
            this.setByBigInteger(e3);
          };
          this.setValueHex = function(t4) {
            this.hV = t4;
          };
          this.getFreshValueHex = function() {
            return this.hV;
          };
          if (typeof t3 != "undefined") {
            if (typeof t3["int"] != "undefined")
              this.setByInteger(t3["int"]);
            else if (typeof t3 == "number")
              this.setByInteger(t3);
            else if (typeof t3["hex"] != "undefined")
              this.setValueHex(t3["hex"]);
          }
        };
        vt.lang.extend(pt.asn1.DEREnumerated, pt.asn1.ASN1Object);
        pt.asn1.DERUTF8String = function(t3) {
          pt.asn1.DERUTF8String.superclass.constructor.call(this, t3);
          this.hT = "0c";
        };
        vt.lang.extend(pt.asn1.DERUTF8String, pt.asn1.DERAbstractString);
        pt.asn1.DERNumericString = function(t3) {
          pt.asn1.DERNumericString.superclass.constructor.call(this, t3);
          this.hT = "12";
        };
        vt.lang.extend(pt.asn1.DERNumericString, pt.asn1.DERAbstractString);
        pt.asn1.DERPrintableString = function(t3) {
          pt.asn1.DERPrintableString.superclass.constructor.call(this, t3);
          this.hT = "13";
        };
        vt.lang.extend(pt.asn1.DERPrintableString, pt.asn1.DERAbstractString);
        pt.asn1.DERTeletexString = function(t3) {
          pt.asn1.DERTeletexString.superclass.constructor.call(this, t3);
          this.hT = "14";
        };
        vt.lang.extend(pt.asn1.DERTeletexString, pt.asn1.DERAbstractString);
        pt.asn1.DERIA5String = function(t3) {
          pt.asn1.DERIA5String.superclass.constructor.call(this, t3);
          this.hT = "16";
        };
        vt.lang.extend(pt.asn1.DERIA5String, pt.asn1.DERAbstractString);
        pt.asn1.DERUTCTime = function(t3) {
          pt.asn1.DERUTCTime.superclass.constructor.call(this, t3);
          this.hT = "17";
          this.setByDate = function(t4) {
            this.hTLV = null;
            this.isModified = true;
            this.date = t4;
            this.s = this.formatDate(this.date, "utc");
            this.hV = stohex(this.s);
          };
          this.getFreshValueHex = function() {
            if (typeof this.date == "undefined" && typeof this.s == "undefined") {
              this.date = /* @__PURE__ */ new Date();
              this.s = this.formatDate(this.date, "utc");
              this.hV = stohex(this.s);
            }
            return this.hV;
          };
          if (t3 !== void 0) {
            if (t3.str !== void 0)
              this.setString(t3.str);
            else if (typeof t3 == "string" && t3.match(/^[0-9]{12}Z$/))
              this.setString(t3);
            else if (t3.hex !== void 0)
              this.setStringHex(t3.hex);
            else if (t3.date !== void 0)
              this.setByDate(t3.date);
          }
        };
        vt.lang.extend(pt.asn1.DERUTCTime, pt.asn1.DERAbstractTime);
        pt.asn1.DERGeneralizedTime = function(t3) {
          pt.asn1.DERGeneralizedTime.superclass.constructor.call(this, t3);
          this.hT = "18";
          this.withMillis = false;
          this.setByDate = function(t4) {
            this.hTLV = null;
            this.isModified = true;
            this.date = t4;
            this.s = this.formatDate(this.date, "gen", this.withMillis);
            this.hV = stohex(this.s);
          };
          this.getFreshValueHex = function() {
            if (this.date === void 0 && this.s === void 0) {
              this.date = /* @__PURE__ */ new Date();
              this.s = this.formatDate(this.date, "gen", this.withMillis);
              this.hV = stohex(this.s);
            }
            return this.hV;
          };
          if (t3 !== void 0) {
            if (t3.str !== void 0)
              this.setString(t3.str);
            else if (typeof t3 == "string" && t3.match(/^[0-9]{14}Z$/))
              this.setString(t3);
            else if (t3.hex !== void 0)
              this.setStringHex(t3.hex);
            else if (t3.date !== void 0)
              this.setByDate(t3.date);
            if (t3.millis === true)
              this.withMillis = true;
          }
        };
        vt.lang.extend(pt.asn1.DERGeneralizedTime, pt.asn1.DERAbstractTime);
        pt.asn1.DERSequence = function(t3) {
          pt.asn1.DERSequence.superclass.constructor.call(this, t3);
          this.hT = "30";
          this.getFreshValueHex = function() {
            var t4 = "";
            for (var e3 = 0; e3 < this.asn1Array.length; e3++) {
              var r3 = this.asn1Array[e3];
              t4 += r3.getEncodedHex();
            }
            this.hV = t4;
            return this.hV;
          };
        };
        vt.lang.extend(pt.asn1.DERSequence, pt.asn1.DERAbstractStructured);
        pt.asn1.DERSet = function(t3) {
          pt.asn1.DERSet.superclass.constructor.call(this, t3);
          this.hT = "31";
          this.sortFlag = true;
          this.getFreshValueHex = function() {
            var t4 = new Array();
            for (var e3 = 0; e3 < this.asn1Array.length; e3++) {
              var r3 = this.asn1Array[e3];
              t4.push(r3.getEncodedHex());
            }
            if (this.sortFlag == true)
              t4.sort();
            this.hV = t4.join("");
            return this.hV;
          };
          if (typeof t3 != "undefined") {
            if (typeof t3.sortflag != "undefined" && t3.sortflag == false)
              this.sortFlag = false;
          }
        };
        vt.lang.extend(pt.asn1.DERSet, pt.asn1.DERAbstractStructured);
        pt.asn1.DERTaggedObject = function(t3) {
          pt.asn1.DERTaggedObject.superclass.constructor.call(this);
          this.hT = "a0";
          this.hV = "";
          this.isExplicit = true;
          this.asn1Object = null;
          this.setASN1Object = function(t4, e3, r3) {
            this.hT = e3;
            this.isExplicit = t4;
            this.asn1Object = r3;
            if (this.isExplicit) {
              this.hV = this.asn1Object.getEncodedHex();
              this.hTLV = null;
              this.isModified = true;
            } else {
              this.hV = null;
              this.hTLV = r3.getEncodedHex();
              this.hTLV = this.hTLV.replace(/^../, e3);
              this.isModified = false;
            }
          };
          this.getFreshValueHex = function() {
            return this.hV;
          };
          if (typeof t3 != "undefined") {
            if (typeof t3["tag"] != "undefined")
              this.hT = t3["tag"];
            if (typeof t3["explicit"] != "undefined")
              this.isExplicit = t3["explicit"];
            if (typeof t3["obj"] != "undefined") {
              this.asn1Object = t3["obj"];
              this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);
            }
          }
        };
        vt.lang.extend(pt.asn1.DERTaggedObject, pt.asn1.ASN1Object);
        var gt = /* @__PURE__ */ function() {
          var t3 = function(e3, r3) {
            t3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t4, e4) {
              t4.__proto__ = e4;
            } || function(t4, e4) {
              for (var r4 in e4)
                if (Object.prototype.hasOwnProperty.call(e4, r4))
                  t4[r4] = e4[r4];
            };
            return t3(e3, r3);
          };
          return function(e3, r3) {
            if (typeof r3 !== "function" && r3 !== null)
              throw new TypeError("Class extends value " + String(r3) + " is not a constructor or null");
            t3(e3, r3);
            function i3() {
              this.constructor = e3;
            }
            e3.prototype = r3 === null ? Object.create(r3) : (i3.prototype = r3.prototype, new i3());
          };
        }();
        var yt = function(t3) {
          gt(e3, t3);
          function e3(r3) {
            var i3 = t3.call(this) || this;
            if (r3) {
              if (typeof r3 === "string")
                i3.parseKey(r3);
              else if (e3.hasPrivateKeyProperty(r3) || e3.hasPublicKeyProperty(r3))
                i3.parsePropertiesFrom(r3);
            }
            return i3;
          }
          e3.prototype.parseKey = function(t4) {
            try {
              var e4 = 0;
              var r3 = 0;
              var i3 = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
              var n22 = i3.test(t4) ? y.decode(t4) : _.unarmor(t4);
              var s22 = I.decode(n22);
              if (s22.sub.length === 3)
                s22 = s22.sub[2].sub[0];
              if (s22.sub.length === 9) {
                e4 = s22.sub[1].getHexStringValue();
                this.n = K(e4, 16);
                r3 = s22.sub[2].getHexStringValue();
                this.e = parseInt(r3, 16);
                var a2 = s22.sub[3].getHexStringValue();
                this.d = K(a2, 16);
                var o2 = s22.sub[4].getHexStringValue();
                this.p = K(o2, 16);
                var u2 = s22.sub[5].getHexStringValue();
                this.q = K(u2, 16);
                var c2 = s22.sub[6].getHexStringValue();
                this.dmp1 = K(c2, 16);
                var l2 = s22.sub[7].getHexStringValue();
                this.dmq1 = K(l2, 16);
                var f2 = s22.sub[8].getHexStringValue();
                this.coeff = K(f2, 16);
              } else if (s22.sub.length === 2) {
                var h2 = s22.sub[1];
                var d2 = h2.sub[0];
                e4 = d2.sub[0].getHexStringValue();
                this.n = K(e4, 16);
                r3 = d2.sub[1].getHexStringValue();
                this.e = parseInt(r3, 16);
              } else
                return false;
              return true;
            } catch (t5) {
              return false;
            }
          };
          e3.prototype.getPrivateBaseKey = function() {
            var t4 = { array: [new pt.asn1.DERInteger({ int: 0 }), new pt.asn1.DERInteger({ bigint: this.n }), new pt.asn1.DERInteger({ int: this.e }), new pt.asn1.DERInteger({ bigint: this.d }), new pt.asn1.DERInteger({ bigint: this.p }), new pt.asn1.DERInteger({ bigint: this.q }), new pt.asn1.DERInteger({ bigint: this.dmp1 }), new pt.asn1.DERInteger({ bigint: this.dmq1 }), new pt.asn1.DERInteger({ bigint: this.coeff })] };
            var e4 = new pt.asn1.DERSequence(t4);
            return e4.getEncodedHex();
          };
          e3.prototype.getPrivateBaseKeyB64 = function() {
            return d(this.getPrivateBaseKey());
          };
          e3.prototype.getPublicBaseKey = function() {
            var t4 = new pt.asn1.DERSequence({ array: [new pt.asn1.DERObjectIdentifier({ oid: "1.2.840.113549.1.1.1" }), new pt.asn1.DERNull()] });
            var e4 = new pt.asn1.DERSequence({ array: [new pt.asn1.DERInteger({ bigint: this.n }), new pt.asn1.DERInteger({ int: this.e })] });
            var r3 = new pt.asn1.DERBitString({ hex: "00" + e4.getEncodedHex() });
            var i3 = new pt.asn1.DERSequence({ array: [t4, r3] });
            return i3.getEncodedHex();
          };
          e3.prototype.getPublicBaseKeyB64 = function() {
            return d(this.getPublicBaseKey());
          };
          e3.wordwrap = function(t4, e4) {
            e4 = e4 || 64;
            if (!t4)
              return t4;
            var r3 = "(.{1," + e4 + "})( +|$\n?)|(.{1," + e4 + "})";
            return t4.match(RegExp(r3, "g")).join("\n");
          };
          e3.prototype.getPrivateKey = function() {
            var t4 = "-----BEGIN RSA PRIVATE KEY-----\n";
            t4 += e3.wordwrap(this.getPrivateBaseKeyB64()) + "\n";
            t4 += "-----END RSA PRIVATE KEY-----";
            return t4;
          };
          e3.prototype.getPublicKey = function() {
            var t4 = "-----BEGIN PUBLIC KEY-----\n";
            t4 += e3.wordwrap(this.getPublicBaseKeyB64()) + "\n";
            t4 += "-----END PUBLIC KEY-----";
            return t4;
          };
          e3.hasPublicKeyProperty = function(t4) {
            t4 = t4 || {};
            return t4.hasOwnProperty("n") && t4.hasOwnProperty("e");
          };
          e3.hasPrivateKeyProperty = function(t4) {
            t4 = t4 || {};
            return t4.hasOwnProperty("n") && t4.hasOwnProperty("e") && t4.hasOwnProperty("d") && t4.hasOwnProperty("p") && t4.hasOwnProperty("q") && t4.hasOwnProperty("dmp1") && t4.hasOwnProperty("dmq1") && t4.hasOwnProperty("coeff");
          };
          e3.prototype.parsePropertiesFrom = function(t4) {
            this.n = t4.n;
            this.e = t4.e;
            if (t4.hasOwnProperty("d")) {
              this.d = t4.d;
              this.p = t4.p;
              this.q = t4.q;
              this.dmp1 = t4.dmp1;
              this.dmq1 = t4.dmq1;
              this.coeff = t4.coeff;
            }
          };
          return e3;
        }(ut);
        const mt = { r: "3.2.1" };
        var _t = function() {
          function t3(t4) {
            if (t4 === void 0)
              t4 = {};
            t4 = t4 || {};
            this.default_key_size = t4.default_key_size ? parseInt(t4.default_key_size, 10) : 1024;
            this.default_public_exponent = t4.default_public_exponent || "010001";
            this.log = t4.log || false;
            this.key = null;
          }
          t3.prototype.setKey = function(t4) {
            if (this.log && this.key)
              console.warn("A key was already set, overriding existing.");
            this.key = new yt(t4);
          };
          t3.prototype.setPrivateKey = function(t4) {
            this.setKey(t4);
          };
          t3.prototype.setPublicKey = function(t4) {
            this.setKey(t4);
          };
          t3.prototype.decrypt = function(t4) {
            try {
              return this.getKey().decrypt(t4);
            } catch (t5) {
              return false;
            }
          };
          t3.prototype.encrypt = function(t4) {
            try {
              return this.getKey().encrypt(t4);
            } catch (t5) {
              return false;
            }
          };
          t3.prototype.encryptLong = function(t4) {
            try {
              return d(this.getKey().encryptLong(t4));
            } catch (t5) {
              return false;
            }
          };
          t3.prototype.decryptLong = function(t4) {
            try {
              return this.getKey().decryptLong(t4);
            } catch (t5) {
              return false;
            }
          };
          t3.prototype.sign = function(t4, e3, r3) {
            try {
              return d(this.getKey().sign(t4, e3, r3));
            } catch (t5) {
              return false;
            }
          };
          t3.prototype.verify = function(t4, e3, r3) {
            try {
              return this.getKey().verify(t4, v(e3), r3);
            } catch (t5) {
              return false;
            }
          };
          t3.prototype.getKey = function(t4) {
            if (!this.key) {
              this.key = new yt();
              if (t4 && {}.toString.call(t4) === "[object Function]") {
                this.key.generateAsync(this.default_key_size, this.default_public_exponent, t4);
                return;
              }
              this.key.generate(this.default_key_size, this.default_public_exponent);
            }
            return this.key;
          };
          t3.prototype.getPrivateKey = function() {
            return this.getKey().getPrivateKey();
          };
          t3.prototype.getPrivateKeyB64 = function() {
            return this.getKey().getPrivateBaseKeyB64();
          };
          t3.prototype.getPublicKey = function() {
            return this.getKey().getPublicKey();
          };
          t3.prototype.getPublicKeyB64 = function() {
            return this.getKey().getPublicBaseKeyB64();
          };
          t3.version = mt.r;
          return t3;
        }();
        const wt = _t;
      }, 2241: (t2, e2) => {
        Object.defineProperty(e2, "__esModule", { value: true });
        class r2 {
          constructor(t3) {
            this.delay = 10;
            this.delay = t3;
          }
          start() {
            this.cancel();
            let t3 = this;
            this.timer = setInterval(function() {
              t3.run();
            }, this.delay);
          }
          cancel() {
            if (this.timer)
              clearInterval(this.timer);
          }
        }
        e2["default"] = r2;
      }, 2620: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        const n2 = i2(r2(9420));
        const s2 = i2(r2(6068));
        const a = i2(r2(7574));
        const o = i2(r2(6152));
        class u extends a.default {
          constructor() {
            super(...arguments);
            this.loginData = new c();
          }
          static create() {
            let t3 = new u();
            super.initMsg(t3);
            t3.command = a.default.Command.LOGIN;
            t3.data = t3.loginData = c.create();
            return t3;
          }
          send() {
            if (!this.loginData.session || n2.default.cid != s2.default.md5Hex(this.loginData.session)) {
              o.default.create().send();
              return;
            }
            super.send();
          }
        }
        class c {
          constructor() {
            this.appId = "";
            this.session = "";
          }
          static create() {
            let t3 = new c();
            t3.appId = n2.default.appid;
            t3.session = n2.default.session;
            return t3;
          }
        }
        e2["default"] = u;
      }, 2696: function(t2, e2, r2) {
        (function(i2, n2, s2) {
          t2.exports = n2(r2(9021), r2(754), r2(4636), r2(9506), r2(7165));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i2 = r3.StreamCipher;
            var n2 = e3.algo;
            var s2 = [];
            var a = [];
            var o = [];
            var u = n2.RabbitLegacy = i2.extend({ _doReset: function() {
              var t4 = this._key.words;
              var e4 = this.cfg.iv;
              var r4 = this._X = [t4[0], t4[3] << 16 | t4[2] >>> 16, t4[1], t4[0] << 16 | t4[3] >>> 16, t4[2], t4[1] << 16 | t4[0] >>> 16, t4[3], t4[2] << 16 | t4[1] >>> 16];
              var i3 = this._C = [t4[2] << 16 | t4[2] >>> 16, t4[0] & 4294901760 | t4[1] & 65535, t4[3] << 16 | t4[3] >>> 16, t4[1] & 4294901760 | t4[2] & 65535, t4[0] << 16 | t4[0] >>> 16, t4[2] & 4294901760 | t4[3] & 65535, t4[1] << 16 | t4[1] >>> 16, t4[3] & 4294901760 | t4[0] & 65535];
              this._b = 0;
              for (var n22 = 0; n22 < 4; n22++)
                c.call(this);
              for (var n22 = 0; n22 < 8; n22++)
                i3[n22] ^= r4[n22 + 4 & 7];
              if (e4) {
                var s22 = e4.words;
                var a2 = s22[0];
                var o2 = s22[1];
                var u2 = (a2 << 8 | a2 >>> 24) & 16711935 | (a2 << 24 | a2 >>> 8) & 4278255360;
                var l = (o2 << 8 | o2 >>> 24) & 16711935 | (o2 << 24 | o2 >>> 8) & 4278255360;
                var f = u2 >>> 16 | l & 4294901760;
                var h = l << 16 | u2 & 65535;
                i3[0] ^= u2;
                i3[1] ^= f;
                i3[2] ^= l;
                i3[3] ^= h;
                i3[4] ^= u2;
                i3[5] ^= f;
                i3[6] ^= l;
                i3[7] ^= h;
                for (var n22 = 0; n22 < 4; n22++)
                  c.call(this);
              }
            }, _doProcessBlock: function(t4, e4) {
              var r4 = this._X;
              c.call(this);
              s2[0] = r4[0] ^ r4[5] >>> 16 ^ r4[3] << 16;
              s2[1] = r4[2] ^ r4[7] >>> 16 ^ r4[5] << 16;
              s2[2] = r4[4] ^ r4[1] >>> 16 ^ r4[7] << 16;
              s2[3] = r4[6] ^ r4[3] >>> 16 ^ r4[1] << 16;
              for (var i3 = 0; i3 < 4; i3++) {
                s2[i3] = (s2[i3] << 8 | s2[i3] >>> 24) & 16711935 | (s2[i3] << 24 | s2[i3] >>> 8) & 4278255360;
                t4[e4 + i3] ^= s2[i3];
              }
            }, blockSize: 128 / 32, ivSize: 64 / 32 });
            function c() {
              var t4 = this._X;
              var e4 = this._C;
              for (var r4 = 0; r4 < 8; r4++)
                a[r4] = e4[r4];
              e4[0] = e4[0] + 1295307597 + this._b | 0;
              e4[1] = e4[1] + 3545052371 + (e4[0] >>> 0 < a[0] >>> 0 ? 1 : 0) | 0;
              e4[2] = e4[2] + 886263092 + (e4[1] >>> 0 < a[1] >>> 0 ? 1 : 0) | 0;
              e4[3] = e4[3] + 1295307597 + (e4[2] >>> 0 < a[2] >>> 0 ? 1 : 0) | 0;
              e4[4] = e4[4] + 3545052371 + (e4[3] >>> 0 < a[3] >>> 0 ? 1 : 0) | 0;
              e4[5] = e4[5] + 886263092 + (e4[4] >>> 0 < a[4] >>> 0 ? 1 : 0) | 0;
              e4[6] = e4[6] + 1295307597 + (e4[5] >>> 0 < a[5] >>> 0 ? 1 : 0) | 0;
              e4[7] = e4[7] + 3545052371 + (e4[6] >>> 0 < a[6] >>> 0 ? 1 : 0) | 0;
              this._b = e4[7] >>> 0 < a[7] >>> 0 ? 1 : 0;
              for (var r4 = 0; r4 < 8; r4++) {
                var i3 = t4[r4] + e4[r4];
                var n22 = i3 & 65535;
                var s22 = i3 >>> 16;
                var u2 = ((n22 * n22 >>> 17) + n22 * s22 >>> 15) + s22 * s22;
                var c2 = ((i3 & 4294901760) * i3 | 0) + ((i3 & 65535) * i3 | 0);
                o[r4] = u2 ^ c2;
              }
              t4[0] = o[0] + (o[7] << 16 | o[7] >>> 16) + (o[6] << 16 | o[6] >>> 16) | 0;
              t4[1] = o[1] + (o[0] << 8 | o[0] >>> 24) + o[7] | 0;
              t4[2] = o[2] + (o[1] << 16 | o[1] >>> 16) + (o[0] << 16 | o[0] >>> 16) | 0;
              t4[3] = o[3] + (o[2] << 8 | o[2] >>> 24) + o[1] | 0;
              t4[4] = o[4] + (o[3] << 16 | o[3] >>> 16) + (o[2] << 16 | o[2] >>> 16) | 0;
              t4[5] = o[5] + (o[4] << 8 | o[4] >>> 24) + o[3] | 0;
              t4[6] = o[6] + (o[5] << 16 | o[5] >>> 16) + (o[4] << 16 | o[4] >>> 16) | 0;
              t4[7] = o[7] + (o[6] << 8 | o[6] >>> 24) + o[5] | 0;
            }
            e3.RabbitLegacy = i2._createHelper(u);
          })();
          return t3.RabbitLegacy;
        });
      }, 2720: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        const n2 = i2(r2(2037));
        const s2 = i2(r2(9877));
        const a = i2(r2(7574));
        const o = i2(r2(1649));
        const u = i2(r2(9560));
        const c = i2(r2(1302));
        const l = i2(r2(4094));
        const f = i2(r2(6681));
        const h = i2(r2(4786));
        const d = i2(r2(7374));
        const v = i2(r2(384));
        const p = i2(r2(7005));
        const g = i2(r2(5575));
        const y = i2(r2(7141));
        const m = i2(r2(7374));
        const _ = i2(r2(4490));
        const w = i2(r2(5520));
        class S {
          static receiveMessage(t3) {
            let e3 = a.default.parseMsg(new a.default(), t3);
            if (e3.command == a.default.Command.HEART_BEAT)
              return;
            if (e3.command != a.default.Command.KEY_NEGOTIATE_RESULT && e3.command != a.default.Command.SERVER_CLOSE && e3.command != a.default.Command.REDIRECT_SERVER)
              y.default.decrypt(e3);
            if (e3.command != a.default.Command.SERVER_CLOSE && e3.command != a.default.Command.REDIRECT_SERVER)
              y.default.verify(e3);
            switch (e3.command) {
              case a.default.Command.KEY_NEGOTIATE_RESULT:
                n2.default.parse(e3.stringify()).receive();
                break;
              case a.default.Command.REGISTER_RESULT:
                o.default.parse(e3.stringify()).receive();
                break;
              case a.default.Command.LOGIN_RESULT:
                s2.default.parse(e3.stringify()).receive();
                break;
              case a.default.Command.SERVER_MSG:
                this.receiveActionMsg(e3.stringify());
                break;
              case a.default.Command.SERVER_CLOSE:
                w.default.parse(e3.stringify()).receive();
                break;
              case a.default.Command.REDIRECT_SERVER:
                h.default.parse(e3.stringify()).receive();
                break;
            }
          }
          static receiveActionMsg(t3) {
            let e3 = m.default.parseActionMsg(new m.default(), t3);
            if (e3.actionMsgData.msgAction != d.default.ServerAction.RECEIVED && e3.actionMsgData.msgAction != d.default.ServerAction.REDIRECT_SERVER) {
              let t4 = JSON.parse(e3.actionMsgData.msgData);
              _.default.create(t4.id).send();
            }
            switch (e3.actionMsgData.msgAction) {
              case d.default.ServerAction.PUSH_MESSAGE:
                f.default.parse(t3).receive();
                break;
              case d.default.ServerAction.ADD_PHONE_INFO_RESULT:
                u.default.parse(t3).receive();
                break;
              case d.default.ServerAction.SET_MODE_RESULT:
                v.default.parse(t3).receive();
                break;
              case d.default.ServerAction.SET_TAG_RESULT:
                p.default.parse(t3).receive();
                break;
              case d.default.ServerAction.BIND_ALIAS_RESULT:
                c.default.parse(t3).receive();
                break;
              case d.default.ServerAction.UNBIND_ALIAS_RESULT:
                g.default.parse(t3).receive();
                break;
              case d.default.ServerAction.FEED_BACK_RESULT:
                l.default.parse(t3).receive();
                break;
              case d.default.ServerAction.RECEIVED:
                _.default.parse(t3).receive();
                break;
            }
          }
        }
        e2["default"] = S;
      }, 3009: function(t2, e2, r2) {
        (function(i2, n2) {
          t2.exports = n2(r2(9021));
        })(this, function(t3) {
          (function(e3) {
            var r3 = t3;
            var i2 = r3.lib;
            var n2 = i2.WordArray;
            var s2 = i2.Hasher;
            var a = r3.algo;
            var o = [];
            var u = [];
            (function() {
              function t4(t5) {
                var r5 = e3.sqrt(t5);
                for (var i4 = 2; i4 <= r5; i4++)
                  if (!(t5 % i4))
                    return false;
                return true;
              }
              function r4(t5) {
                return (t5 - (t5 | 0)) * 4294967296 | 0;
              }
              var i3 = 2;
              var n22 = 0;
              while (n22 < 64) {
                if (t4(i3)) {
                  if (n22 < 8)
                    o[n22] = r4(e3.pow(i3, 1 / 2));
                  u[n22] = r4(e3.pow(i3, 1 / 3));
                  n22++;
                }
                i3++;
              }
            })();
            var c = [];
            var l = a.SHA256 = s2.extend({ _doReset: function() {
              this._hash = new n2.init(o.slice(0));
            }, _doProcessBlock: function(t4, e4) {
              var r4 = this._hash.words;
              var i3 = r4[0];
              var n22 = r4[1];
              var s22 = r4[2];
              var a2 = r4[3];
              var o2 = r4[4];
              var l2 = r4[5];
              var f = r4[6];
              var h = r4[7];
              for (var d = 0; d < 64; d++) {
                if (d < 16)
                  c[d] = t4[e4 + d] | 0;
                else {
                  var v = c[d - 15];
                  var p = (v << 25 | v >>> 7) ^ (v << 14 | v >>> 18) ^ v >>> 3;
                  var g = c[d - 2];
                  var y = (g << 15 | g >>> 17) ^ (g << 13 | g >>> 19) ^ g >>> 10;
                  c[d] = p + c[d - 7] + y + c[d - 16];
                }
                var m = o2 & l2 ^ ~o2 & f;
                var _ = i3 & n22 ^ i3 & s22 ^ n22 & s22;
                var w = (i3 << 30 | i3 >>> 2) ^ (i3 << 19 | i3 >>> 13) ^ (i3 << 10 | i3 >>> 22);
                var S = (o2 << 26 | o2 >>> 6) ^ (o2 << 21 | o2 >>> 11) ^ (o2 << 7 | o2 >>> 25);
                var b = h + S + m + u[d] + c[d];
                var E = w + _;
                h = f;
                f = l2;
                l2 = o2;
                o2 = a2 + b | 0;
                a2 = s22;
                s22 = n22;
                n22 = i3;
                i3 = b + E | 0;
              }
              r4[0] = r4[0] + i3 | 0;
              r4[1] = r4[1] + n22 | 0;
              r4[2] = r4[2] + s22 | 0;
              r4[3] = r4[3] + a2 | 0;
              r4[4] = r4[4] + o2 | 0;
              r4[5] = r4[5] + l2 | 0;
              r4[6] = r4[6] + f | 0;
              r4[7] = r4[7] + h | 0;
            }, _doFinalize: function() {
              var t4 = this._data;
              var r4 = t4.words;
              var i3 = this._nDataBytes * 8;
              var n22 = t4.sigBytes * 8;
              r4[n22 >>> 5] |= 128 << 24 - n22 % 32;
              r4[(n22 + 64 >>> 9 << 4) + 14] = e3.floor(i3 / 4294967296);
              r4[(n22 + 64 >>> 9 << 4) + 15] = i3;
              t4.sigBytes = r4.length * 4;
              this._process();
              return this._hash;
            }, clone: function() {
              var t4 = s2.clone.call(this);
              t4._hash = this._hash.clone();
              return t4;
            } });
            r3.SHA256 = s2._createHelper(l);
            r3.HmacSHA256 = s2._createHmacHelper(l);
          })(Math);
          return t3.SHA256;
        });
      }, 3038: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        const n2 = i2(r2(8722));
        const s2 = i2(r2(669));
        const a = i2(r2(9420));
        class o {
          static init(t3) {
            var e3;
            if (this.inited)
              return;
            try {
              this.checkAppid(t3.appid);
              this.inited = true;
              s2.default.info(`init: appid=${t3.appid}`);
              a.default.init(t3);
              n2.default.connect();
            } catch (r3) {
              this.inited = false;
              (e3 = t3.onError) === null || e3 === void 0 || e3.call(t3.onError, { error: r3 });
              throw r3;
            }
          }
          static enableSocket(t3) {
            this.checkInit();
            n2.default.enableSocket(t3);
          }
          static checkInit() {
            if (!this.inited)
              throw new Error(`not init, please invoke init method firstly`);
          }
          static checkAppid(t3) {
            if (t3 == null || t3 == void 0 || t3.trim() == "")
              throw new Error(`invalid appid ${t3}`);
          }
        }
        o.inited = false;
        e2["default"] = o;
      }, 3087: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        const n2 = i2(r2(3651));
        const s2 = i2(r2(5224));
        const a = i2(r2(5022));
        var o;
        (function(t3) {
          let e3;
          let r3;
          let i3;
          function o2() {
            e3 = new n2.default();
            r3 = new s2.default();
            i3 = new a.default();
            if (!e3 || !r3 || !i3)
              throw new Error("init am error: no api impl found");
          }
          function u() {
            if (!e3)
              o2();
            return e3;
          }
          t3.getDevice = u;
          function c() {
            if (!r3)
              o2();
            return r3;
          }
          t3.getStorage = c;
          function l() {
            if (!i3)
              o2();
            return i3;
          }
          t3.getWebSocket = l;
        })(o || (o = {}));
        e2["default"] = o;
      }, 3128: function(t2, e2, r2) {
        (function(i2, n2, s2) {
          t2.exports = n2(r2(9021), r2(754), r2(4636), r2(9506), r2(7165));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i2 = r3.BlockCipher;
            var n2 = e3.algo;
            const s2 = 16;
            const a = [608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832, 137296536, 3964562569, 1160258022, 953160567, 3193202383, 887688300, 3232508343, 3380367581, 1065670069, 3041331479, 2450970073, 2306472731];
            const o = [[3509652390, 2564797868, 805139163, 3491422135, 3101798381, 1780907670, 3128725573, 4046225305, 614570311, 3012652279, 134345442, 2240740374, 1667834072, 1901547113, 2757295779, 4103290238, 227898511, 1921955416, 1904987480, 2182433518, 2069144605, 3260701109, 2620446009, 720527379, 3318853667, 677414384, 3393288472, 3101374703, 2390351024, 1614419982, 1822297739, 2954791486, 3608508353, 3174124327, 2024746970, 1432378464, 3864339955, 2857741204, 1464375394, 1676153920, 1439316330, 715854006, 3033291828, 289532110, 2706671279, 2087905683, 3018724369, 1668267050, 732546397, 1947742710, 3462151702, 2609353502, 2950085171, 1814351708, 2050118529, 680887927, 999245976, 1800124847, 3300911131, 1713906067, 1641548236, 4213287313, 1216130144, 1575780402, 4018429277, 3917837745, 3693486850, 3949271944, 596196993, 3549867205, 258830323, 2213823033, 772490370, 2760122372, 1774776394, 2652871518, 566650946, 4142492826, 1728879713, 2882767088, 1783734482, 3629395816, 2517608232, 2874225571, 1861159788, 326777828, 3124490320, 2130389656, 2716951837, 967770486, 1724537150, 2185432712, 2364442137, 1164943284, 2105845187, 998989502, 3765401048, 2244026483, 1075463327, 1455516326, 1322494562, 910128902, 469688178, 1117454909, 936433444, 3490320968, 3675253459, 1240580251, 122909385, 2157517691, 634681816, 4142456567, 3825094682, 3061402683, 2540495037, 79693498, 3249098678, 1084186820, 1583128258, 426386531, 1761308591, 1047286709, 322548459, 995290223, 1845252383, 2603652396, 3431023940, 2942221577, 3202600964, 3727903485, 1712269319, 422464435, 3234572375, 1170764815, 3523960633, 3117677531, 1434042557, 442511882, 3600875718, 1076654713, 1738483198, 4213154764, 2393238008, 3677496056, 1014306527, 4251020053, 793779912, 2902807211, 842905082, 4246964064, 1395751752, 1040244610, 2656851899, 3396308128, 445077038, 3742853595, 3577915638, 679411651, 2892444358, 2354009459, 1767581616, 3150600392, 3791627101, 3102740896, 284835224, 4246832056, 1258075500, 768725851, 2589189241, 3069724005, 3532540348, 1274779536, 3789419226, 2764799539, 1660621633, 3471099624, 4011903706, 913787905, 3497959166, 737222580, 2514213453, 2928710040, 3937242737, 1804850592, 3499020752, 2949064160, 2386320175, 2390070455, 2415321851, 4061277028, 2290661394, 2416832540, 1336762016, 1754252060, 3520065937, 3014181293, 791618072, 3188594551, 3933548030, 2332172193, 3852520463, 3043980520, 413987798, 3465142937, 3030929376, 4245938359, 2093235073, 3534596313, 375366246, 2157278981, 2479649556, 555357303, 3870105701, 2008414854, 3344188149, 4221384143, 3956125452, 2067696032, 3594591187, 2921233993, 2428461, 544322398, 577241275, 1471733935, 610547355, 4027169054, 1432588573, 1507829418, 2025931657, 3646575487, 545086370, 48609733, 2200306550, 1653985193, 298326376, 1316178497, 3007786442, 2064951626, 458293330, 2589141269, 3591329599, 3164325604, 727753846, 2179363840, 146436021, 1461446943, 4069977195, 705550613, 3059967265, 3887724982, 4281599278, 3313849956, 1404054877, 2845806497, 146425753, 1854211946], [1266315497, 3048417604, 3681880366, 3289982499, 290971e4, 1235738493, 2632868024, 2414719590, 3970600049, 1771706367, 1449415276, 3266420449, 422970021, 1963543593, 2690192192, 3826793022, 1062508698, 1531092325, 1804592342, 2583117782, 2714934279, 4024971509, 1294809318, 4028980673, 1289560198, 2221992742, 1669523910, 35572830, 157838143, 1052438473, 1016535060, 1802137761, 1753167236, 1386275462, 3080475397, 2857371447, 1040679964, 2145300060, 2390574316, 1461121720, 2956646967, 4031777805, 4028374788, 33600511, 2920084762, 1018524850, 629373528, 3691585981, 3515945977, 2091462646, 2486323059, 586499841, 988145025, 935516892, 3367335476, 2599673255, 2839830854, 265290510, 3972581182, 2759138881, 3795373465, 1005194799, 847297441, 406762289, 1314163512, 1332590856, 1866599683, 4127851711, 750260880, 613907577, 1450815602, 3165620655, 3734664991, 3650291728, 3012275730, 3704569646, 1427272223, 778793252, 1343938022, 2676280711, 2052605720, 1946737175, 3164576444, 3914038668, 3967478842, 3682934266, 1661551462, 3294938066, 4011595847, 840292616, 3712170807, 616741398, 312560963, 711312465, 1351876610, 322626781, 1910503582, 271666773, 2175563734, 1594956187, 70604529, 3617834859, 1007753275, 1495573769, 4069517037, 2549218298, 2663038764, 504708206, 2263041392, 3941167025, 2249088522, 1514023603, 1998579484, 1312622330, 694541497, 2582060303, 2151582166, 1382467621, 776784248, 2618340202, 3323268794, 2497899128, 2784771155, 503983604, 4076293799, 907881277, 423175695, 432175456, 1378068232, 4145222326, 3954048622, 3938656102, 3820766613, 2793130115, 2977904593, 26017576, 3274890735, 3194772133, 1700274565, 1756076034, 4006520079, 3677328699, 720338349, 1533947780, 354530856, 688349552, 3973924725, 1637815568, 332179504, 3949051286, 53804574, 2852348879, 3044236432, 1282449977, 3583942155, 3416972820, 4006381244, 1617046695, 2628476075, 3002303598, 1686838959, 431878346, 2686675385, 1700445008, 1080580658, 1009431731, 832498133, 3223435511, 2605976345, 2271191193, 2516031870, 1648197032, 4164389018, 2548247927, 300782431, 375919233, 238389289, 3353747414, 2531188641, 2019080857, 1475708069, 455242339, 2609103871, 448939670, 3451063019, 1395535956, 2413381860, 1841049896, 1491858159, 885456874, 4264095073, 4001119347, 1565136089, 3898914787, 1108368660, 540939232, 1173283510, 2745871338, 3681308437, 4207628240, 3343053890, 4016749493, 1699691293, 1103962373, 3625875870, 2256883143, 3830138730, 1031889488, 3479347698, 1535977030, 4236805024, 3251091107, 2132092099, 1774941330, 1199868427, 1452454533, 157007616, 2904115357, 342012276, 595725824, 1480756522, 206960106, 497939518, 591360097, 863170706, 2375253569, 3596610801, 1814182875, 2094937945, 3421402208, 1082520231, 3463918190, 2785509508, 435703966, 3908032597, 1641649973, 2842273706, 3305899714, 1510255612, 2148256476, 2655287854, 3276092548, 4258621189, 236887753, 3681803219, 274041037, 1734335097, 3815195456, 3317970021, 1899903192, 1026095262, 4050517792, 356393447, 2410691914, 3873677099, 3682840055], [3913112168, 2491498743, 4132185628, 2489919796, 1091903735, 1979897079, 3170134830, 3567386728, 3557303409, 857797738, 1136121015, 1342202287, 507115054, 2535736646, 337727348, 3213592640, 1301675037, 2528481711, 1895095763, 1721773893, 3216771564, 62756741, 2142006736, 835421444, 2531993523, 1442658625, 3659876326, 2882144922, 676362277, 1392781812, 170690266, 3921047035, 1759253602, 3611846912, 1745797284, 664899054, 1329594018, 3901205900, 3045908486, 2062866102, 2865634940, 3543621612, 3464012697, 1080764994, 553557557, 3656615353, 3996768171, 991055499, 499776247, 1265440854, 648242737, 3940784050, 980351604, 3713745714, 1749149687, 3396870395, 4211799374, 3640570775, 1161844396, 3125318951, 1431517754, 545492359, 4268468663, 3499529547, 1437099964, 2702547544, 3433638243, 2581715763, 2787789398, 1060185593, 1593081372, 2418618748, 4260947970, 69676912, 2159744348, 86519011, 2512459080, 3838209314, 1220612927, 3339683548, 133810670, 1090789135, 1078426020, 1569222167, 845107691, 3583754449, 4072456591, 1091646820, 628848692, 1613405280, 3757631651, 526609435, 236106946, 48312990, 2942717905, 3402727701, 1797494240, 859738849, 992217954, 4005476642, 2243076622, 3870952857, 3732016268, 765654824, 3490871365, 2511836413, 1685915746, 3888969200, 1414112111, 2273134842, 3281911079, 4080962846, 172450625, 2569994100, 980381355, 4109958455, 2819808352, 2716589560, 2568741196, 3681446669, 3329971472, 1835478071, 660984891, 3704678404, 4045999559, 3422617507, 3040415634, 1762651403, 1719377915, 3470491036, 2693910283, 3642056355, 3138596744, 1364962596, 2073328063, 1983633131, 926494387, 3423689081, 2150032023, 4096667949, 1749200295, 3328846651, 309677260, 2016342300, 1779581495, 3079819751, 111262694, 1274766160, 443224088, 298511866, 1025883608, 3806446537, 1145181785, 168956806, 3641502830, 3584813610, 1689216846, 3666258015, 3200248200, 1692713982, 2646376535, 4042768518, 1618508792, 1610833997, 3523052358, 4130873264, 2001055236, 3610705100, 2202168115, 4028541809, 2961195399, 1006657119, 2006996926, 3186142756, 1430667929, 3210227297, 1314452623, 4074634658, 4101304120, 2273951170, 1399257539, 3367210612, 3027628629, 1190975929, 2062231137, 2333990788, 2221543033, 2438960610, 1181637006, 548689776, 2362791313, 3372408396, 3104550113, 3145860560, 296247880, 1970579870, 3078560182, 3769228297, 1714227617, 3291629107, 3898220290, 166772364, 1251581989, 493813264, 448347421, 195405023, 2709975567, 677966185, 3703036547, 1463355134, 2715995803, 1338867538, 1343315457, 2802222074, 2684532164, 233230375, 2599980071, 2000651841, 3277868038, 1638401717, 4028070440, 3237316320, 6314154, 819756386, 300326615, 590932579, 1405279636, 3267499572, 3150704214, 2428286686, 3959192993, 3461946742, 1862657033, 1266418056, 963775037, 2089974820, 2263052895, 1917689273, 448879540, 3550394620, 3981727096, 150775221, 3627908307, 1303187396, 508620638, 2975983352, 2726630617, 1817252668, 1876281319, 1457606340, 908771278, 3720792119, 3617206836, 2455994898, 1729034894, 1080033504], [976866871, 3556439503, 2881648439, 1522871579, 1555064734, 1336096578, 3548522304, 2579274686, 3574697629, 3205460757, 3593280638, 3338716283, 3079412587, 564236357, 2993598910, 1781952180, 1464380207, 3163844217, 3332601554, 1699332808, 1393555694, 1183702653, 3581086237, 1288719814, 691649499, 2847557200, 2895455976, 3193889540, 2717570544, 1781354906, 1676643554, 2592534050, 3230253752, 1126444790, 2770207658, 2633158820, 2210423226, 2615765581, 2414155088, 3127139286, 673620729, 2805611233, 1269405062, 4015350505, 3341807571, 4149409754, 1057255273, 2012875353, 2162469141, 2276492801, 2601117357, 993977747, 3918593370, 2654263191, 753973209, 36408145, 2530585658, 25011837, 3520020182, 2088578344, 530523599, 2918365339, 1524020338, 1518925132, 3760827505, 3759777254, 1202760957, 3985898139, 3906192525, 674977740, 4174734889, 2031300136, 2019492241, 3983892565, 4153806404, 3822280332, 352677332, 2297720250, 60907813, 90501309, 3286998549, 1016092578, 2535922412, 2839152426, 457141659, 509813237, 4120667899, 652014361, 1966332200, 2975202805, 55981186, 2327461051, 676427537, 3255491064, 2882294119, 3433927263, 1307055953, 942726286, 933058658, 2468411793, 3933900994, 4215176142, 1361170020, 2001714738, 2830558078, 3274259782, 1222529897, 1679025792, 2729314320, 3714953764, 1770335741, 151462246, 3013232138, 1682292957, 1483529935, 471910574, 1539241949, 458788160, 3436315007, 1807016891, 3718408830, 978976581, 1043663428, 3165965781, 1927990952, 4200891579, 2372276910, 3208408903, 3533431907, 1412390302, 2931980059, 4132332400, 1947078029, 3881505623, 4168226417, 2941484381, 1077988104, 1320477388, 886195818, 18198404, 3786409e3, 2509781533, 112762804, 3463356488, 1866414978, 891333506, 18488651, 661792760, 1628790961, 3885187036, 3141171499, 876946877, 2693282273, 1372485963, 791857591, 2686433993, 3759982718, 3167212022, 3472953795, 2716379847, 445679433, 3561995674, 3504004811, 3574258232, 54117162, 3331405415, 2381918588, 3769707343, 4154350007, 1140177722, 4074052095, 668550556, 3214352940, 367459370, 261225585, 2610173221, 4209349473, 3468074219, 3265815641, 314222801, 3066103646, 3808782860, 282218597, 3406013506, 3773591054, 379116347, 1285071038, 846784868, 2669647154, 3771962079, 3550491691, 2305946142, 453669953, 1268987020, 3317592352, 3279303384, 3744833421, 2610507566, 3859509063, 266596637, 3847019092, 517658769, 3462560207, 3443424879, 370717030, 4247526661, 2224018117, 4143653529, 4112773975, 2788324899, 2477274417, 1456262402, 2901442914, 1517677493, 1846949527, 2295493580, 3734397586, 2176403920, 1280348187, 1908823572, 3871786941, 846861322, 1172426758, 3287448474, 3383383037, 1655181056, 3139813346, 901632758, 1897031941, 2986607138, 3066810236, 3447102507, 1393639104, 373351379, 950779232, 625454576, 3124240540, 4148612726, 2007998917, 544563296, 2244738638, 2330496472, 2058025392, 1291430526, 424198748, 50039436, 29584100, 3605783033, 2429876329, 2791104160, 1057563949, 3255363231, 3075367218, 3463963227, 1469046755, 985887462]];
            var u = { pbox: [], sbox: [] };
            function c(t4, e4) {
              let r4 = e4 >> 24 & 255;
              let i3 = e4 >> 16 & 255;
              let n22 = e4 >> 8 & 255;
              let s22 = e4 & 255;
              let a2 = t4.sbox[0][r4] + t4.sbox[1][i3];
              a2 ^= t4.sbox[2][n22];
              a2 += t4.sbox[3][s22];
              return a2;
            }
            function l(t4, e4, r4) {
              let i3 = e4;
              let n22 = r4;
              let a2;
              for (let e5 = 0; e5 < s2; ++e5) {
                i3 ^= t4.pbox[e5];
                n22 = c(t4, i3) ^ n22;
                a2 = i3;
                i3 = n22;
                n22 = a2;
              }
              a2 = i3;
              i3 = n22;
              n22 = a2;
              n22 ^= t4.pbox[s2];
              i3 ^= t4.pbox[s2 + 1];
              return { left: i3, right: n22 };
            }
            function f(t4, e4, r4) {
              let i3 = e4;
              let n22 = r4;
              let a2;
              for (let e5 = s2 + 1; e5 > 1; --e5) {
                i3 ^= t4.pbox[e5];
                n22 = c(t4, i3) ^ n22;
                a2 = i3;
                i3 = n22;
                n22 = a2;
              }
              a2 = i3;
              i3 = n22;
              n22 = a2;
              n22 ^= t4.pbox[1];
              i3 ^= t4.pbox[0];
              return { left: i3, right: n22 };
            }
            function h(t4, e4, r4) {
              for (let e5 = 0; e5 < 4; e5++) {
                t4.sbox[e5] = [];
                for (let r5 = 0; r5 < 256; r5++)
                  t4.sbox[e5][r5] = o[e5][r5];
              }
              let i3 = 0;
              for (let n3 = 0; n3 < s2 + 2; n3++) {
                t4.pbox[n3] = a[n3] ^ e4[i3];
                i3++;
                if (i3 >= r4)
                  i3 = 0;
              }
              let n22 = 0;
              let u2 = 0;
              let c2 = 0;
              for (let e5 = 0; e5 < s2 + 2; e5 += 2) {
                c2 = l(t4, n22, u2);
                n22 = c2.left;
                u2 = c2.right;
                t4.pbox[e5] = n22;
                t4.pbox[e5 + 1] = u2;
              }
              for (let e5 = 0; e5 < 4; e5++)
                for (let r5 = 0; r5 < 256; r5 += 2) {
                  c2 = l(t4, n22, u2);
                  n22 = c2.left;
                  u2 = c2.right;
                  t4.sbox[e5][r5] = n22;
                  t4.sbox[e5][r5 + 1] = u2;
                }
              return true;
            }
            var d = n2.Blowfish = i2.extend({ _doReset: function() {
              if (this._keyPriorReset === this._key)
                return;
              var t4 = this._keyPriorReset = this._key;
              var e4 = t4.words;
              var r4 = t4.sigBytes / 4;
              h(u, e4, r4);
            }, encryptBlock: function(t4, e4) {
              var r4 = l(u, t4[e4], t4[e4 + 1]);
              t4[e4] = r4.left;
              t4[e4 + 1] = r4.right;
            }, decryptBlock: function(t4, e4) {
              var r4 = f(u, t4[e4], t4[e4 + 1]);
              t4[e4] = r4.left;
              t4[e4 + 1] = r4.right;
            }, blockSize: 64 / 32, keySize: 128 / 32, ivSize: 64 / 32 });
            e3.Blowfish = i2._createHelper(d);
          })();
          return t3.Blowfish;
        });
      }, 3237: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        const n2 = i2(r2(4915));
        const s2 = i2(r2(8036));
        const a = i2(r2(213));
        const o = r2(1458);
        const u = i2(r2(7374));
        const c = i2(r2(9420));
        class l extends u.default {
          constructor() {
            super(...arguments);
            this.addPhoneInfoData = new f();
          }
          static create() {
            let t3 = new l();
            super.initActionMsg(t3);
            t3.callback = (e3) => {
              if (e3.resultCode != o.ErrorCode.SUCCESS && e3.resultCode != o.ErrorCode.REPEAT_MESSAGE)
                setTimeout(function() {
                  t3.send();
                }, 30 * 1e3);
              else
                s2.default.set({ key: s2.default.KEY_ADD_PHONE_INFO_TIME, data: (/* @__PURE__ */ new Date()).getTime() });
            };
            t3.actionMsgData.msgAction = u.default.ClientAction.ADD_PHONE_INFO;
            t3.addPhoneInfoData = f.create();
            t3.actionMsgData.msgData = JSON.stringify(t3.addPhoneInfoData);
            return t3;
          }
          send() {
            let t3 = (/* @__PURE__ */ new Date()).getTime();
            let e3 = s2.default.getSync(s2.default.KEY_ADD_PHONE_INFO_TIME, 0);
            if (t3 - e3 < 24 * 60 * 60 * 1e3)
              return;
            super.send();
          }
        }
        class f {
          constructor() {
            this.model = "";
            this.brand = "";
            this.system_version = "";
            this.version = "";
            this.deviceid = "";
            this.type = "";
          }
          static create() {
            let t3 = new f();
            t3.model = n2.default.model();
            t3.brand = n2.default.brand();
            t3.system_version = n2.default.osVersion();
            t3.version = a.default.SDK_VERSION;
            t3.device_token = "";
            t3.imei = "";
            t3.oaid = "";
            t3.mac = "";
            t3.idfa = "";
            t3.type = "MINIPROGRAM";
            t3.deviceid = `${t3.type}-${c.default.deviceId}`;
            t3.extra = { os: n2.default.os(), platform: n2.default.platform(), platformVersion: n2.default.platformVersion(), platformId: n2.default.platformId(), language: n2.default.language(), userAgent: n2.default.userAgent() };
            return t3;
          }
        }
        e2["default"] = l;
      }, 3240: function(t2, e2, r2) {
        (function(i2, n2) {
          t2.exports = n2(r2(9021));
        })(this, function(t3) {
          (function(e3) {
            var r3 = t3;
            var i2 = r3.lib;
            var n2 = i2.Base;
            var s2 = i2.WordArray;
            var a = r3.x64 = {};
            a.Word = n2.extend({ init: function(t4, e4) {
              this.high = t4;
              this.low = e4;
            } });
            a.WordArray = n2.extend({ init: function(t4, r4) {
              t4 = this.words = t4 || [];
              if (r4 != e3)
                this.sigBytes = r4;
              else
                this.sigBytes = t4.length * 8;
            }, toX32: function() {
              var t4 = this.words;
              var e4 = t4.length;
              var r4 = [];
              for (var i3 = 0; i3 < e4; i3++) {
                var n22 = t4[i3];
                r4.push(n22.high);
                r4.push(n22.low);
              }
              return s2.create(r4, this.sigBytes);
            }, clone: function() {
              var t4 = n2.clone.call(this);
              var e4 = t4.words = this.words.slice(0);
              var r4 = e4.length;
              for (var i3 = 0; i3 < r4; i3++)
                e4[i3] = e4[i3].clone();
              return t4;
            } });
          })();
          return t3;
        });
      }, 3651: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        const n2 = i2(r2(7930));
        class s2 {
          constructor() {
            try {
              this.systemInfo = uni.getSystemInfoSync();
              this.accountInfo = uni.getAccountInfoSync();
            } catch (t3) {
            }
          }
          os() {
            return n2.default.getStr(this.systemInfo, "platform");
          }
          model() {
            return n2.default.getStr(this.systemInfo, "model");
          }
          brand() {
            return n2.default.getStr(this.systemInfo, "brand");
          }
          osVersion() {
            return n2.default.getStr(this.systemInfo, "system");
          }
          platform() {
            let t3 = "";
            t3 = "APP-PLUS";
            return t3;
          }
          platformVersion() {
            return this.systemInfo ? this.systemInfo.version : "";
          }
          platformId() {
            return this.accountInfo ? this.accountInfo.miniProgram.appId : "";
          }
          language() {
            var t3;
            return ((t3 = this.systemInfo) === null || t3 === void 0 ? void 0 : t3.language) ? this.systemInfo.language : "";
          }
          userAgent() {
            return window ? window.navigator.userAgent : "";
          }
          getNetworkType(t3) {
            uni.getNetworkType(t3);
          }
          onNetworkStatusChange(t3) {
            uni.onNetworkStatusChange(t3);
          }
        }
        e2["default"] = s2;
      }, 3797: function(t2, e2, r2) {
        (function(i2, n2, s2) {
          t2.exports = n2(r2(9021), r2(7165));
        })(this, function(t3) {
          t3.mode.OFB = function() {
            var e3 = t3.lib.BlockCipherMode.extend();
            var r3 = e3.Encryptor = e3.extend({ processBlock: function(t4, e4) {
              var r4 = this._cipher;
              var i2 = r4.blockSize;
              var n2 = this._iv;
              var s2 = this._keystream;
              if (n2) {
                s2 = this._keystream = n2.slice(0);
                this._iv = void 0;
              }
              r4.encryptBlock(s2, 0);
              for (var a = 0; a < i2; a++)
                t4[e4 + a] ^= s2[a];
            } });
            e3.Decryptor = r3;
            return e3;
          }();
          return t3.mode.OFB;
        });
      }, 3886: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        const n2 = i2(r2(213));
        const s2 = i2(r2(3038));
        const a = i2(r2(9420));
        const o = i2(r2(669));
        var u;
        (function(t3) {
          function e3(t4) {
            o.default.debugMode = t4;
            o.default.info(`setDebugMode: ${t4}`);
          }
          t3.setDebugMode = e3;
          function r3(t4) {
            try {
              s2.default.init(t4);
            } catch (t5) {
              o.default.error(`init error`, t5);
            }
          }
          t3.init = r3;
          function i3(t4) {
            try {
              if (!t4.url)
                throw new Error("invalid url");
              if (!t4.key || !t4.keyId)
                throw new Error("invalid key or keyId");
              a.default.socketUrl = t4.url;
              a.default.publicKeyId = t4.keyId;
              a.default.publicKey = t4.key;
            } catch (t5) {
              o.default.error(`setSocketServer error`, t5);
            }
          }
          t3.setSocketServer = i3;
          function u2(t4) {
            try {
              s2.default.enableSocket(t4);
            } catch (t5) {
              o.default.error(`enableSocket error`, t5);
            }
          }
          t3.enableSocket = u2;
          function c() {
            return n2.default.SDK_VERSION;
          }
          t3.getVersion = c;
        })(u || (u = {}));
        t2.exports = u;
      }, 4094: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        const n2 = r2(1458);
        const s2 = i2(r2(7374));
        class a extends s2.default {
          constructor() {
            super(...arguments);
            this.feedbackResultData = new o();
          }
          static parse(t3) {
            let e3 = new a();
            super.parseActionMsg(e3, t3);
            e3.feedbackResultData = o.parse(e3.actionMsgData.msgData);
            return e3;
          }
          receive() {
            var t3;
            this.feedbackResultData;
            let e3 = s2.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
            if (e3)
              (t3 = e3.callback) === null || t3 === void 0 || t3.call(e3.callback, { resultCode: n2.ErrorCode.SUCCESS, message: "received" });
          }
        }
        class o {
          constructor() {
            this.actionId = "";
            this.taskId = "";
            this.result = "";
          }
          static parse(t3) {
            let e3 = new o();
            let r3 = JSON.parse(t3);
            e3.actionId = r3.actionId;
            e3.taskId = r3.taskId;
            e3.result = r3.result;
            return e3;
          }
        }
        e2["default"] = a;
      }, 4490: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        const n2 = r2(1458);
        const s2 = i2(r2(9420));
        const a = i2(r2(7374));
        class o extends a.default {
          constructor() {
            super(...arguments);
            this.receivedData = new u();
          }
          static create(t3) {
            let e3 = new o();
            super.initActionMsg(e3);
            e3.callback = (t4) => {
              if (t4.resultCode != n2.ErrorCode.SUCCESS && t4.resultCode != n2.ErrorCode.REPEAT_MESSAGE)
                setTimeout(function() {
                  e3.send();
                }, 3 * 1e3);
            };
            e3.actionMsgData.msgAction = a.default.ClientAction.RECEIVED;
            e3.receivedData = u.create(t3);
            e3.actionMsgData.msgData = JSON.stringify(e3.receivedData);
            return e3;
          }
          static parse(t3) {
            let e3 = new o();
            super.parseActionMsg(e3, t3);
            e3.receivedData = u.parse(e3.data);
            return e3;
          }
          receive() {
            var t3;
            let e3 = a.default.getWaitingResponseMessage(this.actionMsgData.msgId);
            if (e3 && e3.actionMsgData.msgAction == a.default.ClientAction.ADD_PHONE_INFO || e3 && e3.actionMsgData.msgAction == a.default.ClientAction.FEED_BACK) {
              a.default.removeWaitingResponseMessage(e3.actionMsgData.msgId);
              (t3 = e3.callback) === null || t3 === void 0 || t3.call(e3.callback, { resultCode: n2.ErrorCode.SUCCESS, message: "received" });
            }
          }
          send() {
            super.send();
          }
        }
        class u {
          constructor() {
            this.msgId = "";
            this.cid = "";
          }
          static create(t3) {
            let e3 = new u();
            e3.cid = s2.default.cid;
            e3.msgId = t3;
            return e3;
          }
          static parse(t3) {
            let e3 = new u();
            let r3 = JSON.parse(t3);
            e3.cid = r3.cid;
            e3.msgId = r3.msgId;
            return e3;
          }
        }
        e2["default"] = o;
      }, 4636: function(t2, e2, r2) {
        (function(i2, n2) {
          t2.exports = n2(r2(9021));
        })(this, function(t3) {
          (function(e3) {
            var r3 = t3;
            var i2 = r3.lib;
            var n2 = i2.WordArray;
            var s2 = i2.Hasher;
            var a = r3.algo;
            var o = [];
            (function() {
              for (var t4 = 0; t4 < 64; t4++)
                o[t4] = e3.abs(e3.sin(t4 + 1)) * 4294967296 | 0;
            })();
            var u = a.MD5 = s2.extend({ _doReset: function() {
              this._hash = new n2.init([1732584193, 4023233417, 2562383102, 271733878]);
            }, _doProcessBlock: function(t4, e4) {
              for (var r4 = 0; r4 < 16; r4++) {
                var i3 = e4 + r4;
                var n22 = t4[i3];
                t4[i3] = (n22 << 8 | n22 >>> 24) & 16711935 | (n22 << 24 | n22 >>> 8) & 4278255360;
              }
              var s22 = this._hash.words;
              var a2 = t4[e4 + 0];
              var u2 = t4[e4 + 1];
              var d = t4[e4 + 2];
              var v = t4[e4 + 3];
              var p = t4[e4 + 4];
              var g = t4[e4 + 5];
              var y = t4[e4 + 6];
              var m = t4[e4 + 7];
              var _ = t4[e4 + 8];
              var w = t4[e4 + 9];
              var S = t4[e4 + 10];
              var b = t4[e4 + 11];
              var E = t4[e4 + 12];
              var D = t4[e4 + 13];
              var T = t4[e4 + 14];
              var M = t4[e4 + 15];
              var I = s22[0];
              var A = s22[1];
              var R = s22[2];
              var x = s22[3];
              I = c(I, A, R, x, a2, 7, o[0]);
              x = c(x, I, A, R, u2, 12, o[1]);
              R = c(R, x, I, A, d, 17, o[2]);
              A = c(A, R, x, I, v, 22, o[3]);
              I = c(I, A, R, x, p, 7, o[4]);
              x = c(x, I, A, R, g, 12, o[5]);
              R = c(R, x, I, A, y, 17, o[6]);
              A = c(A, R, x, I, m, 22, o[7]);
              I = c(I, A, R, x, _, 7, o[8]);
              x = c(x, I, A, R, w, 12, o[9]);
              R = c(R, x, I, A, S, 17, o[10]);
              A = c(A, R, x, I, b, 22, o[11]);
              I = c(I, A, R, x, E, 7, o[12]);
              x = c(x, I, A, R, D, 12, o[13]);
              R = c(R, x, I, A, T, 17, o[14]);
              A = c(A, R, x, I, M, 22, o[15]);
              I = l(I, A, R, x, u2, 5, o[16]);
              x = l(x, I, A, R, y, 9, o[17]);
              R = l(R, x, I, A, b, 14, o[18]);
              A = l(A, R, x, I, a2, 20, o[19]);
              I = l(I, A, R, x, g, 5, o[20]);
              x = l(x, I, A, R, S, 9, o[21]);
              R = l(R, x, I, A, M, 14, o[22]);
              A = l(A, R, x, I, p, 20, o[23]);
              I = l(I, A, R, x, w, 5, o[24]);
              x = l(x, I, A, R, T, 9, o[25]);
              R = l(R, x, I, A, v, 14, o[26]);
              A = l(A, R, x, I, _, 20, o[27]);
              I = l(I, A, R, x, D, 5, o[28]);
              x = l(x, I, A, R, d, 9, o[29]);
              R = l(R, x, I, A, m, 14, o[30]);
              A = l(A, R, x, I, E, 20, o[31]);
              I = f(I, A, R, x, g, 4, o[32]);
              x = f(x, I, A, R, _, 11, o[33]);
              R = f(R, x, I, A, b, 16, o[34]);
              A = f(A, R, x, I, T, 23, o[35]);
              I = f(I, A, R, x, u2, 4, o[36]);
              x = f(x, I, A, R, p, 11, o[37]);
              R = f(R, x, I, A, m, 16, o[38]);
              A = f(A, R, x, I, S, 23, o[39]);
              I = f(I, A, R, x, D, 4, o[40]);
              x = f(x, I, A, R, a2, 11, o[41]);
              R = f(R, x, I, A, v, 16, o[42]);
              A = f(A, R, x, I, y, 23, o[43]);
              I = f(I, A, R, x, w, 4, o[44]);
              x = f(x, I, A, R, E, 11, o[45]);
              R = f(R, x, I, A, M, 16, o[46]);
              A = f(A, R, x, I, d, 23, o[47]);
              I = h(I, A, R, x, a2, 6, o[48]);
              x = h(x, I, A, R, m, 10, o[49]);
              R = h(R, x, I, A, T, 15, o[50]);
              A = h(A, R, x, I, g, 21, o[51]);
              I = h(I, A, R, x, E, 6, o[52]);
              x = h(x, I, A, R, v, 10, o[53]);
              R = h(R, x, I, A, S, 15, o[54]);
              A = h(A, R, x, I, u2, 21, o[55]);
              I = h(I, A, R, x, _, 6, o[56]);
              x = h(x, I, A, R, M, 10, o[57]);
              R = h(R, x, I, A, y, 15, o[58]);
              A = h(A, R, x, I, D, 21, o[59]);
              I = h(I, A, R, x, p, 6, o[60]);
              x = h(x, I, A, R, b, 10, o[61]);
              R = h(R, x, I, A, d, 15, o[62]);
              A = h(A, R, x, I, w, 21, o[63]);
              s22[0] = s22[0] + I | 0;
              s22[1] = s22[1] + A | 0;
              s22[2] = s22[2] + R | 0;
              s22[3] = s22[3] + x | 0;
            }, _doFinalize: function() {
              var t4 = this._data;
              var r4 = t4.words;
              var i3 = this._nDataBytes * 8;
              var n22 = t4.sigBytes * 8;
              r4[n22 >>> 5] |= 128 << 24 - n22 % 32;
              var s22 = e3.floor(i3 / 4294967296);
              var a2 = i3;
              r4[(n22 + 64 >>> 9 << 4) + 15] = (s22 << 8 | s22 >>> 24) & 16711935 | (s22 << 24 | s22 >>> 8) & 4278255360;
              r4[(n22 + 64 >>> 9 << 4) + 14] = (a2 << 8 | a2 >>> 24) & 16711935 | (a2 << 24 | a2 >>> 8) & 4278255360;
              t4.sigBytes = (r4.length + 1) * 4;
              this._process();
              var o2 = this._hash;
              var u2 = o2.words;
              for (var c2 = 0; c2 < 4; c2++) {
                var l2 = u2[c2];
                u2[c2] = (l2 << 8 | l2 >>> 24) & 16711935 | (l2 << 24 | l2 >>> 8) & 4278255360;
              }
              return o2;
            }, clone: function() {
              var t4 = s2.clone.call(this);
              t4._hash = this._hash.clone();
              return t4;
            } });
            function c(t4, e4, r4, i3, n22, s22, a2) {
              var o2 = t4 + (e4 & r4 | ~e4 & i3) + n22 + a2;
              return (o2 << s22 | o2 >>> 32 - s22) + e4;
            }
            function l(t4, e4, r4, i3, n22, s22, a2) {
              var o2 = t4 + (e4 & i3 | r4 & ~i3) + n22 + a2;
              return (o2 << s22 | o2 >>> 32 - s22) + e4;
            }
            function f(t4, e4, r4, i3, n22, s22, a2) {
              var o2 = t4 + (e4 ^ r4 ^ i3) + n22 + a2;
              return (o2 << s22 | o2 >>> 32 - s22) + e4;
            }
            function h(t4, e4, r4, i3, n22, s22, a2) {
              var o2 = t4 + (r4 ^ (e4 | ~i3)) + n22 + a2;
              return (o2 << s22 | o2 >>> 32 - s22) + e4;
            }
            r3.MD5 = s2._createHelper(u);
            r3.HmacMD5 = s2._createHmacHelper(u);
          })(Math);
          return t3.MD5;
        });
      }, 4725: function(t2, e2, r2) {
        (function(i2, n2) {
          t2.exports = n2(r2(9021));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i2 = r3.WordArray;
            var n2 = e3.enc;
            n2.Base64url = { stringify: function(t4, e4) {
              if (e4 === void 0)
                e4 = true;
              var r4 = t4.words;
              var i3 = t4.sigBytes;
              var n22 = e4 ? this._safe_map : this._map;
              t4.clamp();
              var s2 = [];
              for (var a2 = 0; a2 < i3; a2 += 3) {
                var o = r4[a2 >>> 2] >>> 24 - a2 % 4 * 8 & 255;
                var u = r4[a2 + 1 >>> 2] >>> 24 - (a2 + 1) % 4 * 8 & 255;
                var c = r4[a2 + 2 >>> 2] >>> 24 - (a2 + 2) % 4 * 8 & 255;
                var l = o << 16 | u << 8 | c;
                for (var f = 0; f < 4 && a2 + f * 0.75 < i3; f++)
                  s2.push(n22.charAt(l >>> 6 * (3 - f) & 63));
              }
              var h = n22.charAt(64);
              if (h)
                while (s2.length % 4)
                  s2.push(h);
              return s2.join("");
            }, parse: function(t4, e4) {
              if (e4 === void 0)
                e4 = true;
              var r4 = t4.length;
              var i3 = e4 ? this._safe_map : this._map;
              var n22 = this._reverseMap;
              if (!n22) {
                n22 = this._reverseMap = [];
                for (var s2 = 0; s2 < i3.length; s2++)
                  n22[i3.charCodeAt(s2)] = s2;
              }
              var o = i3.charAt(64);
              if (o) {
                var u = t4.indexOf(o);
                if (u !== -1)
                  r4 = u;
              }
              return a(t4, r4, n22);
            }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_" };
            function a(t4, e4, r4) {
              var n22 = [];
              var s2 = 0;
              for (var a2 = 0; a2 < e4; a2++)
                if (a2 % 4) {
                  var o = r4[t4.charCodeAt(a2 - 1)] << a2 % 4 * 2;
                  var u = r4[t4.charCodeAt(a2)] >>> 6 - a2 % 4 * 2;
                  var c = o | u;
                  n22[s2 >>> 2] |= c << 24 - s2 % 4 * 8;
                  s2++;
                }
              return i2.create(n22, s2);
            }
          })();
          return t3.enc.Base64url;
        });
      }, 4786: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        e2.RedirectServerData = void 0;
        const n2 = i2(r2(8722));
        const s2 = i2(r2(8036));
        const a = i2(r2(7574));
        class o extends a.default {
          constructor() {
            super(...arguments);
            this.redirectServerData = new u();
          }
          static parse(t3) {
            let e3 = new o();
            super.parseMsg(e3, t3);
            e3.redirectServerData = u.parse(e3.data);
            return e3;
          }
          receive() {
            this.redirectServerData;
            s2.default.setSync(s2.default.KEY_REDIRECT_SERVER, JSON.stringify(this.redirectServerData));
            n2.default.close("redirect server");
            n2.default.reconnect(this.redirectServerData.delay);
          }
        }
        class u {
          constructor() {
            this.addressList = [];
            this.delay = 0;
            this.loc = "";
            this.conf = "";
            this.time = 0;
          }
          static parse(t3) {
            let e3 = new u();
            let r3 = JSON.parse(t3);
            e3.addressList = r3.addressList;
            e3.delay = r3.delay;
            e3.loc = r3.loc;
            e3.conf = r3.conf;
            e3.time = r3.time ? r3.time : (/* @__PURE__ */ new Date()).getTime();
            return e3;
          }
        }
        e2.RedirectServerData = u;
        e2["default"] = o;
      }, 4905: function(t2, e2, r2) {
        (function(i2, n2, s2) {
          t2.exports = n2(r2(9021), r2(7165));
        })(this, function(t3) {
          t3.pad.Iso10126 = { pad: function(e3, r3) {
            var i2 = r3 * 4;
            var n2 = i2 - e3.sigBytes % i2;
            e3.concat(t3.lib.WordArray.random(n2 - 1)).concat(t3.lib.WordArray.create([n2 << 24], 1));
          }, unpad: function(t4) {
            var e3 = t4.words[t4.sigBytes - 1 >>> 2] & 255;
            t4.sigBytes -= e3;
          } };
          return t3.pad.Iso10126;
        });
      }, 4915: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        const n2 = i2(r2(3087));
        var s2;
        (function(t3) {
          function e3() {
            return n2.default.getDevice().os();
          }
          t3.os = e3;
          function r3() {
            return n2.default.getDevice().osVersion();
          }
          t3.osVersion = r3;
          function i3() {
            return n2.default.getDevice().model();
          }
          t3.model = i3;
          function s22() {
            return n2.default.getDevice().brand();
          }
          t3.brand = s22;
          function a() {
            return n2.default.getDevice().platform();
          }
          t3.platform = a;
          function o() {
            return n2.default.getDevice().platformVersion();
          }
          t3.platformVersion = o;
          function u() {
            return n2.default.getDevice().platformId();
          }
          t3.platformId = u;
          function c() {
            return n2.default.getDevice().language();
          }
          t3.language = c;
          function l() {
            let t4 = n2.default.getDevice().userAgent;
            if (t4)
              return t4();
            return "";
          }
          t3.userAgent = l;
          function f(t4) {
            n2.default.getDevice().getNetworkType(t4);
          }
          t3.getNetworkType = f;
          function h(t4) {
            n2.default.getDevice().onNetworkStatusChange(t4);
          }
          t3.onNetworkStatusChange = h;
        })(s2 || (s2 = {}));
        e2["default"] = s2;
      }, 5022: (t2, e2) => {
        Object.defineProperty(e2, "__esModule", { value: true });
        class r2 {
          connect(t3) {
            let e3 = uni.connectSocket(t3);
            return { send: (t4) => {
              e3 === null || e3 === void 0 || e3.send(t4);
            }, close: (t4) => {
              e3 === null || e3 === void 0 || e3.close(t4);
            }, onOpen: (t4) => {
              e3 === null || e3 === void 0 || e3.onOpen(t4);
            }, onError: (t4) => {
              e3 === null || e3 === void 0 || e3.onError(t4);
            }, onMessage: (t4) => {
              e3 === null || e3 === void 0 || e3.onMessage(t4);
            }, onClose: (t4) => {
              e3 === null || e3 === void 0 || e3.onClose(t4);
            } };
          }
        }
        e2["default"] = r2;
      }, 5110: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        var n2;
        Object.defineProperty(e2, "__esModule", { value: true });
        const s2 = i2(r2(1161));
        const a = i2(r2(2241));
        class o extends a.default {
          static getInstance() {
            return o.InstanceHolder.instance;
          }
          run() {
            s2.default.create().send();
          }
          refresh() {
            this.delay = 60 * 1e3;
            this.start();
          }
        }
        o.INTERVAL = 60 * 1e3;
        o.InstanceHolder = (n2 = class {
        }, n2.instance = new o(o.INTERVAL), n2);
        e2["default"] = o;
      }, 5224: (t2, e2) => {
        Object.defineProperty(e2, "__esModule", { value: true });
        class r2 {
          set(t3) {
            uni.setStorage(t3);
          }
          setSync(t3, e3) {
            uni.setStorageSync(t3, e3);
          }
          get(t3) {
            uni.getStorage(t3);
          }
          getSync(t3) {
            return uni.getStorageSync(t3);
          }
        }
        e2["default"] = r2;
      }, 5471: function(t2, e2, r2) {
        (function(i2, n2) {
          t2.exports = n2(r2(9021));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i2 = r3.WordArray;
            var n2 = r3.Hasher;
            var s2 = e3.algo;
            var a = [];
            var o = s2.SHA1 = n2.extend({ _doReset: function() {
              this._hash = new i2.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
            }, _doProcessBlock: function(t4, e4) {
              var r4 = this._hash.words;
              var i3 = r4[0];
              var n22 = r4[1];
              var s22 = r4[2];
              var o2 = r4[3];
              var u = r4[4];
              for (var c = 0; c < 80; c++) {
                if (c < 16)
                  a[c] = t4[e4 + c] | 0;
                else {
                  var l = a[c - 3] ^ a[c - 8] ^ a[c - 14] ^ a[c - 16];
                  a[c] = l << 1 | l >>> 31;
                }
                var f = (i3 << 5 | i3 >>> 27) + u + a[c];
                if (c < 20)
                  f += (n22 & s22 | ~n22 & o2) + 1518500249;
                else if (c < 40)
                  f += (n22 ^ s22 ^ o2) + 1859775393;
                else if (c < 60)
                  f += (n22 & s22 | n22 & o2 | s22 & o2) - 1894007588;
                else
                  f += (n22 ^ s22 ^ o2) - 899497514;
                u = o2;
                o2 = s22;
                s22 = n22 << 30 | n22 >>> 2;
                n22 = i3;
                i3 = f;
              }
              r4[0] = r4[0] + i3 | 0;
              r4[1] = r4[1] + n22 | 0;
              r4[2] = r4[2] + s22 | 0;
              r4[3] = r4[3] + o2 | 0;
              r4[4] = r4[4] + u | 0;
            }, _doFinalize: function() {
              var t4 = this._data;
              var e4 = t4.words;
              var r4 = this._nDataBytes * 8;
              var i3 = t4.sigBytes * 8;
              e4[i3 >>> 5] |= 128 << 24 - i3 % 32;
              e4[(i3 + 64 >>> 9 << 4) + 14] = Math.floor(r4 / 4294967296);
              e4[(i3 + 64 >>> 9 << 4) + 15] = r4;
              t4.sigBytes = e4.length * 4;
              this._process();
              return this._hash;
            }, clone: function() {
              var t4 = n2.clone.call(this);
              t4._hash = this._hash.clone();
              return t4;
            } });
            e3.SHA1 = n2._createHelper(o);
            e3.HmacSHA1 = n2._createHmacHelper(o);
          })();
          return t3.SHA1;
        });
      }, 5503: function(t2, e2, r2) {
        (function(i2, n2) {
          t2.exports = n2(r2(9021));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i2 = r3.WordArray;
            var n2 = e3.enc;
            n2.Utf16 = n2.Utf16BE = { stringify: function(t4) {
              var e4 = t4.words;
              var r4 = t4.sigBytes;
              var i3 = [];
              for (var n22 = 0; n22 < r4; n22 += 2) {
                var s2 = e4[n22 >>> 2] >>> 16 - n22 % 4 * 8 & 65535;
                i3.push(String.fromCharCode(s2));
              }
              return i3.join("");
            }, parse: function(t4) {
              var e4 = t4.length;
              var r4 = [];
              for (var n22 = 0; n22 < e4; n22++)
                r4[n22 >>> 1] |= t4.charCodeAt(n22) << 16 - n22 % 2 * 16;
              return i2.create(r4, e4 * 2);
            } };
            n2.Utf16LE = { stringify: function(t4) {
              var e4 = t4.words;
              var r4 = t4.sigBytes;
              var i3 = [];
              for (var n22 = 0; n22 < r4; n22 += 2) {
                var s2 = a(e4[n22 >>> 2] >>> 16 - n22 % 4 * 8 & 65535);
                i3.push(String.fromCharCode(s2));
              }
              return i3.join("");
            }, parse: function(t4) {
              var e4 = t4.length;
              var r4 = [];
              for (var n22 = 0; n22 < e4; n22++)
                r4[n22 >>> 1] |= a(t4.charCodeAt(n22) << 16 - n22 % 2 * 16);
              return i2.create(r4, e4 * 2);
            } };
            function a(t4) {
              return t4 << 8 & 4278255360 | t4 >>> 8 & 16711935;
            }
          })();
          return t3.enc.Utf16;
        });
      }, 5520: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        const n2 = i2(r2(8722));
        const s2 = i2(r2(669));
        const a = i2(r2(7574));
        class o extends a.default {
          constructor() {
            super(...arguments);
            this.serverCloseData = new u();
          }
          static parse(t3) {
            let e3 = new o();
            super.parseMsg(e3, t3);
            e3.serverCloseData = u.parse(e3.data);
            return e3;
          }
          receive() {
            JSON.stringify(this.serverCloseData);
            let t3 = `server close ${this.serverCloseData.code}`;
            if (this.serverCloseData.code == 20 || this.serverCloseData.code == 23 || this.serverCloseData.code == 24) {
              n2.default.allowReconnect = false;
              n2.default.close(t3);
            } else if (this.serverCloseData.code == 21)
              this.safeClose21(t3);
            else {
              n2.default.allowReconnect = true;
              n2.default.close(t3);
              n2.default.reconnect(10);
            }
          }
          safeClose21(t3) {
            try {
              if (typeof document != "undefined") {
                if (document.hasFocus() && document.visibilityState == "visible") {
                  n2.default.allowReconnect = true;
                  n2.default.close(t3);
                  n2.default.reconnect(10);
                  return;
                }
              }
              n2.default.allowReconnect = false;
              n2.default.close(t3);
            } catch (e3) {
              s2.default.error(`ServerClose t1`, e3);
              n2.default.allowReconnect = false;
              n2.default.close(`${t3} error`);
            }
          }
        }
        class u {
          constructor() {
            this.code = -1;
            this.msg = "";
          }
          static parse(t3) {
            let e3 = new u();
            let r3 = JSON.parse(t3);
            e3.code = r3.code;
            e3.msg = r3.msg;
            return e3;
          }
        }
        e2["default"] = o;
      }, 5575: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        const n2 = i2(r2(8036));
        const s2 = i2(r2(669));
        const a = i2(r2(7374));
        class o extends a.default {
          constructor() {
            super(...arguments);
            this.unbindAliasResultData = new u();
          }
          static parse(t3) {
            let e3 = new o();
            super.parseActionMsg(e3, t3);
            e3.unbindAliasResultData = u.parse(e3.actionMsgData.msgData);
            return e3;
          }
          receive() {
            var t3;
            s2.default.info(`unbind alias result`, this.unbindAliasResultData);
            let e3 = a.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
            if (e3)
              (t3 = e3.callback) === null || t3 === void 0 || t3.call(e3.callback, { resultCode: this.unbindAliasResultData.errorCode, message: this.unbindAliasResultData.errorMsg });
            n2.default.set({ key: n2.default.KEY_BIND_ALIAS_TIME, data: (/* @__PURE__ */ new Date()).getTime() });
          }
        }
        class u {
          constructor() {
            this.errorCode = -1;
            this.errorMsg = "";
          }
          static parse(t3) {
            let e3 = new u();
            let r3 = JSON.parse(t3);
            e3.errorCode = r3.errorCode;
            e3.errorMsg = r3.errorMsg;
            return e3;
          }
        }
        e2["default"] = o;
      }, 5953: function(t2, e2, r2) {
        (function(i2, n2, s2) {
          t2.exports = n2(r2(9021), r2(3240));
        })(this, function(t3) {
          (function(e3) {
            var r3 = t3;
            var i2 = r3.lib;
            var n2 = i2.WordArray;
            var s2 = i2.Hasher;
            var a = r3.x64;
            var o = a.Word;
            var u = r3.algo;
            var c = [];
            var l = [];
            var f = [];
            (function() {
              var t4 = 1, e4 = 0;
              for (var r4 = 0; r4 < 24; r4++) {
                c[t4 + 5 * e4] = (r4 + 1) * (r4 + 2) / 2 % 64;
                var i3 = e4 % 5;
                var n22 = (2 * t4 + 3 * e4) % 5;
                t4 = i3;
                e4 = n22;
              }
              for (var t4 = 0; t4 < 5; t4++)
                for (var e4 = 0; e4 < 5; e4++)
                  l[t4 + 5 * e4] = e4 + (2 * t4 + 3 * e4) % 5 * 5;
              var s22 = 1;
              for (var a2 = 0; a2 < 24; a2++) {
                var u2 = 0;
                var h2 = 0;
                for (var d2 = 0; d2 < 7; d2++) {
                  if (s22 & 1) {
                    var v = (1 << d2) - 1;
                    if (v < 32)
                      h2 ^= 1 << v;
                    else
                      u2 ^= 1 << v - 32;
                  }
                  if (s22 & 128)
                    s22 = s22 << 1 ^ 113;
                  else
                    s22 <<= 1;
                }
                f[a2] = o.create(u2, h2);
              }
            })();
            var h = [];
            (function() {
              for (var t4 = 0; t4 < 25; t4++)
                h[t4] = o.create();
            })();
            var d = u.SHA3 = s2.extend({ cfg: s2.cfg.extend({ outputLength: 512 }), _doReset: function() {
              var t4 = this._state = [];
              for (var e4 = 0; e4 < 25; e4++)
                t4[e4] = new o.init();
              this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
            }, _doProcessBlock: function(t4, e4) {
              var r4 = this._state;
              var i3 = this.blockSize / 2;
              for (var n22 = 0; n22 < i3; n22++) {
                var s22 = t4[e4 + 2 * n22];
                var a2 = t4[e4 + 2 * n22 + 1];
                s22 = (s22 << 8 | s22 >>> 24) & 16711935 | (s22 << 24 | s22 >>> 8) & 4278255360;
                a2 = (a2 << 8 | a2 >>> 24) & 16711935 | (a2 << 24 | a2 >>> 8) & 4278255360;
                var o2 = r4[n22];
                o2.high ^= a2;
                o2.low ^= s22;
              }
              for (var u2 = 0; u2 < 24; u2++) {
                for (var d2 = 0; d2 < 5; d2++) {
                  var v = 0, p = 0;
                  for (var g = 0; g < 5; g++) {
                    var o2 = r4[d2 + 5 * g];
                    v ^= o2.high;
                    p ^= o2.low;
                  }
                  var y = h[d2];
                  y.high = v;
                  y.low = p;
                }
                for (var d2 = 0; d2 < 5; d2++) {
                  var m = h[(d2 + 4) % 5];
                  var _ = h[(d2 + 1) % 5];
                  var w = _.high;
                  var S = _.low;
                  var v = m.high ^ (w << 1 | S >>> 31);
                  var p = m.low ^ (S << 1 | w >>> 31);
                  for (var g = 0; g < 5; g++) {
                    var o2 = r4[d2 + 5 * g];
                    o2.high ^= v;
                    o2.low ^= p;
                  }
                }
                for (var b = 1; b < 25; b++) {
                  var v;
                  var p;
                  var o2 = r4[b];
                  var E = o2.high;
                  var D = o2.low;
                  var T = c[b];
                  if (T < 32) {
                    v = E << T | D >>> 32 - T;
                    p = D << T | E >>> 32 - T;
                  } else {
                    v = D << T - 32 | E >>> 64 - T;
                    p = E << T - 32 | D >>> 64 - T;
                  }
                  var M = h[l[b]];
                  M.high = v;
                  M.low = p;
                }
                var I = h[0];
                var A = r4[0];
                I.high = A.high;
                I.low = A.low;
                for (var d2 = 0; d2 < 5; d2++)
                  for (var g = 0; g < 5; g++) {
                    var b = d2 + 5 * g;
                    var o2 = r4[b];
                    var R = h[b];
                    var x = h[(d2 + 1) % 5 + 5 * g];
                    var B = h[(d2 + 2) % 5 + 5 * g];
                    o2.high = R.high ^ ~x.high & B.high;
                    o2.low = R.low ^ ~x.low & B.low;
                  }
                var o2 = r4[0];
                var C = f[u2];
                o2.high ^= C.high;
                o2.low ^= C.low;
              }
            }, _doFinalize: function() {
              var t4 = this._data;
              var r4 = t4.words;
              this._nDataBytes * 8;
              var s22 = t4.sigBytes * 8;
              var a2 = this.blockSize * 32;
              r4[s22 >>> 5] |= 1 << 24 - s22 % 32;
              r4[(e3.ceil((s22 + 1) / a2) * a2 >>> 5) - 1] |= 128;
              t4.sigBytes = r4.length * 4;
              this._process();
              var o2 = this._state;
              var u2 = this.cfg.outputLength / 8;
              var c2 = u2 / 8;
              var l2 = [];
              for (var f2 = 0; f2 < c2; f2++) {
                var h2 = o2[f2];
                var d2 = h2.high;
                var v = h2.low;
                d2 = (d2 << 8 | d2 >>> 24) & 16711935 | (d2 << 24 | d2 >>> 8) & 4278255360;
                v = (v << 8 | v >>> 24) & 16711935 | (v << 24 | v >>> 8) & 4278255360;
                l2.push(v);
                l2.push(d2);
              }
              return new n2.init(l2, u2);
            }, clone: function() {
              var t4 = s2.clone.call(this);
              var e4 = t4._state = this._state.slice(0);
              for (var r4 = 0; r4 < 25; r4++)
                e4[r4] = e4[r4].clone();
              return t4;
            } });
            r3.SHA3 = s2._createHelper(d);
            r3.HmacSHA3 = s2._createHmacHelper(d);
          })(Math);
          return t3.SHA3;
        });
      }, 6068: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        const n2 = i2(r2(2180));
        const s2 = i2(r2(1396));
        const a = i2(r2(9420));
        var o;
        (function(t3) {
          let e3;
          let r3;
          let i3;
          let o2;
          let u = new n2.default();
          let c = s2.default.mode.CBC;
          let l = s2.default.pad.Pkcs7;
          let f = s2.default.AES;
          t3.algorithmMap = /* @__PURE__ */ new Map([["aes", s2.default.AES]]);
          t3.modeMap = /* @__PURE__ */ new Map([["cbc", s2.default.mode.CBC], ["cfb", s2.default.mode.CFB], ["cfb128", s2.default.mode.CFB], ["ecb", s2.default.mode.ECB], ["ofb", s2.default.mode.OFB]]);
          t3.paddingMap = /* @__PURE__ */ new Map([["nopadding", s2.default.pad.NoPadding], ["pkcs7", s2.default.pad.Pkcs7]]);
          function h() {
            e3 = s2.default.MD5((/* @__PURE__ */ new Date()).getTime().toString());
            r3 = s2.default.MD5(e3);
            u.setPublicKey(a.default.publicKey);
            e3.toString(s2.default.enc.Hex);
            r3.toString(s2.default.enc.Hex);
            i3 = u.encrypt(e3.toString(s2.default.enc.Hex));
            o2 = u.encrypt(r3.toString(s2.default.enc.Hex));
          }
          t3.resetKey = h;
          function d(e4, r4, i4) {
            f = t3.algorithmMap.get(e4);
            c = t3.modeMap.get(r4);
            l = t3.paddingMap.get(i4);
          }
          t3.setEncryptParams = d;
          function v(t4) {
            return f.encrypt(t4, e3, { iv: r3, mode: c, padding: l }).toString();
          }
          t3.encrypt = v;
          function p(t4) {
            return f.decrypt(t4, e3, { iv: r3, mode: c, padding: l }).toString(s2.default.enc.Utf8);
          }
          t3.decrypt = p;
          function g(t4) {
            return s2.default.SHA256(t4).toString(s2.default.enc.Base64);
          }
          t3.sha256 = g;
          function y(t4) {
            return s2.default.MD5(t4).toString(s2.default.enc.Hex);
          }
          t3.md5Hex = y;
          function m() {
            return i3 ? i3 : "";
          }
          t3.getEncryptedSecretKey = m;
          function _() {
            return o2 ? o2 : "";
          }
          t3.getEncryptedIV = _;
        })(o || (o = {}));
        e2["default"] = o;
      }, 6152: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        const n2 = i2(r2(9420));
        const s2 = i2(r2(7574));
        class a extends s2.default {
          constructor() {
            super(...arguments);
            this.registerData = new o();
          }
          static create() {
            let t3 = new a();
            super.initMsg(t3);
            t3.command = s2.default.Command.REGISTER;
            t3.data = t3.registerData = o.create();
            return t3;
          }
          send() {
            super.send();
          }
        }
        class o {
          constructor() {
            this.appId = "";
            this.regId = "";
          }
          static create() {
            let t3 = new o();
            t3.appId = n2.default.appid;
            t3.regId = n2.default.regId;
            return t3;
          }
        }
        e2["default"] = a;
      }, 6298: function(t2, e2, r2) {
        (function(i2, n2, s2) {
          t2.exports = n2(r2(9021), r2(754), r2(4636), r2(9506), r2(7165));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i2 = r3.StreamCipher;
            var n2 = e3.algo;
            var s2 = [];
            var a = [];
            var o = [];
            var u = n2.Rabbit = i2.extend({ _doReset: function() {
              var t4 = this._key.words;
              var e4 = this.cfg.iv;
              for (var r4 = 0; r4 < 4; r4++)
                t4[r4] = (t4[r4] << 8 | t4[r4] >>> 24) & 16711935 | (t4[r4] << 24 | t4[r4] >>> 8) & 4278255360;
              var i3 = this._X = [t4[0], t4[3] << 16 | t4[2] >>> 16, t4[1], t4[0] << 16 | t4[3] >>> 16, t4[2], t4[1] << 16 | t4[0] >>> 16, t4[3], t4[2] << 16 | t4[1] >>> 16];
              var n22 = this._C = [t4[2] << 16 | t4[2] >>> 16, t4[0] & 4294901760 | t4[1] & 65535, t4[3] << 16 | t4[3] >>> 16, t4[1] & 4294901760 | t4[2] & 65535, t4[0] << 16 | t4[0] >>> 16, t4[2] & 4294901760 | t4[3] & 65535, t4[1] << 16 | t4[1] >>> 16, t4[3] & 4294901760 | t4[0] & 65535];
              this._b = 0;
              for (var r4 = 0; r4 < 4; r4++)
                c.call(this);
              for (var r4 = 0; r4 < 8; r4++)
                n22[r4] ^= i3[r4 + 4 & 7];
              if (e4) {
                var s22 = e4.words;
                var a2 = s22[0];
                var o2 = s22[1];
                var u2 = (a2 << 8 | a2 >>> 24) & 16711935 | (a2 << 24 | a2 >>> 8) & 4278255360;
                var l = (o2 << 8 | o2 >>> 24) & 16711935 | (o2 << 24 | o2 >>> 8) & 4278255360;
                var f = u2 >>> 16 | l & 4294901760;
                var h = l << 16 | u2 & 65535;
                n22[0] ^= u2;
                n22[1] ^= f;
                n22[2] ^= l;
                n22[3] ^= h;
                n22[4] ^= u2;
                n22[5] ^= f;
                n22[6] ^= l;
                n22[7] ^= h;
                for (var r4 = 0; r4 < 4; r4++)
                  c.call(this);
              }
            }, _doProcessBlock: function(t4, e4) {
              var r4 = this._X;
              c.call(this);
              s2[0] = r4[0] ^ r4[5] >>> 16 ^ r4[3] << 16;
              s2[1] = r4[2] ^ r4[7] >>> 16 ^ r4[5] << 16;
              s2[2] = r4[4] ^ r4[1] >>> 16 ^ r4[7] << 16;
              s2[3] = r4[6] ^ r4[3] >>> 16 ^ r4[1] << 16;
              for (var i3 = 0; i3 < 4; i3++) {
                s2[i3] = (s2[i3] << 8 | s2[i3] >>> 24) & 16711935 | (s2[i3] << 24 | s2[i3] >>> 8) & 4278255360;
                t4[e4 + i3] ^= s2[i3];
              }
            }, blockSize: 128 / 32, ivSize: 64 / 32 });
            function c() {
              var t4 = this._X;
              var e4 = this._C;
              for (var r4 = 0; r4 < 8; r4++)
                a[r4] = e4[r4];
              e4[0] = e4[0] + 1295307597 + this._b | 0;
              e4[1] = e4[1] + 3545052371 + (e4[0] >>> 0 < a[0] >>> 0 ? 1 : 0) | 0;
              e4[2] = e4[2] + 886263092 + (e4[1] >>> 0 < a[1] >>> 0 ? 1 : 0) | 0;
              e4[3] = e4[3] + 1295307597 + (e4[2] >>> 0 < a[2] >>> 0 ? 1 : 0) | 0;
              e4[4] = e4[4] + 3545052371 + (e4[3] >>> 0 < a[3] >>> 0 ? 1 : 0) | 0;
              e4[5] = e4[5] + 886263092 + (e4[4] >>> 0 < a[4] >>> 0 ? 1 : 0) | 0;
              e4[6] = e4[6] + 1295307597 + (e4[5] >>> 0 < a[5] >>> 0 ? 1 : 0) | 0;
              e4[7] = e4[7] + 3545052371 + (e4[6] >>> 0 < a[6] >>> 0 ? 1 : 0) | 0;
              this._b = e4[7] >>> 0 < a[7] >>> 0 ? 1 : 0;
              for (var r4 = 0; r4 < 8; r4++) {
                var i3 = t4[r4] + e4[r4];
                var n22 = i3 & 65535;
                var s22 = i3 >>> 16;
                var u2 = ((n22 * n22 >>> 17) + n22 * s22 >>> 15) + s22 * s22;
                var c2 = ((i3 & 4294901760) * i3 | 0) + ((i3 & 65535) * i3 | 0);
                o[r4] = u2 ^ c2;
              }
              t4[0] = o[0] + (o[7] << 16 | o[7] >>> 16) + (o[6] << 16 | o[6] >>> 16) | 0;
              t4[1] = o[1] + (o[0] << 8 | o[0] >>> 24) + o[7] | 0;
              t4[2] = o[2] + (o[1] << 16 | o[1] >>> 16) + (o[0] << 16 | o[0] >>> 16) | 0;
              t4[3] = o[3] + (o[2] << 8 | o[2] >>> 24) + o[1] | 0;
              t4[4] = o[4] + (o[3] << 16 | o[3] >>> 16) + (o[2] << 16 | o[2] >>> 16) | 0;
              t4[5] = o[5] + (o[4] << 8 | o[4] >>> 24) + o[3] | 0;
              t4[6] = o[6] + (o[5] << 16 | o[5] >>> 16) + (o[4] << 16 | o[4] >>> 16) | 0;
              t4[7] = o[7] + (o[6] << 8 | o[6] >>> 24) + o[5] | 0;
            }
            e3.Rabbit = i2._createHelper(u);
          })();
          return t3.Rabbit;
        });
      }, 6308: function(t2, e2, r2) {
        (function(i2, n2, s2) {
          t2.exports = n2(r2(9021), r2(3009));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i2 = r3.WordArray;
            var n2 = e3.algo;
            var s2 = n2.SHA256;
            var a = n2.SHA224 = s2.extend({ _doReset: function() {
              this._hash = new i2.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]);
            }, _doFinalize: function() {
              var t4 = s2._doFinalize.call(this);
              t4.sigBytes -= 4;
              return t4;
            } });
            e3.SHA224 = s2._createHelper(a);
            e3.HmacSHA224 = s2._createHmacHelper(a);
          })();
          return t3.SHA224;
        });
      }, 6372: function(t2, e2, r2) {
        (function(i2, n2, s2) {
          t2.exports = n2(r2(9021), r2(7165));
        })(this, function(t3) {
          t3.mode.CTRGladman = function() {
            var e3 = t3.lib.BlockCipherMode.extend();
            function r3(t4) {
              if ((t4 >> 24 & 255) === 255) {
                var e4 = t4 >> 16 & 255;
                var r4 = t4 >> 8 & 255;
                var i3 = t4 & 255;
                if (e4 === 255) {
                  e4 = 0;
                  if (r4 === 255) {
                    r4 = 0;
                    if (i3 === 255)
                      i3 = 0;
                    else
                      ++i3;
                  } else
                    ++r4;
                } else
                  ++e4;
                t4 = 0;
                t4 += e4 << 16;
                t4 += r4 << 8;
                t4 += i3;
              } else
                t4 += 1 << 24;
              return t4;
            }
            function i2(t4) {
              if ((t4[0] = r3(t4[0])) === 0)
                t4[1] = r3(t4[1]);
              return t4;
            }
            var n2 = e3.Encryptor = e3.extend({ processBlock: function(t4, e4) {
              var r4 = this._cipher;
              var n22 = r4.blockSize;
              var s2 = this._iv;
              var a = this._counter;
              if (s2) {
                a = this._counter = s2.slice(0);
                this._iv = void 0;
              }
              i2(a);
              var o = a.slice(0);
              r4.encryptBlock(o, 0);
              for (var u = 0; u < n22; u++)
                t4[e4 + u] ^= o[u];
            } });
            e3.Decryptor = n2;
            return e3;
          }();
          return t3.mode.CTRGladman;
        });
      }, 6422: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        const n2 = i2(r2(2096));
        const s2 = i2(r2(6068));
        var a;
        (function(t3) {
          let e3 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
          let r3 = (0, n2.default)("9223372036854775808");
          function i3(t4) {
            let e4 = a2(t4);
            let r4 = o(e4);
            let i4 = r4[1];
            let n22 = r4[0];
            return u(i4) + u(n22);
          }
          t3.to_getui = i3;
          function a2(t4) {
            let e4 = s2.default.md5Hex(t4);
            let r4 = c(e4);
            r4[6] &= 15;
            r4[6] |= 48;
            r4[8] &= 63;
            r4[8] |= 128;
            return r4;
          }
          function o(t4) {
            let e4 = (0, n2.default)(0);
            let r4 = (0, n2.default)(0);
            for (let r5 = 0; r5 < 8; r5++)
              e4 = e4.multiply(256).plus((0, n2.default)(t4[r5] & 255));
            for (let e5 = 8; e5 < 16; e5++)
              r4 = r4.multiply(256).plus((0, n2.default)(t4[e5] & 255));
            return [e4, r4];
          }
          function u(t4) {
            if (t4 >= r3)
              t4 = r3.multiply(2).minus(t4);
            let i4 = "";
            for (; t4 > (0, n2.default)(0); t4 = t4.divide(62))
              i4 += e3.charAt(Number(t4.divmod(62).remainder));
            return i4;
          }
          function c(t4) {
            let e4 = t4.length;
            if (e4 % 2 != 0)
              return [];
            let r4 = new Array();
            for (let i4 = 0; i4 < e4; i4 += 2)
              r4.push(parseInt(t4.substring(i4, i4 + 2), 16));
            return r4;
          }
        })(a || (a = {}));
        e2["default"] = a;
      }, 6440: function(t2, e2, r2) {
        (function(i2, n2) {
          t2.exports = n2(r2(9021));
        })(this, function(t3) {
          (function() {
            if (typeof ArrayBuffer != "function")
              return;
            var e3 = t3;
            var r3 = e3.lib;
            var i2 = r3.WordArray;
            var n2 = i2.init;
            var s2 = i2.init = function(t4) {
              if (t4 instanceof ArrayBuffer)
                t4 = new Uint8Array(t4);
              if (t4 instanceof Int8Array || typeof Uint8ClampedArray !== "undefined" && t4 instanceof Uint8ClampedArray || t4 instanceof Int16Array || t4 instanceof Uint16Array || t4 instanceof Int32Array || t4 instanceof Uint32Array || t4 instanceof Float32Array || t4 instanceof Float64Array)
                t4 = new Uint8Array(t4.buffer, t4.byteOffset, t4.byteLength);
              if (t4 instanceof Uint8Array) {
                var e4 = t4.byteLength;
                var r4 = [];
                for (var i3 = 0; i3 < e4; i3++)
                  r4[i3 >>> 2] |= t4[i3] << 24 - i3 % 4 * 8;
                n2.call(this, r4, e4);
              } else
                n2.apply(this, arguments);
            };
            s2.prototype = i2;
          })();
          return t3.lib.WordArray;
        });
      }, 6681: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        var n2;
        Object.defineProperty(e2, "__esModule", { value: true });
        const s2 = i2(r2(9420));
        const a = i2(r2(7374));
        const o = i2(r2(1235));
        class u extends a.default {
          constructor() {
            super(...arguments);
            this.pushMessageData = new c();
          }
          static parse(t3) {
            let e3 = new u();
            super.parseActionMsg(e3, t3);
            e3.pushMessageData = c.parse(e3.actionMsgData.msgData);
            return e3;
          }
          receive() {
            var t3;
            this.pushMessageData;
            if (this.pushMessageData.appId != s2.default.appid || !this.pushMessageData.messageid || !this.pushMessageData.taskId)
              this.stringify();
            o.default.create(this, o.default.ActionId.RECEIVE).send();
            o.default.create(this, o.default.ActionId.MP_RECEIVE).send();
            if (this.actionMsgData.msgExtraData && s2.default.onPushMsg)
              (t3 = s2.default.onPushMsg) === null || t3 === void 0 || t3.call(s2.default.onPushMsg, { message: this.actionMsgData.msgExtraData });
          }
        }
        class c {
          constructor() {
            this.id = "";
            this.appKey = "";
            this.appId = "";
            this.messageid = "";
            this.taskId = "";
            this.actionChain = [];
            this.cdnType = "";
          }
          static parse(t3) {
            let e3 = new c();
            let r3 = JSON.parse(t3);
            e3.id = r3.id;
            e3.appKey = r3.appKey;
            e3.appId = r3.appId;
            e3.messageid = r3.messageid;
            e3.taskId = r3.taskId;
            e3.actionChain = r3.actionChain;
            e3.cdnType = r3.cdnType;
            return e3;
          }
        }
        n2 = class {
        }, n2.GO_TO = "goto", n2.TRANSMIT = "transmit";
        e2["default"] = u;
      }, 6828: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        const n2 = i2(r2(6068));
        const s2 = i2(r2(9420));
        const a = i2(r2(7574));
        class o extends a.default {
          constructor() {
            super(...arguments);
            this.keyNegotiateData = new u();
          }
          static create() {
            let t3 = new o();
            super.initMsg(t3);
            t3.command = a.default.Command.KEY_NEGOTIATE;
            n2.default.resetKey();
            t3.data = t3.keyNegotiateData = u.create();
            return t3;
          }
          send() {
            super.send();
          }
        }
        class u {
          constructor() {
            this.appId = "";
            this.rsaPublicKeyId = "";
            this.algorithm = "";
            this.secretKey = "";
            this.iv = "";
          }
          static create() {
            let t3 = new u();
            t3.appId = s2.default.appid;
            t3.rsaPublicKeyId = s2.default.publicKeyId;
            t3.algorithm = "AES";
            t3.secretKey = n2.default.getEncryptedSecretKey();
            t3.iv = n2.default.getEncryptedIV();
            return t3;
          }
        }
        e2["default"] = o;
      }, 6939: function(t2, e2, r2) {
        (function(i2, n2, s2) {
          t2.exports = n2(r2(9021), r2(7165));
        })(this, function(t3) {
          t3.mode.CTR = function() {
            var e3 = t3.lib.BlockCipherMode.extend();
            var r3 = e3.Encryptor = e3.extend({ processBlock: function(t4, e4) {
              var r4 = this._cipher;
              var i2 = r4.blockSize;
              var n2 = this._iv;
              var s2 = this._counter;
              if (n2) {
                s2 = this._counter = n2.slice(0);
                this._iv = void 0;
              }
              var a = s2.slice(0);
              r4.encryptBlock(a, 0);
              s2[i2 - 1] = s2[i2 - 1] + 1 | 0;
              for (var o = 0; o < i2; o++)
                t4[e4 + o] ^= a[o];
            } });
            e3.Decryptor = r3;
            return e3;
          }();
          return t3.mode.CTR;
        });
      }, 7005: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        const n2 = i2(r2(8036));
        const s2 = i2(r2(669));
        const a = i2(r2(7374));
        class o extends a.default {
          constructor() {
            super(...arguments);
            this.setTagResultData = new u();
          }
          static parse(t3) {
            let e3 = new o();
            super.parseActionMsg(e3, t3);
            e3.setTagResultData = u.parse(e3.actionMsgData.msgData);
            return e3;
          }
          receive() {
            var t3;
            s2.default.info(`set tag result`, this.setTagResultData);
            let e3 = a.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
            if (e3)
              (t3 = e3.callback) === null || t3 === void 0 || t3.call(e3.callback, { resultCode: this.setTagResultData.errorCode, message: this.setTagResultData.errorMsg });
            n2.default.set({ key: n2.default.KEY_SET_TAG_TIME, data: (/* @__PURE__ */ new Date()).getTime() });
          }
        }
        class u {
          constructor() {
            this.errorCode = 0;
            this.errorMsg = "";
          }
          static parse(t3) {
            let e3 = new u();
            let r3 = JSON.parse(t3);
            e3.errorCode = r3.errorCode;
            e3.errorMsg = r3.errorMsg;
            return e3;
          }
        }
        e2["default"] = o;
      }, 7141: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        const n2 = i2(r2(6068));
        var s2;
        (function(t3) {
          function e3(t4) {
            t4.data = n2.default.encrypt(t4.data);
          }
          t3.encrypt = e3;
          function r3(t4) {
            t4.data = n2.default.decrypt(t4.data);
          }
          t3.decrypt = r3;
          function i3(t4) {
            t4.signature = n2.default.sha256(`${t4.timeStamp}${t4.packetId}${t4.command}${t4.data}`);
          }
          t3.sign = i3;
          function s22(t4) {
            let e4 = n2.default.sha256(`${t4.timeStamp}${t4.packetId}${t4.command}${t4.data}`);
            if (t4.signature != e4)
              throw new Error(`msg signature vierfy failed`);
          }
          t3.verify = s22;
        })(s2 || (s2 = {}));
        e2["default"] = s2;
      }, 7165: function(t2, e2, r2) {
        (function(i2, n2, s2) {
          t2.exports = n2(r2(9021), r2(9506));
        })(this, function(t3) {
          t3.lib.Cipher || function(e3) {
            var r3 = t3;
            var i2 = r3.lib;
            var n2 = i2.Base;
            var s2 = i2.WordArray;
            var a = i2.BufferedBlockAlgorithm;
            var o = r3.enc;
            o.Utf8;
            var c = o.Base64;
            var l = r3.algo;
            var f = l.EvpKDF;
            var h = i2.Cipher = a.extend({ cfg: n2.extend(), createEncryptor: function(t4, e4) {
              return this.create(this._ENC_XFORM_MODE, t4, e4);
            }, createDecryptor: function(t4, e4) {
              return this.create(this._DEC_XFORM_MODE, t4, e4);
            }, init: function(t4, e4, r4) {
              this.cfg = this.cfg.extend(r4);
              this._xformMode = t4;
              this._key = e4;
              this.reset();
            }, reset: function() {
              a.reset.call(this);
              this._doReset();
            }, process: function(t4) {
              this._append(t4);
              return this._process();
            }, finalize: function(t4) {
              if (t4)
                this._append(t4);
              var e4 = this._doFinalize();
              return e4;
            }, keySize: 128 / 32, ivSize: 128 / 32, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: /* @__PURE__ */ function() {
              function t4(t5) {
                if (typeof t5 == "string")
                  return M;
                else
                  return E;
              }
              return function(e4) {
                return { encrypt: function(r4, i3, n22) {
                  return t4(i3).encrypt(e4, r4, i3, n22);
                }, decrypt: function(r4, i3, n22) {
                  return t4(i3).decrypt(e4, r4, i3, n22);
                } };
              };
            }() });
            i2.StreamCipher = h.extend({ _doFinalize: function() {
              var t4 = this._process(true);
              return t4;
            }, blockSize: 1 });
            var v = r3.mode = {};
            var p = i2.BlockCipherMode = n2.extend({ createEncryptor: function(t4, e4) {
              return this.Encryptor.create(t4, e4);
            }, createDecryptor: function(t4, e4) {
              return this.Decryptor.create(t4, e4);
            }, init: function(t4, e4) {
              this._cipher = t4;
              this._iv = e4;
            } });
            var g = v.CBC = function() {
              var t4 = p.extend();
              t4.Encryptor = t4.extend({ processBlock: function(t5, e4) {
                var i3 = this._cipher;
                var n22 = i3.blockSize;
                r4.call(this, t5, e4, n22);
                i3.encryptBlock(t5, e4);
                this._prevBlock = t5.slice(e4, e4 + n22);
              } });
              t4.Decryptor = t4.extend({ processBlock: function(t5, e4) {
                var i3 = this._cipher;
                var n22 = i3.blockSize;
                var s22 = t5.slice(e4, e4 + n22);
                i3.decryptBlock(t5, e4);
                r4.call(this, t5, e4, n22);
                this._prevBlock = s22;
              } });
              function r4(t5, r5, i3) {
                var n22;
                var s22 = this._iv;
                if (s22) {
                  n22 = s22;
                  this._iv = e3;
                } else
                  n22 = this._prevBlock;
                for (var a2 = 0; a2 < i3; a2++)
                  t5[r5 + a2] ^= n22[a2];
              }
              return t4;
            }();
            var y = r3.pad = {};
            var m = y.Pkcs7 = { pad: function(t4, e4) {
              var r4 = e4 * 4;
              var i3 = r4 - t4.sigBytes % r4;
              var n22 = i3 << 24 | i3 << 16 | i3 << 8 | i3;
              var a2 = [];
              for (var o2 = 0; o2 < i3; o2 += 4)
                a2.push(n22);
              var u = s2.create(a2, i3);
              t4.concat(u);
            }, unpad: function(t4) {
              var e4 = t4.words[t4.sigBytes - 1 >>> 2] & 255;
              t4.sigBytes -= e4;
            } };
            i2.BlockCipher = h.extend({ cfg: h.cfg.extend({ mode: g, padding: m }), reset: function() {
              var t4;
              h.reset.call(this);
              var e4 = this.cfg;
              var r4 = e4.iv;
              var i3 = e4.mode;
              if (this._xformMode == this._ENC_XFORM_MODE)
                t4 = i3.createEncryptor;
              else {
                t4 = i3.createDecryptor;
                this._minBufferSize = 1;
              }
              if (this._mode && this._mode.__creator == t4)
                this._mode.init(this, r4 && r4.words);
              else {
                this._mode = t4.call(i3, this, r4 && r4.words);
                this._mode.__creator = t4;
              }
            }, _doProcessBlock: function(t4, e4) {
              this._mode.processBlock(t4, e4);
            }, _doFinalize: function() {
              var t4;
              var e4 = this.cfg.padding;
              if (this._xformMode == this._ENC_XFORM_MODE) {
                e4.pad(this._data, this.blockSize);
                t4 = this._process(true);
              } else {
                t4 = this._process(true);
                e4.unpad(t4);
              }
              return t4;
            }, blockSize: 128 / 32 });
            var w = i2.CipherParams = n2.extend({ init: function(t4) {
              this.mixIn(t4);
            }, toString: function(t4) {
              return (t4 || this.formatter).stringify(this);
            } });
            var S = r3.format = {};
            var b = S.OpenSSL = { stringify: function(t4) {
              var e4;
              var r4 = t4.ciphertext;
              var i3 = t4.salt;
              if (i3)
                e4 = s2.create([1398893684, 1701076831]).concat(i3).concat(r4);
              else
                e4 = r4;
              return e4.toString(c);
            }, parse: function(t4) {
              var e4;
              var r4 = c.parse(t4);
              var i3 = r4.words;
              if (i3[0] == 1398893684 && i3[1] == 1701076831) {
                e4 = s2.create(i3.slice(2, 4));
                i3.splice(0, 4);
                r4.sigBytes -= 16;
              }
              return w.create({ ciphertext: r4, salt: e4 });
            } };
            var E = i2.SerializableCipher = n2.extend({ cfg: n2.extend({ format: b }), encrypt: function(t4, e4, r4, i3) {
              i3 = this.cfg.extend(i3);
              var n22 = t4.createEncryptor(r4, i3);
              var s22 = n22.finalize(e4);
              var a2 = n22.cfg;
              return w.create({ ciphertext: s22, key: r4, iv: a2.iv, algorithm: t4, mode: a2.mode, padding: a2.padding, blockSize: t4.blockSize, formatter: i3.format });
            }, decrypt: function(t4, e4, r4, i3) {
              i3 = this.cfg.extend(i3);
              e4 = this._parse(e4, i3.format);
              var n22 = t4.createDecryptor(r4, i3).finalize(e4.ciphertext);
              return n22;
            }, _parse: function(t4, e4) {
              if (typeof t4 == "string")
                return e4.parse(t4, this);
              else
                return t4;
            } });
            var D = r3.kdf = {};
            var T = D.OpenSSL = { execute: function(t4, e4, r4, i3, n22) {
              if (!i3)
                i3 = s2.random(64 / 8);
              if (!n22)
                var a2 = f.create({ keySize: e4 + r4 }).compute(t4, i3);
              else
                var a2 = f.create({ keySize: e4 + r4, hasher: n22 }).compute(t4, i3);
              var o2 = s2.create(a2.words.slice(e4), r4 * 4);
              a2.sigBytes = e4 * 4;
              return w.create({ key: a2, iv: o2, salt: i3 });
            } };
            var M = i2.PasswordBasedCipher = E.extend({ cfg: E.cfg.extend({ kdf: T }), encrypt: function(t4, e4, r4, i3) {
              i3 = this.cfg.extend(i3);
              var n22 = i3.kdf.execute(r4, t4.keySize, t4.ivSize, i3.salt, i3.hasher);
              i3.iv = n22.iv;
              var s22 = E.encrypt.call(this, t4, e4, n22.key, i3);
              s22.mixIn(n22);
              return s22;
            }, decrypt: function(t4, e4, r4, i3) {
              i3 = this.cfg.extend(i3);
              e4 = this._parse(e4, i3.format);
              var n22 = i3.kdf.execute(r4, t4.keySize, t4.ivSize, e4.salt, i3.hasher);
              i3.iv = n22.iv;
              var s22 = E.decrypt.call(this, t4, e4, n22.key, i3);
              return s22;
            } });
          }();
        });
      }, 7193: function(t2, e2, r2) {
        (function(i2, n2, s2) {
          t2.exports = n2(r2(9021), r2(754), r2(4636), r2(9506), r2(7165));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i2 = r3.StreamCipher;
            var n2 = e3.algo;
            var s2 = n2.RC4 = i2.extend({ _doReset: function() {
              var t4 = this._key;
              var e4 = t4.words;
              var r4 = t4.sigBytes;
              var i3 = this._S = [];
              for (var n22 = 0; n22 < 256; n22++)
                i3[n22] = n22;
              for (var n22 = 0, s22 = 0; n22 < 256; n22++) {
                var a2 = n22 % r4;
                var o2 = e4[a2 >>> 2] >>> 24 - a2 % 4 * 8 & 255;
                s22 = (s22 + i3[n22] + o2) % 256;
                var u = i3[n22];
                i3[n22] = i3[s22];
                i3[s22] = u;
              }
              this._i = this._j = 0;
            }, _doProcessBlock: function(t4, e4) {
              t4[e4] ^= a.call(this);
            }, keySize: 256 / 32, ivSize: 0 });
            function a() {
              var t4 = this._S;
              var e4 = this._i;
              var r4 = this._j;
              var i3 = 0;
              for (var n22 = 0; n22 < 4; n22++) {
                e4 = (e4 + 1) % 256;
                r4 = (r4 + t4[e4]) % 256;
                var s22 = t4[e4];
                t4[e4] = t4[r4];
                t4[r4] = s22;
                i3 |= t4[(t4[e4] + t4[r4]) % 256] << 24 - n22 * 8;
              }
              this._i = e4;
              this._j = r4;
              return i3;
            }
            e3.RC4 = i2._createHelper(s2);
            var o = n2.RC4Drop = s2.extend({ cfg: s2.cfg.extend({ drop: 192 }), _doReset: function() {
              s2._doReset.call(this);
              for (var t4 = this.cfg.drop; t4 > 0; t4--)
                a.call(this);
            } });
            e3.RC4Drop = i2._createHelper(o);
          })();
          return t3.RC4;
        });
      }, 7374: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        var n2, s2;
        Object.defineProperty(e2, "__esModule", { value: true });
        const a = i2(r2(7574));
        const o = r2(1458);
        const u = i2(r2(9420));
        class c extends a.default {
          constructor() {
            super(...arguments);
            this.actionMsgData = new l();
          }
          static initActionMsg(t3, ...e3) {
            super.initMsg(t3);
            t3.command = a.default.Command.CLIENT_MSG;
            t3.data = t3.actionMsgData = l.create();
            return t3;
          }
          static parseActionMsg(t3, e3) {
            super.parseMsg(t3, e3);
            t3.actionMsgData = l.parse(t3.data);
            return t3;
          }
          send() {
            setTimeout(() => {
              var t3;
              if (c.waitingLoginMsgMap.has(this.actionMsgData.msgId) || c.waitingResponseMsgMap.has(this.actionMsgData.msgId)) {
                c.waitingLoginMsgMap.delete(this.actionMsgData.msgId);
                c.waitingResponseMsgMap.delete(this.actionMsgData.msgId);
                (t3 = this.callback) === null || t3 === void 0 || t3.call(this.callback, { resultCode: o.ErrorCode.TIME_OUT, message: "waiting time out" });
              }
            }, 1e4);
            if (!u.default.online) {
              c.waitingLoginMsgMap.set(this.actionMsgData.msgId, this);
              return;
            }
            if (this.actionMsgData.msgAction != c.ClientAction.RECEIVED)
              c.waitingResponseMsgMap.set(this.actionMsgData.msgId, this);
            super.send();
          }
          receive() {
          }
          static sendWaitingMessages() {
            let t3 = this.waitingLoginMsgMap.keys();
            let e3;
            while (e3 = t3.next(), !e3.done) {
              let t4 = this.waitingLoginMsgMap.get(e3.value);
              this.waitingLoginMsgMap.delete(e3.value);
              t4 === null || t4 === void 0 || t4.send();
            }
          }
          static getWaitingResponseMessage(t3) {
            return c.waitingResponseMsgMap.get(t3);
          }
          static removeWaitingResponseMessage(t3) {
            let e3 = c.waitingResponseMsgMap.get(t3);
            if (e3)
              c.waitingResponseMsgMap.delete(t3);
            return e3;
          }
        }
        c.ServerAction = (n2 = class {
        }, n2.PUSH_MESSAGE = "pushmessage", n2.REDIRECT_SERVER = "redirect_server", n2.ADD_PHONE_INFO_RESULT = "addphoneinfo", n2.SET_MODE_RESULT = "set_mode_result", n2.SET_TAG_RESULT = "settag_result", n2.BIND_ALIAS_RESULT = "response_bind", n2.UNBIND_ALIAS_RESULT = "response_unbind", n2.FEED_BACK_RESULT = "pushmessage_feedback", n2.RECEIVED = "received", n2);
        c.ClientAction = (s2 = class {
        }, s2.ADD_PHONE_INFO = "addphoneinfo", s2.SET_MODE = "set_mode", s2.FEED_BACK = "pushmessage_feedback", s2.SET_TAGS = "set_tag", s2.BIND_ALIAS = "bind_alias", s2.UNBIND_ALIAS = "unbind_alias", s2.RECEIVED = "received", s2);
        c.waitingLoginMsgMap = /* @__PURE__ */ new Map();
        c.waitingResponseMsgMap = /* @__PURE__ */ new Map();
        class l {
          constructor() {
            this.appId = "";
            this.cid = "";
            this.msgId = "";
            this.msgAction = "";
            this.msgData = "";
            this.msgExtraData = "";
          }
          static create() {
            let t3 = new l();
            t3.appId = u.default.appid;
            t3.cid = u.default.cid;
            t3.msgId = ((/* @__PURE__ */ new Date()).getTime() & 2147483647).toString();
            return t3;
          }
          static parse(t3) {
            let e3 = new l();
            let r3 = JSON.parse(t3);
            e3.appId = r3.appId;
            e3.cid = r3.cid;
            e3.msgId = r3.msgId;
            e3.msgAction = r3.msgAction;
            e3.msgData = r3.msgData;
            e3.msgExtraData = r3.msgExtraData;
            return e3;
          }
        }
        e2["default"] = c;
      }, 7574: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        var n2;
        Object.defineProperty(e2, "__esModule", { value: true });
        const s2 = i2(r2(7141));
        const a = i2(r2(8722));
        const o = i2(r2(213));
        const u = i2(r2(9420));
        class c {
          constructor() {
            this.version = "";
            this.command = 0;
            this.packetId = 0;
            this.timeStamp = 0;
            this.data = "";
            this.signature = "";
          }
          static initMsg(t3, ...e3) {
            t3.version = o.default.SOCKET_PROTOCOL_VERSION;
            t3.command = 0;
            t3.timeStamp = (/* @__PURE__ */ new Date()).getTime();
            return t3;
          }
          static parseMsg(t3, e3) {
            let r3 = JSON.parse(e3);
            t3.version = r3.version;
            t3.command = r3.command;
            t3.packetId = r3.packetId;
            t3.timeStamp = r3.timeStamp;
            t3.data = r3.data;
            t3.signature = r3.signature;
            return t3;
          }
          stringify() {
            return JSON.stringify(this, ["version", "command", "packetId", "timeStamp", "data", "signature"]);
          }
          send() {
            if (!a.default.isAvailable())
              return;
            this.packetId = u.default.packetId++;
            if (this.temp)
              this.data = this.temp;
            else
              this.temp = this.data;
            this.data = JSON.stringify(this.data);
            this.stringify();
            if (this.command != c.Command.HEART_BEAT) {
              s2.default.sign(this);
              if (this.data && this.command != c.Command.KEY_NEGOTIATE)
                s2.default.encrypt(this);
            }
            a.default.send(this.stringify());
          }
        }
        c.Command = (n2 = class {
        }, n2.HEART_BEAT = 0, n2.KEY_NEGOTIATE = 1, n2.KEY_NEGOTIATE_RESULT = 16, n2.REGISTER = 2, n2.REGISTER_RESULT = 32, n2.LOGIN = 3, n2.LOGIN_RESULT = 48, n2.LOGOUT = 4, n2.LOGOUT_RESULT = 64, n2.CLIENT_MSG = 5, n2.SERVER_MSG = 80, n2.SERVER_CLOSE = 96, n2.REDIRECT_SERVER = 112, n2);
        e2["default"] = c;
      }, 7628: function(t2, e2, r2) {
        (function(i2, n2, s2) {
          t2.exports = n2(r2(9021), r2(754), r2(4636), r2(9506), r2(7165));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i2 = r3.WordArray;
            var n2 = r3.BlockCipher;
            var s2 = e3.algo;
            var a = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4];
            var o = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32];
            var u = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];
            var c = [{ 0: 8421888, 268435456: 32768, 536870912: 8421378, 805306368: 2, 1073741824: 512, 1342177280: 8421890, 1610612736: 8389122, 1879048192: 8388608, 2147483648: 514, 2415919104: 8389120, 2684354560: 33280, 2952790016: 8421376, 3221225472: 32770, 3489660928: 8388610, 3758096384: 0, 4026531840: 33282, 134217728: 0, 402653184: 8421890, 671088640: 33282, 939524096: 32768, 1207959552: 8421888, 1476395008: 512, 1744830464: 8421378, 2013265920: 2, 2281701376: 8389120, 2550136832: 33280, 2818572288: 8421376, 3087007744: 8389122, 3355443200: 8388610, 3623878656: 32770, 3892314112: 514, 4160749568: 8388608, 1: 32768, 268435457: 2, 536870913: 8421888, 805306369: 8388608, 1073741825: 8421378, 1342177281: 33280, 1610612737: 512, 1879048193: 8389122, 2147483649: 8421890, 2415919105: 8421376, 2684354561: 8388610, 2952790017: 33282, 3221225473: 514, 3489660929: 8389120, 3758096385: 32770, 4026531841: 0, 134217729: 8421890, 402653185: 8421376, 671088641: 8388608, 939524097: 512, 1207959553: 32768, 1476395009: 8388610, 1744830465: 2, 2013265921: 33282, 2281701377: 32770, 2550136833: 8389122, 2818572289: 514, 3087007745: 8421888, 3355443201: 8389120, 3623878657: 0, 3892314113: 33280, 4160749569: 8421378 }, { 0: 1074282512, 16777216: 16384, 33554432: 524288, 50331648: 1074266128, 67108864: 1073741840, 83886080: 1074282496, 100663296: 1073758208, 117440512: 16, 134217728: 540672, 150994944: 1073758224, 167772160: 1073741824, 184549376: 540688, 201326592: 524304, 218103808: 0, 234881024: 16400, 251658240: 1074266112, 8388608: 1073758208, 25165824: 540688, 41943040: 16, 58720256: 1073758224, 75497472: 1074282512, 92274688: 1073741824, 109051904: 524288, 125829120: 1074266128, 142606336: 524304, 159383552: 0, 176160768: 16384, 192937984: 1074266112, 209715200: 1073741840, 226492416: 540672, 243269632: 1074282496, 260046848: 16400, 268435456: 0, 285212672: 1074266128, 301989888: 1073758224, 318767104: 1074282496, 335544320: 1074266112, 352321536: 16, 369098752: 540688, 385875968: 16384, 402653184: 16400, 419430400: 524288, 436207616: 524304, 452984832: 1073741840, 469762048: 540672, 486539264: 1073758208, 503316480: 1073741824, 520093696: 1074282512, 276824064: 540688, 293601280: 524288, 310378496: 1074266112, 327155712: 16384, 343932928: 1073758208, 360710144: 1074282512, 377487360: 16, 394264576: 1073741824, 411041792: 1074282496, 427819008: 1073741840, 444596224: 1073758224, 461373440: 524304, 478150656: 0, 494927872: 16400, 511705088: 1074266128, 528482304: 540672 }, { 0: 260, 1048576: 0, 2097152: 67109120, 3145728: 65796, 4194304: 65540, 5242880: 67108868, 6291456: 67174660, 7340032: 67174400, 8388608: 67108864, 9437184: 67174656, 10485760: 65792, 11534336: 67174404, 12582912: 67109124, 13631488: 65536, 14680064: 4, 15728640: 256, 524288: 67174656, 1572864: 67174404, 2621440: 0, 3670016: 67109120, 4718592: 67108868, 5767168: 65536, 6815744: 65540, 7864320: 260, 8912896: 4, 9961472: 256, 11010048: 67174400, 12058624: 65796, 13107200: 65792, 14155776: 67109124, 15204352: 67174660, 16252928: 67108864, 16777216: 67174656, 17825792: 65540, 18874368: 65536, 19922944: 67109120, 20971520: 256, 22020096: 67174660, 23068672: 67108868, 24117248: 0, 25165824: 67109124, 26214400: 67108864, 27262976: 4, 28311552: 65792, 29360128: 67174400, 30408704: 260, 31457280: 65796, 32505856: 67174404, 17301504: 67108864, 18350080: 260, 19398656: 67174656, 20447232: 0, 21495808: 65540, 22544384: 67109120, 23592960: 256, 24641536: 67174404, 25690112: 65536, 26738688: 67174660, 27787264: 65796, 28835840: 67108868, 29884416: 67109124, 30932992: 67174400, 31981568: 4, 33030144: 65792 }, { 0: 2151682048, 65536: 2147487808, 131072: 4198464, 196608: 2151677952, 262144: 0, 327680: 4198400, 393216: 2147483712, 458752: 4194368, 524288: 2147483648, 589824: 4194304, 655360: 64, 720896: 2147487744, 786432: 2151678016, 851968: 4160, 917504: 4096, 983040: 2151682112, 32768: 2147487808, 98304: 64, 163840: 2151678016, 229376: 2147487744, 294912: 4198400, 360448: 2151682112, 425984: 0, 491520: 2151677952, 557056: 4096, 622592: 2151682048, 688128: 4194304, 753664: 4160, 819200: 2147483648, 884736: 4194368, 950272: 4198464, 1015808: 2147483712, 1048576: 4194368, 1114112: 4198400, 1179648: 2147483712, 1245184: 0, 1310720: 4160, 1376256: 2151678016, 1441792: 2151682048, 1507328: 2147487808, 1572864: 2151682112, 1638400: 2147483648, 1703936: 2151677952, 1769472: 4198464, 1835008: 2147487744, 1900544: 4194304, 1966080: 64, 2031616: 4096, 1081344: 2151677952, 1146880: 2151682112, 1212416: 0, 1277952: 4198400, 1343488: 4194368, 1409024: 2147483648, 1474560: 2147487808, 1540096: 64, 1605632: 2147483712, 1671168: 4096, 1736704: 2147487744, 1802240: 2151678016, 1867776: 4160, 1933312: 2151682048, 1998848: 4194304, 2064384: 4198464 }, { 0: 128, 4096: 17039360, 8192: 262144, 12288: 536870912, 16384: 537133184, 20480: 16777344, 24576: 553648256, 28672: 262272, 32768: 16777216, 36864: 537133056, 40960: 536871040, 45056: 553910400, 49152: 553910272, 53248: 0, 57344: 17039488, 61440: 553648128, 2048: 17039488, 6144: 553648256, 10240: 128, 14336: 17039360, 18432: 262144, 22528: 537133184, 26624: 553910272, 30720: 536870912, 34816: 537133056, 38912: 0, 43008: 553910400, 47104: 16777344, 51200: 536871040, 55296: 553648128, 59392: 16777216, 63488: 262272, 65536: 262144, 69632: 128, 73728: 536870912, 77824: 553648256, 81920: 16777344, 86016: 553910272, 90112: 537133184, 94208: 16777216, 98304: 553910400, 102400: 553648128, 106496: 17039360, 110592: 537133056, 114688: 262272, 118784: 536871040, 122880: 0, 126976: 17039488, 67584: 553648256, 71680: 16777216, 75776: 17039360, 79872: 537133184, 83968: 536870912, 88064: 17039488, 92160: 128, 96256: 553910272, 100352: 262272, 104448: 553910400, 108544: 0, 112640: 553648128, 116736: 16777344, 120832: 262144, 124928: 537133056, 129024: 536871040 }, { 0: 268435464, 256: 8192, 512: 270532608, 768: 270540808, 1024: 268443648, 1280: 2097152, 1536: 2097160, 1792: 268435456, 2048: 0, 2304: 268443656, 2560: 2105344, 2816: 8, 3072: 270532616, 3328: 2105352, 3584: 8200, 3840: 270540800, 128: 270532608, 384: 270540808, 640: 8, 896: 2097152, 1152: 2105352, 1408: 268435464, 1664: 268443648, 1920: 8200, 2176: 2097160, 2432: 8192, 2688: 268443656, 2944: 270532616, 3200: 0, 3456: 270540800, 3712: 2105344, 3968: 268435456, 4096: 268443648, 4352: 270532616, 4608: 270540808, 4864: 8200, 5120: 2097152, 5376: 268435456, 5632: 268435464, 5888: 2105344, 6144: 2105352, 6400: 0, 6656: 8, 6912: 270532608, 7168: 8192, 7424: 268443656, 7680: 270540800, 7936: 2097160, 4224: 8, 4480: 2105344, 4736: 2097152, 4992: 268435464, 5248: 268443648, 5504: 8200, 5760: 270540808, 6016: 270532608, 6272: 270540800, 6528: 270532616, 6784: 8192, 7040: 2105352, 7296: 2097160, 7552: 0, 7808: 268435456, 8064: 268443656 }, { 0: 1048576, 16: 33555457, 32: 1024, 48: 1049601, 64: 34604033, 80: 0, 96: 1, 112: 34603009, 128: 33555456, 144: 1048577, 160: 33554433, 176: 34604032, 192: 34603008, 208: 1025, 224: 1049600, 240: 33554432, 8: 34603009, 24: 0, 40: 33555457, 56: 34604032, 72: 1048576, 88: 33554433, 104: 33554432, 120: 1025, 136: 1049601, 152: 33555456, 168: 34603008, 184: 1048577, 200: 1024, 216: 34604033, 232: 1, 248: 1049600, 256: 33554432, 272: 1048576, 288: 33555457, 304: 34603009, 320: 1048577, 336: 33555456, 352: 34604032, 368: 1049601, 384: 1025, 400: 34604033, 416: 1049600, 432: 1, 448: 0, 464: 34603008, 480: 33554433, 496: 1024, 264: 1049600, 280: 33555457, 296: 34603009, 312: 1, 328: 33554432, 344: 1048576, 360: 1025, 376: 34604032, 392: 33554433, 408: 34603008, 424: 0, 440: 34604033, 456: 1049601, 472: 1024, 488: 33555456, 504: 1048577 }, { 0: 134219808, 1: 131072, 2: 134217728, 3: 32, 4: 131104, 5: 134350880, 6: 134350848, 7: 2048, 8: 134348800, 9: 134219776, 10: 133120, 11: 134348832, 12: 2080, 13: 0, 14: 134217760, 15: 133152, 2147483648: 2048, 2147483649: 134350880, 2147483650: 134219808, 2147483651: 134217728, 2147483652: 134348800, 2147483653: 133120, 2147483654: 133152, 2147483655: 32, 2147483656: 134217760, 2147483657: 2080, 2147483658: 131104, 2147483659: 134350848, 2147483660: 0, 2147483661: 134348832, 2147483662: 134219776, 2147483663: 131072, 16: 133152, 17: 134350848, 18: 32, 19: 2048, 20: 134219776, 21: 134217760, 22: 134348832, 23: 131072, 24: 0, 25: 131104, 26: 134348800, 27: 134219808, 28: 134350880, 29: 133120, 30: 2080, 31: 134217728, 2147483664: 131072, 2147483665: 2048, 2147483666: 134348832, 2147483667: 133152, 2147483668: 32, 2147483669: 134348800, 2147483670: 134217728, 2147483671: 134219808, 2147483672: 134350880, 2147483673: 134217760, 2147483674: 134219776, 2147483675: 0, 2147483676: 133120, 2147483677: 2080, 2147483678: 131104, 2147483679: 134350848 }];
            var l = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679];
            var f = s2.DES = n2.extend({ _doReset: function() {
              var t4 = this._key;
              var e4 = t4.words;
              var r4 = [];
              for (var i3 = 0; i3 < 56; i3++) {
                var n22 = a[i3] - 1;
                r4[i3] = e4[n22 >>> 5] >>> 31 - n22 % 32 & 1;
              }
              var s22 = this._subKeys = [];
              for (var c2 = 0; c2 < 16; c2++) {
                var l2 = s22[c2] = [];
                var f2 = u[c2];
                for (var i3 = 0; i3 < 24; i3++) {
                  l2[i3 / 6 | 0] |= r4[(o[i3] - 1 + f2) % 28] << 31 - i3 % 6;
                  l2[4 + (i3 / 6 | 0)] |= r4[28 + (o[i3 + 24] - 1 + f2) % 28] << 31 - i3 % 6;
                }
                l2[0] = l2[0] << 1 | l2[0] >>> 31;
                for (var i3 = 1; i3 < 7; i3++)
                  l2[i3] = l2[i3] >>> (i3 - 1) * 4 + 3;
                l2[7] = l2[7] << 5 | l2[7] >>> 27;
              }
              var h2 = this._invSubKeys = [];
              for (var i3 = 0; i3 < 16; i3++)
                h2[i3] = s22[15 - i3];
            }, encryptBlock: function(t4, e4) {
              this._doCryptBlock(t4, e4, this._subKeys);
            }, decryptBlock: function(t4, e4) {
              this._doCryptBlock(t4, e4, this._invSubKeys);
            }, _doCryptBlock: function(t4, e4, r4) {
              this._lBlock = t4[e4];
              this._rBlock = t4[e4 + 1];
              h.call(this, 4, 252645135);
              h.call(this, 16, 65535);
              d.call(this, 2, 858993459);
              d.call(this, 8, 16711935);
              h.call(this, 1, 1431655765);
              for (var i3 = 0; i3 < 16; i3++) {
                var n22 = r4[i3];
                var s22 = this._lBlock;
                var a2 = this._rBlock;
                var o2 = 0;
                for (var u2 = 0; u2 < 8; u2++)
                  o2 |= c[u2][((a2 ^ n22[u2]) & l[u2]) >>> 0];
                this._lBlock = a2;
                this._rBlock = s22 ^ o2;
              }
              var f2 = this._lBlock;
              this._lBlock = this._rBlock;
              this._rBlock = f2;
              h.call(this, 1, 1431655765);
              d.call(this, 8, 16711935);
              d.call(this, 2, 858993459);
              h.call(this, 16, 65535);
              h.call(this, 4, 252645135);
              t4[e4] = this._lBlock;
              t4[e4 + 1] = this._rBlock;
            }, keySize: 64 / 32, ivSize: 64 / 32, blockSize: 64 / 32 });
            function h(t4, e4) {
              var r4 = (this._lBlock >>> t4 ^ this._rBlock) & e4;
              this._rBlock ^= r4;
              this._lBlock ^= r4 << t4;
            }
            function d(t4, e4) {
              var r4 = (this._rBlock >>> t4 ^ this._lBlock) & e4;
              this._lBlock ^= r4;
              this._rBlock ^= r4 << t4;
            }
            e3.DES = n2._createHelper(f);
            var v = s2.TripleDES = n2.extend({ _doReset: function() {
              var t4 = this._key;
              var e4 = t4.words;
              if (e4.length !== 2 && e4.length !== 4 && e4.length < 6)
                throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
              var r4 = e4.slice(0, 2);
              var n22 = e4.length < 4 ? e4.slice(0, 2) : e4.slice(2, 4);
              var s22 = e4.length < 6 ? e4.slice(0, 2) : e4.slice(4, 6);
              this._des1 = f.createEncryptor(i2.create(r4));
              this._des2 = f.createEncryptor(i2.create(n22));
              this._des3 = f.createEncryptor(i2.create(s22));
            }, encryptBlock: function(t4, e4) {
              this._des1.encryptBlock(t4, e4);
              this._des2.decryptBlock(t4, e4);
              this._des3.encryptBlock(t4, e4);
            }, decryptBlock: function(t4, e4) {
              this._des3.decryptBlock(t4, e4);
              this._des2.encryptBlock(t4, e4);
              this._des1.decryptBlock(t4, e4);
            }, keySize: 192 / 32, ivSize: 64 / 32, blockSize: 64 / 32 });
            e3.TripleDES = n2._createHelper(v);
          })();
          return t3.TripleDES;
        });
      }, 7930: (t2, e2) => {
        Object.defineProperty(e2, "__esModule", { value: true });
        class r2 {
          static getStr(t3, e3) {
            try {
              return t3 && t3[e3] || "";
            } catch (t4) {
            }
            return "";
          }
        }
        e2["default"] = r2;
      }, 8036: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        const n2 = i2(r2(3087));
        var s2;
        (function(t3) {
          t3.KEY_APPID = "getui_appid";
          t3.KEY_CID = "getui_cid";
          t3.KEY_SESSION = "getui_session";
          t3.KEY_REGID = "getui_regid";
          t3.KEY_SOCKET_URL = "getui_socket_url";
          t3.KEY_DEVICE_ID = "getui_deviceid";
          t3.KEY_ADD_PHONE_INFO_TIME = "getui_api_time";
          t3.KEY_BIND_ALIAS_TIME = "getui_ba_time";
          t3.KEY_SET_TAG_TIME = "getui_st_time";
          t3.KEY_REDIRECT_SERVER = "getui_redirect_server";
          t3.KEY_LAST_CONNECT_TIME = "getui_last_connect_time";
          function e3(t4) {
            n2.default.getStorage().set(t4);
          }
          t3.set = e3;
          function r3(t4, e4) {
            n2.default.getStorage().setSync(t4, e4);
          }
          t3.setSync = r3;
          function i3(t4) {
            n2.default.getStorage().get(t4);
          }
          t3.get = i3;
          function s22(t4, e4) {
            let r4 = n2.default.getStorage().getSync(t4);
            return r4 ? r4 : e4;
          }
          t3.getSync = s22;
        })(s2 || (s2 = {}));
        e2["default"] = s2;
      }, 8056: function(t2, e2, r2) {
        (function(i2, n2) {
          t2.exports = n2(r2(9021));
        })(this, function(t3) {
          (function(e3) {
            var r3 = t3;
            var i2 = r3.lib;
            var n2 = i2.WordArray;
            var s2 = i2.Hasher;
            var a = r3.algo;
            var o = n2.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]);
            var u = n2.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]);
            var c = n2.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]);
            var l = n2.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]);
            var f = n2.create([0, 1518500249, 1859775393, 2400959708, 2840853838]);
            var h = n2.create([1352829926, 1548603684, 1836072691, 2053994217, 0]);
            var d = a.RIPEMD160 = s2.extend({ _doReset: function() {
              this._hash = n2.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
            }, _doProcessBlock: function(t4, e4) {
              for (var r4 = 0; r4 < 16; r4++) {
                var i3 = e4 + r4;
                var n22 = t4[i3];
                t4[i3] = (n22 << 8 | n22 >>> 24) & 16711935 | (n22 << 24 | n22 >>> 8) & 4278255360;
              }
              var s22 = this._hash.words;
              var a2 = f.words;
              var d2 = h.words;
              var w = o.words;
              var S = u.words;
              var b = c.words;
              var E = l.words;
              var D, T, M, I, A;
              var R, x, B, C, O;
              R = D = s22[0];
              x = T = s22[1];
              B = M = s22[2];
              C = I = s22[3];
              O = A = s22[4];
              var k;
              for (var r4 = 0; r4 < 80; r4 += 1) {
                k = D + t4[e4 + w[r4]] | 0;
                if (r4 < 16)
                  k += v(T, M, I) + a2[0];
                else if (r4 < 32)
                  k += p(T, M, I) + a2[1];
                else if (r4 < 48)
                  k += g(T, M, I) + a2[2];
                else if (r4 < 64)
                  k += y(T, M, I) + a2[3];
                else
                  k += m(T, M, I) + a2[4];
                k |= 0;
                k = _(k, b[r4]);
                k = k + A | 0;
                D = A;
                A = I;
                I = _(M, 10);
                M = T;
                T = k;
                k = R + t4[e4 + S[r4]] | 0;
                if (r4 < 16)
                  k += m(x, B, C) + d2[0];
                else if (r4 < 32)
                  k += y(x, B, C) + d2[1];
                else if (r4 < 48)
                  k += g(x, B, C) + d2[2];
                else if (r4 < 64)
                  k += p(x, B, C) + d2[3];
                else
                  k += v(x, B, C) + d2[4];
                k |= 0;
                k = _(k, E[r4]);
                k = k + O | 0;
                R = O;
                O = C;
                C = _(B, 10);
                B = x;
                x = k;
              }
              k = s22[1] + M + C | 0;
              s22[1] = s22[2] + I + O | 0;
              s22[2] = s22[3] + A + R | 0;
              s22[3] = s22[4] + D + x | 0;
              s22[4] = s22[0] + T + B | 0;
              s22[0] = k;
            }, _doFinalize: function() {
              var t4 = this._data;
              var e4 = t4.words;
              var r4 = this._nDataBytes * 8;
              var i3 = t4.sigBytes * 8;
              e4[i3 >>> 5] |= 128 << 24 - i3 % 32;
              e4[(i3 + 64 >>> 9 << 4) + 14] = (r4 << 8 | r4 >>> 24) & 16711935 | (r4 << 24 | r4 >>> 8) & 4278255360;
              t4.sigBytes = (e4.length + 1) * 4;
              this._process();
              var n22 = this._hash;
              var s22 = n22.words;
              for (var a2 = 0; a2 < 5; a2++) {
                var o2 = s22[a2];
                s22[a2] = (o2 << 8 | o2 >>> 24) & 16711935 | (o2 << 24 | o2 >>> 8) & 4278255360;
              }
              return n22;
            }, clone: function() {
              var t4 = s2.clone.call(this);
              t4._hash = this._hash.clone();
              return t4;
            } });
            function v(t4, e4, r4) {
              return t4 ^ e4 ^ r4;
            }
            function p(t4, e4, r4) {
              return t4 & e4 | ~t4 & r4;
            }
            function g(t4, e4, r4) {
              return (t4 | ~e4) ^ r4;
            }
            function y(t4, e4, r4) {
              return t4 & r4 | e4 & ~r4;
            }
            function m(t4, e4, r4) {
              return t4 ^ (e4 | ~r4);
            }
            function _(t4, e4) {
              return t4 << e4 | t4 >>> 32 - e4;
            }
            r3.RIPEMD160 = s2._createHelper(d);
            r3.HmacRIPEMD160 = s2._createHmacHelper(d);
          })();
          return t3.RIPEMD160;
        });
      }, 8124: function(t2, e2, r2) {
        (function(i2, n2, s2) {
          t2.exports = n2(r2(9021), r2(7165));
        })(this, function(t3) {
          t3.pad.NoPadding = { pad: function() {
          }, unpad: function() {
          } };
          return t3.pad.NoPadding;
        });
      }, 8454: function(t2, e2, r2) {
        (function(i2, n2, s2) {
          t2.exports = n2(r2(9021), r2(7165));
        })(this, function(t3) {
          t3.mode.ECB = function() {
            var e3 = t3.lib.BlockCipherMode.extend();
            e3.Encryptor = e3.extend({ processBlock: function(t4, e4) {
              this._cipher.encryptBlock(t4, e4);
            } });
            e3.Decryptor = e3.extend({ processBlock: function(t4, e4) {
              this._cipher.decryptBlock(t4, e4);
            } });
            return e3;
          }();
          return t3.mode.ECB;
        });
      }, 8722: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        const n2 = i2(r2(9420));
        const s2 = i2(r2(6828));
        const a = i2(r2(2720));
        const o = r2(4786);
        const u = i2(r2(5110));
        const c = i2(r2(669));
        const l = i2(r2(3087));
        const f = i2(r2(8036));
        var h;
        (function(t3) {
          let e3;
          let r3 = false;
          let i3 = false;
          let h2 = false;
          let d = [];
          const v = 10;
          let p = 0;
          t3.allowReconnect = true;
          function g() {
            return r3 && i3;
          }
          t3.isAvailable = g;
          function y(e4) {
            let r4 = (/* @__PURE__ */ new Date()).getTime();
            if (r4 - p < 1e3) {
              c.default.warn(`enableSocket ${e4} fail: this function can only be called once a second`);
              return;
            }
            p = r4;
            t3.allowReconnect = e4;
            if (e4)
              t3.reconnect(10);
            else
              t3.close(`enableSocket ${e4}`);
          }
          t3.enableSocket = y;
          function m(e4 = 0) {
            if (!t3.allowReconnect)
              return;
            if (!S())
              return;
            setTimeout(function() {
              _();
            }, e4);
          }
          t3.reconnect = m;
          function _() {
            t3.allowReconnect = true;
            if (!S())
              return;
            if (!b())
              return;
            h2 = true;
            let r4 = n2.default.socketUrl;
            try {
              let t4 = f.default.getSync(f.default.KEY_REDIRECT_SERVER, "");
              if (t4) {
                let e4 = o.RedirectServerData.parse(t4);
                let i4 = e4.addressList[0].split(",");
                let n22 = i4[0];
                let s22 = Number(i4[1]);
                let a2 = (/* @__PURE__ */ new Date()).getTime();
                if (a2 - e4.time < s22 * 1e3)
                  r4 = n22;
              }
            } catch (t4) {
            }
            e3 = l.default.getWebSocket().connect({ url: r4, success: function() {
              i3 = true;
              w();
            }, fail: function() {
              i3 = false;
              T();
              m(100);
            } });
            e3.onOpen(M);
            e3.onClose(R);
            e3.onError(A);
            e3.onMessage(I);
          }
          t3.connect = _;
          function w() {
            if (i3 && r3) {
              h2 = false;
              s2.default.create().send();
              u.default.getInstance().start();
            }
          }
          function S() {
            if (!n2.default.networkConnected) {
              c.default.error(`connect failed, network is not available`);
              return false;
            }
            if (h2) {
              c.default.warn(`connecting`);
              return false;
            }
            if (g()) {
              c.default.warn(`already connected`);
              return false;
            }
            return true;
          }
          function b() {
            var t4 = d.length;
            let e4 = (/* @__PURE__ */ new Date()).getTime();
            if (t4 > 0) {
              for (var r4 = t4 - 1; r4 >= 0; r4--)
                if (e4 - d[r4] > 5e3) {
                  d.splice(0, r4 + 1);
                  break;
                }
            }
            t4 = d.length;
            d.push(e4);
            if (t4 >= v) {
              c.default.error("connect failed, connection limit reached");
              return false;
            }
            return true;
          }
          function E(t4 = "") {
            e3 === null || e3 === void 0 || e3.close({ code: 1e3, reason: t4, success: function(t5) {
            }, fail: function(t5) {
            } });
            T();
          }
          t3.close = E;
          function D(t4) {
            if (r3 && r3)
              e3 === null || e3 === void 0 || e3.send({ data: t4, success: function(t5) {
              }, fail: function(t5) {
              } });
            else
              throw new Error(`socket not connect`);
          }
          t3.send = D;
          function T(t4) {
            var e4;
            i3 = false;
            r3 = false;
            h2 = false;
            u.default.getInstance().cancel();
            if (n2.default.online) {
              n2.default.online = false;
              (e4 = n2.default.onlineState) === null || e4 === void 0 || e4.call(n2.default.onlineState, { online: n2.default.online });
            }
          }
          let M = function(t4) {
            r3 = true;
            w();
          };
          let I = function(t4) {
            try {
              t4.data;
              u.default.getInstance().refresh();
              a.default.receiveMessage(t4.data);
            } catch (t5) {
            }
          };
          let A = function(t4) {
            E(`socket error`);
          };
          let R = function(t4) {
            T();
          };
        })(h || (h = {}));
        e2["default"] = h;
      }, 9021: function(t2, e2, r2) {
        (function(r3, i2) {
          t2.exports = i2();
        })(this, function() {
          var t3 = t3 || function(t4, e3) {
            var i2;
            if (typeof window !== "undefined" && $inject_window_crypto)
              i2 = $inject_window_crypto;
            if (typeof self !== "undefined" && self.crypto)
              i2 = self.crypto;
            if (typeof globalThis !== "undefined" && globalThis.crypto)
              i2 = globalThis.crypto;
            if (!i2 && typeof window !== "undefined" && window.msCrypto)
              i2 = window.msCrypto;
            if (!i2 && typeof r2.g !== "undefined" && r2.g.crypto)
              i2 = r2.g.crypto;
            if (!i2 && true)
              try {
                i2 = r2(477);
              } catch (t5) {
              }
            var n2 = function() {
              if (i2) {
                if (typeof i2.getRandomValues === "function")
                  try {
                    return i2.getRandomValues(new Uint32Array(1))[0];
                  } catch (t5) {
                  }
                if (typeof i2.randomBytes === "function")
                  try {
                    return i2.randomBytes(4).readInt32LE();
                  } catch (t5) {
                  }
              }
              throw new Error("Native crypto module could not be used to get secure random number.");
            };
            var s2 = Object.create || /* @__PURE__ */ function() {
              function t5() {
              }
              return function(e4) {
                var r3;
                t5.prototype = e4;
                r3 = new t5();
                t5.prototype = null;
                return r3;
              };
            }();
            var a = {};
            var o = a.lib = {};
            var u = o.Base = /* @__PURE__ */ function() {
              return { extend: function(t5) {
                var e4 = s2(this);
                if (t5)
                  e4.mixIn(t5);
                if (!e4.hasOwnProperty("init") || this.init === e4.init)
                  e4.init = function() {
                    e4.$super.init.apply(this, arguments);
                  };
                e4.init.prototype = e4;
                e4.$super = this;
                return e4;
              }, create: function() {
                var t5 = this.extend();
                t5.init.apply(t5, arguments);
                return t5;
              }, init: function() {
              }, mixIn: function(t5) {
                for (var e4 in t5)
                  if (t5.hasOwnProperty(e4))
                    this[e4] = t5[e4];
                if (t5.hasOwnProperty("toString"))
                  this.toString = t5.toString;
              }, clone: function() {
                return this.init.prototype.extend(this);
              } };
            }();
            var c = o.WordArray = u.extend({ init: function(t5, r3) {
              t5 = this.words = t5 || [];
              if (r3 != e3)
                this.sigBytes = r3;
              else
                this.sigBytes = t5.length * 4;
            }, toString: function(t5) {
              return (t5 || f).stringify(this);
            }, concat: function(t5) {
              var e4 = this.words;
              var r3 = t5.words;
              var i3 = this.sigBytes;
              var n22 = t5.sigBytes;
              this.clamp();
              if (i3 % 4)
                for (var s22 = 0; s22 < n22; s22++) {
                  var a2 = r3[s22 >>> 2] >>> 24 - s22 % 4 * 8 & 255;
                  e4[i3 + s22 >>> 2] |= a2 << 24 - (i3 + s22) % 4 * 8;
                }
              else
                for (var o2 = 0; o2 < n22; o2 += 4)
                  e4[i3 + o2 >>> 2] = r3[o2 >>> 2];
              this.sigBytes += n22;
              return this;
            }, clamp: function() {
              var e4 = this.words;
              var r3 = this.sigBytes;
              e4[r3 >>> 2] &= 4294967295 << 32 - r3 % 4 * 8;
              e4.length = t4.ceil(r3 / 4);
            }, clone: function() {
              var t5 = u.clone.call(this);
              t5.words = this.words.slice(0);
              return t5;
            }, random: function(t5) {
              var e4 = [];
              for (var r3 = 0; r3 < t5; r3 += 4)
                e4.push(n2());
              return new c.init(e4, t5);
            } });
            var l = a.enc = {};
            var f = l.Hex = { stringify: function(t5) {
              var e4 = t5.words;
              var r3 = t5.sigBytes;
              var i3 = [];
              for (var n22 = 0; n22 < r3; n22++) {
                var s22 = e4[n22 >>> 2] >>> 24 - n22 % 4 * 8 & 255;
                i3.push((s22 >>> 4).toString(16));
                i3.push((s22 & 15).toString(16));
              }
              return i3.join("");
            }, parse: function(t5) {
              var e4 = t5.length;
              var r3 = [];
              for (var i3 = 0; i3 < e4; i3 += 2)
                r3[i3 >>> 3] |= parseInt(t5.substr(i3, 2), 16) << 24 - i3 % 8 * 4;
              return new c.init(r3, e4 / 2);
            } };
            var h = l.Latin1 = { stringify: function(t5) {
              var e4 = t5.words;
              var r3 = t5.sigBytes;
              var i3 = [];
              for (var n22 = 0; n22 < r3; n22++) {
                var s22 = e4[n22 >>> 2] >>> 24 - n22 % 4 * 8 & 255;
                i3.push(String.fromCharCode(s22));
              }
              return i3.join("");
            }, parse: function(t5) {
              var e4 = t5.length;
              var r3 = [];
              for (var i3 = 0; i3 < e4; i3++)
                r3[i3 >>> 2] |= (t5.charCodeAt(i3) & 255) << 24 - i3 % 4 * 8;
              return new c.init(r3, e4);
            } };
            var d = l.Utf8 = { stringify: function(t5) {
              try {
                return decodeURIComponent(escape(h.stringify(t5)));
              } catch (t6) {
                throw new Error("Malformed UTF-8 data");
              }
            }, parse: function(t5) {
              return h.parse(unescape(encodeURIComponent(t5)));
            } };
            var v = o.BufferedBlockAlgorithm = u.extend({ reset: function() {
              this._data = new c.init();
              this._nDataBytes = 0;
            }, _append: function(t5) {
              if (typeof t5 == "string")
                t5 = d.parse(t5);
              this._data.concat(t5);
              this._nDataBytes += t5.sigBytes;
            }, _process: function(e4) {
              var r3;
              var i3 = this._data;
              var n22 = i3.words;
              var s22 = i3.sigBytes;
              var a2 = this.blockSize;
              var o2 = a2 * 4;
              var u2 = s22 / o2;
              if (e4)
                u2 = t4.ceil(u2);
              else
                u2 = t4.max((u2 | 0) - this._minBufferSize, 0);
              var l2 = u2 * a2;
              var f2 = t4.min(l2 * 4, s22);
              if (l2) {
                for (var h2 = 0; h2 < l2; h2 += a2)
                  this._doProcessBlock(n22, h2);
                r3 = n22.splice(0, l2);
                i3.sigBytes -= f2;
              }
              return new c.init(r3, f2);
            }, clone: function() {
              var t5 = u.clone.call(this);
              t5._data = this._data.clone();
              return t5;
            }, _minBufferSize: 0 });
            o.Hasher = v.extend({ cfg: u.extend(), init: function(t5) {
              this.cfg = this.cfg.extend(t5);
              this.reset();
            }, reset: function() {
              v.reset.call(this);
              this._doReset();
            }, update: function(t5) {
              this._append(t5);
              this._process();
              return this;
            }, finalize: function(t5) {
              if (t5)
                this._append(t5);
              var e4 = this._doFinalize();
              return e4;
            }, blockSize: 512 / 32, _createHelper: function(t5) {
              return function(e4, r3) {
                return new t5.init(r3).finalize(e4);
              };
            }, _createHmacHelper: function(t5) {
              return function(e4, r3) {
                return new g.HMAC.init(t5, r3).finalize(e4);
              };
            } });
            var g = a.algo = {};
            return a;
          }(Math);
          return t3;
        });
      }, 9420: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        const n2 = i2(r2(6068));
        const s2 = i2(r2(8036));
        const a = i2(r2(213));
        const o = i2(r2(8722));
        const u = i2(r2(669));
        const c = i2(r2(4915));
        const l = i2(r2(6422));
        class f {
          static init(t3) {
            var e3;
            this.appid = l.default.to_getui(t3.appid);
            u.default.info(`getui appid: ${this.appid}`);
            this.onError = t3.onError;
            this.onClientId = t3.onClientId;
            this.onlineState = t3.onlineState;
            this.onPushMsg = t3.onPushMsg;
            if (this.appid != s2.default.getSync(s2.default.KEY_APPID, this.appid)) {
              u.default.info("appid changed, clear session and cid");
              s2.default.setSync(s2.default.KEY_CID, "");
              s2.default.setSync(s2.default.KEY_SESSION, "");
            }
            s2.default.setSync(s2.default.KEY_APPID, this.appid);
            this.cid = s2.default.getSync(s2.default.KEY_CID, this.cid);
            if (this.cid)
              (e3 = this.onClientId) === null || e3 === void 0 || e3.call(this.onClientId, { cid: f.cid });
            this.session = s2.default.getSync(s2.default.KEY_SESSION, this.session);
            this.deviceId = s2.default.getSync(s2.default.KEY_DEVICE_ID, this.deviceId);
            this.regId = s2.default.getSync(s2.default.KEY_REGID, this.regId);
            if (!this.regId) {
              this.regId = this.createRegId();
              s2.default.set({ key: s2.default.KEY_REGID, data: this.regId });
            }
            this.socketUrl = s2.default.getSync(s2.default.KEY_SOCKET_URL, this.socketUrl);
            let r3 = this;
            c.default.getNetworkType({ success: (t4) => {
              r3.networkType = t4.networkType;
              r3.networkConnected = r3.networkType != "none" && r3.networkType != "";
            } });
            c.default.onNetworkStatusChange((t4) => {
              r3.networkConnected = t4.isConnected;
              r3.networkType = t4.networkType;
              if (r3.networkConnected)
                o.default.reconnect(100);
            });
          }
          static createRegId() {
            return `M-V${n2.default.md5Hex(this.getUuid())}-${(/* @__PURE__ */ new Date()).getTime()}`;
          }
          static getUuid() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t3) {
              let e3 = Math.random() * 16 | 0, r3 = t3 === "x" ? e3 : e3 & 3 | 8;
              return r3.toString(16);
            });
          }
        }
        f.appid = "";
        f.cid = "";
        f.regId = "";
        f.session = "";
        f.deviceId = "";
        f.packetId = 1;
        f.online = false;
        f.socketUrl = a.default.DEFAULT_SOCKET_URL;
        f.publicKeyId = a.default.SERVER_PUBLIC_KEY_ID;
        f.publicKey = a.default.SERVER_PUBLIC_KEY;
        f.lastAliasTime = 0;
        f.networkConnected = true;
        f.networkType = "none";
        e2["default"] = f;
      }, 9506: function(t2, e2, r2) {
        (function(i2, n2, s2) {
          t2.exports = n2(r2(9021), r2(5471), r2(1025));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.lib;
            var i2 = r3.Base;
            var n2 = r3.WordArray;
            var s2 = e3.algo;
            var a = s2.MD5;
            var o = s2.EvpKDF = i2.extend({ cfg: i2.extend({ keySize: 128 / 32, hasher: a, iterations: 1 }), init: function(t4) {
              this.cfg = this.cfg.extend(t4);
            }, compute: function(t4, e4) {
              var r4;
              var i3 = this.cfg;
              var s22 = i3.hasher.create();
              var a2 = n2.create();
              var o2 = a2.words;
              var u = i3.keySize;
              var c = i3.iterations;
              while (o2.length < u) {
                if (r4)
                  s22.update(r4);
                r4 = s22.update(t4).finalize(e4);
                s22.reset();
                for (var l = 1; l < c; l++) {
                  r4 = s22.finalize(r4);
                  s22.reset();
                }
                a2.concat(r4);
              }
              a2.sigBytes = u * 4;
              return a2;
            } });
            e3.EvpKDF = function(t4, e4, r4) {
              return o.create(r4).compute(t4, e4);
            };
          })();
          return t3.EvpKDF;
        });
      }, 9557: function(t2, e2, r2) {
        (function(i2, n2, s2) {
          t2.exports = n2(r2(9021), r2(3240), r2(1380));
        })(this, function(t3) {
          (function() {
            var e3 = t3;
            var r3 = e3.x64;
            var i2 = r3.Word;
            var n2 = r3.WordArray;
            var s2 = e3.algo;
            var a = s2.SHA512;
            var o = s2.SHA384 = a.extend({ _doReset: function() {
              this._hash = new n2.init([new i2.init(3418070365, 3238371032), new i2.init(1654270250, 914150663), new i2.init(2438529370, 812702999), new i2.init(355462360, 4144912697), new i2.init(1731405415, 4290775857), new i2.init(2394180231, 1750603025), new i2.init(3675008525, 1694076839), new i2.init(1203062813, 3204075428)]);
            }, _doFinalize: function() {
              var t4 = a._doFinalize.call(this);
              t4.sigBytes -= 16;
              return t4;
            } });
            e3.SHA384 = a._createHelper(o);
            e3.HmacSHA384 = a._createHmacHelper(o);
          })();
          return t3.SHA384;
        });
      }, 9560: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        const n2 = i2(r2(8036));
        const s2 = i2(r2(7374));
        class a extends s2.default {
          constructor() {
            super(...arguments);
            this.addPhoneInfoResultData = new o();
          }
          static parse(t3) {
            let e3 = new a();
            super.parseActionMsg(e3, t3);
            e3.addPhoneInfoResultData = o.parse(e3.actionMsgData.msgData);
            return e3;
          }
          receive() {
            var t3;
            this.addPhoneInfoResultData;
            let e3 = s2.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
            if (e3)
              (t3 = e3.callback) === null || t3 === void 0 || t3.call(e3.callback, { resultCode: this.addPhoneInfoResultData.errorCode, message: this.addPhoneInfoResultData.errorMsg });
            n2.default.set({ key: n2.default.KEY_ADD_PHONE_INFO_TIME, data: (/* @__PURE__ */ new Date()).getTime() });
          }
        }
        class o {
          constructor() {
            this.errorCode = -1;
            this.errorMsg = "";
          }
          static parse(t3) {
            let e3 = new o();
            let r3 = JSON.parse(t3);
            e3.errorCode = r3.errorCode;
            e3.errorMsg = r3.errorMsg;
            return e3;
          }
        }
        e2["default"] = a;
      }, 9877: function(t2, e2, r2) {
        var i2 = this && this.__importDefault || function(t3) {
          return t3 && t3.__esModule ? t3 : { default: t3 };
        };
        Object.defineProperty(e2, "__esModule", { value: true });
        const n2 = i2(r2(8036));
        const s2 = i2(r2(7574));
        const a = i2(r2(9420));
        const o = i2(r2(7374));
        const u = i2(r2(3237));
        const c = i2(r2(2620));
        class l extends s2.default {
          constructor() {
            super(...arguments);
            this.loginResultData = new f();
          }
          static parse(t3) {
            let e3 = new l();
            super.parseMsg(e3, t3);
            e3.loginResultData = f.parse(e3.data);
            return e3;
          }
          receive() {
            var t3;
            if (this.loginResultData.errorCode != 0) {
              this.data;
              a.default.session = a.default.cid = "";
              n2.default.setSync(n2.default.KEY_CID, "");
              n2.default.setSync(n2.default.KEY_SESSION, "");
              c.default.create().send();
              return;
            }
            if (!a.default.online) {
              a.default.online = true;
              (t3 = a.default.onlineState) === null || t3 === void 0 || t3.call(a.default.onlineState, { online: a.default.online });
            }
            o.default.sendWaitingMessages();
            u.default.create().send();
          }
        }
        class f {
          constructor() {
            this.errorCode = -1;
            this.errorMsg = "";
            this.session = "";
          }
          static parse(t3) {
            let e3 = new f();
            let r3 = JSON.parse(t3);
            e3.errorCode = r3.errorCode;
            e3.errorMsg = r3.errorMsg;
            e3.session = r3.session;
            return e3;
          }
        }
        e2["default"] = l;
      } };
      var e = {};
      function r(i2) {
        var n2 = e[i2];
        if (n2 !== void 0)
          return n2.exports;
        var s2 = e[i2] = { id: i2, loaded: false, exports: {} };
        t[i2].call(s2.exports, s2, s2.exports, r);
        s2.loaded = true;
        return s2.exports;
      }
      (() => {
        r.d = (t2, e2) => {
          for (var i2 in e2)
            if (r.o(e2, i2) && !r.o(t2, i2))
              Object.defineProperty(t2, i2, { enumerable: true, get: e2[i2] });
        };
      })();
      (() => {
        r.g = function() {
          if (typeof globalThis === "object")
            return globalThis;
          try {
            return this || new Function("return this")();
          } catch (t2) {
            if (typeof window === "object")
              return window;
          }
        }();
      })();
      (() => {
        r.o = (t2, e2) => Object.prototype.hasOwnProperty.call(t2, e2);
      })();
      (() => {
        r.r = (t2) => {
          if (typeof Symbol !== "undefined" && Symbol.toStringTag)
            Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" });
          Object.defineProperty(t2, "__esModule", { value: true });
        };
      })();
      (() => {
        r.nmd = (t2) => {
          t2.paths = [];
          if (!t2.children)
            t2.children = [];
          return t2;
        };
      })();
      var i = r(3886);
      return i;
    })());
  })(gtpushMin);
  var gtpushMinExports = gtpushMin.exports;
  var GtPush = /* @__PURE__ */ getDefaultExportFromCjs(gtpushMinExports);
  function initPushNotification() {
    if (typeof plus !== "undefined" && plus.push) {
      plus.globalEvent.addEventListener("newPath", ({ path }) => {
        if (!path) {
          return;
        }
        const pages = getCurrentPages();
        const currentPage = pages[pages.length - 1];
        if (currentPage && currentPage.$page && currentPage.$page.fullPath === path) {
          return;
        }
        uni.navigateTo({
          url: path,
          fail(res) {
            if (res.errMsg.indexOf("tabbar") > -1) {
              uni.switchTab({
                url: path,
                fail(res2) {
                  console.error(res2.errMsg);
                }
              });
            } else {
              console.error(res.errMsg);
            }
          }
        });
      });
    }
  }
  function initGtPush(appid2, onCallback) {
    if (typeof uni.onAppShow === "function") {
      uni.onAppShow(() => {
        GtPush.enableSocket(true);
      });
    }
    GtPush.init({
      appid: appid2,
      onError: (res) => {
        console.error(res.error);
        onCallback({
          type: "clientId",
          cid: "",
          errMsg: res.error
        });
      },
      onClientId: (res) => {
        onCallback({
          type: "clientId",
          cid: res.cid
        });
      },
      onlineState: (res) => {
        onCallback({
          type: "lineState",
          online: res.online
        });
      },
      onPushMsg: (res) => {
        onCallback({
          type: "pushMsg",
          message: res.message
        });
      }
    });
  }
  uni.invokePushCallback({
    type: "enabled"
  });
  const appid = "__UNI__137BD60";
  {
    initPushNotification();
    initGtPush(appid, (data) => {
      uni.invokePushCallback(data);
    });
    uni.onPushMessage((res) => {
      if (res.type === "receive" && res.data && res.data.force_notification) {
        uni.createPushMessage(res.data);
        res.stopped = true;
      }
    });
  }
  const _sfc_main = {
    __name: "App",
    setup(__props, { expose: __expose }) {
      __expose();
      onLaunch(() => {
        loadUser();
        ensureBase().then(async (b) => {
          store.base = b;
          if (store.user && store.user.username) {
            try {
              const r = await get$1("/api/me");
              if (r.data && r.data.ok && r.data.bg)
                setBg(r.data.bg);
            } catch (e) {
            }
          }
        });
        initPush();
        registerPush();
      });
      function initPush() {
        try {
          plus.push.addEventListener("click", (msg) => {
            formatAppLog("log", "at App.vue:29", "[push] click", msg);
          });
          plus.push.addEventListener("receive", (msg) => {
            formatAppLog("log", "at App.vue:33", "[push] receive", msg);
          });
        } catch (e) {
        }
      }
      onShow(() => {
        const b = getBase();
        if (b && b !== store.base)
          store.base = b;
      });
      const __returned__ = { initPush, get onLaunch() {
        return onLaunch;
      }, get onShow() {
        return onShow;
      }, get ensureBase() {
        return ensureBase;
      }, get getBase() {
        return getBase;
      }, get get() {
        return get$1;
      }, get loadUser() {
        return loadUser;
      }, get store() {
        return store;
      }, get setBg() {
        return setBg;
      }, get registerPush() {
        return registerPush;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "E:/WorkBuddy/2026-07-13-23-25-59/同学录系统_uni-app/App.vue"]]);
  const LT = {
    Launch: "1",
    Hide: "3",
    Page: "11",
    Event: "21",
    Error: "31",
    Push: "101"
  };
  const CST = {
    ColdLaunch: 1,
    BackgroundTimeout: 2,
    PageInactiveTimeout: 3
  };
  const IEY = {
    No: 0,
    Yes: 1
  };
  function toIey(input) {
    if (input === true || input === 1 || input === "1")
      return IEY.Yes;
    return IEY.No;
  }
  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }
  typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };
  const DEFAULT_MAX_LENGTH = 4096;
  const TRUNCATED_SUFFIX = "…[truncated]";
  function safeStringify(value, max = DEFAULT_MAX_LENGTH) {
    var _a;
    if (value === void 0)
      return "";
    let raw;
    if (typeof value === "string") {
      raw = value;
    } else {
      const seen = /* @__PURE__ */ new WeakSet();
      try {
        raw = (_a = JSON.stringify(value, (_key, val) => {
          if (typeof val === "object" && val !== null) {
            if (seen.has(val))
              return "[Circular]";
            seen.add(val);
          }
          if (typeof val === "bigint")
            return val.toString();
          if (typeof val === "function")
            return `[Function ${val.name || "anonymous"}]`;
          return val;
        })) !== null && _a !== void 0 ? _a : "";
      } catch (e) {
        raw = `[Unserializable: ${e.message}]`;
      }
    }
    if (raw.length > max) {
      return raw.slice(0, Math.max(0, max - TRUNCATED_SUFFIX.length)) + TRUNCATED_SUFFIX;
    }
    return raw;
  }
  function tryRun(fn, fallback) {
    try {
      return fn();
    } catch (_a) {
      return fallback;
    }
  }
  function withRetry(fn, opts) {
    return __awaiter(this, void 0, void 0, function* () {
      var _a;
      const total = Math.max(1, Math.floor(opts.times));
      const sleep = (_a = opts.sleep) !== null && _a !== void 0 ? _a : defaultSleep;
      let lastErr;
      for (let attempt = 1; attempt <= total; attempt++) {
        try {
          return yield fn();
        } catch (e) {
          lastErr = e;
          if (attempt >= total)
            break;
          yield sleep(opts.baseDelayMs * Math.pow(2, attempt - 1));
        }
      }
      throw lastErr;
    });
  }
  function defaultSleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  function isUsableUniRuntime(candidate) {
    if (candidate == null || typeof candidate !== "object")
      return false;
    const u = candidate;
    return typeof u.getStorageSync === "function" || typeof u.onCreateVueApp === "function" || typeof u.request === "function" || typeof u.onAppShow === "function";
  }
  function getModuleUniCandidate() {
    if (typeof uni === "undefined" || uni == null || typeof uni !== "object") {
      return void 0;
    }
    return uni;
  }
  function getWindowObject() {
    try {
      const w = Function('return typeof window !== "undefined" ? window : undefined')();
      return w != null ? w : void 0;
    } catch (_a) {
      return void 0;
    }
  }
  function getGlobalObject() {
    if (typeof globalThis !== "undefined" && globalThis != null) {
      return globalThis;
    }
    if (typeof global !== "undefined" && global != null) {
      return global;
    }
    if (typeof self !== "undefined" && self != null) {
      return self;
    }
    const win = getWindowObject();
    if (win)
      return win;
    return {};
  }
  function buildInjectedUniRuntime() {
    try {
      const out = {};
      const pick = (name, fn) => {
        if (typeof fn === "function")
          out[name] = fn;
      };
      pick("getStorageSync", uni.getStorageSync);
      pick("setStorageSync", uni.setStorageSync);
      pick("removeStorageSync", uni.removeStorageSync);
      pick("getSystemInfoSync", uni.getSystemInfoSync);
      pick("getDeviceInfo", uni.getDeviceInfo);
      pick("getAppBaseInfo", uni.getAppBaseInfo);
      pick("getWindowInfo", uni.getWindowInfo);
      pick("getNetworkType", uni.getNetworkType);
      pick("request", uni.request);
      pick("onAppShow", uni.onAppShow);
      pick("offAppShow", uni.offAppShow);
      pick("onAppHide", uni.onAppHide);
      pick("offAppHide", uni.offAppHide);
      pick("onAppLaunch", uni.onAppLaunch);
      pick("offAppLaunch", uni.offAppLaunch);
      pick("getLaunchOptionsSync", uni.getLaunchOptionsSync);
      pick("addInterceptor", uni.addInterceptor);
      pick("removeInterceptor", uni.removeInterceptor);
      pick("getPushClientId", uni.getPushClientId);
      pick("getAccountInfoSync", uni.getAccountInfoSync);
      pick("onCreateVueApp", uni.onCreateVueApp);
      return Object.keys(out).length > 0 ? out : void 0;
    } catch (_e) {
      return void 0;
    }
  }
  function probeUniRuntime() {
    const globalThisAvailable = typeof globalThis !== "undefined";
    const g = getGlobalObject();
    const globalUni = g.uni;
    const globalThisHasUni = globalUni != null && typeof globalUni === "object";
    const globalThisUniStub = globalThisHasUni && !isUsableUniRuntime(globalUni);
    const moduleUni = getModuleUniCandidate();
    const moduleUniDefined = moduleUni != null;
    if (isUsableUniRuntime(globalUni)) {
      return {
        resolved: true,
        source: "globalThis",
        globalThisHasUni: true,
        globalThisUniStub: false,
        moduleUniDefined,
        globalThisAvailable,
        uni: globalUni
      };
    }
    if (isUsableUniRuntime(moduleUni)) {
      return {
        resolved: true,
        source: "module",
        globalThisHasUni,
        globalThisUniStub,
        moduleUniDefined: true,
        globalThisAvailable,
        uni: moduleUni
      };
    }
    const injectedUni = buildInjectedUniRuntime();
    if (isUsableUniRuntime(injectedUni)) {
      return {
        resolved: true,
        source: "injected",
        globalThisHasUni,
        globalThisUniStub,
        moduleUniDefined,
        globalThisAvailable,
        uni: injectedUni
      };
    }
    return {
      resolved: false,
      source: "none",
      globalThisHasUni,
      globalThisUniStub,
      moduleUniDefined,
      globalThisAvailable,
      uni: void 0
    };
  }
  function resolveUniRuntime() {
    const probe = probeUniRuntime();
    return probe.resolved ? probe.uni : void 0;
  }
  const TAG = "[uni统计 2.0]";
  let runtimeDebug;
  let muteNonDebug;
  function preferSingleLineConsole() {
    return isAndroidOrIosRuntime();
  }
  function isAndroidOrIosRuntime() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const raw = (_a = "app") !== null && _a !== void 0 ? _a : "";
    const g = getGlobalObject();
    if (raw === "app" || raw === "app-plus" || raw === "app-harmony") {
      const n2 = (_d = (_c = (_b = g.plus) === null || _b === void 0 ? void 0 : _b.os) === null || _c === void 0 ? void 0 : _c.name) === null || _d === void 0 ? void 0 : _d.toLowerCase();
      if (!n2)
        return false;
      if (n2.includes("android"))
        return true;
      if (n2 === "ios" || n2.includes("iphone"))
        return true;
      return false;
    }
    if (raw.startsWith("mp-")) {
      try {
        const p = (_h = (_g = (_f = (_e = g.uni) === null || _e === void 0 ? void 0 : _e.getSystemInfoSync) === null || _f === void 0 ? void 0 : _f.call(_e)) === null || _g === void 0 ? void 0 : _g.platform) === null || _h === void 0 ? void 0 : _h.toLowerCase();
        return p === "android" || p === "ios";
      } catch (_j) {
        return false;
      }
    }
    return false;
  }
  function stringifyObjectArgForNative(value) {
    if (value === null || value === void 0)
      return value;
    if (typeof value !== "object")
      return value;
    if (value instanceof Error)
      return `${value.name}: ${value.message}`;
    return safeStringify(value);
  }
  function formatLogArgForNativeConsole(value) {
    if (value === null)
      return "null";
    if (value === void 0)
      return "undefined";
    if (typeof value === "string")
      return value;
    if (typeof value === "number" || typeof value === "boolean") {
      return String(value);
    }
    if (typeof value === "bigint")
      return String(value);
    if (typeof value === "symbol") {
      try {
        return value.toString();
      } catch (_a) {
        return "?";
      }
    }
    if (typeof value === "function") {
      const fn = value;
      return `[Function ${fn.name || "anonymous"}]`;
    }
    if (typeof value === "object") {
      if (value instanceof Error)
        return `${value.name}: ${value.message}`;
      return safeStringify(value);
    }
    return String(value);
  }
  function isNonDebugMuted() {
    if (muteNonDebug !== void 0)
      return muteNonDebug;
    return false;
  }
  function setMuteNonDebug(value) {
    muteNonDebug = value;
  }
  function emitConsole(method, args) {
    if (method !== "log" && isNonDebugMuted())
      return;
    const fn = console[method];
    if (!preferSingleLineConsole()) {
      fn.call(console, TAG, ...args);
      return;
    }
    const mapped = isAndroidOrIosRuntime() ? args.map(stringifyObjectArgForNative) : args;
    if (mapped.length === 0) {
      fn.call(console, TAG);
      return;
    }
    const body = mapped.map(formatLogArgForNativeConsole).join(" ");
    fn.call(console, `${TAG} ${body}`);
  }
  function isDebug() {
    if (runtimeDebug !== void 0)
      return runtimeDebug;
    const v = "false";
    return v === true;
  }
  function setDebug(value) {
    runtimeDebug = value;
  }
  const logger = {
    debug(...args) {
      if (!isDebug())
        return;
      emitConsole("log", args);
    },
    info(...args) {
      emitConsole("info", args);
    },
    warn(...args) {
      emitConsole("warn", args);
    },
    error(...args) {
      emitConsole("error", args);
    },
    setDebug,
    isDebug,
    setMuteNonDebug
  };
  const NAMESPACE_ROOT = "UNI_STAT_DATA";
  const LEGACY_NAMESPACE_ROOT = "$$STAT__DBDATA";
  const cache = /* @__PURE__ */ new Map();
  const knownKeys = /* @__PURE__ */ new Set();
  function fullKey(key) {
    const appid2 = "__UNI__137BD60";
    return `${NAMESPACE_ROOT}:${appid2}:${key}`;
  }
  function getUni$a() {
    const raw = resolveUniRuntime();
    const u = raw != null && typeof raw === "object" ? raw : void 0;
    if (!u || typeof u.getStorageSync !== "function") {
      throw new Error("[uni统计 2.0] uni storage API is not available");
    }
    return u;
  }
  function get(key) {
    const fk = fullKey(key);
    if (cache.has(fk))
      return cache.get(fk);
    try {
      const raw = getUni$a().getStorageSync(fk);
      if (raw === "" || raw === null || raw === void 0) {
        cache.set(fk, void 0);
        return void 0;
      }
      cache.set(fk, raw);
      knownKeys.add(fk);
      return raw;
    } catch (_a) {
      return void 0;
    }
  }
  function safeRead(key) {
    const fk = fullKey(key);
    if (cache.has(fk))
      return { ok: true, value: cache.get(fk) };
    try {
      const raw = getUni$a().getStorageSync(fk);
      if (raw === "" || raw === null || raw === void 0) {
        cache.set(fk, void 0);
        return { ok: true, value: void 0 };
      }
      cache.set(fk, raw);
      knownKeys.add(fk);
      return { ok: true, value: raw };
    } catch (_a) {
      return { ok: false, value: void 0 };
    }
  }
  function set(key, value) {
    const fk = fullKey(key);
    if (value === void 0) {
      remove(key);
      return;
    }
    cache.set(fk, value);
    knownKeys.add(fk);
    try {
      getUni$a().setStorageSync(fk, value);
    } catch (_a) {
    }
  }
  function remove(key) {
    const fk = fullKey(key);
    cache.set(fk, void 0);
    try {
      getUni$a().removeStorageSync(fk);
    } catch (_a) {
    }
  }
  function batchGet(keys) {
    const out = {};
    for (const k of keys)
      out[k] = get(k);
    return out;
  }
  function batchSet(entries) {
    for (const k of Object.keys(entries))
      set(k, entries[k]);
  }
  function clearNamespace() {
    let uni2;
    try {
      uni2 = getUni$a();
    } catch (_a) {
    }
    for (const fk of Array.from(knownKeys)) {
      try {
        uni2 === null || uni2 === void 0 ? void 0 : uni2.removeStorageSync(fk);
      } catch (_b) {
      }
      cache.set(fk, void 0);
    }
    knownKeys.clear();
  }
  function __resetCache() {
    cache.clear();
    knownKeys.clear();
  }
  const storage = {
    get,
    set,
    remove,
    safeRead,
    batchGet,
    batchSet,
    clearNamespace,
    __resetCache
  };
  const KEY_FVTS = "visit:fvts";
  const KEY_LVTS = "visit:lvts";
  const KEY_TVC = "visit:tvc";
  const EMPTY_SNAPSHOT = {
    fvts: 0,
    lvts: 0,
    tvc: 0,
    isNewUser: true,
    degraded: false
  };
  let loaded = null;
  let pending = null;
  let pendingRenewal = null;
  let committed = null;
  let lastBuilt = null;
  let buildCalledInProcess = false;
  function toNum(v) {
    if (typeof v === "number" && Number.isFinite(v) && v >= 0)
      return v;
    if (typeof v === "string" && v.length > 0) {
      const n2 = Number(v);
      if (Number.isFinite(n2) && n2 >= 0)
        return n2;
    }
    return 0;
  }
  function isLikelyFreshDevice(snap) {
    return snap.fvts === 0 && snap.lvts === 0 && snap.tvc === 0;
  }
  function isTrustworthyNewUser(snap) {
    if (!snap.isNewUser)
      return false;
    return !snap.degraded || isLikelyFreshDevice(snap);
  }
  function loadVisitSnapshot() {
    const fvtsR = storage.safeRead(KEY_FVTS);
    const lvtsR = storage.safeRead(KEY_LVTS);
    const tvcR = storage.safeRead(KEY_TVC);
    const degraded = !fvtsR.ok || !lvtsR.ok || !tvcR.ok;
    const fvts = toNum(fvtsR.value);
    const lvts = toNum(lvtsR.value);
    const tvc = toNum(tvcR.value);
    const snapshot = {
      fvts,
      lvts,
      tvc,
      isNewUser: lvts === 0,
      degraded
    };
    if (degraded) {
      const likelyFresh = fvts === 0 && lvts === 0 && tvc === 0 && snapshot.isNewUser;
      if (!likelyFresh) {
        logger.warn("[uni统计 2.0] visit snapshot degraded; some storage keys read failed");
      }
    }
    loaded = snapshot;
    return snapshot;
  }
  function ensureLoaded() {
    if (!loaded)
      loaded = EMPTY_SNAPSHOT;
    return loaded;
  }
  function persistNewUserBaseline(now) {
    storage.set(KEY_FVTS, now);
    storage.set(KEY_LVTS, now);
    storage.set(KEY_TVC, 1);
    const baseline = {
      fvts: now,
      lvts: now,
      tvc: 1,
      isNewUser: false,
      degraded: false
    };
    loaded = baseline;
    committed = baseline;
  }
  function buildVisitFields(now) {
    const snap = ensureLoaded();
    if (buildCalledInProcess && lastBuilt) {
      logger.warn("[uni统计 2.0] buildVisitFields() called twice in same process; returning cached fields");
      return Object.assign({}, lastBuilt);
    }
    buildCalledInProcess = true;
    if (isTrustworthyNewUser(snap)) {
      pending = { fvts: now, lvts: 0, tvc: 1, now };
      persistNewUserBaseline(now);
    } else if (snap.isNewUser) {
      logger.warn("[uni统计 2.0] visit degraded: lvts 读取失败但检测到历史数据，按老用户处理以避免新增虚高");
      const fvts = snap.fvts > 0 ? snap.fvts : now;
      pending = { fvts, lvts: fvts, tvc: snap.tvc + 1, now };
    } else {
      pending = {
        fvts: snap.fvts,
        lvts: snap.lvts,
        tvc: snap.tvc + 1,
        now
      };
    }
    lastBuilt = { fvts: pending.fvts, lvts: pending.lvts, tvc: pending.tvc };
    return Object.assign({}, lastBuilt);
  }
  function buildVisitFieldsForSessionRenewal(now) {
    let fvts;
    let lvts;
    let tvc;
    if (committed) {
      fvts = committed.fvts;
      lvts = committed.lvts;
      tvc = committed.tvc + 1;
    } else if (lastBuilt) {
      fvts = lastBuilt.fvts;
      lvts = lastBuilt.lvts !== 0 ? lastBuilt.lvts : lastBuilt.fvts;
      tvc = lastBuilt.tvc;
    } else {
      const snap = ensureLoaded();
      if (isTrustworthyNewUser(snap)) {
        fvts = now;
        lvts = 0;
        tvc = 1;
        persistNewUserBaseline(now);
      } else if (snap.isNewUser) {
        fvts = snap.fvts > 0 ? snap.fvts : now;
        lvts = fvts;
        tvc = snap.tvc + 1;
      } else {
        fvts = snap.fvts;
        lvts = snap.lvts;
        tvc = snap.tvc + 1;
      }
    }
    pendingRenewal = { fvts, lvts, tvc, now };
    return { fvts, lvts, tvc };
  }
  function commitVisitOnAck(now) {
    if (pending) {
      const snap = ensureLoaded();
      const newFvts2 = snap.fvts === 0 ? now : snap.fvts;
      const newLvts2 = now;
      const newTvc2 = pending.tvc;
      storage.set(KEY_FVTS, newFvts2);
      storage.set(KEY_LVTS, newLvts2);
      storage.set(KEY_TVC, newTvc2);
      committed = {
        fvts: newFvts2,
        lvts: newLvts2,
        tvc: newTvc2,
        isNewUser: false,
        degraded: false
      };
      loaded = committed;
      pending = null;
      return;
    }
    if (!pendingRenewal)
      return;
    const newFvts = pendingRenewal.fvts;
    const newLvts = now;
    const newTvc = pendingRenewal.tvc;
    storage.set(KEY_FVTS, newFvts);
    storage.set(KEY_LVTS, newLvts);
    storage.set(KEY_TVC, newTvc);
    committed = {
      fvts: newFvts,
      lvts: newLvts,
      tvc: newTvc,
      isNewUser: false,
      degraded: false
    };
    loaded = committed;
    pendingRenewal = null;
  }
  function rollbackPendingVisit() {
    pending = null;
    pendingRenewal = null;
  }
  const KEY_ENTRY = "session:entryRoute";
  let cached$3;
  let entryDeparted = false;
  function markEntryPage(route) {
    if (!route)
      return;
    const existing = getEntryRoute();
    if (existing)
      return;
    storage.set(KEY_ENTRY, route);
    cached$3 = route;
  }
  function getEntryRoute() {
    if (cached$3 !== void 0)
      return cached$3 || void 0;
    const r = storage.safeRead(KEY_ENTRY);
    if (!r.ok)
      return void 0;
    if (typeof r.value === "string" && r.value.length > 0) {
      cached$3 = r.value;
      return r.value;
    }
    cached$3 = "";
    return void 0;
  }
  function isEntry(route) {
    if (!route)
      return false;
    const entry = getEntryRoute();
    return entry === route;
  }
  function isEntryForIey(route) {
    if (entryDeparted)
      return false;
    return isEntry(route);
  }
  function markEntryDeparted() {
    entryDeparted = true;
  }
  function clearEntry() {
    cached$3 = "";
    entryDeparted = false;
    storage.remove(KEY_ENTRY);
  }
  let titleMapCache;
  function getVue3TitleMap() {
    if (titleMapCache)
      return titleMapCache;
    titleMapCache = {};
    try {
      const raw = '{"pages/welcome/welcome":"欢迎","pages/login/login":"登录","pages/home/home":"同学录","pages/classmate/detail":"同学档案","pages/music/music":"音乐","pages/contribute/contribute":"音乐投稿","pages/me/me":"我的","pages/links/links":"可用链接","pages/about/about":"关于","pages/admin/admin":"管理","pages/sponsor/sponsor":"赞助与支持","pages/scan/scan":"扫码登录","pages/chat/chat":"消息","pages/chat/conversation":"聊天"}';
      if (typeof raw !== "string" || !raw)
        ;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        titleMapCache = parsed;
      }
    } catch (_a) {
      titleMapCache = {};
    }
    return titleMapCache;
  }
  function getTitleMap() {
    let map = {};
    map = getVue3TitleMap();
    return map;
  }
  function getPagesJsonNavigationTitle(routePath) {
    if (!routePath || typeof routePath !== "string")
      return "";
    const pathOnly = routePath.split("?")[0].trim();
    if (!pathOnly)
      return "";
    const map = getTitleMap();
    let result = "";
    const keys = [pathOnly];
    if (pathOnly.startsWith("/")) {
      keys.push(pathOnly.slice(1));
    } else {
      keys.push(`/${pathOnly}`);
    }
    for (const k of keys) {
      const v = map[k];
      if (typeof v === "string" && v.length > 0) {
        result = v;
        break;
      }
    }
    return result;
  }
  const state$2 = { page: "", config: "", report: "" };
  function setPageTitle(title) {
    state$2.page = typeof title === "string" ? title : "";
  }
  function setConfigTitle(title) {
    state$2.config = typeof title === "string" ? title : "";
  }
  function setReportTitle(title) {
    state$2.report = typeof title === "string" ? title : "";
  }
  function getCurrentTitle() {
    return { ttn: state$2.page, ttpj: state$2.config, ttc: state$2.report };
  }
  function clearPageTitle() {
    state$2.page = "";
  }
  function nowMs() {
    return Date.now();
  }
  function nowSec() {
    return Math.floor(Date.now() / 1e3);
  }
  function clampUrlrefStaySec(deltaSec) {
    const d = deltaSec > 0 ? deltaSec : 0;
    return d < 1 ? 1 : d;
  }
  function normalizeStatOsP(info) {
    var _a, _b, _c, _d, _e;
    const fromToken = (raw) => {
      const s2 = raw.toLowerCase().trim();
      if (!s2)
        return "";
      if (s2 === "devtools")
        return "";
      if (s2 === "android")
        return "android";
      if (s2 === "ios" || s2 === "iphone")
        return "ios";
      if (s2.includes("android"))
        return "android";
      if (s2.includes("iphone") || s2 === "iphone os" || /\bios\b/.test(s2))
        return "ios";
      if (s2.includes("harmony") || s2 === "ohos" || s2 === "openharmony")
        return "harmonyos";
      if (s2.includes("windows") || s2 === "windows_nt")
        return "windows";
      if (s2 === "mac" || s2 === "darwin" || s2.includes("mac os") || s2 === "macos")
        return "macos";
      if (s2.includes("linux") && !s2.includes("android"))
        return "linux";
      return "";
    };
    const p0 = fromToken((_a = info.platform) !== null && _a !== void 0 ? _a : "");
    if (p0)
      return p0;
    const p1 = fromToken((_b = info.osName) !== null && _b !== void 0 ? _b : "");
    if (p1)
      return p1;
    const sys = ((_c = info.system) !== null && _c !== void 0 ? _c : "").toLowerCase();
    if (sys.includes("android"))
      return "android";
    if (sys.includes("iphone") || /\bios\b/.test(sys))
      return "ios";
    if (sys.includes("harmony") || sys.includes("ohos"))
      return "harmonyos";
    if (sys.includes("windows"))
      return "windows";
    if (sys.includes("mac os") || sys.includes("darwin"))
      return "macos";
    if (sys.includes("linux"))
      return "linux";
    const plus2 = getGlobalObject().plus;
    const p2 = fromToken((_e = (_d = plus2 === null || plus2 === void 0 ? void 0 : plus2.os) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : "");
    if (p2)
      return p2;
    return "";
  }
  function uniPlatformMpAliRaw() {
    const parts = ["y", "a", "p", "mp-ali"];
    return [...parts].reverse().join("");
  }
  const PLATFORM_MAP = {
    app: "n",
    "app-plus": "n",
    "app-harmony": "n",
    "mp-harmony": "mhm",
    h5: "h5",
    "mp-weixin": "wx",
    [uniPlatformMpAliRaw()]: "ali",
    "mp-baidu": "bd",
    "mp-toutiao": "tt",
    "mp-qq": "qq",
    "mp-kuaishou": "ks",
    "mp-lark": "lark",
    "mp-xhs": "xhs",
    "mp-jd": "jd",
    "quickapp-native": "qn",
    "quickapp-webview": "qw"
  };
  function getRawPlatform() {
    var _a;
    return (_a = "app") !== null && _a !== void 0 ? _a : "";
  }
  function getPlatform() {
    var _a;
    const raw = getRawPlatform();
    const mapped = PLATFORM_MAP[raw];
    if (!mapped)
      return "unknown";
    if (mapped === "ali") {
      const my = getGlobalObject().my;
      if (((_a = my === null || my === void 0 ? void 0 : my.env) === null || _a === void 0 ? void 0 : _a.clientName) === "dingtalk")
        return "dt";
      return "ali";
    }
    return mapped;
  }
  function isApp() {
    const raw = getRawPlatform();
    return raw === "app" || raw === "app-plus" || raw === "app-harmony";
  }
  function isMp() {
    return getRawPlatform().startsWith("mp-");
  }
  function isH5() {
    return getRawPlatform() === "h5";
  }
  function isNvue() {
    return Boolean(getGlobalObject().__NVUE__);
  }
  const STORAGE_KEY_UUID = "device:uuid";
  const WEB_UUID_KEY = "__DC_STAT_UUID";
  let cachedUuid = null;
  function preferGetDeviceInfoDeviceIdFirst() {
    if (isApp() || isH5())
      return true;
    return getRawPlatform() === "mp-weixin";
  }
  function readSysDeviceId() {
    const root = resolveUniRuntime();
    const u = root != null && typeof root === "object" ? root : void 0;
    if (!u || typeof u.getSystemInfoSync !== "function")
      return "";
    return tryRun(() => {
      var _a;
      return (_a = u.getSystemInfoSync().deviceId) !== null && _a !== void 0 ? _a : "";
    }, "");
  }
  function readGetDeviceInfoDeviceId() {
    const root = resolveUniRuntime();
    const u = root != null && typeof root === "object" ? root : void 0;
    if (!u || typeof u.getDeviceInfo !== "function")
      return "";
    return tryRun(() => {
      var _a;
      return (_a = u.getDeviceInfo().deviceId) !== null && _a !== void 0 ? _a : "";
    }, "");
  }
  function generateAnonUuid() {
    const ms = nowMs();
    const rnd = Math.floor(Math.random() * 1e6).toString().padStart(6, "0");
    return `${ms}${rnd}`;
  }
  function persistUuid(uuid) {
    tryRun(() => storage.set(STORAGE_KEY_UUID, uuid), void 0);
  }
  function getWebLocalStorage() {
    return tryRun(() => {
      const g = getGlobalObject();
      if (g.navigator && g.navigator.cookieEnabled === false)
        return void 0;
      const ls = g.localStorage;
      if (ls && typeof ls.getItem === "function" && typeof ls.setItem === "function") {
        return ls;
      }
      return void 0;
    }, void 0);
  }
  function readWebDeviceId() {
    const ls = getWebLocalStorage();
    if (!ls)
      return "";
    return tryRun(() => {
      const v = ls.getItem(WEB_UUID_KEY);
      return typeof v === "string" ? v : "";
    }, "");
  }
  function writeWebDeviceId(uuid) {
    const ls = getWebLocalStorage();
    if (!ls)
      return;
    tryRun(() => ls.setItem(WEB_UUID_KEY, uuid), void 0);
  }
  function resolveDeviceIdFromUni() {
    if (preferGetDeviceInfoDeviceIdFirst()) {
      const fromDeviceInfo = readGetDeviceInfoDeviceId();
      if (fromDeviceInfo)
        return fromDeviceInfo;
    }
    return readSysDeviceId();
  }
  function getUuid() {
    if (cachedUuid)
      return cachedUuid;
    if (isH5()) {
      const fromWeb = readWebDeviceId();
      if (fromWeb) {
        cachedUuid = fromWeb;
        return cachedUuid;
      }
    }
    const fromDevice = resolveDeviceIdFromUni();
    if (fromDevice) {
      persistUuid(fromDevice);
      if (isH5())
        writeWebDeviceId(fromDevice);
      cachedUuid = fromDevice;
      return cachedUuid;
    }
    const storedRead = storage.safeRead(STORAGE_KEY_UUID);
    if (storedRead.ok) {
      const stored = storedRead.value;
      if (typeof stored === "string" && stored.length > 0) {
        if (stored.startsWith("device-anon-")) {
          const upgraded = generateAnonUuid();
          persistUuid(upgraded);
          if (isH5())
            writeWebDeviceId(upgraded);
          cachedUuid = upgraded;
          return cachedUuid;
        }
        cachedUuid = stored;
        return cachedUuid;
      }
      const generated = generateAnonUuid();
      persistUuid(generated);
      if (isH5())
        writeWebDeviceId(generated);
      cachedUuid = generated;
      return cachedUuid;
    }
    const ephemeral = generateAnonUuid();
    if (isH5()) {
      writeWebDeviceId(ephemeral);
      cachedUuid = ephemeral;
      return cachedUuid;
    }
    return ephemeral;
  }
  const SUFFIX_HEAD_LEN = 8;
  const SUFFIX_TAIL_LEN = 4;
  function randomPart(len) {
    const r = Math.random().toString(36).slice(2, 2 + len);
    return r.length >= len ? r : r.padEnd(len, "0");
  }
  function sessionInstanceSuffix() {
    return `${randomPart(SUFFIX_HEAD_LEN)}-${randomPart(SUFFIX_TAIL_LEN)}`;
  }
  function anonNumericBody() {
    const ms = nowMs();
    const rnd = Math.floor(Math.random() * 1e6).toString().padStart(6, "0");
    return `${ms}${rnd}`;
  }
  function genSid(uuid) {
    if (uuid && uuid.length > 0) {
      return `${uuid}-${sessionInstanceSuffix()}`;
    }
    return `${anonNumericBody()}-${sessionInstanceSuffix()}`;
  }
  const KEY_SID = "session:id";
  const KEY_SST = "session:start";
  const KEY_SCT = "session:sct";
  const KEY_SEQ = "session:seq";
  const KEY_LAST_ACTIVE = "session:lastActive";
  const KEY_BG_TS = "session:bgTs";
  const KEY_LAST_SCENE = "session:lastScene";
  const DEFAULT_CONFIG = {
    backgroundTimeoutSec: 300,
    pageInactiveTimeoutSec: 1800
  };
  let config$1 = Object.assign({}, DEFAULT_CONFIG);
  let cached$2 = null;
  function configure$1(c) {
    config$1 = Object.assign({}, DEFAULT_CONFIG, c);
  }
  function readNum(key) {
    const r = storage.safeRead(key);
    if (!r.ok)
      return 0;
    const v = r.value;
    if (typeof v === "number" && Number.isFinite(v) && v >= 0)
      return v;
    if (typeof v === "string" && v.length > 0) {
      const n2 = Number(v);
      if (Number.isFinite(n2) && n2 >= 0)
        return n2;
    }
    return 0;
  }
  function readStr(key) {
    const r = storage.safeRead(key);
    if (!r.ok)
      return "";
    return typeof r.value === "string" ? r.value : "";
  }
  function elapsedNonNeg(now, from) {
    const diff = now - from;
    return diff > 0 ? diff : 0;
  }
  function loadFromStorage() {
    const sid = readStr(KEY_SID);
    if (!sid)
      return null;
    return {
      sid,
      sst: readNum(KEY_SST),
      sct: readNum(KEY_SCT) || CST.ColdLaunch,
      seq: readNum(KEY_SEQ),
      lastActive: readNum(KEY_LAST_ACTIVE),
      bgTs: readNum(KEY_BG_TS),
      lastScene: readStr(KEY_LAST_SCENE)
    };
  }
  function ensureCache() {
    if (cached$2 !== null)
      return cached$2;
    cached$2 = loadFromStorage();
    return cached$2;
  }
  function createNew(now, sct, scene) {
    const sid = genSid(getUuid());
    const next = {
      sid,
      sst: now,
      sct,
      seq: 0,
      lastActive: now,
      bgTs: 0,
      lastScene: scene
    };
    storage.set(KEY_SID, sid);
    storage.set(KEY_SST, now);
    storage.set(KEY_SCT, sct);
    storage.set(KEY_SEQ, 0);
    storage.set(KEY_LAST_ACTIVE, now);
    storage.set(KEY_BG_TS, 0);
    storage.set(KEY_LAST_SCENE, scene);
    cached$2 = next;
    return next;
  }
  function ensureSession(t, ctx) {
    const { now, scene = "" } = ctx;
    const snap = ensureCache();
    if (t === "cold_launch") {
      const created = createNew(now, CST.ColdLaunch, scene);
      return { snapshot: created, isNew: true, cst: CST.ColdLaunch };
    }
    if (!snap) {
      const created = createNew(now, CST.ColdLaunch, scene);
      return { snapshot: created, isNew: true, cst: CST.ColdLaunch };
    }
    if (t === "app_show") {
      const enterCandidates = [];
      if (ctx.backgroundEnteredAt && ctx.backgroundEnteredAt > 0) {
        enterCandidates.push(ctx.backgroundEnteredAt);
      }
      if (snap.bgTs > 0) {
        enterCandidates.push(snap.bgTs);
      }
      const enterTs = enterCandidates.length > 0 ? Math.min(...enterCandidates) : 0;
      const elapsed2 = enterTs > 0 ? elapsedNonNeg(now, enterTs) : elapsedNonNeg(now, snap.lastActive);
      const sceneChanged = !!scene && !!snap.lastScene && scene !== snap.lastScene;
      const fromBackground = enterTs > 0;
      if (sceneChanged || fromBackground && elapsed2 >= config$1.backgroundTimeoutSec) {
        const created = createNew(now, CST.BackgroundTimeout, scene);
        return { snapshot: created, isNew: true, cst: CST.BackgroundTimeout };
      }
      touch(now);
      storage.set(KEY_BG_TS, 0);
      if (cached$2)
        cached$2.bgTs = 0;
      return { snapshot: cached$2, isNew: false, cst: 0 };
    }
    if (t === "wx_scene_changed") {
      if (scene && scene !== snap.lastScene) {
        const created = createNew(now, CST.BackgroundTimeout, scene);
        return { snapshot: created, isNew: true, cst: CST.BackgroundTimeout };
      }
      return { snapshot: snap, isNew: false, cst: 0 };
    }
    const elapsed = elapsedNonNeg(now, snap.lastActive);
    if (elapsed >= config$1.pageInactiveTimeoutSec) {
      const created = createNew(now, CST.PageInactiveTimeout, scene || snap.lastScene);
      return { snapshot: created, isNew: true, cst: CST.PageInactiveTimeout };
    }
    touch(now);
    return { snapshot: cached$2, isNew: false, cst: 0 };
  }
  function markBackground(now) {
    if (!cached$2)
      cached$2 = loadFromStorage();
    if (!cached$2)
      return;
    storage.set(KEY_BG_TS, now);
    cached$2.bgTs = now;
  }
  function touch(now) {
    if (!cached$2)
      cached$2 = loadFromStorage();
    if (!cached$2)
      return;
    storage.set(KEY_LAST_ACTIVE, now);
    cached$2.lastActive = now;
  }
  function nextSeq() {
    if (!cached$2)
      cached$2 = loadFromStorage();
    if (!cached$2)
      return 0;
    const next = cached$2.seq + 1;
    cached$2.seq = next;
    storage.set(KEY_SEQ, next);
    return next;
  }
  function getSnapshot() {
    return ensureCache();
  }
  function syncLastScene(scene) {
    if (!scene)
      return;
    if (!cached$2)
      cached$2 = loadFromStorage();
    if (!cached$2)
      return;
    storage.set(KEY_LAST_SCENE, scene);
    cached$2.lastScene = scene;
  }
  function getPageVmType(vm) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (!vm)
      return null;
    const internalMpType = (_c = (_b = (_a = vm.$) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.mpType) !== null && _c !== void 0 ? _c : (_d = vm.type) === null || _d === void 0 ? void 0 : _d.mpType;
    if (vm.mpType === "page" || vm.$mpType === "page" || ((_e = vm.$mp) === null || _e === void 0 ? void 0 : _e.mpType) === "page" || ((_f = vm.$options) === null || _f === void 0 ? void 0 : _f.mpType) === "page" || internalMpType === "page") {
      return "page";
    }
    if (vm.mpType === "app" || vm.$mpType === "app" || ((_g = vm.$mp) === null || _g === void 0 ? void 0 : _g.mpType) === "app" || ((_h = vm.$options) === null || _h === void 0 ? void 0 : _h.mpType) === "app" || internalMpType === "app") {
      return "app";
    }
    return null;
  }
  function getTopPageVm() {
    var _a;
    const fn = getGlobalObject().getCurrentPages;
    if (typeof fn !== "function")
      return void 0;
    const pages = tryRun(() => fn(), []) || [];
    if (!Array.isArray(pages) || pages.length === 0)
      return void 0;
    const top = pages[pages.length - 1];
    return (_a = top === null || top === void 0 ? void 0 : top.$vm) !== null && _a !== void 0 ? _a : top;
  }
  function getCurrentRoute(pageVm) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const vm = pageVm !== null && pageVm !== void 0 ? pageVm : getTopPageVm();
    if (!vm)
      return "";
    if (getPlatform() === "bd") {
      const r = (_e = (_c = (_b = (_a = vm.$mp) === null || _a === void 0 ? void 0 : _a.page) === null || _b === void 0 ? void 0 : _b.is) !== null && _c !== void 0 ? _c : (_d = vm.$scope) === null || _d === void 0 ? void 0 : _d.is) !== null && _e !== void 0 ? _e : "";
      if (r)
        return r;
    }
    return (_l = (_h = (_f = vm.route) !== null && _f !== void 0 ? _f : (_g = vm.$scope) === null || _g === void 0 ? void 0 : _g.route) !== null && _h !== void 0 ? _h : (_k = (_j = vm.$mp) === null || _j === void 0 ? void 0 : _j.page) === null || _k === void 0 ? void 0 : _k.route) !== null && _l !== void 0 ? _l : "";
  }
  function getCurrentRouteWithQuery(pageVm) {
    var _a, _b;
    const vm = pageVm !== null && pageVm !== void 0 ? pageVm : getTopPageVm();
    if (!vm)
      return "";
    const page = (_a = vm.$page) !== null && _a !== void 0 ? _a : (_b = vm.$scope) === null || _b === void 0 ? void 0 : _b.$page;
    if (page) {
      if (page.fullPath && page.fullPath !== "/")
        return page.fullPath;
      if (page.route)
        return page.route;
    }
    return getCurrentRoute(vm);
  }
  function getUni$9() {
    const u = resolveUniRuntime();
    return u != null && typeof u === "object" ? u : void 0;
  }
  function getLaunchScene(override) {
    if (override !== void 0 && override !== null && override !== "") {
      return String(override);
    }
    const u = getUni$9();
    if (typeof (u === null || u === void 0 ? void 0 : u.getLaunchOptionsSync) !== "function")
      return "";
    if (!isMp())
      return "";
    return tryRun(() => {
      const opts = u.getLaunchOptionsSync();
      const scene = opts === null || opts === void 0 ? void 0 : opts.scene;
      return scene === void 0 || scene === null ? "" : String(scene);
    }, "");
  }
  function getUni$8() {
    const u = resolveUniRuntime();
    return u != null && typeof u === "object" ? u : void 0;
  }
  function getPushClientId(opts = {}) {
    const { enabled = false, timeoutMs = 3e3 } = opts;
    return new Promise((resolve) => {
      if (!enabled) {
        resolve({ ok: false, cid: "", reason: "disabled" });
        return;
      }
      const u = getUni$8();
      if (!u || typeof u.getPushClientId !== "function") {
        resolve({ ok: false, cid: "", reason: "unsupported" });
        return;
      }
      let settled = false;
      const finish = (r) => {
        if (settled)
          return;
        settled = true;
        resolve(r);
      };
      const timer = setTimeout(() => finish({ ok: false, cid: "", reason: "timeout" }), timeoutMs);
      tryRun(() => u.getPushClientId({
        success: (res) => {
          clearTimeout(timer);
          const cid = typeof (res === null || res === void 0 ? void 0 : res.cid) === "string" ? res.cid : "";
          if (!cid) {
            finish({ ok: false, cid: "", reason: "fail" });
            return;
          }
          finish({ ok: true, cid });
        },
        fail: () => {
          clearTimeout(timer);
          finish({ ok: false, cid: "", reason: "fail" });
        }
      }), void 0);
    });
  }
  const EMPTY_TITLE_SNAP = { ttn: "", ttpj: "", ttc: "" };
  const state$1 = {
    lastRoute: "",
    lastRouteFull: "",
    beforeLastRoute: "",
    beforeLastRouteFull: "",
    lastRouteEnterTime: 0,
    lastPageTitleSnap: Object.assign({}, EMPTY_TITLE_SNAP),
    lastIey: false,
    prevIey: false,
    isHide: false,
    wasBackgrounded: false,
    pendingBackgroundResume: false,
    backgroundEnteredAt: 0,
    suppressNextPageLogAfterResume: false,
    backgroundResumeLt1At: 0
  };
  const BACKGROUND_RESUME_DEBOUNCE_SEC = 1;
  const BACKGROUND_RESUME_LT1_DEDUP_SEC = 3;
  const PAGE_APP_HIDE_DEFER_MS = 120;
  let pageAppHideDeferTimer;
  function shouldEarlyConsumeBackgroundResumeInMixin() {
    return !shouldBindUniAppLifecycle();
  }
  function markBackgroundResumeLt1Emitted(now) {
    state$1.backgroundResumeLt1At = now;
  }
  function shouldSkipDuplicateBackgroundResumeLt1(now) {
    return state$1.backgroundResumeLt1At > 0 && now - state$1.backgroundResumeLt1At <= BACKGROUND_RESUME_LT1_DEDUP_SEC;
  }
  function cancelPageAppHideDefer() {
    if (pageAppHideDeferTimer !== void 0) {
      clearTimeout(pageAppHideDeferTimer);
      pageAppHideDeferTimer = void 0;
    }
  }
  function tryAppHideFromPageOnHideWhenH5Hidden(app, opts) {
    var _a;
    if (!isH5())
      return;
    if (state$1.pendingBackgroundResume)
      return;
    const vis = (_a = globalThis.document) === null || _a === void 0 ? void 0 : _a.visibilityState;
    if (vis === "hidden") {
      handleAppHide(app, opts);
    }
  }
  function tryAppHideFromPageOnHideWhenMpDefer(app, opts) {
    if (isH5())
      return;
    if (state$1.pendingBackgroundResume)
      return;
    cancelPageAppHideDefer();
    pageAppHideDeferTimer = setTimeout(() => {
      pageAppHideDeferTimer = void 0;
      if (state$1.pendingBackgroundResume)
        return;
      handleAppHide(app, opts);
    }, PAGE_APP_HIDE_DEFER_MS);
  }
  function tryVue3AppHideFromPageOnHide(app, opts) {
    if (state$1.pendingBackgroundResume)
      return;
    if (isH5()) {
      tryAppHideFromPageOnHideWhenH5Hidden(app, opts);
      return;
    }
    tryAppHideFromPageOnHideWhenMpDefer(app, opts);
  }
  function safeCollector(app) {
    return app.getCollector();
  }
  function normalizePathForEntryMark(raw) {
    var _a;
    if (!raw || typeof raw !== "string")
      return "";
    const noQuery = (_a = raw.split("?")[0]) !== null && _a !== void 0 ? _a : "";
    return noQuery.startsWith("/") ? noQuery.slice(1) : noQuery;
  }
  function reportNewSession(c, _cst, scene, now, attachVisit, url = "") {
    let visit;
    if (attachVisit && !firstVisitEmittedInProcess) {
      firstVisitEmittedInProcess = true;
      visit = tryRun(() => buildVisitFields(now), void 0);
    } else {
      visit = tryRun(() => buildVisitFieldsForSessionRenewal(now), void 0);
    }
    const payload = {
      lt: LT.Launch,
      t: now,
      sc: scene,
      visit
    };
    if (url)
      payload.url = url;
    c.report(payload);
  }
  let firstVisitEmittedInProcess = false;
  let titleSnapGeneration = 0;
  function scheduleDeferredTitleSnapshot() {
    const gen = titleSnapGeneration;
    const run = typeof queueMicrotask === "function" ? queueMicrotask : (fn) => {
      void Promise.resolve().then(fn);
    };
    run(() => {
      tryRun(() => {
        if (gen !== titleSnapGeneration)
          return;
        state$1.lastPageTitleSnap = Object.assign({}, getCurrentTitle());
      }, void 0);
    });
  }
  function handleLaunch(app, options = {}, opts = {}) {
    const c = safeCollector(app);
    if (!c)
      return;
    const now = nowSec();
    const scene = tryRun(() => getLaunchScene(options.scene), "");
    const result = tryRun(() => ensureSession("cold_launch", { now, scene }), null);
    if (!result)
      return;
    tryRun(() => clearEntry(), void 0);
    const url = options.path || "";
    const entryKey = normalizePathForEntryMark(url);
    if (entryKey) {
      tryRun(() => markEntryPage(entryKey), void 0);
    }
    reportNewSession(c, result.cst || CST.ColdLaunch, scene, now, true, url);
    if (opts.enablePush) {
      void getPushClientId({ enabled: true, timeoutMs: opts.pushTimeoutMs }).then((r) => {
        if (!r.ok || !r.cid)
          return;
        const c2 = safeCollector(app);
        if (!c2)
          return;
        c2.report({ lt: LT.Push, cid: r.cid, t: nowSec() });
      }).catch((e) => logger.warn("[uni统计 2.0] push cid fetch failed", e));
    }
  }
  function tryConsumeBackgroundResume(app, options = {}, _opts = {}, _from = "unknown") {
    if (!state$1.pendingBackgroundResume) {
      return false;
    }
    const bgEnterAt = state$1.backgroundEnteredAt;
    if (bgEnterAt <= 0) {
      return false;
    }
    const c = safeCollector(app);
    if (!c) {
      return false;
    }
    const now = nowSec();
    const elapsed = now - bgEnterAt;
    if (elapsed < BACKGROUND_RESUME_DEBOUNCE_SEC) {
      state$1.suppressNextPageLogAfterResume = true;
      return true;
    }
    state$1.wasBackgrounded = false;
    state$1.suppressNextPageLogAfterResume = true;
    state$1.lastRouteEnterTime = now;
    const scene = tryRun(() => getLaunchScene(options.scene), "");
    const result = tryRun(() => ensureSession("app_show", {
      now,
      scene,
      backgroundEnteredAt: bgEnterAt
    }), null);
    state$1.pendingBackgroundResume = false;
    state$1.backgroundEnteredAt = 0;
    if (!result || !result.isNew) {
      return true;
    }
    tryRun(() => clearEntry(), void 0);
    const url = options.path || state$1.lastRoute || "";
    const entryKey = normalizePathForEntryMark(url);
    if (entryKey) {
      tryRun(() => markEntryPage(entryKey), void 0);
    }
    reportNewSession(c, result.cst || CST.BackgroundTimeout, scene, now, false, url);
    markBackgroundResumeLt1Emitted(now);
    void c.flush(true).catch((e) => logger.warn("[uni统计 2.0] flush after new session (app_show) failed", e));
    return true;
  }
  function handleAppShow(app, options = {}, opts = {}) {
    if (tryConsumeBackgroundResume(app, options, opts, "handleAppShow"))
      return;
    const c = safeCollector(app);
    if (!c)
      return;
    const now = nowSec();
    const scene = tryRun(() => getLaunchScene(options.scene), "");
    if (shouldSkipDuplicateBackgroundResumeLt1(now)) {
      tryRun(() => syncLastScene(scene), void 0);
      return;
    }
    const result = tryRun(() => ensureSession("app_show", { now, scene }), null);
    if (!result || !result.isNew) {
      return;
    }
    tryRun(() => clearEntry(), void 0);
    const url = options.path || state$1.lastRoute || "";
    const entryKey = normalizePathForEntryMark(url);
    if (entryKey) {
      tryRun(() => markEntryPage(entryKey), void 0);
    }
    reportNewSession(c, result.cst || CST.BackgroundTimeout, scene, now, false, url);
    markBackgroundResumeLt1Emitted(now);
    void c.flush(true).catch((e) => logger.warn("[uni统计 2.0] flush after new session (app_show) failed", e));
  }
  function handleAppHide(app, opts = {}) {
    if (state$1.pendingBackgroundResume)
      return;
    const c = safeCollector(app);
    if (!c)
      return;
    const now = nowSec();
    state$1.wasBackgrounded = true;
    state$1.pendingBackgroundResume = true;
    state$1.backgroundEnteredAt = now;
    tryRun(() => markBackground(now), void 0);
    const deltaStay = state$1.lastRouteEnterTime > 0 ? now - state$1.lastRouteEnterTime : 0;
    const stayed = clampUrlrefStaySec(deltaStay);
    if (state$1.lastRoute && opts.enablePageLog !== false) {
      const exitedUrl = state$1.lastRouteFull || state$1.lastRoute;
      const ref = state$1.beforeLastRouteFull || state$1.beforeLastRoute || "";
      const snap = state$1.lastPageTitleSnap;
      const payload = {
        lt: LT.Page,
        t: now,
        url: exitedUrl,
        urlref_ts: stayed,
        iey: state$1.lastIey,
        ppiey: state$1.prevIey,
        ttn: snap.ttn,
        ttpj: snap.ttpj,
        ttc: snap.ttc
      };
      if (ref)
        payload.urlref = ref;
      c.report(payload);
      if (state$1.lastIey) {
        tryRun(() => markEntryDeparted(), void 0);
        state$1.lastIey = false;
      }
    }
    c.report({
      lt: LT.Hide,
      t: now,
      urlref: state$1.lastRoute,
      urlref_ts: stayed
    });
    void c.flush(true).catch((e) => logger.warn("[uni统计 2.0] flush on hide failed", e));
  }
  function handlePageShow(app, vm, opts = {}) {
    const c = safeCollector(app);
    if (!c)
      return;
    if (state$1.pendingBackgroundResume && shouldEarlyConsumeBackgroundResumeInMixin()) {
      tryConsumeBackgroundResume(app, {}, opts, "handlePageShow");
    }
    const now = nowSec();
    const route = tryRun(() => getCurrentRoute(vm), "");
    const url = tryRun(() => getCurrentRouteWithQuery(vm), "") || route;
    if (!route && !url)
      return;
    const result = tryRun(() => ensureSession("page_show", { now }), null);
    if (!result)
      return;
    tryRun(() => setReportTitle(""), void 0);
    tryRun(() => setConfigTitle(getPagesJsonNavigationTitle(route)), void 0);
    if (result.isNew) {
      tryRun(() => clearEntry(), void 0);
    }
    if (route) {
      tryRun(() => markEntryPage(route), void 0);
    }
    if (result.isNew) {
      reportNewSession(c, result.cst || CST.PageInactiveTimeout, "", now, false, url);
    }
    const shouldSuppressPageLog = state$1.suppressNextPageLogAfterResume;
    if (state$1.lastRoute && opts.enablePageLog !== false && !shouldSuppressPageLog) {
      const deltaStay = state$1.lastRouteEnterTime > 0 ? now - state$1.lastRouteEnterTime : 0;
      const stayed = clampUrlrefStaySec(deltaStay);
      const exitedUrl = state$1.lastRouteFull || state$1.lastRoute;
      const ref = state$1.beforeLastRouteFull || state$1.beforeLastRoute || "";
      const snap = state$1.lastPageTitleSnap;
      const payload = {
        lt: LT.Page,
        t: now,
        url: exitedUrl,
        urlref_ts: stayed,
        // 离开页是否入口页 / urlref 指向页是否入口页（进入新页前状态尚未被本轮覆盖）。
        iey: state$1.lastIey,
        ppiey: state$1.prevIey
      };
      if (ref)
        payload.urlref = ref;
      payload.ttn = snap.ttn;
      payload.ttpj = snap.ttpj;
      payload.ttc = snap.ttc;
      c.report(payload);
      if (state$1.lastIey) {
        tryRun(() => markEntryDeparted(), void 0);
      }
    }
    state$1.beforeLastRoute = state$1.lastRoute;
    state$1.beforeLastRouteFull = state$1.lastRouteFull;
    state$1.prevIey = state$1.lastIey;
    state$1.lastIey = !!route && tryRun(() => isEntryForIey(route), false);
    state$1.lastRoute = route;
    state$1.lastRouteFull = url;
    state$1.lastRouteEnterTime = now;
    state$1.suppressNextPageLogAfterResume = false;
    scheduleDeferredTitleSnapshot();
    state$1.isHide = false;
    if (result.isNew) {
      void c.flush(true).catch((e) => logger.warn("[uni统计 2.0] flush after new session (page_show) failed", e));
    }
  }
  function handlePageHide(app, _vm) {
    const c = safeCollector(app);
    if (!c)
      return;
    state$1.isHide = true;
    titleSnapGeneration++;
    state$1.lastPageTitleSnap = Object.assign({}, getCurrentTitle());
    tryRun(() => clearPageTitle(), void 0);
  }
  const rethrownErrors = typeof WeakSet === "function" ? /* @__PURE__ */ new WeakSet() : (
    // 极端环境降级：has=false 永不命中，add=noop；本模块只用 has/add 两个方法，
    // 其它方法（delete / [Symbol.toStringTag]）调用方不依赖，类型断言即可。
    {
      has: () => false,
      add: () => rethrownErrors
    }
  );
  function handleError(app, e) {
    const isObj = typeof e === "object" && e !== null;
    if (isObj && rethrownErrors.has(e))
      return;
    if (isObj)
      rethrownErrors.add(e);
    try {
      app.reportError(e);
    } catch (err) {
      logger.warn("[uni统计 2.0] handleError failed", err);
    }
    if (isMp()) {
      return;
    }
    tryRun(() => {
      setTimeout(() => {
        throw e;
      }, 0);
    }, void 0);
  }
  function getUni$7() {
    const u = resolveUniRuntime();
    return u != null && typeof u === "object" ? u : void 0;
  }
  function shouldMixinDispatchAppLifecycle() {
    let result = isH5() || getPlatform() === "n" || isNvue();
    result = isH5() || getPlatform() === "n" || isNvue();
    return result;
  }
  function shouldBindUniAppLifecycle() {
    let result = !isH5() && getPlatform() !== "n" && !isNvue();
    result = !isH5() && getPlatform() !== "n" && !isNvue();
    return result;
  }
  const uniAppHookRegistry = {
    showBound: false,
    hideBound: false,
    appShowCb: void 0,
    appHideCb: void 0
  };
  function tryBindUniAppLifecycle(app, opts = {}) {
    if (!shouldBindUniAppLifecycle())
      return false;
    const u = getUni$7();
    if (!u)
      return false;
    if (!uniAppHookRegistry.showBound && typeof u.onAppShow === "function") {
      uniAppHookRegistry.appShowCb = (e) => handleAppShow(app, e !== null && e !== void 0 ? e : {}, opts);
      tryRun(() => u.onAppShow(uniAppHookRegistry.appShowCb), void 0);
      uniAppHookRegistry.showBound = true;
    }
    if (!uniAppHookRegistry.hideBound && typeof u.onAppHide === "function") {
      uniAppHookRegistry.appHideCb = () => handleAppHide(app, opts);
      tryRun(() => u.onAppHide(uniAppHookRegistry.appHideCb), void 0);
      uniAppHookRegistry.hideBound = true;
    }
    return uniAppHookRegistry.showBound && uniAppHookRegistry.hideBound;
  }
  function unbindUniAppLifecycle() {
    if (!uniAppHookRegistry.showBound && !uniAppHookRegistry.hideBound)
      return;
    const cur = getUni$7();
    if (uniAppHookRegistry.showBound && uniAppHookRegistry.appShowCb && (cur === null || cur === void 0 ? void 0 : cur.offAppShow)) {
      tryRun(() => cur.offAppShow(uniAppHookRegistry.appShowCb), void 0);
    }
    if (uniAppHookRegistry.hideBound && uniAppHookRegistry.appHideCb && (cur === null || cur === void 0 ? void 0 : cur.offAppHide)) {
      tryRun(() => cur.offAppHide(uniAppHookRegistry.appHideCb), void 0);
    }
    uniAppHookRegistry.showBound = false;
    uniAppHookRegistry.hideBound = false;
    uniAppHookRegistry.appShowCb = void 0;
    uniAppHookRegistry.appHideCb = void 0;
  }
  function bindLifecycle(app, opts = {}) {
    let bound = true;
    const mixin = {
      onLaunch(options = {}) {
        handleLaunch(app, options, opts);
      },
      onLoad() {
      },
      onShow() {
        const vmType = getPageVmType(this);
        cancelPageAppHideDefer();
        if (state$1.pendingBackgroundResume && shouldEarlyConsumeBackgroundResumeInMixin()) {
          tryConsumeBackgroundResume(app, {}, opts, "mixin.onShow");
        }
        state$1.isHide = false;
        if (vmType === "page") {
          handlePageShow(app, this, opts);
        }
        if (shouldMixinDispatchAppLifecycle() && vmType === "app") {
          handleAppShow(app, {}, opts);
        }
      },
      onHide() {
        state$1.isHide = true;
        if (getPageVmType(this) === "page") {
          handlePageHide(app);
          tryVue3AppHideFromPageOnHide(app, opts);
        }
        if (shouldMixinDispatchAppLifecycle() && getPageVmType(this) === "app" && !state$1.pendingBackgroundResume) {
          handleAppHide(app, opts);
        }
      },
      onUnload() {
        if (state$1.isHide) {
          state$1.isHide = false;
          return;
        }
        handlePageHide(app);
      },
      onError(e) {
        handleError(app, e);
      }
    };
    if (shouldBindUniAppLifecycle()) {
      tryBindUniAppLifecycle(app, opts);
    }
    return {
      mixin,
      tryBindUniAppHooks: () => shouldBindUniAppLifecycle() && tryBindUniAppLifecycle(app, opts),
      unbind() {
        if (!bound)
          return;
        bound = false;
        unbindUniAppLifecycle();
      }
    };
  }
  const STAT_VERSION_PUBLIC = "5.24";
  const STAT_URL = "https://tongji.dcloud.io/uni/stat";
  const STAT_H5_URL = "https://tongji.dcloud.io/uni/stat.gif";
  const REPORT_INTERVAL_SEC = 10;
  const HTTP_MAX_RETRIES = 3;
  const CLOUD_MAX_RETRIES = 2;
  const IMAGE_MAX_RETRIES = 2;
  const RETRY_BASE_DELAY_MS = 1e3;
  const MP_WEIXIN_USE_PRELOAD_ASSETS_REPORT = true;
  const MP_WEIXIN_PRELOAD_TIMEOUT_MS = 3e4;
  const MP_WEIXIN_PRELOAD_FIRST_FLUSH_DELAY_MS = 2e3;
  const APP_CHANNEL_FIRST_FLUSH_DELAY_MS = 300;
  const SINGLE_EVENT_MAX_BYTES = 4 * 1024;
  const BATCH_REQUESTS_MAX_BYTES = 4 * 1024;
  const BATCH_MAX_EVENTS = 30;
  const QUEUE_MAX_EVENTS = 1e3;
  const RETRY_MAX_ATTEMPTS = 5;
  const IMAGE_REPORT_DEFAULTS = {
    host: "https://tongji-collector.dcloud.net.cn",
    /** 正式环境 */
    projectId: "964f0397-af5d-45bf-99d6-8fb3500d7849",
    topicId: "8563e231-f4cd-4ab0-8870-917e4b04e810"
    // 以下为历史测试环境（已停用，勿删便于回切排查）
    // projectId: '9fad19a2-b7f1-47f5-87ff-8621f545ab61',
    // topicId: '99b55c91-ed80-406e-b205-e9d18aca744d',
  };
  function getAppId$1() {
    var _a;
    return (_a = "__UNI__137BD60") !== null && _a !== void 0 ? _a : "";
  }
  function assertCloudResultOk(res) {
    if (!res || typeof res !== "object")
      return;
    const r = res;
    if (r.success === false) {
      throw new Error("cloud receiver reported success=false");
    }
    if (typeof r.errCode === "number" && r.errCode !== 0) {
      throw new Error("cloud receiver reported errCode=" + String(r.errCode));
    }
  }
  function resolveSpace(injected) {
    if (injected)
      return injected;
    const raw = resolveUniRuntime();
    const u = raw != null && typeof raw === "object" ? raw : void 0;
    return u === null || u === void 0 ? void 0 : u.__stat_uniCloud_space;
  }
  function createCloudChannel(opts = {}) {
    var _a, _b;
    const receiverName = (_a = opts.receiverName) !== null && _a !== void 0 ? _a : "uni-stat-receiver";
    const maxRetries = (_b = opts.maxRetries) !== null && _b !== void 0 ? _b : CLOUD_MAX_RETRIES;
    function getReceiver() {
      const space = resolveSpace(opts.uniCloudSpace);
      if (!space || typeof space.importObject !== "function")
        return void 0;
      try {
        return space.importObject(receiverName, { customUI: true });
      } catch (e) {
        logger.warn("[uni统计 2.0] cloud importObject threw", e);
        return void 0;
      }
    }
    function once(payload) {
      const receiver = getReceiver();
      if (!receiver || typeof receiver.report !== "function") {
        return Promise.reject(new Error("uniCloud space unavailable"));
      }
      return Promise.resolve(receiver.report(payload)).then((res) => {
        assertCloudResultOk(res);
      });
    }
    return {
      name: "2.0",
      available() {
        const space = resolveSpace(opts.uniCloudSpace);
        return !!(space && typeof space.importObject === "function");
      },
      send(payload) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            yield withRetry(() => once(payload), {
              times: maxRetries,
              baseDelayMs: RETRY_BASE_DELAY_MS,
              sleep: opts.sleep
            });
          } catch (e) {
            logger.warn("[uni统计 2.0] 统计上报失败（云函数已重试）", e);
            throw e;
          }
        });
      }
    };
  }
  function getActionLabel(lt) {
    switch (lt) {
      case LT.Launch:
        return "应用启动";
      case LT.Hide:
        return "应用进入后台";
      case LT.Page:
        return "页面切换";
      case LT.Event:
        return "事件触发";
      case LT.Error:
        return "应用错误";
      case LT.Push:
        return "PUSH 设备标识";
      default:
        return `未知事件 (lt=${String(lt !== null && lt !== void 0 ? lt : "?")})`;
    }
  }
  function bucketSize(bucket) {
    let n2 = 0;
    for (const lt of Object.keys(bucket)) {
      const arr = bucket[lt];
      if (Array.isArray(arr))
        n2 += arr.length;
    }
    return n2;
  }
  function bucketSummary(bucket) {
    const parts = [];
    for (const lt of Object.keys(bucket)) {
      const arr = bucket[lt];
      if (Array.isArray(arr) && arr.length > 0) {
        parts.push(`lt=${lt}×${arr.length}`);
      }
    }
    return parts.join(", ") || "<空>";
  }
  function logCollect(data) {
    if (!logger.isDebug())
      return;
    const lt = data.lt;
    const label = getActionLabel(lt);
    logger.debug(`=== 统计数据采集：${label} (lt=${String(lt !== null && lt !== void 0 ? lt : "?")}) ===`);
    logger.debug(data);
    logger.debug("=== 采集结束 ===");
  }
  function logBoot(info) {
    if (!logger.isDebug())
      return;
    const timeoutParts = [];
    if (info.backgroundTimeoutSec != null) {
      timeoutParts.push(`后台超时(新会话): ${info.backgroundTimeoutSec}s`);
    }
    if (info.pageInactiveTimeoutSec != null) {
      timeoutParts.push(`前台无操作超时: ${info.pageInactiveTimeoutSec}s`);
    }
    const timeoutSeg = timeoutParts.length > 0 ? ` | ${timeoutParts.join(" | ")}` : "";
    const lines = [
      "=== uni统计 2.0 已启用 ===",
      `上报间隔: ${info.reportIntervalSec}s${timeoutSeg} | 应用APPID: ${info.ak || "<未注入>"}${info.appName ? ` | 应用名: ${info.appName}` : ""}${info.vueMode ? ` | ${info.vueMode}` : ""}`
    ];
    if (info.debugFromManifest) {
      lines.push("调试模式：已从 manifest.uniStatistics.debug 自动开启");
    }
    lines.push("=== 后续将在每次采集 / 上报时输出过程日志 ===");
    logger.debug(lines.join("\n"));
  }
  function logReportStart(info) {
    if (!logger.isDebug())
      return;
    const total = bucketSize(info.bucket);
    const summary = bucketSummary(info.bucket);
    logger.debug(`=== 准备上报：共 ${total} 条事件 (${summary}) ===`);
  }
  function logReportFailureReason(info) {
    if (!logger.isDebug())
      return;
    logger.debug(`原因: ${describeError(info.error)}`);
    if (info.persistedId) {
      logger.debug(`已暂存重试队列 [retryId=${info.persistedId}]，下次启动自动续传`);
    } else {
      logger.debug("未能写入重试队列：本批数据已丢弃");
    }
  }
  function logReportSummary(info) {
    if (!logger.isDebug())
      return;
    if (info.failedCount === 0) {
      logger.debug(`=== 上报成功： ${info.okCount} 条事件已送达, 用时 ${info.elapsedMs}ms ===`);
    } else if (info.okCount === 0) {
      logger.debug(`=== 上报失败： ${info.failedCount} 条事件未送达, 用时 ${info.elapsedMs}ms ===`);
    } else {
      logger.debug(`=== 上报完成：成功 ${info.okCount} 条，失败 ${info.failedCount} 条，用时 ${info.elapsedMs}ms ===`);
    }
  }
  function logNoChannel(info) {
    if (!logger.isDebug())
      return;
    logger.debug(`=== 上报跳过：当前无可用通道，已回滚 ${bucketSize(info.bucket)} 条事件入队 ===`);
  }
  function logRecoverStart(count) {
    if (!logger.isDebug())
      return;
    logger.debug(`=== 冷启续传：发现 ${count} 条历史 payload，开始逐条重发 ===`);
  }
  function logRecoverItem(info) {
    if (!logger.isDebug())
      return;
    if (info.ok) {
      logger.debug(`续传成功 (${info.index}/${info.total})`);
    } else {
      logger.debug(`续传失败 (${info.index}/${info.total})：${describeError(info.error)}`);
    }
  }
  function describeError(e) {
    if (!e)
      return "<无错误对象>";
    if (e instanceof Error) {
      return `${e.name}: ${e.message}`;
    }
    if (typeof e === "string")
      return e;
    return safeStringify(e) || String(e);
  }
  function omitEmptyStringFieldsForUpload(data) {
    const out = {};
    for (const key of Object.keys(data)) {
      const v = data[key];
      if (v === "")
        continue;
      out[key] = v;
    }
    return out;
  }
  const LT_ORDER = {
    "1": 1,
    "11": 2,
    "21": 3,
    "31": 4,
    "101": 5,
    "3": 100
  };
  const UNKNOWN_LT_WEIGHT = 50;
  function handleData(buckets) {
    return JSON.stringify(flatten(buckets));
  }
  function flatten(buckets) {
    const ltKeys = Object.keys(buckets);
    ltKeys.sort((a, b) => weightOf(a) - weightOf(b));
    const out = [];
    for (let i = 0; i < ltKeys.length; i++) {
      const lt = ltKeys[i];
      const list = buckets[lt];
      if (!list || list.length === 0)
        continue;
      for (let j = 0; j < list.length; j++)
        out.push(list[j]);
    }
    return out;
  }
  function weightOf(lt) {
    const w = LT_ORDER[lt];
    return typeof w === "number" ? w : UNKNOWN_LT_WEIGHT;
  }
  function chunkEvents(events, opts = {}) {
    var _a, _b;
    const maxEvents2 = (_a = opts.maxEvents) !== null && _a !== void 0 ? _a : Infinity;
    const maxBytes = (_b = opts.maxBytes) !== null && _b !== void 0 ? _b : Infinity;
    const out = [];
    if (!Array.isArray(events) || events.length === 0)
      return out;
    const safeMaxEvents = maxEvents2 > 0 ? maxEvents2 : Infinity;
    const safeMaxBytes = maxBytes > 0 ? maxBytes : Infinity;
    let cur = [];
    let curBytes = 2;
    for (let i = 0; i < events.length; i++) {
      const e = events[i];
      let s2 = "";
      try {
        s2 = JSON.stringify(e);
      } catch (_c) {
        continue;
      }
      const inc = cur.length === 0 ? s2.length : s2.length + 1;
      const wouldExceed = cur.length >= safeMaxEvents || cur.length > 0 && curBytes + inc > safeMaxBytes;
      if (wouldExceed) {
        out.push(cur);
        cur = [];
        curBytes = 2;
      }
      cur.push(e);
      curBytes += cur.length === 1 ? s2.length : s2.length + 1;
    }
    if (cur.length > 0)
      out.push(cur);
    return out;
  }
  function handleDataChunked(buckets, opts = {}) {
    const events = flatten(buckets);
    if (events.length === 0)
      return [];
    const chunks = chunkEvents(events, opts);
    const out = [];
    for (let i = 0; i < chunks.length; i++) {
      out.push(JSON.stringify(chunks[i]));
    }
    return out;
  }
  class PermanentChannelError extends Error {
    constructor(message) {
      super(message);
      this.permanent = true;
      this.name = "PermanentChannelError";
      Object.setPrototypeOf(this, PermanentChannelError.prototype);
    }
  }
  function isPermanentChannelError(err) {
    if (!err || typeof err !== "object")
      return false;
    if (err instanceof PermanentChannelError)
      return true;
    const e = err;
    if (e.name === "PermanentChannelError")
      return true;
    if (e.permanent === true)
      return true;
    return false;
  }
  function defaultGenPayloadId(nowMs2) {
    return "p-" + nowMs2.toString(36) + "-" + Math.random().toString(36).slice(2, 6);
  }
  function createCollector(deps) {
    let firstFlushDone = false;
    let deferredFlushTimer = null;
    function cancelDeferredFlush() {
      if (deferredFlushTimer == null)
        return;
      clearTimeout(deferredFlushTimer);
      deferredFlushTimer = null;
    }
    function triggerAutoFlush() {
      var _a;
      const deferMs = Math.max(0, Math.floor((_a = deps.firstFlushDeferMs) !== null && _a !== void 0 ? _a : 0));
      if (!firstFlushDone && deferMs > 0) {
        if (deferredFlushTimer != null)
          return;
        deferredFlushTimer = setTimeout(() => {
          deferredFlushTimer = null;
          firstFlushDone = true;
          void flushImpl(false).catch((e) => logger.warn("[uni统计 2.0] auto-flush failed", e));
        }, deferMs);
        return;
      }
      firstFlushDone = true;
      void flushImpl(false).catch((e) => logger.warn("[uni统计 2.0] auto-flush failed", e));
    }
    function report(input) {
      tryRun(() => {
        const t = typeof input.t === "number" ? input.t : deps.nowSec();
        const snap = deps.session.getSnapshot();
        let sessionForCtx;
        if (snap) {
          const seq = deps.session.nextSeq();
          sessionForCtx = Object.assign({}, snap, { seq });
        }
        if (snap && input.lt === LT.Event && deps.session.touch) {
          deps.session.touch(t);
        }
        const ctx = Object.assign({}, input, {
          t,
          session: sessionForCtx
        });
        const data = deps.builder.build(ctx);
        logCollect(data);
        deps.queue.enqueue(omitEmptyStringFieldsForUpload(data));
        if (deps.queue.shouldFlush()) {
          triggerAutoFlush();
        }
      }, void 0);
    }
    function applyUploadFields(bucket) {
      const fields = deps.resolveUploadFields ? deps.resolveUploadFields() : {};
      const keys = Object.keys(fields).filter((key) => {
        const v = fields[key];
        return v !== "" && v !== void 0 && v !== null;
      });
      if (keys.length === 0)
        return;
      for (const lt of Object.keys(bucket)) {
        const list = bucket[lt];
        if (!Array.isArray(list))
          continue;
        for (let i = 0; i < list.length; i++) {
          const item = list[i];
          for (let j = 0; j < keys.length; j++) {
            const key = keys[j];
            item[key] = fields[key];
          }
        }
      }
    }
    function applyUploadFieldsToRequests(requests) {
      const fields = deps.resolveUploadFields ? deps.resolveUploadFields() : {};
      const keys = Object.keys(fields).filter((key) => {
        const v = fields[key];
        return v !== "" && v !== void 0 && v !== null;
      });
      if (keys.length === 0)
        return requests;
      try {
        const events = JSON.parse(requests);
        if (!Array.isArray(events))
          return requests;
        for (let i = 0; i < events.length; i++) {
          const item = events[i];
          if (!item || typeof item !== "object")
            continue;
          for (let j = 0; j < keys.length; j++) {
            const key = keys[j];
            item[key] = fields[key];
          }
        }
        return JSON.stringify(events);
      } catch (_a) {
        return requests;
      }
    }
    function applyUploadFieldsToPayload(payload) {
      const requests = applyUploadFieldsToRequests(payload.requests);
      if (requests === payload.requests)
        return payload;
      return Object.assign({}, payload, { requests });
    }
    function flushImpl() {
      return __awaiter(this, arguments, void 0, function* (force = false) {
        var _a, _b, _c, _d, _e;
        if (!deps.queue.shouldFlush(force))
          return;
        if (deps.isNetworkOffline) {
          let offline = false;
          try {
            offline = yield deps.isNetworkOffline();
          } catch (_f) {
            offline = false;
          }
          if (offline) {
            logger.warn("[uni统计 2.0] 当前无网络，延后 flush");
            return;
          }
        }
        const snapshot = deps.queue.flush();
        if (!snapshot)
          return;
        applyUploadFields(snapshot);
        const channel = deps.selectChannel();
        if (!channel) {
          logger.warn("[uni统计 2.0] 无可用上报线路，本批已回滚队列");
          logNoChannel({ bucket: snapshot });
          deps.queue.rollback(snapshot);
          return;
        }
        const globalMaxBytes = (_b = (_a = deps.batchLimits) === null || _a === void 0 ? void 0 : _a.maxBytes) !== null && _b !== void 0 ? _b : BATCH_REQUESTS_MAX_BYTES;
        const channelMaxBytes = typeof channel.maxRequestBytes === "function" ? channel.maxRequestBytes() : Number.POSITIVE_INFINITY;
        const limits = {
          maxEvents: (_d = (_c = deps.batchLimits) === null || _c === void 0 ? void 0 : _c.maxEvents) !== null && _d !== void 0 ? _d : BATCH_MAX_EVENTS,
          maxBytes: Math.min(globalMaxBytes, channelMaxBytes)
        };
        const chunks = handleDataChunked(snapshot, limits);
        if (chunks.length === 0) {
          logger.warn("[uni统计 2.0] flush 切片结果为空，已回滚队列", snapshot);
          deps.queue.rollback(snapshot);
          return;
        }
        const startMs = deps.nowMs();
        let totalCount = 0;
        for (const lt of Object.keys(snapshot)) {
          const arr = snapshot[lt];
          if (Array.isArray(arr))
            totalCount += arr.length;
        }
        logReportStart({ channel: channel.name, bucket: snapshot });
        const hasLaunch = Array.isArray(snapshot["1"]) && snapshot["1"].length > 0;
        let okEvents = 0;
        let failedEvents = 0;
        let allOk = true;
        let firstChunkOk = true;
        for (let i = 0; i < chunks.length; i++) {
          const requests = chunks[i];
          const payload = {
            usv: deps.config.usv,
            t: deps.nowSec(),
            requests,
            _id: ((_e = deps.genPayloadId) !== null && _e !== void 0 ? _e : () => defaultGenPayloadId(deps.nowMs()))()
          };
          const sliceEvents = countEvents(requests);
          try {
            yield channel.send(payload);
            okEvents += sliceEvents;
          } catch (e) {
            allOk = false;
            if (i === 0)
              firstChunkOk = false;
            failedEvents += sliceEvents;
            if (isPermanentChannelError(e)) {
              logger.warn("[uni统计 2.0] 统计上报失败（本批已丢弃，不可重试）", e, "sliceBytes=" + requests.length);
              logReportFailureReason({ error: e, persistedId: void 0 });
              continue;
            }
            logger.warn("[uni统计 2.0] 统计上报失败（已暂存，下次启动自动重试）", e);
            const id = deps.retry.persist(payload);
            if (!id) {
              logger.warn("[uni统计 2.0] 统计暂存重试失败（无 retryId），本批已丢弃");
            }
            logReportFailureReason({ error: e, persistedId: id });
          }
        }
        const visitAccepted = hasLaunch ? firstChunkOk : allOk;
        if (visitAccepted) {
          tryRun(() => deps.visit.commitVisitOnAck(deps.nowSec()), void 0);
        } else {
          tryRun(() => deps.visit.rollbackPendingVisit(), void 0);
        }
        logReportSummary({
          channel: channel.name,
          okCount: okEvents,
          failedCount: failedEvents,
          elapsedMs: deps.nowMs() - startMs
        });
      });
    }
    function countEvents(requests) {
      try {
        const arr = JSON.parse(requests);
        return Array.isArray(arr) ? arr.length : 0;
      } catch (_a) {
        return 0;
      }
    }
    function recoverRetry() {
      return __awaiter(this, void 0, void 0, function* () {
        if (deps.isNetworkOffline) {
          let offline = false;
          try {
            offline = yield deps.isNetworkOffline();
          } catch (_a) {
            offline = false;
          }
          if (offline) {
            logger.warn("[uni统计 2.0] 当前无网络，延后续传重试");
            return;
          }
        }
        const items = deps.retry.loadAll();
        if (items.length === 0)
          return;
        const channel = deps.selectChannel();
        if (!channel) {
          logger.warn("[uni统计 2.0] 续传重试跳过：当前无可用上报线路");
          return;
        }
        logRecoverStart(items.length);
        let i = 0;
        for (const payload of items) {
          i++;
          const uploadPayload = applyUploadFieldsToPayload(payload);
          try {
            yield channel.send(uploadPayload);
            if (payload._id)
              deps.retry.ack(payload._id);
            logRecoverItem({
              index: i,
              total: items.length,
              payloadId: payload._id,
              ok: true
            });
          } catch (e) {
            if (isPermanentChannelError(e)) {
              if (payload._id)
                deps.retry.ack(payload._id);
              logger.warn("[uni统计 2.0] 续传重试失败（不可重试，已从队列移除）", e, "id=" + payload._id);
              logRecoverItem({
                index: i,
                total: items.length,
                payloadId: payload._id,
                ok: false,
                error: e
              });
              continue;
            }
            if (payload._id && deps.retry.markAttempt) {
              deps.retry.markAttempt(payload._id);
            }
            logger.warn("[uni统计 2.0] 续传重试失败（保留队列，下次启动再试）", e);
            logRecoverItem({
              index: i,
              total: items.length,
              payloadId: payload._id,
              ok: false,
              error: e
            });
          }
        }
      });
    }
    function flush2() {
      return __awaiter(this, arguments, void 0, function* (force = false) {
        cancelDeferredFlush();
        firstFlushDone = true;
        return flushImpl(force);
      });
    }
    function destroy() {
      cancelDeferredFlush();
      firstFlushDone = true;
    }
    return { report, flush: flush2, recoverRetry, destroy };
  }
  function getUni$6() {
    const u = resolveUniRuntime();
    return u != null && typeof u === "object" ? u : void 0;
  }
  function toQuery(payload) {
    const out = [];
    out.push("usv=" + encodeURIComponent(String(payload.usv)));
    out.push("t=" + encodeURIComponent(String(payload.t)));
    out.push("requests=" + encodeURIComponent(payload.requests));
    return out.join("&");
  }
  function tryImageRequest(payload, h5Url = STAT_H5_URL) {
    const ImageCtor = getGlobalObject().Image;
    if (typeof ImageCtor !== "function")
      return false;
    return tryRun(() => {
      const img = new ImageCtor();
      img.src = h5Url + "?" + toQuery(payload);
      return true;
    }, false);
  }
  function createHttpChannel(opts = {}) {
    var _a, _b, _c, _d, _e;
    const url = (_a = opts.url) !== null && _a !== void 0 ? _a : STAT_URL;
    const h5Url = (_b = opts.h5Url) !== null && _b !== void 0 ? _b : STAT_H5_URL;
    const ut = (_c = opts.ut) !== null && _c !== void 0 ? _c : "";
    const timeoutMs = (_d = opts.timeoutMs) !== null && _d !== void 0 ? _d : 1e4;
    const maxRetries = (_e = opts.maxRetries) !== null && _e !== void 0 ? _e : HTTP_MAX_RETRIES;
    function once(payload) {
      if (ut === "h5" && opts.preferImageOnH5 !== false) {
        if (tryImageRequest(payload, h5Url))
          return Promise.resolve();
      }
      const u = getUni$6();
      if (!u || typeof u.request !== "function") {
        return Promise.reject(new Error("uni.request unavailable"));
      }
      return new Promise((resolve, reject) => {
        let settled = false;
        const timer = setTimeout(() => {
          if (settled)
            return;
          settled = true;
          reject(new Error("http timeout"));
        }, timeoutMs);
        u.request({
          url,
          method: "POST",
          data: payload,
          timeout: timeoutMs,
          success: (res) => {
            var _a2;
            if (settled)
              return;
            settled = true;
            clearTimeout(timer);
            const code = (_a2 = res === null || res === void 0 ? void 0 : res.statusCode) !== null && _a2 !== void 0 ? _a2 : 0;
            if (code >= 200 && code < 300)
              resolve();
            else
              reject(new Error("http status " + code));
          },
          fail: (e) => {
            if (settled)
              return;
            settled = true;
            clearTimeout(timer);
            reject(e instanceof Error ? e : new Error(String(e)));
          }
        });
      });
    }
    return {
      name: "1.0",
      available() {
        const u = getUni$6();
        return !!(u && typeof u.request === "function");
      },
      send(payload) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            yield withRetry(() => once(payload), {
              times: maxRetries,
              baseDelayMs: RETRY_BASE_DELAY_MS,
              sleep: opts.sleep
            });
          } catch (e) {
            logger.warn("[uni统计 2.0] 统计上报失败（HTTP 已重试）", e);
            throw e;
          }
        });
      }
    };
  }
  const WEBTRACK_API_PATH = "/WebTrack";
  const WEBTRACK_BEACON_PATH = "/WebTrack.gif";
  function getUni$5() {
    const u = resolveUniRuntime();
    return u != null && typeof u === "object" ? u : void 0;
  }
  const REPORT_URL_BASE_OVERHEAD = 256;
  const REPORT_ENCODE_RATIO = 3;
  function buildStatReportUrl(payload, opts) {
    var _a;
    const t = ((_a = opts.nowMs) !== null && _a !== void 0 ? _a : () => Date.now())();
    const logs = encodeURIComponent(payload.requests);
    const host = opts.host.replace(/\/+$/, "");
    return host + opts.path + "?ProjectId=" + encodeURIComponent(opts.projectId) + "&TopicId=" + encodeURIComponent(opts.topicId) + "&Logs=" + logs + "&Source=webImg&Time=" + t;
  }
  function summarizeHttpErrorBody(data, maxLen = 320) {
    if (data == null)
      return "";
    if (typeof data === "string") {
      return data.length <= maxLen ? data : data.slice(0, maxLen) + "…";
    }
    try {
      const s2 = JSON.stringify(data);
      return s2.length <= maxLen ? s2 : s2.slice(0, maxLen) + "…";
    } catch (_a) {
      return String(data).slice(0, maxLen);
    }
  }
  function imageBeaconAwait(url, ms) {
    const ImageCtor = getGlobalObject().Image;
    if (typeof ImageCtor !== "function") {
      return Promise.reject(new PermanentChannelError("当前环境无法完成统计上报"));
    }
    return new Promise((resolve, reject) => {
      let settled = false;
      const timer = setTimeout(() => {
        if (settled)
          return;
        settled = true;
        reject(new Error("统计上报超时"));
      }, ms);
      const img = new ImageCtor();
      img.onload = () => {
        if (settled)
          return;
        settled = true;
        clearTimeout(timer);
        resolve();
      };
      img.onerror = () => {
        if (settled)
          return;
        settled = true;
        clearTimeout(timer);
        resolve();
      };
      img.src = url;
    });
  }
  function fetchBeaconAwait(url, ms) {
    const g = getGlobalObject();
    const fetchFn = g.fetch;
    if (typeof fetchFn !== "function") {
      return Promise.reject(new Error("fetch unavailable"));
    }
    const controller = typeof g.AbortController === "function" ? new g.AbortController() : void 0;
    return new Promise((resolve, reject) => {
      let settled = false;
      const timer = setTimeout(() => {
        if (settled)
          return;
        settled = true;
        if (controller)
          tryRun(() => controller.abort(), void 0);
        reject(new Error("统计上报超时"));
      }, ms);
      fetchFn(url, {
        method: "GET",
        keepalive: true,
        credentials: "omit",
        signal: controller ? controller.signal : void 0
      }).then((res) => {
        if (settled)
          return;
        settled = true;
        clearTimeout(timer);
        if (res && res.ok) {
          resolve();
          return;
        }
        reject(new Error("统计上报 HTTP " + (res ? res.status : 0)));
      }, (e) => {
        if (settled)
          return;
        settled = true;
        clearTimeout(timer);
        reject(e instanceof Error ? e : new Error(String(e)));
      });
    });
  }
  function getWxPreloadAssets() {
    const wx = getGlobalObject().wx;
    return typeof (wx === null || wx === void 0 ? void 0 : wx.preloadAssets) === "function" ? wx.preloadAssets : void 0;
  }
  function formatWxPreloadFail(err) {
    if (err instanceof Error)
      return err;
    if (err != null && typeof err === "object" && "errMsg" in err) {
      const msg = err.errMsg;
      if (typeof msg === "string" && msg.length > 0)
        return new Error(msg);
    }
    if (err == null)
      return new Error("preloadAssets fail (empty err)");
    return new Error(String(err));
  }
  function mpWeixinPreloadAssetsBeaconAwait(url, ms, preload) {
    return new Promise((resolve, reject) => {
      let settled = false;
      const timer = setTimeout(() => {
        if (settled)
          return;
        settled = true;
        reject(new Error("统计上报超时(preloadAssets)"));
      }, ms);
      try {
        preload({
          data: [{ type: "image", src: url }],
          success: () => {
            if (settled)
              return;
            settled = true;
            clearTimeout(timer);
            resolve();
          },
          fail: (err) => {
            if (settled)
              return;
            settled = true;
            clearTimeout(timer);
            reject(formatWxPreloadFail(err));
          }
        });
      } catch (e) {
        if (settled)
          return;
        settled = true;
        clearTimeout(timer);
        reject(e instanceof Error ? e : new Error(String(e)));
      }
    });
  }
  function isMpWeixinPreloadEnabled(opts) {
    var _a, _b;
    const enabled = (_a = opts.mpWeixinPreloadReport) !== null && _a !== void 0 ? _a : MP_WEIXIN_USE_PRELOAD_ASSETS_REPORT;
    if (!enabled)
      return false;
    const raw = (_b = opts.rawPlatform) !== null && _b !== void 0 ? _b : getRawPlatform();
    return raw === "mp-weixin";
  }
  function createImageChannel(opts = {}) {
    var _a, _b, _c, _d, _e, _f, _g;
    const host = (_a = opts.host) !== null && _a !== void 0 ? _a : IMAGE_REPORT_DEFAULTS.host;
    const projectId = (_b = opts.projectId) !== null && _b !== void 0 ? _b : IMAGE_REPORT_DEFAULTS.projectId;
    const topicId = (_c = opts.topicId) !== null && _c !== void 0 ? _c : IMAGE_REPORT_DEFAULTS.topicId;
    const timeoutMs = (_d = opts.timeoutMs) !== null && _d !== void 0 ? _d : 1e4;
    const maxRetries = (_e = opts.maxRetries) !== null && _e !== void 0 ? _e : IMAGE_MAX_RETRIES;
    const maxUrlLength = (_f = opts.maxUrlLength) !== null && _f !== void 0 ? _f : 6 * 1024;
    const preferBeacon = opts.preferImageBeacon !== false;
    const nowMs2 = opts.nowMs;
    const ut = (_g = opts.ut) !== null && _g !== void 0 ? _g : "";
    const isH52 = ut === "h5";
    const mpWeixinPreload = isMpWeixinPreloadEnabled(opts);
    function configured() {
      return !!(host && projectId && topicId);
    }
    const reportOpts = { host, projectId, topicId, nowMs: nowMs2 };
    function preflightUrl(payload, path) {
      if (!configured()) {
        throw new PermanentChannelError("统计上报未配置：请设置 TLS host、projectId、topicId");
      }
      const url = buildStatReportUrl(payload, {
        host: reportOpts.host,
        projectId: reportOpts.projectId,
        topicId: reportOpts.topicId,
        nowMs: reportOpts.nowMs,
        path
      });
      if (url.length > maxUrlLength) {
        throw new PermanentChannelError("统计上报 URL 过长: " + url.length + " > " + maxUrlLength);
      }
      return url;
    }
    function webTrackGetViaRequest(url) {
      const u = getUni$5();
      if (!u || typeof u.request !== "function") {
        return Promise.reject(new PermanentChannelError("当前环境无法完成统计上报"));
      }
      return new Promise((resolve, reject) => {
        let settled = false;
        const timer = setTimeout(() => {
          if (settled)
            return;
          settled = true;
          reject(new Error("统计上报超时"));
        }, timeoutMs);
        u.request({
          url,
          method: "GET",
          timeout: timeoutMs,
          success: (res) => {
            var _a2;
            if (settled)
              return;
            settled = true;
            clearTimeout(timer);
            const code = (_a2 = res === null || res === void 0 ? void 0 : res.statusCode) !== null && _a2 !== void 0 ? _a2 : 0;
            if (code >= 200 && code < 300) {
              resolve();
              return;
            }
            const hint = summarizeHttpErrorBody(res === null || res === void 0 ? void 0 : res.data);
            reject(new Error(hint ? `统计上报 HTTP ${code}: ${hint}` : `统计上报 HTTP ${code}`));
          },
          fail: (e) => {
            if (settled)
              return;
            settled = true;
            clearTimeout(timer);
            reject(e instanceof Error ? e : new Error(String(e)));
          }
        });
      });
    }
    function onceH5(payload) {
      const g = getGlobalObject();
      const u = getUni$5();
      const hasRequest = !!(u && typeof u.request === "function");
      if (preferBeacon && typeof g.fetch === "function") {
        return fetchBeaconAwait(preflightUrl(payload, WEBTRACK_BEACON_PATH), timeoutMs);
      }
      if (hasRequest) {
        return webTrackGetViaRequest(preflightUrl(payload, WEBTRACK_API_PATH));
      }
      if (preferBeacon && typeof g.Image === "function") {
        return imageBeaconAwait(preflightUrl(payload, WEBTRACK_BEACON_PATH), timeoutMs);
      }
      return Promise.reject(new PermanentChannelError("当前环境无法完成统计上报"));
    }
    function onceMpWeixin(payload) {
      const preloadFn = getWxPreloadAssets();
      if (preloadFn) {
        return mpWeixinPreloadAssetsBeaconAwait(preflightUrl(payload, WEBTRACK_BEACON_PATH), MP_WEIXIN_PRELOAD_TIMEOUT_MS, preloadFn);
      }
      logger.warn("[uni统计 2.0] wx.preloadAssets 不可用，回退 uni.request GET /WebTrack");
      return webTrackGetViaRequest(preflightUrl(payload, WEBTRACK_API_PATH));
    }
    function dispatchReport(payload) {
      if (isH52)
        return onceH5(payload);
      if (mpWeixinPreload)
        return onceMpWeixin(payload);
      return webTrackGetViaRequest(preflightUrl(payload, WEBTRACK_API_PATH));
    }
    return {
      name: "image",
      available() {
        return configured();
      },
      maxRequestBytes() {
        const raw = (maxUrlLength - REPORT_URL_BASE_OVERHEAD) / REPORT_ENCODE_RATIO;
        return Math.max(512, Math.floor(raw));
      },
      send(payload) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            yield withRetry(() => dispatchReport(payload), {
              times: maxRetries,
              baseDelayMs: RETRY_BASE_DELAY_MS,
              sleep: opts.sleep
            });
          } catch (e) {
            if (isPermanentChannelError(e)) {
              logger.warn("[uni统计 2.0] 统计上报失败（不可重试）", e);
            } else {
              logger.warn("[uni统计 2.0] 统计上报失败（已重试）", e);
            }
            throw e;
          }
        });
      }
    };
  }
  function s(v, def = "") {
    if (typeof v === "string")
      return v;
    if (typeof v === "number" && Number.isFinite(v))
      return String(v);
    return def;
  }
  function n(v, def = 0) {
    if (typeof v === "number" && Number.isFinite(v))
      return v;
    if (typeof v === "string" && v.length > 0) {
      const x = Number(v);
      if (Number.isFinite(x))
        return x;
    }
    return def;
  }
  function createStatDataBuilder(deps) {
    function baseFields() {
      var _a, _b, _c;
      const { config: config2, platform, system, locale, device, net, location, pkg, legacy, web } = deps;
      return {
        ak: s(config2.ak),
        usv: s(config2.usv),
        v: s((_a = config2.v) !== null && _a !== void 0 ? _a : system.appVersion),
        ch: s(config2.ch),
        ut: s(platform.ut),
        p: s((_b = platform.p) !== null && _b !== void 0 ? _b : system.osP),
        on: s(system.on),
        did: s(device.uuid),
        brand: s(system.brand),
        md: s(system.md),
        sv: s(system.sv),
        mpsdk: s(system.sdkVersion),
        mpv: s(system.mpvHostVersion),
        pr: n(locale.pr, 1),
        ww: n(locale.ww),
        wh: n(locale.wh),
        sw: n(locale.sw),
        sh: n(locale.sh),
        lang: s(locale.lang),
        net: s(net.net, "unknown"),
        lat: s(location.lat),
        lng: s(location.lng),
        mpn: s((_c = legacy === null || legacy === void 0 ? void 0 : legacy.mpn) !== null && _c !== void 0 ? _c : pkg.mpn),
        tdaid: s(pkg.tdaid),
        pkn: s(pkg.pkn),
        an: s(pkg.an),
        domain: s(web.domain)
      };
    }
    function sessionFields(ctx) {
      if (!ctx.session)
        return {};
      return {
        sid: ctx.session.sid,
        cst: ctx.session.sct
      };
    }
    function pageFields(ctx) {
      const out = {};
      if (ctx.url !== void 0)
        out.url = s(ctx.url);
      if (ctx.urlref !== void 0)
        out.urlref = s(ctx.urlref);
      if (ctx.urlref_ts !== void 0)
        out.urlref_ts = n(ctx.urlref_ts);
      if (ctx.ttn !== void 0)
        out.ttn = s(ctx.ttn);
      if (ctx.ttpj !== void 0)
        out.ttpj = s(ctx.ttpj);
      if (ctx.ttc !== void 0)
        out.ttc = s(ctx.ttc);
      return out;
    }
    function entryFields(ctx) {
      if (ctx.lt === "11") {
        return {
          iey: toIey(ctx.iey !== void 0 ? ctx.iey : false),
          ppiey: toIey(ctx.ppiey !== void 0 ? ctx.ppiey : false)
        };
      }
      return {};
    }
    function visitFields(ctx) {
      if (ctx.lt !== "1")
        return {};
      if (!ctx.visit)
        return {};
      return {
        fvts: ctx.visit.fvts,
        lvts: ctx.visit.lvts,
        tvc: ctx.visit.tvc
      };
    }
    function launchFields(ctx) {
      if (ctx.lt !== "1")
        return {};
      if (ctx.sc === void 0)
        return {};
      return { sc: s(ctx.sc) };
    }
    function errorFields(ctx) {
      if (ctx.lt !== "31" || !ctx.errMsg)
        return {};
      const ERR_MSG_MAX = 3 * 1024;
      const TRUNC_SUFFIX = "…[truncated]";
      let em = s(ctx.errMsg);
      if (em.length > ERR_MSG_MAX) {
        em = em.slice(0, ERR_MSG_MAX - TRUNC_SUFFIX.length) + TRUNC_SUFFIX;
      }
      return { em };
    }
    function pushFields(ctx) {
      if (ctx.lt !== "101" || !ctx.cid)
        return {};
      return { cid: s(ctx.cid) };
    }
    function build(ctx) {
      const safeCustom = {};
      if (ctx.custom) {
        const reserved = /* @__PURE__ */ new Set([
          "lt",
          "t",
          "sid",
          "cst",
          "did",
          "p",
          "on",
          "mpv",
          "domain",
          "fvts",
          "lvts",
          "tvc",
          "sc"
        ]);
        for (const k of Object.keys(ctx.custom)) {
          if (!reserved.has(k))
            safeCustom[k] = ctx.custom[k];
        }
      }
      const out = { lt: ctx.lt, t: n(ctx.t) };
      Object.assign(out, baseFields(), sessionFields(ctx), pageFields(ctx), entryFields(ctx), visitFields(ctx), launchFields(ctx), errorFields(ctx), pushFields(ctx), safeCustom);
      return out;
    }
    return { build };
  }
  function normalizeChannelValue(value) {
    if (typeof value === "string")
      return value;
    if (typeof value === "number" && Number.isFinite(value))
      return String(value);
    return "";
  }
  function getAppChannel() {
    const plus2 = getGlobalObject().plus;
    if (!isApp() && !(plus2 === null || plus2 === void 0 ? void 0 : plus2.runtime))
      return "";
    const raw = tryRun(() => {
      var _a;
      return (_a = plus2 === null || plus2 === void 0 ? void 0 : plus2.runtime) === null || _a === void 0 ? void 0 : _a.channel;
    }, void 0);
    return normalizeChannelValue(raw);
  }
  let cachedStatic = null;
  function getUni$4() {
    const u = resolveUniRuntime();
    return u != null && typeof u === "object" ? u : void 0;
  }
  function mergeWxHostSnapshots() {
    const raw = getRawPlatform();
    if (raw !== "mp-weixin" && raw !== "mp-qq")
      return null;
    const wxHost = getGlobalObject().wx;
    if (!wxHost)
      return null;
    const sync = typeof wxHost.getSystemInfoSync === "function" ? tryRun(() => wxHost.getSystemInfoSync(), null) : null;
    const device = typeof wxHost.getDeviceInfo === "function" ? tryRun(() => wxHost.getDeviceInfo(), null) : null;
    const appBase = typeof wxHost.getAppBaseInfo === "function" ? tryRun(() => wxHost.getAppBaseInfo(), null) : null;
    const windowInfo = typeof wxHost.getWindowInfo === "function" ? tryRun(() => wxHost.getWindowInfo(), null) : null;
    return mergeSystemSnapshots(sync, device, appBase, windowInfo);
  }
  function mergeSystemSnapshots(...parts) {
    const out = {};
    for (const p of parts) {
      if (!p)
        continue;
      for (const k of Object.keys(p)) {
        const v = p[k];
        if (v !== void 0 && v !== null)
          out[k] = v;
      }
    }
    return out;
  }
  function mergedSystemInfo() {
    const u = getUni$4();
    const sync = u && typeof u.getSystemInfoSync === "function" ? tryRun(() => u.getSystemInfoSync(), null) : null;
    const device = u && typeof u.getDeviceInfo === "function" ? tryRun(() => u.getDeviceInfo(), null) : null;
    const appBase = u && typeof u.getAppBaseInfo === "function" ? tryRun(() => u.getAppBaseInfo(), null) : null;
    const windowInfo = u && typeof u.getWindowInfo === "function" ? tryRun(() => u.getWindowInfo(), null) : null;
    const fromUni = mergeSystemSnapshots(sync, device, appBase, windowInfo);
    const fromWx = mergeWxHostSnapshots();
    const merged = fromWx ? mergeSystemSnapshots(fromUni, fromWx) : fromUni;
    return merged;
  }
  function resolveUniConfigAppVersion() {
    return tryRun(() => {
      const cfg = getGlobalObject().__uniConfig;
      return typeof (cfg === null || cfg === void 0 ? void 0 : cfg.appVersion) === "string" ? cfg.appVersion : "";
    }, "");
  }
  function resolveBuildTimeAppVersion() {
    const raw = "1.11.01";
    return typeof raw === "string" ? raw : "";
  }
  function resolveAppVersionForStat(plus2, sys) {
    var _a;
    const fromPlus = (_a = plus2 === null || plus2 === void 0 ? void 0 : plus2.runtime) === null || _a === void 0 ? void 0 : _a.version;
    if (typeof fromPlus === "string" && fromPlus)
      return fromPlus;
    const fromSys = sys.appVersion;
    if (typeof fromSys === "string" && fromSys)
      return fromSys;
    const fromUniConfig = resolveUniConfigAppVersion();
    if (fromUniConfig)
      return fromUniConfig;
    return resolveBuildTimeAppVersion();
  }
  function buildOnForStat(sys) {
    const rom = typeof sys.romName === "string" ? sys.romName.trim() : "";
    if (rom) {
      const romVer = typeof sys.romVersion === "string" ? sys.romVersion.trim() : "";
      return romVer ? `${rom} ${romVer}`.trim() : rom;
    }
    return typeof sys.osName === "string" ? sys.osName.trim() : "";
  }
  function getSystemInfo() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    if (cachedStatic)
      return cachedStatic;
    const sys = mergedSystemInfo();
    const plus2 = getGlobalObject().plus;
    const appVersion = resolveAppVersionForStat(plus2, sys);
    cachedStatic = {
      brand: (_b = (_a = sys.deviceBrand) !== null && _a !== void 0 ? _a : sys.brand) !== null && _b !== void 0 ? _b : "",
      md: (_d = (_c = sys.deviceModel) !== null && _c !== void 0 ? _c : sys.model) !== null && _d !== void 0 ? _d : "",
      sv: (_f = (_e = sys.osVersion) !== null && _e !== void 0 ? _e : sys.system) !== null && _f !== void 0 ? _f : "",
      v: (_h = (_g = sys.hostVersion) !== null && _g !== void 0 ? _g : sys.version) !== null && _h !== void 0 ? _h : "",
      ut: (_j = sys.deviceType) !== null && _j !== void 0 ? _j : "unknown",
      appVersion,
      appWgtVersion: (_p = (_o = (_l = (_k = plus2 === null || plus2 === void 0 ? void 0 : plus2.runtime) === null || _k === void 0 ? void 0 : _k.appWgtVersion) !== null && _l !== void 0 ? _l : (_m = plus2 === null || plus2 === void 0 ? void 0 : plus2.runtime) === null || _m === void 0 ? void 0 : _m.appWgtRevision) !== null && _o !== void 0 ? _o : sys.appWgtVersion) !== null && _p !== void 0 ? _p : "",
      mpvHostVersion: ((_r = (_q = sys.hostVersion) !== null && _q !== void 0 ? _q : sys.version) !== null && _r !== void 0 ? _r : "").trim(),
      on: buildOnForStat(sys),
      sdkVersion: (_t = (_s = sys.hostSDKVersion) !== null && _s !== void 0 ? _s : sys.SDKVersion) !== null && _t !== void 0 ? _t : "",
      statusBarHeight: typeof sys.statusBarHeight === "number" ? sys.statusBarHeight : 0,
      osP: normalizeStatOsP({
        platform: sys.platform,
        osName: sys.osName,
        system: sys.system
      })
    };
    return cachedStatic;
  }
  function getLocaleAndScreen() {
    var _a, _b;
    const sys = mergedSystemInfo();
    const prRaw = typeof sys.pixelRatio === "number" ? sys.pixelRatio : typeof sys.devicePixelRatio === "number" ? sys.devicePixelRatio : 1;
    return {
      lang: ((_b = (_a = sys.hostLanguage) !== null && _a !== void 0 ? _a : sys.language) !== null && _b !== void 0 ? _b : "").replace(/_/g, "-"),
      ww: typeof sys.windowWidth === "number" ? sys.windowWidth : 0,
      wh: typeof sys.windowHeight === "number" ? sys.windowHeight : 0,
      sw: typeof sys.screenWidth === "number" ? sys.screenWidth : 0,
      sh: typeof sys.screenHeight === "number" ? sys.screenHeight : 0,
      pr: prRaw > 0 ? prRaw : 1
    };
  }
  let cached$1 = null;
  function getUni$3() {
    const u = resolveUniRuntime();
    return u != null && typeof u === "object" ? u : void 0;
  }
  function getPlus() {
    return getGlobalObject().plus;
  }
  function getMpTdaid(platform) {
    const u = getUni$3();
    switch (platform) {
      case "wx":
      case "qq": {
        if (typeof (u === null || u === void 0 ? void 0 : u.getAccountInfoSync) === "function") {
          const id = tryRun(() => {
            var _a, _b;
            return (_b = (_a = u.getAccountInfoSync().miniProgram) === null || _a === void 0 ? void 0 : _a.appId) !== null && _b !== void 0 ? _b : "";
          }, "");
          if (id)
            return id;
        }
        const wxHost = getGlobalObject().wx;
        if (typeof (wxHost === null || wxHost === void 0 ? void 0 : wxHost.getAccountInfoSync) === "function") {
          const id2 = tryRun(() => {
            var _a, _b;
            return (_b = (_a = wxHost.getAccountInfoSync().miniProgram) === null || _a === void 0 ? void 0 : _a.appId) !== null && _b !== void 0 ? _b : "";
          }, "");
          if (id2)
            return id2;
        }
        const envId = "__UNI__137BD60";
        return typeof envId === "string" ? envId : "";
      }
      case "ali":
      case "dt": {
        const my = getGlobalObject().my;
        if (!my)
          return "";
        const v1 = tryRun(() => {
          var _a, _b;
          return (_b = (_a = my.getAppIdSync) === null || _a === void 0 ? void 0 : _a.call(my)) !== null && _b !== void 0 ? _b : "";
        }, "");
        if (v1)
          return v1;
        return tryRun(() => {
          var _a, _b, _c;
          return (_c = (_b = (_a = my.getAccountInfoSync) === null || _a === void 0 ? void 0 : _a.call(my).miniProgram) === null || _b === void 0 ? void 0 : _b.appId) !== null && _c !== void 0 ? _c : "";
        }, "");
      }
      case "tt":
      case "lark": {
        const tt = getGlobalObject().tt;
        return tryRun(() => {
          var _a, _b, _c;
          return (_c = (_b = (_a = tt === null || tt === void 0 ? void 0 : tt.getEnvInfoSync) === null || _a === void 0 ? void 0 : _a.call(tt).microapp) === null || _b === void 0 ? void 0 : _b.appId) !== null && _c !== void 0 ? _c : "";
        }, "");
      }
      case "bd": {
        const swan = getGlobalObject().swan;
        return tryRun(() => {
          var _a, _b, _c;
          return (_c = (_b = (_a = swan === null || swan === void 0 ? void 0 : swan.getEnvInfoSync) === null || _a === void 0 ? void 0 : _a.call(swan).common) === null || _b === void 0 ? void 0 : _b.appKey) !== null && _c !== void 0 ? _c : "";
        }, "");
      }
      default:
        return "";
    }
  }
  function getAppPkn() {
    var _a, _b, _c;
    const plus2 = getPlus();
    if (!plus2)
      return "";
    const osName = (_c = (_b = (_a = plus2.os) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.toLowerCase()) !== null && _c !== void 0 ? _c : "";
    if (osName.includes("android")) {
      return tryRun(() => {
        var _a2, _b2, _c2, _d, _e;
        return (_e = (_d = (_c2 = (_b2 = (_a2 = plus2.android) === null || _a2 === void 0 ? void 0 : _a2.runtimeMainActivity) === null || _b2 === void 0 ? void 0 : _b2.call(_a2)) === null || _c2 === void 0 ? void 0 : _c2.getPackageName) === null || _d === void 0 ? void 0 : _d.call(_c2)) !== null && _e !== void 0 ? _e : "";
      }, "");
    }
    if (osName === "ios" || osName === "iphone os") {
      const v = tryRun(() => {
        var _a2, _b2;
        return (_b2 = (_a2 = plus2.ios) === null || _a2 === void 0 ? void 0 : _a2.bundleId) !== null && _b2 !== void 0 ? _b2 : "";
      }, "");
      return v || tryRun(() => {
        var _a2, _b2;
        return (_b2 = (_a2 = plus2.runtime) === null || _a2 === void 0 ? void 0 : _a2.appid) !== null && _b2 !== void 0 ? _b2 : "";
      }, "");
    }
    return tryRun(() => {
      var _a2, _b2;
      return (_b2 = (_a2 = plus2.runtime) === null || _a2 === void 0 ? void 0 : _a2.appid) !== null && _b2 !== void 0 ? _b2 : "";
    }, "");
  }
  function getAppName() {
    const plus2 = getPlus();
    if (!plus2)
      return "";
    return tryRun(() => {
      var _a, _b;
      return (_b = (_a = plus2.runtime) === null || _a === void 0 ? void 0 : _a.appname) !== null && _b !== void 0 ? _b : "";
    }, "") || tryRun(() => {
      var _a, _b;
      return (_b = (_a = plus2.runtime) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "";
    }, "");
  }
  function getEnvAppName() {
    var _a;
    return (_a = "同学录 Classbook") !== null && _a !== void 0 ? _a : "";
  }
  function getH5AppName() {
    const env = getEnvAppName();
    if (env)
      return env;
    return tryRun(() => {
      var _a, _b;
      return (_b = (_a = getGlobalObject().document) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : "";
    }, "");
  }
  function getPackageInfo() {
    if (cached$1)
      return cached$1;
    const platform = getPlatform();
    let mpn = "";
    let tdaid = "";
    let pkn = "";
    let an = "";
    if (isApp()) {
      tdaid = tryRun(() => {
        var _a, _b, _c;
        return (_c = (_b = (_a = getPlus()) === null || _a === void 0 ? void 0 : _a.runtime) === null || _b === void 0 ? void 0 : _b.appid) !== null && _c !== void 0 ? _c : "";
      }, "");
      pkn = getAppPkn() || tdaid;
      an = getAppName() || getEnvAppName();
      mpn = pkn || tdaid;
    } else if (isMp()) {
      tdaid = getMpTdaid(platform);
      pkn = "";
      an = getEnvAppName();
      mpn = tdaid || "__UNI__137BD60";
    } else if (isH5()) {
      tdaid = "";
      pkn = "";
      an = getH5AppName();
      mpn = "";
    } else {
      tdaid = "";
      pkn = "";
      an = getEnvAppName();
      mpn = "";
    }
    cached$1 = { mpn, tdaid, pkn, an };
    return cached$1;
  }
  const EMPTY_WEB_INFO = { domain: "" };
  let cached = null;
  function readWebDomainFromLocation(loc) {
    const protocol = typeof loc.protocol === "string" ? loc.protocol.toLowerCase() : "";
    if (protocol !== "http:" && protocol !== "https:")
      return "";
    if (typeof loc.origin === "string" && loc.origin.trim()) {
      return loc.origin.trim();
    }
    const host = typeof loc.host === "string" && loc.host.trim() ? loc.host.trim() : typeof loc.hostname === "string" ? loc.hostname.trim() : "";
    if (!host)
      return "";
    return `${protocol}//${host}`;
  }
  function getWebInfo() {
    if (!isH5())
      return EMPTY_WEB_INFO;
    if (cached !== null)
      return cached;
    cached = tryRun(() => {
      const win = getGlobalObject();
      const loc = win.location;
      if (!loc)
        return EMPTY_WEB_INFO;
      return { domain: readWebDomainFromLocation(loc) };
    }, EMPTY_WEB_INFO);
    return cached;
  }
  const registry = /* @__PURE__ */ new Map();
  const installedFanout = /* @__PURE__ */ new Map();
  function add(api, handlers) {
    var _a;
    const set2 = (_a = registry.get(api)) !== null && _a !== void 0 ? _a : /* @__PURE__ */ new Set();
    set2.add(handlers);
    registry.set(api, set2);
    reinstall(api);
    return () => {
      const cur = registry.get(api);
      if (!cur)
        return;
      cur.delete(handlers);
      if (cur.size === 0) {
        registry.delete(api);
        const prev = installedFanout.get(api);
        installedFanout.delete(api);
        if (prev) {
          try {
            getUni$2().removeInterceptor(api, prev);
          } catch (_a2) {
          }
        }
      } else {
        reinstall(api);
      }
    };
  }
  function buildFanout(set2) {
    return {
      invoke(args) {
        let blocked = false;
        for (const h of set2) {
          if (!h.invoke)
            continue;
          const r = h.invoke(args);
          if (r === false)
            blocked = true;
        }
        return blocked ? false : void 0;
      },
      success(res) {
        var _a;
        for (const h of set2)
          (_a = h.success) === null || _a === void 0 ? void 0 : _a.call(h, res);
      },
      fail(err) {
        var _a;
        for (const h of set2)
          (_a = h.fail) === null || _a === void 0 ? void 0 : _a.call(h, err);
      },
      complete(res) {
        var _a;
        for (const h of set2)
          (_a = h.complete) === null || _a === void 0 ? void 0 : _a.call(h, res);
      },
      returnValue(res) {
        let v = res;
        for (const h of set2) {
          if (!h.returnValue)
            continue;
          v = h.returnValue(v);
        }
        return v;
      }
    };
  }
  function reinstall(api) {
    const set2 = registry.get(api);
    if (!set2 || set2.size === 0)
      return;
    const fanout = buildFanout(set2);
    try {
      const uni2 = getUni$2();
      const prev = installedFanout.get(api);
      if (prev) {
        try {
          uni2.removeInterceptor(api, prev);
        } catch (_a) {
        }
      }
      uni2.addInterceptor(api, fanout);
      installedFanout.set(api, fanout);
    } catch (_b) {
    }
  }
  function getUni$2() {
    const raw = resolveUniRuntime();
    const u = raw != null && typeof raw === "object" ? raw : void 0;
    if (!u)
      throw new Error("[uni统计 2.0] uni interceptor API is not available");
    return u;
  }
  function __reset() {
    registry.clear();
    installedFanout.clear();
  }
  const interceptor = { add, __reset };
  function registerLoginInterceptor(reporter) {
    return interceptor.add("login", {
      complete() {
        reporter.report({ lt: LT.Event, custom: { e_n: "login" } });
      }
    });
  }
  function registerNavigationBarInterceptor() {
    return interceptor.add("setNavigationBarTitle", {
      invoke(args) {
        const a = args;
        if (a && "title" in a)
          setPageTitle(a.title);
      }
    });
  }
  function registerPaymentInterceptor(reporter) {
    return interceptor.add("requestPayment", {
      success() {
        reporter.report({ lt: LT.Event, custom: { e_n: "pay_success" } });
      },
      fail() {
        reporter.report({ lt: LT.Event, custom: { e_n: "pay_fail" } });
      }
    });
  }
  function registerShareInterceptor(reporter) {
    const fire = () => reporter.report({ lt: LT.Event, custom: { e_n: "share" } });
    return interceptor.add("share", {
      success() {
        fire();
      },
      fail() {
        fire();
      }
    });
  }
  function installAllInterceptors(reporter) {
    const unbinders = [
      registerLoginInterceptor(reporter),
      registerShareInterceptor(reporter),
      registerPaymentInterceptor(reporter),
      registerNavigationBarInterceptor()
    ];
    return () => {
      for (const u of unbinders) {
        try {
          u();
        } catch (_a) {
        }
      }
    };
  }
  const KEY_DONE = "migration:done";
  const KEY_MAP = [
    ["__first__visit__time", "visit:fvts"],
    ["__last__visit__time", "visit:lvts"],
    ["__total__visit__count", "visit:tvc"]
  ];
  function getAppId() {
    const id = "__UNI__137BD60";
    if (id.length > 0)
      return id;
    return "default";
  }
  function readLegacyAggregate() {
    const u = resolveUniRuntime();
    if (!u || typeof u.getStorageSync !== "function")
      return null;
    const key = `${LEGACY_NAMESPACE_ROOT}:${getAppId()}`;
    const raw = tryRun(() => u.getStorageSync(key), null);
    if (raw && typeof raw === "object")
      return raw;
    return null;
  }
  let ran = false;
  function migrateLegacyData() {
    if (ran)
      return false;
    ran = true;
    const doneR = storage.safeRead(KEY_DONE);
    if (doneR.ok && doneR.value)
      return false;
    const legacy = readLegacyAggregate();
    if (!legacy) {
      storage.set(KEY_DONE, 1);
      return false;
    }
    let migrated = 0;
    for (let i = 0; i < KEY_MAP.length; i++) {
      const [oldKey, newKey] = KEY_MAP[i];
      if (!(oldKey in legacy))
        continue;
      const value = legacy[oldKey];
      const existing = storage.safeRead(newKey);
      if (existing.ok && existing.value !== void 0)
        continue;
      storage.set(newKey, value);
      migrated++;
    }
    storage.set(KEY_DONE, 1);
    if (migrated > 0) {
      logger.info("[uni统计 2.0] migrated legacy keys", migrated);
    }
    return migrated > 0;
  }
  function selectChannel(opts) {
    var _a;
    const version = (_a = opts.version) !== null && _a !== void 0 ? _a : "image";
    const fallback = opts.fallbackToHttp !== false;
    if (version === "1") {
      if (opts.http && opts.http.available())
        return opts.http;
      return void 0;
    }
    if (version === "2") {
      if (opts.cloud && opts.cloud.available())
        return opts.cloud;
      if (!fallback) {
        logger.warn("[uni统计 2.0] 云函数上报不可用且已关闭 HTTP 兜底，本批已丢弃");
        return void 0;
      }
      if (opts.http && opts.http.available()) {
        logger.warn("[uni统计 2.0] 云函数上报不可用，已降级为 HTTP 上报");
        return opts.http;
      }
      logger.warn("[uni统计 2.0] 无可用上报线路");
      return void 0;
    }
    if (opts.image && opts.image.available())
      return opts.image;
    if (!fallback) {
      if (opts.image) {
        logger.warn("[uni统计 2.0] 统计上报线路不可用且已关闭 HTTP 兜底，本批已丢弃");
      }
      return void 0;
    }
    if (opts.http && opts.http.available()) {
      if (opts.image) {
        logger.warn("[uni统计 2.0] 统计上报线路不可用，已降级为 HTTP 上报");
      }
      return opts.http;
    }
    logger.warn("[uni统计 2.0] 无可用上报线路");
    return void 0;
  }
  const DEFAULT_RESULT = { net: "unknown", raw: "" };
  const NET_MAP = {
    wifi: "wifi",
    "2g": "2g",
    "3g": "3g",
    "4g": "4g",
    "5g": "5g",
    ethernet: "ethernet",
    none: "none",
    unknown: "unknown"
  };
  function getUni$1() {
    const u = resolveUniRuntime();
    return u != null && typeof u === "object" ? u : void 0;
  }
  function normalizeNet(raw) {
    var _a;
    if (typeof raw !== "string" || raw.length === 0)
      return "unknown";
    return (_a = NET_MAP[raw.toLowerCase()]) !== null && _a !== void 0 ? _a : "unknown";
  }
  function getNet(timeoutMs = 1500) {
    return new Promise((resolve) => {
      const u = getUni$1();
      if (!u || typeof u.getNetworkType !== "function") {
        resolve(DEFAULT_RESULT);
        return;
      }
      let settled = false;
      const finish = (r) => {
        if (settled)
          return;
        settled = true;
        resolve(r);
      };
      const timer = setTimeout(() => finish(DEFAULT_RESULT), timeoutMs);
      tryRun(() => u.getNetworkType({
        success: (res) => {
          var _a;
          clearTimeout(timer);
          const raw = (_a = res === null || res === void 0 ? void 0 : res.networkType) !== null && _a !== void 0 ? _a : "";
          finish({ net: normalizeNet(raw), raw });
        },
        fail: () => {
          clearTimeout(timer);
          finish(DEFAULT_RESULT);
        }
      }), void 0);
    });
  }
  function onChange(cb) {
    const u = getUni$1();
    if (!u || typeof u.onNetworkStatusChange !== "function") {
      return () => {
      };
    }
    const wrapped = (res) => {
      var _a;
      const raw = (_a = res === null || res === void 0 ? void 0 : res.networkType) !== null && _a !== void 0 ? _a : "";
      const net = (res === null || res === void 0 ? void 0 : res.isConnected) === false ? "none" : normalizeNet(raw);
      tryRun(() => cb({ net, raw }), void 0);
    };
    tryRun(() => u.onNetworkStatusChange(wrapped), void 0);
    return () => {
      if (typeof u.offNetworkStatusChange === "function") {
        tryRun(() => u.offNetworkStatusChange(wrapped), void 0);
      }
    };
  }
  function isOfflineNetResult(r) {
    return r.net === "none";
  }
  function isNetworkOffline() {
    return __awaiter(this, void 0, void 0, function* () {
      const r = yield getNet();
      return isOfflineNetResult(r);
    });
  }
  function onNetworkOnline(cb) {
    return onChange((r) => {
      if (isOfflineNetResult(r))
        return;
      cb();
    });
  }
  const STORAGE_KEY$1 = "queue";
  const DEFAULT_SINGLE_EVENT_MAX_BYTES = SINGLE_EVENT_MAX_BYTES;
  const state = {
    bucket: {},
    lastFlushAt: 0
  };
  let intervalSec = REPORT_INTERVAL_SEC;
  let singleEventMaxBytes = DEFAULT_SINGLE_EVENT_MAX_BYTES;
  let maxEvents = QUEUE_MAX_EVENTS;
  let restored = false;
  let capacityWarned = false;
  function configure(opts) {
    if (typeof opts.intervalSec === "number" && opts.intervalSec >= 0) {
      intervalSec = Math.floor(opts.intervalSec);
    }
    if (typeof opts.singleEventMaxBytes === "number" && opts.singleEventMaxBytes > 0) {
      singleEventMaxBytes = Math.floor(opts.singleEventMaxBytes);
    }
    if (typeof opts.maxEvents === "number" && opts.maxEvents > 0) {
      maxEvents = Math.floor(opts.maxEvents);
    }
  }
  function enforceCapacity() {
    let total = size();
    if (total <= maxEvents) {
      capacityWarned = false;
      return;
    }
    const dropped = total - maxEvents;
    while (total > maxEvents) {
      let largestLt = "";
      let largestLen = 0;
      for (const lt of Object.keys(state.bucket)) {
        const len = state.bucket[lt].length;
        if (len > largestLen) {
          largestLen = len;
          largestLt = lt;
        }
      }
      if (!largestLt || largestLen === 0)
        break;
      state.bucket[largestLt].shift();
      if (state.bucket[largestLt].length === 0)
        delete state.bucket[largestLt];
      total--;
    }
    if (!capacityWarned) {
      capacityWarned = true;
      logger.warn("[uni统计 2.0] 上报队列超过容量上限，已丢弃最旧事件", "dropped=" + dropped, "limit=" + maxEvents);
    }
  }
  function persistBucket() {
    if (Object.keys(state.bucket).length === 0) {
      storage.remove(STORAGE_KEY$1);
      return;
    }
    try {
      storage.set(STORAGE_KEY$1, state.bucket);
    } catch (e) {
      logger.warn("[uni统计 2.0] queue persist failed", e);
    }
  }
  function restoreOnce() {
    if (restored)
      return;
    restored = true;
    const raw = storage.safeRead(STORAGE_KEY$1);
    if (!raw.ok || !raw.value || typeof raw.value !== "object")
      return;
    const persisted = raw.value;
    for (const lt of Object.keys(persisted)) {
      const arr = persisted[lt];
      if (!Array.isArray(arr) || arr.length === 0)
        continue;
      if (!state.bucket[lt])
        state.bucket[lt] = [];
      state.bucket[lt].push(...arr);
    }
  }
  function enqueue(data) {
    var _a;
    if (!data || typeof data !== "object")
      return;
    const lt = String((_a = data.lt) !== null && _a !== void 0 ? _a : "");
    if (!lt) {
      logger.warn("[uni统计 2.0] enqueue dropped: missing lt", data);
      return;
    }
    let serialized = "";
    try {
      serialized = JSON.stringify(data);
    } catch (e) {
      logger.warn("[uni统计 2.0] enqueue dropped: stringify failed", e);
      return;
    }
    if (serialized.length > singleEventMaxBytes) {
      logger.warn("[uni统计 2.0] enqueue dropped: single event too large", "lt=" + lt, "bytes=" + serialized.length, "limit=" + singleEventMaxBytes);
      return;
    }
    restoreOnce();
    if (!state.bucket[lt])
      state.bucket[lt] = [];
    state.bucket[lt].push(data);
    enforceCapacity();
    persistBucket();
  }
  function shouldFlush(force = false) {
    if (force)
      return true;
    if (intervalSec <= 0)
      return true;
    const elapsedSec = (nowMs() - state.lastFlushAt) / 1e3;
    return elapsedSec >= intervalSec;
  }
  function flush() {
    restoreOnce();
    const lts = Object.keys(state.bucket);
    if (lts.length === 0)
      return void 0;
    const snapshot = state.bucket;
    state.bucket = {};
    state.lastFlushAt = nowMs();
    storage.remove(STORAGE_KEY$1);
    return snapshot;
  }
  function rollback(snapshot) {
    if (!snapshot)
      return;
    for (const lt of Object.keys(snapshot)) {
      const arr = snapshot[lt];
      if (!Array.isArray(arr) || arr.length === 0)
        continue;
      if (!state.bucket[lt])
        state.bucket[lt] = [];
      state.bucket[lt] = arr.concat(state.bucket[lt]);
    }
    enforceCapacity();
    persistBucket();
  }
  function size() {
    let n2 = 0;
    for (const lt of Object.keys(state.bucket)) {
      n2 += state.bucket[lt].length;
    }
    return n2;
  }
  const STORAGE_KEY = "retry:queue";
  const DEFAULT_MAX_ITEMS = 50;
  const DEFAULT_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1e3;
  const DEFAULT_MAX_ATTEMPTS = RETRY_MAX_ATTEMPTS;
  const config = {
    maxItems: DEFAULT_MAX_ITEMS,
    maxAgeMs: DEFAULT_MAX_AGE_MS,
    maxAttempts: DEFAULT_MAX_ATTEMPTS
  };
  function readQueue() {
    const raw = storage.safeRead(STORAGE_KEY);
    if (!raw.ok || !Array.isArray(raw.value))
      return [];
    return raw.value.filter((it) => it && typeof it.id === "string" && it.payload && typeof it.payload === "object");
  }
  function writeQueue(items) {
    if (items.length === 0) {
      storage.remove(STORAGE_KEY);
      return;
    }
    storage.set(STORAGE_KEY, items);
  }
  function genId(payload) {
    if (payload._id)
      return payload._id;
    return "r-" + nowMs().toString(36) + "-" + Math.random().toString(36).slice(2, 6);
  }
  function persist(payload) {
    if (!payload)
      return void 0;
    const id = genId(payload);
    const items = readQueue();
    if (items.some((it) => it.id === id)) {
      return id;
    }
    const item = {
      id,
      payload: Object.assign({}, payload, { _id: id }),
      createdAt: nowMs(),
      attempts: 0
    };
    items.push(item);
    while (items.length > config.maxItems) {
      const dropped = items.shift();
      logger.warn("[uni统计 2.0] retry queue overflow, drop oldest", dropped === null || dropped === void 0 ? void 0 : dropped.id);
    }
    writeQueue(items);
    return id;
  }
  function loadAll() {
    const items = readQueue();
    if (items.length === 0)
      return [];
    const cutoff = nowMs() - config.maxAgeMs;
    const alive = [];
    for (const it of items) {
      if (it.createdAt < cutoff) {
        logger.warn("[uni统计 2.0] retry item expired, drop", it.id);
        continue;
      }
      alive.push(it);
    }
    if (alive.length !== items.length)
      writeQueue(alive);
    return alive.map((it) => it.payload);
  }
  function ack(id) {
    if (!id)
      return;
    const items = readQueue();
    const next = items.filter((it) => it.id !== id);
    if (next.length === items.length)
      return;
    writeQueue(next);
  }
  function markAttempt(id) {
    if (!id)
      return;
    const items = readQueue();
    let nextItems = null;
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (it.id !== id)
        continue;
      it.attempts++;
      if (it.attempts >= config.maxAttempts) {
        logger.warn("[uni统计 2.0] retry item exceeded maxAttempts, drop as dead letter", id, "attempts=" + it.attempts);
        nextItems = items.slice(0, i).concat(items.slice(i + 1));
      } else {
        nextItems = items;
      }
      break;
    }
    if (nextItems)
      writeQueue(nextItems);
  }
  let instance = null;
  class StatApp {
    constructor() {
      this.installed = false;
      this.statVersion = "image";
    }
    static getInstance() {
      if (!instance)
        instance = new StatApp();
      return instance;
    }
    /**
     * 一次性装配。重复调用直接返回。
     *
     * @param config 业务配置；缺省值兼容私有版默认行为。
     * @param overrides 测试钩子。
     */
    install(config2 = {}, overrides = {}) {
      var _a, _b, _c, _d, _e;
      if (this.installed)
        return;
      const cfg = this.normalizeConfig(config2);
      this.config = cfg;
      this.statVersion = cfg.version;
      tryRun(() => configure$1({
        backgroundTimeoutSec: cfg.backgroundTimeoutSec,
        pageInactiveTimeoutSec: cfg.pageInactiveTimeoutSec
      }), void 0);
      tryRun(() => configure({ intervalSec: cfg.reportIntervalSec }), void 0);
      if (!overrides.skipMigration) {
        tryRun(() => migrateLegacyData(), false);
      }
      tryRun(() => loadVisitSnapshot(), void 0);
      this.httpChannel = (_b = (_a = overrides.channels) === null || _a === void 0 ? void 0 : _a.http) !== null && _b !== void 0 ? _b : createHttpChannel({ ut: getPlatform(), maxRetries: HTTP_MAX_RETRIES });
      if (overrides.channels && "cloud" in overrides.channels) {
        this.cloudChannel = (_c = overrides.channels.cloud) !== null && _c !== void 0 ? _c : void 0;
      } else if (this.statVersion === "2") {
        this.cloudChannel = createCloudChannel({ maxRetries: CLOUD_MAX_RETRIES });
      } else {
        this.cloudChannel = void 0;
      }
      if (overrides.channels && "image" in overrides.channels) {
        this.imageChannel = (_d = overrides.channels.image) !== null && _d !== void 0 ? _d : void 0;
      } else if (this.statVersion === "image") {
        this.imageChannel = createImageChannel({
          host: IMAGE_REPORT_DEFAULTS.host,
          projectId: IMAGE_REPORT_DEFAULTS.projectId,
          topicId: IMAGE_REPORT_DEFAULTS.topicId,
          maxRetries: IMAGE_MAX_RETRIES,
          ut: getPlatform(),
          rawPlatform: getRawPlatform()
        });
      } else {
        this.imageChannel = void 0;
      }
      this.collectorDeps = this.buildCollectorDeps(cfg, (_e = overrides.collectorDepsPatch) !== null && _e !== void 0 ? _e : {});
      this.collector = createCollector(this.collectorDeps);
      if (!overrides.skipInterceptors) {
        const c = this.collector;
        this.uninstallInterceptors = tryRun(() => installAllInterceptors({ report: (i) => c.report(i) }), void 0);
      }
      if (!overrides.skipRecoverRetry) {
        void this.collector.recoverRetry().catch((e) => logger.warn("[uni统计 2.0] recoverRetry failed", e));
      }
      this.uninstallNetworkWatch = tryRun(() => onNetworkOnline(() => {
        const c = this.collector;
        if (!c)
          return;
        void c.recoverRetry().catch((e) => logger.warn("[uni统计 2.0] recoverRetry on online failed", e));
        void c.flush(true).catch((e) => logger.warn("[uni统计 2.0] flush on online failed", e));
      }), void 0);
      this.installed = true;
    }
    /**
     * 业务侧 `uni.report(type, value)` 入口。
     *
     * 兼容私有版语义：
     *   - `type === 'title'` → 写 reportTitle，不发事件；下次 lt=11 / lt=3 携带 `ttc`。
     *   - 其他 type → 自定义事件 lt=21，custom `{ e_n: type, e_v: value }`。
     */
    report(type, value) {
      if (!this.installed || !this.collector)
        return;
      if (type === "title") {
        setReportTitle(value);
        return;
      }
      const ev = typeof value === "object" && value !== null ? tryRun(() => JSON.stringify(value), "") : value === void 0 ? "" : String(value);
      this.collector.report({
        lt: LT.Event,
        custom: { e_n: type, e_v: ev }
      });
    }
    /** 上报 onError 捕获的错误。 */
    reportError(err) {
      var _a;
      if (!this.installed || !this.collector)
        return;
      const errMsg = err instanceof Error ? `${err.name}: ${err.message}
${(_a = err.stack) !== null && _a !== void 0 ? _a : ""}` : typeof err === "string" ? err : tryRun(() => JSON.stringify(err), "");
      this.collector.report({ lt: LT.Error, errMsg });
    }
    /** 取 collector，供 lifecycleHooks 调度生命周期事件。 */
    getCollector() {
      return this.collector;
    }
    /** 取 deps（测试用）。 */
    getDeps() {
      return this.collectorDeps;
    }
    /** 是否已 install。 */
    isInstalled() {
      return this.installed;
    }
    /** 当前协议版本。 */
    getStatVersion() {
      return this.statVersion;
    }
    /** 当前生效配置（含默认值合并），测试用。 */
    getConfig() {
      return this.config;
    }
    /**
     * 卸载（测试 / hot reload）。
     *
     * 解绑全部拦截器、清空内部句柄。**不**清外部模块（queue/visit/session）状态，
     * 那些由各自的 `__reset*` 在测试 setup 中处理。
     */
    uninstall() {
      if (this.uninstallInterceptors) {
        tryRun(() => this.uninstallInterceptors(), void 0);
      }
      this.uninstallInterceptors = void 0;
      if (this.uninstallNetworkWatch) {
        tryRun(() => this.uninstallNetworkWatch(), void 0);
      }
      this.uninstallNetworkWatch = void 0;
      if (this.collector) {
        tryRun(() => this.collector.destroy(), void 0);
      }
      this.collector = void 0;
      this.collectorDeps = void 0;
      this.httpChannel = void 0;
      this.cloudChannel = void 0;
      this.imageChannel = void 0;
      this.config = void 0;
      this.installed = false;
    }
    /**
     * 解析上行渠道字段 `ch`。
     *
     * App 渠道包标识只能以原生运行时为准：`plus.runtime.channel`。
     * `manifest.uniStatistics.ch` 是静态配置，不能区分同一项目打出的多渠道包。
     * 非 App 端没有 `plus.runtime.channel` 语义，保留手动 install 传入 `ch` 的能力。
     */
    resolveChannel(explicit) {
      if (isApp()) {
        return getAppChannel();
      }
      if (typeof explicit === "string" && explicit.length > 0) {
        return explicit;
      }
      return "";
    }
    resolveFirstFlushDeferMs() {
      if (getRawPlatform() === "mp-weixin" && MP_WEIXIN_USE_PRELOAD_ASSETS_REPORT) {
        return MP_WEIXIN_PRELOAD_FIRST_FLUSH_DELAY_MS;
      }
      if (isApp() && !getAppChannel()) {
        return APP_CHANNEL_FIRST_FLUSH_DELAY_MS;
      }
      return 0;
    }
    normalizeConfig(c) {
      var _a, _b, _c, _d;
      return {
        ak: (_a = c.ak) !== null && _a !== void 0 ? _a : getAppId$1(),
        v: c.v,
        ch: this.resolveChannel(c.ch),
        version: (_b = c.version) !== null && _b !== void 0 ? _b : "image",
        backgroundTimeoutSec: (_c = c.backgroundTimeoutSec) !== null && _c !== void 0 ? _c : 300,
        pageInactiveTimeoutSec: (_d = c.pageInactiveTimeoutSec) !== null && _d !== void 0 ? _d : 1800,
        reportIntervalSec: typeof c.reportIntervalSec === "number" ? c.reportIntervalSec : REPORT_INTERVAL_SEC,
        // collectItems 默认值与私有版严格对齐：push 默认关闭、页面日志默认开启
        enablePush: c.enablePush === true,
        enablePageLog: c.enablePageLog !== false
      };
    }
    /**
     * 构建 collector 依赖。所有 adapter 调用都包了 `tryRun`，避免单端缺失 API 导致
     * install 失败。
     */
    buildCollectorDeps(cfg, patch) {
      const platformShort = getPlatform();
      const builder = createStatDataBuilder({
        config: {
          ak: cfg.ak,
          usv: STAT_VERSION_PUBLIC,
          v: cfg.v,
          get ch() {
            return isApp() ? getAppChannel() : cfg.ch;
          }
        },
        platform: {
          ut: platformShort
        },
        system: tryRun(() => getSystemInfo(), {
          brand: "",
          md: "",
          sv: "",
          v: "",
          ut: "unknown",
          appVersion: "",
          appWgtVersion: "",
          mpvHostVersion: "",
          on: "",
          sdkVersion: "",
          statusBarHeight: 0,
          osP: ""
        }),
        locale: tryRun(() => getLocaleAndScreen(), {
          lang: "",
          ww: 0,
          wh: 0,
          sw: 0,
          sh: 0,
          pr: 1
        }),
        device: {
          // 惰性解析：每次 build 时再调 getUuid()，避免 install 过早（uni 运行时未就绪）冻结临时值。
          get uuid() {
            return tryRun(() => getUuid(), "");
          }
        },
        net: { net: "unknown", raw: "" },
        location: { lat: "", lng: "", ok: false },
        pkg: tryRun(() => getPackageInfo(), {
          mpn: "",
          tdaid: "",
          pkn: "",
          an: ""
        }),
        web: tryRun(() => getWebInfo(), { domain: "" })
      });
      const base = {
        builder,
        queue: {
          enqueue,
          flush,
          rollback,
          shouldFlush
        },
        serializer: { handleData },
        selectChannel: () => selectChannel({
          version: this.statVersion,
          http: this.httpChannel,
          cloud: this.cloudChannel,
          image: this.imageChannel
        }),
        retry: {
          persist,
          loadAll,
          ack,
          markAttempt
        },
        visit: {
          commitVisitOnAck,
          rollbackPendingVisit
        },
        session: {
          getSnapshot,
          nextSeq,
          touch
        },
        config: { usv: STAT_VERSION_PUBLIC },
        resolveUploadFields: () => {
          const ch = getAppChannel();
          return ch ? { ch } : {};
        },
        nowMs,
        nowSec,
        firstFlushDeferMs: this.resolveFirstFlushDeferMs(),
        isNetworkOffline
      };
      return Object.assign(base, patch);
    }
  }
  function getStatApp() {
    return StatApp.getInstance();
  }
  function parseInjectedUniStatistics() {
    const raw = "{}";
    const trimmed = raw.trim();
    if (!trimmed || trimmed === "undefined")
      return void 0;
    try {
      const obj = JSON.parse(trimmed);
      if (!obj || typeof obj !== "object" || Array.isArray(obj))
        return void 0;
      return obj;
    } catch (_e) {
      return void 0;
    }
  }
  function readManifestStatConfig() {
    try {
      const obj = parseInjectedUniStatistics();
      if (!obj)
        return void 0;
      const cfg = {};
      if (obj.channelVersion != null) {
        const v = String(obj.channelVersion);
        if (v === "1" || v === "2" || v === "image")
          cfg.version = v;
      }
      const bg = pickPositiveNumber(obj.backgroundTimeout, obj.backgroundTimeoutSec);
      if (bg !== void 0)
        cfg.backgroundTimeoutSec = bg;
      const pi = pickPositiveNumber(obj.pageInactiveTimeout, obj.pageInactiveTimeoutSec);
      if (pi !== void 0)
        cfg.pageInactiveTimeoutSec = pi;
      const ri = pickNonNegativeNumber(obj.reportInterval, obj.reportIntervalSec);
      if (ri !== void 0)
        cfg.reportIntervalSec = ri;
      if (obj.collectItems && typeof obj.collectItems === "object") {
        const items = obj.collectItems;
        if (typeof items.uniPushClientID === "boolean") {
          cfg.enablePush = items.uniPushClientID;
        }
        if (typeof items.uniStatPageLog === "boolean") {
          cfg.enablePageLog = items.uniStatPageLog;
        }
      }
      return Object.keys(cfg).length > 0 ? cfg : void 0;
    } catch (e) {
      logger.warn("[uni统计 2.0] readManifestStatConfig failed", e);
      return void 0;
    }
  }
  function normalizePositiveNumber(value) {
    if (typeof value === "number") {
      return value > 0 ? value : void 0;
    }
    if (typeof value === "string") {
      const t = value.trim();
      if (t === "")
        return void 0;
      const n2 = Number(t);
      if (Number.isFinite(n2) && n2 > 0)
        return n2;
    }
    return void 0;
  }
  function normalizeNonNegativeNumber(value) {
    if (typeof value === "number") {
      return value >= 0 ? value : void 0;
    }
    if (typeof value === "string") {
      const t = value.trim();
      if (t === "")
        return void 0;
      const n2 = Number(t);
      if (Number.isFinite(n2) && n2 >= 0)
        return n2;
    }
    return void 0;
  }
  function pickPositiveNumber(...candidates) {
    for (const c of candidates) {
      const n2 = normalizePositiveNumber(c);
      if (n2 !== void 0)
        return n2;
    }
    return void 0;
  }
  function pickNonNegativeNumber(...candidates) {
    for (const c of candidates) {
      const n2 = normalizeNonNegativeNumber(c);
      if (n2 !== void 0)
        return n2;
    }
    return void 0;
  }
  function getUni() {
    const u = resolveUniRuntime();
    return u != null && typeof u === "object" ? u : void 0;
  }
  const UNI_HOOK_RETRY_MAX = 20;
  const UNI_HOOK_RETRY_MS = 50;
  let vueMixinMounted = false;
  let vueMixinRetryTimer;
  let bootstrapped = false;
  let uniHookRetryTimer;
  function installPublicStat(opts = {}) {
    if (bootstrapped)
      return;
    bootstrapped = true;
    const fromManifest = readManifestStatConfig();
    const finalConfig = Object.assign({}, fromManifest, opts.config);
    const app = getStatApp();
    tryRun(() => app.install(finalConfig, opts.overrides), void 0);
    tryRun(() => {
      var _a, _b, _c;
      const cfgBoot = app.getConfig();
      const appName = "同学录 Classbook";
      const injected = parseInjectedUniStatistics();
      const bootBase = {
        channel: (_a = cfgBoot === null || cfgBoot === void 0 ? void 0 : cfgBoot.version) !== null && _a !== void 0 ? _a : "image",
        reportIntervalSec: (_b = cfgBoot === null || cfgBoot === void 0 ? void 0 : cfgBoot.reportIntervalSec) !== null && _b !== void 0 ? _b : 0,
        ak: (_c = cfgBoot === null || cfgBoot === void 0 ? void 0 : cfgBoot.ak) !== null && _c !== void 0 ? _c : "",
        appName,
        debugFromManifest: "false" === true
      };
      if (injected != null) {
        if (injected.backgroundTimeout != null || injected.backgroundTimeoutSec != null) {
          bootBase.backgroundTimeoutSec = cfgBoot === null || cfgBoot === void 0 ? void 0 : cfgBoot.backgroundTimeoutSec;
        }
        if (injected.pageInactiveTimeout != null || injected.pageInactiveTimeoutSec != null) {
          bootBase.pageInactiveTimeoutSec = cfgBoot === null || cfgBoot === void 0 ? void 0 : cfgBoot.pageInactiveTimeoutSec;
        }
      }
      logBoot(Object.assign({}, bootBase, { vueMode: "Vue3" }));
    }, void 0);
    const finishLifecycleInstall = () => {
      var _a, _b;
      const cfg = app.getConfig();
      const lifecycleOpts = Object.assign({}, {
        enablePush: (_a = cfg === null || cfg === void 0 ? void 0 : cfg.enablePush) !== null && _a !== void 0 ? _a : false,
        enablePageLog: (_b = cfg === null || cfg === void 0 ? void 0 : cfg.enablePageLog) !== null && _b !== void 0 ? _b : true
      }, opts.lifecycle);
      const { mixin, unbind } = bindLifecycle(app, lifecycleOpts);
      if (!opts.skipVueMixin) {
        tryRun(() => mountVueMixin(mixin), void 0);
      }
      if (!opts.skipUniReport) {
        tryRun(() => mountUniReport(app), void 0);
      }
      if (shouldBindUniAppLifecycle() && !tryBindUniAppLifecycle(app, lifecycleOpts)) {
        scheduleUniAppHookRetry(() => tryBindUniAppLifecycle(app, lifecycleOpts));
      }
    };
    finishLifecycleInstall();
  }
  function scheduleUniAppHookRetry(tryBind) {
    if (uniHookRetryTimer) {
      clearTimeout(uniHookRetryTimer);
      uniHookRetryTimer = void 0;
    }
    let attempts = 0;
    const tick = () => {
      if (tryBind())
        return;
      if (++attempts >= UNI_HOOK_RETRY_MAX) {
        logger.warn("[uni统计 2.0] Vue3 小程序：uni.onAppShow 暂不可用，应用前后台统计可能缺失");
        return;
      }
      uniHookRetryTimer = setTimeout(tick, UNI_HOOK_RETRY_MS);
    };
    uniHookRetryTimer = setTimeout(tick, UNI_HOOK_RETRY_MS);
  }
  function tryRegisterVueAppMixin(mixin) {
    try {
      ;
      uni.onCreateVueApp((vueApp) => {
        tryRun(() => vueApp.mixin(mixin), void 0);
      });
      return true;
    } catch (_e) {
    }
    const u = getUni();
    if (u && typeof u.onCreateVueApp === "function") {
      u.onCreateVueApp((vueApp) => {
        tryRun(() => vueApp.mixin(mixin), void 0);
      });
      return true;
    }
    return false;
  }
  function mountVueMixin(mixin) {
    if (vueMixinMounted)
      return;
    if (tryRegisterVueAppMixin(mixin)) {
      vueMixinMounted = true;
      return;
    }
    scheduleVueAppMixinRetry(mixin);
  }
  function scheduleVueAppMixinRetry(mixin) {
    if (vueMixinMounted)
      return;
    if (vueMixinRetryTimer)
      return;
    let attempts = 0;
    const tick = () => {
      vueMixinRetryTimer = void 0;
      if (vueMixinMounted)
        return;
      if (tryRegisterVueAppMixin(mixin)) {
        vueMixinMounted = true;
        return;
      }
      if (++attempts >= UNI_HOOK_RETRY_MAX) {
        if (!vueMixinMounted) {
          logger.warn("[uni统计 2.0] Vue3: onCreateVueApp 在重试后仍不可用，页面级 mixin 未注入");
        }
        return;
      }
      vueMixinRetryTimer = setTimeout(tick, UNI_HOOK_RETRY_MS);
    };
    vueMixinRetryTimer = setTimeout(tick, UNI_HOOK_RETRY_MS);
  }
  function mountUniReport(app) {
    var _a;
    const g = getGlobalObject();
    const u = (_a = getUni()) !== null && _a !== void 0 ? _a : g.uni;
    if (!u || typeof u !== "object")
      return;
    u.report = (type, value) => {
      app.report(type, value);
    };
  }
  installPublicStat();
  function createApp() {
    const app = vue.createVueApp(App);
    return { app };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
