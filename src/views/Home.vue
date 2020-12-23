<!--
 * 分析页
 * 
 * @author  Yang,junlong at 2019-02-28 14:49:59 build.
 * @version $Id$
-->

<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="6">
        <el-card shadow="never" class="card-charts">
          <div slot="header">
            <span>总销售额</span>
            <el-tooltip content="指标说明" placement="top">
              <i class="fa fa-info-circle fa-pull-right"></i>
            </el-tooltip>
          </div>

          <div class="card-charts-body">
            <h4>¥126,560</h4>
            <div class="trend-charts">
              <div class="trend-item">
                周同比 12%
                <i class="fa fa-sort-up" style="color: red;"></i>
              </div>
              <div class="trend-item">
                日同比 11%
                <i class="fa fa-sort-down" style="color: green"></i>
              </div>
            </div>
          </div>

          <div class="card-charts-footer">
            日销售额：￥12,423
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" class="card-charts">
          <div slot="header">
            <span>访问量</span>
            <el-tooltip content="指标说明" placement="top">
              <i class="fa fa-info-circle fa-pull-right"></i>
            </el-tooltip>
          </div>

          <div class="card-charts-body">
            <h4>8846</h4>
            <div ref="visitEcharts" style="height: 50px;"></div>
          </div>

          <div class="card-charts-footer">
            日访问量：1,234
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" class="card-charts">
          <div slot="header">
            <span>支付笔数</span>
            <el-tooltip content="指标说明" placement="top">
              <i class="fa fa-info-circle fa-pull-right"></i>
            </el-tooltip>
          </div>

          <div class="card-charts-body">
            <h4>6560</h4>
            <div ref="paymentEcharts" style="height: 50px;"></div>
          </div>

          <div class="card-charts-footer">
            转化率：60%
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" class="card-charts">
          <div slot="header">
            <span>运营活动效果</span>
            <el-tooltip content="指标说明" placement="top">
              <i class="fa fa-info-circle fa-pull-right"></i>
            </el-tooltip>
          </div>
          <div style="text-align: center;">
            <el-progress
              type="circle"
              :percentage="80"
              :stroke-width="10"
              :width="111"
              color="#975FE4"
            ></el-progress>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card shadow="never" class="card-charts">
      <template #header>
        <el-tabs v-model="activeTabName" @tab-click="tabClick">
          <el-tab-pane label="销售额" name="salesVolume"></el-tab-pane>
          <el-tab-pane label="访问量" name="visitVolume"></el-tab-pane>
        </el-tabs>
        <el-tooltip content="指标说明" placement="top">
          <i class="fa fa-info-circle fa-pull-right"></i>
        </el-tooltip>
      </template>

      <div class="card-charts-body">
        <el-carousel ref="salesCarousel" indicator-position="none" :autoplay="false" arrow="never">
          <el-carousel-item name="salesVolume">
            <div ref="salesVolumeTrendEcharts" style="height: 300px;"></div>
          </el-carousel-item>
          <el-carousel-item name="visitVolume">
            <div ref="visitVolumeEcharts" style="height: 300px;"></div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts';
import { analysisEcharts } from '@/models/common';
import { getCurrentInstance } from 'vue';

