import{r as a,s,a as l,b as o,c as e,w as t,i as d,o as u,d as r,e as i,t as n,f as c,I as p,g as f,h as g}from"./index-Cr98tpWe.js";import{_ as w}from"./_plugin-vue_export-helper.BCo6x5W8.js";const _=w({data:()=>({email:"",password:""}),methods:{login(){console.log(this.email,this.password),a({url:"http://154.8.140.108:8883/api/users/login",method:"POST",data:{email:this.email,password:this.password,showPassword:!1},success:a=>{1===a.data.code?(console.log("登陆成功"),s("userInfo",a.data.data),s("token",a.data.data.userId),s("userId",a.data.data.userId),l({url:"/pages/tabbar/tabbar-1/tabbar-1"})):o({title:a.data.message||"登录失败",icon:"none"})},fail:()=>{o({title:"网络错误，请稍后重试",icon:"none"})}})},togglePassword(){this.showPassword=!this.showPassword}}},[["render",function(a,s,l,o,w,_){const m=c,h=d,b=p,P=f,k=g;return u(),e(h,{class:"container"},{default:t((()=>[r(h,{class:"logo"},{default:t((()=>[r(m,{class:"logo-text"},{default:t((()=>[i("活动报名助手")])),_:1})])),_:1}),r(m,{class:"login-title"},{default:t((()=>[i("登录")])),_:1}),r(h,{class:"form"},{default:t((()=>[r(b,{class:"input",placeholder:"Email",modelValue:w.email,"onUpdate:modelValue":s[0]||(s[0]=a=>w.email=a)},null,8,["modelValue"]),r(h,{class:"password-wrapper"},{default:t((()=>[r(b,{class:"input",placeholder:"Password",modelValue:w.password,"onUpdate:modelValue":s[1]||(s[1]=a=>w.password=a),password:""},null,8,["modelValue"]),r(h,{class:"toggle-password",onClick:_.togglePassword},{default:t((()=>[r(m,null,{default:t((()=>[i(n(a.showPassword?"🙈":"👁️"),1)])),_:1})])),_:1},8,["onClick"])])),_:1})])),_:1}),r(P,{class:"login-button",onClick:_.login},{default:t((()=>[i("登录")])),_:1},8,["onClick"]),r(m,{class:"forgot-password"},{default:t((()=>[i("忘记密码")])),_:1}),r(h,{class:"social-login"},{default:t((()=>[r(P,{class:"social-button facebook"},{default:t((()=>[i("WX")])),_:1}),r(P,{class:"social-button google"},{default:t((()=>[i("QQ")])),_:1}),r(P,{class:"social-button twitter"},{default:t((()=>[i("WB")])),_:1})])),_:1}),r(h,{class:"signup"},{default:t((()=>[r(m,null,{default:t((()=>[i("还没注册？"),r(k,{url:"/pages/register/register"},{default:t((()=>[r(m,{class:"signup-link"},{default:t((()=>[i("注册")])),_:1})])),_:1})])),_:1})])),_:1}),r(P,{class:"guest-button"},{default:t((()=>[i("游客登陆")])),_:1})])),_:1})}],["__scopeId","data-v-8501cac9"]]);export{_ as default};