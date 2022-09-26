"use strict";
var common_vendor = require("./common/vendor.js");
var store_index = require("./store/index.js");
var http_meApi_index = require("./http/meApi/index.js");
if (!Array) {
  const _easycom_ImageLoad2 = common_vendor.resolveComponent("ImageLoad");
  _easycom_ImageLoad2();
}
const _easycom_ImageLoad = () => "./components/ImageLoad/ImageLoad.js";
if (!Math) {
  _easycom_ImageLoad();
}
const _sfc_main = {
  props: {
    tid: {
      type: Number,
      default: 1
    },
    title: {
      type: String,
      default: ""
    },
    back: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const props = __props;
    const pinia = store_index.Pinia();
    const data = common_vendor.ref([]);
    common_vendor.inject("moviePlay");
    common_vendor.onMounted(() => {
      init(props.tid);
    });
    async function init(tid) {
      try {
        const { list } = await http_meApi_index.getDiffuseApi({ tid });
        data.value = list;
      } catch (e) {
        console.log(e);
      }
    }
    function toAll() {
      let tid = props.tid;
      if (!tid)
        return;
      pinia.classif = tid;
      common_vendor.index.switchTab({
        url: "/pages/classif/classif"
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(__props.title),
        b: __props.back
      }, __props.back ? {
        c: common_vendor.o(toAll)
      } : {}, {
        d: common_vendor.f(data.value, (item, index, i0) => {
          return {
            a: "1ba47938-0-" + i0,
            b: common_vendor.p({
              src: item.vod_pic,
              vod_id: item.vod_id
            }),
            c: common_vendor.t(item.vod_name),
            d: item.vod_id
          };
        }),
        e: common_vendor.o((...args) => _ctx.getInfo && _ctx.getInfo(...args))
      });
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1ba47938"], ["__file", "D:/\u57F9\u8BAD/vs/state4/TEST/uniapp/movie/components/swperMovie/swperMovie.vue"]]);
exports.Component = Component;
