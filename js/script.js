"use strict";

const searchInput = document.querySelector(".header__search");
const elCardList = document.querySelector(".card__list");
const elCardTemplate = document.querySelector(".card-template").content;
const elCounter = document.querySelector(".hero__counter");
const elPrevBtn = document.querySelector(".page-btn__prev");
const elNextBtn = document.querySelector(".page-btn__next");
const elSortBtn = document.querySelector(".hero__sort-btn");
const elMain = document.querySelector(".main");
const modalOpen = document.querySelector(".card__more-info");
const modalClose = document.querySelector(".modal__exit");
const elModal = document.querySelector(".modal");
const elOverlay = document.querySelector(".overlayy");

// BOOKMARK VERIBLES
const elBookmarkTemplate = document.querySelector(".bookmark-template").content;
const elBookmarkList = document.querySelector(".bookmark__list");

const API_KEY = "bb7f63a4";
let search = "python";
let page = 1;

// CARDS RENDER FUNCTION FOR SHOWING EACH CARD
const renderCards = function (arr, element) {
  const cardsFragment = document.createDocumentFragment();
  arr.forEach(cardItem => {
    const clonedCardTemplate = elCardTemplate.cloneNode(true);

    clonedCardTemplate.querySelector(".card__img").src =
      cardItem.volumeInfo.imageLinks.thumbnail;
    clonedCardTemplate.querySelector(".card__heading").textContent =
      cardItem.volumeInfo.title;
    clonedCardTemplate.querySelector(".card__desc").textContent =
      cardItem.volumeInfo.publisher;
    clonedCardTemplate.querySelector(".card__year").textContent =
      cardItem.volumeInfo.publishedDate;
    clonedCardTemplate.querySelector(".card__read").href =
      cardItem.volumeInfo.previewLink;

    cardsFragment.appendChild(clonedCardTemplate);
  });

  element.appendChild(cardsFragment);
};

// BOOKMARK RENDER FUNCTION

const renderBookmark = function (arr, element) {
  const bookmarkFragment = document.createDocumentFragment();
  arr.forEach(bookmarkItem => {
    const clonedBookmarkTemplate = elBookmarkTemplate.cloneNode(true);

    clonedBookmarkTemplate.querySelector(".bookmark__box-heading").textContent =
      bookmarkItem.volumeInfo.title;
    clonedBookmarkTemplate.querySelector(".bookmark__box-desc").textContent =
      bookmarkItem.volumeInfo.publisher;
    clonedBookmarkTemplate.querySelector(".bookmark__box-link").href =
      bookmarkItem.volumeInfo.previewLink;

    bookmarkFragment.appendChild(clonedBookmarkTemplate);
  });
  elCardList.addEventListener("click", function (evt) {
    if (evt.target.matches(".card__btn-bookmark")) {
      element.appendChild(bookmarkFragment);
    }
  });
};

// GET BOOK FUNCTION FOR DETTIN BOOKS FROM API
let getBooks = async function () {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=${page}`
  );

  try {
    let data = await response.json();
    (elCounter.textContent = data.totalItems), "1";

    console.log(data.items);

    renderCards(data.items, elCardList);
    renderBookmark(data.items, elBookmarkList);
  } catch (error) {
    error;
  }
};

getBooks();

// PREV BUTTON FOR GOING TO PREVIUS PAGE

elPrevBtn.addEventListener("click", function () {
  elCardList.innerHTML = null;
  page = page - 10;
  getBooks();
});

// NEXT BUTTON FOR GOING TO NEXT PAGE
elNextBtn.addEventListener("click", function () {
  elCardList.innerHTML = null;
  page = page + 10;
  getBooks();
});

// THIS IS THE BUTTON FOR LOGING OUT
searchInput.addEventListener("change", function (evt) {
  elCardList.innerHTML = null;
  search = evt.target.value.trim();
  getBooks();
});

// LOG OUT CODES
const elLogoutBtn = document.querySelector(".header__logout");
const localToken = window.localStorage.getItem("token");

if (!localToken) {
  window.location.replace("index.html");
}

elLogoutBtn.addEventListener("click", function () {
  window.localStorage.removeItem("token");

  window.location.replace("index.html");
});

// OPEN MODAL BUTTON

elCardList.addEventListener("click", function (evt) {
  if (evt.target.matches(".card__btn-desc")) {
    elModal.classList.remove("hidden");
    elOverlay.classList.add("overlay");
  }
});

// CLOSE MODAL BUTTON

modalClose.addEventListener("click", () => {
  elModal.classList.add("hidden");
  elOverlay.classList.remove("overlay");
});
