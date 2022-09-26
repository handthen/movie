"use strict";
var common_vendor = require("./common/vendor.js");
var store_index = require("./store/index.js");
if (!Math) {
  PinItem();
}
const PinItem = () => "./components/PinItem/PinItem2.js";
const _sfc_main = {
  props: {
    item: {
      type: Object,
      default: {}
    },
    listHight: {
      type: Number,
      default: 0
    }
  },
  setup(__props) {
    store_index.Pinia();
    const top = common_vendor.ref(1500);
    const showPanel = common_vendor.ref(false);
    common_vendor.inject("repUser");
    function infoList() {
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
    return (_ctx, _cache) => {
      var _a, _b;
      return common_vendor.e({
        a: ((_a = __props.item.reply) == null ? void 0 : _a.length) != 0
      }, ((_b = __props.item.reply) == null ? void 0 : _b.length) != 0 ? {
        b: common_vendor.t(__props.item.reply[0].username),
        c: common_vendor.t(__props.item.reply[0].text),
        d: common_vendor.t(__props.item.reply.length),
        e: common_vendor.o(infoList)
      } : {}, {
        f: showPanel.value
      }, showPanel.value ? {
        g: common_vendor.o(hideRep),
        h: common_vendor.p({
          item: __props.item,
          showRep: false
        }),
        i: common_vendor.t(__props.item.reply.length),
        j: common_vendor.f(__props.item.reply, (rep, index, i0) => {
          return {
            a: "5f453154-1-" + i0,
            b: common_vendor.p({
              item: rep
            }),
            c: index
          };
        }),
        k: __props.listHight + "px",
        l: top.value + "rpx"
      } : {});
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5f453154"], ["__file", "D:/\u57F9\u8BAD/vs/state4/TEST/uniapp/movie/components/Lemsg/Lemsg.vue"]]);
exports.Component = Component;
