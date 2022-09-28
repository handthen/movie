"use strict";
var common_vendor = require("./common/vendor.js");
var uilts_getMovieCount = require("./uilts/getMovieCount.js");
var store_index = require("./store/index.js");
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
    var _a;
    const props = __props;
    const pinia = store_index.Pinia();
    const dianzanLen = common_vendor.ref(0);
    let isGive = common_vendor.computed$1(() => {
      let arr = props.item.give;
      return arr.some((v) => v.openid == pinia.user.openid);
    });
    dianzanLen.value = ((_a = props.item.give) == null ? void 0 : _a.length) || 0;
    const repUser = common_vendor.inject("repUser");
    function show() {
      console.log(props.refPan);
      props.refPan.infoList(props.item);
    }
    async function dianzan(_id) {
      const { code, state } = await common_vendor.index.$cloud("signDianzan", { _id });
      isGive = !!state;
      if (isGive) {
        ++dianzanLen.value;
      } else {
        dianzanLen.value <= 0 ? 0 : --dianzanLen.value;
      }
    }
    return (_ctx, _cache) => {
      var _a2, _b, _c, _d, _e, _f, _g, _h, _i;
      return common_vendor.e({
        a: __props.item.avatar,
        b: !__props.showRep
      }, !__props.showRep ? {
        c: common_vendor.t(__props.item.username),
        d: common_vendor.o(($event) => _ctx.replyUser(__props.item._id, __props.item.username))
      } : {
        e: common_vendor.t(__props.item.username)
      }, {
        f: common_vendor.t(common_vendor.unref(uilts_getMovieCount.formatTime)(__props.item.time)),
        g: common_vendor.t(__props.item.text),
        h: __props.showRep
      }, __props.showRep ? {
        i: common_vendor.unref(isGive) ? 1 : "",
        j: common_vendor.o(($event) => dianzan(__props.item._id))
      } : {}, {
        k: __props.showRep
      }, __props.showRep ? {
        l: common_vendor.t(dianzanLen.value || 0)
      } : {}, {
        m: __props.showRep
      }, __props.showRep ? {
        n: common_vendor.o(($event) => common_vendor.unref(repUser)(__props.item._id, __props.item.username))
      } : {}, {
        o: ((_b = (_a2 = __props.item) == null ? void 0 : _a2.reply) == null ? void 0 : _b.length) > 0 && __props.showRep
      }, ((_d = (_c = __props.item) == null ? void 0 : _c.reply) == null ? void 0 : _d.length) > 0 && __props.showRep ? {
        p: common_vendor.t((_f = (_e = __props.item) == null ? void 0 : _e.reply[0]) == null ? void 0 : _f.username),
        q: common_vendor.t((_h = (_g = __props.item) == null ? void 0 : _g.reply[0]) == null ? void 0 : _h.text),
        r: common_vendor.t((_i = __props.item) == null ? void 0 : _i.reply.length),
        s: common_vendor.o(show)
      } : {});
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0b57bc56"], ["__file", "D:/\u57F9\u8BAD/vs/state4/TEST/uniapp/movie/components/PinItem/PinItem.vue"]]);
exports.Component = Component;
