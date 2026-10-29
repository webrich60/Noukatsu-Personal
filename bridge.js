/* 個人版への履歴・プロフィール連携：元ゲームロジックには触れません */
(()=>{'use strict';
if(window.__noukatsuPersonalBridge)return;window.__noukatsuPersonalBridge=true;
const dest=location.origin==='null'?'*':location.origin;
function notify(type,payload){try{window.parent.postMessage({type,...payload},dest)}catch(e){console.warn('個人プロフィール連携:',e)}}
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
