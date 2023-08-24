const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");

msg.text = document.querySelector('[name="text"]').value;

const populateVoices = () => {
  voices = speechSynthesis.getVoices();
  const voiceOptions = voices
    .filter((voice) => voice.lang.includes("en"))
    .map(
      (voice) =>
        `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
    )
    .join("");
  voicesDropdown.innerHTML = voiceOptions;
};

const setVoice = (event) => {
  msg.voice = voices.find((voice) => voice.name === event.target.value);
};

const setOption = (event) => {
  msg[event.target.name] = event.target.value;
};

const startSpeaking = () => {
  speechSynthesis.cancel(); // Stop any ongoing speech
  speechSynthesis.speak(msg);
};

const stopSpeaking = () => {
  speechSynthesis.cancel(); // Stop the speech
};

speechSynthesis.addEventListener("voiceschanged", populateVoices);
voicesDropdown.addEventListener("change", setVoice);
options.forEach((option) => option.addEventListener("change", setOption));
speakButton.addEventListener("click", startSpeaking);
stopButton.addEventListener("click", stopSpeaking);
