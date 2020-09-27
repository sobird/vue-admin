(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-49bfe6c4"],{"1c2c":function(e,t,a){"use strict";var o=a("c8d3"),r=a.n(o);r.a},"60ea":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("layout-view-header"),a("el-row",{attrs:{type:"flex"}},[a("el-col",{attrs:{span:12}},[a("app-form",{attrs:{mode:"update",vmodel:e.vmodel,submit:e.submit}})],1)],1)],1)},r=[],n=a("d8df"),l=a("6149"),i={components:{appForm:l["a"]},data:function(){return{vmodel:{}}},mounted:function(){var e=this,t=this.$route.query;Object(n["c"])(t).then((function(t){e.vmodel=t}))},methods:{submit:function(e){var t=this;Object(n["a"])(e).then((function(e){t.$router.push({name:"myapp"})}))}}},s=i,p=a("2877"),m=Object(p["a"])(s,o,r,!1,null,null,null);t["default"]=m.exports},6149:function(e,t,a){"use strict";var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-form",{ref:"appForm",attrs:{model:e.appFormModel,rules:e.appFormRules,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"应用名",prop:"name"}},[a("el-input",{attrs:{disabled:"update"==e.mode,placeholder:"由数字下划线或小写字母组成，总长不超过32个字符"},on:{input:e.nameChange},model:{value:e.appFormModel.name,callback:function(t){e.$set(e.appFormModel,"name",t)},expression:"appFormModel.name"}}),a("span",{staticClass:"item-tip"},[a("i",{staticClass:"el-icon-info"}),e._v(" 应用名一旦申请不可修改，请确认后提交 ")])],1),a("el-form-item",{attrs:{label:"中文名",prop:"cname"}},[a("el-input",{attrs:{placeholder:"请填写应用中文名"},model:{value:e.appFormModel.cname,callback:function(t){e.$set(e.appFormModel,"cname",t)},expression:"appFormModel.cname"}})],1),a("el-form-item",{attrs:{label:"所属团队",prop:"teamId"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择应用所属团队"},model:{value:e.appFormModel.teamId,callback:function(t){e.$set(e.appFormModel,"teamId",t)},expression:"appFormModel.teamId"}},[a("el-option",{attrs:{label:"北京团队",value:"beijing"}}),a("el-option",{attrs:{label:"上海团队",value:"shanghai"}})],1)],1),a("el-form-item",{attrs:{label:"访问链接",prop:"domain"}},[a("el-input",{attrs:{disabled:"update"==e.mode,placeholder:"请输入应用域"},model:{value:e.appFormModel.domain,callback:function(t){e.$set(e.appFormModel,"domain",t)},expression:"appFormModel.domain"}},[a("template",{slot:"prepend"},[e._v("http://example.com/")])],2)],1),a("el-form-item",{attrs:{label:"访问权限",prop:"access"}},[a("el-radio-group",{model:{value:e.appFormModel.access,callback:function(t){e.$set(e.appFormModel,"access",t)},expression:"appFormModel.access"}},[a("el-radio",{attrs:{label:"公开"}}),a("el-radio",{attrs:{label:"私有"}})],1)],1),a("el-form-item",{attrs:{label:"应用简介",prop:"description"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:5,maxRows:8},maxlength:"300","show-word-limit":""},model:{value:e.appFormModel.description,callback:function(t){e.$set(e.appFormModel,"description",t)},expression:"appFormModel.description"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("appForm")}}},[e._v("提交")]),a("el-button",{on:{click:function(){e.$router.push({name:"myapp"})}}},[e._v(" 取消 ")])],1)],1)},r=[],n={data:function(){return{appFormModel:{name:"",cname:"",teamId:"",domain:"",access:"",description:""},appFormRules:{name:[{required:!0,message:"请输入应用名",trigger:"blur"},{pattern:/(^[A-Za-z0-9_]+$)/,message:"由数字下划线或小写字母组成",trigger:"change"},{min:1,max:32,message:"总长不超过32个字符",trigger:"change"}],domain:[{required:!0,message:"请输入应用域",trigger:"blur"},{pattern:/(^[A-Za-z0-9_]+$)/,message:"由数字下划线或小写字母组成",trigger:"change"},{min:1,max:32,message:"总长不超过32个字符",trigger:"change"}],cname:[{required:!0,message:"请填写应用中文名",trigger:"blur"}],teamId:[{required:!0,message:"请选择应用所属团队",trigger:"blur"}],description:[{required:!0,message:"请输入应用简介",trigger:"blur"},{min:10,max:300,message:"至少输入10个字符",trigger:"change"}]}}},props:{mode:{type:String,default:"create"},vmodel:{type:Object,default:function(){return null}},submit:{type:Function,default:function(){}}},mounted:function(){},methods:{nameChange:function(e){this.$set(this.appFormModel,"domain",e)},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;t.submit(t.appFormModel)}))}},watch:{vmodel:{handler:function(e,t){e&&Object.assign(this.appFormModel,e)},deep:!0}}},l=n,i=(a("1c2c"),a("2877")),s=Object(i["a"])(l,o,r,!1,null,null,null);t["a"]=s.exports},c8d3:function(e,t,a){},d8df:function(e,t,a){"use strict";a.d(t,"b",(function(){return r})),a.d(t,"a",(function(){return n})),a.d(t,"c",(function(){return l}));var o=a("a27e");function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return o["a"].get("/app/my.json",{params:e,message:""})}function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return o["a"].post("/app/apply.json",e,{message:""})}function l(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return o["a"].get("/app/detail.json",{params:e,message:""})}}}]);