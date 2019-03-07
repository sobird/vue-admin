<!--
 * 分步表单
 * 
 * @author  Yang,junlong at 2019-03-07 17:39:10 build.
 * @version $Id$
-->

<template>
  <div>
  	<layout-view-header>将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。</layout-view-header>

  	<el-card shadow="never" style="border: none;">
  	  <el-steps
        :active="stepNum"
        process-status="finish"
        finish-status="success"
        align-center
        style="margin-bottom: 20px;">
  		  <el-step title="添加账户信息"></el-step>
  		  <el-step title="确认信息"></el-step>
  		  <el-step title="完成"></el-step>
  	  </el-steps>

      <el-row>
        <el-col :span="6">&nbsp;</el-col>
        <el-col :span="12">
          <el-form
            ref="stepForm"
            :model="stepFormModel"
            :rules="stepFormRules"
            label-width="100px">
            <div v-if="stepNum == 0">
            <el-form-item label="付款账户" prop="paymentAccount">
              <el-select
                v-model="stepFormModel.paymentAccount"
                placeholder="请选择付款账户"
                style="width: 100%;">
                <el-option label="i@sobird.me" value="i@sobird.me"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="收款账户" prop="receiptAccount">
              <el-input v-model="stepFormModel.receiptAccount"></el-input>
            </el-form-item>

            <el-form-item label="收款人姓名" prop="receiptName">
              <el-input v-model="stepFormModel.receiptName"></el-input>
            </el-form-item>

            <el-form-item label="转账金额" prop="transferAmount">
              <el-input v-model.number="stepFormModel.transferAmount"><template slot="prepend">￥</template></el-input>
            </el-form-item>

            <el-form-item label="备注信息" prop="remark">
              <el-input type="textarea" v-model="stepFormModel.remark"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="() => {
                stepNum = 1;
              }">下一步</el-button>
            </el-form-item>
            </div>

            <div v-if="stepNum == 1">
              <el-alert
                title="确认转账后，资金将直接打入对方账户，无法退回。"
                type="warning" style="margin-bottom: 20px;"
                show-icon>
              </el-alert>
              <el-form-item label="付款账户" prop="paymentAccount">
                {{stepFormModel.paymentAccount}}
              </el-form-item>

              <el-form-item label="收款账户" prop="receiptAccount">
                {{stepFormModel.receiptAccount}}
              </el-form-item>

              <el-form-item label="收款人姓名" prop="receiptName">
                {{stepFormModel.receiptName}}
              </el-form-item>

              <el-form-item label="转账金额" prop="transferAmount">
                {{stepFormModel.transferAmount}}
              </el-form-item>

              <el-form-item label="备注信息" prop="remark">
                {{stepFormModel.remark}}
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('stepForm')">提交</el-button>

                <el-button @click="() => {
                  stepNum = 0;
                }">上一步</el-button>
              </el-form-item>
            </div>
          </el-form>
        </el-col>
        <el-col :span="6">&nbsp;</el-col>
      </el-row>
  	</el-card>
  </div>
</template>

<script>
  import { submitForm } from '@/models/common';

  export default {
    data() {
      return {
        stepNum: 0,

        stepFormModel: {
          paymentAccount: '',
          receiptAccount: '',
          receiptName: '',
          transferAmount: '',
          desc: ''
        },
        stepFormRules: {
          paymentAccount: [
            { required: true, message: '请输入付款账户', trigger: 'blur' },
            { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
          ],
          receiptAccount: [
            { required: true, message: '请输入收款账户', trigger: 'blur' },
            { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
          ],
          receiptName: [
            { required: true, message: '请输入收款姓名', trigger: 'blur' },
            { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
          ],
          transferAmount: [
            { required: true, message: '请输入转账金额', trigger: 'blur' },
            { type: 'number', message: '请输入合法金额数字'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.stepNum = 2;

        this.$refs[formName].validate((valid) => {
          if (valid) {
            submitForm(this.stepFormModel).then(res => {
              this.stepNum = 2;
            });
          } else {
            return false;
          }
        });
      }
    }
  };
</script>