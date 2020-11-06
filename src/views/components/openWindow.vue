<!--
 - 打开URL
 - 
 - sobird<i@sobird.me> at 2020/11/06 16:12:47 created.
-->

<template>
  <div>
    <layout-view-header>
      打开新窗口，既可以通过window.open的方式在新标签下打开新窗口，可以通过iframe嵌入的方式，将第三方页面嵌入到当前页面。
    </layout-view-header>

    <el-button type="primary" @click="openDrawer">抽屉模式打开网页</el-button>

    <el-button type="primary" @click="openWindow">新窗口打开网页</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  methods: {
    openDrawer: function() {
      this.$open('//sobird.me', '_drawer');
    },
    openWindow: function() {
      this.$open('//sobird.me', '_blank');
    }
  }
}
</script>