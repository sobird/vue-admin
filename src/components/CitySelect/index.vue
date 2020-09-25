<!--
 * 级联选择器
 * 
 * @author  Yang,junlong at 2019-03-20 10:36:30 build.
 * @version $Id$
-->

<template>
<div>
  <el-cascader
    v-model="vmodel"
	clearable
    ref="cityCascader"
    :options="options"
    :props="{ checkStrictly: true, expandTrigger: 'hover' }"
    @change="change"
    style="width: 300px;"
  ></el-cascader>
  </div>
</template>

<script>
// https://github.com/guaneagler/area-puppeteer
import pcaa from "./pcaa";

// 遍历获取级联选择器对象
function getCascaderObj(val, opt) {
  return val.map(function(value, index, array) {
    for (var item of opt) {
      if (item.value == value) {
        opt = item.children;
        const { value, label } = item;
        return {
          value,
          label
        };
      }
    }
    return null;
  });
}

export default {
  data() {
    return {
      vmodel: [],
      options: []
    };
  },

  created() {
    let res = this.formatAreaData(86, pcaa);

    this.options = res;
  },

  methods: {
    formatAreaData(areaCode, areaData) {
      let data = areaData[areaCode];
      let res = [];

      if (!data) {
        return;
      }

      for (let code in data) {
        let item = {
          value: code,
          label: data[code]
        };

        let children = this.formatAreaData(code, areaData);

        if (data[code] == "市辖区") {
          res.push(...children);
          return res;
        }

        if (children) {
          item.children = children;
        }

        res.push(item);
      }
      return res;
    },

    change(value) {
      let cascaderObjs = getCascaderObj(value, this.options);

      this.$emit("input", cascaderObjs);
      this.$refs.cityCascader.dropDownVisible = false;
    }
  }
};
</script>
