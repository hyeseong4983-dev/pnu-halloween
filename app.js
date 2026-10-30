const endpoint='https://rtrocwkiuzwwqmjqodse.supabase.co/rest/v1/halloween_events';
const key='sb_publishable_n_48LaQDdszWb9Ill8I4Tw_pMcoUEH1';
let sessionId; try {sessionId=sessionStorage.getItem('pnu_session'); if(!sessionId){sessionId=crypto.randomUUID();sessionStorage.setItem('pnu_session',sessionId)}} catch {sessionId=crypto.randomUUID()}
const params=new URLSearchParams(location.search); const attribution=Object.fromEntries(['utm_source','utm_medium','utm_campaign'].filter(k=>params.has(k)).map(k=>[k,params.get(k).slice(0,100)]));
function track(event_name,button_id=null,properties={}){fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json',apikey:key,Authorization:`Bearer ${key}`,Prefer:'return=minimal'},body:JSON.stringify({session_id:sessionId,event_name,button_id,properties}),keepalive:true}).catch(()=>{})}
track('page_view',null,attribution);
document.addEventListener('click',e=>{const target=e.target.closest('[data-track]');if(target)track('button_click',target.dataset.track)});
const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){track('ticket_view');observer.disconnect()}},{threshold:.25});observer.observe(document.querySelector('#ticket'));
const dialog=document.querySelector('#checkout');document.querySelector('#open-checkout').addEventListener('click',()=>{track('checkout_start');document.querySelector('#checkout-step').hidden=false;document.querySelector('#success-step').hidden=true;dialog.showModal()});document.querySelector('#complete').addEventListener('click',()=>{track('demo_complete');document.querySelector('#checkout-step').hidden=true;document.querySelector('#success-step').hidden=false});document.querySelector('#finish').addEventListener('click',()=>dialog.close());
