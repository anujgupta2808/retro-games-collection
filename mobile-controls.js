// Mobile Controls & Responsive Canvas
function setupMobile(){
 const meta=document.createElement('meta');
 meta.name='viewport';
 meta.content='width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no';
 document.head.appendChild(meta);
 
 const canvas=document.getElementById('game');
 if(!canvas)return;
 
 function resize(){
  const w=window.innerWidth;
  const h=window.innerHeight;
  const ratio=Math.min(w/800,h/600);
  canvas.style.width=800*ratio+'px';
  canvas.style.height=600*ratio+'px';
 }
 resize();
 window.addEventListener('resize',resize);
 
 const style=document.createElement('style');
 style.textContent=`.mobile-btn{position:fixed;width:70px;height:70px;background:rgba(255,255,255,0.3);border:3px solid rgba(255,255,255,0.6);border-radius:50%;display:none;align-items:center;justify-content:center;font-size:32px;user-select:none;touch-action:none;}@media(max-width:768px){.mobile-btn{display:flex;}}`;
 document.head.appendChild(style);
 
 if('ontouchstart' in window){
  const btns={
   left:createBtn('←','auto','auto','120px','20px'),
   right:createBtn('→','auto','auto','120px','110px'),
   up:createBtn('↑','auto','110px','120px','auto'),
   down:createBtn('↓','auto','20px','120px','auto'),
   action:createBtn('A','auto','20px','20px','auto')
  };
  
  function createBtn(txt,t,r,b,l){
   const btn=document.createElement('div');
   btn.className='mobile-btn';
   btn.textContent=txt;
   btn.style.top=t;
   btn.style.right=r;
   btn.style.bottom=b;
   btn.style.left=l;
   document.body.appendChild(btn);
   return btn;
  }
  
  function press(key){
   window.keys=window.keys||{};
   window.keys[key]=true;
   window.dispatchEvent(new KeyboardEvent('keydown',{key}));
  }
  
  function release(key){
   if(window.keys)window.keys[key]=false;
   window.dispatchEvent(new KeyboardEvent('keyup',{key}));
  }
  
  btns.left.addEventListener('touchstart',e=>{e.preventDefault();press('ArrowLeft');});
  btns.left.addEventListener('touchend',e=>{e.preventDefault();release('ArrowLeft');});
  btns.right.addEventListener('touchstart',e=>{e.preventDefault();press('ArrowRight');});
  btns.right.addEventListener('touchend',e=>{e.preventDefault();release('ArrowRight');});
  btns.up.addEventListener('touchstart',e=>{e.preventDefault();press('ArrowUp');});
  btns.up.addEventListener('touchend',e=>{e.preventDefault();release('ArrowUp');});
  btns.down.addEventListener('touchstart',e=>{e.preventDefault();press('ArrowDown');});
  btns.down.addEventListener('touchend',e=>{e.preventDefault();release('ArrowDown');});
  btns.action.addEventListener('touchstart',e=>{e.preventDefault();press(' ');});
  btns.action.addEventListener('touchend',e=>{e.preventDefault();release(' ');});
 }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setupMobile);
else setupMobile();
