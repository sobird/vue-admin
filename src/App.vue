<template>
  <div id="app" :class="$route.name">
    <router-view />
  </div>
</template>

<script type="text/javascript">
  import { userInfo } from '@/models/common';

  export default {
    created() {
      userInfo().then(userinfo => {
        this.$store.dispatch('setUserInfo', userinfo);
      });
    }
  };
</script>

<style lang="scss">
html {
  height: 100%;
}
body {
  background-color: #f3f9fb;
  height: 100%;
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
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
