<!--
 - 我的应用
 - 
 - sobird<i@sobird.me> at 2020/09/25 21:40:18 created.
-->

<template>
  <div>
    <layout-view-header>
      <template v-slot:action>
        <el-button
          type="primary"
          size="mini"
          plain
          @click="
            () => {
              $router.push({
                name: 'applyApp',
              });
            }
          "
        >
          <i class="iconfont icon-plus-circle"></i>
          申请新应用
        </el-button>
      </template>
    </layout-view-header>

    <el-table :data="appPaginationModel.items" style="width: 100%">
      <el-table-column prop="name" label="应用名称"></el-table-column>
      <el-table-column prop="title" label="应用中文名"></el-table-column>
      <el-table-column prop="teamId" label="所属团队"></el-table-column>
      <el-table-column prop="accessLabel" label="访问权限"></el-table-column>
      <el-table-column prop="owner" label="负责人"></el-table-column>
      <el-table-column prop="statusLabel" label="状态" width="100"></el-table-column>
      <el-table-column label="操作" width="100">
        <template v-slot:default="scope">
          <el-button
            type="text"
            @click="
              () => {
                $router.push({
                  name: 'amendApp',
                  query: {
                    id: scope.row.id,
                  },
                });
              }
            "
          >
            修改
          </el-button>

          <el-button @click="delApp(scope.row.id)" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination :change="onPaginationChange" :pt="appPaginationModel.pt"></Pagination>
  </div>
</template>

<script type="text/javascript">
import { myApp, delApp } from './model';

export default {
  data() {
    return {
      // 应用分页模型
      appPaginationModel: {
        pt: 0,
        pn: 1,
        items: [],
      },
    };
  },
  mounted() {
    const { query } = this.$route;

    this.onPaginationChange(query);
  },

  methods: {
    onPaginationChange(query) {
      myApp(query).then(res => {
        this.appPaginationModel = res;
      });
    },

    delApp(id) {
      this.$confirm('确定要删除该应用吗？', '提示信息')
        .then(res => {
          delApp({
            id,
          }).then(res => {
            this.$store.dispatch('refreshRouteView');
          });
        })
        .catch(res => {});
    },
  },
};
</script>
