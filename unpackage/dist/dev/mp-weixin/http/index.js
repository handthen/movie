"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var common_vendor = require("../common/vendor.js");
require("../store/index.js");
const typeMap = {
  9699423: 24,
  9699424: 25,
  9699425: 26,
  1310800: 1,
  65602: 2,
  65603: 11,
  24: 9699423,
  25: 9699424,
  26: 9699425,
  11: 310800,
  2: 65602,
  11: 65603
};
const baseUrl = "https://jyzyapi.com/provide/vod/from/jinyingm3u8/at/json";
let currentBase = baseUrl;
exports.wxTask = null;
var request = async (option = {
  method: "get",
  data: {},
  header: {
    "content-type": "application/x-www-form-urlencoded"
  }
}) => {
  const {
    Pinia
  } = require("../store/index.js");
  const store = Pinia();
  if (!store.isNetwork) {
    common_vendor.index.showToast({
      icon: "none",
      title: "\u7F51\u7EDC\u4F3C\u4E4E\u65AD\u5F00\u4E86"
    });
    return Promise.reject("\u7F51\u7EDC\u9519\u8BEF");
  }
  return new Promise((resolve, reject) => {
    var _a;
    exports.wxTask = common_vendor.index.request({
      url: currentBase + "",
      method: option.method,
      data: __spreadProps(__spreadValues({}, option.data), {
        ["limit"]: ((_a = option.data) == null ? void 0 : _a.limit) || 20,
        cid: typeMap[option.data.tid] || option.data.t || 0,
        t: option.data.tid || option.data.t || 0
      }),
      header: __spreadValues({}, option.header),
      timeout: 6e3,
      success: (res) => {
        console.log("res", res);
        if (res.statusCode >= 200 && res.statusCode <= 300) {
          if (res.data.code == 1 || res.data.code == 200) {
            resolve(apder(res.data));
          } else {
            common_vendor.index.showToast({
              icon: "none",
              title: "\u83B7\u53D6\u5931\u8D25",
              mask: true
            });
            return reject(res);
          }
        } else {
          reject(res);
        }
      },
      fail: (e) => {
        var _a2, _b;
        console.log("aperr", e);
        if (((_a2 = e.errMsg) == null ? void 0 : _a2.indexOf("abort")) != -1) {
          return;
        }
        let msg = null;
        if (((_b = e.errMsg) == null ? void 0 : _b.indexOf("timeout")) != -1) {
          msg = "\u8BF7\u6C42\u8D85\u65F6";
        }
        common_vendor.index.showToast({
          icon: "none",
          title: msg || "\u670D\u52A1\u5668\u5F00\u5C0F\u5DEE\u4E86",
          mask: true
        });
      },
      complete: () => {
        exports.wxTask = null;
      }
    });
  });
};
function apder(data) {
  var _a, _b;
  if (!data.list) {
    data.list = data.data;
  }
  data.list = (_a = data.list) == null ? void 0 : _a.map((v) => {
    return __spreadProps(__spreadValues({}, v), {
      daoyan: v.vod_director || "",
      zhuyan: v.vod_actor || ""
    });
  });
  data.class = (_b = data.class) == null ? void 0 : _b.map((v) => {
    return __spreadValues({
      id: v.type_id || "",
      name: v.type_name || "",
      type_id: v.id || "",
      type_name: v.name || ""
    }, v);
  });
  return data;
}
const is = () => {
  return true;
};
exports.is = is;
exports.request = request;
