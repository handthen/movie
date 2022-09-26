"use strict";
var common_vendor = require("../common/vendor.js");
var store_index = require("../store/index.js");
function useComment() {
  const pinia = store_index.Pinia();
  async function isCommection(id) {
    const { data, code } = await common_vendor.index.$cloud("isCollection", {
      vod_id: +id
    });
    if (code == 200)
      return !!data;
  }
  async function collection(movie, vod_id, state) {
    if (!pinia.user.openid)
      return common_vendor.index.showToast({
        title: "\u64CD\u4F5C\u5931\u8D25",
        icon: "none"
      });
    const {
      data,
      code,
      msg
    } = await common_vendor.index.$cloud("setCollection", {
      state,
      username: pinia.user.username,
      movie,
      vod_id
    });
    if (code != 200)
      return;
    common_vendor.index.showToast({
      title: msg || "",
      icon: "none"
    });
    return !!data;
  }
  return {
    isCommection,
    collection
  };
}
exports.useComment = useComment;
