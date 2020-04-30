/**
 * 全站通用模型
 *
 * @author  Yang,junlong at 2019-02-26 17:34:38 build.
 * @version $Id$
 */

import axios from "../utils/axios";

export function userInfo() {
  return axios.get("/userinfo", {
    message: ""
  });
}

export function submit(data) {
  return axios.post("/submit", data, {
    message: "提交成功！"
  });
}

export function analysisEcharts() {
  return axios.get("/charts/analysis", {
    message: ""
  });
}
