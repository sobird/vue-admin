(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e544e"],{9485:function(e,t,n){"use strict";n.r(t);var o=n("7a23"),r=Object(o["createTextVNode"])(" 打开新窗口，既可以通过window.open的方式在新标签下打开新窗口，也可以通过iframe嵌入的方式，将第三方页面嵌入到当前页面。 "),c=Object(o["createTextVNode"])("抽屉模式打开网页"),i=Object(o["createTextVNode"])("新窗口打开网页");function a(e,t,n,a,d,u){var b=Object(o["resolveComponent"])("layout-view-header"),l=Object(o["resolveComponent"])("el-button");return Object(o["openBlock"])(),Object(o["createBlock"])("div",null,[Object(o["createVNode"])(b,null,{default:Object(o["withCtx"])((function(){return[r]})),_:1}),Object(o["createVNode"])(l,{type:"primary",onClick:u.openDrawer},{default:Object(o["withCtx"])((function(){return[c]})),_:1},8,["onClick"]),Object(o["createVNode"])(l,{type:"primary",onClick:u.openWindow},{default:Object(o["withCtx"])((function(){return[i]})),_:1},8,["onClick"])])}var d={data:function(){return{}},methods:{openDrawer:function(){this.$open("//sobird.me","_drawer")},openWindow:function(){this.$open("//sobird.me","_blank")}}};d.render=a;t["default"]=d}}]);