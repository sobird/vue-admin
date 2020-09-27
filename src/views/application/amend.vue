<!--
 - 修改应用
 - 
 - sobird<i@sobird.me> at 2020/09/27 13:33:42 created.
-->

<template>
  <div>
    <layout-view-header />

    <el-row type="flex">
      <el-col :span="12">
        <app-form mode="update" :vmodel="vmodel" :submit="submit" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { applyApp, queryApp } from './model';
import appForm from './components/appForm';

export default {
  components: {
    appForm,
  },
  data() {
    return {
        vmodel: {}
    };
  },

  mounted(){
      const { query } = this.$route;

      queryApp(query).then(res => {
          this.vmodel = res;
      });
  },

  methods: {
    submit(vmodel) {
      applyApp(vmodel).then(res => {
        this.$router.push({
          name: 'myApp',
        });
      });
    },
  },
};
</script>
