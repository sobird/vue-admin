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
                  <template class="avatar" #reference>
                    {{ userinfo.realname && userinfo.realname.substr(0, 1).toUpperCase() }}
                  </template>
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
                  <template #header class="clearfix">
                    <span>查询条件</span>
                  </template>

                  <draggable
                    tag="el-row"
                    class="dragArea list-group"
                    :list="list2"
                    group="people"
                    @change="log"
                  >
                    <template #item="{ element, index }">
                      <el-col :span="4" :key="index">
                        <schema-form
                          v-model="queryModel[element.fieldName]"
                          :schema="element.schema"
                        />
                      </el-col>
                    </template>
                  </draggable>

                  <!-- <el-row :gutter="10" style="margin-bottom: 20px;">
                    <el-col :span="4">
                      <el-input
                        v-model="queryModel.name"
                        clearable
                        placeholder="请输入风险点名称"
                      ></el-input>
                    </el-col>
                    <el-col :span="4">
                      <el-select
                        v-model="queryModel.age"
                        clearable
                        style="width: 100%;"
                        placeholder="请选择性别"
                      >
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="0"></el-option>
                      </el-select>
                    </el-col>
                  </el-row> -->
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
                    <template v-slot:default="scope">
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
      <aside class="design-aside">
        <el-tabs type="border-card">
          <el-tab-pane label="属性配置">
            <div class="com-card">
              <i class="iconfont icon-excel"></i>
              <div class="card-content">
                <div class="card-title">CURD表格</div>
                <div class="card-desc">具有增删改查功能的表格组件</div>
              </div>
            </div>

            <el-form
              ref="basicForm"
              :model="formModel"
              :rules="formRules"
              label-width="90px"
              label-position="top"
            >
              <el-form-item label="查询条件">
                <draggable
                  class="dragArea list-group"
                  :list="draggableList"
                  :group="{ name: 'people', pull: 'clone', put: false }"
                  :clone="clone"
                  @change="log"
                >
                <template #item="{ element }">
                  <div class="list-group-item" :key="element.id">
                    {{ element.name }}
                  </div>
                </template>
                </draggable>
              </el-form-item>

              <el-form-item label="请求方法" prop="method">
                <el-radio-group v-model="formModel.method">
                  <el-radio-button label="GET">GET</el-radio-button>
                  <el-radio-button label="POST">POST</el-radio-button>
                  <el-radio-button label="DELETE">DELETE</el-radio-button>
                  <el-radio-button label="PUT">PUT</el-radio-button>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="接口地址" prop="url">
                <el-input clearable v-model="formModel.url" placeholder="https://"></el-input>
              </el-form-item>

              <el-form-item label="请求格式" prop="format">
                <el-radio-group v-model="formModel.format">
                  <el-radio-button label="application/json">JSON</el-radio-button>
                  <el-radio-button label="multipart/form-data">FormData</el-radio-button>
                  <el-radio-button label="application/x-www-form-urlencoded">Form</el-radio-button>
                </el-radio-group>

                <span class="input-item-tip">
                  <i class="el-icon-info"></i>
                  发送体格式为：{{ formModel.format }}，当发送内容中存在文件时会自动使用 form-data
                  格式。
                </span>
              </el-form-item>

              <el-form-item label="请求拦截器" prop="desc">
                <div style="height: 200px;">
                  <MonacoEditor
                    v-model="formModel.interceptors.request"
                    :options="{ theme: 'vs' }"
                  />
                </div>
              </el-form-item>
              <el-form-item label="响应拦截器" prop="desc">
                <div style="height: 200px;">
                  <MonacoEditor
                    v-model="formModel.interceptors.response"
                    :options="{ theme: 'vs' }"
                  />
                </div>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('basicForm')">提交</el-button>
                <el-button
                  @click="
                    () => {
                      $refs.basicForm.resetFields();
                    }
                  "
                >
                  取消
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="样式配置">配置管理</el-tab-pane>
        </el-tabs>
      </aside>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { queryCurdData, saveEmployee, deleteEmployee } from './model';
import draggable from 'vuedraggable';

import SchemaForm from '@/views/form/components/SchemaForm';

export default {
  components: {
    draggable,
    SchemaForm,
  },
  data() {
    return {
      draggableList: [
        {
          name: 'ID',
          id: 1,
          schema: {
            type: 'text',
            placeholder: '请输入员工ID',
          },
        },
        {
          name: '员工名称',
          id: 2,
          fieldName: 'name',
          schema: {
            type: 'text',
            placeholder: '请输入员工姓名',
          },
        },
        {
          name: '员工年龄',
          fieldName: 'age',
          id: 3,
          schema: {
            type: 'text',
            placeholder: '请输入员工年龄',
          },
        },
        {
          name: '员工性别',
          fieldName: 'gender',
          id: 4,
          schema: {
            type: 'select',
            placeholder: '请选择员工性别',
            enum: [
              {
                label: '男',
                value: '1',
              },
              {
                label: '女',
                value: '0',
              },
            ],
          },
        },
        {
          name: '创建时间',
          fieldName: 'createdAt',
          id: 5,
          schema: {
            type: 'date',
            placeholder: '请选择创建时间',
          },
        },
      ],
      list2: [
        {
          name: '员工名称',
          id: 2,
          fieldName: 'name',
          schema: {
            type: 'text',
            placeholder: '请输入员工姓名',
          },
        },
        {
          name: '员工年龄',
          fieldName: 'age',
          id: 3,
          schema: {
            type: 'text',
            placeholder: '请输入员工年龄',
          },
        },
      ],

      value1: '',
      activeName: 'frist',
      riskPagerModel: {},

      queryModel: {
        name: '',
        age: '',
      },

      formModel: {
        method: 'GET',
        url: '',
        format: 'application/json',
        interceptors: {
          request: `request => {\n  return request;\n}`,
          response: 'response => {\n  return response;\n}',
        },
      },
      formRules: {
        url: [{ required: true, message: '请输入接口地址', trigger: 'blur' }],
      },
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

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          submitForm(this.formModel).then(res => {});
        } else {
          return false;
        }
      });
    },

    clone(data) {
      return data;
    },
    log: function(evt) {
      console.log(evt);
    },
  },
};
</script>

<style lang="scss">
// 组件类型简短介绍
.com-card {
  display: flex;
  border-bottom: 1px solid #e2e4e7;
  padding-bottom: 10px;
  margin-bottom: 20px;
  .iconfont {
    font-size: 24px;
    margin-right: 10px;
  }
  .card-content {
    font-size: 14px;
    .card-title {
      margin-bottom: 10px;
    }
  }
}
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
  //color: red;
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

.dragArea {
  margin-left: -5px;
  margin-right: -5px;
  margin-bottom: 20px;
  .el-col {
    padding-left: 5px;
    padding-right: 5px;
  }
  .sortable-ghost {
    width: 16.66667%;
    float: left;
    box-sizing: border-box;
  }
}
.list-group {
  .list-group-item {
    border-radius: 3px;
    cursor: move;
    padding: 5px 10px;
    margin: 5px 0;
    color: #333;
    border: 1px solid #f4f6fc;
    background: #f4f6fc;

    &:hover {
      color: #409eff;
      border: 1px dashed #409eff;
    }
  }
  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
}
</style>
