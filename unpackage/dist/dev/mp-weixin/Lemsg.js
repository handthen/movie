"use strict";
var common_vendor = require("./common/vendor.js");
var store_index = require("./store/index.js");
if (!Math) {
  PinItem();
}
const PinItem = () => "./components/PinItem/PinItem2.js";
const _sfc_main = {
  props: {
    listHight: {
      type: Number,
      default: 0
    }
  },
  setup(__props, { expose }) {
    store_index.Pinia();
    const showPanel = common_vendor.ref(false);
    const item = common_vendor.ref({});
    const repList = common_vendor.ref([]);
    const top = common_vendor.ref(1500);
    const page = common_vendor.ref(10);
    expose({
      infoList,
      hideRep
    });
    function infoList(obj) {
      var _a;
      item.value = obj;
      repList.value = (_a = item.value.reply) == null ? void 0 : _a.slice(0, page.value);
      showPanel.value = true;
      common_vendor.nextTick(() => {
        top.value = 0;
      });
    }
    function hideRep() {
      top.value = 1500;
      common_vendor.nextTick(() => {
        showPanel.value = false;
      });
    }
    function onBottom() {
      var _a;
      let arr = (_a = item.value.reply) == null ? void 0 : _a.slice(page.value, page.value + 10);
      if (arr.length == 0)
        return;
      repList.value.push(...arr);
      page.value = page.value + 10;
    }
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: showPanel.value
      }, showPanel.value ? {
        b: common_vendor.o(hideRep),
        c: common_vendor.p({
          item: item.value,
          showRep: false
        }),
        d: common_vendor.t((_a = item.value.reply) == null ? void 0 : _a.length),
        e: common_vendor.f(item.value.reply, (rep, index, i0) => {
          return {
            a: "5f453154-1-" + i0,
            b: common_vendor.p({
              item: rep,
              showRep: false
            }),
            c: index
          };
        }),
        f: common_vendor.o(onBottom),
        g: __props.listHight + "px",
        h: top.value + "rpx"
      } : {});
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5f453154"], ["__file", "D:/\u57F9\u8BAD/vs/state4/TEST/uniapp/movie/components/Lemsg/Lemsg.vue"]]);
exports.Component = Component;
