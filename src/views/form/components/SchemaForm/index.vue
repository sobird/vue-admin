<!--
 - Schema表单 适配器组件
 - 
 - sobird<i@sobird.me> at 2020/08/17 16:03:08 created.
-->
<template>
  <component v-bind="$attrs" :is="component" @change="change"></component>
</template>

<script>
import { defineAsyncComponent } from 'vue';
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
  },

  methods: {
    typeChange(type) {
      if(!type) {
        return;
      }
      type = capitalize(type);
      let component = null;

      switch (type) {
        case "Object":
          component = () => import("./" + type + ".vue");
          break;
        case "Array":
          component = () => import("./" + type + ".vue");
          break;
        case "Select":
          component = () => import("./" + type + ".vue");
          break;
        case "Radio":
          component = () => import("./" + type + ".vue");
          break;
        default:
          component = () => import("./Text.vue");
      }

      this.component = defineAsyncComponent(component);
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