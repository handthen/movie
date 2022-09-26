"use strict";
var common_vendor = require("./common/vendor.js");
const _sfc_main = {
  props: {
    title: {
      type: String,
      default: "\u63D0\u793A"
    }
  },
  setup(__props, { expose }) {
    const value = common_vendor.ref("");
    const showModel = common_vendor.ref(false);
    let hide = null;
    let btnOk = null;
    expose({
      show
    });
    function show() {
      return new Promise((res, rej) => {
        showModel.value = true;
        hide = () => {
          rej("\u53D6\u6D88");
          showModel.value = false;
        };
        btnOk = () => {
          if (!value.value)
            return common_vendor.index.showToast({ title: "\u8BF7\u8F93\u5165\u5185\u5BB9", icon: "none" });
          res(value.value);
          showModel.value = false;
        };
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: showModel.value
      }, showModel.value ? {
        b: common_vendor.t(__props.title),
        c: value.value,
        d: common_vendor.o(($event) => value.value = $event.detail.value),
        e: common_vendor.o((...args) => common_vendor.unref(hide) && common_vendor.unref(hide)(...args)),
        f: common_vendor.o((...args) => common_vendor.unref(btnOk) && common_vendor.unref(btnOk)(...args))
      } : {});
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eb446d50"], ["__file", "D:/\u57F9\u8BAD/vs/state4/TEST/uniapp/movie/components/model/model.vue"]]);
exports.Component = Component;
