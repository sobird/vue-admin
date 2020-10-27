<!--
 - index.vue
 - 
 - sobird<i@sobird.me> at 2020/10/26 21:17:16 created.
-->

<template>
  <div>
    <layout-view-header>
      拖拽功能基于
      <a href="https://github.com/SortableJS/Vue.Draggable" target="_blank">Vue.Draggable</a>
      实现，下面演示来自官方示例代码。

      <el-tabs v-model="tabName" @tab-click="tabClick">
        <el-tab-pane label="简单拖拽" name="simpleDraggable"></el-tab-pane>
        <el-tab-pane label="两列拖拽" name="twoListsDraggable"></el-tab-pane>
        <el-tab-pane label="克隆拖拽" name="cloneDraggable"></el-tab-pane>
        <el-tab-pane label="自定义克隆" name="customCloneDraggable"></el-tab-pane>
        <el-tab-pane label="Clone on Control" name="cloneOnControlDraggable"></el-tab-pane>
        <el-tab-pane label="手柄拖拽" name="handleDraggable"></el-tab-pane>
      </el-tabs>
    </layout-view-header>
    <router-view :key="$store.state.viewkey"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabName: this.$route.name,
    };
  },
  methods: {
    tabClick(tab) {
      this.$router.push({
        name: tab.name,
      });
    },
  },
};
</script>

<style lang="scss">
// 全局拖拽列表样式
.list-group {
  .list-group-item {
    border-radius: 3px;
    cursor: move;
    padding: 10px 5px;
    margin: 5px 0;
    color: #333;
    border: 1px solid #f4f6fc;
    background: #f4f6fc;

    &:hover {
      color: #409eff;
      border: 1px dashed #409eff;
    }
  }
  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
}
</style>
