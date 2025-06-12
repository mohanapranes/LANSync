const socket = new WebSocket(`ws://${location.host}/ws`);
const video = document.getElementById("player");
let isRemote = false;

socket.onmessage = function(event) {
  const msg = JSON.parse(event.data);
  isRemote = true;

  if (msg.type === "play") {
    video.currentTime = msg.time;
    console.log("play")
    video.play();
  } else if (msg.type === "pause") {
    video.currentTime = msg.time;
    console.log("pause")
    video.pause();
  } else if (msg.type === "seek") {
    video.currentTime = msg.time;
  }

  setTimeout(() => (isRemote = false), 100);
};

function sendEvent(type) {
  if (isRemote) return;
  const msg = {
    type: type,
    time: video.currentTime
  };
  socket.send(JSON.stringify(msg));
}

video.addEventListener("play", () => sendEvent("play"));
video.addEventListener("pause", () => sendEvent("pause"));
video.addEventListener("seeked", () => sendEvent("seek"));
