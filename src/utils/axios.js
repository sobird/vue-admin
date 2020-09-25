/**
 * (代理)项目所有浏览器接口请求
 *
 * Axios 是一个基于 Promise 的 HTTP 库，可以用在浏览器和Node.js中。
 *
 * axios 项目配置优化
 *
 * @see https://www.kancloud.cn/yunye/axios/234845
 *
 * @author  Yang,junlong at 2018-08-21 14:17:43 build.
 * @version $Id$
 */

import axios from "axios";
import store from "@/store";
import querystring from "querystring";
import { Message } from "element-ui";
import { remove } from "lodash";
import crypto from "crypto";

const BASEURL = process.env.VUE_APP_API_ADDRESS;

axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;
axios.defaults.baseURL = BASEURL;

// 请求拦截器
axios.interceptors.request.use(
  request => {
    request.requestTimeStamp = new Date().getTime();
    // 是否序列化数据
    if (request.serialize) {
      request.data = querystring.stringify(request.data);
    }

    return request;
  },
  error => {
    Message.error(error.message);
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  response => {
    const { config, data } = response;
    data.responseTiming = new Date().getTime() - config.requestTimeStamp;

    if (config.message != undefined) {
      data.msg = config.message;
    }

    // 项目全局错误码逻辑处理
    switch (data.code) {
      case -1:
        // 跳转登录
        window.location.href = `${BASEURL}/login?from=${encodeURIComponent(window.location.href)}`;
        return;
      // break;
      default:
      // todo nothing
    }

    // 数据请求成功结果
    if (data.code == 0) {
      // todo something
      config.message && Message.success(config.message);
      if (data.code == undefined) {
        return Promise.resolve(data);
      }
      return Promise.resolve(data.data);
    }

    Message.error(data.message);

    // 业务级错误信息
    return Promise.reject({
      code: data.code,
      message: data.message
    });
  },
  error => {
    Message.error(error.message);
    return Promise.reject(error);
  }
);

// 常用方法
const METHODS = ["get", "post", "delete"];

let _axios = {};
let _cache = {};
let urls = [];
METHODS.forEach(method => {
  let _timer = null;
  _axios[method] = function (url, data = {}) {
    // get 参数唯一性
    url = md5(url + querystring.stringify(data.params));

    if (urls.indexOf(url) === -1) {
      urls.push(url);
    }
    clearTimeout(_timer);
    _timer = setTimeout(() => {
      urls.forEach(url => {
        _cache[url] = null;
        remove(urls, url);
      });
    }, 1000);
    if (_cache[url]) {
      return _cache[url];
    }
    _cache[url] = axios[method](...arguments);

    return _cache[url];
  };
});

function md5(str) {
  let hash = crypto.createHash("md5");
  return hash.update(str).digest("hex");
}

export default Object.assign({}, axios, _axios);
