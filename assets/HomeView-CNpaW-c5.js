import{d,u as p,r as _,c as a,a as e,b as m,e as f,f as v,F as k,g as b,o as c,_ as h}from"./index-C0h-E9Bi.js";const C={class:"container"},w={key:0,class:"modal"},V={class:"modal-content"},g=d({__name:"HomeView",setup(x){const s=p(),n=b(),o=_(!1),l=()=>{s.isAuthenticated?window.open("/docs","_blank"):o.value=!0},i=()=>{s.isAuthenticated?n.push("/topics"):o.value=!0},u=()=>{o.value=!1,n.push("/login")};return(A,t)=>{const r=v("RouterView");return c(),a(k,null,[e("div",C,[e("nav",{class:"button-container"},[e("button",{onClick:l,class:"docs-button"}," 📄 教學筆記 "),e("button",{onClick:i,class:"topic-button"}," 🎯 題目整理 ")]),f(r)]),o.value?(c(),a("div",w,[e("div",V,[t[1]||(t[1]=e("p",null,"請先登入才能使用此功能",-1)),e("button",{onClick:u},"前往登入"),e("button",{onClick:t[0]||(t[0]=B=>o.value=!1)},"關閉")])])):m("",!0)],64)}}}),R=h(g,[["__scopeId","data-v-64eeee76"]]);export{R as default};
