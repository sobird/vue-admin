/**
 * 页面 数据模型
 * 
 * sobird<i@sobird.me> at 2020/09/27 15:00:15 created.
 */

import axios from "@/utils/axios";

/**
 * 查询我的APP
 * 
 * @param {Object} data 
 */
export function myPage(data = {}) {
  return axios.get("/page/my.json", {
    params: data,
    message: ""
  });
}

/**
 * 创建页面
 * 
 * @param {Object} data 
 */
export function createPage(data = {}) {
  return axios.post("/page/create.json", data, {
    message: ""
  });
}

/**
 * 更新页面
 * 
 * @param {Object} data 
 */
export function updatePage(data = {}) {
  return axios.post("/page/create.json", data, {
    message: ""
  });
}

/**
 * 查询页面详情
 * 
 * @param {Object} data 
 */
export function queryPage(params = {}) {
  return axios.get("/page/detail.json", {
    params,
    message: ""
  });
}
