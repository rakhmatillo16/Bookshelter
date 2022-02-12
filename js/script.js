"use strict";

const searchInput = document.querySelector(".header__search");
const elCardList = document.querySelector(".card__list");
const elCardTemplate = document.querySelector(".card-template").content;
const elCounter = document.querySelector(".hero__counter");

const API_KEY = "bb7f63a4";
let search = "python";
const page = 1;

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

let getBooks = async function () {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=${page}`
  );

  const data = await response.json();
  elCounter.textContent = data.totalItems;

  console.log(data.items);

  renderCards(data.items, elCardList);
};

getBooks();

searchInput.addEventListener("change", function (evt) {
  elCardList.innerHTML = null;
  search = evt.target.value;
  getBooks();
});

const elLogoutBtn = document.querySelector(".header__logout");
const localToken = window.localStorage.getItem("token");

if (!localToken) {
  window.location.replace("index.html");
}

elLogoutBtn.addEventListener("click", function () {
  window.localStorage.removeItem("token");

  window.location.replace("index.html");
});
