/* Pull-to-refresh drop-in. Include: <script src="ptr.js" defer></script>
   Based on /workspace/ops/ptr/ptr.js, plus (Miles Agent): ignores touches that start on
   [data-ptr-ignore], .card, inputs and textareas; requires every scrollable ancestor to be at
   its top (app-shell pages scroll inside a div); ignores sideways drags and any gesture that scrolls a carousel. */
(function(){
  var html=document.documentElement;
  html.style.overscrollBehaviorY='auto';
  if(document.body)document.body.style.overscrollBehaviorY='auto';
  var y0=null,x0=0,d=0,T=70,ok=false,ind=document.createElement('div');
  ind.setAttribute('aria-hidden','true');
  ind.style.cssText='position:fixed;top:0;left:50%;z-index:99999;width:36px;height:36px;margin-left:-18px;border-radius:50%;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.15);display:flex;align-items:center;justify-content:center;transform:translateY(-48px);transition:none;pointer-events:none';
  ind.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/></svg>';
  function add(){document.body.appendChild(ind);}
  document.body?add():document.addEventListener('DOMContentLoaded',add);
  function atTop(t){if((window.scrollY||html.scrollTop)>0)return false;
    for(var e=t;e&&e!==document.body&&e!==html;e=e.parentElement){if(e.scrollTop>0)return false;}return true;}
  function skip(t){return !!(t&&t.closest&&t.closest('[data-ptr-ignore],.card,input,textarea,select'));}
  var lock=null,sl=[];
  function lefts(t){var a=[];for(var e=t;e&&e!==html;e=e.parentElement)a.push([e,e.scrollLeft]);return a;}
  window.addEventListener('touchstart',function(e){var t=e.target;y0=(e.touches.length===1&&!skip(t)&&atTop(t))?e.touches[0].clientY:null;x0=y0===null?0:e.touches[0].clientX;d=0;ok=false;lock=null;sl=y0===null?[]:lefts(t);},{passive:true});
  window.addEventListener('touchmove',function(e){if(y0===null)return;var X=e.touches[0].clientX;d=e.touches[0].clientY-y0;
    if(lock===null&&(Math.abs(X-x0)>10||Math.abs(d)>10))lock=d>Math.abs(X-x0)?'v':'h';
    if(lock==='h'||sl.some(function(p){return p[0].scrollLeft!==p[1]})){y0=null;ok=false;ind.style.transform='translateY(-48px)';return;}
    if(e.touches.length!==1||d<=0||!atTop(e.target)){ok=false;ind.style.transform='translateY(-48px)';return;}
    ok=true;var p=Math.min(d/2,90);ind.style.transform='translateY('+(p-36)+'px) rotate('+(p*4)+'deg)';},{passive:true});
  function end(){if(y0===null){ind.style.transform='translateY(-48px)';return;}ind.style.transition='transform .2s';if(ok&&d/2>=T){ind.style.transform='translateY(16px)';setTimeout(function(){location.reload();},150);}else{ind.style.transform='translateY(-48px)';}setTimeout(function(){ind.style.transition='none';},220);y0=null;ok=false;}
  window.addEventListener('touchend',end,{passive:true});window.addEventListener('touchcancel',function(){y0=null;ok=false;ind.style.transform='translateY(-48px)';},{passive:true});
})();
