/* Noukatsu Personal game result bridge v0.1.0. Loaded after original scripts. */
(()=>{'use strict';
if(window.__noukatsuPersonalBridge)return;window.__noukatsuPersonalBridge=true;
let lastKey='',lastAt=0;
function notify(title,score,mode){const key=String(title)+'|'+String(score);if(key===lastKey&&Date.now()-lastAt<1500)return;lastKey=key;lastAt=Date.now();try{window.parent.postMessage({type:'NOUKATSU_GAME_RESULT',event:{title:String(title||'脳活ゲーム終了'),score:String(score||'完了'),mode:String(mode||'game')}},window.location.origin==='null'?'*':window.location.origin)}catch(e){console.warn('game bridge failed',e)}}
function wrap(){if(typeof window.showResultScreen!=='function')return false;const old=window.showResultScreen;if(old.__wbrWrapped)return true;const replacement=function(emoji,title,label,scoreText,comment,challengePoints){const result=old.apply(this,arguments);notify(title,`${label||'結果'}：${scoreText||''}${Number.isFinite(challengePoints)?'／ポイント '+challengePoints:''}`,window.currentMode||'game');return result};replacement.__wbrWrapped=true;window.showResultScreen=replacement;return true}
if(!wrap()){
const screen=document.getElementById('resultScreen');if(!screen)return;
const ob=new MutationObserver(()=>{if(screen.classList.contains('hidden')||screen.style.display==='none')return;const h=screen.querySelector('#resultTitle')?.textContent||'脳活ゲーム';const txt=screen.innerText.slice(0,140);notify(h,txt,'game')});ob.observe(screen,{attributes:true,attributeFilter:['class','style']});
}
})();
