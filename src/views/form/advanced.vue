<!--
 * 高级表单
 * 
 * @author  Yang,junlong at 2019-03-14 11:00:36 build.
 * @version $Id$
-->

<template>
  <div>
    <layout-view-header>高级表单常见于一次性输入和提交大批量数据的场景。</layout-view-header>

    <el-form
      ref="advancedForm"
      :model="advancedFormModel"
      :rules="advancedFormRules"
      label-width="80px"
    >
      <el-form-item label="出租方式" prop="rentType">
        <el-radio-group v-model="advancedFormModel.rentType">
          <el-radio :label="1">整套出租</el-radio>
          <el-radio :label="2">单间出租</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="房屋户型" prop="bedRoomNum">
        <el-input clearable class="short-ipt" v-model="advancedFormModel.bedRoomNum">
          <template #append>室</template>
        </el-input>

        <el-input class="short-ipt" v-model="advancedFormModel.livingRoomNum">
          <template #append>厅</template>
        </el-input>

        <el-input class="short-ipt" v-model="advancedFormModel.toiletNum">
          <template #append>卫</template>
        </el-input>

        <el-input
          v-if="advancedFormModel.rentType == 1"
          class="short-ipt"
          v-model="advancedFormModel.totalArea"
        >
          <template #append>平米</template>
        </el-input>
      </el-form-item>
      <el-form-item label="楼层" prop="houseFloor">
        <el-input class="short-ipt" v-model="advancedFormModel.houseFloor">
          <template #prepend>第</template>
          <template #append>层</template>
        </el-input>

        <el-input class="short-ipt" v-model="advancedFormModel.totalFloor">
          <template #prepend>共</template>
          <template #append>层</template>
        </el-input>
      </el-form-item>

      <el-form-item v-if="advancedFormModel.rentType == 2" label="出租间" prop="delivery">
        <el-input class="short-ipt" v-model="advancedFormModel.rentRoomArea">
          <template #append>平米</template>
        </el-input>
        <el-select v-model="advancedFormModel.rentRoomArea" placeholder="请选择卧室类型">
          <el-option v-for="item in bedroomTypeOptions" :key="item.value" :value="item.value">
            {{ item.label }}
          </el-option>
        </el-select>

        <el-select v-model="advancedFormModel.faceToType" placeholder="请选择卧室朝向">
          <el-option
            v-for="item in bedroomFaceOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="房屋标签">
        <el-checkbox-group v-model="advancedFormModel.featureTag">
          <el-checkbox v-for="item in houseFeatureOptions" :key="item.value" :label="item.value">
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="房屋配置" prop="houseAllocations">
        <el-checkbox-group v-model="advancedFormModel.houseAllocations">
          <el-checkbox
            v-for="item in houseAllocationOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="配套服务" prop="houseServices">
        <el-checkbox-group v-model="advancedFormModel.houseServices">
          <el-checkbox
            v-for="item in houseServiceOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="租金" prop="monthRent">
        <el-input class="short-ipt" v-model="advancedFormModel.monthRent">
          <template #append>元/月</template>
        </el-input>
      </el-form-item>

      <el-form-item label="起租时间" prop="rentStartDate">
        <el-date-picker
          v-model="advancedFormModel.rentStartDate"
          type="date"
          placeholder="选择日期"
          style="width: 300px;"
        ></el-date-picker>

        <span>请填写房屋可以出租的日期，可在起租日期前发布。</span>
      </el-form-item>
      <el-form-item label="所在城市">
        <city-select v-model="advancedFormModel.cityCode"></city-select>
      </el-form-item>

      <el-form-item label="小区名称">
        <el-input
          placeholder="请填写小区名称"
          style="width: 500px;"
          v-model="advancedFormModel.districtName"
        ></el-input>
      </el-form-item>

      <el-form-item label="详细地址">
        <el-input
          placeholder="请填写详细地址"
          style="width: 500px;"
          v-model="advancedFormModel.address"
        ></el-input>
      </el-form-item>

      <el-form-item label="位置标注">
        <baidu-map :vmodel="advancedFormModel"></baidu-map>
      </el-form-item>

      <el-form-item label="房间描述">
        <el-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5 }"
          maxlength="200"
          show-word-limit
          placeholder="请输入房屋的情况介绍"
          v-model="advancedFormModel.aroundDesc"
          style="width: 800px;"
        ></el-input>
      </el-form-item>

      <el-form-item label="房管员" prop="agent">
        <el-select multiple v-model="advancedFormModel.agent" placeholder="请选择">
          <el-option label="张三" :value="1"></el-option>
          <el-option label="李四" :value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="同款房间" prop="totalNum">
        <el-input class="short-ipt" v-model="advancedFormModel.totalNum">
          <template #append>间</template>
        </el-input>
      </el-form-item>

      <el-form-item label="不租给" prop="refuseTenants">
        <el-checkbox-group v-model="advancedFormModel.refuseTenants">
          <el-checkbox v-for="item in refuseTenantOptions" :key="item.value" :label="item.value">
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="房屋照片" prop="totalNum">
        <el-upload action="#" list-type="picture-card" :auto-upload="false">
          <i class="iconfont icon-upload-picture"></i>
          <template #file="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="previewPicture(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="removePicture(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </template>
        </el-upload>

        <el-dialog v-model="previewPictureVisible">
          <img width="100%" :src="previewPictureUrl" alt />
        </el-dialog>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('advancedForm')">立即发布</el-button>
        <el-button
          @click="
            () => {
              $refs.advancedForm.resetFields();
            }
          "
        >
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import CitySelect from '@/components/CitySelect';
import BaiduMap from '@/components/BaiduMap';
import {
  bedroomTypeOptions,
  bedroomFaceOptions,
  houseAllocationOptions,
  houseFeatureOptions,
  houseServiceOptions,
  refuseTenantOptions,
  submitForm,
} from '@/models/common';

