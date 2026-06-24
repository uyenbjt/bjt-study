
let questions=[],filtered=[];
let idx=0;
let wrongQuestions=[];
let stats={answered:0,correct:0,wrong:0};

const questionTypeFilter=document.getElementById("questionTypeFilter");
const categoryFilter=document.getElementById("categoryFilter");
const sectionFilter=document.getElementById("sectionFilter");

function saveState(){
 localStorage.setItem("bjtStudy",JSON.stringify({
  idx,wrongQuestions,stats,
  filteredIds:filtered.map(q=>q.ID)
 }));
}

function loadState(){
 const s=localStorage.getItem("bjtStudy");
 if(!s) return;
 try{
  const d=JSON.parse(s);
  idx=d.idx||0;
  wrongQuestions=d.wrongQuestions||[];
  stats=d.stats||stats;
 }catch(e){}
}

function shuffle(arr){
 for(let i=arr.length-1;i>0;i--){
  const j=Math.floor(Math.random()*(i+1));
  [arr[i],arr[j]]=[arr[j],arr[i]];
 }
}

Papa.parse("BJT - quiz.csv",{
 download:true,
 header:true,
 skipEmptyLines:true,
 complete:function(res){
   questions=res.data;
   filtered=[...questions];
   buildFilters();
   loadState();
   render();
 }
});

function buildFilters(){

questionTypeFilter.innerHTML='<option value="">📚 Tất cả QuestionType</option>';
categoryFilter.innerHTML='<option value="">📂 Tất cả chủ đề</option>';
sectionFilter.innerHTML='<option value="">📂 Tất cả Section</option>';

const types=[...new Set(questions.map(q=>q.QuestionType))];
const secs=[...new Set(questions.map(q=>q.Section))];

types.forEach(v=>{
let o=document.createElement("option");
o.value=v;
o.textContent=v;
questionTypeFilter.appendChild(o);
});

secs.forEach(v=>{
let o=document.createElement("option");
o.value=v;
o.textContent=v;
sectionFilter.appendChild(o);
});

updateCategoryFilter();
}

function updateCategoryFilter(){

const type=questionTypeFilter.value;
const oldValue=categoryFilter.value;

const cats=[...new Set(
questions
.filter(q=>!type || q.QuestionType===type)
.map(q=>q.Category)
)];

categoryFilter.innerHTML='<option value="">📂 Tất cả chủ đề</option>';

cats.forEach(v=>{
let o=document.createElement("option");
o.value=v;
o.textContent=v;
categoryFilter.appendChild(o);
});

if(cats.includes(oldValue)){
categoryFilter.value=oldValue;
}

}


function applyFilters(){
 const type=questionTypeFilter.value;

 const cat=categoryFilter.value;
 const sec=sectionFilter.value;

 filtered=questions.filter(q=>
   (!type || q.QuestionType===type) &&
   (!cat || q.Category===cat) &&
   (!sec || q.Section===sec)
 );
 idx=0;
 render();
}

function render(){
 if(!filtered.length){
  question.innerHTML="Không có dữ liệu";
  return;
 }

 const q=filtered[idx];

 counter.innerHTML=`Câu ${idx+1}/${filtered.length}`;
 question.innerHTML=q.Question;

 answers.innerHTML="";
 result.innerHTML="";
 detail.innerHTML="";

 ["A","B","C","D"].forEach((k,i)=>{
   const btn=document.createElement("button");
   btn.className="answer-btn";
   btn.innerHTML=`${k}. ${q[k]}`;

   btn.onclick=()=>{
      const user=i+1;
      const correct=parseInt(q.Answer);

      stats.answered++;

      if(user===correct){
        stats.correct++;
        btn.classList.add("correct");
        result.innerHTML="✅ Đúng";
      }else{
        stats.wrong++;
        btn.classList.add("wrong");

        if(!wrongQuestions.includes(q.ID)){
          wrongQuestions.push(q.ID);
        }

        result.innerHTML=`❌ Sai. Đáp án đúng: ${["A","B","C","D"][correct-1]}`;
      }

      detail.innerHTML=`
      <p><b>📖 Cách đọc:</b><br>${q.ReadingQuestion||""}</p>
      <p><b>🇻🇳 Dịch:</b><br>${q.Translation||""}</p>
      <p><b>💡 Giải thích:</b><br>${q.Explanation||""}</p>`;

      updateStats();
      saveState();
   };

   answers.appendChild(btn);
 });

 updateStats();
 saveState();
}

function updateStats(){
 const rate=stats.answered
 ? ((stats.correct/stats.answered)*100).toFixed(1)
 : "0.0";

 statsDiv=document.getElementById("stats");
 statsDiv.innerHTML=`
 Đã trả lời: ${stats.answered}
 | Đúng: ${stats.correct}
 | Sai: ${stats.wrong}
 | Tỷ lệ đúng: ${rate}%`;
}

questionTypeFilter.onchange=()=>{
 updateCategoryFilter();
 applyFilters();
};

categoryFilter.onchange=applyFilters;
sectionFilter.onchange=applyFilters;

shuffleBtn.onclick=()=>{
 shuffle(filtered);
 idx=0;
 render();
};

wrongBtn.onclick=()=>{
 filtered=questions.filter(q=>wrongQuestions.includes(q.ID));
 idx=0;
 render();
};

nextBtn.onclick=()=>{
 if(idx<filtered.length-1) idx++;
 render();
};

prevBtn.onclick=()=>{
 if(idx>0) idx--;
 render();
};

resetBtn.onclick=()=>{
 localStorage.removeItem("bjtStudy");
 location.reload();
};

speakBtn.onclick=()=>{
 if(!filtered.length) return;
 const q=filtered[idx];
 const u=new SpeechSynthesisUtterance(q.ReadingQuestion||q.Question);
 u.lang="ja-JP";
 speechSynthesis.speak(u);
};

