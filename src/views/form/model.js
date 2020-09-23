/**
 * 业务模块数据模型文件
 * 
 * sobird<i@sobird.me> at 2020/09/23 21:12:48 created.
 */

import axios from "@/utils/axios";

export function schemaForm(data = {}) {
    return axios.get("/schema/form.json", {
      params: data,
      message: ""
    });
  }