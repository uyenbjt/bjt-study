// ===============================
// BJT Study v2.0
// data.js
// ===============================

const AppData = {

    questions: [],

    async load() {

        return new Promise((resolve, reject) => {

            Papa.parse("BJT - quiz.csv", {

                download: true,

                header: true,

                skipEmptyLines: true,

                complete: (result) => {

                    this.questions = result.data;

                    console.log("CSV Loaded:", this.questions.length);

                    resolve(this.questions);

                },

                error: (err) => {

                    console.error(err);

                    reject(err);

                }

            });

        });

    }

};
