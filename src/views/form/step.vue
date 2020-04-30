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

      <el-row type="flex">
        <el-col :span="6"></el-col>
        <el-col :span="12">
          <el-form
            ref="stepForm"
            :model="stepFormModel"
            :rules="stepFormRules"
            label-width="110px">
            <div v-if="stepNum == 0">
            <el-form-item label="付款账户：" prop="paymentAccount">
              <el-select
                v-model="stepFormModel.paymentAccount"
                placeholder="请选择付款账户"
                style="width: 100%;">
                <el-option label="i@sobird.me" value="i@sobird.me"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="收款账户：" prop="receiptAccount">
              <el-input v-model="stepFormModel.receiptAccount"></el-input>
            </el-form-item>

            <el-form-item label="收款人姓名：" prop="receiptName">
              <el-input v-model="stepFormModel.receiptName"></el-input>
            </el-form-item>

            <el-form-item label="转账金额：" prop="transferAmount">
              <el-input v-model.number="stepFormModel.transferAmount"><template slot="prepend">￥</template></el-input>
            </el-form-item>

            <el-form-item label="备注信息：" prop="remark">
              <el-input type="textarea" v-model="stepFormModel.remark"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="() => {
                
                $refs['stepForm'].validate((valid) => {
                  if (valid) {
                    stepNum = 1;
                  } else {
                    return false;
                  }
                });
              }">下一步</el-button>
            </el-form-item>
            </div>

            <div v-if="stepNum == 1" class="form-confirm">
              <el-alert
                title="确认转账后，资金将直接打入对方账户，无法退回。"
                type="warning" style="margin-bottom: 20px;"
                show-icon>
              </el-alert>
              <el-form-item label="付款账户：" prop="paymentAccount">
                {{stepFormModel.paymentAccount}}
              </el-form-item>

              <el-form-item label="收款账户：" prop="receiptAccount">
                {{stepFormModel.receiptAccount}}
              </el-form-item>

              <el-form-item label="收款人姓名：" prop="receiptName">
                {{stepFormModel.receiptName}}
              </el-form-item>

              <el-form-item label="转账金额：" prop="transferAmount">
                <span class="amount">{{stepFormModel.transferAmount}}</span> 元
              </el-form-item>

              <el-form-item label="备注信息：" prop="remark">
                {{stepFormModel.remark}}
              </el-form-item>

              <el-divider><i class="el-icon-mobile-phone"></i></el-divider>

              <el-form-item label="支付密码：" prop="remark" class="payment-password">
                <el-input v-model="stepFormModel.paymentPassword" show-password></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('stepForm')">提交</el-button>

                <el-button @click="() => {
                  stepNum = 0;
                }">上一步</el-button>
              </el-form-item>
            </div>

            <div v-if="stepNum == 2" class="form-result">
              <i class="el-icon-success"></i>
              <h4>操作成功</h4>
              <p>预计2小时内到账</p>

              <el-card shadow="never" class="form-card">
                <el-form-item label="付款账户：" prop="paymentAccount">
                  {{stepFormModel.paymentAccount}}
                </el-form-item>

                <el-form-item label="收款账户：" prop="receiptAccount">
                  {{stepFormModel.receiptAccount}}
                </el-form-item>

                <el-form-item label="收款人姓名：" prop="receiptName">
                  {{stepFormModel.receiptName}}
                </el-form-item>

                <el-form-item label="转账金额：" prop="transferAmount">
                  <span class="amount">{{stepFormModel.transferAmount}}</span> 元
                </el-form-item>

                <el-form-item label="备注信息：" prop="remark">
                  {{stepFormModel.remark}}
                </el-form-item>
              </el-card>

              <div class="form-action">
                <el-button type="primary" @click="() => {
                   stepNum = 0;
                   $refs.stepForm.resetFields();
                  }">再转一笔</el-button>

                <el-button @click="() => {
                 
                }">查看账单</el-button>
              </el-form-item>
              </div>
            </div>
          </el-form>
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>
  	</el-card>
  </div>
</template>

<script>
  import { submit } from '@/models/common';

  export default {
    data() {
      return {
        stepNum: 0,

        stepFormModel: {
          paymentAccount: 'i@sobird.me',
          receiptAccount: 'test@example.com',
          receiptName: 'Test',
          transferAmount: 200,
          paymentPassword: '',
          remark: ''
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
            submit(this.stepFormModel).then(res => {
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

<style lang="scss" scoped>
  .form-result{
    text-align: center;
    .el-icon-success{
      color: #52c41a;
      font-size: 60px;
    }
    h4{
      font-size: 20px;
      margin: 15px 0;
      font-weight: 400;
    }
    p{
      font-size: 14px;
      color: #bbb;
    }
    .form-card{
      margin-top: 20px;
      margin-bottom: 20px;
      border: none;
      background: #fafafa;
      text-align: left;
      .el-form-item{
        margin-bottom: 10px;
      }
    }
    .amount{
      font-size: 18px;
    }
  }

  .form-confirm{
    .el-form-item {
      margin-bottom: 10px;
    }
    .amount{
      font-size: 18px;
    }
    .payment-password{
      margin: 10px 0 30px;
      .el-input{
        width: 200px;
      }
    }
  }
</style>
