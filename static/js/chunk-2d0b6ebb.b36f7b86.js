(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b6ebb"],{"1ee6":function(e,t,n){"use strict";n.r(t);var i=n("7a23"),a=Object(i["createVNode"])("h3",null,[Object(i["createTextVNode"])(" Integration with "),Object(i["createVNode"])("a",{href:"https://element.eleme.io/#/en-US/component/collapse#collapse",target:"_blank"}," Element collapse ")],-1),o=Object(i["createVNode"])("h3",null,"List",-1),c=Object(i["createVNode"])("h3",null,"ActiveNames",-1);function l(e,t,n,l,r,s){var d=Object(i["resolveComponent"])("el-collapse-item"),u=Object(i["resolveComponent"])("draggable"),p=Object(i["resolveComponent"])("el-col"),b=Object(i["resolveComponent"])("MonacoEditor"),h=Object(i["resolveComponent"])("el-row");return Object(i["openBlock"])(),Object(i["createBlock"])(h,{gutter:10},{default:Object(i["withCtx"])((function(){return[Object(i["createVNode"])(p,{span:8},{default:Object(i["withCtx"])((function(){return[a,Object(i["createVNode"])(u,{tag:"el-collapse",list:r.list,"component-data":r.collapseComponentData,"item-key":"id"},{item:Object(i["withCtx"])((function(e){var t=e.element;return[Object(i["createVNode"])(d,{key:t.id,title:t.title,name:t.id},{default:Object(i["withCtx"])((function(){return[(Object(i["openBlock"])(!0),Object(i["createBlock"])(i["Fragment"],null,Object(i["renderList"])(t.text,(function(e,t){return Object(i["openBlock"])(),Object(i["createBlock"])("div",{key:t},Object(i["toDisplayString"])(e),1)})),128))]})),_:2},1032,["title","name"])]})),_:1},8,["list","component-data"])]})),_:1}),Object(i["createVNode"])(p,{span:8},{default:Object(i["withCtx"])((function(){return[o,Object(i["createVNode"])(b,{modelValue:s.listText,"onUpdate:modelValue":t[1]||(t[1]=function(e){return s.listText=e}),style:{height:"400px"}},null,8,["modelValue"])]})),_:1}),Object(i["createVNode"])(p,{span:8},{default:Object(i["withCtx"])((function(){return[c,Object(i["createVNode"])(b,{modelValue:s.activeNamesText,"onUpdate:modelValue":t[2]||(t[2]=function(e){return s.activeNamesText=e}),style:{height:"400px"}},null,8,["modelValue"])]})),_:1})]})),_:1})}var r=n("b76a"),s=n.n(r),d={name:"third-party",display:"Third party",order:10,components:{draggable:s.a},data:function(){return{list:[{title:"Consistency",id:1,text:["Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;","Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc."]},{title:"Feedback",id:2,text:["Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;","Visual feedback: reflect current state by updating or rearranging elements of the page."]},{title:"Efficiency",id:3,text:["Simplify the process: keep operating process simple and intuitive;","Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make decisions;","Easy to identify: the interface should be straightforward, which helps the users to identify and frees them from memorizing and recalling."]},{title:"Controllability",id:4,text:["Decision making: giving advices about operations is acceptable, but do not make decisions for the users;","Controlled consequences: users should be granted the freedom to operate, including canceling, aborting or terminating current operation."]}],activeNames:[1],collapseComponentData:{on:{input:this.inputChanged},props:{value:this.activeNames}}}},computed:{listText:{get:function(){return JSON.stringify(this.list,null,2)},set:function(){}},activeNamesText:{get:function(){return JSON.stringify(this.activeNames,null,2)},set:function(){}}},methods:{inputChanged:function(e){this.activeNames=e}}};d.render=l;t["default"]=d}}]);