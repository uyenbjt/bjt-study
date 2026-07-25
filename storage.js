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