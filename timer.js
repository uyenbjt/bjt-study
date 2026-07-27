// ===============================
// BJT Study v2.0
// timer.js
// ===============================

const AppTimer = {

    seconds: 15,

    remain: 15,

    interval: null,

    start() {

        this.stop();

        this.remain = this.seconds;

        this.update();

        this.interval = setInterval(() => {

            this.remain--;

            this.update();

            if (this.remain <= 0) {

                this.stop();

                AppRender.next();

            }

        }, 1000);

    },

    stop() {

        if (this.interval) {

            clearInterval(this.interval);

            this.interval = null;

        }

    },

    reset() {

        this.stop();

        this.start();

    },

    update() {

        const el = document.getElementById("timer");

        if (el) {

            el.textContent = this.remain;

        }

    }

};
