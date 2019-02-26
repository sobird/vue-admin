/**
 * 项目模型
 * 
 * @author  Yang,junlong at 2019-02-26 20:48:44 build.
 * @version $Id$
 */

import axios from '../utils/axios';

export function projectCreate(data) {
  return axios.post('/project/projectinfo/add', data, {
    message: ''
  });
};

/**
 * 通过用户id获取参与的项目列表
 * 
 * @return {[type]} [description]
 */
export function projectQuery(data) {
  return axios.get('/project/projectinfo/get', {
    params: data
  });
}
