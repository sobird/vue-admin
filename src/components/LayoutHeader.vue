<!--
 * 通用头部组件
 * 
 * @author  Yang,junlong at 2018-11-06 14:56:35 build.
 * @version $Id$
-->

<template>
  <div id="mix-header">
    <div class="header-container">
      <div :class="['header-brand', {'widthoutSibrbar': !hasSidebar}]">
        <a href="/">
          <span class="mi-logo"></span>
        </a>
        <slot></slot>
      </div>

      <div class="header-navbar">
        <el-row type="flex">
          <el-col :span="12">
            <el-button v-if="hasSidebar" type="text" class="hamburger" @click="toggleSidebar">
              <i class="iconfont icon-bars"></i>
            </el-button>
          </el-col>
          <el-col :span="12" style="text-align: right;">
            <Environment />

            <ul class="navbar-right">
              <li>
                <a title="项目地址" href="https://github.com/yangjunlong/vue-element-pro">
                  <i class="iconfont icon-git"></i>
                </a>
              </li>
              <li v-if="userinfo.username" class="userinfo">
                <el-popover popper-class="user-dropdown-menu" v-cloak width="250" trigger="hover">
                  <div>
                    <ul>
                      <li>{{userinfo.realname}}</li>
                      <li class="divided"></li>
                      <li @click="setting">
                        设置
                        <i class="iconfont icon-setting pull-right"></i>
                      </li>
                      <li>
                        <a @click="logout">
                          退出
                          <i class="iconfont icon-logout pull-right"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <span
                    class="avatar"
                    slot="reference"
                  >{{(userinfo.realname&&(userinfo.realname.substr(0, 1)).toUpperCase())}}</span>
                </el-popover>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { TOGGLE_SIDEBAR } from "@/store/mutation-types";
import { userInfo } from "../models/common";
import Environment from "@/components/Environment.vue";

export default {
  name: "LayoutHeader",
  components: {
    Environment
  },
  data() {
    return {};
  },

  props: {
    hasSidebar: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    ...mapState(["userinfo"])
  },

  created() {
    console.log(this, 1212);
  },
  methods: {
    logout() {
      var baseURL = this.$axios.defaults.baseURL;
      window.location.href = `${baseURL}/logout?from=${encodeURIComponent(
        window.location.href
      )}`;
    },

    setting() {
      console.log("setting");
    },

    ...mapMutations({
      // 将 `this.toggleSidebar()` 映射为 `this.$store.commit(TOGGLE_SIDEBAR)`
      toggleSidebar: TOGGLE_SIDEBAR
    })
  }
};
</script>

<style lang="scss">
#mix-header {
  //background-color: #ddd;
  background-color: hsla(0, 0%, 100%, 0.95);
  -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 100;
}
.header-container {
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  flex-basis: auto;
  box-sizing: border-box;
  //background: linear-gradient(135deg,#8f75da 0,#727cf5 60%);
}
.mi-logo {
  width: 32px;
  height: 32px;
  background: #fff url("../assets/logo.png") no-repeat center; // #ff6700
  background-size: contain;
  border-radius: 2px;
  vertical-align: middle;
  display: inline-block;
  margin-right: 10px;
  &:hover {
  }
}

.header-brand {
  height: 48px;
  line-height: 48px;
  margin-left: -20px;
  width: 184px;
  overflow: hidden;
  padding-left: 16px;
  color: #fff;
  transition: width 0.3s;
  .mi-logo {
    // display: none;
  }
}

.header-navbar {
  flex: 1;
  flex-basis: auto;
  height: 48px;
  line-height: 48px;
}

.navbar-right {
  display: inline-block;
  margin: 0;
  list-style: none;
  li {
    display: inline-block;
    margin: 0 5px;
    a {
      color: #000;
      height: 48px;
      display: inline-block;
      padding: 0 10px;

      &:hover {
        color: #333;
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
  }
}

.layout-sidebar {
  .header-brand {
    background-color: #304567;
    box-shadow: 2px 0 6px rgba(0, 0, 0, 0.15);
    //background: rgb(0, 33, 64);
    //background: linear-gradient(135deg,#8f75da 0,#727cf5 60%);
    a {
      color: #fff;
    }
  }
}

.userinfo {
  margin-left: 10px;
}

.avatar {
  background-color: #3da8f5;
  width: 36px;
  height: 36px;
  display: inline-block;

  border-radius: 50%;

  text-align: center;
  line-height: 36px;
  font-size: 20px;

  color: #fff;

  font-weight: bold;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
  &:hover {
    box-shadow: 0px 0px 5px 2px #eee;
    cursor: pointer;
  }
}

.user-dropdown-menu {
  padding: 0;
  ul {
    margin: 4px 0;
    padding: 0;

    list-style-type: none;
    li {
      padding: 8px 16px;
      cursor: pointer;
      a {
        display: block;
      }
      &:hover {
        background: #f5f5f5;
      }

      &.divided {
        padding: 0;
        margin: 4px 0;
        border-top: 1px solid #e5e5e5;
      }
    }
  }
}

.hamburger {
  height: 48px;
  line-height: 48px;
  padding: 0 10px;
  color: inherit !important;
  &:hover {
    background-color: rgba(0, 0, 0, 0.025);
  }
  .iconfont {
    font-size: 20px;
  }
}

// 不带侧边栏 头部样式
.widthoutSibrbar {
  width: inherit;
  margin-left: inherit;
  .logo {
    display: none;
  }
  .mi-logo {
    display: inline-block;
  }
}
</style>
