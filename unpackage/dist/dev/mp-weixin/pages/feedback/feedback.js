"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_NavBar2 = common_vendor.resolveComponent("NavBar");
  _easycom_NavBar2();
}
const _easycom_NavBar = () => "../../components/NavBar/NavBar.js";
if (!Math) {
  _easycom_NavBar();
}
const _sfc_main = {
  setup(__props) {
    const value = common_vendor.ref("");
    function feed() {
      if (!value.value)
        return;
      common_vendor.index.$cloud("feedback", { text: value.value }).then((res) => {
        common_vendor.index.showToast({
          title: "\u53CD\u9988\u6210\u529F",
          icon: "none"
        });
        common_vendor.index.switchTab({
          url: "/pages/me/me"
        });
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "\u53CD\u9988"
        }),
        b: value.value,
        c: common_vendor.o(($event) => value.value = $event.detail.value),
        d: common_vendor.o(feed)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/\u57F9\u8BAD/vs/state4/TEST/uniapp/movie/pages/feedback/feedback.vue"]]);
wx.createPage(MiniProgramPage);
