<!--
 - 图片热区组件
 - 
 - sobird<i@sobird.me> at 2021/07/12 14:31:32 created.
-->

<template>
  <div class="image-hot-spots">
    <div class="container">
      <img
        ref="img"
        class="cover"
        ondragstart="return false;"
        oncontextmenu="return false;"
        onselect="document.selection.empty();"
        :src="modelValue.src"
        @mousedown.left.stop="dragStart($event)"
        @mouseup.left.stop="dragEnd($event)"
      />
      <div
        v-show="dragging"
        class="area"
        :style="{
          width: w + 'px',
          height: h + 'px',
          left: x + 'px',
          top: y + 'px',
        }"
      />

      <Area
        v-for="(item, index) in modelValue.area"
        :id="index"
        :key="index"
        :area="item"
        @remove="removeArea"
      />
    </div>
    <div class="image-config">
      <el-form
        :model="modelValue"
        label-width="80px"
        ref="imageForm"
        label-position="left"
      >
        <el-form-item>
          <el-button type="primary" @click.prevent="addArea">添加热区</el-button>
        </el-form-item>

        <el-form-item
          v-for="(area, index) in modelValue.area"
          :label="`热区${index + 1}`"
          :key="index"
          :prop="'area.' + index + '.href'"
          :rules="[
            { required: true, message: '该热区未填写跳转链接', trigger: ['blur', 'change'] },
            { type: 'url', message: '请填写正确的跳转连接', trigger: ['blur', 'change'] },
          ]"
        >
          <el-input v-model="area.href" placeholder="请输入热区跳转链接"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Area from './Area.vue';

export default {
  name: 'HotSpots',
  components: { Area },
  //setup() {},

  data() {
    return {
      // 热区拖拽中
      dragging: false,
      x: 0,
      y: 0,
      w: 0,
      h: 0,

      modelValue: {
        src: 'https://p0.meituan.net/dptakeaway/3f5df28ef6e650edb2d0798c9329095362197.jpg', // 图片地址
        href: '', // 图片跳转地址
        type: 0, // 0 为直接跳转 1为热区跳转
        area: [], // 热区配置
      },
    };
  },

  created() {
    // 初始化
    // if (this.$attrs.modelValue) {
    //   this.modelValue = this.$attrs.modelValue;
    // }
  },

  mounted() {
    this.$attrs.test = 'ddd';

    console.log(this.$attrs.test);
  },

  methods: {
    dragStart(event) {
      this.dragging = true;
      // 记录滑动的初始值
      this.x = event.layerX;
      this.y = event.layerY;

      // 鼠标滑动的过程
      if (!document.onmousemove) {
        document.onmousemove = ev => {
          this.w = ev.layerX - this.x;
          this.h = ev.layerY - this.y;
        };
      }
    },

    dragEnd(event) {
      document.onmousemove = null;
      if (this.dragging && this.w > 15 && this.h > 15) {
        const data = {
          x: this.x,
          y: this.y,
          w: this.w,
          h: this.h,
        };
        this.addArea(data);
      }
      // reset
      this.dragging = false;
      this.x = 0;
      this.y = 0;
      this.w = 0;
      this.h = 0;
    },

    addArea(data = {}) {
      const { area = [] } = this.modelValue;
      if (area.length > 4) {
        this.$message.error('1个图片最多只能添加5个热区');
        return;
      }

      const computedStyle = window.getComputedStyle(this.$refs.img, '');
      const currentImageWidth = parseInt(computedStyle.width);

      const areaData = {
        x: 0,
        y: 0,
        w: 50,
        h: 50,
        originImageWidth: currentImageWidth,
        href: '',
        target: '_self',
        ...data,
      };

      area.push(areaData);
    },

    removeArea(id) {
      const { area } = this.modelValue;
      this.$confirm(`确定删除热区${id + 1}吗？`, '提示').then(res => {
        area.splice(id, 1);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.image-hot-spots {
  .container {
    position: relative;
    overflow: hidden;
    .cover {
      display: block;
      max-width: 100%;
      cursor: crosshair;
      user-select: none;
    }
    .area {
      position: absolute;
      width: 15px;
      height: 15px;
      left: 0;
      top: 0;
      background: rgba(#2980b9, 0.3);
      border: 1px dashed #34495e;
      pointer-events: none;
    }
    .area-box {
      cursor: move;
      pointer-events: inherit;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-weight: 500;
    }
  }
  .image-config {
    margin-top: 20px;
  }
}
</style>
