const playBtn = document.querySelector(".main__play"),
  cover = document.querySelector(".main__cover"),
  background = document.querySelector(".main__background"),
  forwardBtn = document.querySelector(".main__forward"),
  backwardBtn = document.querySelector(".main__backward"),
  songName = document.querySelector(".main__song"),
  singerName = document.querySelector(".main__singer"),
  duration = document.querySelector(".main__durationTime"),
  current = document.querySelector(".main__currentTime"),
  progressBar = document.querySelector(".main__progress-bar");

const audio = new Audio("./assets/audio/pelmeny.mp3");

let isPlay = false;

// PLAY AUDIO FUNCTION

function playPause() {
  if (!isPlay) {
    playAudio();
    playBtn.classList.add("main__pause");
    cover.classList.add("main__cover_active");
  } else {
    audio.pause();
    isPlay = false;

    playBtn.classList.remove("main__pause");
    cover.classList.remove("main__cover_active");
  }
}

playBtn.addEventListener("click", playPause);

// tracks

let playNum = 0;

async function playAudio() {
  await audio.play();
  isPlay = true;
  duration.textContent = getTimeCodeFromNum(audio.duration);
}

const tracks = [
  "./assets/audio/pelmeny.mp3",
  "./assets/audio/lyam.mp3",
  "./assets/audio/lostinthefire.mp3",
  "./assets/audio/beyonce.mp3",
  "./assets/audio/dontstartnow.mp3",
  "./assets/audio/lifon.mp3",
];

const covers = [
  "./assets/img/pelmeny.png",
  "./assets/img/lyam.png",
  "./assets/img/lostinthefire.png",
  "./assets/img/lemonade.png",
  "./assets/img/dontstartnow.png",
  "./assets/img/lifon.png",
];

const singers = [
  "DailyRay",
  "Say Mo",
  "The Weeknd",
  "Beyonce",
  "Dua Lipa",
  "UNIQE, nkeeei",
];

const songs = [
  "Good dumplings",
  "Lyam",
  "Lost In The Fire",
  "Don't Hurt Yourself",
  "Don't Start Now",
  "Lifon",
];

function playNext() {
  if (playNum >= tracks.length - 1) {
    playNum = 0;
  } else {
    playNum++;
  }

  playBtn.classList.add("main__pause");
  cover.classList.add("main__cover_active");

  singerName.textContent = singers[playNum];
  songName.textContent = songs[playNum];
  audio.src = tracks[playNum];
  cover.src = covers[playNum];
  background.src = covers[playNum];

  playAudio();
}

function playPrev() {
  if (playNum <= 0) {
    playNum = tracks.length - 1;
  } else {
    playNum--;
  }

  playBtn.classList.add("main__pause");
  cover.classList.add("main__cover_active");

  singerName.textContent = singers[playNum];
  songName.textContent = songs[playNum];
  audio.src = tracks[playNum];
  cover.src = covers[playNum];
  background.src = covers[playNum];

  playAudio();
}

forwardBtn.addEventListener("click", playNext);
backwardBtn.addEventListener("click", playPrev);

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

setInterval(() => {
  progressBar.value = audio.currentTime;
  current.textContent = getTimeCodeFromNum(audio.currentTime);
  progressBar.max = audio.duration;

  if (audio.currentTime === audio.duration) {
    playNext();
  }
}, 500);

progressBar.addEventListener("input", () => {
  audio.currentTime = progressBar.value;
});

// Cashing images

function preloadImages() {
  covers.forEach((el) => {
    const img = new Image();
    img.src = el;
  });
}

preloadImages();

// Cashing tracks

function preloadAudio() {
  tracks.forEach((el) => {
    const audio = new Audio();
    audio.src = el;
  });
}

preloadAudio();
