/**
 * (代理)项目所有浏览器接口请求
 * 
 * Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。
 *
 * axios 项目配置优化
 *
 * @see https://www.kancloud.cn/yunye/axios/234845
 * 
 * @author  Yang,junlong at 2018-08-21 14:17:43 build.
 * @version $Id$
 */

import axios from 'axios';
import store from '@/store';
import querystring from 'querystring';
import { Message } from 'element-ui';

const BASEURL = process.env.VUE_APP_API_ADDRESS;

axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;
axios.defaults.baseURL = BASEURL;

// 请求拦截器
axios.interceptors.request.use((request) => {
  // console.log(request);
  request.requestTimeStamp = new Date().getTime();

  // 是否序列化数据
  if (request.serialize) {
    request.data = querystring.stringify(request.data);
  }

  return request;
}, (error) => {
  Message.error(error.message);
  Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use((response) => {
  const { config, data } = response;
  data.responseTiming = new Date().getTime() - config.requestTimeStamp;

  if(config.message != undefined) {
    data.msg = config.message;
  }

  // 项目全局错误码逻辑处理
  switch (data.code) {
    case -1:
      window.location.href = `${BASEURL}/login?from=${encodeURIComponent(window.location.href)}`;
      return;
      // break;
    default:
      // todo nothing
  }

  if (data.code == 0 || data.code == undefined ) {
    // todo something
    data.msg && Message.success(data.msg);
    if(data.code == undefined) {
      return Promise.resolve(data);
    }
    return Promise.resolve(data.data);
  }

  Message.error(data.msg);

  // 业务级错误信息
  return Promise.reject({
    code: data.code,
    message: data.msg,
  });
}, error => {
  Message.error(error.message);
  Promise.reject(error);
});

export default axios;
