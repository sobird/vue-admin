<!--
 - LayoutEmptyView.vue
 - 
 - sobird<i@sobird.me> at 2019/12/06 16:21:50 created.
-->

<template>
  <router-view v-view-title="$route.meta.title" :key="$store.state.viewkey"></router-view>
</template>

<script>
  export default {
    name: 'EmptyView'
  }
</script>
