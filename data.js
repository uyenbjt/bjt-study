// ===============================
// data.js
// Quản lý dữ liệu CSV
// ===============================

let questions = [];
let filtered = [];

function loadData() {

    Papa.parse("BJT - quiz.csv", {

        download: true,
        header: true,
        skipEmptyLines: true,

        complete: function (res) {

            questions = res.data;
            filtered = [...questions];

            buildFilters();
            loadState();
            render();

        }

    });

}
