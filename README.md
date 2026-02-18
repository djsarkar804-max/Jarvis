jarvis/
 ├─ index.html
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Jarvis Voice Assistant</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <div class="app">
    <h1>🤖 JARVIS</h1>
    <p id="status">Tap the button & speak</p>
    <button id="startBtn">🎙️ Start Listening</button>
    <div class="output" id="output"></div>
  </div>

  <script src="script.js"></script>
</body>
</html>
 ├─ style.css
 * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

body {
  background: #0f2027;
  background: linear-gradient(to right, #2c5364, #203a43, #0f2027);
  color: white;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app {
  text-align: center;
  width: 90%;
  max-width: 400px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

#status {
  opacity: 0.8;
  margin-bottom: 20px;
}

button {
  background: #00c6ff;
  border: none;
  padding: 15px 25px;
  font-size: 1rem;
  border-radius: 30px;
  cursor: pointer;
}

button:active {
  transform: scale(0.95);
}

.output {
  margin-top: 20px;
  font-size: 1.1rem;
}
 └─ script.js
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
