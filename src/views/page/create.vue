<!--
 - 新建页面
 - 
 - sobird<i@sobird.me> at 2020/09/27 15:19:59 created.
-->

<template>
  <div>
    <layout-view-header />

    <el-row type="flex">
      <el-col :span="12">
        <page-form :submit="submit" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { createPage } from './model';
import pageForm from './components/pageForm';

export default {
  components: {
    pageForm,
  },
  data() {
    return {};
  },

  methods: {
    submit(vmodel) {
      createPage(vmodel).then(res => {
        this.$router.push({
          name: 'myPage',
        });
      });
    },
  },
};
</script>
