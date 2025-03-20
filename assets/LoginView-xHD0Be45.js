import{e as S,d as w,f as u,c as n,u as p,a,t as v,g as b,w as _,v as f,h as I,i as L,o as r,_ as U}from"./index-pq45JWa3.js";const N="https://home.sunnytseng.com/api/math-api/token/",x=S("auth",{state:()=>({user:JSON.parse(localStorage.getItem("user")||"null"),token:localStorage.getItem("token")||null}),getters:{isAuthenticated:e=>!!e.token,getUserName:e=>{var t;return((t=e.user)==null?void 0:t.name)??"Guest"}},actions:{async login(e,t){try{const s=await fetch(N,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:t})});if(!s.ok)throw new Error("Login failed");const o=await s.json(),l={name:o.name,account:o.account,avatar:o.avatar,token:o.access};return this.setUser(l),{success:!0}}catch(s){return s instanceof Error?(console.error("Login error:",s.message),{success:!1,message:s.message}):(console.error("Unknown error:",s),{success:!1,message:"An unknown error occurred"})}},setUser(e){this.user=e,this.token=e.token,localStorage.setItem("user",JSON.stringify(e)),localStorage.setItem("token",e.token||"")},setToken(e){this.token=e,localStorage.setItem("token",e)},logout(){this.user=null,this.token=null,localStorage.removeItem("user"),localStorage.removeItem("token")}}}),A={class:"auth-container"},V={key:0,class:"user-info"},C=["src"],O={key:1,class:"login-box"},T={type:"submit"},B={key:0,class:"spinner"},E={key:1},J={key:0,class:"error-message"},M=w({__name:"LoginView",setup(e){const t=x(),s=L(),o=u(""),l=u(""),i=u(""),d=u(!1),k=async()=>{d.value=!0;const m=await t.login(o.value,l.value);m.success||(i.value=m.message??"登入失敗"),d.value=!1},y=()=>{t.logout(),s.push("/")};return(m,c)=>{var h;return r(),n("div",A,[p(t).isAuthenticated?(r(),n("div",V,[a("img",{src:(h=p(t).user)==null?void 0:h.avatar,alt:"Avatar",class:"avatar"},null,8,C),a("span",null,v(p(t).getUserName),1),a("button",{onClick:y},"登出")])):(r(),n("div",O,[a("form",{onSubmit:I(k,["prevent"])},[_(a("input",{"onUpdate:modelValue":c[0]||(c[0]=g=>o.value=g),type:"text",placeholder:"帳號",required:""},null,512),[[f,o.value]]),_(a("input",{"onUpdate:modelValue":c[1]||(c[1]=g=>l.value=g),type:"password",placeholder:"密碼",required:""},null,512),[[f,l.value]]),a("button",T,[d.value?(r(),n("span",B)):(r(),n("span",E,"登入"))])],32),i.value?(r(),n("p",J,v(i.value),1)):b("",!0)]))])}}}),q=U(M,[["__scopeId","data-v-25ebe3bb"]]);export{q as default};
