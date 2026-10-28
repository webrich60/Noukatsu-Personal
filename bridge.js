/* 個人版への履歴・プロフィール連携：元ゲームロジックには触れません */
(()=>{'use strict';
if(window.__noukatsuPersonalBridge)return;window.__noukatsuPersonalBridge=true;
const dest=location.origin==='null'?'*':location.origin;let lastKey='',lastAt=0;
function notify(type,payload){try{window.parent.postMessage({type,...payload},dest)}catch(e){console.warn('脳活履歴連携:',e)}}
function resultTitle(emoji,title,label,scoreText,comment,points){
 const key=String(title)+'|'+String(scoreText);if(key===lastKey&&Date.now()-lastAt<1500)return;
 lastKey=key;lastAt=Date.now();
 const mode=typeof currentMode!=='undefined'?currentMode:'game';
 const level=typeof currentDifficulty!=='undefined'?currentDifficulty:'';
 notify('NOUKATSU_GAME_RESULT',{event:{title:String(title||'脳活ゲーム終了'),score:`${label||'結果'}：${scoreText||''}${Number.isFinite(points)?'／チャレンジポイント '+points:''}`,mode:String(mode||'game'),level:String(level||'')}});
}
if(typeof window.showResultScreen==='function'){
 const previous=window.showResultScreen;
 window.showResultScreen=function(emoji,title,label,scoreText,comment,points){const value=previous.apply(this,arguments);resultTitle(emoji,title,label,scoreText,comment,points);return value;};
}
window.addEventListener('message',e=>{
 if(e.source!==window.parent||e.origin!==location.origin||e.data?.type!=='NOUKATSU_PERSONAL_PROFILE')return;
 const p=e.data.profile;if(!p||typeof p.name!=='string')return;
 try{if(typeof userProfile!=='undefined'){userProfile.name=p.name.slice(0,18);userProfile.age=Number(p.age)||null;if(typeof updateUserDisplay==='function')updateUserDisplay();}}catch(err){console.warn(err)}
});
if(typeof window.saveUserProfile==='function'){
 const previousSave=window.saveUserProfile;
 window.saveUserProfile=function(){const r=previousSave.apply(this,arguments);try{notify('NOUKATSU_PROFILE_UPDATED',{profile:{name:userProfile.name||'',age:userProfile.age||''}})}catch(e){}return r;};
}
})();
