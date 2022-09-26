"use strict";
var common_vendor = require("../../common/vendor.js");
var store_index = require("../../store/index.js");
var hooks_usePanel = require("../../hooks/usePanel.js");
if (!Array) {
  const _easycom_NavBar2 = common_vendor.resolveComponent("NavBar");
  _easycom_NavBar2();
}
const _easycom_NavBar = () => "../../components/NavBar/NavBar.js";
if (!Math) {
  (_easycom_NavBar + Panel + SwperMovie)();
}
const SwperMovie = () => "../../components/swperMovie/swperMovie2.js";
const Panel = () => "../../components/panel/panel2.js";
const _sfc_main = {
  setup(__props) {
    const { setpanel } = hooks_usePanel.usepanel();
    const images = [
      {
        imgUrl: "https://handthen.github.io/static/3228.jpg",
        vod_id: 25538
      },
      {
        imgUrl: "https://handthen.github.io/static/33456.jpg",
        vod_id: 20535
      },
      {
        imgUrl: "https://handthen.github.io/static/621230.jpg",
        vod_id: 19995
      }
    ];
    common_vendor.ref(true);
    const value = common_vendor.ref("");
    const curtain = common_vendor.ref(false);
    const pinia = store_index.Pinia();
    const refresh = common_vendor.ref(true);
    const moviePlay = common_vendor.inject("moviePlay", moviePlay);
    common_vendor.onMounted(() => {
    });
    common_vendor.onLoad(() => {
      const openid = common_vendor.index.getStorageSync("openid");
      if (!openid) {
        wx.cloud.callFunction({
          name: "movie",
          data: {
            type: "getUser"
          }
        }).then((res) => {
          const { openid: openid2 } = res.result;
          pinia.setuser({ openid: openid2 });
          common_vendor.index.setStorageSync("openid", openid2);
        });
      }
    });
    function search() {
      if (!value.value)
        return;
      setpanel(value.value);
      common_vendor.index.navigateTo({
        url: "/pages/search/search?searchValue=" + value.value
      });
      value.value = "";
    }
    common_vendor.onPullDownRefresh(() => {
      refresh.value = false;
      common_vendor.nextTick(() => {
        refresh.value = true;
        common_vendor.index.stopPullDownRefresh();
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: `overflow:${curtain.value ? "hidden" : "visible"}`,
        b: common_vendor.p({
          title: "\u4E3B\u9875"
        }),
        c: common_vendor.o(($event) => curtain.value = true),
        d: common_vendor.o(search),
        e: value.value,
        f: common_vendor.o(($event) => value.value = $event.detail.value),
        g: curtain.value
      }, curtain.value ? {} : {}, {
        h: common_vendor.o(($event) => curtain.value = false),
        i: common_vendor.f(images, (item, index, i0) => {
          return {
            a: item.imgUrl,
            b: common_vendor.n("swiper-item" + index),
            c: common_vendor.o(($event) => common_vendor.unref(moviePlay)(item.vod_id)),
            d: index
          };
        }),
        j: common_vendor.o((...args) => _ctx.change && _ctx.change(...args)),
        k: refresh.value
      }, refresh.value ? {
        l: common_vendor.p({
          tid: 25,
          title: "\u65E5\u6F2B"
        }),
        m: common_vendor.p({
          tid: 24,
          title: "\u56FD\u6F2B"
        }),
        n: common_vendor.p({
          tid: 26,
          title: "\u6B27\u7F8E\u52A8\u6F2B"
        }),
        o: common_vendor.p({
          tid: 2,
          title: "\u7535\u5F71"
        }),
        p: common_vendor.p({
          tid: 1,
          title: "\u7535\u89C6\u5267"
        }),
        q: common_vendor.p({
          tid: 11,
          title: "\u559C\u5267"
        }),
        r: common_vendor.o((...args) => common_vendor.unref(moviePlay) && common_vendor.unref(moviePlay)(...args))
      } : {});
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-57280228"], ["__file", "D:/\u57F9\u8BAD/vs/state4/TEST/uniapp/movie/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
