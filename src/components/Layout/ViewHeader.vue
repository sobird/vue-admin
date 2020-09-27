<!--
 * 视图头组件
 * 
 * @author  Yang,junlong at 2018-12-28 18:58:44 build.
 * @version $Id$
-->

<template>
  <div class="view-header">
    <Breadcrumb v-if="breadcrumb" style="margin-bottom: 20px;" />

    <slot name="header">
      <el-row type="flex">
        <el-col :span="8">
          <slot name="header">
            <h2>
              <slot name="title">
                <i v-if="lastcrumb.icon" :class="'iconfont icon-' + lastcrumb.icon"></i>
                <slot name="prefix"></slot>
                {{ lastcrumb.title }}
              </slot>
            </h2>
          </slot>
        </el-col>
        <el-col :span="16" style="text-align: right;">
          <slot name="action"></slot>
        </el-col>
      </el-row>
      <slot name="extra"></slot>
    </slot>
    <slot></slot>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue';
export default {
  components: {
    Breadcrumb,
  },

  props: {
    breadcrumb: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    lastcrumb() {
      let matched = this.$route.matched.filter(item => {
        return (item.title = item.meta.title);
      });
      return matched[matched.length - 1].meta;
    },
  },

  created() {},
};
</script>

<style lang="scss">
.view-header {
  background-color: rgba(110, 116, 224, 0.1);
  margin: -15px;
  padding: 15px;
  margin-bottom: 20px;
  h2 {
    .iconfont {
      margin-right: 5px;
      font-size: inherit;
    }
  }
  .el-tabs {
    margin-bottom: -30px;
    .el-tabs__nav-wrap::after {
      content: none;
    }
  }

  .el-button {
    .iconfont {
      font-size: 12px;
    }
  }
}
</style>
