<!--
 - 页面管理 我的页面
 - 
 - sobird<i@sobird.me> at 2020/09/27 14:48:17 created.
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
                name: 'createPage',
              });
            }
          "
        >
          <i class="iconfont icon-plus-circle"></i>
          创建新页面
        </el-button>
      </template>
    </layout-view-header>

    <el-row :gutter="10" style="margin-bottom: 20px;">
      <el-col :span="5">
        <el-input
          clearable
          v-model="queryModel.name"
          placeholder="请输入页面名称"
          @input="debounceNameChange"
        ></el-input>
      </el-col>

      <el-col :span="5">
        <el-input
          clearable
          v-model="queryModel.title"
          placeholder="请输入页面标题"
          @input="debounceTitleChange"
        ></el-input>
      </el-col>

      <el-col :span="5">
        <el-select
          clearable
          v-model="queryModel.appDomain"
          placeholder="请选择页面所属应用"
          style="width: 100%;"
          @change="appChange"
        >
          <el-option label="应用一" value="one"></el-option>
          <el-option label="应用二" value="two"></el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-table :data="pagePaginationModel.list" style="width: 100%">
      <el-table-column prop="name" label="页面名称"></el-table-column>
      <el-table-column prop="title" label="页面标题"></el-table-column>

      <el-table-column prop="path" label="页面路径"></el-table-column>

      <el-table-column prop="statusLabel" label="状态" width="100"></el-table-column>

      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="
              () => {
                $router.push({
                  name: 'updatePage',
                  query: {
                    id: scope.row.id,
                  },
                });
              }
            "
          >
            <i class="el-icon-edit"></i>
            修改
          </el-button>

          <el-button @click="projectDelete(scope.row.id)" type="text">
            <i class="iconfont icon-design"></i>
            设计
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination :change="onPaginationChange" :pt="pagePaginationModel.pt"></Pagination>
  </div>
</template>

<script type="text/javascript">
import { myPage } from './model';
import { myapp } from '@/views/application/model';

import debounce from 'lodash/debounce';

export default {
  data() {
    return {
      queryModel: {
        name: '',
        title: '',
        appDomain: '',
      },
      // 页面分页模型
      pagePaginationModel: {
        pt: 0,
        pn: 1,
        list: [],
      },

      appOptions: [],
    };
  },
  created() {
    this.debounceNameChange = debounce(value => {
      this.nameChange(value);
    }, 300);

    this.debounceTitleChange = debounce(value => {
      this.titleChange(value);
    }, 300);
  },

  mounted() {
    const { query } = this.$route;

    this.onPaginationChange(query);

    // 加载所属应用列表
    // myapp().then(res => {
    //   this.appOptions = res;
    // });
  },

  methods: {
    onPaginationChange(query) {
      myPage(query).then(res => {
        this.pagePaginationModel = res;
      });
    },

    nameChange(name) {
      this.$query({ name });
    },
    titleChange(title) {
      this.$query({ title });
    },
    appChange(appDomain) {
      this.$query({ appDomain });
    },
  },

  watch: {
    '$route.query': function(query, o) {
      this.onPaginationChange(query);
    },
  },
};
</script>
