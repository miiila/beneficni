import{u as n}from"./fetch.db9540ed.js";import{m as r}from"./marked.esm.14d91642.js";import{q as o,r as c,C as i,c as _,a as l,v as m,o as p}from"./entry.04dbe281.js";const d={class:"main"},u=["innerHTML"],y=o({__name:"pravidla",async setup(f){let e,t;const s=c("");try{const{data:a}=([e,t]=i(()=>n("/api/pages/pravidla","$QcMDiE8NNA")),e=await e,t(),e);s.value=r(a.value.attributes.content,{mangle:!1,headerIds:!1})}catch{}return(a,h)=>(p(),_("div",d,[l("div",{innerHTML:m(s)},null,8,u)]))}});export{y as default};