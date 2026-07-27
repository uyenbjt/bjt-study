// ===============================
// BJT Study v2.0
// render.js
// ===============================

const AppRender = {

    currentIndex: 0,

    render() {

        if (!AppData.questions.length) return;

        const q = AppData.questions[this.currentIndex];

        document.getElementById("question").textContent = q.Question || "";

        document.getElementById("btnA").textContent = q.A || "";
        document.getElementById("btnB").textContent = q.B || "";
        document.getElementById("btnC").textContent = q.C || "";
        document.getElementById("btnD").textContent = q.D || "";

    },

    next() {

        if (this.currentIndex < AppData.questions.length - 1) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0;
        }

        this.render();

    },

    previous() {

        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = AppData.questions.length - 1;
        }

        this.render();

    }

};
