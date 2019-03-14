<!--
 * 高级表单
 * 
 * @author  Yang,junlong at 2019-03-14 11:00:36 build.
 * @version $Id$
-->

<template>
  <div>
    <layout-view-header>高级表单常见于一次性输入和提交大批量数据的场景。</layout-view-header>

    <el-card shadow="never" style="border: none;">
      <el-form
        ref="advancedForm"
        :model="advancedFormModel"
        :rules="advancedFormRules"
        label-width="80px">
        <el-form-item label="出租方式" prop="rentType">
          <el-radio-group v-model="advancedFormModel.rentType">
			      <el-radio :label="1">整套出租</el-radio>
			      <el-radio :label="2">单间出租</el-radio>
			    </el-radio-group>
        </el-form-item>
        
        <el-form-item label="房屋户型">
          <el-input class="short-ipt" v-model="advancedFormModel.bedRoomNum">
			      <template slot="append">室</template>
			    </el-input>

			    <el-input class="short-ipt" v-model="advancedFormModel.livingRoomNum">
			      <template slot="append">厅</template>
			   </el-input>

			    <el-input class="short-ipt" v-model="advancedFormModel.toiletNum">
			      <template slot="append">卫</template>
			    </el-input>

			    <el-input v-if="advancedFormModel.rentType == 1" class="short-ipt" v-model="advancedFormModel.totalArea">
			      <template slot="append">平米</template>
			    </el-input>
        </el-form-item>
        <el-form-item label="楼层">
          <el-input class="short-ipt" v-model="advancedFormModel.houseFloor">
            <template slot="prepend">第</template>
  			    <template slot="append">层</template>
  			  </el-input>

  			  <el-input class="short-ipt" v-model="advancedFormModel.totalFloor">
  			  	<template slot="prepend">共</template>
  			    <template slot="append">层</template>
  			  </el-input>
        </el-form-item>
        
        <el-form-item v-if="advancedFormModel.rentType == 2" label="出租间" prop="delivery">
          <el-input class="short-ipt" v-model="advancedFormModel.rentRoomArea">
			      <template slot="append">平米</template>
			    </el-input>

			    <el-select v-model="value" placeholder="请选择卧室类型">
			      <el-option
			        label="主卧"
			        value="1">
			      </el-option>
			      <el-option
			        label="次卧"
			        value="2">
			      </el-option>
			    </el-select>

  			  <el-select v-model="value" placeholder="请选择卧室朝向">
  			    <el-option label="东" value="1"></el-option>
  			    <el-option label="南" value="2"></el-option>
  			    <el-option label="西" value="3"></el-option>
  			    <el-option label="北" value="4"></el-option>
  			    <el-option label="东南" value="5"></el-option>
  			    <el-option label="东北" value="6"></el-option>
  			    <el-option label="西南" value="7"></el-option>
  			    <el-option label="西北" value="8"></el-option>
  			  </el-select>
        </el-form-item>
        
        <el-form-item label="房屋标签">
          <el-checkbox-group v-model="advancedFormModel.featureTag">
            <el-checkbox label="离地铁近"></el-checkbox>
            <el-checkbox label="阳台"></el-checkbox>
            <el-checkbox label="独立卫生间"></el-checkbox>
            <el-checkbox label="厨房"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="房屋配置" prop="resource">
          <el-checkbox-group v-model="advancedFormModel.detailPoint">
            <el-checkbox label="床" name="type"></el-checkbox>
            <el-checkbox label="衣柜" name="type"></el-checkbox>
            <el-checkbox label="书桌" name="type"></el-checkbox>
            <el-checkbox label="空调" name="type"></el-checkbox>
            <el-checkbox label="暖气" name="type"></el-checkbox>
            <el-checkbox label="电视机" name="type"></el-checkbox>
            <el-checkbox label="燃气" name="type"></el-checkbox>
            <el-checkbox label="微波炉" name="type"></el-checkbox>
            <el-checkbox label="电磁炉" name="type"></el-checkbox>
            <el-checkbox label="热水器" name="type"></el-checkbox>
            <el-checkbox label="洗衣机" name="type"></el-checkbox>
            <el-checkbox label="冰箱" name="type"></el-checkbox>
            <el-checkbox label="WIFI" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="配套服务">
          <el-checkbox-group v-model="advancedFormModel.servicePoint">
            <el-checkbox label="健身房"></el-checkbox>
            <el-checkbox label="公寓超市"></el-checkbox>
            <el-checkbox label="智能门锁"></el-checkbox>
            <el-checkbox label="ATM机"></el-checkbox>
            <el-checkbox label="房间清洁"></el-checkbox>
            <el-checkbox label="专属客服"></el-checkbox>
            <el-checkbox label="代收快递"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="租金" prop="monthRent">
          <el-input class="short-ipt" v-model="advancedFormModel.monthRent">
			      <template slot="append">元/月</template>
			    </el-input>
        </el-form-item>

        <el-form-item label="起租时间" prop="rentStartDate">
          <el-date-picker
			      v-model="advancedFormModel.rentStartDate"
			      type="date"
			      placeholder="选择日期">
			     </el-date-picker>

			     <span>请填写房屋可以出租的日期，可在起租日期前发布。</span>
        </el-form-item>

        <el-form-item label="小区名称">
          <el-input
            placeholder="请填写小区名称"
            style="width: 300px;" v-model="advancedFormModel.districtName"></el-input>
        </el-form-item>

        <el-form-item label="房间描述">
          <el-input
            type="textarea"
            placeholder="请输入房屋的情况介绍"
            v-model="advancedFormModel.aroundDesc"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('advancedForm')">立即发布</el-button>
          <el-button @click="() => {
            $refs.advancedForm.resetFields();
          }">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { submitForm } from '@/models/common';

  export default {
    data() {
      return {
        advancedFormModel: {
          rentType: 1,
          bedRoomNum: '',
          livingRoomNum: '',
          toiletNum: '',
          totalArea: '',

          houseFloor: '',
          totalFloor: '',
          featureTag: [],
          detailPoint: [],
          date: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        advancedFormRules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            submitForm(this.advancedFormModel).then(res => {
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

<style lang="scss">
  .short-ipt{
  	width: inherit;
  	.el-input__inner{
  	  text-align: center;
  	  width: 80px;
  	}
  	.el-input-group__append, .el-input-group__prepend{
  	  padding: 0 10px;
  	}
  }
</style>