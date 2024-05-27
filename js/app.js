const playPauseBtn = document.getElementById("play-pause");
const videoElement = document.getElementById("video");
const playerContainer = document.querySelector(".player-container");
const controlBtns = document.querySelector(".player-controls-container");
const videoSize = document.getElementById("video-size");
const muteVideoIcon = document.getElementById("mute");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const durationElement = document.getElementById("duration-element");
const currentTimeElement = document.getElementById("currentTimeElement");
const progress = document.querySelector(".progress");
const volumeRange = document.getElementById("volume-range");
const speedIcon = document.getElementById("speed");
const speed2 = document.getElementById("speed-2x");
const speedNormal = document.getElementById("speed-normal");
const speed05 = document.getElementById("speed-05x");
const speedContainer = document.querySelector(".speed-container");
const progressContainer = document.querySelector(".progress-container");

let isPlaying = false;
let fullScreen = false;



speedIcon.addEventListener("click", () => {
  speedContainer.classList.toggle("hidden");
});

document.addEventListener("click", () => {
  speedContainer.classList.add("hidden");
});

speed05.addEventListener("click", () => {
  videoElement.playbackRate = 0.5;
  speedContainer.classList.add("hidden");
});

speedNormal.addEventListener("click", () => {
  videoElement.playbackRate = 1;
  speedContainer.classList.add("hidden");
});

speed2.addEventListener("click", () => {
  videoElement.playbackRate = 2;
  speedContainer.classList.add("hidden");
});



volumeRange.addEventListener("input", () => {
  videoElement.volume = volumeRange.value;
  if (volumeRange.value == 0) {
    muteVideoIcon.classList.add("fa-volume-mute");
    videoElement.muted = true;
  } else {
    muteVideoIcon.classList.remove("fa-volume-mute");
    muteVideoIcon.classList.add("fa-volume-up");
    videoElement.muted = false;
  }
});

function mutedVideo() {
  videoElement.muted = !videoElement.muted;
  volumeRange.value = videoElement.muted ? "0" : "1";
  videoElement.volume = videoElement.muted ? "0" : "1";
  muteVideoIcon.classList.toggle("fa-volume-mute");
}

muteVideoIcon.addEventListener("click", mutedVideo);



function nextForward() {
  videoElement.currentTime += 5;
  console.log(videoElement.currentTime);
}
function backForward() {
  videoElement.currentTime -= 5;
}

next.addEventListener("click", nextForward);

prev.addEventListener("click", backForward);



function playPauseVideo() {
  if (isPlaying) {
    videoElement.pause();
    isPlaying = false;
    playPauseBtn.classList.replace("fa-pause", "fa-play");
  } else {
    videoElement.play();
    isPlaying = true;
    playPauseBtn.classList.replace("fa-play", "fa-pause");
  }
}

playPauseBtn.addEventListener("click", playPauseVideo);

playerContainer.addEventListener("click", (event) => {
  if (event.target.nodeName !== "VIDEO") {
    event.stopPropagation();
  } else {
    playPauseVideo();
  }
});



function videoSizeChanging() {
  playerContainer.classList.toggle("video-container");
}

videoSize.addEventListener("click", videoSizeChanging);

videoElement.addEventListener("dblclick", videoSizeChanging);



function timeFormatted(duration) {
  const minute = Math.floor(duration / 60).toString();
  const second = Math.floor(duration % 60).toString();
  return `${minute}:${second.padStart(2, 0)}`;
}

videoElement.addEventListener("loadedmetadata", function () {
  durationElement.textContent = timeFormatted(videoElement.duration);
});

videoElement.addEventListener("timeupdate", () => {
  if (videoElement.currentTime == videoElement.duration) {
    playPauseVideo();
  }
  currentTimeElement.textContent = timeFormatted(videoElement.currentTime);
  const percentage = (videoElement.currentTime / videoElement.duration) * 100;
  progress.style.width = percentage + "%";
});

progressContainer.addEventListener("click", (e) => {
  videoElement.currentTime =
    (e.offsetX / progressContainer.clientWidth) * videoElement.duration;
});


playerContainer.addEventListener("mouseenter", () => {
  controlBtns.classList.remove("hidden");
});

playerContainer.addEventListener("mouseleave", () => {
  if (isPlaying) {
    controlBtns.classList.add("hidden");
  }
  speedContainer.classList.add("hidden");
});
