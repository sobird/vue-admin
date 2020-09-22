<!--
 - 百度地图组件
 - 
 - sobird<i@sobird.me> at 2020/09/22 11:18:18 created.
-->

<template>
  <div class="ditu" ref="ditu">bmap</div>
</template>

<script>
import jsonp from "jsonp";
const ACCESS_KEY = "WtfiDziaW2086WpToN3NQ08H";
const BMAP_API =
  "https://api.map.baidu.com/api?v=3.0&ak=" + ACCESS_KEY;
const BMAPGL_API =
  "https://api.map.baidu.com/api?v=1.0&type=webgl&ak=" + ACCESS_KEY;

export default {
  data() {
    return {
      ditu: null,

      // 地理编码
      geocoder: null
    };
  },

  props: {
    location: {
      type: String,
      default: "北京市"
    }
  },

  mounted() {
    const { ditu } = this.$refs;

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
      map.addControl(new BMap.NavigationControl({type: BMAP_NAVIGATION_CONTROL_SMALL} ));
      //map.addControl(new BMap.MapTypeControl());

      // 创建标注
      var marker = new BMap.Marker(point, {
          enableDragging: true,
      });
      map.addOverlay(marker);
      // 可拖拽
      // marker.enableDragging();
      marker.addEventListener("dragend", (e, t) => {
        geocoder.getLocation(e.point, res => {
            console.log(res);
        })
      });

      map.centerAndZoom(point, 15);

      // 地理编码实例
      this.geocoder = geocoder;

      this.ditu = map;
      window.map = map;
    });
  },

  methods: {}
};
</script>

<style lang="scss" scoped>
.ditu {
  width: 800px;
  height: 300px;
}
</style>