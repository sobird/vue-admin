<!--
 - 404页面未找到错误页
 - 
 - sobird<i@sobird.me> at 2020/02/26 21:42:12 created.
-->

<template>
  <div class="not-found">
    <img :src="require('@/assets/not-found.png')" class="error-img" />
    <h1>抱歉，页面暂时无法访问...</h1>
    <p>请核对您输入的页面地址是否正确</p>
    <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  text-align: center;
  .error-img {
    height: 300px;
    margin-top: 50px;
  }
  .el-button {
    margin-top: 30px;
  }
}
</style>
