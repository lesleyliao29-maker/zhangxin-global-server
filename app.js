
const DATA_URL='https://raw.githubusercontent.com/arstgit/high-frequency-vocabulary/refs/heads/master/30k-explained.txt';
const fallbackWords=[
['hello','həˈləʊ','你好'],['yes','jes','是；好的'],['no','nəʊ','不；不是'],['please','pliːz','请'],['thanks','θæŋks','谢谢'],
['sorry','ˈsɒri','对不起'],['help','help','帮助'],['water','ˈwɔːtə','水'],['food','fuːd','食物'],['money','ˈmʌni','钱'],
['hotel','həʊˈtel','酒店'],['airport','ˈeəpɔːt','机场'],['taxi','ˈtæksi','出租车'],['train','treɪn','火车'],['bus','bʌs','公交车'],
['ticket','ˈtɪkɪt','票'],['passport','ˈpɑːspɔːt','护照'],['luggage','ˈlʌɡɪdʒ','行李'],['room','ruːm','房间'],['key','kiː','钥匙'],
['phone','fəʊn','手机；电话'],['restaurant','ˈrestrɒnt','餐厅'],['coffee','ˈkɒfi','咖啡'],['tea','tiː','茶'],['rice','raɪs','米饭'],
['meat','miːt','肉'],['chicken','ˈtʃɪkɪn','鸡肉'],['beef','biːf','牛肉'],['fish','fɪʃ','鱼'],['bill','bɪl','账单'],
['price','praɪs','价格'],['cheap','tʃiːp','便宜的'],['expensive','ɪkˈspensɪv','贵的'],['left','left','左边'],['right','raɪt','右边'],
['straight','streɪt','直走'],['where','weə','哪里'],['when','wen','什么时候'],['what','wɒt','什么'],['how','haʊ','怎样'],
['I','aɪ','我'],['you','juː','你；你们'],['we','wiː','我们'],['want','wɒnt','想要'],['need','niːd','需要'],
['like','laɪk','喜欢'],['go','ɡəʊ','去'],['come','kʌm','来'],['eat','iːt','吃'],['drink','drɪŋk','喝'],
['sleep','sliːp','睡觉'],['buy','baɪ','买'],['pay','peɪ','支付'],['card','kɑːd','卡'],['cash','kæʃ','现金'],
['doctor','ˈdɒktə','医生'],['hospital','ˈhɒspɪtl','医院'],['medicine','ˈmedɪsɪn','药'],['police','pəˈliːs','警察'],['lost','lɒst','丢失的；迷路的'],
['today','təˈdeɪ','今天'],['tomorrow','təˈmɒrəʊ','明天'],['now','naʊ','现在'],['morning','ˈmɔːnɪŋ','早晨'],['night','naɪt','夜晚'],
['good','ɡʊd','好的'],['bad','bæd','坏的'],['big','bɪɡ','大的'],['small','smɔːl','小的'],['hot','hɒt','热的'],
['cold','kəʊld','冷的'],['happy','ˈhæpi','开心的'],['tired','ˈtaɪəd','累的'],['hungry','ˈhʌŋɡri','饿的'],['busy','ˈbɪzi','忙的']
].map((x,i)=>({word:x[0],phonetic:x[1],meaning:x[2],rank:i+1}));

