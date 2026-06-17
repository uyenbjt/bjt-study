let qs=[],filtered=[],idx=0,correct=0,answered=0;
let wrongQuestions=[];
fetch('BJT - quiz.csv').then(r=>r.text()).then(t=>{
const rows=t.trim().split(/\r?\n/);
const h=rows.shift();
qs=rows.map(r=>{
 const c=r.split(',');
 return {id:c[0],cat:c[1],part:c[2],sec:c[3],q:c[4],A:c[5],B:c[6],C:c[7],D:c[8],ans:c[9],exp:c.slice(10).join(',')};
});
const secs=[...new Set(qs.map(x=>x.sec))];
const s=document.getElementById('sectionFilter');
secs.forEach(v=>{let o=document.createElement('option');o.value=v;o.textContent=v;s.appendChild(o);});
filtered=qs; render();
});
function render(){
let q=filtered[idx]; if(!q)return;
qnum.textContent=`Câu ${idx+1}/${filtered.length}`;
question.textContent=q.q;
answers.innerHTML='';
['A','B','C','D'].forEach((k,i)=>{
 let b=document.createElement('button'); b.className='ans'; b.textContent=`${k}. ${q[k]}`;
 b.onclick=()=>check(i+1,q,b);
 answers.appendChild(b);
});
result.textContent=''; exp.textContent='';
stats.textContent=`Đã trả lời: ${answered} | Đúng: ${correct}`;
}
function check(v,q,b){
answered++;
if(String(v)===String(q.ans)){correct++;b.classList.add('correct');result.textContent='✅ Đúng'}
else {
 b.classList.add('wrong');

 if(!wrongQuestions.includes(q.id)){
   wrongQuestions.push(q.id);
 }

 result.textContent='❌ Sai. Đáp án: '+['A','B','C','D'][q.ans-1];
}
exp.textContent=q.exp;
stats.textContent=`Đã trả lời: ${answered} | Đúng: ${correct}`;
}
nextBtn.onclick=()=>{if(idx<filtered.length-1)idx++;render();}
prevBtn.onclick=()=>{if(idx>0)idx--;render();}
randomBtn.onclick=()=>{idx=Math.floor(Math.random()*filtered.length);render();}
sectionFilter.onchange=e=>{filtered=e.target.value?qs.filter(x=>x.sec===e.target.value):qs;idx=0;render();}
