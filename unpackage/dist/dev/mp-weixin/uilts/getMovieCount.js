"use strict";
var http_index = require("../http/index.js");
const getMovie = function(str) {
  if (!str)
    return [];
  let b = http_index.is() ? "#" : "\r";
  let arr = str.split(b).filter((v) => v.includes(".m3u8"));
  let arrCount = arr.map((v) => v.split("$"));
  return arrCount;
};
const formatTime = (time) => {
  let currentTime = new Date();
  let currentTimestamp = parseInt(currentTime.getTime() / 1e3);
  let t = new Date(time);
  let oldTimestamp = parseInt(t.getTime() / 1e3);
  let oldY = t.getFullYear();
  let oldM = t.getMonth() + 1;
  let oldD = t.getDate();
  let oldH = t.getHours();
  let oldi = t.getMinutes();
  t.getSeconds();
  let timestampDiff = currentTimestamp - oldTimestamp;
  if (timestampDiff < 60) {
    return "\u521A\u521A";
  }
  if (timestampDiff < 60 * 60) {
    return Math.floor(timestampDiff / 60) + "\u5206\u949F\u524D";
  }
  if (oldY === currentTime.getFullYear() && oldM === currentTime.getMonth() + 1 && oldD === currentTime.getDate()) {
    return `${zeroize(oldH)}:${zeroize(oldi)}`;
  }
  return `${oldY}-${zeroize(oldM)}-${zeroize(oldD)}`;
  function zeroize(num) {
    return num < 10 ? "0" + num : num;
  }
};
function formMovieTime(miu) {
  if (miu < 60) {
    return "00:00:" + miu;
  }
  let s = 0;
  let m = 0;
  let h = 0;
  h = parseInt(miu / 60 / 60);
  m = parseInt(miu / 60);
  s = miu - m * 60 - h * 60 * 60;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  return h + ":" + m + ":" + s;
}
exports.formMovieTime = formMovieTime;
exports.formatTime = formatTime;
exports.getMovie = getMovie;
