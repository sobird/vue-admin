(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b5d2d"],{"1b17":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",[a("el-col",{attrs:{span:12}},[a("h3",[t._v("Draggable table")]),a("table",{staticClass:"el-table el-table-striped"},[a("thead",{staticClass:"thead-dark"},[a("tr",[a("th",{attrs:{scope:"col"}},[t._v("Id")]),a("th",{attrs:{scope:"col"}},[t._v("Name")]),a("th",{attrs:{scope:"col"}},[t._v("Sport")])])]),a("draggable",{attrs:{tag:"tbody"},model:{value:t.list,callback:function(e){t.list=e},expression:"list"}},t._l(t.list,(function(e){return a("tr",{key:e.name},[a("td",{attrs:{scope:"row"}},[t._v(t._s(e.id))]),a("td",[t._v(t._s(e.name))]),a("td",[t._v(t._s(e.sport))])])})),0)],1)]),a("el-col",{attrs:{span:12}},[a("MonacoEditor",{staticStyle:{height:"400px"},model:{value:t.listText,callback:function(e){t.listText=e},expression:"listText"}})],1)],1)},l=[],o=a("b76a"),n=a.n(o),r={name:"table-example",display:"Table",order:8,components:{draggable:n.a},data:function(){return{list:[{id:1,name:"Abby",sport:"basket"},{id:2,name:"Brooke",sport:"foot"},{id:3,name:"Courtenay",sport:"volley"},{id:4,name:"David",sport:"rugby"}],dragging:!1}},computed:{listText:{get:function(){return JSON.stringify(this.list,null,2)},set:function(){}}}},i=r,c=a("2877"),d=Object(c["a"])(i,s,l,!1,null,"b8ba54ea",null);e["default"]=d.exports}}]);