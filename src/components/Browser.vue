<!--
 - 一个虚拟的浏览器组件
 - 
 - sobird<i@sobird.me> at 2020/10/14 14:57:42 created.
-->

<template>
  <div class="browser">
    <el-drawer :visible.sync="browser.visible" size="80%">
      <template slot="title">
        <div class="address-bar">
          <el-input
            ref="address"
            :value="address"
            placeholder="请输入内容"
            @focus="addressbarFocus"
          ></el-input>
        </div>
      </template>

      <div v-loading="loading" class="iframe-wrapper">
        <iframe
          ref="browser"
          data-v-e3143afe=""
          :src="browser.url"
          @load="onload"
        ></iframe>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      visible: false,
      loading: true,
      address: ''
    };
  },

  computed: {
    ...mapGetters(["browser"])
  },

  mounted() {
    this.address = this.browser.url;
  },

  methods: {
    addressbarFocus(e) {
      this.$refs.address.select();
    },

    onload(e) {
      this.loading = false;

      try {
        const { browser, address } = this.$refs;
        const { contentWindow } = browser;

        this.address = contentWindow.location.href;
      } catch (e) {
        // todo 跨域报错
        console.log(e);
      }
    }
  },

  watch: {
    "browser.url": function(n, o) {
      if(n !== o) {
        this.address = n;
      }
    }
  }
};
</script>

<style lang="scss">
.browser {
  .el-drawer {
    outline: none;
  }
  .el-drawer__header {
    padding: 5px 10px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 0;
  }

  .address-bar {
    padding-right: 50px;
    .el-input__inner {
      border-radius: 20px;
      background: #f1f3f4;
      border: none;
      font-size: 14px;
      color: #333;
    }
  }

  .iframe-wrapper {
    height: 100%;
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
}
</style>