const scenes=[
{id:'starter',name:'新手村',en:'Starter',emoji:'🌱',need:0,desc:'先认识最常用的生存词'},
{id:'airport',name:'机场',en:'Airport',emoji:'✈️',need:30,desc:'值机、安检、登机、入境'},
{id:'hotel',name:'酒店',en:'Hotel',emoji:'🏨',need:60,desc:'入住、Wi-Fi、房间问题'},
{id:'restaurant',name:'餐厅',en:'Restaurant',emoji:'🍔',need:90,desc:'看菜单、点餐、结账'},
{id:'transport',name:'交通',en:'Transportation',emoji:'🚇',need:120,desc:'地铁、公交、打车、问路'},
{id:'shopping',name:'购物',en:'Shopping',emoji:'🛍️',need:160,desc:'尺码、价格、付款、退货'},
{id:'hospital',name:'医院',en:'Hospital',emoji:'🏥',need:220,desc:'身体不适、药店、求助'},
{id:'social',name:'社交',en:'Social',emoji:'💬',need:280,desc:'认识朋友、聊天、表达自己'},
{id:'living',name:'国外生活',en:'Living Abroad',emoji:'🏡',need:360,desc:'租房、手机卡、日常事务'},
{id:'work',name:'工作',en:'Work',emoji:'💼',need:450,desc:'请假、沟通、开会、邮件'},
{id:'emergency',name:'紧急区域',en:'Emergency',emoji:'🆘',need:520,desc:'丢东西、报警、求医'},
{id:'world',name:'国际服玩家',en:'Global Player',emoji:'🌍',need:650,desc:'把英语真正带进生活'}
];

const sceneQuestions={
starter:[
{q:'别人对你说 “Hello!” 你最自然的回应是？',a:['Hello!','No.','Water.'],ok:0},
{q:'你想礼貌地说“谢谢”，应该选？',a:['Sorry.','Thanks.','Help.'],ok:1},
{q:'你需要帮助，最重要的一句是？',a:['I need help.','I am coffee.','I like taxi.'],ok:0}
],
airport:[
{q:'工作人员说 “Passport, please.” 她要什么？',a:['你的护照','你的行李','你的手机'],ok:0},
{q:'你要办理登机手续，可以说？',a:['I want to check in.','I want to sleep.','I need coffee.'],ok:0},
{q:'你想问登机口在哪里？',a:['Where is the gate?','How is the gate?','What is coffee?'],ok:0}
],
hotel:[
{q:'你有预订，入住时最实用的是？',a:['I have a reservation.','I have a restaurant.','I am a room.'],ok:0},
{q:'Wi‑Fi 坏了，你可以说？',a:["The Wi-Fi isn't working.","The Wi-Fi is food.","I am Wi-Fi."],ok:0},
{q:'你想要另一条毛巾？',a:['Can I have another towel?','Can I have a taxi?','Where is the airport?'],ok:0}
],
restaurant:[
{q:'两个人到餐厅，你可以说？',a:['A table for two, please.','Two airport, please.','I am two.'],ok:0},
{q:'结账时可以说？',a:['Could we have the bill?','I need a hotel.','Where is my passport?'],ok:0},
{q:'不要洋葱，可以说？',a:['No onions, please.','No hotel, please.','I am onion.'],ok:0}
]
};

const survival={
'迷路问路':[['I am lost.','我迷路了。'],['Where is the subway station?','地铁站在哪里？'],['How do I get there?','我怎么去那里？']],
'航班问题':[['My flight is delayed.','我的航班延误了。'],['Where is the boarding gate?','登机口在哪里？'],['I missed my flight.','我误机了。']],
'行李丢失':[['I lost my luggage.','我的行李丢了。'],['Where is the baggage claim?','行李提取处在哪里？'],['I need to report lost baggage.','我要申报行李丢失。']],
'身体不适':[['I do not feel well.','我不舒服。'],['I need a doctor.','我需要医生。'],['Where is the nearest hospital?','最近的医院在哪里？']],
'紧急求助':[['I need help.','我需要帮助。'],['Please call the police.','请报警。'],['This is an emergency.','这是紧急情况。']],
'其他问题':[['Could you speak more slowly?','你可以说慢一点吗？'],["I don't understand.",'我听不懂。'],['Could you say that again?','可以再说一遍吗？']]
};

let state=JSON.parse(localStorage.getItem('zxgs_state')||'null')||{
 name:'',xp:0,learned:[],wrong:[],completedScenes:[],tasks:{date:'',vocab:false,scene:false,listen:false},streak:0,lastStudy:''
};
let vocab=[...fallbackWords], currentLesson=[], lessonIndex=0, lessonKind='vocab';

