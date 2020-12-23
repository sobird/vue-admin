<!--
 - 网页全屏
 - 
 - sobird<i@sobird.me> at 2020/09/25 19:03:11 created.
-->

<template>
  <i
    :class="['iconfont', 'fullscreen', 'icon-' + (!isFullscreen ? 'fullscreen' : 'cancel-fullscreen')]"
    @click="click"
  />
</template>

<script>
import screenfull from 'screenfull';

export default {
  name: 'Fullscreen',
  data() {
    return {
      isFullscreen: false,
    };
  },
  mounted() {
    this.init();
  },
  beforeUnmount() {
    this.destroy();
  },
  methods: {
    click() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning',
        });
        return false;
      }
      screenfull.toggle().then(res => {
        console.log(res);
      });
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change);
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off('change', this.change);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.fullscreen {
  display: inline-block;
  cursor: pointer;
  color: #555;
  font-size: 18px;
}
</style>

