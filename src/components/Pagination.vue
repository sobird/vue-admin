<!--
 - 列表分页设置
 - pt: page total 总条目数
 - ps: page size 每页显示条目个数
 - pc: page count 页码总数
 - pn: page number 当前页数
 -
 - sobird<i@sobird.me> at 2020/03/03 14:44:49 created.
-->

<template>
  <el-pagination
    background
    :hide-on-single-page="true"
    @current-change="pageChange"
    @size-change="sizeChange"
    :current-page="pn"
    :page-sizes="pss"
    :page-size="ps"
    :total="pt"
    layout=" prev, pager, next, jumper"
  ></el-pagination>
</template>

<script>
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      pn: 1,
      ps: 20,
    };
  },
  props: {
    // page total
    pt: {
      type: [String, Number],
      default: 0,
    },

    // page sizes
    pss: {
      type: Array,
      default: () => [20, 30, 50, 100],
    },

    // page number change
    change: {
      type: Function,
      default: () => {},
    },
  },
  created() {
    const { query } = this.$route;
    this.pn = Number(query.pn);
    this.ps = Number(query.ps) || Number(Cookies.get('ps')) || this.ps;

    query.ps = this.ps;
  },
  methods: {
    // 页码变化
    pageChange(pn) {
      this.$router.push({
        query: Object.assign({}, this.$route.query, { pn }),
      });
    },
    // 页数变化
    sizeChange(ps) {
      this.$router.push({
        query: Object.assign({}, this.$route.query, { ps }),
      });

      Cookies.set('ps', ps);
    },
  },

  watch: {
    '$route.query.pn': function(pn, o) {
      this.pn = Number(pn || 1);
      const query = Object.assign({}, this.$route.query, { pn });

      this.change(query);
    },

    '$route.query.ps': function(ps, o) {
      const query = Object.assign({}, this.$route.query, { ps });

      this.change(query);
    },
  },
};
</script>

<style lang="scss">
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
