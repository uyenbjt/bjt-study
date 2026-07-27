// ===============================
// BJT Study v2.0
// audio.js
// ===============================

const AppAudio = {

    voice: null,

    rate: 1,

    speaking: false,

    init() {

        const voices = speechSynthesis.getVoices();

        this.voice =
            voices.find(v => v.lang === "ja-JP") ||
            voices.find(v => v.lang.startsWith("ja")) ||
            null;

    },

    speak(text) {

        if (!text) return;

        speechSynthesis.cancel();

        const uttr = new SpeechSynthesisUtterance(text);

        uttr.lang = "ja-JP";

        uttr.rate = this.rate;

        if (this.voice) {

            uttr.voice = this.voice;

        }

        this.speaking = true;

        uttr.onend = () => {

            this.speaking = false;

        };

        speechSynthesis.speak(uttr);

    },

    pause() {

        speechSynthesis.pause();

    },

    resume() {

        speechSynthesis.resume();

    },

    stop() {

        speechSynthesis.cancel();

        this.speaking = false;

    },

    setRate(rate) {

        this.rate = rate;

    }

};

speechSynthesis.onvoiceschanged = () => {

    AppAudio.init();

};
