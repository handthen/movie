"use strict";
var common_vendor = require("../../common/vendor.js");
var http_meApi_index = require("../../http/meApi/index.js");
var store_index = require("../../store/index.js");
require("../../http/index.js");
if (!Array) {
  const _easycom_NavBar2 = common_vendor.resolveComponent("NavBar");
  const _component_Loading = common_vendor.resolveComponent("Loading");
  const _easycom_ImageLoad2 = common_vendor.resolveComponent("ImageLoad");
  (_easycom_NavBar2 + _component_Loading + _easycom_ImageLoad2)();
}
const _easycom_NavBar = () => "../../components/NavBar/NavBar.js";
const _easycom_ImageLoad = () => "../../components/ImageLoad/ImageLoad.js";
if (!Math) {
  (_easycom_NavBar + _easycom_ImageLoad)();
}
const _sfc_main = {
  emits: ["update:show"],
  setup(__props, { emit }) {
    const pinia = store_index.Pinia();
    const loading = common_vendor.ref(false);
    const value = common_vendor.ref("");
    const isBottom = common_vendor.ref(false);
    const list = common_vendor.ref([]);
    const page = common_vendor.reactive({
      limit: 10,
      pg: 1
    });
    common_vendor.onLoad(({ searchValue }) => {
      value.value = searchValue;
      getList(searchValue);
    });
    function search(e) {
      getList(e.target.value);
    }
    async function getList(value2) {
      try {
        loading.value = true;
        const {
          list: data
        } = await http_meApi_index.getSearchApi({
          wd: value2,
          limit: page.limit,
          pg: page.pg
        });
        list.value = data;
        title.value = data.length;
        if (data.length < 10) {
          isBottom.value = true;
        }
        loading.value = false;
      } catch {
        loading.value = false;
      }
    }
    function toPlay(id) {
      common_vendor.index.navigateTo({
        url: "/pages/palyMovie/palyMovie?id=" + id
      });
    }
    common_vendor.onReachBottom(() => {
      if (!value.value)
        return;
      if (isBottom.value) {
        return common_vendor.index.showToast({
          title: "\u6CA1\u6709\u66F4\u591A\u6570\u636E\u4E86",
          icon: "none"
        });
      }
      loading.value = true;
      page.pg = page.pg + 1;
      try {
        http_meApi_index.getSearchApi({
          wd: value.value,
          limit: page.limit,
          pg: page.pg
        }).then((res) => {
          const {
            list: data
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
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(search),
        b: value.value,
        c: common_vendor.o(($event) => value.value = $event.detail.value),
        d: common_vendor.unref(pinia).navBarHight + "px",
        e: loading.value
      }, loading.value ? {} : {}, {
        f: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: "4cedc0c6-2-" + i0,
            b: common_vendor.p({
              src: item.vod_pic,
              vod_id: item.vod_id
            }),
            c: common_vendor.t(item.vod_name),
            d: common_vendor.t(item.vod_area + "|" + item.vod_year),
            e: common_vendor.t("\u5BFC\u6F14:" + item.vod_director),
            f: common_vendor.t("\u4E3B\u6F14:" + item.vod_actor),
            g: common_vendor.o(($event) => toPlay(item.vod_id)),
            h: item.vod_id
          };
        }),
        g: list.value.length == 0 && value.value != "" && loading.value != true
      }, list.value.length == 0 && value.value != "" && loading.value != true ? {} : {});
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4cedc0c6"], ["__file", "D:/\u57F9\u8BAD/vs/state4/TEST/uniapp/movie/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
