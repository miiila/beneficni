import{q as l,V as _,s as o,o as m,c as f,S as d,_ as S}from"./entry.04dbe281.js";import{u as x}from"./config.7b55d212.js";const g=l({__name:"IconCSS",props:{name:{type:String,required:!0},size:{type:String,default:""}},setup(r){const n=r;_(e=>({"17e81e26":u.value}));const s=x(),p=o(()=>{var e;return((((e=s.nuxtIcon)==null?void 0:e.aliases)||{})[n.name]||n.name).replace(/^i-/,"")}),u=o(()=>`url('https://api.iconify.design/${p.value.replace(":","/")}.svg')`),a=o(()=>{var t,c,i;if(!n.size&&typeof((t=s.nuxtIcon)==null?void 0:t.size)=="boolean"&&!((c=s.nuxtIcon)!=null&&c.size))return;const e=n.size||((i=s.nuxtIcon)==null?void 0:i.size)||"1em";return String(Number(e))===e?`${e}px`:e});return(e,t)=>(m(),f("span",{style:d({width:a.value,height:a.value})},null,4))}});const y=S(g,[["__scopeId","data-v-2717c442"]]);export{y as default};
