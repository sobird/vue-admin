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
      active-text-color="rgba(255, 255, 255, 1)">

      <el-submenu v-for="(item, index) in navMenus" :index="index+''" :key="index">
        <template slot="title">
          <i v-if="item.meta.icon" :class="item.meta.icon"></i>
          <span>{{item.meta.title}}</span>
        </template>

        <el-menu-item v-for="child in item.children" :index="item.path + ( child.path ? '/' + child.path : '')">
          <i v-if="child.meta.icon" :class="child.meta.icon"></i>
          <span slot="title">{{child.meta.title}}</span>
        </el-menu-item>
      </el-submenu>
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
      .fa, .fas{
        position: relative;
        top: -1px;
        margin-right: 5px;
        width: 15px;
      }
      .el-menu-item{
        margin-bottom: 1px;
        height: 40px;
        line-height: 40px;
      }
      .is-active{
        box-shadow: rgba(0,0,0,.85) 0 1px 0, inset rgba(255,255,255,.1) 0 1px 0;
        background-color: #1890ff !important;
      }
    }
  }
</style>
