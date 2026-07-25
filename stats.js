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