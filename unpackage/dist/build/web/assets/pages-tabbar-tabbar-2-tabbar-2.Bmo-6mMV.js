import{n as t,C as e,b as a,r as s,c as i,w as l,i as c,o as d,d as n,e as r,u as o,v as u,F as f,q as v,f as p,A as m,t as g,l as _}from"./index-Cr98tpWe.js";import{_ as h}from"./_plugin-vue_export-helper.BCo6x5W8.js";const y=h({data:()=>({activities:[]}),mounted(){this.fetchActivities()},methods:{formatDate(t){const e=new Date(t);return`${e.getFullYear()}年${e.getMonth()+1}月${e.getDate()}日 ${e.getHours()}:${e.getMinutes()}`},formatStatus:t=>({null:"未报名",pending:"审核中",approved:"已通过",rejected:"未通过"}[t]||"未知状态"),navigateToDetail(e){t({url:`/pages/eventDetail/eventDetail?eventId=${e}`})},fetchActivities(){const t=e("userId");t?s({url:"http://154.8.140.108:8883/api/registration/listUsersRegistrations",method:"GET",data:{userId:t},success:t=>{1===t.data.code?this.activities=t.data.data:a({title:"获取活动数据失败",icon:"none"})},fail:()=>{a({title:"网络请求失败",icon:"none"})}}):a({title:"用户未登录",icon:"none"})}}},[["render",function(t,e,a,s,h,y){const D=p,I=c,$=m;return d(),i(I,{class:"user-activities-page"},{default:l((()=>[n(I,{class:"header"},{default:l((()=>[n(D,{class:"header-title"},{default:l((()=>[r("我的报名")])),_:1}),n(D,{class:"header-subtitle"},{default:l((()=>[r("实时跟踪报名状态，掌握活动动态")])),_:1})])),_:1}),n(I,{class:"activities-list"},{default:l((()=>[(d(!0),o(f,null,u(h.activities,(t=>(d(),i(I,{class:"activity-card",key:t.eventId,onClick:e=>y.navigateToDetail(t.eventId)},{default:l((()=>[n($,{class:"activity-image",src:t.picUrl,mode:"aspectFill"},null,8,["src"]),n(I,{class:"activity-details"},{default:l((()=>[n(D,{class:"activity-title"},{default:l((()=>[r(g(t.title),1)])),_:2},1024),n(D,{class:"activity-location"},{default:l((()=>[r("📍 "+g(t.location),1)])),_:2},1024),n(D,{class:"activity-date"},{default:l((()=>[r("🗓 "+g(y.formatDate(t.eventTime)),1)])),_:2},1024),n(D,{class:"activity-registered"},{default:l((()=>[r("报名时间："+g(y.formatDate(t.registeredAt)),1)])),_:2},1024)])),_:2},1024),n(I,{class:_(["status-tag",t.status])},{default:l((()=>[r(g(y.formatStatus(t.status)),1)])),_:2},1032,["class"])])),_:2},1032,["onClick"])))),128))])),_:1}),h.activities.length?v("",!0):(d(),i(I,{key:0,class:"empty-state"},{default:l((()=>[n($,{src:"/static/empty.png",class:"empty-image",mode:"aspectFill"}),n(D,{class:"empty-text"},{default:l((()=>[r("您还没有报名任何活动哦")])),_:1})])),_:1}))])),_:1})}],["__scopeId","data-v-1e2ab534"]]);export{y as default};
