import{h as v,d as B,r as M,o as N,c as V,a as i,b as t,w as l,e as x,u as r,R as $,f as _,g as C,l as j,m as z,i as w,j as H,s as O,k as y}from"./index-C9zxOzUu.js";const P="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20261.76%20226.69'%3e%3cpath%20d='M161.096.001l-30.225%2052.351L100.647.001H-.005l130.877%20226.688L261.749.001z'%20fill='%2341b883'/%3e%3cpath%20d='M161.096.001l-30.225%2052.351L100.647.001H52.346l78.526%20136.01L209.398.001z'%20fill='%2334495e'/%3e%3c/svg%3e";/**
 * @license lucide-vue-next v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),R=n=>n.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,s,a)=>a?a.toUpperCase():s.toLowerCase()),I=n=>{const e=R(n);return e.charAt(0).toUpperCase()+e.slice(1)},U=(...n)=>n.filter((e,s,a)=>!!e&&e.trim()!==""&&a.indexOf(e)===s).join(" ").trim();/**
 * @license lucide-vue-next v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var m={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-vue-next v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=({size:n,strokeWidth:e=2,absoluteStrokeWidth:s,color:a,iconNode:g,name:u,class:k,...h},{slots:p})=>v("svg",{...m,width:n||m.width,height:n||m.height,stroke:a||m.stroke,"stroke-width":s?Number(e)*24/Number(n):e,class:U("lucide",...u?[`lucide-${b(I(u))}-icon`,`lucide-${b(u)}`]:["lucide-icon"]),...h},[...g.map(d=>v(...d)),...p.default?[p.default()]:[]]);/**
 * @license lucide-vue-next v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=(n,e)=>(s,{slots:a})=>v(Z,{...s,iconNode:e,name:n},a);/**
 * @license lucide-vue-next v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=L("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-vue-next v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=L("arrow-right",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]),G={style:{display:"flex","flex-direction":"column",height:"100vh"}},K={style:{display:"flex",flex:"1","background-color":"#f5f7fa","align-items":"stretch"}},S={style:{"max-width":"20vw",display:"flex","flex-direction":"column"}},T={style:{flex:"1",margin:"10px"}},F=B({__name:"NavG",setup(n){const e=M(!0),s=(d,o)=>{console.log(d,o)},a=(d,o)=>{console.log(d,o)};function g(){e.value=!e.value}function u(){}function k(){y.replace("/nav/setting")}function h(){y.replace("/nav/tablehome")}function p(){}return N(()=>{}),(d,o)=>{const c=x("el-icon"),f=x("el-menu-item"),A=x("el-menu");return _(),V("main",G,[o[5]||(o[5]=i("div",{style:{height:"30px",display:"flex","app-region":"drag","background-color":"rgb(231, 231, 231)"}},[i("img",{style:{width:"20px",height:"20px","margin-left":"20px","margin-top":"6px"},src:P}),i("p",{style:{margin:"0","margin-left":"10px","line-height":"30px"}},"流程测试")],-1)),i("div",K,[i("div",S,[t(A,{"default-active":"1",class:"el-menu-vertical-demo",collapse:e.value,onOpen:s,onClose:a},{default:l(()=>[t(f,{index:"0",onClick:g},{title:l(()=>o[0]||(o[0]=[i("span",null,"折叠",-1)])),default:l(()=>[e.value?(_(),C(c,{key:0},{default:l(()=>[t(r(E))]),_:1})):(_(),C(c,{key:1},{default:l(()=>[t(r(q))]),_:1}))]),_:1}),t(f,{index:"1",onClick:h},{title:l(()=>o[1]||(o[1]=[i("span",null,"首页",-1)])),default:l(()=>[t(c,null,{default:l(()=>[t(r(j))]),_:1})]),_:1}),t(f,{index:"2",onClick:p},{title:l(()=>o[2]||(o[2]=[w("上传")])),default:l(()=>[t(c,null,{default:l(()=>[t(r(z))]),_:1})]),_:1}),t(f,{index:"3",onClick:u},{title:l(()=>o[3]||(o[3]=[w("文档管理")])),default:l(()=>[t(c,null,{default:l(()=>[t(r(H))]),_:1})]),_:1}),t(f,{index:"4",onClick:k},{title:l(()=>o[4]||(o[4]=[w("设置")])),default:l(()=>[t(c,null,{default:l(()=>[t(r(O))]),_:1})]),_:1})]),_:1},8,["collapse"])]),i("div",T,[t(r($))])])])}}});export{F as default};
