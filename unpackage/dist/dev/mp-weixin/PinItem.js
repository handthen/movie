"use strict";
var common_vendor = require("./common/vendor.js");
var uilts_getMovieCount = require("./uilts/getMovieCount.js");
const _sfc_main = {
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  emits: ["repUser"],
  setup(__props, { emit }) {
    const repUser = common_vendor.inject("repUser");
    function replyUser(_id, username) {
      repUser(_id, username);
    }
    return (_ctx, _cache) => {
      return {
        a: __props.item.avatar,
        b: common_vendor.t(__props.item.username),
        c: common_vendor.t(common_vendor.unref(uilts_getMovieCount.formatTime)(__props.item.time)),
        d: common_vendor.t(__props.item.text),
        e: common_vendor.t(__props.item.give || 0),
        f: common_vendor.o(($event) => replyUser(__props.item._id, __props.item.username))
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0b57bc56"], ["__file", "D:/\u57F9\u8BAD/vs/state4/TEST/uniapp/movie/components/PinItem/PinItem.vue"]]);
exports.Component = Component;
