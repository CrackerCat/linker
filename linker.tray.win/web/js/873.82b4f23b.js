"use strict";(self["webpackChunklinker_web"]=self["webpackChunklinker_web"]||[]).push([[873],{4277:function(e,a,n){n.r(a),n.d(a,{default:function(){return M}});var t=n(6768);const l={class:"net-wrap app-wrap"},s={class:"inner absolute flex flex-column flex-nowrap"},i={class:"head"},r={class:"body flex-1 relative"},u={class:"status"};function c(e,a,n,c,d,o){const g=(0,t.g2)("Head"),p=(0,t.g2)("List"),v=(0,t.g2)("Status");return(0,t.uX)(),(0,t.CE)("div",l,[(0,t.Lk)("div",s,[(0,t.Lk)("div",i,[(0,t.bF)(g)]),(0,t.Lk)("div",r,[(0,t.bF)(p)]),(0,t.Lk)("div",u,[(0,t.bF)(v,{config:!1})])])])}n(4114);const d=e=>((0,t.Qi)("data-v-6bee0a84"),e=e(),(0,t.jt)(),e),o={class:"head-wrap"},g={class:"tools flex"},p=d((()=>(0,t.Lk)("span",{class:"label"},"服务器 ",-1))),v=d((()=>(0,t.Lk)("span",{class:"flex-1"},null,-1))),h={style:{"margin-left":"1rem"}};function f(e,a,n,l,s,i){const r=(0,t.g2)("el-option"),u=(0,t.g2)("el-select"),c=(0,t.g2)("Refresh"),d=(0,t.g2)("el-icon"),f=(0,t.g2)("el-button"),k=(0,t.g2)("Background");return(0,t.uX)(),(0,t.CE)("div",o,[(0,t.Lk)("div",g,[p,(0,t.bF)(u,{modelValue:l.state.server,"onUpdate:modelValue":a[0]||(a[0]=e=>l.state.server=e),placeholder:"服务器",style:{width:"16rem"},size:"small"},{default:(0,t.k6)((()=>[((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(l.state.servers,(e=>((0,t.uX)(),(0,t.Wv)(r,{key:e.Host,label:e.Name,value:e.Host},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),v,(0,t.bF)(f,{size:"small",onClick:l.handleRefresh},{default:(0,t.k6)((()=>[(0,t.eW)(" 刷新(F5)"),(0,t.bF)(d,null,{default:(0,t.k6)((()=>[(0,t.bF)(c)])),_:1})])),_:1},8,["onClick"]),(0,t.Lk)("div",h,[(0,t.bF)(k,{name:"net"})])])])}var k=n(3830),m=n(144),b=n(7477),C=n(5096),L={components:{Edit:b.ffu,Refresh:b.C42,Background:C.A},setup(){const e=(0,k.B)(),a=(0,m.Kh)({server:"linker.snltty.com:1802",servers:[]});(0,t.wB)((()=>e.value.config.Running.Client.Servers),(()=>{a.servers=(e.value.config.Running.Client.Servers||[]).slice(0,1),a.server=e.value.config.Client.Server}));const n=()=>{window.location.reload()};return{state:a,handleRefresh:n}}},w=n(1241);const S=(0,w.A)(L,[["render",f],["__scopeId","data-v-6bee0a84"]]);var F=S;const _=e=>((0,t.Qi)("data-v-5052ddc7"),e=e(),(0,t.jt)(),e),x={class:"net-list-wrap flex flex-column absolute"},z={class:"flex-1 scrollbar"},E={class:"flex"},I=_((()=>(0,t.Lk)("div",{class:"flex-1"},null,-1))),T={class:"tuntap"},A={class:"page t-c"},B={class:"page-wrap t-c"};function P(e,a,n,l,s,i){const r=(0,t.g2)("DeviceName"),u=(0,t.g2)("UpdaterBtn"),c=(0,t.g2)("TuntapShow"),d=(0,t.g2)("el-pagination");return(0,t.uX)(),(0,t.CE)("div",x,[(0,t.Lk)("div",z,[(0,t.Lk)("ul",null,[((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(l.devices.page.List,((e,a)=>((0,t.uX)(),(0,t.CE)("li",{key:a},[(0,t.Lk)("dl",null,[(0,t.Lk)("dt",E,[(0,t.Lk)("div",null,[(0,t.bF)(r,{item:e},null,8,["item"])]),I,(0,t.Lk)("div",null,[(0,t.bF)(u,{config:!1,item:e},null,8,["item"])])]),(0,t.Lk)("dd",T,[l.tuntap.list[e.MachineId]?((0,t.uX)(),(0,t.Wv)(c,{key:0,item:e},null,8,["item"])):(0,t.Q3)("",!0)])])])))),128))])]),(0,t.Lk)("div",A,[(0,t.Lk)("div",B,[(0,t.bF)(d,{size:"small",background:"",layout:"prev,pager, next","pager-count":5,total:l.devices.page.Count,"page-size":l.devices.page.Request.Size,"current-page":l.devices.page.Request.Page,onCurrentChange:l.handlePageChange,onSizeChange:l.handlePageSizeChange,"page-sizes":[10,20,50,100,255]},null,8,["total","page-size","current-page","onCurrentChange","onSizeChange"])])])])}var R=n(8104),y=n(7985),X=n(9383),D=n(2126),N=n(886),U=n(3630),V={components:{StarFilled:b.BQ2,UpdaterBtn:D.A,DeviceName:N.A,TuntapShow:U.A},setup(e){(0,k.B)();const a=(0,m.Kh)({}),{devices:n,machineId:l,_getSignList:s,_getSignList1:i,handleDeviceEdit:r,handlePageChange:u,handlePageSizeChange:c,handleDel:d,clearDevicesTimeout:o}=(0,y.r)(),{tuntap:g,_getTuntapInfo:p,handleTuntapRefresh:v,clearTuntapTimeout:h,handleTuntapEdit:f,sortTuntapIP:b}=(0,R.O)(),{_getUpdater:C,clearUpdaterTimeout:L}=(0,X.d)();return(0,t.sV)((()=>{u(),v(),s(),i(),p(),C()})),(0,t.hi)((()=>{o(),h(),L()})),{state:a,devices:n,machineId:l,handlePageChange:u,handlePageSizeChange:c,tuntap:g}}};const H=(0,w.A)(V,[["render",P],["__scopeId","data-v-5052ddc7"]]);var K=H,Q=n(3236),W=n(1387),j={components:{Head:F,List:K,Status:Q.A},setup(){document.addEventListener("contextmenu",(function(e){e.preventDefault()}));const e=(0,k.B)(),a=(0,W.rd)();return(0,t.sV)((()=>{0==e.value.hasAccess("NetManager")&&a.push({name:"NoPermission"})})),{}}};const q=(0,w.A)(j,[["render",c],["__scopeId","data-v-6a3f3b43"]]);var M=q}}]);