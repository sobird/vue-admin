<!--
 - nested-with-vuex.vue
 - 
 - sobird<i@sobird.me> at 2020/10/27 15:33:30 created.
-->

<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <nested-test class="col-8" v-model="elements" />
    </el-col>

    <el-col :span="12">
      <h3>Vuex Store</h3>
      <MonacoEditor v-model="elementsText" style="height: 400px;" />
    </el-col>
  </el-row>
</template>

<script>
import NestedTest from './components/nested-test';
export default {
  name: 'nested-with-vmodel',
  display: 'Nested (v-model & vuex)',
  order: 16,
  components: {
    NestedTest,
  },
  computed: {
    elements: {
      get() {
        return this.$store.state.nested.elements;
      },
      set(value) {
        this.$store.dispatch('nested/updateElements', value);
      },
    },
    elementsText: {
      get() {
        return JSON.stringify(this.elements, null, 2);
      },
      set() {},
    },
  },
  methods: {},
};
</script>
