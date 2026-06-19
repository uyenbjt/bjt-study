let qs=[],filtered=[],idx=0,correct=0,answered=0;
let wrongQuestions=[];

fetch('BJT - quiz.csv')
.then(r=>r.text())
.then(t=>{

const rows=t.trim().split(/\r?\n/);
rows.shift();

qs=rows.map(r=>{
const c=r.split(',');
return {
id:c,
cat:c,
part:c,
sec:c,
q:c,
A:c,
B:c,
C:c,
D:c,
ans:c,
exp:c || '',
reading:c || '',
trans:c || ''
};
});

const secs=[...new Set(qs.map(x=>x.sec))];
const cats=[...new Set(qs.map(x=>x.cat))];

const cat=document.getElementById('categoryFilter');
cats.forEach(v=>{
let o=document.createElement('option');
o.value=v;
o.textContent=v;
cat.appendChild(o);
});

const sec=document.getElementById('sectionFilter');
secs.forEach(v=>{
let o=document.createElement('option');
o.value=v;
o.textContent=v;
sec.appendChild(o);
});

filtered=qs;
render();

});

function render(){

let q=filtered[idx];
if(!q) return;

qnum.textContent=`Câu ${idx+1}/${filtered.length}`;

question.textContent=q.q;

answers.innerHTML='';

['A','B','C','D'].forEach((k,i)=>{

let b=document.createElement('button');

b.className='ans';

b.textContent=`${k}. ${q[k]}`;

b.onclick=()=>check(i+1,q,b);

answers.appendChild(b);

});

result.textContent='';
exp.textContent='';

stats.textContent=`Đã trả lời: ${answered} | Đúng: ${correct}`;

}

function check(v,q,b){

answered++;

if(String(v)===String(q.ans)){

correct++;

b.classList.add('correct');

result.textContent='✅ Đúng';

}else{

b.classList.add('wrong');

if(!wrongQuestions.includes(q.id)){
wrongQuestions.push(q.id);
}

result.textContent='❌ Sai. Đáp án: '+['A','B','C','D'][q.ans-1];

}

exp.innerHTML=
'📖 Cách đọc: '+(q.reading||'')+
'<br><br>🇻🇳 Dịch: '+(q.trans||'')+
'<br><br>💡 Giải thích: '+(q.exp||'');

stats.textContent=`Đã trả lời: ${answered} | Đúng: ${correct}`;

}

nextBtn.onclick=()=>{
if(idx<filtered.length-1){
idx++;
render();
}
};

prevBtn.onclick=()=>{
if(idx>0){
idx--;
render();
}
};

randomBtn.onclick=()=>{

filtered=[...filtered];

for(let i=filtered.length-1;i>0;i--){
const j=Math.floor(Math.random()*(i+1));
[filtered[i],filtered[j]]=[filtered[j],filtered[i]];
}

idx=0;

render();

};

sectionFilter.onchange=e=>{
filtered=e.target.value
? qs.filter(x=>x.sec===e.target.value)
: qs;

idx=0;
render();
};

categoryFilter.onchange=e=>{
filtered=e.target.value
? qs.filter(x=>x.cat===e.target.value)
: qs;

idx=0;
render();
};

wrongBtn.onclick=()=>{
filtered=qs.filter(x=>wrongQuestions.includes(x.id));
idx=0;
render();
};
