<!--
 - api.vue
 - 
 - sobird<i@sobird.me> at 2020/10/22 15:59:59 created.
-->

<template>
  <div>
    <layout-view-header>
      对接口的配置表单
    </layout-view-header>

    <el-row type="flex">
      <el-col :span="12">
        <el-form ref="basicForm" :model="formModel" :rules="formRules" label-width="90px">
          <el-form-item label="请求方法" prop="method">
            <el-radio-group v-model="formModel.method">
              <el-radio-button label="GET">GET</el-radio-button>
              <el-radio-button label="POST">POST</el-radio-button>
              <el-radio-button label="DELETE">DELETE</el-radio-button>
              <el-radio-button label="PUT">PUT</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="接口地址" prop="url">
            <el-input clearable v-model="formModel.url" placeholder="https://"></el-input>
          </el-form-item>

          <el-form-item label="请求格式" prop="format">
            <el-radio-group v-model="formModel.format">
              <el-radio-button label="application/json">JSON</el-radio-button>
              <el-radio-button label="multipart/form-data">FormData</el-radio-button>
              <el-radio-button label="application/x-www-form-urlencoded">Form</el-radio-button>
            </el-radio-group>

            <span class="input-item-tip">
              <i class="el-icon-info"></i>
              发送体格式为：{{ formModel.format }}，当发送内容中存在文件时会自动使用 form-data
              格式。
            </span>
          </el-form-item>

          <el-form-item label="请求拦截器" prop="desc">
            <div style="height: 200px;">
                <MonacoEditor v-model="formModel.interceptors.request" :options="{theme: 'vs'}" />
            </div>
          </el-form-item>
          <el-form-item label="响应拦截器" prop="desc">
            <div style="height: 200px;">
                <MonacoEditor v-model="formModel.interceptors.response" :options="{theme: 'vs'}" />
            </div>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('basicForm')">提交</el-button>
            <el-button
              @click="
                () => {
                  $refs.basicForm.resetFields();
                }
              "
            >
              取消
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { submitForm } from '@/models/common';

export default {
  data() {
    return {
      formModel: {
        method: 'GET',
        url: '',
        format: 'application/json',
        interceptors: {
          request: `request => {\n  return request;\n}`,
          response: 'response => {\n  return response;\n}',
        },
      },
      formRules: {
        url: [
          { required: true, message: '请输入接口地址', trigger: 'blur' },
        ],
      },
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          submitForm(this.formModel).then(res => {});
        } else {
          return false;
        }
      });
    },
  },
};
</script>