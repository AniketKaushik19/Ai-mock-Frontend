export const textToSpeech = (text) => {
  if (!text || typeof window === "undefined") return;

  const synth = window.speechSynthesis;
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const voices = synth.getVoices();

  utterance.voice =
    voices.find((v) => v.lang === "en-US") || voices[0];
  utterance.rate = 0.95;
  utterance.pitch = 1.05;

  synth.speak(utterance);
};
