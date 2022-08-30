const background = document.querySelector(".body"),
  mainBtn = document.querySelector(".main__btn"),
  quote = document.querySelector(".main__quote"),
  author = document.querySelector(".main__author");

const url = "https://type.fit/api/quotes";
const quotes = "quotes.json";

background.style.backgroundImage = `url(./assets/img/0.jpeg)`;

// Change background-image

function changeImg() {
  let randomImg = parseInt(Math.random() * 9);

  background.style.backgroundImage = `url(./assets/img/${randomImg}.jpeg)`;
}

// Connect translations

const russian = document.querySelector(".main__languages_russian");
const english = document.querySelector(".main__languages_english");

async function getEnglish() {
  const res = await fetch(url);
  const data = await res.json();
  const randomQuote = Math.floor(Math.random() * data.length);
  quote.textContent = data[randomQuote].text;
  author.textContent = data[randomQuote].author;
}

async function getRussian() {
  const res = await fetch(quotes);
  const data = await res.json();
  const randomQuote = Math.floor(Math.random() * data.length);
  quote.textContent = data[randomQuote].text;
  author.textContent = data[randomQuote].author;
}

function getQuotes() {
  if (english.classList.contains("main__languages_english_active")) {
    getEnglish();
  } else {
    getRussian();
  }
}

mainBtn.addEventListener("click", () => {
  getQuotes();
  changeImg();
});

russian.addEventListener("click", () => {
  getRussian();
  if (english.classList.contains("main__languages_english_active")) {
    english.classList.remove("main__languages_english_active");
    russian.classList.add("main__languages_russian_active");
  }
});

english.addEventListener("click", () => {
  getEnglish();
  if (russian.classList.contains("main__languages_russian_active")) {
    russian.classList.remove("main__languages_russian_active");
    english.classList.add("main__languages_english_active");
  }
});

window.onload = function () {
  getQuotes();
};

function cashingImgs() {
  const images = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  for (let i = 0; i < images.length; i++) {
    const img = new Image();
    img.src = `./assets/img/${i}.jpeg`;
  }
}

cashingImgs();
