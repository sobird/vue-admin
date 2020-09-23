<!--
 - Select 下拉选择输入组件
 - 
 - sobird<i@sobird.me> at 2020/08/17 17:07:06 created.
-->

<template>
  <el-select
    clearable
    v-bind="$attrs"
    :placeholder="schema.placeholder"
    @change="(v) => {$emit('change', v)}"
    style="width: 100%"
  >
    <el-option
      v-for="(item, index) in schema.enum"
      :key="index"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    schema: {
      type: Object,
      default: {}
    }
  }
};
</script>
