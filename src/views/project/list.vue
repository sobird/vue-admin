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
          prop="name"
          label="项目名称">
        </el-table-column>

        <el-table-column
          prop="description"
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
                projectFormVisible = true;
                projectFormType = 'update'

                Object.assign(projectFormModel, scope.row)
              }">编辑</el-button>

            <el-button @click="projectDelete(scope.row.id)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>


    <el-dialog 
      :title="projectFormType == 'create' ? '添加项目' : '更新项目'" 
      :visible.sync="projectFormVisible"
      @closed="$refs['projectForm'].resetFields()">
      <el-form 
        ref="projectForm"
        label-width="80px" 
        :model="projectFormModel"
        :rules="projectFormRules" >
        <el-form-item 
          prop="name"
          label="项目名称" >
          <el-input 
            v-model="projectFormModel.name" 
            auto-complete="off"
            placeholder="输入项目名">
            <i slot="prefix" class="fa fa-product-hunt"></i>
          </el-input>
        </el-form-item>

        <el-form-item 
          prop="description"
          label="项目描述" >
          <el-input type="textarea" v-model="projectFormModel.description"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="projectFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('projectForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
  import { projectCreate, projectQuery, projectUpdate, projectDelete} from '@/models/project';

  export default {
  	data() {
  	  return {
  	  	projectList: [],

  	  	projectFormVisible: false,
        projectFormType: 'create',

  	  	projectFormModel: {
  	  	  name: '',
          description: ''
  	  	},
  	  	projectFormRules: {
          name: [
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
  	  	this.projectList = res.list;
  	  });
  	},

  	methods: {
      projectDelete(id) {
        this.$confirm('确定要删除该项目吗？', '提示信息').then(res => {
          projectDelete({
            id
          }).then(res => {
            this.$store.dispatch('refreshView');
          });
        }).catch(res => {

        });
      },
  	  submitForm(formName) {
  	  	this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.projectFormType == 'create') {
              projectCreate(this.projectFormModel).then(res => {
                this.$store.dispatch('refreshView');
                this.projectFormVisible = false;
              });
            } else {
              projectUpdate(this.projectFormModel).then(res => {
                this.$store.dispatch('refreshView');
                this.projectFormVisible = false;
              });
            }
            
          } else {
            return false;
          }
        });
  	  }
  	}
  };
</script>