export default {
  components: {
    CitySelect,
    BaiduMap,
  },
  data() {
    return {
      advancedFormModel: {
        // 出租方式
        rentType: 1,
        // 室
        bedRoomNum: '',
        // 厅
        livingRoomNum: '',
        // 卫
        toiletNum: '',
        // 房屋面积
        totalArea: '',
        // 卧室面积
        rentRoomArea: '',
        // 卧室类型
        bedRoomType: '',
        // 卧室朝向
        faceToType: '',
        // 楼层
        houseFloor: '',
        // 总楼层
        totalFloor: '',
        // 房屋标签
        featureTag: [],
        // 房屋配置
        houseAllocations: [],
        // 配套服务
        houseServices: [],
        // 月租金
        monthRent: '',
        // 起租日期
        rentStartDate: false,
        // 所属城市
        cityCode: [],
        // 小区名称
        districtName: '',
        // 房屋坐标
        coords: {},
        // 房屋描述
        aroundDesc: '',
        // 房管员
        agent: '',
        // 同款房间
        totalNum: '',
        // 哪些租客不租
        refuseTenants: [],
      },
      advancedFormRules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        bedRoomNum: [{ required: true, message: '请填房屋卧室数量', trigger: 'blur' }],
        houseFloor: [{ required: true, message: '请填写房屋所在楼层', trigger: 'blur' }],

        houseAllocations: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个房屋配置',
            trigger: 'change',
          },
        ],
      },
      // 卧室类型
      bedroomTypeOptions,
      // 卧室朝向
      bedroomFaceOptions,
      // 房屋配置
      houseAllocationOptions,
      // 房屋特色标签
      houseFeatureOptions,
      // 配套服务
      houseServiceOptions,
      // 哪些租客不租
      refuseTenantOptions,

      // 上传图片
      previewPictureVisible: false,
      previewPictureUrl: '',
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          submitForm(this.advancedFormModel).then(res => {});
        } else {
          return false;
        }
      });
    },

    // 预览上传图片
    previewPicture(file) {
      this.previewPictureVisible = true;
      this.previewPictureUrl = file.url;
    },

    // 删除上传图片
    removePicture(file) {
      //
    },
  },
};
</script>

<style lang="scss">
.short-ipt {
  width: inherit;
  .el-input__inner {
    text-align: center;
    width: 80px;
  }
  .el-input-group__append,
  .el-input-group__prepend {
    padding: 0 10px;
  }
}
</style>
