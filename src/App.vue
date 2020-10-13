<template>
  <div id="app" :class="$route.name">
    <router-view />
  </div>
</template>

<script type="text/javascript">
import vuex from 'vuex/dist/vuex.esm';
//import { userInfo } from '@/models/common';

import * as test from './assets/logo.png';
import test1 from './assets/logo.png';


console.log(vuex);
console.log(test);
console.log(test1);
console.log(test2);

class A  {
  
}
export default function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
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
