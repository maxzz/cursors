var $=Object.defineProperty,q=Object.defineProperties;var G=Object.getOwnPropertyDescriptors;var y=Object.getOwnPropertySymbols;var B=Object.prototype.hasOwnProperty,R=Object.prototype.propertyIsEnumerable;var L=(e,t,r)=>t in e?$(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,f=(e,t)=>{for(var r in t||(t={}))B.call(t,r)&&L(e,r,t[r]);if(y)for(var r of y(t))R.call(t,r)&&L(e,r,t[r]);return e},p=(e,t)=>q(e,G(t));var g=(e,t)=>{var r={};for(var n in e)B.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&y)for(var n of y(e))t.indexOf(n)<0&&R.call(e,n)&&(r[n]=e[n]);return r};import{a as i,r as b,u as D,j as c,b as o,T as _,t as K,c as E,d as h,F as k,R as v,e as J,f as W,M as Z,g as X}from"./vendor.02fa7b3e.js";const Y=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function r(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerpolicy&&(l.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?l.credentials="include":a.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(a){if(a.ep)return;a.ep=!0;const l=r(a);fetch(a.href,l)}};Y();function Q(e,t){const r=i(e);return i(a=>a(r),(a,l,s)=>{const m=typeof s=="function"?s(a(r)):s;l(r,m),t({get:a,set:l,nextValue:m})})}function ee(e,t=100){let r,n,a;return function(...l){a=this,n=l,!r&&(r=setTimeout(()=>{r=null,e.apply(a,n)},t))}}var A;(e=>{const t="react-cursors-01";e.initialData={showHelpId:null};function r(){const n=localStorage.getItem(t);if(n)try{let a=JSON.parse(n);e.initialData=f(f({},e.initialData),a)}catch{}}r(),e.save=ee(function(a){let l={showHelpId:a(S)};localStorage.setItem(t,JSON.stringify(l))},1e3)})(A||(A={}));const I=i(null);function V(e,t,r,n){var l;let a;if(r){let s=typeof r=="function"?r((l=e(n))==null?void 0:l.el):r,m=r&&(s==null?void 0:s.getContext("2d"));a=s&&m&&{el:s,ctx:m}}t(n,a)}const j=i(null),P=i(e=>e(j),(e,t,r)=>(n=>V(e,t,r,n))(j)),T=i(null),z=i(e=>e(T),(e,t,r)=>(n=>V(e,t,r,n))(T)),U=i(!0),S=Q(A.initialData.showHelpId,({get:e})=>A.save(e));i(null);const te=i(32);i(null);function x(...e){return e.filter(Boolean).join(" ")}function re(s){var m=s,{onDropped:e,accept:t,className:r,children:n,activeAtom:a}=m,l=g(m,["onDropped","accept","className","children","activeAtom"]);const d=b.exports.useRef(null),[N,w]=D(a);return c("label",p(f({className:x("inline-block",r),onDragOver:u=>{u.preventDefault(),u.stopPropagation(),!N&&w(!0)},onDrop:u=>{u.preventDefault(),u.stopPropagation(),w(!1),e(u.dataTransfer.files)},onDragEnter:u=>w(!0),onDragLeave:u=>w(!1)},l),{children:[o("input",{type:"file",className:"hidden",accept:t,onChange:()=>{var u,F;return((u=d.current)==null?void 0:u.files)&&e((F=d.current)==null?void 0:F.files)},ref:d}),n]}))}function ne(e){const n=e,{title:t}=n,r=g(n,["title"]);return c("svg",p(f({fill:"currentColor",viewBox:"0 0 24 24"},r),{children:[t&&o("title",{children:t}),o("path",{d:"M19 10a1 1 0 0 0-1 1v3.38l-1.48-1.48a2.79 2.79 0 0 0-3.93 0l-.7.71l-2.48-2.49a2.79 2.79 0 0 0-3.93 0L4 12.61V7a1 1 0 0 1 1-1h8a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v12.22A2.79 2.79 0 0 0 4.78 22h12.44a2.88 2.88 0 0 0 .8-.12a2.74 2.74 0 0 0 2-2.65V11A1 1 0 0 0 19 10zM5 20a1 1 0 0 1-1-1v-3.57l2.89-2.89a.78.78 0 0 1 1.1 0L15.46 20zm13-1a1 1 0 0 1-.18.54L13.3 15l.71-.7a.77.77 0 0 1 1.1 0L18 17.21zm3-15h-1V3a1 1 0 0 0-2 0v1h-1a1 1 0 0 0 0 2h1v1a1 1 0 0 0 2 0V6h1a1 1 0 0 0 0-2z"})]}))}function ae(){return o("div",{className:"toaser",children:o(_,{position:"bottom-right",reverseOrder:!1,gutter:8,containerClassName:"",containerStyle:{},toastOptions:{className:"",duration:5e3,style:{background:"#363636",color:"#fff"},success:{duration:3e3,theme:{primary:"green",secondary:"black"}}}})})}const O=(e,t)=>K(e,f({style:{backgroundColor:"tomato"}},t));function oe(e){return new Promise((t,r)=>{const n=new FileReader;n.onload=()=>t(n.result),n.onerror=()=>r(new Error("Failed to load file")),n.readAsDataURL(e)})}function le(e){return new Promise((t,r)=>{const n=new Image;!e||!n?r():(n.onload=()=>t(n),n.onerror=a=>r(new Error("Failed to create image")),n.src=e.toString())})}function C(e,t){e.ctx.fillStyle="red",e.ctx.fillRect(0,0,e.el.width,e.el.height),e.ctx.drawImage(t,0,0)}function H(e,t){const r=t.match(/([a-fA-F\d]{2})/g);if(!r||r.length!==3)throw new Error("invalid color");const n=e.ctx.getImageData(0,0,e.el.width,e.el.height),a=n.data,l=[a[length-4],a[length-3],a[length-2]];for(var s=0;s<=a.length;s+=4)a[s+1]=+l[1],a[s+2]=a[s+2]^+l[2];e.ctx.putImageData(n,0,0)}function se(){const e=E(I),[t]=b.exports.useState(i(!1)),r=h(t);async function n(a){if(!!a.length)try{const l=await oe(a[0]),s=await le(l);e(s)}catch(l){e(null),O((l==null?void 0:l.message)||"Failed to load image")}}return c("div",{className:"relative",children:[o("div",{className:`absolute left-4 top-0.5 pb-0.5 text-xs ${r?"text-slate-50 font-bold":"text-slate-100"}`,children:r?"Drop":"Load image"}),o(re,{className:`w-32 h-32 ${r?"bg-green-700":"bg-slate-400"} border-slate-500 border rounded cursor-pointer`,onDropped:n,activeAtom:t,children:o(ne,{className:`${r?"text-green-600/30":"text-slate-300"}   pointer-events-none`})})]})}function ce(){const e=h(I),t=h(P),r=h(U);return b.exports.useEffect(()=>{if(!!t)try{e?(C(t,e),r&&H(t,"#000000")):t.ctx.clearRect(0,0,t.el.width,t.el.height)}catch(n){O("Failed to render image"),console.log("Failed to render image",n)}},[t,e,r]),b.exports.useEffect(()=>{!t||(r?r&&H(t,"#300000"):e&&C(t,e))},[t,r]),null}function ie(){const e=h(I),t=h(z);return b.exports.useEffect(()=>{if(!!t)try{e?(t.el.width=e.width,t.el.height=e.height,C(t,e)):t.ctx.clearRect(0,0,t.el.width,t.el.height)}catch(r){O("Failed to render image"),console.log("Failed to render image",r)}},[t,e]),null}function de(){return c(k,{children:[o(ce,{}),o(ie,{})]})}function M(r){var n=r,{updateAtom:e}=n,t=g(n,["updateAtom"]);const a=E(e);return o("canvas",f({ref:a},t))}function ue(){return c("div",{className:"flex gap-4",children:[o("div",{className:"w-full aspect-square border-sky-700 border",children:o(M,{className:"w-full h-full bg-slate-300",updateAtom:P})}),o("div",{className:"w-full aspect-square border-sky-700 border",children:o(M,{className:"w-full h-full bg-slate-300",updateAtom:z})})]})}function fe(e){return e.replace(/[\u066B,]/g,".").replace(/[^\-0-9.eE]/g,"")}function me(e){return e.replace(/[^0-9]/g,"")}function he(e,t,r){const[n,a]=v.useState(""+e);v.useEffect(()=>a(""+e),[e]);function l(d){d=(r||fe)(d),a(d);const N=+d;d&&!isNaN(N)&&t(N)}function s(){(!n||isNaN(+n))&&a(""+e)}function m(d){l(d.target.value)}return{value:n,onChange:m,onBlur:s}}const ge=[16,32,128,256];function pe(){const[e,t]=D(te),r=he(e,t,me),[n,a]=v.useState(!1),l=J({open:n?1:0,config:{mass:.2,tension:492,clamp:!0}});return c("div",{className:"relative inline-block text-xs",children:[c("label",{className:x("w-16 flex items-center bg-slate-300 border-slate-500 border overflow-hidden focus-within:ring",n?"rounded-t-md":"rounded-md"),children:[o("div",{className:"w-10",children:o("input",f({className:"w-full px-2 py-1 bg-transparent border-slate-500 border-r focus:outline-none",type:"text"},r))}),o("button",{className:"focus:outline-none focus:bg-slate-400",onClick:()=>a(s=>!s),children:o("svg",{className:"w-6 h-6 p-1 stroke-current stroke-[.6rem] fill-transparent",viewBox:"0 0 100 100",children:o(W.path,{d:l.open.to({range:[0,1],output:["M 15 34 L 45 65 L 78 34","M 15 53 L 45 23 L 78 53"]})})})})]}),n&&o("div",{className:"absolute top-full w-16 bg-slate-300 border-slate-500 border rounded-b-md",children:ge.map(s=>o("div",{className:`w-full px-2 py-1 hover:bg-slate-400 ${s===e?"font-bold":""} cursor-pointer`,onClick:()=>{t(s),a(!1)},children:s},s))})]})}function be(){return o("div",{className:"flex justify-center",children:o("div",{className:"bg-slate-300 border-b-slate-400/30 border-r-slate-400/30 border-slate-300 rounded-3xl border-[16px]",children:c("div",{className:"p-4 bg-slate-900 border-t-slate-400/90 border-l-slate-400/90 rounded-[12px] border-8",children:[o("div",{className:"mx-auto w-max text-green-500",children:"Hover over the square to check the cursor"}),c("div",{className:"pt-4 flex items-center justify-center gap-x-4",children:[o("div",{className:"w-36 h-36 bg-white border-slate-900 border"}),o("div",{className:"w-36 h-36 bg-black border-slate-500 border"})]})]})})})}function ve(r){var n=r,{className:e}=n,t=g(n,["className"]);const[a,l]=D(U);return c("label",p(f({className:x("flex items-center space-x-2 select-none",e)},t),{children:[o("input",{className:"w-4 h-4 text-slate-500 bg-purple-200 focus:ring-slate-500 focus:ring-offset-1 rounded",type:"checkbox",checked:a,onChange:s=>l(s.target.checked)}),o("div",{className:"",children:"show gray"})]}))}function xe(r){var n=r,{className:e}=n,t=g(n,["className"]);const a=E(S);return o("div",p(f({className:x("w-6 h-6 pt-px text-sm text-center font-bold font-serif text-slate-700 bg-slate-300 border-slate-500 border rounded-md active:scale-[.97] cursor-pointer",e),title:"info",onClick:()=>a(1)},t),{children:"i"}))}function Ne(){const e=h(I);return c("div",{className:"h-full flex flex-col",children:[o(de,{}),c("div",{className:"flex flex-col space-y-2",children:[c("div",{className:"h-32 self-center flex space-x-2",children:[o(se,{}),c("div",{className:"flex flex-col justify-between",children:[o(xe,{}),o(pe,{})]})]}),o("div",{className:"flex flex-col justify-between",children:e&&o(ve,{className:""})})]}),c("div",{className:"flex-1 flex flex-col justify-center gap-y-4",children:[o("div",{className:"flex items-center justify-center",children:o(ue,{})}),o("div",{children:o(be,{})})]})]})}const we=e=>o("div",f({className:"fixed inset-0 z-[1040] bg-black opacity-40"},e)),ye="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1040] focus:outline-none";function Ae({children:e,allowClickOutside:t,show:r,setShow:n}){return o(k,{children:r&&o(Z,{className:ye,show:r,onHide:()=>{t&&n(!1)},onEscapeKeyDown:()=>n(!1),renderBackdrop:we,"aria-labelledby":"modal-label",container:document.getElementById("portal"),children:v.cloneElement(e,{setShow:n})})})}function De({editorData:e,setShow:t=r=>{}}){return c("div",{className:x("max-w-[460px] max-h-[640px] bg-gray-200 rounded overflow-hidden","grid grid-rows-[min-content,1fr,min-content]"),children:[o("div",{className:"px-2 py-3 text-xl font-bold leading-tight tracking-tight border-slate-500 border-b",children:"Help"}),c("div",{className:"min-w-[16rem] min-h-[6rem] p-2 text-sm",children:[c("div",{className:"",children:["TODO: Show help for topic: ",e]}),o("div",{className:"",children:"TODO: github link"})]}),o("div",{className:"p-3 flex items-center justify-end",children:o("button",{className:"px-3 py-2 border-slate-500 border rounded",onClick:()=>t(!1),children:"Close"})})]})}function ke(){const[e,t]=D(S);return o(k,{children:e&&o(Ae,{show:!0,setShow:r=>!r&&t(null),allowClickOutside:!0,children:o(De,{editorData:e})})})}function Ie(){return o(ke,{})}function Ce(){return c(k,{children:[o(ae,{}),o("div",{className:"h-screen bg-white bg-gradient-to-t from-sky-700/70 via-sky-700/50 to-sky-700/70 p-4",children:o(Ne,{})}),o(Ie,{})]})}X.render(o(v.StrictMode,{children:o(Ce,{})}),document.getElementById("root"));
