"use strict";
var common_vendor = require("../common/vendor.js");
var store_index = require("../store/index.js");
function onNetworkChange() {
  const Store = store_index.Pinia();
  common_vendor.index.getNetworkType({
    success: function(res) {
      const networkType = res.networkType;
      console.log(networkType);
      if (networkType != "none") {
        return Store.setNetwork(true);
      }
      common_vendor.index.showToast({
        icon: "none",
        title: "\u7F51\u7EDC\u9519\u8BEF,\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5"
      });
    }
  });
  common_vendor.index.onNetworkStatusChange((result) => {
    getCurrentPages();
    if (!result.isConnected) {
      Store.setNetwork(false);
      common_vendor.index.showToast({
        title: "\u670D\u52A1\u5668\u5F00\u5C0F\u5DEE\u4E86\u54E6!",
        icon: "none"
      });
    } else {
      common_vendor.index.showToast({
        title: "\u7F51\u7EDC\u5DF2\u8FDE\u63A5",
        icon: "none"
      });
      Store.setNetwork(true);
    }
  });
}
function isTabBar(path) {
  if (!path)
    return true;
  const TabBar = ["pages/index/index", "pages/classif/classif", "pages/me/me"];
  return TabBar.includes(path);
}
exports.isTabBar = isTabBar;
exports.onNetworkChange = onNetworkChange;
