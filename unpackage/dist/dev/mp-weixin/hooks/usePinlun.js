"use strict";
var common_vendor = require("../common/vendor.js");
var store_index = require("../store/index.js");
function usePinlun() {
  const pinia = store_index.Pinia();
  const page = common_vendor.reactive({
    pg: 1,
    limit: 10
  });
  async function getPinlunList(vod_id, next = false) {
    next && page.pg++;
    const { data, code } = await common_vendor.index.$cloud("getCommentList", { vod_id, pg: page.pg, limit: page.limit });
    console.log("\u8BC4\u8BBA\u5217\u8868", data);
    if (code != 200)
      return [];
    return data;
  }
  async function setPinlun(vod_id, text) {
    const { code } = await common_vendor.index.$cloud("setComments", { vod_id, username: pinia.user.username, avatar: pinia.user.cloudAvatar, text });
    page.pg = 1;
    if (code == 200)
      common_vendor.index.showToast({
        title: "\u5DF2\u53D1\u9001",
        icon: "none"
      });
    const newData = await getPinlunList(vod_id);
    return newData;
  }
  async function setHistory({ movie, vod_id, movie_time, count }) {
    try {
      const data = await common_vendor.index.$cloud("setHistory", {
        username: pinia.user.username,
        openid: pinia.user.openid,
        movie,
        vod_id,
        movie_time,
        count
      });
    } catch (e) {
      console.log(e);
    }
  }
  async function getToHis(vod_id) {
    try {
      const { data } = await common_vendor.index.$cloud("getTohis", {
        vod_id
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  async function getbanmuList(vod_id) {
    try {
      const { data, errMsg } = await common_vendor.index.$cloud("getbanmuList", { vod_id });
      console.log(data, errMsg);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  async function setbanmu(vod_id, banmu) {
    try {
      const data = await common_vendor.index.$cloud("setbanmu", { vod_id, banmu });
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  async function setrepUser(_id, text) {
    try {
      const data = await common_vendor.index.$cloud("setrepUser", { _id, text, avatar: pinia.user.cloudAvatar, username: pinia.user.username });
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  return {
    get: getPinlunList,
    set: setPinlun,
    setHistory,
    getbanmuList,
    setbanmu,
    getToHis,
    setrepUser
  };
}
exports.usePinlun = usePinlun;
