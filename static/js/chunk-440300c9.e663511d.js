(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-440300c9"],{"81a2":function(e,t,o){"use strict";o.r(t);var r=o("7a23"),c=Object(r["withScopeId"])("data-v-b50454ec");Object(r["pushScopeId"])("data-v-b50454ec");var n=Object(r["createTextVNode"])(" 将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。 "),a={key:0},l=Object(r["createVNode"])("template",{slot:"prepend"},"￥",-1),u=Object(r["createTextVNode"])(" 下一步 "),d={key:1,class:"form-confirm"},p={class:"amount"},s=Object(r["createTextVNode"])(" 元 "),i=Object(r["createVNode"])("i",{class:"el-icon-mobile-phone"},null,-1),m=Object(r["createTextVNode"])("提交"),b=Object(r["createTextVNode"])(" 上一步 "),f={key:2,class:"form-result"},j=Object(r["createVNode"])("i",{class:"el-icon-success"},null,-1),O=Object(r["createVNode"])("h4",null,"操作成功",-1),N=Object(r["createVNode"])("p",null,"预计2小时内到账",-1),V={class:"amount"},y=Object(r["createTextVNode"])(" 元 "),g={class:"form-action"},v=Object(r["createTextVNode"])(" 再转一笔 "),F=Object(r["createTextVNode"])("查看账单");Object(r["popScopeId"])();var _=c((function(e,t,o,_,k,A){var M=Object(r["resolveComponent"])("layout-view-header"),x=Object(r["resolveComponent"])("el-step"),C=Object(r["resolveComponent"])("el-steps"),h=Object(r["resolveComponent"])("el-col"),w=Object(r["resolveComponent"])("el-option"),T=Object(r["resolveComponent"])("el-select"),S=Object(r["resolveComponent"])("el-form-item"),D=Object(r["resolveComponent"])("el-input"),B=Object(r["resolveComponent"])("el-button"),U=Object(r["resolveComponent"])("el-alert"),q=Object(r["resolveComponent"])("el-divider"),I=Object(r["resolveComponent"])("el-card"),P=Object(r["resolveComponent"])("el-form"),$=Object(r["resolveComponent"])("el-row");return Object(r["openBlock"])(),Object(r["createBlock"])("div",null,[Object(r["createVNode"])(M,null,{default:c((function(){return[n]})),_:1}),Object(r["createVNode"])(C,{active:k.stepNum,"process-status":"finish","finish-status":"success","align-center":"",style:{"margin-bottom":"20px"}},{default:c((function(){return[Object(r["createVNode"])(x,{title:"添加账户信息"}),Object(r["createVNode"])(x,{title:"确认信息"}),Object(r["createVNode"])(x,{title:"完成"})]})),_:1},8,["active"]),Object(r["createVNode"])($,{type:"flex"},{default:c((function(){return[Object(r["createVNode"])(h,{span:6}),Object(r["createVNode"])(h,{span:12},{default:c((function(){return[Object(r["createVNode"])(P,{ref:"stepForm",model:k.stepFormModel,rules:k.stepFormRules,"label-width":"110px"},{default:c((function(){return[0==k.stepNum?(Object(r["openBlock"])(),Object(r["createBlock"])("div",a,[Object(r["createVNode"])(S,{label:"付款账户：",prop:"paymentAccount"},{default:c((function(){return[Object(r["createVNode"])(T,{modelValue:k.stepFormModel.paymentAccount,"onUpdate:modelValue":t[1]||(t[1]=function(e){return k.stepFormModel.paymentAccount=e}),placeholder:"请选择付款账户",style:{width:"100%"}},{default:c((function(){return[Object(r["createVNode"])(w,{label:"i@sobird.me",value:"i@sobird.me"})]})),_:1},8,["modelValue"])]})),_:1}),Object(r["createVNode"])(S,{label:"收款账户：",prop:"receiptAccount"},{default:c((function(){return[Object(r["createVNode"])(D,{modelValue:k.stepFormModel.receiptAccount,"onUpdate:modelValue":t[2]||(t[2]=function(e){return k.stepFormModel.receiptAccount=e})},null,8,["modelValue"])]})),_:1}),Object(r["createVNode"])(S,{label:"收款人姓名：",prop:"receiptName"},{default:c((function(){return[Object(r["createVNode"])(D,{modelValue:k.stepFormModel.receiptName,"onUpdate:modelValue":t[3]||(t[3]=function(e){return k.stepFormModel.receiptName=e})},null,8,["modelValue"])]})),_:1}),Object(r["createVNode"])(S,{label:"转账金额：",prop:"transferAmount"},{default:c((function(){return[Object(r["createVNode"])(D,{modelValue:k.stepFormModel.transferAmount,"onUpdate:modelValue":t[4]||(t[4]=function(e){return k.stepFormModel.transferAmount=e}),modelModifiers:{number:!0}},{default:c((function(){return[l]})),_:1},8,["modelValue"])]})),_:1}),Object(r["createVNode"])(S,{label:"备注信息：",prop:"remark"},{default:c((function(){return[Object(r["createVNode"])(D,{type:"textarea",modelValue:k.stepFormModel.remark,"onUpdate:modelValue":t[5]||(t[5]=function(e){return k.stepFormModel.remark=e})},null,8,["modelValue"])]})),_:1}),Object(r["createVNode"])(S,null,{default:c((function(){return[Object(r["createVNode"])(B,{type:"primary",onClick:t[6]||(t[6]=function(){e.$refs["stepForm"].validate((function(e){if(!e)return!1;k.stepNum=1}))})},{default:c((function(){return[u]})),_:1})]})),_:1})])):Object(r["createCommentVNode"])("",!0),1==k.stepNum?(Object(r["openBlock"])(),Object(r["createBlock"])("div",d,[Object(r["createVNode"])(U,{title:"确认转账后，资金将直接打入对方账户，无法退回。",type:"warning",style:{"margin-bottom":"20px"},"show-icon":""}),Object(r["createVNode"])(S,{label:"付款账户：",prop:"paymentAccount"},{default:c((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(k.stepFormModel.paymentAccount),1)]})),_:1}),Object(r["createVNode"])(S,{label:"收款账户：",prop:"receiptAccount"},{default:c((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(k.stepFormModel.receiptAccount),1)]})),_:1}),Object(r["createVNode"])(S,{label:"收款人姓名：",prop:"receiptName"},{default:c((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(k.stepFormModel.receiptName),1)]})),_:1}),Object(r["createVNode"])(S,{label:"转账金额：",prop:"transferAmount"},{default:c((function(){return[Object(r["createVNode"])("span",p,Object(r["toDisplayString"])(k.stepFormModel.transferAmount),1),s]})),_:1}),Object(r["createVNode"])(S,{label:"备注信息：",prop:"remark"},{default:c((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(k.stepFormModel.remark),1)]})),_:1}),Object(r["createVNode"])(q,null,{default:c((function(){return[i]})),_:1}),Object(r["createVNode"])(S,{label:"支付密码：",prop:"remark",class:"payment-password"},{default:c((function(){return[Object(r["createVNode"])(D,{modelValue:k.stepFormModel.paymentPassword,"onUpdate:modelValue":t[7]||(t[7]=function(e){return k.stepFormModel.paymentPassword=e}),"show-password":""},null,8,["modelValue"])]})),_:1}),Object(r["createVNode"])(S,null,{default:c((function(){return[Object(r["createVNode"])(B,{type:"primary",onClick:t[8]||(t[8]=function(e){return A.submitForm("stepForm")})},{default:c((function(){return[m]})),_:1}),Object(r["createVNode"])(B,{onClick:t[9]||(t[9]=function(){k.stepNum=0})},{default:c((function(){return[b]})),_:1})]})),_:1})])):Object(r["createCommentVNode"])("",!0),2==k.stepNum?(Object(r["openBlock"])(),Object(r["createBlock"])("div",f,[j,O,N,Object(r["createVNode"])(I,{shadow:"never",class:"form-card"},{default:c((function(){return[Object(r["createVNode"])(S,{label:"付款账户：",prop:"paymentAccount"},{default:c((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(k.stepFormModel.paymentAccount),1)]})),_:1}),Object(r["createVNode"])(S,{label:"收款账户：",prop:"receiptAccount"},{default:c((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(k.stepFormModel.receiptAccount),1)]})),_:1}),Object(r["createVNode"])(S,{label:"收款人姓名：",prop:"receiptName"},{default:c((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(k.stepFormModel.receiptName),1)]})),_:1}),Object(r["createVNode"])(S,{label:"转账金额：",prop:"transferAmount"},{default:c((function(){return[Object(r["createVNode"])("span",V,Object(r["toDisplayString"])(k.stepFormModel.transferAmount),1),y]})),_:1}),Object(r["createVNode"])(S,{label:"备注信息：",prop:"remark"},{default:c((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(k.stepFormModel.remark),1)]})),_:1})]})),_:1}),Object(r["createVNode"])("div",g,[Object(r["createVNode"])(B,{type:"primary",onClick:t[10]||(t[10]=function(){k.stepNum=0,e.$refs.stepForm.resetFields()})},{default:c((function(){return[v]})),_:1}),Object(r["createVNode"])(B,{onClick:t[11]||(t[11]=function(){})},{default:c((function(){return[F]})),_:1})])])):Object(r["createCommentVNode"])("",!0)]})),_:1},8,["model","rules"])]})),_:1}),Object(r["createVNode"])(h,{span:6})]})),_:1})])})),k=o("686f"),A={data:function(){return{stepNum:0,stepFormModel:{paymentAccount:"i@sobird.me",receiptAccount:"test@example.com",receiptName:"Test",transferAmount:200,paymentPassword:"",remark:""},stepFormRules:{paymentAccount:[{required:!0,message:"请输入付款账户",trigger:"blur"},{min:3,max:25,message:"长度在 3 到 25 个字符",trigger:"blur"}],receiptAccount:[{required:!0,message:"请输入收款账户",trigger:"blur"},{min:3,max:25,message:"长度在 3 到 25 个字符",trigger:"blur"}],receiptName:[{required:!0,message:"请输入收款姓名",trigger:"blur"},{min:3,max:25,message:"长度在 3 到 25 个字符",trigger:"blur"}],transferAmount:[{required:!0,message:"请输入转账金额",trigger:"blur"},{type:"number",message:"请输入合法金额数字"}]}}},methods:{submitForm:function(e){var t=this;this.stepNum=2,this.$refs[e].validate((function(e){if(!e)return!1;Object(k["h"])(t.stepFormModel).then((function(e){t.stepNum=2}))}))}}};o("d91e");A.render=_,A.__scopeId="data-v-b50454ec";t["default"]=A},cfd4:function(e,t,o){},d91e:function(e,t,o){"use strict";o("cfd4")}}]);