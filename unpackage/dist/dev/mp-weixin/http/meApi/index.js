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
var http_index = require("../index.js");
const getDiffuseApi = (data = {}) => http_index.request({
  url: "/max/vod/json",
  data: __spreadValues({
    ac: "detail",
    pg: 1,
    limit: 6,
    h: 332
  }, data)
});
const getMovieApi = (data = {}) => http_index.request({
  url: "/max/vod/json",
  data: __spreadValues({
    ac: "detail"
  }, data)
});
const getSearchApi = (data = {}) => http_index.request({
  url: "/max/vod/json",
  data: __spreadValues({
    ac: "detail"
  }, data)
});
const getFenleiApi = (data = {}) => http_index.request({
  url: "/max/vod/json",
  data: __spreadValues({
    ac: "detail",
    pg: 1,
    limit: 15
  }, data)
});
const getMovieType = (data = {}) => http_index.request({
  url: "/ct/vod/json",
  data: {
    ac: "detail"
  }
});
exports.getDiffuseApi = getDiffuseApi;
exports.getFenleiApi = getFenleiApi;
exports.getMovieApi = getMovieApi;
exports.getMovieType = getMovieType;
exports.getSearchApi = getSearchApi;
