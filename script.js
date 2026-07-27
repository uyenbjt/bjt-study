
let questions=[],filtered=[];
let idx=0;
let wrongQuestions=[];
let stats={answered:0,correct:0,wrong:0};

let timerInterval=null;
let timeLeft=15;

const questionTypeFilter=document.getElementById("questionTypeFilter");
const categoryFilter=document.getElementById("categoryFilter");
const sectionFilter=document.getElementById("sectionFilter");





function shuffle(arr){
 for(let i=arr.length-1;i>0;i--){
  const j=Math.floor(Math.random()*(i+1));
  [arr[i],arr[j]]=[arr[j],arr[i]];
 }
}

function stopTimer(){
 clearInterval(timerInterval);
 timerInterval=null;
 const timer=document.getElementById("timer");
 if(timer) timer.textContent="";
}

function startTimer(){
 const timerToggle=document.getElementById("timerToggle");
 const timer=document.getElementById("timer");

 if(!timerToggle || !timer) return;

 if(!timerToggle.checked){
  stopTimer();
  return;
 }

 clearInterval(timerInterval);

 timeLeft=15;
 timer.textContent=timeLeft;

 timerInterval=setInterval(()=>{
  timeLeft--;
  timer.textContent=timeLeft;

  if(timeLeft<=0){
   clearInterval(timerInterval);
   timer.textContent="⏰ Hết giờ";
  }
 },1000);
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
console.log(types);
 
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

updateQuestionTypeFilter();
updateCategoryFilter();
}
function updateQuestionTypeFilter(){

const sec = sectionFilter.value;
const oldValue = questionTypeFilter.value;

const types = [...new Set(
questions
.filter(q => !sec || q.Section === sec)
.map(q => q.QuestionType)
)];

questionTypeFilter.innerHTML =
'<option value="">📚 Tất cả QuestionType</option>';

types.forEach(v=>{
let o=document.createElement("option");
o.value=v;
o.textContent=v;
questionTypeFilter.appendChild(o);
});

if(types.includes(oldValue)){
questionTypeFilter.value=oldValue;
}

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

 const totalType=questions.filter(q=>
 !questionTypeFilter.value ||
 q.QuestionType===questionTypeFilter.value
).length;

counter.innerHTML=`Câu ${idx+1}/${filtered.length} | Tổng ${totalType} câu`;
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
 startTimer();
}



questionTypeFilter.onchange=()=>{
 updateCategoryFilter();
 applyFilters();
};

categoryFilter.onchange=applyFilters;
sectionFilter.onchange = () => {
    updateQuestionTypeFilter();
    updateCategoryFilter();
    applyFilters();
};
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

let japaneseVoice = null;

let speechRate = localStorage.getItem("speechRate") || "1.00";

const pauseBtn = document.getElementById("pauseBtn");
const speakBtn = document.getElementById("speakBtn");
const resumeBtn = document.getElementById("resumeBtn");
const stopBtn = document.getElementById("stopBtn");
const speedSelect = document.getElementById("speedSelect");

speedSelect.value = speechRate;

speedSelect.onchange = () => {
    speechRate = parseFloat(speedSelect.value);
    localStorage.setItem("speechRate", speechRate);
};

function loadJapaneseVoice() {
    const voices = speechSynthesis.getVoices();

    console.log("Voices:", voices.map(v => v.name));

    japaneseVoice =
        voices.find(v => v.name.includes("Google 日本語")) ||
        voices.find(v => v.name.includes("Google Japanese")) ||
        voices.find(v => v.name.includes("Microsoft Nanami")) ||
        voices.find(v => v.name.includes("Microsoft Keita")) ||
        voices.find(v => v.name.includes("Microsoft Sayaka")) ||
        voices.find(v => v.lang === "ja-JP") ||
        null;

    console.log("Selected voice:", japaneseVoice?.name);
}

// Chrome thường tải voice sau khi mở trang
speechSynthesis.onvoiceschanged = loadJapaneseVoice;
loadJapaneseVoice();

function speakQuestion(q){
    if(!q) return;
    speechSynthesis.cancel();

    let text="";

    if(q.Section==="Section1"){
        const answerKey=["A","B","C","D"][parseInt(q.Answer)-1];
        text=q[answerKey]||q.Question;
    }else{
       text=`${q.Question}

１番。

${q.A}

２番。

${q.B}

３番。

${q.C}

４番。

${q.D}`;
    }

    const u=new SpeechSynthesisUtterance(text);
    u.lang="ja-JP";
    u.rate = speechRate;
    u.pitch=1;
    u.volume=1;
    u.voice = japaneseVoice;
 
 console.log("Voice =", u.voice ? u.voice.name : "Default");
console.log("Rate =", u.rate);
 
    speechSynthesis.speak(u);
}

speakBtn.onclick=()=>{
    if(!filtered.length) return;
    speakQuestion(filtered[idx]);
};
pauseBtn.onclick = () => {
    speechSynthesis.pause();
};

resumeBtn.onclick = () => {
    speechSynthesis.resume();
};

stopBtn.onclick = () => {
    speechSynthesis.cancel();
};
