"use strict";
var common_vendor = require("./common/vendor.js");
var uilts_getMovieCount = require("./uilts/getMovieCount.js");
const _sfc_main = {
  props: {
    item: {
      type: Object,
      default: {}
    },
    showRep: {
      type: Boolean,
      default: true
    },
    refPan: {
      type: Object,
      default: {}
    }
  },
  setup(__props) {
    const props = __props;
    const repUser = common_vendor.inject("repUser");
    function show() {
      console.log(props.refPan);
      props.refPan.infoList(props.item);
    }
    function replyUser(_id, username) {
      repUser(_id, username);
    }
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i;
      return common_vendor.e({
        a: __props.item.avatar,
        b: common_vendor.t(__props.item.username),
        c: common_vendor.t(common_vendor.unref(uilts_getMovieCount.formatTime)(__props.item.time)),
        d: common_vendor.t(__props.item.text),
        e: common_vendor.t(__props.item.give || 0),
        f: common_vendor.o(($event) => replyUser(__props.item._id, __props.item.username)),
        g: ((_b = (_a = __props.item) == null ? void 0 : _a.reply) == null ? void 0 : _b.length) > 0 && __props.showRep
      }, ((_d = (_c = __props.item) == null ? void 0 : _c.reply) == null ? void 0 : _d.length) > 0 && __props.showRep ? {
        h: common_vendor.t((_f = (_e = __props.item) == null ? void 0 : _e.reply[0]) == null ? void 0 : _f.username),
        i: common_vendor.t((_h = (_g = __props.item) == null ? void 0 : _g.reply[0]) == null ? void 0 : _h.text),
        j: common_vendor.t((_i = __props.item) == null ? void 0 : _i.reply.length),
        k: common_vendor.o(show)
      } : {});
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0b57bc56"], ["__file", "D:/\u57F9\u8BAD/vs/state4/TEST/uniapp/movie/components/PinItem/PinItem.vue"]]);
exports.Component = Component;
