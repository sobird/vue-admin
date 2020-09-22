<!--
 * 级联选择器
 * 
 * @author  Yang,junlong at 2019-03-20 10:36:30 build.
 * @version $Id$
-->

<template>
  <el-cascader
    :options="options"
    :props="{ expandTrigger: 'hover' }"
    @active-item-change="handleChange"
	style="width: 300px;"
  ></el-cascader>
</template>

<script>
// https://github.com/guaneagler/area-puppeteer
import pcaa from "./pcaa";

export default {
  data() {
    return {
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

      //console.log(data);
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

    handleChange(value) {}
  }
};
</script>
