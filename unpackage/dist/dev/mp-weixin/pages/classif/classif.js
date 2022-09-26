"use strict";
var common_vendor = require("../../common/vendor.js");
var http_meApi_index = require("../../http/meApi/index.js");
var http_index = require("../../http/index.js");
var store_index = require("../../store/index.js");
if (!Array) {
  const _easycom_NavBar2 = common_vendor.resolveComponent("NavBar");
  const _easycom_ImageLoad2 = common_vendor.resolveComponent("ImageLoad");
  (_easycom_NavBar2 + _easycom_ImageLoad2)();
}
const _easycom_NavBar = () => "../../components/NavBar/NavBar.js";
const _easycom_ImageLoad = () => "../../components/ImageLoad/ImageLoad.js";
if (!Math) {
  (_easycom_NavBar + common_vendor.unref(loading) + _easycom_ImageLoad)();
}
const _sfc_main = {
  setup(__props) {
    const pinia = store_index.Pinia();
    const movieTypeList = common_vendor.ref([]);
    const movieList = common_vendor.ref([]);
    const Ontitle = common_vendor.ref("");
    const isEnd = common_vendor.ref(false);
    const loading2 = common_vendor.ref(false);
    const buttomLoading = common_vendor.ref(false);
    const page = common_vendor.reactive({
      limit: 15,
      pg: 1
    });
    common_vendor.onShow(() => {
      let tid = pinia.getClass;
      loading2.value = true;
      getType(tid);
    });
    async function getType(tid) {
      const {
        class: data
      } = await http_meApi_index.getMovieType();
      movieTypeList.value = data.sort((a, b) => {
        if (!a.type_id) {
          return 0;
        }
        return a.type_id - b.type_id;
      }).filter((v) => v.type_name != "\u4F26\u7406\u7247");
      !tid && (tid = movieTypeList.value[0].type_id);
      !tid && (tid = movieTypeList.value[0].id);
      Ontitle.value = "title" + tid;
      getlist(tid);
    }
    async function getlist(id) {
      try {
        const {
          list: data
        } = await http_meApi_index.getFenleiApi({
          t: id,
          limit: page.limit,
          pg: page.pg
        });
        movieList.value = data;
        if (data.length < 15)
          isEnd.value = true;
        loading2.value = false;
      } catch (e) {
        common_vendor.index.showToast({
          title: "\u83B7\u53D6\u5931\u8D25",
          icon: "none"
        });
        loading2.value = false;
      }
    }
    function Ontapbar(id) {
      common_vendor.index.pageScrollTo({
        scrollTop: 0
      });
      movieList.value = [];
      loading2.value = true;
      Ontitle.value = "title" + id;
      http_index.wxTask && http_index.wxTask.abort();
      page.limit = 15;
      page.pg = 1;
      getlist(id);
    }
    function toplay(e) {
      let id = e.target.dataset.id;
      if (!id)
        return;
      common_vendor.index.navigateTo({
        url: "/pages/palyMovie/palyMovie?id=" + id
      });
    }
    common_vendor.onReachBottom(() => {
      if (isEnd.value) {
        return common_vendor.index.showToast({
          title: "\u6CA1\u6709\u66F4\u591A\u6570\u636E\u4E86",
          icon: "none"
        });
      }
      buttomLoading.value = true;
      page.pg = page.pg + 1;
      let id = Ontitle.value.replace("title", "");
      http_meApi_index.getFenleiApi({
        t: id,
        limit: page.limit,
        pg: page.pg
      }).then((res) => {
        let { list: data } = res;
        movieList.value.push(...data);
      }).finally(() => {
        buttomLoading.value = false;
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "\u5206\u7C7B"
        }),
        b: common_vendor.f(movieTypeList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.type_name),
            b: "title" + item.type_id,
            c: Ontitle.value == "title" + item.type_id ? 1 : "",
            d: common_vendor.o(($event) => Ontapbar(item.type_id)),
            e: item.type_id
          };
        }),
        c: Ontitle.value,
        d: common_vendor.unref(pinia).navBarHight + "px",
        e: loading2.value
      }, loading2.value ? {} : {}, {
        f: common_vendor.f(movieList.value, (item, k0, i0) => {
          return {
            a: "f329279c-2-" + i0,
            b: common_vendor.p({
              src: item.vod_pic,
              vod_id: item.vod_id
            }),
            c: common_vendor.t(item.vod_name),
            d: item.vod_id
          };
        }),
        g: buttomLoading.value
      }, buttomLoading.value ? {} : {}, {
        h: common_vendor.o(toplay)
      });
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f329279c"], ["__file", "D:/\u57F9\u8BAD/vs/state4/TEST/uniapp/movie/pages/classif/classif.vue"]]);
wx.createPage(MiniProgramPage);
