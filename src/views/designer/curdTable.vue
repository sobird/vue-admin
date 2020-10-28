<!--
 - crud.vue
 - 
 - sobird<i@sobird.me> at 2020/10/26 11:43:20 created.
-->

<template>
  <div>
    <layout-view-header>
      <template slot="action">
        <el-button
          type="primary"
          size="mini"
          plain
          @click="
            () => {
              $router.push({
                name: 'curdDesign',
              });
            }
          "
        >
          <i class="iconfont icon-design"></i>
          进入设计
        </el-button>
      </template>
      CRUD(增删改查)表格，是后台管理系统中最为常见的一种数据展现及交互方式，一般包括：数据检索，数据展示，数据操作，数据分页等功能元素。下面是一个员工信息的示例CURD表格。
    </layout-view-header>

    <el-row :gutter="10" style="margin-bottom: 20px;">
      <el-col :span="4">
        <el-input
          clearable
          v-model="queryModel.name"
          placeholder="请输入风险点名称"
          @input="debounceNameChange"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-select
          clearable
          style="width: 100%;"
          v-model="queryModel.gender"
          placeholder="请选择性别"
          @change="genderChange"
        >
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="0"></el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="4">
        <el-button
          type="primary"
          @click="createEmployee"
        >
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

    <el-dialog
      :title="(dialogMode == 'create' ? '新增' : '编辑') + '员工信息'"
      :visible.sync="dialogVisible"
    >
      <el-form ref="employeeForm" :model="employeeModel" :rules="employeeRules" label-position="top">
        <el-form-item label="员工姓名" prop="name">
          <el-input clearable v-model="employeeModel.name" placeholder="请输入员工姓名"></el-input>
        </el-form-item>

        <el-form-item prop="age" label="年龄">
          <template slot="label">
            年龄
            <el-tooltip class="item" effect="dark" content="这是员工年龄" placement="top">
              <i class="el-icon-info"></i>
            </el-tooltip>
          </template>
          <el-input clearable v-model="employeeModel.owners" placeholder="请输入业务负责人"></el-input>
        </el-form-item>

        <el-form-item prop="gender" label="性别">

          <el-select
            clearable
            v-model="employeeModel.gender"
            placeholder="请选择员工性别"
            style="width: 100%;"
          >
            <el-option label="男" value="1"></el-option>
          <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="description" label="员工描述">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="employeeModel.description"
            placeholder="请输入员工描述"
          ></el-input>
        </el-form-item>
      </el-form>

      <template slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="saveEmployee('employeeForm')"
        >{{dialogMode == 'create' ? '新增' : '更新'}}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { queryCurdData, saveEmployee, deleteEmployee } from './model';
import debounce from 'lodash/debounce';

export default {
  data() {
    return {
      queryModel: {
        employeeIds: [],
        name: '',
        type: '',
        checkList: [],
        universal: null,
      },

      riskPagerModel: {},


      dialogMode: 'create',
      dialogVisible: false,
      employeeModel: {},
      employeeRules: {}
    };
  },

  created() {
    this.debounceNameChange = debounce(name => {
      this.nameChange(name);
    }, 300);
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

    // 新增员工信息
    createEmployee() {
      this.dialogVisible = true;
      this.dialogMode = 'create';
    },

    // 编辑员工信息
    updateEmployee(row) {
      this.dialogVisible = true;
      this.dialogMode = 'update';
    },

    // 删除员工信息
    deleteEmployee(row) {
      this.$confirm("删除该员工信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        deleteEmployee({
          id: row.id
        }).then(res => {
          this.$store.dispatch("refreshView");
        });
      });
    },

    // 保存员工信息
    saveEmployee(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 浅拷贝
          let data = Object.assign({}, this.employeeModel);

          saveEmployee(data).then(res => {
            this.$store.dispatch("refreshView");
          });
        } else {
          // todo nothing
        }
      });
    },

    nameChange() {
      this.setQuery({ name });
    },
    genderChange() {},
  },
};
</script>