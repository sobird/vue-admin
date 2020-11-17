/**
 * model.js
 *
 * sobird<i@sobird.me> at 2020/11/17 15:08:15 created.
 */

import axios from '@/utils/axios';

export function simple(data) {
  return axios.get('/graph/simple.json', {
    params: data,
    message: '',
  });
}


export function doubleTree(data) {
  return axios.get('/graph/doubleTree.json', {
    params: data,
    message: '',
  });
}