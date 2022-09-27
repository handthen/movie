"use strict";
var common_vendor = require("../../common/vendor.js");
var http_meApi_index = require("../../http/meApi/index.js");
var uilts_getMovieCount = require("../../uilts/getMovieCount.js");
var store_index = require("../../store/index.js");
var hooks_usePinlun = require("../../hooks/usePinlun.js");
var hooks_useCommect = require("../../hooks/useCommect.js");
require("../../http/index.js");
if (!Array) {
  const _easycom_NavBar2 = common_vendor.resolveComponent("NavBar");
  const _component_Loading = common_vendor.resolveComponent("Loading");
  (_easycom_NavBar2 + _component_Loading)();
}
const _easycom_NavBar = () => "../../components/NavBar/NavBar.js";
if (!Math) {
  (_easycom_NavBar + SwperMovie + PinItem + MsgPin + Model)();
}
const SwperMovie = () => "../../components/swperMovie/swperMovie2.js";
const Model = () => "../../components/model/model2.js";
const MsgPin = () => "../../components/Lemsg/Lemsg2.js";
const PinItem = () => "../../components/PinItem/PinItem2.js";
const _sfc_main = {
  setup(__props) {
    const $model = common_vendor.ref(null);
    const $repPanel = common_vendor.ref(null);
    common_vendor.storeToRefs(store_index.Pinia());
    const movie = common_vendor.ref({});
    const currentUrl = common_vendor.ref("");
    const active = common_vendor.ref(0);
    const pinlunList = common_vendor.ref([]);
    const text = common_vendor.ref("");
    const { get, set, setHistory, getbanmuList, setbanmu, getToHis, setrepUser } = hooks_usePinlun.usePinlun();
    const { isCommection, collection } = hooks_useCommect.useComment();
    common_vendor.ref(true);
    const danmuList = common_vendor.ref([]);
    const height = common_vendor.ref(0);
    const overHeight = common_vendor.ref(0);
    const infoTexttop = common_vendor.ref(1500);
    const placeholder = common_vendor.ref("\u53D1\u5F39\u5E55");
    const threshold = common_vendor.reactive({
      isShowModel: false,
      isShow: false,
      loading: true,
      isColl: false,
      isEnd: false
    });
    let timer = null;
    let currTime = common_vendor.ref(0);
    let countMovie = 0;
    common_vendor.provide("repUser", repUser);
    common_vendor.onLoad(async ({ id }) => {
      var _a, _b;
      const res = await getToHis(+id);
      currTime.value = +((_a = res[0]) == null ? void 0 : _a.movie_time) || 0;
      countMovie = +((_b = res[0]) == null ? void 0 : _b.count) || 0;
      isCommection(id).then((res2) => {
        threshold.isColl = res2;
      });
      getbanmuList(+id).then((res2) => {
        var _a2;
        danmuList.value = ((_a2 = res2[0]) == null ? void 0 : _a2.banmuList) || [];
      });
      inidMovie(id);
    });
    common_vendor.onUnload(() => {
      timer && clearTimeout(timer);
      setHistory({
        movie: movie.value,
        vod_id: movie.value.vod_id,
        movie_time: Math.floor(currTime.value),
        count: +countMovie
      });
    });
    common_vendor.onReady(() => {
    });
    function setOver() {
      const sys = common_vendor.index.getSystemInfoSync();
      const query = common_vendor.index.createSelectorQuery();
      let body = 0;
      query.select(".tagBody").boundingClientRect().exec((res) => {
        console.log(res);
        body = res[0].top;
      });
      query.select(".input").boundingClientRect().exec((res) => {
        overHeight.value = sys.windowHeight - body - (sys.windowHeight - res[1].top);
      });
    }
    common_vendor.onShareAppMessage((res) => {
      return {
        title: movie.value.vod_name,
        imageUrl: movie.value.vod_pic
      };
    });
    function onBottom() {
      if (active != 1 || threshold.isEnd)
        return;
      get(movie.value.vod_id, true).then((res) => {
        if (res.length < 10) {
          return threshold.isEnd = true;
        }
        pinlunList.value.push(...res);
      });
    }
    function repUser(_id, name) {
      placeholder.value = "\u56DE\u590D" + name;
      common_vendor.index._id = _id;
    }
    function focus(e) {
      height.value = e.target.height;
    }
    function nextVideo() {
      let len = movie.value.movieCount.length - 1;
      if (countMovie >= len)
        return;
      currentUrl.value = movie.value.movieCount[++countMovie][1];
    }
    function currentTime(e) {
      currTime.value = e.target.currentTime;
    }
    async function getPinlun() {
      active.value = 1;
      placeholder.value = "\u53D1\u8BC4\u8BBA";
      pinlunList.value = await get(movie.value.vod_id);
      threshold.loading = false;
    }
    async function setPinlun() {
      if (active.value == 0) {
        let banmu = {
          text: text.value,
          color: "#ff0000",
          time: Math.ceil(+currTime.value)
        };
        danmuList.value.push(banmu);
        setbanmu(movie.value.vod_id, banmu);
      }
      if (active.value == 1) {
        if (placeholder.value.includes("\u56DE\u590D")) {
          setrepUser(common_vendor.index._id, placeholder.value + ":" + text.value);
          common_vendor.index._id = null;
          placeholder.value = "\u53D1\u8BC4\u8BBA";
        } else {
          pinlunList.value = await set(movie.value.vod_id, text.value);
        }
      }
      text.value = "";
    }
    function dowm() {
      common_vendor.index.showToast({
        title: "\u6682\u4E0D\u63D0\u4F9B\u4E0B\u8F7D",
        icon: "none"
      });
    }
    async function setcollection() {
      let state = threshold.isColl ? 0 : 1;
      const data = await collection(movie.value, movie.value.vod_id, state);
      threshold.isColl = data;
    }
    function feedback() {
      threshold.isShowModel = true;
      $model.value.show().then((res) => {
        common_vendor.index.$cloud("feedback", { text: res, vod_id: movie.value.vod_id }).then((res2) => {
          common_vendor.index.showToast({
            title: "\u53CD\u9988\u6210\u529F",
            icon: "none"
          });
        });
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        threshold.isShowModel = false;
      });
    }
    async function inidMovie(id) {
      var _a, _b;
      try {
        common_vendor.index.showLoading({ title: "", mask: true });
        const { list: data } = await http_meApi_index.getMovieApi({ ids: id });
        movie.value = data[0];
        let str = ((_a = movie.value) == null ? void 0 : _a.vod_url) || ((_b = movie.value) == null ? void 0 : _b.vod_play_url);
        let arr = uilts_getMovieCount.getMovie(str);
        movie.value.movieCount = arr;
        currentUrl.value = arr[+countMovie][1];
        let vidcon = wx.createVideoContext("video");
        console.log("currTime.value", currTime.value);
        vidcon.seek(currTime.value);
        common_vendor.index.hideLoading();
        threshold.isShow = true;
        common_vendor.nextTick(() => {
          setOver();
        });
      } catch (e) {
        console.log("err", e);
        common_vendor.index.showToast({
          title: "\u64AD\u653E\u9519\u8BEF,2\u79D2\u540E\u8FD4\u56DE\u4E3B\u9875",
          icon: "none"
        });
        common_vendor.index.hideLoading();
        timer = setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/index/index"
          });
        }, 2e3);
      }
    }
    function setMovie(e) {
      const url = e.target.dataset.url;
      currentUrl.value = url;
      countMovie = +e.target.dataset.index;
    }
    function videoErrorCallback(e) {
      common_vendor.index.showToast({
        title: "\u7F51\u7EDC\u6709\u70B9\u6162\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85",
        icon: "none"
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: `overflow:${common_vendor.unref(threshold).isShowModel ? "hidden" : "visible"}`,
        b: currentUrl.value,
        c: common_vendor.o(videoErrorCallback),
        d: movie.value.vod_name,
        e: movie.value.vod_pic,
        f: danmuList.value,
        g: common_vendor.o(currentTime),
        h: common_vendor.o(nextVideo),
        i: common_vendor.unref(currTime),
        j: active.value == 0 || active.value == 2 ? 1 : "",
        k: common_vendor.o(() => {
          active.value = 0;
          placeholder.value = "\u53D1\u5F39\u5E55";
        }),
        l: active.value == 1 ? 1 : "",
        m: common_vendor.o(getPinlun),
        n: common_vendor.t(movie.value.vod_name),
        o: common_vendor.t(movie.value.vod_score),
        p: common_vendor.t(movie.value.vod_year),
        q: common_vendor.t(movie.value.vod_area),
        r: common_vendor.t(movie.value.vod_tag),
        s: common_vendor.o(feedback),
        t: common_vendor.o(dowm),
        v: common_vendor.unref(threshold).isColl ? 1 : "",
        w: common_vendor.unref(threshold).isColl ? 1 : "",
        x: !common_vendor.unref(threshold).isColl ? 1 : "",
        y: common_vendor.o(setcollection),
        z: common_vendor.o(($event) => infoTexttop.value = 0),
        A: common_vendor.t(movie.value.vod_remarks),
        B: common_vendor.f(movie.value.movieCount, (item, index, i0) => {
          return {
            a: common_vendor.t(item[0].slice(1, -1) || item[0]),
            b: item[1] == currentUrl.value ? 1 : "",
            c: item[1],
            d: index,
            e: "count" + index,
            f: index
          };
        }),
        C: common_vendor.o(setMovie),
        D: "count" + common_vendor.unref(countMovie),
        E: !infoTexttop.value
      }, !infoTexttop.value ? {
        F: common_vendor.t(movie.value.vod_name),
        G: common_vendor.o(($event) => infoTexttop.value = 1500),
        H: common_vendor.t(movie.value.vod_director),
        I: common_vendor.t(movie.value.vod_actor),
        J: common_vendor.t(movie.value.vod_year),
        K: common_vendor.t(movie.value.vod_area),
        L: common_vendor.t(movie.value.vod_content),
        M: infoTexttop.value + "rpx",
        N: overHeight.value + "px"
      } : {}, {
        O: common_vendor.p({
          title: "\u5176\u4ED6",
          tid: movie.value.type_id,
          back: false
        }),
        P: active.value == 0,
        Q: overHeight.value + "px",
        R: pinlunList.value.length != 0
      }, pinlunList.value.length != 0 ? {
        S: common_vendor.f(pinlunList.value, (item, k0, i0) => {
          return {
            a: "5dfbcc28-2-" + i0,
            b: common_vendor.p({
              item,
              refPan: $repPanel.value
            }),
            c: item._id
          };
        }),
        T: common_vendor.o(onBottom),
        U: overHeight.value + "px"
      } : {}, {
        V: pinlunList.value.length == 0 && common_vendor.unref(threshold).loading == false,
        W: common_vendor.unref(threshold).loading,
        X: common_vendor.sr($repPanel, "5dfbcc28-4", {
          "k": "$repPanel"
        }),
        Y: common_vendor.p({
          listHight: overHeight.value
        }),
        Z: active.value == 1,
        aa: common_vendor.unref(threshold).isShow,
        ab: placeholder.value,
        ac: common_vendor.o(focus),
        ad: common_vendor.o(($event) => height.value = 0),
        ae: placeholder.value.includes("\u56DE\u590D"),
        af: text.value,
        ag: common_vendor.o(($event) => text.value = $event.detail.value),
        ah: common_vendor.o(setPinlun),
        ai: height.value + "px",
        aj: common_vendor.sr($model, "5dfbcc28-5", {
          "k": "$model"
        }),
        ak: common_vendor.p({
          title: "\u53CD\u9988\u4FE1\u606F"
        })
      });
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5dfbcc28"], ["__file", "D:/\u57F9\u8BAD/vs/state4/TEST/uniapp/movie/pages/palyMovie/palyMovie.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
