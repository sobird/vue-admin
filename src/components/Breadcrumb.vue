<!--
 * 面包屑组件
 * 
 * @author  Yang,junlong at 2018-11-07 15:28:14 build.
 * @version $Id$
-->

<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if="item.title">
      <span
        v-if="item.redirect === 'noredirect' || index == levelList.length-1"
        class="no-redirect"
      >{{item.title}}</span>
      <router-link v-else :to="{name: item.name}">{{item.title}}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  created() {
    this.getBreadcrumb();
  },
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  methods: {
    getBreadcrumb() {
      let breadcrumb = this.$route.meta.breadcrumb;
      if (breadcrumb) {
        breadcrumb = breadcrumb.filter(item => item.name);
        breadcrumb.push({
          name: this.$route.name,
          title: this.$route.meta.title,
        });
      }
      let matched =
        breadcrumb ||
        this.$route.matched.filter(item => {
          return (item.title = item.meta.title);
        });
      const first = matched[0];

      if (first && first.name !== '首页') {
        matched = [{ name: 'home', title: '首页' }].concat(matched);
      }

      this.levelList = matched;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
