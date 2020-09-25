<!--
 - Pagination.vue
 - 
 - sobird<i@sobird.me> at 2020/03/03 14:44:49 created.
-->

<template>
  <el-pagination
    background
    :hide-on-single-page="true"
    @current-change="onCurrentChange"
    @size-change="onSizeChange"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    :total="total"
    layout=" prev, pager, next, jumper"
  ></el-pagination>
</template>

<script>
import Cookies from 'js-cookie';
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 20
    };
  },
  props: {
    total: {
      type: [String, Number],
      default: 0
    },
    pageSizes: {
      type: Array,
      default: () => [20, 30, 50, 100]
    },
    change: {
      type: Function,
      default: function() {}
    }
  },
  created() {
    const { query } = this.$route;
    this.currentPage = Number(query.page);
    this.pageSize =
      Number(query.limit) ||
      Number(Cookies.get("pageSize")) ||
      this.pageSize;

    query.limit = this.pageSize;
  },
  methods: {
    onCurrentChange(currentPage) {
      this.$router.push({
        query: Object.assign({}, this.$route.query, { page: currentPage })
      });
    },
    onSizeChange(pageSize) {
      this.$router.push({
        query: Object.assign({}, this.$route.query, { limit: pageSize })
      });

      Cookies.set("pageSize", pageSize);
    }
  },
  watch: {
    "$route.query.limit": function(limit, oldValue) {
      const query = Object.assign({}, this.$route.query, {limit});

      this.change(query);
    },
    "$route.query.page": function(page, oldValue) {
      this.currentPage = Number(page || 1);
      const query = Object.assign({}, this.$route.query, {page});

      this.change(query);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>