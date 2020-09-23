<!--
 - Radio 单选框输入组件
 schema: {
   type: "radio",
   label: "xxx",
   enum: [{label: "label", value: "value"}]
 }
 - 
 - sobird<i@sobird.me> at 2020/08/17 16:49:16 created.
-->

<template>
  <el-radio-group v-model="vmodel" class="input-item-radio" @change="(v) => {$emit('change', v);}">
    <el-radio v-for="(item, index) in schema.enum" :key="index" :label="item.value">{{item.label}}</el-radio>
  </el-radio-group>
</template>

<script>
export default {
  data() {
    return {
      vmodel: this.$attrs.value
    };
  },
  props: {
    schema: {
      type: Object,
      default: {}
    }
  },
  mounted() {},
  methods: {},
  watch: {
    "$attrs.value": function(n, o) {
      this.vmodel = this.$attrs.value;
    }
  }
};
</script>

<style lang="scss">
.input-item-radio {
  .el-radio {
    margin-right: 5px;
  }

  .el-radio__label {
    font-size: 12px;
    padding-left: 3px;
  }
}
</style>