function save(){localStorage.setItem('zxgs_state',JSON.stringify(state));updateUI()}
function dayKey(){return new Date().toISOString().slice(0,10)}
function checkDay(){
 const d=dayKey();
 if(state.tasks.date!==d){state.tasks={date:d,vocab:false,scene:false,listen:false}}
}
function level(){
 const n=state.learned.length;
 if(n<100)return ['Lv.1 英语新手',1];
 if(n<300)return ['Lv.2 日常生存',2];
 if(n<700)return ['Lv.3 出国旅行',3];
 if(n<1200)return ['Lv.4 独立生活',4];
 if(n<2000)return ['Lv.5 自然交流',5];
 return ['Lv.6 国际服玩家',6];
}
function toast(msg){const t=document.querySelector('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)}
function speak(text){if('speechSynthesis'in window){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=.86;speechSynthesis.speak(u)}}
function nav(name){
 document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
 const el=document.querySelector('#screen-'+name); if(el)el.classList.add('active');
 document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.nav===name));
 if(name==='map')renderMap(); if(name==='tasks')renderTasks(); if(name==='passport')renderPassport();
 if(name==='review')renderReview(); if(name==='survival')renderSurvival(); if(name==='achievements')renderAchievements(); if(name==='profile')updateUI();
 window.scrollTo({top:0,behavior:'smooth'});
}
document.addEventListener('click',e=>{
 const navBtn=e.target.closest('[data-nav]'); if(navBtn){nav(navBtn.dataset.nav);return}
 const act=e.target.closest('[data-action]'); if(act){startLesson(act.dataset.action);return}
});

async function loadData(){
 try{
  const r=await fetch(DATA_URL,{cache:'force-cache'}); if(!r.ok)throw 0;
  const txt=await r.text(); const lines=txt.split(/\r?\n/); const out=[];
  for(let i=0;i<lines.length-2 && out.length<3000;i++){
    const m=lines[i].match(/^(.*?)\s+(\d+)$/);
    if(m && +m[2]===out.length+1){
      const word=m[1].trim(); const ph=(lines[i+1]||'').trim().split(/\s{2,}/)[0]; const meaning=(lines[i+2]||'').trim();
      if(word && meaning)out.push({word,phonetic:ph,meaning,rank:+m[2]});
    }
  }
  if(out.length>1000){vocab=out;localStorage.setItem('zxgs_vocab_count',String(out.length));toast('3000 高频词库已载入 ✨')}
 }catch(e){console.warn('using fallback vocabulary')}
}

