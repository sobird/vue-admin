/**
 * 应用管理数据模型
 * 
 * sobird<i@sobird.me> at 2020/09/26 23:03:15 created.
 */

import axios from "@/utils/axios";

/**
 * 查询我的APP
 * 
 * @param {Object} data 
 */
export function myApp(data = {}) {
  return axios.get("/app/my.json", {
    params: data,
    message: ""
  });
}

/**
 * 删除应用
 * 
 * @param {Object} data 
 */
export function delApp(data = {}) {
  return axios.post("/submit.json", {
    params: data,
    message: ""
  });
}

/**
 * 申请应用
 * 
 * @param {Object} data 
 */
export function applyApp(data = {}) {
  return axios.post("/app/apply.json", data, {
    message: ""
  });
}

/**
 * 查询应用详情
 * 
 * @param {Object} data 
 */
export function queryApp(data = {}) {
  return axios.get("/app/detail.json", {
    params: data,
    message: ""
  });
}
