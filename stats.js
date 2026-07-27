function updateStats(){

    const statsDiv = document.getElementById("stats");

    if(!statsDiv) return;

    statsDiv.innerHTML = `
        ✅ Đúng: ${stats.correct}
        | ❌ Sai: ${stats.wrong}
        | 📚 Đã làm: ${stats.answered}
    `;

}
