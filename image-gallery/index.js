const searchBtn = document.querySelector(".header__search-input_btn"),
  galleryContainer = document.querySelector(".main__container"),
  searchForm = document.querySelector(".header__search-form"),
  searchInput = document.querySelector(".header__search-input"),
  background = document.querySelector(".body");

background.style.backgroundImage = `url("./assets/img/0.jpeg")`;

function createUrl(query) {
  return `https://api.unsplash.com/search/photos?query=${query}&per_page=30&orientation=landscape&client_id=8KM6y2F7O-KJBS2YBtCcEwUpTxd26CRgaQnhzBXzjBc`;
}

// Change background-image

function changeImg() {
  let randomImg = parseInt(Math.random() * 14);

  background.style.backgroundImage = `url(./assets/img/${randomImg}.jpeg)`;
}

function clearGalleryChilds() {
  galleryContainer.childNodes.forEach((image) => {
    image.remove();
  });
}

async function getData(url) {
  try {
    galleryContainer.innerHTML = "Loading...";

    const res = await fetch(url);
    const data = await res.json();
    const results = data.results;

    clearGalleryChilds();

    if (results.length) {
      results.forEach((element) => {
        const img = `<img class="main__images" src=${element.urls.regular} alt="image">`;
        galleryContainer.insertAdjacentHTML("beforeend", img);
        changeImg();
      });
    } else {
      throw new Error();
    }
  } catch {
    clearGalleryChilds();

    const p = `<p class="no-results">No results...Please try again</p>`;

    galleryContainer.insertAdjacentHTML("afterbegin", p);
  }
}

getData(createUrl("summer"));

function search(event) {
  event.preventDefault();

  getData(createUrl(searchInput.value));
}

searchForm.addEventListener("submit", search);

// Cashing images

function cashingImgs() {
  const images = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  for (let i = 0; i < images.length; i++) {
    const img = new Image();
    img.src = `./assets/img/${i}.jpeg`;
  }
}

cashingImgs();
