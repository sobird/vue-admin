(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2e967a46"],{"0aa0":function(e,t,n){},"7ec5":function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return r}));var o=n("a27e");function a(e){return o["a"].get("/graph/simple.json",{params:e,message:""})}function r(e){return o["a"].get("/graph/doubleTree.json",{params:e,message:""})}},"7ecb":function(e,t,n){"use strict";n("0aa0")},a6ed:function(e,t,n){"use strict";n.r(t);var o=n("7a23"),a=Object(o["withScopeId"])("data-v-c43542fa");Object(o["pushScopeId"])("data-v-c43542fa");var r=Object(o["createTextVNode"])(" 使用GoJS来渲染一个双树图表，更多示例，请访问 "),i=Object(o["createVNode"])("a",{href:"https://gojs.net/latest/samples/index.html"},"官方站点",-1),c={ref:"diagram",class:"diagram"};Object(o["popScopeId"])();var l=a((function(e,t,n,l,d,u){var s=Object(o["resolveComponent"])("layout-view-header");return Object(o["openBlock"])(),Object(o["createBlock"])("div",null,[Object(o["createVNode"])(s,null,{default:a((function(){return[r,i]})),_:1}),Object(o["createVNode"])("div",c,null,512)])})),d=n("7ec5"),u={data:function(){return{go:null}},props:{nodeDataArray:{type:Array,default:function(){return[]}},nodeLinkArray:{type:Array,default:function(){return[]}}},mounted:function(){var e=this;Object(d["a"])().then((function(t){e.initDiagram(go,t)}))},methods:{initDiagram:function(e,t){var n=e.GraphObject.make,o=this.$refs.diagram,a=n(e.Diagram,o,{initialContentAlignment:e.Spot.TopLeft,"toolManager.mouseWheelBehavior":e.ToolManager.WheelNone,"animationManager.isEnabled":!1,allowMove:!1,allowDrop:!1,layout:n(DoubleTreeLayout,{directionFunction:function(e){return e.data&&"left"!==e.data.dir}}),InitialLayoutCompleted:function(e){var t=e.diagram;t.div.style.height=t.documentBounds.height+"px"}});a.nodeTemplate=this.nodeTemplate(e),a.linkTemplate=n(e.Link,{routing:e.Link.AvoidsNodes,corner:5},new e.Binding("fromSpot","fromSpot",(function(e){return spotConverter(e)})),new e.Binding("toSpot","toSpot",(function(e){return spotConverter(e)})),new e.Binding("points").makeTwoWay(),n(e.Shape,{strokeWidth:1,stroke:"#C0C4CC"}),n(e.Shape,{toArrow:"Boomerang",fill:"#C0C4CC",stroke:null})),a.model=new e.TreeModel(t),o.childNodes[0].focus=function(){}},nodeTemplate:function(e){var t=e.GraphObject.make,n={parameter1:2,spot1:e.Spot.TopLeft,spot2:e.Spot.BottomRight};return t(e.Node,"Vertical",{movable:!1,locationSpot:e.Spot.Center,locationObjectName:"ICON",selectionObjectName:"ICON",selectionAdornmentTemplate:t(e.Adornment,"Auto",t(e.Shape,{fill:null,strokeWidth:0}),t(e.Placeholder)),isShadowed:!0,shadowOffset:new e.Point(1,1),shadowColor:"rgba(0, 0, 0, .2)"},t(e.Panel,"Auto",{name:"ICON"},t(e.Shape,"RoundedRectangle",n,{fill:"#ecf5ff",strokeWidth:0,stroke:"#b3d8ff",portId:""}),t(e.Panel,"Vertical",t(e.TextBlock,{margin:new e.Margin(10,10),textAlign:"center",stroke:"#666",font:"14px sans-serif"},new e.Binding("text","key")))))}}};n("7ecb");u.render=l,u.__scopeId="data-v-c43542fa";t["default"]=u}}]);