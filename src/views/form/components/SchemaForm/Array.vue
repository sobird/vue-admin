<!--
 - Array Schema渲染
 - 
 - sobird<i@sobird.me> at 2020/08/17 20:02:28 created.
-->

<template>
  <div class="input-array">
    <div class="input-array-item" v-for="(item, index) in vmodel" :key="'k_' + index">
      <fieldset v-if="vmodel.length > 0">
        <legend>{{schema.title}}</legend>
        <div class="input-array-flex">
          <div style="flex: 1">
            <SchemaForm v-model="vmodel[index]" :schema="schema.items" />
          </div>
          <el-button
            title="删除"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="removeItem(item)"
          ></el-button>
        </div>
      </fieldset>
    </div>

    <el-button
      type="success"
      plain
      style="width: 100%;"
      @click="addItem(schema.items)"
    >添加{{ schema.items.title }}</el-button>
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
      vmodel: []
    };
  },

  props: {
    schema: {
      type: Object,
      default: {}
    }
  },

  mounted() {
    // 默认，先从$attrs.value中读取数据模型
    if (this.$attrs.value) {
      this.vmodel = this.$attrs.value;
    }
  },

  methods: {
    // 添加项
    addItem(items) {
      const { properties } = items;
      let item = properties ? {} : "";

      for (let key in properties) {
        const type = properties[key].type;
        switch (type) {
          case "array":
            item[key] = [];
            break;
          case "object":
            item[key] = {};
            break;
          default:
            item[key] = "";
        }
      }

      this.vmodel.push(item);
    },
    // 删除项
    removeItem(item) {
      let index = this.vmodel.indexOf(item);
      if (index > -1) {
        this.vmodel.splice(index, 1);
      }
    }
  },

  watch: {
    vmodel: function(newVal, oldVal) {
      this.$emit("change", newVal);
    },
    "$attrs.value": function(n, o) {
      this.vmodel = this.$attrs.value;
    }
  }
};
</script>

<style lang="scss" scoped>
.input-array {
  margin-bottom: 10px;
  width: 100%;
  .el-button--danger {
    padding: 1px;
    margin-left: 3px;
    position: absolute;
    top: 0;
    right: 0;
  }
  .el-button--success {
    padding: 5px 10px;
    margin-top: 10px;
  }
}

.input-array-item {
  position: relative;
}

.input-array-flex {
  display: flex;
  align-items: center;
}

fieldset{

}
</style>
