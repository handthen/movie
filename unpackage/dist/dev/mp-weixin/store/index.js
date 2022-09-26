"use strict";
var __defProp = Object.defineProperty;
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
var common_vendor = require("../common/vendor.js");
const defauleUrl = "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";
const Pinia = common_vendor.defineStore("myPinia", {
  state: () => ({
    isNetwork: true,
    user: {
      avatarUrl: common_vendor.index.getStorageSync("avatarUrl") || defauleUrl,
      cloudAvatar: common_vendor.index.getStorageSync("cloudAvatar") || defauleUrl,
      username: common_vendor.index.getStorageSync("username") || "\u5FAE\u4FE1\u7528\u6237",
      openid: common_vendor.index.getStorageSync("openid") || ""
    },
    navBarHight: 0,
    classif: null
  }),
  getters: {
    getClass(state) {
      const classif = state.classif;
      state.classif = null;
      return classif;
    }
  },
  actions: {
    setNetwork(net) {
      this.isNetwork = net;
    },
    setuser(userinfo) {
      this.$patch({
        user: __spreadValues(__spreadValues({}, this.user), userinfo)
      });
    }
  }
});
exports.Pinia = Pinia;
