"use strict";
var common_vendor = require("../common/vendor.js");
function usepanel() {
  function getpanel() {
    const data = JSON.parse(common_vendor.index.getStorageSync("panel") || "{}") || {};
    return Object.keys(data);
  }
  function setpanel(value) {
    let panel = JSON.parse(common_vendor.index.getStorageSync("panel") || "{}") || {};
    panel[value] = value;
    common_vendor.index.setStorageSync("panel", JSON.stringify(panel));
  }
  function clearpanel() {
    common_vendor.index.clearStorageSync();
  }
  return {
    getpanel,
    setpanel,
    clearpanel
  };
}
exports.usepanel = usepanel;
