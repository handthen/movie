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
    let pinia = store_index.Pinia();
    let { user } = common_vendor.storeToRefs(pinia);
    common_vendor.ref(0);
    function choose(e) {
      const avatarUrl = e.detail.avatarUrl;
      pinia.setuser({
        avatarUrl
      });
      common_vendor.index.setStorageSync("avatarUrl", avatarUrl);
      wx.cloud.uploadFile({
        cloudPath: "movie_userAvatar/user-" + pinia.user.openid,
        filePath: avatarUrl,
        success(resp) {
          console.log(resp);
          pinia.setuser({ cloudAvatar: resp.fileID });
          common_vendor.index.setStorageSync("cloudAvatar", resp.fileID);
        }
      });
    }
    function change(e) {
      const username = e.detail.value;
      pinia.setuser({
        username
      });
      common_vendor.index.setStorageSync("username", username);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "\u6211\u7684"
        }),
        b: common_vendor.unref(user).avatarUrl,
        c: common_vendor.o(choose),
        d: common_vendor.unref(user).username,
        e: common_vendor.o(change),
        f: common_vendor.p({
          showArrow: true
        }),
        g: common_vendor.p({
          showArrow: true,
          to: "/pages/collection/collection"
        }),
        h: common_vendor.p({
          showArrow: true,
          to: "/pages/historyList/historyList"
        }),
        i: common_vendor.p({
          showArrow: true,
          to: "/pages/download/download"
        }),
        j: common_vendor.p({
          showArrow: true,
          to: "/pages/feedback/feedback"
        }),
        k: common_vendor.p({
          showArrow: true,
          to: "/pages/setting/setting"
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-259fb574"], ["__file", "D:/\u57F9\u8BAD/vs/state4/TEST/uniapp/movie/pages/me/me.vue"]]);
wx.createPage(MiniProgramPage);
