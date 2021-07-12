<!--
 - 热区组件
 - 
 - sobird<i@sobird.me> at 2021/07/12 12:01:19 created.
-->

<template>
  <div>
    <layout-view-header>
      热区组件，通过给图片画区域，然后用户点击不同区域跳转到不同的页面
    </layout-view-header>

    <el-row type="flex" gutter="20">
      <el-col :span="10">
        <ImageHotSpots v-model="hotSpots" v-model:test="test" />
      </el-col>
      <el-col :span="14">
        热区预览
        {{hotSpots}}
        {{test}}
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 带 ref 的响应式变量
import { ref } from 'vue';
import ImageHotSpots from '@/components/HotSpots/index.vue';

export default {
  name: 'stest',
  components: {
    ImageHotSpots
  },

  setup() {
    return {
      hotSpots: {},
      test: '123'
    }
  },

  mounted() {
    
  },
};
</script>
