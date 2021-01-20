<!--
 * 面包屑组件
 * 
 * @author  Yang,junlong at 2018-11-07 15:28:14 build.
 * @version $Id$
-->

<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="item.path">
      <span v-if="index == breadcrumb.length - 1">{{ item.meta.title }}</span>
      <router-link v-else :to="{ path: item.path }">{{ item.meta.title }}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  computed: {
    breadcrumb: {
      get() {
        const { matched } = this.$route;
        return matched;
      },
    },
  },
};
</script>
