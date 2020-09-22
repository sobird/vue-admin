/**
 * 全站通用模型
 *
 * @author  Yang,junlong at 2019-02-26 17:34:38 build.
 * @version $Id$
 */

import axios from "../utils/axios";

export function userInfo() {
  return axios.get("/user/info.json", {
    message: ""
  });
}

export function submitForm(data) {
  return axios.post("/submit", data, {
    message: "提交成功！"
  });
}

export function analysisEcharts() {
  return axios.get("/stat/analysis.json", {
    message: ""
  });
}

// 卧室类型
export const bedroomTypeOptions = [
  { value: 1, label: '主卧' },
  { value: 2, label: '次卧' },
];

// 卧室朝向
export const bedroomFaceOptions = [
  { value: 1, label: '东' },
  { value: 2, label: '南' },
  { value: 3, label: '西' },
  { value: 4, label: '北' },
  { value: 5, label: '东南' },
  { value: 6, label: '东北' },
  { value: 7, label: '西南' },
  { value: 8, label: '西北' },
];

// 房屋配置
export const houseAllocationOptions = [
  { value: 1, label: '床' },
  { value: 2, label: '衣柜' },
  { value: 3, label: '书桌' },
  { value: 4, label: '空调' },
  { value: 5, label: '暖气' },
  { value: 6, label: '电视机' },
  { value: 7, label: '燃气' },
  { value: 8, label: '微波炉' },
  { value: 9, label: '电磁炉' },
  { value: 10, label: '热水器' },
  { value: 11, label: '洗衣机' },
  { value: 12, label: '冰箱' },
  { value: 13, label: 'WIFI' },
];

// 房屋特色标签
export const houseFeatureOptions = [
  { value: 1, label: '离地铁近' },
  { value: 2, label: '阳台' },
  { value: 3, label: '独立卫生间' },
  { value: 4, label: '厨房' },
  { value: 5, label: '电梯' },
];

// 配套服务
export const houseServiceOptions = [
  { value: 1, label: '健身房' },
  { value: 2, label: '公寓超市' },
  { value: 3, label: '智能门锁' },
  { value: 4, label: 'ATM机' },
  { value: 5, label: '房间清洁' },
  { value: 6, label: '专属客服' },
  { value: 7, label: '代收快递' },
];

// 不给租的租客类型
export const refuseTenantOptions = [
  { value: 1, label: '已经退休的爷爷奶奶们' },
  { value: 2, label: '50岁以上的单身大叔' },
  { value: 3, label: '制造噪音打扰邻居的朋友们' },
  { value: 4, label: '“霸气冲天”的土豪小伙' },
  { value: 5, label: '带领小baby的入住的年轻父母' },
  { value: 6, label: '乱扔垃圾，不爱护环境的小伙伴' },
  { value: 7, label: '学历低于大专的小伙伴' },
  { value: 8, label: '无宠物不欢，无宠物不能生活，无宠物不能自理的小伙伴' }
];