<!--
 - double-tree.vue
 - 双树图表
 - 
 - sobird<i@sobird.me> at 2020/11/17 18:22:11 created.
-->

<template>
  <div>
    <layout-view-header>
      使用GoJS来渲染一个双树图表，更多示例，请访问
      <a href="https://gojs.net/latest/samples/index.html">官方站点</a>
    </layout-view-header>

    <div ref="diagram" class="diagram"></div>
  </div>
</template>

<script>
import { doubleTree } from './model';

export default {
  data() {
    return {
      go: null,
    };
  },
  props: {
    nodeDataArray: {
      type: Array,
      default: () => [],
    },
    nodeLinkArray: {
      type: Array,
      default: () => [],
    },
  },

  mounted() {
    doubleTree().then(data => {
      this.initDiagram(go, data);
    });
  },
  methods: {
    // 渲染/初始化 gojs 图表
    initDiagram(go, data) {
      const $ = go.GraphObject.make;
      const $diagram = this.$refs.diagram;

      const diagram = $(go.Diagram, $diagram, {
        initialContentAlignment: go.Spot.TopLeft,
        'toolManager.mouseWheelBehavior': go.ToolManager.WheelNone,
        'animationManager.isEnabled': false,
        allowMove: false,
        allowDrop: false,
        //allowSelect: false,
        //isReadOnly: true,

        layout: $(DoubleTreeLayout, {
          directionFunction: function(n) {
            return n.data && n.data.dir !== 'left';
          },
        }),

        //
        InitialLayoutCompleted: function(e) {
          var dia = e.diagram;
          // add height for horizontal scrollbar
          dia.div.style.height = dia.documentBounds.height + 'px';
        },
      });

      diagram.nodeTemplate = this.nodeTemplate(go);
      diagram.linkTemplate = $(
        go.Link,

        { routing: go.Link.AvoidsNodes, corner: 5 },

        new go.Binding('fromSpot', 'fromSpot', function(d) {
          return spotConverter(d);
        }),

        new go.Binding('toSpot', 'toSpot', function(d) {
          return spotConverter(d);
        }),

        new go.Binding('points').makeTwoWay(),

        $(go.Shape, { strokeWidth: 1, stroke: '#C0C4CC' }),

        // https://gojs.net/latest/extensions/Arrowheads.js
        $(go.Shape, { toArrow: 'Boomerang', fill: '#C0C4CC', stroke: null })
      );

      diagram.model = new go.TreeModel(data);

      $diagram.childNodes[0].focus = function() {};
    },

    // 节点模板
    nodeTemplate(go) {
      const $ = go.GraphObject.make;
      const roundedRectangleParams = {
        parameter1: 2,
        spot1: go.Spot.TopLeft,
        spot2: go.Spot.BottomRight,
      };

      return $(
        go.Node,
        'Vertical',
        {
          movable: false,
          locationSpot: go.Spot.Center,
          locationObjectName: 'ICON',
          selectionObjectName: 'ICON',
          // selection adornment to match shape of nodes
          selectionAdornmentTemplate: $(
            go.Adornment,
            'Auto',
            $(go.Shape, { fill: null, strokeWidth: 0 }),
            $(go.Placeholder)
          ),
          isShadowed: true,
          shadowOffset: new go.Point(1, 1),
          shadowColor: 'rgba(0, 0, 0, .2)',
        },

        $(
          go.Panel,
          'Auto',
          { name: 'ICON' },
          $(go.Shape, 'RoundedRectangle', roundedRectangleParams, {
            fill: '#ecf5ff',
            strokeWidth: 0,
            stroke: '#b3d8ff',
            portId: '',
          }),

          $(
            go.Panel,
            'Vertical',
            // $(
            //   go.TextBlock,
            //   {
            //     margin: new go.Margin(5, 5),
            //     textAlign: 'center',
            //     stroke: '#409eff',
            //     font: '14px sans-serif',
            //     cursor: 'pointer',
            //   },
            //   {
            //     click: (e, node) => {
            //       let address = node.part.data.address;
            //       window.open(address, '_blank');
            //     },
            //   },
            //   new go.Binding('text', 'service')
            // ),

            $(
              go.TextBlock,
              {
                margin: new go.Margin(10, 10),
                textAlign: 'center',
                stroke: '#666',
                font: '14px sans-serif',
              },
              new go.Binding('text', 'key')
            )
          )
        )
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.diagram {
  margin-top: 30px;
}
</style>
