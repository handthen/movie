"use strict";
var common_vendor = require("./common/vendor.js");
var store_index = require("./store/index.js");
var uilts_isNetWork = require("./uilts/isNetWork.js");
const _sfc_main = {
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const pinia = store_index.Pinia();
    const isback = common_vendor.ref(false);
    const bar = common_vendor.reactive({
      barHight: 0,
      top: 0,
      title: ""
    });
    const router = getCurrentPages();
    isback.value = common_vendor.computed$1(() => {
      console.log(router[0].route);
      if (router.length == 1 && router[0].route == "pages/palyMovie/palyMovie")
        return true;
      if (router.length <= 1)
        return false;
      return true;
    });
    function back() {
      var _a;
      if (router.length == 1) {
        common_vendor.index.switchTab({ url: "/pages/index/index" });
      }
      let routePage = (_a = router == null ? void 0 : router.at(-2)) == null ? void 0 : _a.route;
      const isSweich = uilts_isNetWork.isTabBar(routePage);
      isSweich ? common_vendor.index.switchTab({ url: "/" + routePage }) : common_vendor.index.navigateBack({ delta: 1 });
    }
    common_vendor.onLoad(() => {
      let systeminfo = common_vendor.index.getSystemInfoSync();
      let rect = common_vendor.index.getMenuButtonBoundingClientRect();
      bar.barHight = (rect.top - systeminfo.statusBarHeight) * 2 + rect.height;
      bar.top = systeminfo.statusBarHeight;
      getCurrentPages().at(-1);
      bar.title = props.title;
      pinia.navBarHight = (rect.top - systeminfo.statusBarHeight) * 2 + rect.height + systeminfo.statusBarHeight;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isback.value
      }, isback.value ? {
        b: common_vendor.o(back)
      } : {}, {
        c: common_vendor.t(common_vendor.unref(bar).title),
        d: common_vendor.unref(bar).barHight + "px",
        e: common_vendor.unref(bar).top + "px"
      });
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6e9cc378"], ["__file", "D:/\u57F9\u8BAD/vs/state4/TEST/uniapp/movie/components/NavBar/NavBar.vue"]]);
exports.Component = Component;
