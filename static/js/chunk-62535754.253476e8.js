(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-62535754"],{"83b7":function(e,t,o){"use strict";o.r(t);o("a4d3"),o("e01a"),o("b0c0");var r=o("7a23"),c={slot:"action"},n=Object(r["createVNode"])("i",{class:"iconfont icon-plus-circle"},null,-1),i=Object(r["createTextVNode"])(" 添加项目 "),a={"slot-scope":"scope"},l=Object(r["createTextVNode"])("编辑"),u=Object(r["createTextVNode"])("删除"),s=Object(r["createVNode"])("i",{slot:"prefix",class:"fa fa-product-hunt"},null,-1),d={slot:"footer",class:"dialog-footer"},p=Object(r["createTextVNode"])("取 消"),j=Object(r["createTextVNode"])("确 定");function b(e,t,o,b,f,m){var O=Object(r["resolveComponent"])("el-button"),h=Object(r["resolveComponent"])("layout-view-header"),V=Object(r["resolveComponent"])("el-table-column"),v=Object(r["resolveComponent"])("el-table"),w=Object(r["resolveComponent"])("el-card"),C=Object(r["resolveComponent"])("el-input"),N=Object(r["resolveComponent"])("el-form-item"),F=Object(r["resolveComponent"])("el-form"),x=Object(r["resolveComponent"])("el-dialog");return Object(r["openBlock"])(),Object(r["createBlock"])("div",null,[Object(r["createVNode"])(h,null,{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])("template",c,[Object(r["createVNode"])(O,{type:"primary",size:"mini",plain:"",onClick:t[1]||(t[1]=function(){f.projectFormVisible=!0})},{default:Object(r["withCtx"])((function(){return[n,i]})),_:1})])]})),_:1}),Object(r["createVNode"])(w,{shadow:"never"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(v,{data:f.projectList,style:{width:"100%"}},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(V,{prop:"name",label:"项目名称"}),Object(r["createVNode"])(V,{prop:"description",label:"项目描述"}),Object(r["createVNode"])(V,{prop:"createTime",label:"创建时间"}),Object(r["createVNode"])(V,{label:"操作",width:"150"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])("template",a,[Object(r["createVNode"])(O,{type:"text",onClick:t[2]||(t[2]=function(){f.projectFormVisible=!0,f.projectFormType="update",Object.assign(f.projectFormModel,e.scope.row)})},{default:Object(r["withCtx"])((function(){return[l]})),_:1}),Object(r["createVNode"])(O,{onClick:t[3]||(t[3]=function(t){return m.projectDelete(e.scope.row.id)}),type:"text"},{default:Object(r["withCtx"])((function(){return[u]})),_:1})])]})),_:1})]})),_:1},8,["data"])]})),_:1}),Object(r["createVNode"])(x,{title:"create"==f.projectFormType?"添加项目":"更新项目",visible:f.projectFormVisible,onClosed:t[8]||(t[8]=function(t){return e.$refs["projectForm"].resetFields()})},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(F,{ref:"projectForm","label-width":"80px",model:f.projectFormModel,rules:f.projectFormRules},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(N,{prop:"name",label:"项目名称"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(C,{modelValue:f.projectFormModel.name,"onUpdate:modelValue":t[4]||(t[4]=function(e){return f.projectFormModel.name=e}),"auto-complete":"off",placeholder:"输入项目名"},{default:Object(r["withCtx"])((function(){return[s]})),_:1},8,["modelValue"])]})),_:1}),Object(r["createVNode"])(N,{prop:"description",label:"项目描述"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(C,{type:"textarea",modelValue:f.projectFormModel.description,"onUpdate:modelValue":t[5]||(t[5]=function(e){return f.projectFormModel.description=e})},null,8,["modelValue"])]})),_:1})]})),_:1},8,["model","rules"]),Object(r["createVNode"])("div",d,[Object(r["createVNode"])(O,{onClick:t[6]||(t[6]=function(e){return f.projectFormVisible=!1})},{default:Object(r["withCtx"])((function(){return[p]})),_:1}),Object(r["createVNode"])(O,{type:"primary",onClick:t[7]||(t[7]=function(e){return m.submitForm("projectForm")})},{default:Object(r["withCtx"])((function(){return[j]})),_:1})])]})),_:1},8,["title","visible"])])}o("d3b7");var f=o("a27e");function m(e){return f["a"].post("/project/create.json",e,{})}function O(e){return f["a"].get("/project/query.json",{params:e,message:""})}function h(e){return f["a"].post("/project/update.json",e,{message:"更新项目成功"})}function V(e){return f["a"].post("/project/delete.json",e,{message:"删除项目成功"})}var v={data:function(){return{projectList:[],projectFormVisible:!1,projectFormType:"create",projectFormModel:{name:"",description:""},projectFormRules:{name:[{required:!0,message:"请输入项目名称",trigger:"blur"},{min:1,max:20,message:"长度在 1 到 20 个字符",trigger:"blur"},{pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+$/,message:"不允许输入空格等特殊符号"}]}}},created:function(){var e=this,t=Object.assign({},this.$route.query);O(t).then((function(t){e.projectList=t.list}))},methods:{projectDelete:function(e){var t=this;this.$confirm("确定要删除该项目吗？","提示信息").then((function(o){V({id:e}).then((function(e){t.$store.dispatch("refreshRouteView")}))})).catch((function(e){}))},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;var o=Promise.resolve();o="create"==t.projectFormType?m(t.projectFormModel):h(t.projectFormModel),o.then((function(e){t.$store.dispatch("refreshRouteView"),t.projectFormVisible=!1}))}))}}};v.render=b;t["default"]=v},e01a:function(e,t,o){"use strict";var r=o("23e7"),c=o("83ab"),n=o("da84"),i=o("5135"),a=o("861d"),l=o("9bf2").f,u=o("e893"),s=n.Symbol;if(c&&"function"==typeof s&&(!("description"in s.prototype)||void 0!==s().description)){var d={},p=function(){var e=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),t=this instanceof p?new s(e):void 0===e?s():s(e);return""===e&&(d[t]=!0),t};u(p,s);var j=p.prototype=s.prototype;j.constructor=p;var b=j.toString,f="Symbol(test)"==String(s("test")),m=/^Symbol\((.*)\)[^)]+$/;l(j,"description",{configurable:!0,get:function(){var e=a(this)?this.valueOf():this,t=b.call(e);if(i(d,e))return"";var o=f?t.slice(7,-1):t.replace(m,"$1");return""===o?void 0:o}}),r({global:!0,forced:!0},{Symbol:p})}}}]);