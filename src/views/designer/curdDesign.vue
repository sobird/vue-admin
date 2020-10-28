<!--
 - curdEditor.vue
 - CURD数据表格 编辑器/设计器
 - 
 - sobird<i@sobird.me> at 2020/10/27 17:53:37 created.
-->

<template>
  <div id="mix" class="mix">
    <header id="header">
      <div class="header-brand">
        <i class="iconfont icon-design"></i>
        <span>设计器</span>
      </div>
      <div class="header-bread">
        <el-row type="flex">
          <el-col :span="12"></el-col>
          <el-col :span="12" class="header-bread-right">
            <el-button><el-switch v-model="value1" active-text="预览"></el-switch></el-button>

            <el-button><i class="iconfont icon-save"></i> 保存</el-button>
            <el-button><i class="iconfont icon-exit"></i> 退出</el-button>

            <ul class="nav-main">
              <li v-if="userinfo.username" class="userinfo">
                <el-popover popper-class="user-dropdown-menu" v-cloak width="250" trigger="hover">
                  <div>
                    <ul>
                      <li>{{ userinfo.realname }}</li>
                      <li class="divided"></li>
                      <li @click="setting">
                        设置
                        <i class="iconfont icon-setting"></i>
                      </li>
                      <li>
                        <a @click="logout">
                          退出
                          <i class="iconfont icon-logout"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <span class="avatar" slot="reference">
                    {{ userinfo.realname && userinfo.realname.substr(0, 1).toUpperCase() }}
                  </span>
                </el-popover>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </header>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      value1: '',
    };
  },
  computed: {
    ...mapState(['userinfo']),
  },
  methods: {
    logout() {
      var baseURL = this.$axios.defaults.baseURL;
      window.location.href = `${baseURL}/logout?from=${encodeURIComponent(window.location.href)}`;
    },

    setting() {},
  },
};
</script>

<style lang="scss">
#header {
  height: 48px;
  background-color: #2b5799;
  display: flex;
}

.header-brand {
  height: 48px;
  line-height: 48px;
  font-weight: 500;
  font-size: 20px;
  .iconfont {
    font-size: 22px;
    vertical-align: middle;
    margin-right: 5px;
  }
}

.header-bread-right {
  text-align: right;
  .el-button {
    background-color: transparent;
    border: none;
    color: #fff;
    font-size: 14px;
    height: 34px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }

    .iconfont {
      font-size: 14px;
    }
  }

  .el-switch{

  }
  .el-switch__core{
    
  }
  .el-switch__label{
    color: #fff;
  }
}
</style>