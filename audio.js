// =========================
// AUDIO MODULE
// =========================

let japaneseVoice = null;
let speechRate = 1;

function loadJapaneseVoice() {

    const voices = speechSynthesis.getVoices();

    japaneseVoice =
        voices.find(v => v.lang === "ja-JP") ||
        voices.find(v => v.lang.startsWith("ja")) ||
        null;

}

speechSynthesis.onvoiceschanged = loadJapaneseVoice;

loadJapaneseVoice();

function stopSpeech() {

    speechSynthesis.cancel();

}

function pauseSpeech() {

    speechSynthesis.pause();

}

function resumeSpeech() {

    speechSynthesis.resume();

}

function speak(text) {

    if (!text) return;

    stopSpeech();

    const utter = new SpeechSynthesisUtterance(text);

    utter.lang = "ja-JP";

    utter.rate = speechRate;

    if (japaneseVoice) {

        utter.voice = japaneseVoice;

    }

    speechSynthesis.speak(utter);

}
