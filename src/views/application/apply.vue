<!--
 - 申请新应用
 - 
 - sobird<i@sobird.me> at 2020/09/27 11:07:07 created.
-->

<template>
  <div>
    <layout-view-header />

    <el-row type="flex">
      <el-col :span="12">
        <app-form :submit="submit" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { applyApp } from './model';
import appForm from './components/appForm';

export default {
  components: {
    appForm,
  },
  data() {
    return {};
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
