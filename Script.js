const startBtn = document.getElementById("startBtn");
const output = document.getElementById("output");
const statusText = document.getElementById("status");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "en-IN";
recognition.interimResults = false;

const synth = window.speechSynthesis;

startBtn.addEventListener("click", () => {
  statusText.innerText = "Listening...";
  recognition.start();
});

recognition.onresult = (event) => {
  const command = event.results[0][0].transcript.toLowerCase();
  output.innerHTML = `🗣️ You said: <b>${command}</b>`;
  respond(command);
};

recognition.onerror = () => {
  statusText.innerText = "Try again";
};

function respond(command) {
  let reply = "";

  if (command.includes("hello")) {
    reply = "Hello sir, how can I help you?";
  } 
  else if (command.includes("time")) {
    reply = `The time is ${new Date().toLocaleTimeString()}`;
  } 
  else if (command.includes("your name")) {
    reply = "I am Jarvis, your voice assistant.";
  } 
  else if (command.includes("open youtube")) {
    reply = "Opening YouTube";
    window.open("https://youtube.com", "_blank");
  } 
  else {
    reply = "Sorry, I did not understand that.";
  }

  speak(reply);
}

function speak(text) {
  statusText.innerText = "Speaking...";
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-IN";
  synth.speak(utterance);
}
