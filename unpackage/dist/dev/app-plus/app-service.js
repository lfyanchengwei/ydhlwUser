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
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$9 = {
    data() {
      return {
        banners: [
          { id: 1, image: "/static/img/activity/news/new1.jpg" },
          { id: 2, image: "/static/img/activity/news/new2.jpg" },
          { id: 3, image: "/static/img/activity/news/new3.jpg" }
        ],
        categories: ["全部活动", "讲座", "比赛", "志愿活动"],
        selectedCategory: 0,
        activities: [
          {
            id: 1,
            image: "https://example.com/activity1.jpg",
            title: "志愿者招募活动",
            date: "2024-12-25",
            location: "社区中心",
            status: "可报名",
            statusClass: "status-available"
          },
          {
            id: 2,
            image: "https://example.com/activity2.jpg",
            title: "编程比赛",
            date: "2024-12-30",
            location: "大学礼堂",
            status: "报名已满",
            statusClass: "status-full"
          }
        ]
      };
    },
    onLoad() {
    },
    computed: {
      filteredActivities() {
        if (this.selectedCategory === 0)
          return this.activities;
        return this.activities.filter((activity) => activity.type === this.categories[this.selectedCategory]);
      }
    },
    methods: {
      selectCategory(index) {
        this.selectedCategory = index;
      },
      fetchActivities() {
        uni.request({
          url: "http://localhost:8883/api/events/list",
          method: "GET",
          success: (res) => {
            if (res.data.code === 1) {
              this.activities = res.data.data;
            } else {
              formatAppLog("error", "at pages/tabbar/tabbar-1/tabbar-1.vue:106", "Failed to fetch activities:", res.data.msg);
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/tabbar/tabbar-1/tabbar-1.vue:110", "Request failed:", err);
          }
        });
      }
    },
    mounted() {
      this.fetchActivities();
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "homepage" }, [
      vue.createCommentVNode(" 顶部导航栏 "),
      vue.createElementVNode("view", { class: "navbar" }, [
        vue.createElementVNode("text", { class: "title" }, "活动助手"),
        vue.createElementVNode("view", { class: "search-bar" }, [
          vue.createElementVNode("input", {
            type: "text",
            placeholder: "搜索活动"
          }),
          vue.createElementVNode("button", null, "搜索")
        ])
      ]),
      vue.createCommentVNode(" 活动分类展示 "),
      vue.createElementVNode("view", { class: "category-bar" }, [
        vue.createElementVNode("scroll-view", {
          "scroll-x": "true",
          class: "categories"
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.categories, (category, index) => {
              return vue.openBlock(), vue.createElementBlock("text", {
                class: vue.normalizeClass(["category-item", { "active-category": $data.selectedCategory === index }]),
                key: index,
                onClick: ($event) => $options.selectCategory(index)
              }, vue.toDisplayString(category), 11, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      vue.createCommentVNode(" 活动列表 "),
      vue.createElementVNode("view", { class: "activity-list" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($options.filteredActivities, (activity) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "activity-card",
              key: activity.eventId
            }, [
              vue.createElementVNode("image", {
                class: "activity-image",
                src: activity.picUrl
              }, null, 8, ["src"]),
              vue.createElementVNode("view", { class: "activity-info" }, [
                vue.createElementVNode(
                  "text",
                  { class: "activity-title" },
                  vue.toDisplayString(activity.title),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "activity-details" },
                  vue.toDisplayString(activity.eventDate) + " | " + vue.toDisplayString(activity.location),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "activity-status" },
                  "容量：" + vue.toDisplayString(activity.capacity),
                  1
                  /* TEXT */
                )
              ])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createCommentVNode(" 轮播图区域 "),
      vue.createElementVNode("view", { class: "carousel" }, [
        vue.createElementVNode("swiper", {
          autoplay: "true",
          interval: "3000",
          circular: "true"
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.banners, (banner) => {
              return vue.openBlock(), vue.createElementBlock("swiper-item", {
                key: banner.id
              }, [
                vue.createElementVNode("image", {
                  src: banner.image,
                  class: "banner-image"
                }, null, 8, ["src"])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      vue.createCommentVNode(" 公告栏 "),
      vue.createElementVNode("view", { class: "announcement" }, [
        vue.createElementVNode("text", null, "平台公告：新活动已上线，快来报名！")
      ])
    ]);
  }
  const PagesTabbarTabbar1Tabbar1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-02c5fac1"], ["__file", "D:/学习/大三上/微信小程序/HX/活动报名助手2/pages/tabbar/tabbar-1/tabbar-1.vue"]]);
  const _sfc_main$8 = {
    data() {
      return {
        title: "Hello"
      };
    },
    onLoad() {
    },
    methods: {}
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, " 页面 - 2 ");
  }
  const PagesTabbarTabbar2Tabbar2 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__file", "D:/学习/大三上/微信小程序/HX/活动报名助手2/pages/tabbar/tabbar-2/tabbar-2.vue"]]);
  const _imports_0 = "/static/logo.png";
  const _imports_1 = "/static/img/release.png";
  const _imports_2 = "/static/img/video.png";
  const _imports_3 = "/static/img/qa.png";
  const _sfc_main$7 = {
    data() {
      return {
        active: false
      };
    },
    onLoad() {
    },
    onShow() {
      this.active = true;
    },
    onHide() {
      this.active = false;
    },
    methods: {
      goToPage(url) {
        if (!url)
          return;
        uni.navigateTo({
          url
        });
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["content", { "active": $data.active }])
      },
      [
        vue.createElementVNode(
          "image",
          {
            class: vue.normalizeClass(["logo", { "active": $data.active }]),
            src: _imports_0,
            mode: "aspectFit"
          },
          null,
          2
          /* CLASS */
        ),
        vue.createElementVNode("view", { class: "tabbar-box-wrap" }, [
          vue.createElementVNode("view", { class: "tabbar-box" }, [
            vue.createElementVNode("view", {
              class: "tabbar-box-item",
              onClick: _cache[0] || (_cache[0] = ($event) => $options.goToPage("/pages/tabbar-3-detial/tabbar-3-release/tabbar-3-release"))
            }, [
              vue.createElementVNode("image", {
                class: "box-image",
                src: _imports_1,
                mode: "aspectFit"
              }),
              vue.createElementVNode("text", { class: "explain" }, "发图文")
            ]),
            vue.createElementVNode("view", {
              class: "tabbar-box-item",
              onClick: _cache[1] || (_cache[1] = ($event) => $options.goToPage("/pages/tabbar-3-detial/tabbar-3-video/tabbar-3-video"))
            }, [
              vue.createElementVNode("image", {
                class: "box-image",
                src: _imports_2,
                mode: "aspectFit"
              }),
              vue.createElementVNode("text", { class: "explain" }, "发视频")
            ]),
            vue.createElementVNode("view", {
              class: "tabbar-box-item",
              onClick: _cache[2] || (_cache[2] = ($event) => $options.goToPage("/pages/tabbar-3-detial/tabbar-3-qa/tabbar-3-qa"))
            }, [
              vue.createElementVNode("image", {
                class: "box-image",
                src: _imports_3,
                mode: "aspectFit"
              }),
              vue.createElementVNode("text", { class: "explain" }, "提问")
            ])
          ])
        ])
      ],
      2
      /* CLASS */
    );
  }
  const PagesTabbarTabbar3Tabbar3 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-afdd7fb7"], ["__file", "D:/学习/大三上/微信小程序/HX/活动报名助手2/pages/tabbar/tabbar-3/tabbar-3.vue"]]);
  const _sfc_main$6 = {
    data() {
      return {
        title: "Hello"
      };
    },
    onLoad() {
    },
    methods: {}
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, " 页面 - 4 ");
  }
  const PagesTabbarTabbar4Tabbar4 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__file", "D:/学习/大三上/微信小程序/HX/活动报名助手2/pages/tabbar/tabbar-4/tabbar-4.vue"]]);
  const _sfc_main$5 = {
    data() {
      return {
        userInfo: {
          username: "testuser",
          email: "testuser@example.com",
          role: "admin",
          createdAt: "2024-12-18T19:02:22"
        },
        acceptedActivities: [
          {
            eventId: 1,
            title: "技术分享会",
            eventDate: "2024-12-30T14:00:00"
          },
          {
            eventId: 2,
            title: "编程比赛",
            eventDate: "2024-12-25T10:00:00"
          }
        ]
      };
    },
    methods: {
      navigateToFeedback() {
        uni.navigateTo({ url: "/pages/feedback/feedback" });
      },
      logout() {
        uni.clearStorageSync();
        uni.reLaunch({ url: "/pages/login/login" });
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "personal-center" }, [
      vue.createCommentVNode(" 用户信息展示 "),
      vue.createElementVNode("view", { class: "card user-info" }, [
        vue.createElementVNode("view", { style: { "margin-bottom": "30px" } }, [
          vue.createElementVNode("text", { class: "section-title" }, "个人信息")
        ]),
        vue.createElementVNode("view", { class: "info-item" }, [
          vue.createElementVNode("text", { class: "info-label" }, "用户名："),
          vue.createElementVNode(
            "text",
            { class: "info-value" },
            vue.toDisplayString($data.userInfo.username),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "info-item" }, [
          vue.createElementVNode("text", { class: "info-label" }, "邮箱："),
          vue.createElementVNode(
            "text",
            { class: "info-value" },
            vue.toDisplayString($data.userInfo.email),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "info-item" }, [
          vue.createElementVNode("text", { class: "info-label" }, "角色："),
          vue.createElementVNode(
            "text",
            { class: "info-value" },
            vue.toDisplayString($data.userInfo.role),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "info-item" }, [
          vue.createElementVNode("text", { class: "info-label" }, "注册时间："),
          vue.createElementVNode(
            "text",
            { class: "info-value" },
            vue.toDisplayString($data.userInfo.createdAt),
            1
            /* TEXT */
          )
        ])
      ]),
      vue.createCommentVNode(" 活动履历 "),
      vue.createElementVNode("view", { class: "card activity-history" }, [
        vue.createElementVNode("view", { style: { "margin-bottom": "30px" } }, [
          vue.createElementVNode("text", { class: "section-title" }, "活动履历")
        ]),
        $data.acceptedActivities.length ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.acceptedActivities, (activity) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "activity-item",
                key: activity.eventId
              }, [
                vue.createElementVNode(
                  "text",
                  { class: "activity-title" },
                  vue.toDisplayString(activity.title),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "activity-date" },
                  "活动时间：" + vue.toDisplayString(activity.eventDate),
                  1
                  /* TEXT */
                )
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
          vue.createElementVNode("text", { class: "empty-text" }, "暂无已报名的活动")
        ]))
      ]),
      vue.createCommentVNode(" 功能区 "),
      vue.createElementVNode("view", { class: "functional-section" }, [
        vue.createElementVNode("button", {
          class: "btn-primary",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.navigateToFeedback && $options.navigateToFeedback(...args))
        }, "反馈与帮助"),
        vue.createElementVNode("button", {
          class: "btn-danger",
          onClick: _cache[1] || (_cache[1] = (...args) => $options.logout && $options.logout(...args))
        }, "退出登录")
      ])
    ]);
  }
  const PagesTabbarTabbar5Tabbar5 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-4fdee20d"], ["__file", "D:/学习/大三上/微信小程序/HX/活动报名助手2/pages/tabbar/tabbar-5/tabbar-5.vue"]]);
  const _sfc_main$4 = {
    data() {
      return {
        title: "Hello"
      };
    },
    onLoad() {
    },
    methods: {}
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, " 页面 - 发图文 ");
  }
  const PagesTabbar3DetialTabbar3ReleaseTabbar3Release = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__file", "D:/学习/大三上/微信小程序/HX/活动报名助手2/pages/tabbar-3-detial/tabbar-3-release/tabbar-3-release.vue"]]);
  const _sfc_main$3 = {
    data() {
      return {
        title: "Hello"
      };
    },
    onLoad() {
    },
    methods: {}
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, " 页面 - 发视频 ");
  }
  const PagesTabbar3DetialTabbar3VideoTabbar3Video = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "D:/学习/大三上/微信小程序/HX/活动报名助手2/pages/tabbar-3-detial/tabbar-3-video/tabbar-3-video.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {};
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, " 页面 - 提问 ");
  }
  const PagesTabbar3DetialTabbar3QaTabbar3Qa = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "D:/学习/大三上/微信小程序/HX/活动报名助手2/pages/tabbar-3-detial/tabbar-3-qa/tabbar-3-qa.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view");
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "D:/学习/大三上/微信小程序/HX/活动报名助手2/pages/login/login.vue"]]);
  __definePage("pages/tabbar/tabbar-1/tabbar-1", PagesTabbarTabbar1Tabbar1);
  __definePage("pages/tabbar/tabbar-2/tabbar-2", PagesTabbarTabbar2Tabbar2);
  __definePage("pages/tabbar/tabbar-3/tabbar-3", PagesTabbarTabbar3Tabbar3);
  __definePage("pages/tabbar/tabbar-4/tabbar-4", PagesTabbarTabbar4Tabbar4);
  __definePage("pages/tabbar/tabbar-5/tabbar-5", PagesTabbarTabbar5Tabbar5);
  __definePage("pages/tabbar-3-detial/tabbar-3-release/tabbar-3-release", PagesTabbar3DetialTabbar3ReleaseTabbar3Release);
  __definePage("pages/tabbar-3-detial/tabbar-3-video/tabbar-3-video", PagesTabbar3DetialTabbar3VideoTabbar3Video);
  __definePage("pages/tabbar-3-detial/tabbar-3-qa/tabbar-3-qa", PagesTabbar3DetialTabbar3QaTabbar3Qa);
  __definePage("pages/login/login", PagesLoginLogin);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
      setTimeout(() => {
        uni.setTabBarBadge({
          index: 1,
          text: "31"
        });
        uni.showTabBarRedDot({
          index: 3
        });
      }, 1e3);
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:17", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:20", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/学习/大三上/微信小程序/HX/活动报名助手2/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
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
