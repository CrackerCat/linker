"use strict";(self["webpackChunklinker_web"]=self["webpackChunklinker_web"]||[]).push([[848],{7716:function(e,t,n){n.d(t,{H1:function(){return s},Oy:function(){return u},V1:function(){return c},dS:function(){return d},nH:function(){return r},o2:function(){return a},we:function(){return l},xD:function(){return o}});var i=n(4);const s=(e="0")=>(0,i.zG)("forwardclient/connections",e),a=e=>(0,i.zG)("forwardclient/removeconnection",e),c=(e="0")=>(0,i.zG)("forwardclient/getcount",e),u=(e="0")=>(0,i.zG)("forwardclient/get",e),o=()=>(0,i.zG)("forwardclient/bindips"),l=e=>(0,i.zG)("forwardclient/remove",e),r=e=>(0,i.zG)("forwardclient/add",e),d=()=>(0,i.zG)("forwardclient/refresh")},2173:function(e,t,n){n.d(t,{$y:function(){return c},L1:function(){return a},QP:function(){return r},R2:function(){return o},_Q:function(){return l},im:function(){return s},qH:function(){return u}});var i=n(4);const s=(e="0")=>(0,i.zG)("socks5client/connections",e),a=e=>(0,i.zG)("socks5client/removeconnection",e),c=(e="0")=>(0,i.zG)("socks5client/get",e),u=e=>(0,i.zG)("socks5client/run",e),o=e=>(0,i.zG)("socks5client/stop",e),l=e=>(0,i.zG)("socks5client/update",e),r=()=>(0,i.zG)("socks5client/refresh")},5241:function(e,t,n){n.d(t,{AE:function(){return v},Jd:function(){return d},Nj:function(){return f},PR:function(){return o},Yh:function(){return r},_:function(){return h},ac:function(){return l},en:function(){return u},kl:function(){return s},vB:function(){return a},w0:function(){return m},zi:function(){return c}});var i=n(4);const s=(e="0")=>(0,i.zG)("tuntapclient/connections",e),a=e=>(0,i.zG)("tuntapclient/removeconnection",e),c=(e="0")=>(0,i.zG)("tuntapclient/get",e),u=e=>(0,i.zG)("tuntapclient/run",e),o=e=>(0,i.zG)("tuntapclient/stop",e),l=e=>(0,i.zG)("tuntapclient/update",e),r=()=>(0,i.zG)("tuntapclient/refresh"),d=()=>(0,i.zG)("tuntapclient/SubscribePing"),h=e=>(0,i.zG)("tuntapclient/SubscribeForwardTest",e),m=e=>(0,i.zG)("tuntapclient/CalcNetwork",e),f=()=>(0,i.zG)("tuntapclient/GetNetwork"),v=e=>(0,i.zG)("tuntapclient/AddNetwork",e)},9983:function(e,t,n){n.d(t,{FG:function(){return v},L2:function(){return h},ZY:function(){return m},bB:function(){return p},mx:function(){return f}});var i=n(7716),s=n(5241),a=n(2173),c=n(144),u=n(6768);const o=Symbol(),l=Symbol(),r=Symbol(),d=Symbol(),h=()=>{const e=(0,c.KR)({showEdit:!1,speedCache:{},current:"",currentName:"",hashcode:0,hashcode1:0,_updateRealTime:!1,updateRealTime:t=>{e.value.hashcode=0,e.value.hashcode1=0,e.value._updateRealTime=t}});(0,u.Gt)(o,e);const t=(0,c.KR)({timer:0,list:{}});(0,u.Gt)(l,t);const n=()=>{(0,i.H1)(e.value.hashcode.toString()).then((s=>{0==e.value._updateRealTime&&(e.value.hashcode=s.HashCode),s.List&&(p(s.List,i.o2),t.value.list=s.List),t.value.timer=setTimeout(n,1e3)})).catch((e=>{t.value.timer=setTimeout(n,1e3)}))},h=(0,c.KR)({timer:0,list:{}});(0,u.Gt)(r,h);const m=()=>{(0,s.kl)(e.value.hashcode1.toString()).then((t=>{0==e.value._updateRealTime&&(e.value.hashcode1=t.HashCode),t.List&&(p(t.List,s.vB),h.value.list=t.List),h.value.timer=setTimeout(m,1e3)})).catch((e=>{h.value.timer=setTimeout(m,1e3)}))},f=(0,c.KR)({timer:0,list:{}});(0,u.Gt)(d,f);const v=()=>{(0,a.im)(e.value.hashcode1.toString()).then((t=>{0==e.value._updateRealTime&&(e.value.hashcode1=t.HashCode),t.List&&(p(t.List,a.L1),f.value.list=t.List),f.value.timer=setTimeout(v,1e3)})).catch((e=>{f.value.timer=setTimeout(v,1e3)}))},p=(t,n)=>{const i=e.value.speedCache;for(let e in t){const s=t[e];s.removeFunc=n;const a=`${s.RemoteMachineId}-${s.TransactionId}`,c=i[a]||{SendBytes:0,ReceiveBytes:0};s.SendBytesText=g(s.SendBytes-c.SendBytes),s.ReceiveBytesText=g(s.ReceiveBytes-c.ReceiveBytes),c.SendBytes=s.SendBytes,c.ReceiveBytes=s.ReceiveBytes,i[a]=c}},g=e=>{let t=0;while(e>=1024)e/=1024,t++;return`${e.toFixed(2)}${["B/s","KB/s","MB/s","GB/s","TB/s"][t]}`},I=t=>{e.value.current=t.MachineId,e.value.currentName=t.MachineName,e.value.showEdit=!0},y=()=>{clearTimeout(t.value.timer),clearTimeout(h.value.timer),clearTimeout(f.value.timer)};return{connections:e,forwardConnections:t,_getForwardConnections:n,tuntapConnections:h,_getTuntapConnections:m,socks5Connections:f,_getSocks5Connections:v,handleTunnelConnections:I,clearConnectionsTimeout:y}},m=()=>(0,u.WQ)(o),f=()=>(0,u.WQ)(l),v=()=>(0,u.WQ)(r),p=()=>(0,u.WQ)(d)},7985:function(e,t,n){n.d(t,{r:function(){return o}});n(4114);var i=n(9299),s=n(3830),a=n(6768),c=n(144);const u=[],o=()=>{const e=(0,s.B)(),t=(0,a.EW)((()=>e.value.config.Client.Id)),n=(0,c.Kh)({timer:0,page:{Request:{Page:1,Size:+(localStorage.getItem("ps")||"10"),Name:"",Ids:[],Prop:"",Asc:!0},Count:0,List:[]},showDeviceEdit:!1,showAccessEdit:!1,deviceInfo:null}),o=()=>{(0,i.nD)(n.page.Request).then((i=>{n.page.Request=i.Request,n.page.Count=i.Count;for(let n in i.List)Object.assign(i.List[n],{showDel:t.value!=i.List[n].MachineId&&0==i.List[n].Connected,showAccess:t.value!=i.List[n].MachineId&&i.List[n].Connected,showReboot:i.List[n].Connected,isSelf:t.value==i.List[n].MachineId,showip:!1}),i.List[n].isSelf&&(e.value.self=i.List[n]);n.page.List=i.List;for(let e=0;e<n.page.List.length;e++)u.push(n.page.List[e])})).catch((e=>{}))},l=()=>{(0,i.nD)(n.page.Request).then((i=>{for(let s in i.List){const a=n.page.List.filter((e=>e.MachineId==i.List[s].MachineId))[0];a&&(Object.assign(a,{Connected:i.List[s].Connected,Version:i.List[s].Version,LastSignIn:i.List[s].LastSignIn,Args:i.List[s].Args,showDel:t.value!=i.List[s].MachineId&&0==i.List[s].Connected,showAccess:t.value!=i.List[s].MachineId&&i.List[s].Connected,showReboot:i.List[s].Connected,isSelf:t.value==i.List[s].MachineId}),a.isSelf&&(e.value.self=a))}n.timer=setTimeout(l,5e3)})).catch((e=>{n.timer=setTimeout(l,5e3)}))},r=()=>{try{if(0==u.length)return void setTimeout(r,1e3);const e=u.shift();fetch(`http://ip-api.com/json/${e.IP.split(":")[0]}`).then((async t=>{try{const n=await t.json();e.countryFlag=`https://unpkg.com/flag-icons@7.2.3/flags/4x3/${n.countryCode.toLowerCase()}.svg`}catch(n){}setTimeout(r,1e3)})).catch((()=>{setTimeout(r,1e3)}))}catch(e){setTimeout(r,1e3)}};r();const d=e=>{n.deviceInfo=e,n.showDeviceEdit=!0},h=e=>{n.deviceInfo=e,n.showAccessEdit=!0},m=e=>{e&&(n.page.Request.Page=e),o()},f=e=>{e&&(n.page.Request.Size=e,localStorage.setItem("ps",e)),o()},v=e=>{(0,i.Se)(e).then((()=>{o()}))},p=()=>{clearTimeout(n.timer),n.timer=0},g=e=>(0,i.VN)(e);return{devices:n,machineId:t,_getSignList:o,_getSignList1:l,handleDeviceEdit:d,handleAccessEdit:h,handlePageChange:m,handlePageSizeChange:f,handleDel:v,clearDevicesTimeout:p,setSort:g}}},8104:function(e,t,n){n.d(t,{O:function(){return u},W:function(){return o}});var i=n(144),s=n(6768),a=n(5241);const c=Symbol(),u=()=>{const e=(0,i.KR)({show:!0,timer:0,showEdit:!1,current:null,list:{},hashcode:0,showLease:!1});(0,s.Gt)(c,e);const t={linux:["debian","ubuntu","alpine","rocky","centos"],ubuntu:["ubuntu"],windows:["windows"],android:["android"],ios:["ios"]},n=()=>{clearTimeout(e.value.timer),(0,a.zi)(e.value.hashcode.toString()).then((i=>{if(e.value.hashcode=i.HashCode,i.List){for(let e in i.List){let n="system";const s=i.List[e].SystemInfo.toLowerCase();for(let e in t)if(s.indexOf(e)>=0){const i=t[e];if(1==i.length)n=i[0];else for(let e=0;e<i.length;e++)if(s.indexOf(i[e])>=0){n=i[e];break}break}Object.assign(i.List[e],{running:2==i.List[e].Status,loading:1==i.List[e].Status,system:n,systemDocker:s.indexOf("docker")>=0})}e.value.list=i.List}e.value.timer=setTimeout(n,1100),(0,a.Jd)()})).catch((t=>{e.value.timer=setTimeout(n,1100)}))},u=t=>{e.value.current=t,e.value.showEdit=!0},o=()=>{(0,a.Yh)()},l=()=>{clearTimeout(e.value.timer),e.value.timer=0},r=t=>Object.values(e.value.list).filter((e=>e.IP.indexOf(t)>=0||e.Lans.filter((e=>e.IP.indexOf(t)>=0)).length>0)).map((e=>e.MachineId)),d=t=>{const n=Object.values(e.value.list).filter((e=>e.IP)).sort(((e,t)=>{const n=e.IP.split(".").map((e=>Number(e))),i=t.IP.split(".").map((e=>Number(e)));for(let s=0;s<n.length;s++)if(n[s]!=i[s])return n[s]-i[s];return 0}));return n.map((e=>e.MachineId))};return{tuntap:e,_getTuntapInfo:n,handleTuntapEdit:u,handleTuntapRefresh:o,clearTuntapTimeout:l,getTuntapMachines:r,sortTuntapIP:d}},o=()=>(0,s.WQ)(c)},4867:function(e,t,n){n.d(t,{A:function(){return m}});var i=n(6768);const s={key:0,class:"point p2p",title:"打洞直连"},a={key:1,class:"point relay",title:"中继连接"},c={key:2,class:"point node",title:"节点连接"},u={key:1,class:"point",title:"未连接"};function o(e,t,n,o,l,r){return o.state.connection&&o.state.connection.Connected?((0,i.uX)(),(0,i.CE)(i.FK,{key:0},[0==o.state.connection.Type?((0,i.uX)(),(0,i.CE)("span",s)):1==o.state.connection.Type?((0,i.uX)(),(0,i.CE)("span",a)):2==o.state.connection.Type?((0,i.uX)(),(0,i.CE)("span",c)):(0,i.Q3)("",!0)],64)):((0,i.uX)(),(0,i.CE)("span",u))}var l=n(144),r={props:["data"],setup(e){const t=(0,l.Kh)({connection:e.data});return(0,i.wB)((()=>e.data),(()=>{t.connection=e.data})),{state:t}}},d=n(1241);const h=(0,d.A)(r,[["render",o],["__scopeId","data-v-39aee530"]]);var m=h},3347:function(e,t,n){n.d(t,{A:function(){return g}});var i=n(6768),s=n(4232);const a=["title"],c=["src"],u=["src"],o={key:1,class:"system",src:"/docker.svg"},l={key:1,class:"self gateway"};function r(e,t,n,r,d,h){const m=(0,i.g2)("StarFilled"),f=(0,i.g2)("el-icon");return(0,i.uX)(),(0,i.CE)("div",null,[r.tuntap.list[r.item.MachineId]&&r.tuntap.list[r.item.MachineId].system?((0,i.uX)(),(0,i.CE)("span",{key:0,title:r.tuntap.list[r.item.MachineId].SystemInfo},[r.item.countryFlag?((0,i.uX)(),(0,i.CE)("img",{key:0,class:"system",src:r.item.countryFlag},null,8,c)):(0,i.Q3)("",!0),(0,i.Lk)("img",{class:"system",src:`/${r.tuntap.list[r.item.MachineId].system}.svg`},null,8,u),r.tuntap.list[r.item.MachineId].systemDocker?((0,i.uX)(),(0,i.CE)("img",o)):(0,i.Q3)("",!0)],8,a)):(0,i.Q3)("",!0),(0,i.Lk)("a",{href:"javascript:;",onClick:t[0]||(t[0]=(...e)=>r.handleEdit&&r.handleEdit(...e)),title:"此客户端的设备名",class:"a-line"},[(0,i.Lk)("strong",{class:(0,s.C4)(["gateway",{green:r.item.Connected}])},(0,s.v_)(r.item.MachineName||"null"),3)]),r.item.isSelf?((0,i.uX)(),(0,i.CE)("strong",l,[(0,i.eW)("("),(0,i.bF)(f,{size:"16"},{default:(0,i.k6)((()=>[(0,i.bF)(m)])),_:1}),(0,i.eW)(") ")])):(0,i.Q3)("",!0)])}var d=n(3830),h=n(8104),m=n(7477),f={props:["item","config"],emits:["edit","refresh"],components:{StarFilled:m.BQ2},setup(e,{emit:t}){const n=(0,h.W)(),s=(0,d.B)(),a=(0,i.EW)((()=>s.value.hasAccess("RenameSelf"))),c=(0,i.EW)((()=>s.value.hasAccess("RenameOther"))),u=(0,i.EW)((()=>s.value.config.Client.Id)),o=()=>{if(e.config){if(u.value===e.item.MachineId){if(!a.value)return}else if(!c.value)return;t("edit",e.item)}};return{item:(0,i.EW)((()=>e.item)),tuntap:n,handleEdit:o}}},v=n(1241);const p=(0,v.A)(f,[["render",r],["__scopeId","data-v-ffd0d512"]]);var g=p},2950:function(e,t,n){n.d(t,{A:function(){return M}});var i=n(6768),s=n(4232);const a={class:"flex"},c={class:"flex-1"},u=["title"],o=["title"],l={key:0,class:"green gateway"},r={key:1},d={key:0},h={key:0,class:"flex yellow",title:"已禁用"},m={key:1,class:"flex yellow",title:"与其它设备填写IP、或本机局域网IP有冲突"},f={key:0,class:"delay green"},v={class:"delay yellow"};function p(e,t,n,p,g,I){const y=(0,i.g2)("ConnectionShow"),C=(0,i.g2)("Loading"),L=(0,i.g2)("el-icon"),k=(0,i.g2)("el-switch");return(0,i.uX)(),(0,i.CE)("div",null,[(0,i.Lk)("div",a,[(0,i.Lk)("div",c,[(0,i.bF)(y,{data:p.connections.list[p.item.MachineId]},null,8,["data"]),(0,i.Lk)("a",{href:"javascript:;",class:"a-line",onClick:t[0]||(t[0]=e=>p.handleTuntapIP(p.tuntap.list[p.item.MachineId])),title:"此设备的虚拟网卡IP"},[p.tuntap.list[p.item.MachineId].SetupError?((0,i.uX)(),(0,i.CE)("strong",{key:0,class:"red",title:p.tuntap.list[p.item.MachineId].SetupError},(0,s.v_)(p.tuntap.list[p.item.MachineId].IP),9,u)):p.tuntap.list[p.item.MachineId].Upgrade&&p.tuntap.list[p.item.MachineId].NatError?((0,i.uX)(),(0,i.CE)("strong",{key:1,class:"yellow",title:p.tuntap.list[p.item.MachineId].NatError},(0,s.v_)(p.tuntap.list[p.item.MachineId].IP),9,o)):((0,i.uX)(),(0,i.CE)(i.FK,{key:2},[p.tuntap.list[p.item.MachineId].running?((0,i.uX)(),(0,i.CE)("strong",l,(0,s.v_)(p.tuntap.list[p.item.MachineId].IP),1)):((0,i.uX)(),(0,i.CE)("strong",r,(0,s.v_)(p.tuntap.list[p.item.MachineId].IP),1))],64))])]),p.tuntap.list[p.item.MachineId].loading?((0,i.uX)(),(0,i.CE)("div",d,[(0,i.bF)(L,{size:"14",class:"loading"},{default:(0,i.k6)((()=>[(0,i.bF)(C)])),_:1})])):((0,i.uX)(),(0,i.Wv)(k,{key:1,modelValue:p.tuntap.list[p.item.MachineId].running,"onUpdate:modelValue":t[1]||(t[1]=e=>p.tuntap.list[p.item.MachineId].running=e),loading:p.tuntap.list[p.item.MachineId].loading,disabled:"",onClick:t[2]||(t[2]=e=>p.handleTuntap(p.tuntap.list[p.item.MachineId])),size:"small","inline-prompt":"","active-text":"😀","inactive-text":"😣"},null,8,["modelValue","loading"]))]),(0,i.Lk)("div",null,[(0,i.Lk)("div",null,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(p.tuntap.list[p.item.MachineId].Lans,((e,t)=>((0,i.uX)(),(0,i.CE)(i.FK,{key:t},[e.Disabled?((0,i.uX)(),(0,i.CE)("div",h,(0,s.v_)(e.IP)+" / "+(0,s.v_)(e.PrefixLength),1)):e.Exists?((0,i.uX)(),(0,i.CE)("div",m,(0,s.v_)(e.IP)+" / "+(0,s.v_)(e.PrefixLength),1)):((0,i.uX)(),(0,i.CE)("div",{key:2,class:(0,s.C4)(["flex",{green:p.tuntap.list[p.item.MachineId].running}]),title:"正常使用"},(0,s.v_)(e.IP)+" / "+(0,s.v_)(e.PrefixLength),3))],64)))),128))]),p.showDelay?((0,i.uX)(),(0,i.CE)(i.FK,{key:0},[p.tuntap.list[p.item.MachineId].Delay>=0&&p.tuntap.list[p.item.MachineId].Delay<=100?((0,i.uX)(),(0,i.CE)("div",f,(0,s.v_)(p.tuntap.list[p.item.MachineId].Delay)+"ms",1)):(0,i.Q3)("",!0),(0,i.Lk)("template",null,[(0,i.Lk)("div",v,(0,s.v_)(p.tuntap.list[p.item.MachineId].Delay)+"ms",1)])],64)):(0,i.Q3)("",!0)])])}var g=n(5241),I=n(1219),y=n(8104),C=n(7477),L=n(3830),k=n(9983),w=n(4867),E={props:["item","config"],emits:["edit","refresh"],components:{Loading:C.Rhj,ConnectionShow:w.A},setup(e,{emit:t}){const n=(0,y.W)(),s=(0,L.B)(),a=(0,i.EW)((()=>s.value.config.Client.Id)),c=(0,i.EW)((()=>s.value.hasAccess("TuntapChangeSelf"))),u=(0,i.EW)((()=>s.value.hasAccess("TuntapChangeOther"))),o=(0,i.EW)((()=>s.value.hasAccess("TuntapStatusSelf"))),l=(0,i.EW)((()=>s.value.hasAccess("TuntapStatusOther"))),r=(0,k.FG)(),d=(0,i.EW)((()=>2==(2&(s.value.config.Running.Tuntap||{Switch:0}).Switch))),h=t=>{if(!e.config)return;if(a.value===t.MachineId){if(!o.value)return}else if(!l.value)return;const n=t.running?(0,g.PR)(t.MachineId):(0,g.en)(t.MachineId);t.loading=!0,n.then((()=>{I.nk.success("操作成功！")})).catch((e=>{console.log(e),I.nk.error("操作失败！")}))},m=n=>{if(e.config||a.value==n.MachineId){if(a.value===n.MachineId){if(!c.value)return}else if(!u.value)return;n.device=e.item,t("edit",n)}},f=()=>{t("refresh")};return{item:(0,i.EW)((()=>e.item)),tuntap:n,showDelay:d,connections:r,handleTuntap:h,handleTuntapIP:m,handleTuntapRefresh:f}}},T=n(1241);const S=(0,T.A)(E,[["render",p],["__scopeId","data-v-f8059b00"]]);var M=S}}]);