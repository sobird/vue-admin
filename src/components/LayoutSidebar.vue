<!--
 * 侧边栏导航组件
 *  
 * @author  Yang,junlong at 2018-11-06 15:05:01 build.
 * @version $Id$
-->

<template>
  <el-scrollbar class="mix-sidebar-scrollbar" wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="$route.path || 1"
      router
      :collapse="sidebar.collapse"
      background-color="#001529"
      text-color="#fff"
      active-text-color="rgba(240, 130, 76, 0.8)">

      <el-submenu index="0">
        <template slot="title">
          <i class="iconfont icon-dashboard"></i>
          <span>控制台</span>
        </template>

        <el-menu-item index="/">
          <span slot="title">分析页</span>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="/form">
        <template slot="title">
          <i class="iconfont icon-form"></i>
          <span>表单页</span>
        </template>

        <el-menu-item index="/form">
          <span slot="title">基础表单</span>
        </el-menu-item>
        <el-menu-item index="/form/step">
          <span slot="title">分步表单</span>
        </el-menu-item>
        <el-menu-item index="/form/advanced">
          <span slot="title">高级表单</span>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="/component">
        <template slot="title">
          <i class="iconfont icon-component"></i>
          <span>组件</span>
        </template>

        <el-menu-item index="/component/cascader">
          <span slot="title">级联选择器</span>
        </el-menu-item>
      </el-submenu>

      <el-menu-item index="/project">
        <i class="iconfont icon-product-hunt"></i>
        <span slot="title">我的项目</span>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters([
        'sidebar',
      ]),

      // 导航菜单
      navMenus() {
        return this.$router.options.navRouter;
      }
    },
    created() {
   	  
    },
    mounted(){
      console.log(this.$router);
    }
  };
</script>

<style lang="scss" scoped>
  .mix-sidebar-scrollbar {
    height: calc(100% - 48px);
    width: 200px;
    position: fixed;
    background-color: #001529;
    box-shadow: 2px 0 6px rgba(0,0,0,.15);
    
    transition: width .3s;
    .el-menu{
      border-right: 0;
      .iconfont{
        position: relative;
        top: -2px;
        margin-right: 5px;
        width: 15px;
      }
      .el-submenu{
        position: relative;
      }
      .el-menu-item{
        position: relative;
        margin-bottom: 1px;
        height: 40px;
        line-height: 40px;
      }
      .is-active{
        box-shadow: rgba(0,0,0,.85) 0 1px 0, inset rgba(255,255,255,.1) 0 1px 0;
        &:before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          border-right: 2px solid rgba(240, 130, 76, 0.8);
        }
      }
    }
  }
</style>
