<!--
 - 百度地图组件
 - 
 - sobird<i@sobird.me> at 2020/09/22 11:18:18 created.
-->

<template>
  <div class="ditu" ref="ditu">bmap</div>
</template>

<script>
import jsonp from 'jsonp';
import debounce from 'lodash/debounce';

const ACCESS_KEY = 'WtfiDziaW2086WpToN3NQ08H';
const BMAP_API = 'https://api.map.baidu.com/api?v=3.0&ak=' + ACCESS_KEY;
const BMAPGL_API = 'https://api.map.baidu.com/api?v=1.0&type=webgl&ak=' + ACCESS_KEY;

function address2string(address = []) {
  let _address = [];
  address.forEach(item => {
    _address.push(item.label);
  });

  return {
    value: _address.join(''),
    level: _address.length,
  };
}

export default {
  data() {
    return {
      ditu: null,

      // 地理编码
      geocoder: null,
    };
  },

  props: {
    // 接受外部对象模型
    vmodel: {
      type: Object,
      default: () => {},
    },
  },

  created() {
    this.getPoint = () => {};
  },

  mounted() {
    const { ditu } = this.$refs;
    const { vmodel } = this;

    // 初始化地图容器
    jsonp(BMAP_API, () => {
      // 设置命名空间
      let BMap = window.BMap;

      let map = new BMap.Map(ditu);
      let geocoder = new BMap.Geocoder();
      let point = new BMap.Point(116.404, 39.915);

      // 添加比例尺控件
      map.addControl(new BMap.ScaleControl());
      // 添加平移缩放控件
      map.addControl(new BMap.NavigationControl({ type: BMAP_NAVIGATION_CONTROL_SMALL }));
      //map.addControl(new BMap.MapTypeControl());

      // 创建标注
      var marker = new BMap.Marker(point, {
        enableDragging: true,
      });
      map.addOverlay(marker);
      // 可拖拽
      // marker.enableDragging();
      marker.addEventListener('dragend', (e, t) => {
        geocoder.getLocation(e.point, res => {
          this.$set(vmodel, 'address', res.address);

          this.$emit('input', point);
        });
      });

      map.centerAndZoom(point, 15);

      // 地理编码实例
      this.geocoder = geocoder;

      // 对geocoder.getPoint的封装
      this.getPoint = (address, callback) => {
        geocoder.getPoint(address, point => {
          map.centerAndZoom(point, 16);
          marker.setPosition(point);

          this.$emit('input', point);
          callback(map);
        });
      };

      // 地理逆编码
      this.getLocation = function(point, callback) {
        geocoder.getLocation(address, address => {
          console.log(address);

          callback(map);
        });
      };

      this.ditu = map;
      window.map = map;
    });
  },

  methods: {},

  watch: {
    'vmodel.cityCode': function(n, o) {
      const { vmodel, geocoder } = this;

      let address = address2string(n);

      this.getPoint(address.value, map => {
        map.setZoom(13 + address.level);
      });

      // 如果切换了城市，则小区名称置空
      this.$set(vmodel, 'districtName', '');
    },

    // 小区名称
    'vmodel.districtName': debounce(function(n, o) {
      const { cityCode = [] } = this.vmodel;
      let address = address2string(cityCode);

      this.getPoint(address.value + n, map => {
        map.setZoom(13 + address.level);
      });
    }, 300),
  },
};
</script>

<style lang="scss" scoped>
.ditu {
  width: 800px;
  height: 300px;
}
</style>