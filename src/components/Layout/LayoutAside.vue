<!--
 * 侧边栏导航组件
 *  
 * @author  Yang,junlong at 2018-11-06 15:05:01 build.
 * @version $Id$
-->

<template>
  <aside id="aside" class="aside">
    <el-scrollbar class="aside">
      <el-menu
        :default-active="$route.path || 1"
        router
        :collapse="aside.collapse"
        background-color="#001529"
        text-color="#fff"
        active-text-color="rgba(240, 130, 76, 0.8)"
      >
        <el-submenu index="0">
          <template #title>
            <i class="iconfont icon-dashboard"></i>
            <span>控制台</span>
          </template>

          <el-menu-item index="/">
            分析页
          </el-menu-item>
        </el-submenu>

        <el-submenu index="/application">
          <template #title>
            <i class="iconfont icon-application"></i>
            <span>应用管理</span>
          </template>

          <el-menu-item index="/application/my">
            我的应用
          </el-menu-item>

          <el-menu-item index="/page/my">
            我的页面
          </el-menu-item>
        </el-submenu>

        <el-submenu index="/form">
          <template #title>
            <i class="iconfont icon-form"></i>
            <span>表单页</span>
          </template>

          <el-menu-item index="/form">
            基础表单
          </el-menu-item>
          <el-menu-item index="/form/step">
            分步表单
          </el-menu-item>
          <el-menu-item index="/form/advanced">
            高级表单
          </el-menu-item>
          <el-menu-item index="/form/schema">
            Schema表单
          </el-menu-item>
          <el-menu-item index="/form/api">
            接口配置表单
          </el-menu-item>
        </el-submenu>

        <el-submenu index="/components">
          <template #title>
            <i class="iconfont icon-component"></i>
            <span>组件</span>
          </template>

          <el-menu-item index="/components/draggable/simple">
            拖拽组件
          </el-menu-item>
          <el-menu-item index="/components/openWindow">
            打开新窗口
          </el-menu-item>
        </el-submenu>

        <el-submenu index="/graph">
          <template #title>
            <i class="iconfont icon-graph"></i>
            <span>图表</span>
          </template>

          <el-menu-item index="/graph">
            简单图表
          </el-menu-item>
          <el-menu-item index="/graph/double-tree">
            双树图表
          </el-menu-item>
        </el-submenu>

        <el-submenu index="/designer">
          <template #title>
            <i class="iconfont icon-designer"></i>
            <span>设计器</span>
          </template>

          <el-menu-item index="/designer/curd">
            CRUD表格
          </el-menu-item>
        </el-submenu>

        <el-menu-item index="/project">
          <i class="iconfont icon-product-hunt"></i>
          我的项目
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['aside']),

    // 导航菜单
    navMenus() {
      return this.$router.options.navRouter;
    },
  },
  created() {},
  mounted() {
    console.log(this.$router.options);
  },
};
</script>

<style lang="scss" scoped>
.aside {
  height: 100%;
  width: 200px;
  position: fixed;
  background-color: #001529;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.15);

  transition: width 0.3s;

  .el-menu {
    border-right: 0;
    .iconfont {
      position: relative;
      top: -1px;
      margin-right: 5px;
      width: 15px;
      font-size: 15px;
      display: inline-block;
    }
    .el-submenu {
      position: relative;
    }
    .el-menu-item {
      font-size: 14px;
      position: relative;
      margin-bottom: 1px;
      height: 40px;
      line-height: 40px;
    }
    .el-submenu__title {
      font-size: 14px;
      height: 40px;
      line-height: 40px;
    }
    .is-active {
      box-shadow: rgba(0, 0, 0, 0.85) 0 1px 0, inset rgba(255, 255, 255, 0.1) 0 1px 0;
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        border-right: 2px solid rgba(240, 130, 76, 0.8);
      }
    }
  }
}

// 子菜单高度重置
.el-menu--vertical {
  .el-menu-item {
    height: 48px;
    line-height: 48px;
    .iconfont {
      margin-right: 5px;
    }
  }
}
</style>
