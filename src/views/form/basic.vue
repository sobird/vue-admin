<!--
 * 基础表单
 * 
 * @author  Yang,junlong at 2019-03-07 15:44:42 build.
 * @version $Id$
-->

<template>
  <div>
    <layout-view-header>表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。</layout-view-header>

    <el-card shadow="never" style="border: none;">
      <el-row type="flex">
        <el-col :span="12">
          <el-form
            ref="basicForm"
            :model="basicFormModel"
            :rules="basicFormRules"
            label-width="80px"
          >
            <el-form-item label="活动名称" prop="name">
              <el-input v-model="basicFormModel.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" prop="region">
              <el-select v-model="basicFormModel.region" placeholder="请选择活动区域">
                <el-option label="北京" value="beijing"></el-option>
                <el-option label="上海" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活动时间" prop="date">
              <el-date-picker
                v-model="basicFormModel.date"
                type="daterange"
                value-format="timestamp"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="即时配送" prop="delivery">
              <el-switch v-model="basicFormModel.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="活动性质" prop="type">
              <el-checkbox-group v-model="basicFormModel.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源" prop="resource">
              <el-radio-group v-model="basicFormModel.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="活动形式" prop="desc">
              <el-input type="textarea" v-model="basicFormModel.desc"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('basicForm')">立即创建</el-button>
              <el-button
                @click="() => {
                $refs.basicForm.resetFields();
              }"
              >取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { submitForm } from "@/models/common";

export default {
  data() {
    return {
      basicFormModel: {
        name: "",
        region: "",
        date: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      basicFormRules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          submitForm(this.basicFormModel).then(res => {
            console.log(res);
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>