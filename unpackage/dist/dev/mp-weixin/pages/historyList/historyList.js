"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var common_vendor = require("../../common/vendor.js");
var store_index = require("../../store/index.js");
var uilts_getMovieCount = require("../../uilts/getMovieCount.js");
require("../../http/index.js");
if (!Array) {
  const _easycom_NavBar2 = common_vendor.resolveComponent("NavBar");
  const _easycom_ImageLoad2 = common_vendor.resolveComponent("ImageLoad");
  (_easycom_NavBar2 + _easycom_ImageLoad2)();
}
const _easycom_NavBar = () => "../../components/NavBar/NavBar.js";
const _easycom_ImageLoad = () => "../../components/ImageLoad/ImageLoad.js";
if (!Math) {
  (_easycom_NavBar + _easycom_ImageLoad)();
}
const _sfc_main = {
  setup(__props) {
    const pinia = store_index.Pinia();
    const loading = common_vendor.ref(false);
    const isBottom = common_vendor.ref(false);
    const list = common_vendor.ref([]);
    const page = common_vendor.reactive({
      limit: 10,
      pg: 1
    });
    common_vendor.onLoad(() => {
      loading.value = true;
      getList().finally(() => {
        loading.value = false;
      });
    });
    async function getList() {
      const { code, data } = await common_vendor.index.$cloud("getHistory", __spreadProps(__spreadValues({}, page), { openid: pinia.user.openid }));
      list.value = data;
    }
    common_vendor.onReachBottom(() => {
      if (isBottom.value) {
        return common_vendor.index.showToast({
          title: "\u6CA1\u6709\u66F4\u591A\u6570\u636E\u4E86",
          icon: "none"
        });
      }
      loading.value = true;
      page.pg = page.pg + 1;
      try {
        common_vendor.index.$cloud("getHistory", __spreadProps(__spreadValues({}, page), { openid: pinia.user.openid })).then((res) => {
          const {
            data,
            code
          } = res;
          if (data.length < 10) {
            isBottom.value = true;
          }
          list.value.push(...data);
          loading.value = false;
        });
      } catch {
        loading.value = false;
      }
    });
    async function clear(vod_id) {
      const { code } = await common_vendor.index.$cloud("clearHistory", { vod_id });
      if (code == 200) {
        list.value = list.value.filter((v) => v.movie.vod_id != vod_id);
        !vod_id && (list.value = []);
        common_vendor.index.showToast({
          title: "\u6E05\u9664\u6210\u529F",
          icon: "none"
        });
      }
    }
    common_vendor.onUnmounted(() => {
      isBottom.value = false;
      list.value = [];
      page.limit = 10;
      page.pg = 1;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "\u89C2\u770B\u8BB0\u5F55"
        }),
        b: loading.value
      }, loading.value ? {} : {}, {
        c: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: "7788d72c-1-" + i0,
            b: common_vendor.p({
              src: item.movie.vod_pic,
              vod_id: item.movie.vod_id
            }),
            c: common_vendor.t(item.movie.vod_name),
            d: common_vendor.o(($event) => clear(item.movie.vod_id)),
            e: common_vendor.t(item.movie.vod_area + "|" + item.movie.vod_year),
            f: common_vendor.t("\u5BFC\u6F14:" + item.movie.vod_director),
            g: common_vendor.t("\u4E3B\u6F14:" + item.movie.vod_actor),
            h: common_vendor.t("\u7B2C" + (item.count + 1) + "\u96C6"),
            i: common_vendor.t(common_vendor.unref(uilts_getMovieCount.formMovieTime)(item.movie_time)),
            j: common_vendor.t(common_vendor.unref(uilts_getMovieCount.formatTime)(item.time)),
            k: item.movie.vod_id
          };
        }),
        d: list.value.length == 0 && loading.value != true
      }, list.value.length == 0 && loading.value != true ? {} : {}, {
        e: common_vendor.o(($event) => clear())
      });
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7788d72c"], ["__file", "D:/\u57F9\u8BAD/vs/state4/TEST/uniapp/movie/pages/historyList/historyList.vue"]]);
wx.createPage(MiniProgramPage);
