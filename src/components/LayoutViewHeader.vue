<!--
 * 视图头组件
 * 
 * @author  Yang,junlong at 2018-12-28 18:58:44 build.
 * @version $Id$
-->

<template>
  <div class="view-header">
  	<Breadcrumb v-if="breadcrumb" style="margin-bottom: 20px;" />
  	<el-row>
  	  <el-col :span="12">
        <slot name="header">
  	  	<h2><i v-if="$route.meta.icon" :class="$route.meta.icon"></i>{{$route.meta.title}}</h2> &nbsp;
        </slot>
  	  </el-col>
      <el-col :span="12" style="text-align: right;">
      	<slot name="action"></slot>
      </el-col>
    </el-row>
    <slot></slot>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb.vue';
  export default {
    components: {
      Breadcrumb
    },

    props: {
      breadcrumb: {
      	type: Boolean,
      	default: true
      }
    },

    created() {
      
    }
  };
</script>

<style lang="scss">
  .view-header{
    background-color: #fff;
    margin: -15px;
    padding: 15px;
    border-bottom: 1px solid #e8e8e8;
    font-size: 14px;
    margin-bottom: 20px;
    h2{
      .fa, .fas {
        margin-right: 5px;
      }
    }
    .el-row{
      margin-bottom: 5px;
      .el-col{
        // margin-bottom: 10px;
      }
    }
    .el-tabs{
      margin-bottom: -30px;
      .el-tabs__nav-wrap::after{
        content: none;
      }
    }
  }
</style>
