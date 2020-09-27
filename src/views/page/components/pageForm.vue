<!--
 - 页面表单组件
 - 
 - sobird<i@sobird.me> at 2020/09/27 15:48:35 created.
-->

<template>
  <el-form ref="pageForm" :model="pageFormModel" :rules="pageFormRules" label-width="80px">
    <el-form-item label="页面名" prop="name">
      <el-input
        :disabled="mode == 'update'"
        clearable
        v-model="pageFormModel.name"
        placeholder="由数字下划线或小写字母组成，总长不超过32个字符"
        @input="nameChange"
      ></el-input>
      <span class="item-tip">
        <i class="el-icon-info"></i>
        页面名具有唯一性，一旦提交不可修改，请确认后提交
      </span>
    </el-form-item>
    <el-form-item label="页面标题" prop="title">
      <el-input clearable v-model="pageFormModel.title" placeholder="请填写页面标题"></el-input>
    </el-form-item>
    <el-form-item label="所属应用" prop="appName">
      <el-select
        clearable
        v-model="pageFormModel.appName"
        placeholder="请选择页面所属应用"
        style="width: 100%;"
      >
        <el-option label="应用一" value="one"></el-option>
        <el-option label="应用二" value="two"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="访问链接" prop="path">
      <el-input
        clearable
        :disabled="mode == 'update'"
        placeholder="请输入页面路径"
        v-model="pageFormModel.path"
      >
        <template slot="prepend">http://example.com/app/{{ pageFormModel.appName ?  pageFormModel.appName : '{appName}'}}</template>
      </el-input>
    </el-form-item>

    <el-form-item label="访问权限" prop="access">
      <el-radio-group v-model="pageFormModel.access">
        <el-radio label="公开"></el-radio>
        <el-radio label="私有"></el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="页面描述" prop="description">
      <el-input
        type="textarea"
        v-model="pageFormModel.description"
        :autosize="{ minRows: 5, maxRows: 8 }"
        maxlength="300"
        show-word-limit
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('pageForm')">提交</el-button>
      <el-button
        @click="
          () => {
            $router.push({
              name: 'myPage',
            });
          }
        "
      >
        取消
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      pageFormModel: {
        name: '',
        title: '',
        appName: '',
        path: '',
        access: '',
        description: '',
      },
      pageFormRules: {
        name: [
          { required: true, message: '请输入页面名', trigger: 'blur' },
          {
            pattern: /(^[A-Za-z0-9_]+$)/,
            message: '由数字下划线或小写字母组成',
            trigger: 'change',
          },
          { min: 1, max: 32, message: '总长不超过32个字符', trigger: 'change' },
        ],

        title: [{ required: true, message: '请填写页面标题', trigger: 'blur' }],

        description: [
          { required: true, message: '请输入页面描述', trigger: 'blur' },
          { min: 10, max: 300, message: '至少输入10个字符', trigger: 'change' },
        ],
      },
    };
  },

  props: {
    // 表单模式, create: 新建申请, update: 更新修改
    mode: {
      type: String,
      default: 'create',
    },

    // 表单模型
    vmodel: {
      type: Object,
      default: () => null,
    },

    // 表单提交
    submit: {
      type: Function,
      default: () => {},
    },
  },

  mounted() {},

  methods: {
    nameChange(name) {
      this.$set(this.pageFormModel, 'path', name);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submit(this.pageFormModel);
        } else {
          return false;
        }
      });
    },
  },

  watch: {
    vmodel: {
      handler(vmodel, o) {
        if (vmodel) {
          Object.assign(this.pageFormModel, vmodel);
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
.item-tip {
  color: #888;
  font-size: 12px;
}
</style>
