import{r as e,b as a,n as l,c as o,w as s,i as r,o as t,d,e as n,f as u,I as m,g as i}from"./index-Cr98tpWe.js";import{_ as c}from"./_plugin-vue_export-helper.BCo6x5W8.js";const p=c({data:()=>({form:{username:"",password:"",email:"",phone:"",role:"user"}}),methods:{register(){e({url:"http://154.8.140.108:8883/api/users/register",method:"POST",data:this.form,success:e=>{1===e.data.code?(a({title:"注册成功",icon:"success"}),l({url:"/pages/login/login"})):a({title:e.data.msg||"注册失败",icon:"none"})},fail:()=>{a({title:"网络错误，请稍后重试",icon:"none"})}})}}},[["render",function(e,a,l,c,p,f){const h=u,V=m,g=r,_=i;return t(),o(g,{class:"container"},{default:s((()=>[d(h,{class:"title"},{default:s((()=>[n("注册")])),_:1}),d(g,{class:"form"},{default:s((()=>[d(V,{class:"input",modelValue:p.form.username,"onUpdate:modelValue":a[0]||(a[0]=e=>p.form.username=e),placeholder:"用户名"},null,8,["modelValue"]),d(V,{class:"input",modelValue:p.form.password,"onUpdate:modelValue":a[1]||(a[1]=e=>p.form.password=e),placeholder:"密码",password:""},null,8,["modelValue"]),d(V,{class:"input",modelValue:p.form.email,"onUpdate:modelValue":a[2]||(a[2]=e=>p.form.email=e),placeholder:"邮箱"},null,8,["modelValue"]),d(V,{class:"input",modelValue:p.form.phone,"onUpdate:modelValue":a[3]||(a[3]=e=>p.form.phone=e),placeholder:"手机号（可选）"},null,8,["modelValue"])])),_:1}),d(_,{class:"register-button",onClick:f.register},{default:s((()=>[n("注册")])),_:1},8,["onClick"])])),_:1})}],["__scopeId","data-v-7139e54c"]]);export{p as default};
