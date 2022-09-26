"use strict";
var common_vendor = require("../../common/vendor.js");
var _imports_0 = "/static/images/image.png";
const _sfc_main = {
  props: {
    src: {
      type: String,
      default: _imports_0
    },
    vod_id: {
      type: Number,
      default: null
    },
    width: {
      type: Number,
      default: null
    },
    height: {
      type: Number,
      default: null
    }
  },
  setup(__props) {
    const props = __props;
    const isImage = common_vendor.ref(true);
    const moviePlay = common_vendor.inject("moviePlay");
    function toPlay() {
      if (!props.vod_id)
        return;
      moviePlay && moviePlay(props.vod_id);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isImage.value
      }, isImage.value ? {
        b: _imports_0
      } : {}, {
        c: !isImage.value ? 1 : "",
        d: isImage.value ? 1 : "",
        e: common_vendor.o(($event) => isImage.value = false),
        f: __props.src,
        g: common_vendor.o(toPlay)
      });
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-30bfac88"], ["__file", "D:/\u57F9\u8BAD/vs/state4/TEST/uniapp/movie/components/ImageLoad/ImageLoad.vue"]]);
wx.createComponent(Component);
