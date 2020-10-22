<!--
 - 应用表单组件
 - 
 - sobird<i@sobird.me> at 2020/09/27 13:36:54 created.
-->

<template>
  <el-form ref="appForm" :model="appFormModel" :rules="appFormRules" label-width="80px">
    <el-form-item label="应用名" prop="name">
      <el-input
        :disabled="mode == 'update'"
        v-model="appFormModel.name"
        placeholder="由数字下划线或小写字母组成，总长不超过32个字符"
        @input="nameChange"
      ></el-input>
      <span class="input-item-tip">
        <i class="el-icon-info"></i>
        应用名一旦申请不可修改，请确认后提交
      </span>
    </el-form-item>
    <el-form-item label="中文名" prop="title">
      <el-input v-model="appFormModel.title" placeholder="请填写应用中文名"></el-input>
    </el-form-item>
    <el-form-item label="所属团队" prop="teamId">
      <el-select
        v-model="appFormModel.teamId"
        placeholder="请选择应用所属团队"
        style="width: 100%;"
      >
        <el-option label="北京团队" value="beijing"></el-option>
        <el-option label="上海团队" value="shanghai"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="访问链接" prop="slug">
      <el-input
        disabled
        placeholder="应用路径"
        v-model="appFormModel.name"
      >
        <template slot="prepend">http://example.com/app/</template>
      </el-input>
    </el-form-item>

    <el-form-item label="域名" prop="domain">
      <el-input
        v-model="appFormModel.domain"
        placeholder="请填写域名"
        @input="nameChange"
      ></el-input>
      <span class="input-item-tip">
        <i class="el-icon-info"></i>
        填写域名后，访问以上链接，应用将会跳转到该地址
      </span>
    </el-form-item>

    <el-form-item label="访问权限" prop="access">
      <el-radio-group v-model="appFormModel.access">
        <el-radio label="PUBLIC">公开</el-radio>
        <el-radio label="PRIVATE">私有</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="应用简介" prop="description">
      <el-input
        type="textarea"
        v-model="appFormModel.description"
        :autosize="{ minRows: 5, maxRows: 8 }"
        maxlength="300"
        show-word-limit
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('appForm')">提交</el-button>
      <el-button
        @click="
          () => {
            $router.push({
              name: 'myApp',
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
      appFormModel: {
        name: '',
        title: '',
        teamId: '',
        domain: '',
        access: 'PUBLIC',
        description: '',
      },
      appFormRules: {
        name: [
          { required: true, message: '请输入应用名', trigger: 'blur' },
          {
            pattern: /(^[A-Za-z0-9_]+$)/,
            message: '由数字下划线或小写字母组成',
            trigger: 'change',
          },
          { min: 1, max: 32, message: '总长不超过32个字符', trigger: 'change' },
        ],
        title: [{ required: true, message: '请填写应用中文名', trigger: 'blur' }],
        teamId: [{ required: true, message: '请选择应用所属团队', trigger: 'blur' }],

        description: [
          { required: true, message: '请输入应用简介', trigger: 'blur' },
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submit(this.appFormModel);
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
          Object.assign(this.appFormModel, vmodel);
        }
      },
      deep: true
    },
  },
};
</script>

