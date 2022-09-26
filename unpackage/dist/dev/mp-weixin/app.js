"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var uilts_isNetWork = require("./uilts/isNetWork.js");
var uilts_cloudFunc = require("./uilts/cloudFunc.js");
require("./store/index.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/classif/classif.js";
  "./pages/me/me.js";
  "./pages/palyMovie/palyMovie.js";
  "./components/swperMovie/swperMovie.js";
  "./components/NavBar/NavBar2.js";
  "./pages/collection/collection.js";
  "./pages/Error/Error.js";
  "./pages/historyList/historyList.js";
  "./components/loading/loading2.js";
  "./pages/feedback/feedback.js";
  "./pages/download/download.js";
  "./pages/search/search.js";
  "./components/model/model.js";
  "./pages/setting/setting.js";
  "./components/panel/panel.js";
  "./components/Lemsg/Lemsg.js";
  "./components/PinItem/PinItem.js";
}
const _sfc_main = {
  setup(__props) {
    common_vendor.provide("moviePlay", moviePlay);
    common_vendor.onLaunch(() => {
      wx.cloud.init({
        traceUser: true,
        env: "cloud1-6gszd9f08a0a2316"
      });
      uilts_isNetWork.onNetworkChange();
    });
    common_vendor.index.addInterceptor("navigateTo", {
      invoke: (arg) => {
      },
      success: (res) => {
        console.log(res);
      }
    });
    function moviePlay(id) {
      if (!id)
        return;
      common_vendor.index.navigateTo({
        url: "/pages/palyMovie/palyMovie?id=" + id
      });
    }
    return () => {
    };
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/\u57F9\u8BAD/vs/state4/TEST/uniapp/movie/App.vue"]]);
const NavBar = () => "./components/NavBar/NavBar.js";
const ImageLoad = () => "./components/ImageLoad/ImageLoad.js";
const Loading = () => "./components/loading/loading.js";
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(common_vendor.createPinia());
  app.component("NavBar", NavBar);
  app.component("ImageLoad", ImageLoad);
  app.component("Loading", Loading);
  common_vendor.index.$cloud = uilts_cloudFunc.cloudFunc;
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
