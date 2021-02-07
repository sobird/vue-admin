<!--
 - 编辑页面基本信息
 - 
 - sobird<i@sobird.me> at 2020/09/27 16:15:39 created.
-->

<template>
  <div>
    <layout-view-header />

    <el-row type="flex">
      <el-col :span="12">
        <page-form mode="update" :vmodel="vmodel" :submit="submit" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { updatePage, queryPage } from './model';
import pageForm from './components/pageForm';

export default {
  components: {
    pageForm,
  },
  data() {
    return {
        vmodel: {}
    };
  },

  mounted(){
      const { query } = this.$route;

      queryPage(query).then(res => {
          this.vmodel = res;
      });
  },

  methods: {
    submit(vmodel) {
      updatePage(vmodel).then(res => {
        this.$router.push({
          name: 'myPage',
        });
      });
    },
  },
};
</script>
