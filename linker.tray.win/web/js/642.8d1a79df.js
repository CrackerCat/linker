"use strict";(self["webpackChunklinker_web"]=self["webpackChunklinker_web"]||[]).push([[642],{5096:function(e,t,a){a.d(t,{A:function(){return p}});var l=a(6768);const o=e=>((0,l.Qi)("data-v-4892cd3c"),e=e(),(0,l.jt)(),e),n=o((()=>(0,l.Lk)("input",{type:"file",id:"file-input"},null,-1)));function s(e,t,a,o,s,r){const i=(0,l.g2)("PictureRounded"),d=(0,l.g2)("el-icon");return(0,l.uX)(),(0,l.CE)(l.FK,null,[(0,l.Lk)("a",{href:"javascript:;",onClick:t[0]||(t[0]=(...e)=>o.handleBg&&o.handleBg(...e))},[(0,l.bF)(d,null,{default:(0,l.k6)((()=>[(0,l.bF)(i)])),_:1})]),n],64)}var r=a(7477),i=a(2933),d={components:{PictureRounded:r.syp},props:["name"],setup(e){const t=`bg-${e.name}`,a=()=>{localStorage.getItem(t)?i.s.confirm("清除背景？","Warning",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{n()})).catch((()=>{})):document.getElementById("file-input").click()},o=e=>{const t=e.target.files[0];if(t)try{const e=new FileReader;e.onload=function(e){n(e.target.result)},e.readAsDataURL(t)}catch(a){}e.target.value=""},n=e=>{e?(document.body.className="sunny",localStorage.setItem(t,e),document.body.style=`background-image:url(${e})`):(document.body.className="",document.body.style="",localStorage.setItem(t,""))};return(0,l.sV)((()=>{document.getElementById("file-input").addEventListener("change",o),n(localStorage.getItem(t))})),{handleBg:a}}},c=a(1241);const u=(0,c.A)(d,[["render",s],["__scopeId","data-v-4892cd3c"]]);var p=u},3269:function(e,t,a){a.d(t,{A:function(){return Ye}});var l=a(6768),o=a(4232),n=a.p+"img/coin.6431311b.svg",s=a.p+"img/wechat.5c371c5d.jpg",r=a.p+"img/alipay.ff9b1e7c.jpg";const i=e=>((0,l.Qi)("data-v-2a629595"),e=e(),(0,l.jt)(),e),d={class:"status-wrap flex"},c={class:"copy"},u=i((()=>(0,l.Lk)("img",{src:n,alt:"memory"},null,-1))),p=i((()=>(0,l.Lk)("span",null,"赞助",-1))),g=[u,p],v={href:"https://github.com/snltty/linker",target:"_blank"},f=i((()=>(0,l.Lk)("div",{class:"flex-1"},null,-1))),m={class:"export"},h={class:"api"},y={class:"server"},k=i((()=>(0,l.Lk)("div",{class:"pay"},[(0,l.Lk)("img",{src:s,alt:""}),(0,l.Lk)("img",{src:r,alt:""})],-1)));function w(e,t,a,n,s,r){const i=(0,l.g2)("Export"),u=(0,l.g2)("Api"),p=(0,l.g2)("Server"),w=(0,l.g2)("el-dialog");return(0,l.uX)(),(0,l.CE)("div",d,[(0,l.Lk)("div",c,[(0,l.Lk)("a",{href:"javascript:;",class:"memory",title:"赞助一笔，让作者饱餐一顿",onClick:t[0]||(t[0]=e=>n.state.showPay=!0)},g),(0,l.Lk)("a",v,"©linker "+(0,o.v_)(n.self.Version),1)]),f,(0,l.Lk)("div",m,[(0,l.bF)(i,{config:n.config},null,8,["config"])]),(0,l.Lk)("div",h,[(0,l.bF)(u,{config:n.config},null,8,["config"])]),(0,l.Lk)("div",y,[(0,l.bF)(p,{config:n.config},null,8,["config"])]),(0,l.bF)(w,{modelValue:n.state.showPay,"onUpdate:modelValue":t[1]||(t[1]=e=>n.state.showPay=e),title:"赞助linker",width:"300",top:"1vh"},{default:(0,l.k6)((()=>[k])),_:1},8,["modelValue"])])}var b=a(144);const S={href:"javascript:;",title:"此设备的管理接口"};function B(e,t,a,n,s,r){const i=(0,l.g2)("Tools"),d=(0,l.g2)("el-icon"),c=(0,l.g2)("el-popconfirm");return n.config?((0,l.uX)(),(0,l.CE)("div",{key:0,class:(0,o.C4)(["status-api-wrap",{connected:n.connected}])},[(0,l.bF)(c,{"confirm-button-text":"清除","cancel-button-text":"更改",title:"确定你的操作？",onCancel:n.handleShow,onConfirm:n.handleResetConnect},{reference:(0,l.k6)((()=>[(0,l.Lk)("a",S,[(0,l.bF)(d,{size:"16"},{default:(0,l.k6)((()=>[(0,l.bF)(i)])),_:1}),(0,l.eW)(" 管理接口 ")])])),_:1},8,["onCancel","onConfirm"])],2)):(0,l.Q3)("",!0)}var F=a(3830),C=a(4),_=a(7477),V={components:{Tools:_.S0q},props:["config"],setup(e){const t=(0,F.B)(),a=(0,l.EW)((()=>t.value.api.connected)),o=()=>{localStorage.setItem("api-cache",""),window.location.reload()},n=()=>{(0,C.e3)(),(0,C.a1)(`ws${"https:"===window.location.protocol?"s":""}://${window.location.hostname}:12345`,"snltty")};return{config:e.config,connected:a,handleShow:n,handleResetConnect:o}}},x=a(1241);const T=(0,x.A)(V,[["render",B],["__scopeId","data-v-1d3d9c26"]]);var L=T;const R={class:"status-server-wrap"};function I(e,t,a,o,n,s){const r=(0,l.g2)("ServerConfig"),i=(0,l.g2)("ServerVersion"),d=(0,l.g2)("ServerFlow");return(0,l.uX)(),(0,l.CE)("div",R,[(0,l.bF)(r,{config:o.config},null,8,["config"]),(0,l.bF)(i,{config:o.config},null,8,["config"]),o.config&&o.hasFlow?((0,l.uX)(),(0,l.Wv)(d,{key:0,config:o.config},null,8,["config"])):(0,l.Q3)("",!0)])}const P=e=>((0,l.Qi)("data-v-3b6604f4"),e=e(),(0,l.jt)(),e),E=P((()=>(0,l.Lk)("span",null,"信标服务器",-1))),W={class:"dialog-footer t-c"};function D(e,t,a,n,s,r){const i=(0,l.g2)("Promotion"),d=(0,l.g2)("el-icon"),c=(0,l.g2)("el-input"),u=(0,l.g2)("el-form-item"),p=(0,l.g2)("el-option"),g=(0,l.g2)("el-select"),v=(0,l.g2)("el-form"),f=(0,l.g2)("el-button"),m=(0,l.g2)("el-dialog");return(0,l.uX)(),(0,l.CE)(l.FK,null,[(0,l.Lk)("a",{href:"javascript:;",class:(0,o.C4)({connected:n.state.connected}),title:"更改你的连接设置",onClick:t[0]||(t[0]=(...e)=>n.handleConfig&&n.handleConfig(...e))},[(0,l.bF)(d,{size:"16"},{default:(0,l.k6)((()=>[(0,l.bF)(i)])),_:1}),(0,l.eW)(),E],2),(0,l.bF)(m,{modelValue:n.state.show,"onUpdate:modelValue":t[4]||(t[4]=e=>n.state.show=e),title:"连接设置",width:"300","append-to-body":""},{footer:(0,l.k6)((()=>[(0,l.Lk)("div",W,[(0,l.bF)(f,{onClick:t[3]||(t[3]=e=>n.state.show=!1),loading:n.state.loading},{default:(0,l.k6)((()=>[(0,l.eW)("取消")])),_:1},8,["loading"]),(0,l.bF)(f,{type:"primary",onClick:n.handleSave,loading:n.state.loading},{default:(0,l.k6)((()=>[(0,l.eW)("确定保存")])),_:1},8,["onClick","loading"])])])),default:(0,l.k6)((()=>[(0,l.Lk)("div",null,[(0,l.bF)(v,{model:n.state.form,rules:n.state.rules,"label-width":"6rem"},{default:(0,l.k6)((()=>[(0,l.bF)(u,{label:"机器名",prop:"name"},{default:(0,l.k6)((()=>[(0,l.bF)(c,{modelValue:n.state.form.name,"onUpdate:modelValue":t[1]||(t[1]=e=>n.state.form.name=e),maxlength:"12","show-word-limit":""},null,8,["modelValue"])])),_:1}),(0,l.bF)(u,{label:"分组名",prop:"groupid"},{default:(0,l.k6)((()=>[(0,l.bF)(g,{modelValue:n.state.groupid,"onUpdate:modelValue":t[2]||(t[2]=e=>n.state.groupid=e),onChange:n.handleGroupChange},{default:(0,l.k6)((()=>[((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(n.state.form.groups,(e=>((0,l.uX)(),(0,l.Wv)(p,{key:e.Id,label:e.Name,value:e.Id},null,8,["label","value"])))),128))])),_:1},8,["modelValue","onChange"])])),_:1})])),_:1},8,["model","rules"])])])),_:1},8,["modelValue"])],64)}var z=a(9299),K=a(1219),$={components:{Promotion:_.Yk4,CirclePlus:_.HxT},props:["config"],setup(e){const t=(0,F.B)(),a=(0,l.EW)((()=>t.value.hasAccess("Config"))),o=(0,b.Kh)({show:!1,loading:!1,connected:(0,l.EW)((()=>t.value.signin.Connected)),groupid:t.value.config.Client.Group.Id,form:{name:t.value.config.Client.Name,groups:t.value.config.Client.Groups},rules:{}}),n=()=>{e.config&&a.value&&(o.form.name=t.value.config.Client.Name,o.form.groups=t.value.config.Client.Groups,o.groupid=t.value.config.Client.Group.Id,o.show=!0)},s=e=>{const t=o.form.groups.map(((e,t)=>(e.$index=t,e))).filter((t=>t.Id==e))[0].$index,a=o.form.groups[t];o.form.groups[t]=o.form.groups[0],o.form.groups[0]=a},r=()=>{o.loading=!0,(0,z.rd)(o.form).then((()=>{o.loading=!1,o.show=!1,K.nk.success("已操作"),setTimeout((()=>{window.location.reload()}),1e3)})).catch((e=>{console.log(e),o.loading=!1,K.nk.error("操作失败!")}))};return{config:e.config,state:o,handleConfig:n,handleSave:r,handleGroupChange:s}}};const A=(0,x.A)($,[["render",D],["__scopeId","data-v-3b6604f4"]]);var X=A;const O={key:0,class:"flow-wrap"},U={href:"javascript:;",title:"本服务器\r\n在线数/7天内上线数"},j={href:"javascript:;",title:"所有服务器\r\n在线数/7天内上线数/服务端数"};function G(e,t,a,n,s,r){const i=(0,l.g2)("el-table-column"),d=(0,l.g2)("el-button"),c=(0,l.g2)("el-table"),u=(0,l.g2)("el-dialog"),p=(0,l.g2)("ServerFlowMessenger"),g=(0,l.g2)("ServerFlowSForward"),v=(0,l.g2)("ServerFlowRelay");return(0,l.uX)(),(0,l.CE)(l.FK,null,[n.config?((0,l.uX)(),(0,l.CE)("div",O,[(0,l.Lk)("p",null,[(0,l.eW)("在线 "),(0,l.Lk)("a",U,(0,o.v_)(n.state.overallOnline),1),(0,l.Lk)("a",j,(0,o.v_)(n.state.serverOnline),1)]),(0,l.Lk)("p",null,[(0,l.eW)("上传 "),(0,l.Lk)("a",{href:"javascript:;",title:"本服务器\r\n发送速率",onClick:t[0]||(t[0]=(...e)=>n.handleShow&&n.handleShow(...e))},(0,o.v_)(n.state.overallSendtSpeed)+"/s",1)]),(0,l.Lk)("p",null,[(0,l.eW)("下载 "),(0,l.Lk)("a",{href:"javascript:;",title:"本服务器\r\n接收速率",onClick:t[1]||(t[1]=(...e)=>n.handleShow&&n.handleShow(...e))},(0,o.v_)(n.state.overallReceiveSpeed)+"/s",1)])])):(0,l.Q3)("",!0),(0,l.bF)(u,{title:n.state.time,"destroy-on-close":"",modelValue:n.state.show,"onUpdate:modelValue":t[2]||(t[2]=e=>n.state.show=e),width:"540"},{default:(0,l.k6)((()=>[(0,l.Lk)("div",null,[(0,l.bF)(c,{data:n.state.list,border:"",size:"small",width:"100%"},{default:(0,l.k6)((()=>[(0,l.bF)(i,{prop:"text",label:"类别",width:"80"}),(0,l.bF)(i,{prop:"sendtBytes",label:"已上传",sortable:""},{default:(0,l.k6)((e=>[(0,l.Lk)("span",null,(0,o.v_)(e.row.sendtBytesText),1)])),_:1}),(0,l.bF)(i,{prop:"sendtSpeed",label:"上传速度",sortable:""},{default:(0,l.k6)((e=>[(0,l.Lk)("span",null,(0,o.v_)(e.row.sendtSpeedText)+"/s",1)])),_:1}),(0,l.bF)(i,{prop:"receiveBytes",label:"已下载",sortable:""},{default:(0,l.k6)((e=>[(0,l.Lk)("span",null,(0,o.v_)(e.row.receiveBytesText),1)])),_:1}),(0,l.bF)(i,{prop:"receiveSpeed",label:"下载速度",sortable:""},{default:(0,l.k6)((e=>[(0,l.Lk)("span",null,(0,o.v_)(e.row.receiveSpeedText)+"/s",1)])),_:1}),(0,l.bF)(i,{prop:"oper",label:"操作",width:"64"},{default:(0,l.k6)((e=>[e.row.detail?((0,l.uX)(),(0,l.Wv)(d,{key:0,size:"small",onClick:t=>n.handleShowDetail(e.row.id)},{default:(0,l.k6)((()=>[(0,l.eW)("详情")])),_:2},1032,["onClick"])):(0,l.Q3)("",!0)])),_:1})])),_:1},8,["data"])])])),_:1},8,["title","modelValue"]),n.state.details.Messenger?((0,l.uX)(),(0,l.Wv)(p,{key:1,config:n.config,modelValue:n.state.details.Messenger,"onUpdate:modelValue":t[3]||(t[3]=e=>n.state.details.Messenger=e)},null,8,["config","modelValue"])):(0,l.Q3)("",!0),n.state.details.SForward?((0,l.uX)(),(0,l.Wv)(g,{key:2,config:n.config,modelValue:n.state.details.SForward,"onUpdate:modelValue":t[4]||(t[4]=e=>n.state.details.SForward=e)},null,8,["config","modelValue"])):(0,l.Q3)("",!0),n.state.details.Relay?((0,l.uX)(),(0,l.Wv)(v,{key:3,config:n.config,modelValue:n.state.details.Relay,"onUpdate:modelValue":t[5]||(t[5]=e=>n.state.details.Relay=e)},null,8,["config","modelValue"])):(0,l.Q3)("",!0)],64)}a(4114);const M=()=>(0,C.zG)("flowClient/GetFlows"),Q=()=>(0,C.zG)("flowClient/GetMessengerFlows"),N=e=>(0,C.zG)("flowClient/GetSForwardFlows",e),Y=e=>(0,C.zG)("flowClient/GetRelayFlows",e);function q(e,t,a,n,s,r){const i=(0,l.g2)("el-table-column"),d=(0,l.g2)("el-table"),c=(0,l.g2)("el-dialog");return(0,l.uX)(),(0,l.Wv)(c,{title:"信标流量",class:"options-center",top:"1vh","destroy-on-close":"",modelValue:n.state.show,"onUpdate:modelValue":t[0]||(t[0]=e=>n.state.show=e),width:"680"},{default:(0,l.k6)((()=>[(0,l.Lk)("div",null,[(0,l.bF)(d,{data:n.state.list,stripe:"",border:"",size:"small",width:"100%",height:"60vh"},{default:(0,l.k6)((()=>[(0,l.bF)(i,{prop:"id",label:"信标id",width:"200"}),(0,l.bF)(i,{prop:"sendtBytes",label:"已上传",sortable:""},{default:(0,l.k6)((e=>[(0,l.Lk)("span",null,(0,o.v_)(e.row.sendtBytesText),1)])),_:1}),(0,l.bF)(i,{prop:"sendtSpeed",label:"上传速度",sortable:""},{default:(0,l.k6)((e=>[(0,l.Lk)("span",null,(0,o.v_)(e.row.sendtSpeedText)+"/s",1)])),_:1}),(0,l.bF)(i,{prop:"receiveBytes",label:"已下载",sortable:""},{default:(0,l.k6)((e=>[(0,l.Lk)("span",null,(0,o.v_)(e.row.receiveBytesText),1)])),_:1}),(0,l.bF)(i,{prop:"receiveSpeed",label:"下载速度",sortable:""},{default:(0,l.k6)((e=>[(0,l.Lk)("span",null,(0,o.v_)(e.row.receiveSpeedText)+"/s",1)])),_:1})])),_:1},8,["data"])])])),_:1},8,["modelValue"])}var H={props:["modelValue","config"],emits:["update:modelValue"],setup(e,{emit:t}){const a=(0,b.Kh)({show:!0,timer:0,list:[],old:null});(0,l.wB)((()=>a.show),(e=>{e||setTimeout((()=>{t("update:modelValue",e)}),300)}));const o={0:"登入信标",1:"客户端列表",2:"客户端删除",4:"客户端改名(转发)",7:"获取服务器版本",8:"客户端搜索ids",9:"客户端id列表",10:"客户端排序",11:"客户端在线",12:"生成客户端id",13:"登入信标V_1_3_1",2001:"外网端口(转发)",2002:"外网端口(转发)",2003:"开始打洞(转发)",2004:"开始打洞(转发)",2005:"打洞失败(转发)",2006:"打洞失败(转发)",2007:"打洞成功(转发)",2008:"打洞成功(转发)",2009:"隧道配置(转发)",2010:"隧道配置(转发)",2012:"隧道同步(转发)",2101:"中继通知(转发)",2102:"中继通知(转发)",2103:"中继请求",2105:"中继连通测试",2201:"运行网卡(转发)",2203:"停止网卡(转发)",2204:"更新网卡",2205:"更新网卡(转发)",2208:"配置网卡网络",2209:"获取网卡网络",2210:"分配IP",2211:"网卡变化",2212:"网卡变化(转发)",2213:"IP续约",2214:"网卡端口转发检测",2215:"网卡端口转发检测(转发)",2301:"添加内网穿透",2302:"移除内网穿透",2303:"通知内网穿透(转发)",2304:"通知内网穿透UDP(转发)",2305:"获取穿透列表(转发)",2401:"测试端口转发(转发)",2403:"获取端口转发(转发)",2507:"同步配置",2508:"同步配置(转发)",2601:"更新信息(转发)",2602:"更新信息(转发)",2603:"确认更新(转发)",2604:"确认更新(转发)",2605:"重启(转发)",2606:"重启",2607:"服务器更新信息",2608:"确认服务器更新",2609:"服务器重启",2610:"订阅更新信息(转发)",2611:"订阅更新信息(转发)",2612:"检查更新",2613:"检查更新(转发)",2701:"服务器流量",2702:"服务器信标流量",2703:"服务器中继流量",2704:"服务器内网穿透流量",2807:"同步配置",2808:"同步配置(转发)",2900:"运行socks5",2901:"运行socks5(转发)",2902:"停止socks5",2903:"停止socks5(转发)",2904:"更新socks5",2905:"更新socks5(转发)",3003:"获取权限",3004:"获取权限(转发)",3005:"更新权限",3006:"更新权限(转发)"},n=()=>{Q().then((e=>{const t=a.old||e,l=[];for(let a in e){const n=e[a],r=t[a],i=`[${a}]${o[`${a}`]||"未知"}`;l.push({id:i,sendtBytes:n.SendtBytes,sendtBytesText:s(n.SendtBytes),sendtSpeed:n.SendtBytes-r.SendtBytes,sendtSpeedText:s(n.SendtBytes-r.SendtBytes),receiveBytes:n.ReceiveBytes,receiveBytesText:s(n.ReceiveBytes),receiveSpeed:n.ReceiveBytes-r.ReceiveBytes,receiveSpeedText:s(n.ReceiveBytes-r.ReceiveBytes)})}a.list=l.filter((e=>!!e.id)),a.old=e,a.timer=setTimeout(n,1e3)})).catch((e=>{a.timer=setTimeout(n,1e3)}))},s=e=>{let t=0;while(e>=1024)e/=1024,t++;return`${e.toFixed(2)}${["B","KB","MB","GB","TB"][t]}`};return(0,l.sV)((()=>{n()})),(0,l.hi)((()=>{clearTimeout(a.timer)})),{config:e.config,state:a}}};const J=(0,x.A)(H,[["render",q],["__scopeId","data-v-2183bbe0"]]);var Z=J;const ee={class:"head"},te={class:"page t-c"},ae={class:"page-wrap"};function le(e,t,a,n,s,r){const i=(0,l.g2)("el-input"),d=(0,l.g2)("el-table-column"),c=(0,l.g2)("el-table"),u=(0,l.g2)("el-pagination"),p=(0,l.g2)("el-dialog");return(0,l.uX)(),(0,l.Wv)(p,{title:"内网穿透流量",class:"options-center",top:"1vh","destroy-on-close":"",modelValue:n.state.show,"onUpdate:modelValue":t[1]||(t[1]=e=>n.state.show=e),width:"680"},{default:(0,l.k6)((()=>[(0,l.Lk)("div",null,[(0,l.Lk)("div",ee,[(0,l.bF)(i,{modelValue:n.state.page.Key,"onUpdate:modelValue":t[0]||(t[0]=e=>n.state.page.Key=e),placeholder:"域名/端口搜索"},null,8,["modelValue"])]),(0,l.bF)(c,{data:n.state.list,stripe:"",border:"",size:"small",width:"100%",height:"60vh",onSortChange:n.handleSort},{default:(0,l.k6)((()=>[(0,l.bF)(d,{prop:"Key",label:"域名/端口",width:"200"}),(0,l.bF)(d,{prop:"SendtBytes",label:"已上传",sortable:"custom"},{default:(0,l.k6)((e=>[(0,l.Lk)("span",null,(0,o.v_)(e.row.SendtBytesText),1)])),_:1}),(0,l.bF)(d,{prop:"DiffSendtBytes",label:"上传速度",sortable:"custom"},{default:(0,l.k6)((e=>[(0,l.Lk)("span",null,(0,o.v_)(e.row.DiffSendtBytesText)+"/s",1)])),_:1}),(0,l.bF)(d,{prop:"ReceiveBytes",label:"已下载",sortable:"custom"},{default:(0,l.k6)((e=>[(0,l.Lk)("span",null,(0,o.v_)(e.row.ReceiveBytesText),1)])),_:1}),(0,l.bF)(d,{prop:"DiffReceiveBytes",label:"下载速度",sortable:"custom"},{default:(0,l.k6)((e=>[(0,l.Lk)("span",null,(0,o.v_)(e.row.DiffReceiveBytesText)+"/s",1)])),_:1})])),_:1},8,["data","onSortChange"]),(0,l.Lk)("div",te,[(0,l.Lk)("div",ae,[(0,l.bF)(u,{small:"",background:"",layout:"total,prev,pager, next",total:n.state.page.Count,"page-size":n.state.page.PageSize,"current-page":n.state.page.Page,onCurrentChange:n.handlePageChange},null,8,["total","page-size","current-page","onCurrentChange"])])])])])),_:1},8,["modelValue"])}var oe={props:["modelValue","config"],emits:["update:modelValue"],setup(e,{emit:t}){const a=(0,b.Kh)({show:!0,timer:0,list:[],page:{Key:"",Page:1,PageSize:15,Count:0,Order:1,OrderType:0}});(0,l.wB)((()=>a.show),(e=>{e||setTimeout((()=>{t("update:modelValue",e)}),300)}));const o=()=>{N({Key:a.page.Key,Page:a.page.Page,PageSize:a.page.PageSize,Order:a.page.Order,OrderType:a.page.OrderType}).then((e=>{try{a.page.Page=e.Page,a.page.PageSize=e.PageSize,a.page.Count=e.Count;const t=[];for(let a=0;a<e.Data.length;a++){const l=e.Data[a];Object.assign(l,{SendtBytesText:n(l.SendtBytes),ReceiveBytesText:n(l.ReceiveBytes),DiffSendtBytesText:n(l.DiffSendtBytes),DiffReceiveBytesText:n(l.DiffReceiveBytes)}),t.push(l)}a.list=t}catch(t){console.log(t)}a.timer=setTimeout(o,1e3)})).catch((e=>{a.timer=setTimeout(o,1e3)}))},n=e=>{let t=0;while(e>=1024)e/=1024,t++;return`${e.toFixed(2)}${["B","KB","MB","GB","TB"][t]}`},s=e=>{e&&(a.page.Page=e)},r=e=>{const t={ascending:1,descending:0}[e.order],l={SendtBytes:1,DiffSendtBytes:2,ReceiveBytes:3,DiffReceiveBytes:4}[e.prop];a.page.Order=l,a.page.OrderType=t};return(0,l.sV)((()=>{o()})),(0,l.hi)((()=>{clearTimeout(a.timer)})),{config:e.config,state:a,handlePageChange:s,handleSort:r}}};const ne=(0,x.A)(oe,[["render",le],["__scopeId","data-v-3e577fa7"]]);var se=ne;const re={class:"head"},ie={class:"page t-c"},de={class:"page-wrap"};function ce(e,t,a,n,s,r){const i=(0,l.g2)("el-input"),d=(0,l.g2)("el-table-column"),c=(0,l.g2)("el-table"),u=(0,l.g2)("el-pagination"),p=(0,l.g2)("el-dialog");return(0,l.uX)(),(0,l.Wv)(p,{title:"中继流量",class:"options-center",top:"1vh","destroy-on-close":"",modelValue:n.state.show,"onUpdate:modelValue":t[1]||(t[1]=e=>n.state.show=e),width:"680"},{default:(0,l.k6)((()=>[(0,l.Lk)("div",null,[(0,l.Lk)("div",re,[(0,l.bF)(i,{modelValue:n.state.page.Key,"onUpdate:modelValue":t[0]||(t[0]=e=>n.state.page.Key=e),placeholder:"名字搜索"},null,8,["modelValue"])]),(0,l.bF)(c,{data:n.state.list,stripe:"",border:"",size:"small",width:"100%",height:"60vh",onSortChange:n.handleSort},{default:(0,l.k6)((()=>[(0,l.bF)(d,{prop:"FromName",label:"发起端",width:"120"}),(0,l.bF)(d,{prop:"ToName",label:"目标端",width:"120"}),(0,l.bF)(d,{prop:"SendtBytes",label:"已上传",sortable:"custom"},{default:(0,l.k6)((e=>[(0,l.Lk)("span",null,(0,o.v_)(e.row.SendtBytesText),1)])),_:1}),(0,l.bF)(d,{prop:"DiffSendtBytes",label:"上传速度",sortable:"custom"},{default:(0,l.k6)((e=>[(0,l.Lk)("span",null,(0,o.v_)(e.row.DiffSendtBytesText)+"/s",1)])),_:1}),(0,l.bF)(d,{prop:"ReceiveBytes",label:"已下载",sortable:"custom"},{default:(0,l.k6)((e=>[(0,l.Lk)("span",null,(0,o.v_)(e.row.ReceiveBytesText),1)])),_:1}),(0,l.bF)(d,{prop:"DiffReceiveBytes",label:"下载速度",sortable:"custom"},{default:(0,l.k6)((e=>[(0,l.Lk)("span",null,(0,o.v_)(e.row.DiffReceiveBytesText)+"/s",1)])),_:1})])),_:1},8,["data","onSortChange"]),(0,l.Lk)("div",ie,[(0,l.Lk)("div",de,[(0,l.bF)(u,{small:"",background:"",layout:"total,prev,pager, next",total:n.state.page.Count,"page-size":n.state.page.PageSize,"current-page":n.state.page.Page,onCurrentChange:n.handlePageChange},null,8,["total","page-size","current-page","onCurrentChange"])])])])])),_:1},8,["modelValue"])}var ue={props:["modelValue","config"],emits:["update:modelValue"],setup(e,{emit:t}){const a=(0,b.Kh)({show:!0,timer:0,list:[],page:{Key:"",Page:1,PageSize:15,Count:0,Order:1,OrderType:0}});(0,l.wB)((()=>a.show),(e=>{e||setTimeout((()=>{t("update:modelValue",e)}),300)}));const o=()=>{Y({Key:a.page.Key,Page:a.page.Page,PageSize:a.page.PageSize,Order:a.page.Order,OrderType:a.page.OrderType}).then((e=>{try{a.page.Page=e.Page,a.page.PageSize=e.PageSize,a.page.Count=e.Count;const t=[];for(let a=0;a<e.Data.length;a++){const l=e.Data[a];Object.assign(l,{SendtBytesText:n(l.SendtBytes),ReceiveBytesText:n(l.ReceiveBytes),DiffSendtBytesText:n(l.DiffSendtBytes),DiffReceiveBytesText:n(l.DiffReceiveBytes)}),t.push(l)}a.list=t}catch(t){console.log(t)}a.timer=setTimeout(o,1e3)})).catch((e=>{a.timer=setTimeout(o,1e3)}))},n=e=>{let t=0;while(e>=1024)e/=1024,t++;return`${e.toFixed(2)}${["B","KB","MB","GB","TB"][t]}`},s=e=>{e&&(a.page.Page=e)},r=e=>{const t={ascending:1,descending:0}[e.order],l={SendtBytes:1,DiffSendtBytes:2,ReceiveBytes:3,DiffReceiveBytes:4}[e.prop];a.page.Order=l,a.page.OrderType=t};return(0,l.sV)((()=>{o()})),(0,l.hi)((()=>{clearTimeout(a.timer)})),{config:e.config,state:a,handlePageChange:s,handleSort:r}}};const pe=(0,x.A)(ue,[["render",ce],["__scopeId","data-v-7dbf3a4a"]]);var ge=pe,ve={props:["config"],components:{ServerFlowMessenger:Z,ServerFlowSForward:se,ServerFlowRelay:ge},setup(e){const t=(0,F.B)(),a=(0,l.EW)((()=>t.value.hasAccess("SForwardFlow"))),o=(0,l.EW)((()=>t.value.hasAccess("RelayFlow"))),n=(0,l.EW)((()=>t.value.hasAccess("SigninFlow"))),s=(0,b.Kh)({show:!1,timer:0,overallSendtSpeed:"0000.00KB",overallReceiveSpeed:"0000.00KB",overallOnline:"0/0",serverOnline:"",time:"",list:[],old:null,details:{Messenger:!1,SForward:!1,Relay:!1}}),r=()=>{s.show=!0},i=e=>{s.details[e]=!0},d={External:{text:"外网端口",detail:!1},RelayReport:{text:"中继节点",detail:!1},Relay:{text:"中继",detail:o.value},Messenger:{text:"信标",detail:n.value},SForward:{text:"内网穿透",detail:a.value},flow:{text:"在线报告",detail:!1}},c=()=>{M().then((e=>{const t=s.old||e;if(e.Items["_"]&&(s.overallOnline=`${e.Items["_"].SendtBytes}/${e.Items["_"].ReceiveBytes}`,delete e.Items["_"]),e.Items["flow"]&&e.Items["flow"].ReceiveBytes>0){const t=(BigInt(e.Items["flow"].ReceiveBytes)>>BigInt(32)).toString(),a=(BigInt(e.Items["flow"].ReceiveBytes)&BigInt(4294967295)).toString(),l=e.Items["flow"].SendtBytes;s.serverOnline=`、${t}/${a}/${l}`,delete e.Items["flow"]}let a=0,l=0,o=0,n=0;for(let s in t.Items)a+=t.Items[s].ReceiveBytes,l+=t.Items[s].SendtBytes;for(let s in e.Items)o+=e.Items[s].ReceiveBytes,n+=e.Items[s].SendtBytes;s.overallSendtSpeed=u(n-l),s.overallReceiveSpeed=u(o-a),s.time=`从 ${e.Start}启动 至今`;const r=[];for(let s in e.Items){const a=e.Items[s],l=t.Items[s],o=d[`${s}`]||{text:`未知${s}`,detail:!1};r.push({id:s,text:o.text,detail:o.detail,sendtBytes:a.SendtBytes,sendtBytesText:u(a.SendtBytes),sendtSpeed:a.SendtBytes-l.SendtBytes,sendtSpeedText:u(a.SendtBytes-l.SendtBytes),receiveBytes:a.ReceiveBytes,receiveBytesText:u(a.ReceiveBytes),receiveSpeed:a.ReceiveBytes-l.ReceiveBytes,receiveSpeedText:u(a.ReceiveBytes-l.ReceiveBytes)})}s.list=r.filter((e=>!!e.id)),s.old=e,s.timer=setTimeout(c,1e3)})).catch((e=>{s.timer=setTimeout(c,1e3)}))},u=e=>{let t=0;while(e>=1024)e/=1024,t++;return`${e.toFixed(2)}${["B","KB","MB","GB","TB"][t]}`};return(0,l.sV)((()=>{c()})),(0,l.hi)((()=>{clearTimeout(s.timer)})),{hasSForwardFlow:a,config:e.config,state:s,handleShow:r,handleShowDetail:i}}};const fe=(0,x.A)(ve,[["render",G],["__scopeId","data-v-630048e8"]]);var me=fe;const he=["title"],ye={key:0,class:"progress"},ke={key:1,class:"progress"};function we(e,t,a,n,s,r){const i=(0,l.g2)("Loading"),d=(0,l.g2)("el-icon"),c=(0,l.g2)("Download"),u=(0,l.g2)("CircleCheck");return(0,l.uX)(),(0,l.CE)("a",{href:"javascript:;",title:"服务端的程序版本",onClick:t[0]||(t[0]=(...e)=>n.handleUpdate&&n.handleUpdate(...e)),class:(0,o.C4)(["download",n.updateColor()])},[(0,l.Lk)("span",null,(0,o.v_)(n.state.version),1),n.updaterCurrent.Version?((0,l.uX)(),(0,l.CE)(l.FK,{key:0},[1==n.updaterCurrent.Status?((0,l.uX)(),(0,l.Wv)(d,{key:0,size:"14",class:"loading"},{default:(0,l.k6)((()=>[(0,l.bF)(i)])),_:1})):2==n.updaterServer.Status?((0,l.uX)(),(0,l.Wv)(d,{key:1,size:"14"},{default:(0,l.k6)((()=>[(0,l.bF)(c)])),_:1})):3==n.updaterServer.Status||5==n.updaterServer.Status?((0,l.uX)(),(0,l.CE)(l.FK,{key:2},[(0,l.bF)(d,{size:"14",class:"loading"},{default:(0,l.k6)((()=>[(0,l.bF)(i)])),_:1}),0==n.updaterServer.Length?((0,l.uX)(),(0,l.CE)("span",ye,"0%")):((0,l.uX)(),(0,l.CE)("span",ke,(0,o.v_)(parseInt(n.updaterServer.Current/n.updaterServer.Length*100))+"%",1))],64)):6==n.updaterServer.Status?((0,l.uX)(),(0,l.Wv)(d,{key:3,size:"14",class:"yellow"},{default:(0,l.k6)((()=>[(0,l.bF)(u)])),_:1})):(0,l.Q3)("",!0)],64)):((0,l.uX)(),(0,l.Wv)(d,{key:1,size:"14"},{default:(0,l.k6)((()=>[(0,l.bF)(c)])),_:1}))],10,he)}var be=a(2933),Se=a(920),Be={components:{Promotion:_.Yk4,Download:_.f5X,Loading:_.Rhj,CircleCheck:_.rW7,ServerFlow:me},props:["config"],setup(e){const t=(0,F.B)(),a=(0,l.EW)((()=>t.value.hasAccess("UpdateServer"))),o=(0,b.KR)({Version:"",Msg:[],DateTime:"",Status:0,Length:0,Current:0}),n=(0,b.KR)({Version:"",Status:0,Length:0,Current:0}),s=(0,l.EW)((()=>`${o.value.Version}->${o.value.DateTime}\n${o.value.Msg.map(((e,t)=>`${t+1}、${e}`)).join("\n")}`)),r=(0,b.Kh)({show:!1,loading:!1,connected:(0,l.EW)((()=>t.value.signin.Connected)),version:(0,l.EW)((()=>t.value.signin.Version))}),i=()=>{(0,Se.Vk)().then((e=>{o.value.DateTime=e.DateTime,o.value.Version=e.Version,o.value.Status=e.Status,o.value.Length=e.Length,o.value.Current=e.Current,o.value.Msg=e.Msg,setTimeout((()=>{i()}),1e3)})).catch((()=>{setTimeout((()=>{i()}),1e3)}))},d=()=>{(0,Se.BJ)().then((e=>{n.value.Version=e.Version,n.value.Status=e.Status,n.value.Length=e.Length,n.value.Current=e.Current,n.value.Status>2&&n.value.Status<6&&setTimeout((()=>{d()}),1e3)})).catch((()=>{setTimeout((()=>{d()}),1e3)}))},c=()=>o.value.Version?n.value.Status<=2?r.version!=o.value.Version?`不是最新版本(${o.value.Version})，建议更新\n${s.value}`:`是最新版本，但我无法阻止你喜欢更新\n${s.value}`:{3:"正在下载",4:"已下载",5:"正在解压",6:"已解压，请重启"}[n.value.Status]:"未检测到更新",u=()=>r.version!=o.value.Version?"yellow":"green",p=()=>{e.config&&a.value&&(o.value.Version?[0,1,3,5].indexOf(n.value.Status)>=0?K.nk.error("操作中，请稍后!"):6!=n.value.Status?2==o.value.Status&&be.s.confirm("确定更新服务端吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{(0,Se.y2)(o.value.Version).then((()=>{setTimeout((()=>{d()}),1e3)}))})).catch((()=>{})):be.s.confirm("确定关闭服务端吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{(0,Se.aP)()})).catch((()=>{})):K.nk.error("未检测到更新"))};return(0,l.sV)((()=>{i(),d()})),{config:e.config,state:r,updaterCurrent:o,updaterServer:n,handleUpdate:p,updateText:c,updateColor:u}}};const Fe=(0,x.A)(Be,[["render",we],["__scopeId","data-v-70063cba"]]);var Ce=Fe,_e={components:{ServerConfig:X,ServerFlow:me,ServerVersion:Ce},props:["config"],setup(e){const t=(0,F.B)(),a=(0,l.EW)((()=>t.value.hasAccess("Flow"))),o=(0,b.Kh)({show:!1,loading:!1});return{config:e.config,hasFlow:a,state:o}}};const Ve=(0,x.A)(_e,[["render",I],["__scopeId","data-v-2d85a782"]]);var xe=Ve;const Te=e=>((0,l.Qi)("data-v-0ef57e46"),e=e(),(0,l.jt)(),e),Le={key:0,class:"status-export-wrap"},Re={class:"port-wrap"},Ie=Te((()=>(0,l.Lk)("div",{class:"text"}," 导出配置，作为子设备运行，如果使用docker，容器映射configs文件夹即可 ",-1))),Pe={class:"body"},Ee={class:"card-header"},We={class:"flex"},De={title:"这将生成唯一ID，多台设备使用产生冲突，挤压下线"},ze={style:{"margin-left":"2rem"}},Ke=Te((()=>(0,l.Lk)("span",null,"设备名 : ",-1))),$e=Te((()=>(0,l.Lk)("span",null,"管理密码 : ",-1)));function Ae(e,t,a,o,n,s){const r=(0,l.g2)("Share"),i=(0,l.g2)("el-icon"),d=(0,l.g2)("el-checkbox"),c=(0,l.g2)("el-input"),u=(0,l.g2)("Access"),p=(0,l.g2)("el-card"),g=(0,l.g2)("el-button"),v=(0,l.g2)("el-dialog");return o.config&&o.hasExport?((0,l.uX)(),(0,l.CE)("div",Le,[(0,l.Lk)("a",{href:"javascript:;",title:"此设备的管理接口",onClick:t[0]||(t[0]=e=>o.state.show=!0)},[(0,l.bF)(i,{size:"16"},{default:(0,l.k6)((()=>[(0,l.bF)(r)])),_:1}),(0,l.eW)(" 导出配置 ")]),(0,l.bF)(v,{class:"options-center",title:"导出配置","destroy-on-close":"",modelValue:o.state.show,"onUpdate:modelValue":t[5]||(t[5]=e=>o.state.show=e),center:"",width:"580",top:"1vh"},{footer:(0,l.k6)((()=>[(0,l.bF)(g,{plain:"",onClick:t[4]||(t[4]=e=>o.state.show=!1),loading:o.state.loading},{default:(0,l.k6)((()=>[(0,l.eW)("取消")])),_:1},8,["loading"]),(0,l.bF)(g,{type:"success",plain:"",onClick:o.handleExport,loading:o.state.loading},{default:(0,l.k6)((()=>[(0,l.eW)("确定导出")])),_:1},8,["onClick","loading"])])),default:(0,l.k6)((()=>[(0,l.Lk)("div",Re,[Ie,(0,l.Lk)("div",Pe,[(0,l.bF)(p,{shadow:"never"},{header:(0,l.k6)((()=>[(0,l.Lk)("div",Ee,[(0,l.Lk)("div",We,[(0,l.Lk)("div",De,[(0,l.bF)(d,{disabled:o.onlyNode,modelValue:o.state.single,"onUpdate:modelValue":t[1]||(t[1]=e=>o.state.single=e),label:"单设备"},null,8,["disabled","modelValue"])]),(0,l.Lk)("div",ze,[Ke,(0,l.bF)(c,{disabled:!o.state.single,modelValue:o.state.name,"onUpdate:modelValue":t[2]||(t[2]=e=>o.state.name=e),maxlength:"12","show-word-limit":"",style:{width:"15rem"}},null,8,["disabled","modelValue"])]),(0,l.Lk)("div",null,[$e,(0,l.bF)(c,{type:"password","show-password":"",disabled:o.onlyNode,modelValue:o.state.apipassword,"onUpdate:modelValue":t[3]||(t[3]=e=>o.state.apipassword=e),maxlength:"36","show-word-limit":"",style:{width:"15rem"}},null,8,["disabled","modelValue"])])])])])),default:(0,l.k6)((()=>[(0,l.bF)(u,{ref:"accessDom",machineid:o.machineId},null,8,["machineid"])])),_:1})])])])),_:1},8,["modelValue"])])):(0,l.Q3)("",!0)}var Xe=a(8835),Oe=a(9593),Ue={components:{Share:_.SYj,Access:Oe.A},props:["config"],setup(e){const t=(0,F.B)(),a=(0,l.EW)((()=>t.value.hasAccess("Export"))),o=(0,l.EW)((()=>t.value.config.Client.OnlyNode)),n=(0,l.EW)((()=>t.value.config.Client.Id)),s=(0,b.Kh)({show:!1,loading:!1,single:!0,name:"",apipassword:t.value.config.Client.CApi.ApiPassword}),r=(0,b.KR)(null),i=()=>{if(!a.value)return;const e={access:r.value.getValue(),single:s.single,name:s.name,apipassword:s.apipassword};if(e.single){if(!e.name)return void K.nk.error("请输入设备名")}else e.name="";if(!e.single||s.name)return e;K.nk.error("请输入管理密码")},d=()=>{const e=document.createElement("a");s.single?e.download=`client-node-export-${s.name}.zip`:e.download="client-node-export.zip",e.href="/client-node-export.zip",document.body.appendChild(e),e.click(),document.body.removeChild(e)},c=()=>{const e=i();e&&(s.loading=!0,(0,Xe.P$)(e).then((()=>{s.loading=!1,s.show=!1,K.nk.success("导出成功"),d()})).catch((()=>{s.loading=!1})))};return{config:e.config,onlyNode:o,hasExport:a,machineId:n,state:s,accessDom:r,handleExport:c}}};const je=(0,x.A)(Ue,[["render",Ae],["__scopeId","data-v-0ef57e46"]]);var Ge=je,Me=a(167),Qe={components:{Api:L,Server:xe,Export:Ge,UpdaterBtn:Me.A},props:["config"],setup(e){const t=(0,F.B)(),a=(0,l.EW)((()=>t.value.self)),o=(0,b.Kh)({showPay:!1});return{state:o,config:e.config,self:a}}};const Ne=(0,x.A)(Qe,[["render",w],["__scopeId","data-v-2a629595"]]);var Ye=Ne}}]);