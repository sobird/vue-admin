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
	    @active-item-change="handleChange">
	  </el-cascader>
  	</el-card>
  </div>
</template>

<script>
  import pcaa from 'area-data';

  console.log(pcaa.pca);

  export default {
  	data() {
  	  return {
  	  	options: []
  	  }
  	},

  	created() {
  	  let res = this.formatAreaData(86, pcaa);

  	  console.log(res);

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
  	  	let i = 1;
        for (const p in data) {
          let item = {
            value: p,
            label: data[p],
            //children: []
          };

          let children = this.formatAreaData(p, areaData);
          if(children) {
          	item.children = children;

          }



          res.push(item);

          // if(i == 3) {
          // 	return res;
          // }

          i++;

          
        }



        return res;
  	  },

  	  handleChange(value) {
  	  	
  	  }
  	}
  };
</script>
