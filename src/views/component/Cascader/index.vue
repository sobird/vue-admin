<!--
 * 级联选择器
 * 
 * @author  Yang,junlong at 2019-03-20 10:36:30 build.
 * @version $Id$
-->

<template>
  <div>
  	<layout-view-header>中国行政区级联选择组件</layout-view-header>

  	<el-card shadow="never" style="border: none;">
  	  <el-cascader
	    :options="options"
		:props="{ expandTrigger: 'hover' }"
	    @active-item-change="handleChange">
	  </el-cascader>
  	</el-card>
  </div>
</template>

<script>
  // https://github.com/guaneagler/area-puppeteer
  import pcaa from './pcaa';

  export default {
  	data() {
  	  return {
  	  	options: []
  	  }
  	},

  	created() {
  	  let res = this.formatAreaData(86, pcaa);

  	  this.options = res;
  	},

  	methods: {
  	  formatAreaData(code, areaData) {
  	  	let data = areaData[code];
  	  	let res = [];

  	  	//console.log(data);
  	  	if(!data) {
  	  	  return;
  	  	}	
		
        for (let code in data) {
          let item = {
            value: code,
            label: data[code],
		  };

          let children = this.formatAreaData(code, areaData);
          if(children) {
          	item.children = children;

          }

          res.push(item);          
        }
        return res;
  	  },

  	  handleChange(value) {
  	  	
  	  }
  	}
  };
</script>
