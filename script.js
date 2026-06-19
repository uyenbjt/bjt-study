let qs=[];
let idx=0;
let correct=0;
let answered=0;

fetch('BJT - quiz.csv')
.then(r=>r.text())
.then(t=>{

const rows=t.trim().split(/\r?\n/);

rows.shift();

qs=rows.map(r=>{

const c=r.split(',');

return{
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
exp:c||'',
reading:c||'',
trans:c||''
};

});

render();

});

function render(){

if(!qs.length)return;

const q=qs[idx];

document.getElementById('qnum').textContent=
`Câu ${idx+1}/${qs.length}`;

document.getElementById('question').textContent=
q.q;

document.getElementById('answers').innerHTML='';

['A','B','C','D'].forEach((k,i)=>{

const btn=document.createElement('button');

btn.className='ans';

btn.textContent=`${k}. ${q[k]}`;

btn.onclick=()=>check(i+1,q,btn);

document.getElementById('answers').appendChild(btn);

});

document.getElementById('result').innerHTML='';

document.getElementById('detail').innerHTML='';

document.getElementById('stats').textContent=
`Đã trả lời: ${answered} | Đúng: ${correct}`;

}

function check(v,q,btn){

answered++;

if(String(v)===String(q.ans)){

correct++;

btn.classList.add('correct');

document.getElementById('result').innerHTML='✅ Đúng';

}else{

btn.classList.add('wrong');

document.getElementById('result').innerHTML=
'❌ Sai. Đáp án: '+['A','B','C','D'][q.ans-1];

}

document.getElementById('detail').innerHTML=

'📖 Cách đọc:<br>'+q.reading+

'<br><br>🇻🇳 Dịch:<br>'+q.trans+

'<br><br>💡 Giải thích:<br>'+q.exp;

document.getElementById('stats').textContent=
`Đã trả lời: ${answered} | Đúng: ${correct}`;

}

document.getElementById('nextBtn').onclick=()=>{

if(idx<qs.length-1){

idx++;

render();

}

};

document.getElementById('prevBtn').onclick=()=>{

if(idx>0){

idx--;

render();

}

};
