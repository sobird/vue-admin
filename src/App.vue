<template>
  <div id="app" :class="$route.name">
    <router-view />
    <Browser />
  </div>
</template>

<script type="text/javascript">
import { mapActions } from 'vuex';
import { userInfo } from '@/models/common';

export default {
  created() {
    userInfo().then(res => {
      this.userInfo(res);
    });
  },

  mounted() {},

  methods: {
    ...mapActions([
      // 将 `this.userInfo()` 映射为 `this.$store.dispatch('userInfo')`
      'userInfo',
    ]),
  },
};
</script>

<style lang="scss">
html {
  height: 100%;
}
body {
  background-color: #f3f9fb;
  height: 100%;
  font-size: 14px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  overflow-y: hidden;
}
.iconfont {
  font-size: 12px;
}
.el-input-group__append,
.el-input-group__prepend {
  padding: 0 10px;
}
</style>
