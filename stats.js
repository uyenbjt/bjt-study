// ===============================
// BJT Study v2.0
// stats.js
// ===============================

const AppStats = {

    correct: 0,

    wrong: 0,

    answered: 0,

    reset() {

        this.correct = 0;
        this.wrong = 0;
        this.answered = 0;

        this.update();

    },

    addCorrect() {

        this.correct++;
        this.answered++;

        this.update();

    },

    addWrong() {

        this.wrong++;
        this.answered++;

        this.update();

    },

    update() {

        const answered = document.getElementById("answered");
        const correct = document.getElementById("correct");
        const wrong = document.getElementById("wrong");

        if (answered) answered.textContent = this.answered;
        if (correct) correct.textContent = this.correct;
        if (wrong) wrong.textContent = this.wrong;

    }

};