function updateUI(){
 checkDay();
 const [lv]=level(); const name=state.name||'未命名';
 const vals={passportName:name,passportLevel:lv,homeWords:state.learned.length,homeXp:state.xp,homeStreak:state.streak,pWords:state.learned.length,pStreak:state.streak,
 pTasks:[state.tasks.vocab,state.tasks.scene,state.tasks.listen].filter(Boolean).length+'/3',
 fullPassportName:name,fullPassportLevel:lv,passportSignature:state.name||'—',
 profileName:state.name||'未创建英文名',profileLevel:lv,profileWords:state.learned.length,profileXp:state.xp,profileScenes:state.completedScenes.length,profileStreak:state.streak};
 Object.entries(vals).forEach(([id,v])=>{const el=document.getElementById(id);if(el)el.textContent=v});
 const pct=Math.min(100,state.learned.length/3000*100);document.getElementById('passportProgress').style.width=Math.max(3,pct)+'%';
 document.getElementById('welcomeText').textContent=state.name?`Welcome back, ${state.name}。今天再解锁一点点。`:'从零开始，把英语一点点装进你的国际服。';
 renderHomeIslands();
}
function renderHomeIslands(){
 const box=document.getElementById('homeIslands'); if(!box)return;
 box.innerHTML=scenes.slice(0,5).map(s=>`<button class="island ${state.learned.length>=s.need?'unlocked':''}" onclick="openScene('${s.id}')">
 <span class="lock">${state.learned.length>=s.need?'OPEN':'🔒 '+s.need+'词'}</span><span class="emoji">${s.emoji}</span><b>${s.name}</b><small>${s.en}</small></button>`).join('');
}
function renderMap(){
 document.getElementById('mapBoard').innerHTML=scenes.map(s=>`<button class="map-island ${state.learned.length>=s.need?'unlocked':''}" onclick="openScene('${s.id}')">
 <span class="lock">${state.learned.length>=s.need?'✓ 已解锁':'🔒 '+s.need+'词'}</span><span class="emoji">${s.emoji}</span><b>${s.name}</b><small>${s.en}</small><div class="status">${s.desc}</div></button>`).join('');
}
function renderTasks(){
 checkDay(); const data=[
 ['🔤','学习 10 个新单词','vocab',state.tasks.vocab],
 ['🗺️','完成 1 个场景对话','scene',state.tasks.scene],
 ['🎧','完成 1 次听力挑战','listen',state.tasks.listen]
 ];
 document.getElementById('taskGrid').innerHTML=data.map(x=>`<div class="task ${x[3]?'done':''}"><div class="icon">${x[0]}</div><h3>${x[1]}</h3><p>${x[3]?'今天已经完成啦 ✨':'完成即可获得 XP 和护照进度。'}</p><button class="${x[3]?'secondary':'primary'}" data-action="${x[2]}">${x[3]?'再来一次':'去完成 →'}</button></div>`).join('');
}
function renderPassport(){
 document.getElementById('stampWall').innerHTML=state.completedScenes.length?state.completedScenes.map(id=>{const s=scenes.find(x=>x.id===id);return `<div class="stamp">${s?.en||id}<br>GOOD JOB!</div>`}).join(''):'<div style="color:#7d86a4">还没有通关印章。去地图完成第一个场景吧 ✈</div>';
 updateUI();
}
function renderReview(){
 const list=state.wrong.slice(-30).reverse();
 document.getElementById('reviewList').innerHTML=list.length?list.map(w=>`<div class="review-item"><div><b>${w.word}</b><br><span>${w.meaning}</span></div><button class="speaker" onclick="speak('${String(w.word).replace(/'/g,"\\'")}')">🔊</button><span>再练一次</span></div>`).join(''):'<div style="padding:30px;text-align:center;color:#7d86a4">目前没有错词。继续闯关吧 ♡</div>';
}
function renderSurvival(cat=Object.keys(survival)[0]){
 document.getElementById('survivalCats').innerHTML=Object.keys(survival).map(c=>`<button class="cat-btn ${c===cat?'active':''}" onclick="renderSurvival('${c}')">${c}</button>`).join('');
 document.getElementById('survivalPhrases').innerHTML=survival[cat].map(p=>`<div class="phrase"><b>${p[0]}</b><p>${p[1]}</p><button class="secondary" onclick="speak('${p[0].replace(/'/g,"\\'")}')">🔊 播放英文</button></div>`).join('');
}
function renderAchievements(){
 const a=[
 ['🌱','国际服启动','创建英文名',!!state.name],['⭐','第一颗星','累计 50 XP',state.xp>=50],['🧠','100 词玩家','掌握 100 个词',state.learned.length>=100],
 ['✈️','机场通关','完成 Airport','airport'.includes('airport')&&state.completedScenes.includes('airport')],['🍽️','餐厅通关','完成 Restaurant',state.completedScenes.includes('restaurant')],
 ['🔥','连续 7 天','连续学习七天',state.streak>=7],['🗺️','地图达人','通关 5 个场景',state.completedScenes.length>=5],['🌍','国际服玩家','掌握 2000 词',state.learned.length>=2000]
 ];
 document.getElementById('achievementGrid').innerHTML=a.map(x=>`<div class="achievement ${x[3]?'earned':''}"><div class="medal">${x[0]}</div><b>${x[1]}</b><small>${x[2]}</small></div>`).join('');
}
function studyTouch(){
 const d=dayKey();
 if(state.lastStudy!==d){
   const yesterday=new Date(Date.now()-86400000).toISOString().slice(0,10);
   state.streak=state.lastStudy===yesterday?state.streak+1:1; state.lastStudy=d;
 }
}
function startLesson(kind){
 if(!state.name){nav('onboarding');return}
 lessonKind=kind;
 if(kind==='scene'){openScene(state.learned.length<30?'starter':'airport');return}
 let pool=vocab.filter(w=>!state.learned.includes(w.word));
 if(kind==='review' && state.wrong.length)pool=state.wrong;
 currentLesson=(pool.length?pool:vocab).slice(0,10);lessonIndex=0;
 document.getElementById('lessonMode').textContent=kind==='listen'?'听力挑战':kind==='speak'?'口语开口':'单词学习';
 document.getElementById('lessonTitle').textContent=kind==='listen'?'听一听，选出你听到的内容':kind==='speak'?'跟着读，把英语说出来':'今日基础高频词';
 nav('learn');renderLesson();
}
function renderLesson(){
 const w=currentLesson[lessonIndex]; if(!w){finishLesson();return}
 document.getElementById('lessonProgress').style.width=(lessonIndex/currentLesson.length*100)+'%';
 const safe=w.word.replace(/'/g,"\\'");
 if(lessonKind==='listen'){
   const options=[w,...vocab.filter(x=>x.word!==w.word).sort(()=>Math.random()-.5).slice(0,2)].sort(()=>Math.random()-.5);
   document.getElementById('lessonArea').innerHTML=`<div class="learn-card"><div class="visual">🎧</div><h3>你听到的是哪个单词？</h3><button class="listen-button" onclick="speak('${safe}')">▶</button><div class="choice-grid">${options.map(o=>`<button class="choice" onclick="answerChoice(this,'${o.word.replace(/'/g,"\\'")}','${safe}')">${o.word}</button>`).join('')}</div></div>`;
   setTimeout(()=>speak(w.word),250);
 }else if(lessonKind==='speak'){
   document.getElementById('lessonArea').innerHTML=`<div class="learn-card"><div class="visual">🎙️</div><div class="word">${w.word}</div><div class="phonetic">/${w.phonetic||''}/</div><div class="meaning">${cleanMeaning(w.meaning)}</div><button class="listen-button" onclick="speak('${safe}')">🔊</button><p>先听，再跟着读三遍。读完点「我读完了」。</p><div class="lesson-actions"><button class="primary" onclick="markLearned('${safe}',true)">我读完了 →</button></div></div>`;
 }else{
   const choices=[w,...vocab.filter(x=>x.word!==w.word).sort(()=>Math.random()-.5).slice(0,2)].sort(()=>Math.random()-.5);
   document.getElementById('lessonArea').innerHTML=`<div class="learn-card"><div class="visual">${wordEmoji(w.word)}</div><div class="word">${w.word}<button class="speaker" onclick="speak('${safe}')">🔊</button></div><div class="phonetic">/${w.phonetic||''}/</div><div class="choice-grid">${choices.map(o=>`<button class="choice" onclick="answerMeaning(this,'${o.word.replace(/'/g,"\\'")}','${safe}')">${cleanMeaning(o.meaning)}</button>`).join('')}</div><div class="lesson-actions"><button class="secondary" onclick="markLearned('${safe}',false)">不熟悉</button></div></div>`;
 }
}
function cleanMeaning(x){return String(x||'').replace(/^[a-z. ]+\s*/i,'').split(',')[0].slice(0,78)}
function wordEmoji(w){
 const m={airport:'✈️',hotel:'🏨',coffee:'☕',water:'💧',food:'🍜',money:'💳',phone:'📱',taxi:'🚕',train:'🚆',bus:'🚌',passport:'🛂',luggage:'🧳',doctor:'🩺',hospital:'🏥',rice:'🍚',fish:'🐟',chicken:'🍗',home:'🏠',book:'📘',car:'🚗'};
 return m[w.toLowerCase()]||'✨';
}
function answerMeaning(btn,chosen,correct){document.querySelectorAll('.choice').forEach(b=>b.disabled=true);const ok=chosen===correct;btn.classList.add(ok?'correct':'wrong'); if(ok){setTimeout(()=>markLearned(correct,true),550)}else{const w=currentLesson[lessonIndex];state.wrong.push(w);state.xp=Math.max(0,state.xp-1);save();setTimeout(()=>markLearned(correct,false),650)}}
function answerChoice(btn,chosen,correct){answerMeaning(btn,chosen,correct)}
function markLearned(word,known){
 const w=currentLesson[lessonIndex]; if(known && !state.learned.includes(word)){state.learned.push(word);state.xp+=5}
 if(!known && w){state.wrong.push(w)}
 studyTouch(); save();lessonIndex++;renderLesson();
}
function finishLesson(){
 state.tasks[lessonKind==='listen'?'listen':'vocab']=true;state.xp+=10;save();toast('完成！+10 XP ✨');nav('tasks');
}
function openScene(id){
 if(!state.name){nav('onboarding');return}
 const s=scenes.find(x=>x.id===id); if(state.learned.length<s.need){toast(`还差 ${s.need-state.learned.length} 个词解锁 ${s.name}`);return}
 const qs=sceneQuestions[id]||sceneQuestions.starter; lessonKind='scene';currentLesson=qs;lessonIndex=0;nav('learn');
 document.getElementById('lessonMode').textContent='场景闯关';document.getElementById('lessonTitle').textContent=`${s.emoji} ${s.name} · ${s.en}`;
 renderSceneQuestion(id);
}
function renderSceneQuestion(id){
 const q=currentLesson[lessonIndex];if(!q){completeScene(id);return}
 document.getElementById('lessonProgress').style.width=(lessonIndex/currentLesson.length*100)+'%';
 document.getElementById('lessonArea').innerHTML=`<div class="learn-card"><div class="visual">${scenes.find(x=>x.id===id)?.emoji||'🗺️'}</div><h3 style="font-size:25px">${q.q}</h3><div class="choice-grid">${q.a.map((a,i)=>`<button class="choice" onclick="sceneAnswer(this,${i},${q.ok},'${id}')">${a}</button>`).join('')}</div></div>`;
}
function sceneAnswer(btn,i,ok,id){
 document.querySelectorAll('.choice').forEach(b=>b.disabled=true);
 btn.classList.add(i===ok?'correct':'wrong'); if(i===ok)state.xp+=8; else state.xp+=2;
 save();setTimeout(()=>{lessonIndex++;renderSceneQuestion(id)},650);
}
function completeScene(id){
 if(!state.completedScenes.includes(id))state.completedScenes.push(id);state.tasks.scene=true;state.xp+=30;studyTouch();save();toast('场景通关！护照已盖章 ✨');nav('passport');
}

