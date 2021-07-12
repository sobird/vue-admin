<!--
 - 热区块
 - 
 - sobird<i@sobird.me> at 2021/07/12 14:37:42 created.
-->

<template>
  <div
    class="area area-box"
    :style="{
      left: area.x + 'px',
      top: area.y + 'px',
      width: area.w + 'px',
      height: area.h + 'px',
    }"
    @mousedown.left.stop="dragStart($event)"
    @mouseup.left.stop="dragEnd($event)"
  >
    热区{{ id + 1 }}

    <div
      class="shape"
      @mousedown.left.stop="shapeStart($event)"
      @mouseup.left.stop="shapeEnd($event)"
    />
    <i class="el-icon-circle-close" @click.stop="remove()" />
  </div>
</template>

<script>
export default {
  name: 'Area',
  props: {
    area: {
      type: Object,
      default: () => {},
    },
    id: {
      type: Number,
      default: null,
    },
  },

  methods: {
    dragStart(event) {
      this.starX = event.clientX
      this.starY = event.clientY
      if (!document.onmousemove) {
        const initX = this.area.x
        const initY = this.area.y
        document.onmousemove = ev => {
          this.area.x = initX + ev.clientX - this.starX
          this.area.y = initY + ev.clientY - this.starY
        }
      }
    },
    dragEnd(event) {
      document.onmousemove = null
    },

    shapeStart(event) {
      this.star1X = event.clientX
      this.star1Y = event.clientY
      if (!document.onmousemove) {
        const initX = this.area.w
        const initY = this.area.h
        document.onmousemove = ev => {
          this.area.w = initX + ev.clientX - this.star1X
          this.area.h = initY + ev.clientY - this.star1Y
        }
      }
    },

    shapeEnd(event) {
      document.onmousemove = null
    },

    // 删除热区
    remove() {
      this.$emit('remove', this.id);
    }
  },
}
</script>

<style lang="scss" scoped>
.area-box {
  font-size: 14px;
  .shape {
    position: absolute;
    width: 7px;
    height: 7px;
    background: #fff;
    border: 1px solid #888;
    right: 0;
    bottom: 0;
    transform: translate3d(50%, 50%, 0);
    cursor: nwse-resize;
  }
  .el-icon-circle-close {
    border-radius: 50%;
    position: absolute;
    right: 0;
    top: 0;
    transform: translate3d(50%, -50%, 0);
    cursor: pointer;
    color: #606266;
    background: #ddd;
  }
}
</style>
