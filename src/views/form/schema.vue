<!--
 - 动态表单
 - 
 - sobird<i@sobird.me> at 2020/07/10 15:26:36 created.
-->

<template>
  <div>
    <layout-view-header>
      Schema表单是根据
      <a href="http://json-schema.org/" target="_blank">JSON Schema</a>
      后端数据模型渲染出来的表单，可以由后端动态的控制表单输入项以及简单的控制部分UI。
    </layout-view-header>
    <el-row type="flex" :gutter="20">
      <el-col :span="12">
        <el-form ref="schemaForm" :model="formVmodel" label-width="100px">
          <schema-form v-model="formVmodel.vmodel" :schema="formVmodel.schema" />

          <el-form-item>
            <el-button type="primary" @click="submitForm('schemaForm')">提交</el-button>
            <el-button @click="$refs.schemaForm.resetFields()">重置</el-button>
          </el-form-item>
        </el-form>

        <h2>数据模型/Model</h2>
        <pre>{{ formVmodel.vmodel }}</pre>
      </el-col>
      <el-col :span="12" style="height: 500px;">
        <MonacoEditor
          v-if="formVmodel.schemaText"
          v-model="formVmodel.schemaText"
          @change="change"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { submitForm } from '@/models/common';
import { schemaForm } from './model';
import SchemaForm from './components/SchemaForm';

export default {
  components: {
    SchemaForm,
  },
  data() {
    return {
      formVmodel: {
        schema: {},
        schemaText: '',
        vmodel: {},
        vrules: {},
      },
    };
  },

  mounted() {
    schemaForm().then(schema => {
      this.formVmodel.schema = schema;
      this.formVmodel.schemaText = JSON.stringify(schema, null, 2);
    });
  },

  methods: {
    change(schema) {
      try {
        schema = JSON.parse(schema);
        this.$set(this.formVmodel, 'schema', schema);
      } catch (e) {
        // todo
      }
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          submitForm(this.formVmodel.vmodel).then(res => {
            // todo
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
fieldset {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
  margin-bottom: 10px;
  // background: #ecf5ff;
  //box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.15);
  legend {
    font-weight: 500;
    font-size: 13px;
    padding: 0 5px;
  }
}
</style>
