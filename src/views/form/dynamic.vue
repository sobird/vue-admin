<!--
 - 动态表单
 - 
 - sobird<i@sobird.me> at 2020/07/10 15:26:36 created.
-->

<template>
  <div>
    <layout-view-header>动态表单是根据后端数据模型渲染出来的表单，可以由后端动态的控制表单输入项以及简单的控制部分UI。</layout-view-header>

    <el-card shadow="never" style="border: none;">
      <el-form
        ref="dynamicForm"
        :model="dynamicFormModel"
        :rules="dynamicFormRules"
        label-position="top"
      >
        <el-form-item
          v-for="(field, index) in config.fields"
          :key="index"
          :label="field.label"
          :prop="field.name"
        >
          <el-input v-model="dynamicFormModel[field.name]" style="width: 250px;"/>
        </el-form-item>

        <el-col>{{dynamicFormModel}}</el-col>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicFormModel: {
        templateName: "这是模板名称"
      },
      dynamicFormRules: {},

      config: {
        fields: [
          {
            name: "templateName",
            label: "模板名称",
            place: "请输入模板名称",
            type: "text",
          },
          {
            name: "templateDesc",
            label: "模板描述",
            type: "textarea",
          },
          {
            name: "templateFields",
            label: "模板字段",
            type: "array",
          }
        ]
      }
    };
  }
};
</script>

<style scoped>
</style>