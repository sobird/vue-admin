/**
 * model.js
 *
 * sobird<i@sobird.me> at 2020/10/26 14:07:01 created.
 */

import axios from '@/utils/axios';

/**
 * 查询curd示例数据
 *
 * @param {Object} data
 */
export function queryCurdData(data = {}) {
  return axios.get('/designer/curd/list.json', {
    params: data,
    message: '',
  });
}

/**
 * 保存员工信息
 *
 * @param {*} data
 */
export function saveEmployee(data = {}) {
  return axios.post('/submit.json', data, {
    message: '',
  });
}

/**
 * 保存员工信息
 *
 * @param {*} data
 */
export function deleteEmployee(data = {}) {
  return axios.post('/submit.json', data, {
    message: '',
  });
}
