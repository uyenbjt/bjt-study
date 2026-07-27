// =========================
// TIMER MODULE
// =========================

let timer = null;
let timeLeft = 15;

function updateTimerDisplay() {
    const el = document.getElementById("timerDisplay");
    if (el) {
        el.textContent = timeLeft;
    }
}

function startTimer() {

    stopTimer();

    if (!timerEnabled) return;

    timeLeft = timerSeconds;
    updateTimerDisplay();

    timer = setInterval(() => {

        timeLeft--;

        updateTimerDisplay();

        if (timeLeft <= 0) {

            stopTimer();

            setTimeout(() => {

                nextQuestion();

            }, 300);

        }

    }, 1000);

}

function stopTimer() {

    if (timer) {

        clearInterval(timer);

        timer = null;

    }

}

function resetTimer() {

    stopTimer();

    timeLeft = timerSeconds;

    updateTimerDisplay();

}
