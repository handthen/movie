"use strict";
var common_vendor = require("./common/vendor.js");
var hooks_usePanel = require("./hooks/usePanel.js");
const _sfc_main = {
  setup(__props) {
    const listPanel = common_vendor.ref([]);
    const {
      getpanel,
      clearpanel
    } = hooks_usePanel.usepanel();
    common_vendor.onMounted(() => {
      listPanel.value = getpanel();
    });
    function clear() {
      listPanel.value = [];
      clearpanel();
    }
    function tapPanel(e) {
      let value = e.target.dataset.value;
      if (!value)
        return;
      common_vendor.index.navigateTo({
        url: "/pages/search/search?searchValue=" + value
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(clear),
        b: common_vendor.f(listPanel.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: item,
            c: index
          };
        }),
        c: common_vendor.o(tapPanel)
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a32f2864"], ["__file", "D:/\u57F9\u8BAD/vs/state4/TEST/uniapp/movie/components/panel/panel.vue"]]);
exports.Component = Component;
