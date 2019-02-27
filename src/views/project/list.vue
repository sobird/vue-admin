<!--
 * 我的项目
 * 
 * @author  Yang,junlong at 2019-02-26 21:00:50 build.
 * @version $Id$
-->

<template>
  <div>
  	<layout-view-header>
      <template slot="action">
        <el-button type="primary" size="mini" plain @click="() => {
          projectFormVisible = true;
        }"><i class="fa fa-plus-circle"></i> 添加项目</el-button>
      </template>
    </layout-view-header>

    <el-card shadow="never">
      <el-table
          :data="projectList"
          style="width: 100%">
        <el-table-column
          prop="projectName"
          label="项目名称">
        </el-table-column>

        <el-table-column
          prop="moduleDesc"
          label="项目描述">
        </el-table-column>

        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>

        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="() => {
                moduleFormVisible = true;
                moduleFormType = 'update'

                Object.assign(moduleFormModel, scope.row)
              }">编辑</el-button>

            <el-button @click="moduleDelete(scope.row.id)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>


    <el-dialog 
      title="添加项目" 
      :visible.sync="projectFormVisible"
      @closed="$refs['projectForm'].resetFields()">
      <el-form 
        ref="projectForm"
        label-width="80px" 
        :model="projectFormModel"
        :rules="projectFormRules" >
        <el-form-item 
          prop="projectName"
          label="项目名称" >
          <el-input 
            v-model="projectFormModel.projectName" 
            auto-complete="off"
            placeholder="输入项目名">
            <i slot="prefix" class="fa fa-product-hunt"></i>
          </el-input>
        </el-form-item>

        <el-form-item 
          prop="desc"
          label="项目描述" >
          <el-input type="textarea" v-model="projectFormModel.desc"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCreateProjectVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('projectForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
  import { projectCreate, projectQuery} from '@/models/project';

  export default {
  	data() {
  	  return {
  	  	projectList: [],

  	  	projectFormVisible: false,
  	  	projectFormModel: {
  	  	  projectName: ''
  	  	},
  	  	projectFormRules: {
          projectName: [
            { required: true, message: '请输入项目名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
            { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' }
          ]
        },
  	  }
  	},
  	created() {
  	  const query = Object.assign({}, this.$route.query);
  	  projectQuery(query).then(res => {
  	  	console.log(res);
  	  });
  	},

  	methods: {
  	  submitForm(formName) {
  	  	this.$refs[formName].validate((valid) => {
          if (valid) {
            projectCreate(this.projectFormModel).then(res => {

            });
          } else {
            return false;
          }
        });
  	  }
  	}
  };
</script>