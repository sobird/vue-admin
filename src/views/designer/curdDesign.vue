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

            <el-button>
              <i class="iconfont icon-save"></i>
              保存
            </el-button>
            <el-button>
              <i class="iconfont icon-exit"></i>
              退出
            </el-button>

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

    <div class="design-body">
      <main class="design-main">
        <div class="main-inner">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="列表视图" name="frist">
              <!-- 列表视图 -->
              <div class="xpage com-hover">
                <h3>员工信息列表</h3>

                <el-card style="margin-bottom: 10px;" shadow="“never">
                  <div slot="header" class="clearfix">
                    <span>查询条件</span>
                  </div>

                  <el-row :gutter="10" style="margin-bottom: 20px;">
                    <el-col :span="4">
                      <el-input clearable placeholder="请输入风险点名称"></el-input>
                    </el-col>
                    <el-col :span="4">
                      <el-select clearable style="width: 100%;" placeholder="请选择性别">
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="0"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </el-card>

                <el-row :gutter="10">
                  <el-col :span="4">
                    <el-button type="primary">
                      <i class="iconfont icon-design"></i>
                      新增员工信息
                    </el-button>
                  </el-col>
                </el-row>

                <el-table :data="riskPagerModel.list">
                  <el-table-column prop="id" label="ID" width="80"></el-table-column>
                  <el-table-column prop="name" label="姓名"></el-table-column>
                  <el-table-column prop="age" label="年龄"></el-table-column>
                  <el-table-column prop="gender" label="性别"></el-table-column>
                  <el-table-column prop="createdAt" label="创建时间"></el-table-column>
                  <el-table-column prop="createdBy" label="创建人"></el-table-column>

                  <el-table-column label="操作" width="auto">
                    <template slot-scope="scope">
                      <el-button type="text">查看</el-button>
                      <el-button type="text" @click="updateEmployee(scope.row)">编辑</el-button>
                      <el-button type="text" @click="deleteEmployee(scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>

                <Pagination :change="onPaginationChange" :pt="riskPagerModel.pt"></Pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="详情视图" name="second">详情视图</el-tab-pane>
            <el-tab-pane label="新增表单" name="third">新增表单</el-tab-pane>
            <el-tab-pane label="编辑表单" name="fourth">编辑表单</el-tab-pane>
          </el-tabs>
        </div>
      </main>
      <aside class="design-aside"></aside>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { queryCurdData, saveEmployee, deleteEmployee } from './model';

export default {
  data() {
    return {
      value1: '',
      activeName: 'frist',
      riskPagerModel: {},
    };
  },
  computed: {
    ...mapState(['userinfo']),
  },
  mounted() {
    this.onPaginationChange();
  },
  methods: {
    onPaginationChange(query) {
      queryCurdData().then(res => {
        this.riskPagerModel = res;
      });
    },
    logout() {
      var baseURL = this.$axios.defaults.baseURL;
      window.location.href = `${baseURL}/logout?from=${encodeURIComponent(window.location.href)}`;
    },

    setting() {},
    handleClick() {},
  },
};
</script>

<style lang="scss">
.design-body {
  height: calc(100% - 48px);
  display: flex;
  flex-direction: row;
  background-color: #fff;

  .design-main {
    height: 100%;
    flex-grow: 1;
    overflow-y: auto;

    .main-inner {
      height: 1000px;
      .el-tabs {
        margin-left: 15px;
        .el-tabs__header {
          padding-top: 15px;
        }
      }
    }
  }
  .design-aside {
    height: 100%;
    width: 350px;
    overflow-y: auto;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.15);
  }
}

// tab切换
.view-switch {
}

.xpage {
  margin-right: 15px;
}

.com-hover {
  position: relative;

  &:hover {
    &::before {
      content: '';
      opacity: 0.5;
      background: #c8ebfb;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      border: 1px dashed #409eff;
      z-index: 9999;
    }
  }
}

div:not(* > .com-hover) {
  color: red;
}

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

  .el-switch {
  }
  .el-switch__core {
  }
  .el-switch__label {
    color: #fff;
  }
}
</style>