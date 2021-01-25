<!--
 - Object Schema渲染
 - 
 - sobird<i@sobird.me> at 2020/08/17 16:36:50 created.
-->

<template>
  <div class="schema-object">
    <div class="schema-property-item" v-for="(item, key) in schema.properties" :key="key">
      <template v-if="item.type == 'array'">
        <!-- fieldset类型展示特殊处理 支持数组和对象类型-->
        <SchemaForm v-model="vmodel[key]" :schema="item" />
      </template>
      <template v-else>
        <el-form-item>
          <template #label>
            <el-tooltip class="item" effect="dark" placement="top">
              <template #content>{{item.title}}</template>
              <span>{{item.title}}</span>
            </el-tooltip>
          </template>
          <SchemaForm v-model="vmodel[key]" :schema="item" />
        </el-form-item>
      </template>
    </div>
  </div>
</template>

<script>
import SchemaForm from "./index";
export default {
  components: {
    SchemaForm
  },
  data() {
    return {
      vmodel: {}
    };
  },
  props: {
    schema: {
      type: Object,
      default: {}
    }
  },
  beforeMount() {
    const { properties } = this.schema;
    // 初始化模型数据

    let vmodel = properties ? {} : "";

    for (let key in properties) {
      const type = properties[key].type;
      switch (type) {
        case "array":
          vmodel[key] = [];
          break;
        case "object":
          vmodel[key] = {};
          break;
        default:
          vmodel[key] = "";
      }
    }

    // 默认，先从$attrs.modelValue中读取数据模型
    this.vmodel = this.$attrs.modelValue || vmodel;
  },
  mounted() {},

  watch: {
    vmodel: function(newVal, oldVal) {
      this.$emit("change", newVal);
    },

    "$attrs.modelValue": function(n, o) {
      this.vmodel = this.$attrs.modelValue;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
