// ===============================
// BJT Study v2.0
// filter.js
// ===============================

const AppFilter = {

    filteredQuestions: [],

    reset() {

        this.filteredQuestions = [...AppData.questions];

    },

    apply(section = "", type = "", category = "") {

        this.filteredQuestions = AppData.questions.filter(q => {

            const okSection =
                !section || q.Section === section;

            const okType =
                !type || q.QuestionType === type;

            const okCategory =
                !category || q.Category === category;

            return okSection && okType && okCategory;

        });

        AppRender.currentIndex = 0;

        if (this.filteredQuestions.length) {

            AppData.questions = this.filteredQuestions;

        }

        AppRender.render();

    },

    shuffle() {

        for (let i = AppData.questions.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));

            [AppData.questions[i], AppData.questions[j]] =
            [AppData.questions[j], AppData.questions[i]];

        }

        AppRender.currentIndex = 0;

        AppRender.render();

    }

};
