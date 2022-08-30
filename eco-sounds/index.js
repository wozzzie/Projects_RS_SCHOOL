const playBtn = document.querySelector(".main__play"),
  headerLogo = document.querySelector(".header__logo"),
  navItems = document.querySelectorAll(".nav__item"),
  mainImg = document.querySelector(".main"),
  dataItems = document.querySelectorAll("[data-item]");

const audio = new Audio();
audio.src = "./assets/audio/forest.mp3";

const image = new Image();

let isPlay = false;

// PLAY AUDIO FUNCTION

function playAudio(event) {
  audio.src = `./assets/audio/${event.target.dataset.item}.mp3`;

  navItems.forEach((el) => {
    el.classList.remove("nav__item_active");
    headerLogo.classList.remove("header__logo_active");
  });

  if (event.target.classList.contains("nav__item")) {
    event.target.classList.add("nav__item_active");
  } else {
    headerLogo.classList.add("header__logo_active");
  }

  play();
  isPlay = true;
  playBtn.classList.add("main__pause");
  mainImg.style.backgroundImage = `url(./assets/img/${event.target.dataset.item}.jpg)`;
}

function play() {
  audio.currentTime = 0;
  audio.play();
}

function stopAudio() {
  audio.pause();
}

function playPause() {
  if (!isPlay) {
    play();

    playBtn.classList.add("main__pause");
  } else {
    stopAudio();

    playBtn.classList.remove("main__pause");
  }

  isPlay = !isPlay;
}

dataItems.forEach((item) => {
  item.addEventListener("click", playAudio);
});

playBtn.addEventListener("click", playPause);
