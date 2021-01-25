<!--
 - Schema表单 适配器组件
 - 
 - sobird<i@sobird.me> at 2020/08/17 16:03:08 created.
-->
<template>
  <component v-bind="$attrs" :is="component" @change="change"></component>
</template>

<script>
import capitalize from "lodash/capitalize";

export default {
  data() {
    return {
      component: null,
      multiple: false
    };
  },
  mounted() {
    let { type } = this.$attrs.schema || {};
    this.typeChange(type);

    console.log(this.$attrs);
  },

  methods: {
    typeChange(type) {
      if(!type) {
        return;
      }
      type = capitalize(type);

      switch (type) {
        case "Object":
          this.component = () => import("./" + type + ".vue");
          break;
        case "Array":
          this.component = () => import("./" + type + ".vue");
          break;
        case "Select":
          this.component = () => import("./" + type + ".vue");
          break;
        case "Radio":
          this.component = () => import("./" + type + ".vue");
          break;
        default:
          this.component = () => import("./Text.vue");
      }
    },

    change(value) {
      this.$emit("update:modelValue", value);
    }
  },

  watch: {
    "$attrs.schema.type": function(newVal, oldVal) {
      this.typeChange(newVal);
    }
  }
};
</script>