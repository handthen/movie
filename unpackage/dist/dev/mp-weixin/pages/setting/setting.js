"use strict";
var common_vendor = require("../../common/vendor.js");
var store_index = require("../../store/index.js");
if (!Array) {
  const _easycom_NavBar2 = common_vendor.resolveComponent("NavBar");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_NavBar2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_NavBar = () => "../../components/NavBar/NavBar.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_NavBar + _easycom_uni_list_item + _easycom_uni_list)();
}
const _sfc_main = {
  setup(__props) {
    const pinia = store_index.Pinia();
    const version = common_vendor.ref("");
    common_vendor.onLoad(() => {
      version.value = wx.getAccountInfoSync().miniProgram.version;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "\u8BBE\u7F6E\u4E2D\u5FC3"
        }),
        b: common_vendor.p({
          title: "\u6635\u79F0",
          rightText: common_vendor.unref(pinia).user.username
        }),
        c: common_vendor.p({
          title: "\u7248\u672C\u53F7",
          rightText: version.value
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/\u57F9\u8BAD/vs/state4/TEST/uniapp/movie/pages/setting/setting.vue"]]);
wx.createPage(MiniProgramPage);