document.getElementById('startBtn').onclick=()=>state.name?nav('map'):nav('onboarding');
document.getElementById('createIdentity').onclick=()=>{
 const n=document.getElementById('englishNameInput').value.trim();
 if(!n){toast('先给自己起一个英文名吧 ♡');return}
 state.name=n;state.xp+=20;save();toast(`Welcome, ${n}!`);nav('passport');
};
document.querySelectorAll('.style-pill').forEach(b=>b.onclick=()=>{document.querySelectorAll('.style-pill').forEach(x=>x.classList.remove('active'));b.classList.add('active')});
document.getElementById('startReview').onclick=()=>{lessonKind='review';currentLesson=state.wrong.length?state.wrong.slice(-10):vocab.slice(0,10);lessonIndex=0;nav('learn');document.getElementById('lessonMode').textContent='错词复习';document.getElementById('lessonTitle').textContent='再见一次，就更容易记住';renderLesson()};
document.getElementById('renameBtn').onclick=()=>{const n=prompt('输入新的英文名：',state.name||'');if(n&&n.trim()){state.name=n.trim();save();toast('英文名已更新')}};
document.getElementById('resetBtn').onclick=()=>{if(confirm('确定清空这台设备上的全部学习记录吗？')){localStorage.removeItem('zxgs_state');location.reload()}};

checkDay();updateUI();renderSurvival();loadData();