export default {
  name: 'home',
  data() {
    return {
      activeTabName: 'salesVolume',
    };
  },
  components: {},
  mounted() {
    analysisEcharts().then(res => {
      const { salesData, visitData } = res;

      this.$nextTick(() => {
        this.salesVolumeTrendEcharts(salesData);
        this.visitVolumeTrendEcharts(visitData);
      });
    });
    this.visitEcharts();
    this.paymentEcharts();
  },
  methods: {
    tabClick(tab, event) {
      this.$refs.salesCarousel.setActiveItem(tab.props.name);
    },
    visitEcharts(data) {
      const myEcharts = echarts.init(this.$refs.visitEcharts);
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
            label: {
              backgroundColor: '#6a7985',
            },
          },
          formatter: function(params) {
            return params[0].axisValue + '：' + params[0].value;
          },
        },
        grid: {
          left: '0',
          right: '0',
          top: '0',
          bottom: '0',
        },
        xAxis: {
          type: 'category',
          show: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
          show: false,
        },
        series: [
          {
            type: 'line',
            data: [820, 932, 901, 934, 1290, 1330, 1520],

            smooth: true,
            showSymbol: false,
            lineStyle: {
              color: '#975FE4',
            },
            itemStyle: {
              color: '#975FE4',
            },
            areaStyle: {
              color: '#975FE4',
              opacity: 1,
            },
          },
        ],
      };
      myEcharts.setOption(option);
    },

    // 支付笔数
    paymentEcharts(data) {
      const myEcharts = echarts.init(this.$refs.paymentEcharts);
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
            label: {
              backgroundColor: '#6a7985',
            },
          },
          formatter: function(params) {
            return params[0].axisValue + '：' + params[0].value;
          },
        },
        grid: {
          left: '0',
          right: '0',
          top: '0',
          bottom: '0',
        },
        xAxis: {
          type: 'category',
          show: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
          show: false,
        },
        series: [
          {
            type: 'bar',
            data: [820, 932, 901, 934, 1290, 1330, 1520],

            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#83bff6' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '#188df0' },
                ]),
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' },
                ]),
              },
            },
          },
        ],
      };
      myEcharts.setOption(option);
    },

    // 月销售额趋势
    salesVolumeTrendEcharts(data) {
      const xAxisData = [];
      const yAxisData = [];
      data.forEach(item => {
        xAxisData.push(item.x);
        yAxisData.push(item.y);
      });

      const myEcharts = echarts.init(this.$refs.salesVolumeTrendEcharts);
      const option = {
        title: {
          text: '月销售趋势',
          subtext: '月销售趋势图',
          x: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
            label: {
              backgroundColor: '#6a7985',
            },
          },
          formatter: function(params) {
            return params[0].axisValue + '：' + params[0].value;
          },
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            type: 'bar',
            data: yAxisData,

            smooth: true,
            showSymbol: false,
            lineStyle: {
              color: '#975FE4',
            },
            itemStyle: {
              color: '#975FE4',
            },
            areaStyle: {
              color: '#975FE4',
              opacity: 1,
            },
          },
        ],
      };
      myEcharts.setOption(option);
    },

    visitVolumeTrendEcharts(data) {
      const xAxisData = [];
      const yAxisData = [];
      data.forEach(item => {
        xAxisData.push(item.x);
        yAxisData.push(item.y);
      });

      const myEcharts = echarts.init(this.$refs.visitVolumeEcharts);
      const option = {
        title: {
          text: '日访问量趋势',
          subtext: '日访问量趋势图',
          x: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
            label: {
              backgroundColor: '#6a7985',
            },
          },
          formatter: function(params) {
            return params[0].axisValue + '：' + params[0].value;
          },
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            type: 'bar',
            data: yAxisData,

            smooth: true,
            showSymbol: false,
            lineStyle: {
              color: '#975FE4',
            },
            itemStyle: {
              color: '#975FE4',
            },
            areaStyle: {
              color: '#975FE4',
              opacity: 1,
            },
          },
        ],
      };
      myEcharts.setOption(option);
    },
  },
};
</script>

<style lang="scss">
.card-charts {
  .el-card__header {
    font-size: 14px;
    color: #707478;
    border-bottom: none;
    padding: 15px;
    padding-bottom: 0;
  }
  .el-card__body {
    font-size: 14px;
    padding: 15px;
  }
  .card-charts-body {
    h4 {
      font-size: 28px;
      margin: 0;
    }
  }
  .card-charts-footer {
    border-top: 1px solid #e8e8e8;
    margin-top: 8px;
    padding-top: 9px;
  }
  .el-progress__text {
    font-size: 30px !important;
  }
  .el-tabs__item {
    font-size: 16px;
  }
  .el-tabs__nav-wrap {
    &:after {
      height: 1px;
    }
  }
}

.trend-charts {
  height: 40px;
  padding-top: 10px;
  line-height: 150%;
  .trend-item {
  }
}
</style>
