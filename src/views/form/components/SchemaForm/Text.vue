<!--
 - 表单基本输入组件，简单的文本输入框
 - 
 - sobird<i@sobird.me> at 2020/07/17 13:26:41 created.
-->

<template>
  <el-input
    clearable
    :placeholder="schema.placeholder"
    v-bind="$attrs"
    @input="(v) => {$emit('change', v)}"
  />
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    schema: {
      type: Object,
      default: () => ({})
    }
  },
  mounted() {},
  methods: {}
};
</script>
