import { clearHTML } from "../render/clearHTML.js";
import { getExistingShopInv } from "../utils/shopFunctions.js";
import { updShoppingBagCount } from "./displayShopCount.js";

function showMessage(container, message, type = "info") {
  if (!container) return;

  container.innerHTML = `
    <div class="chosen_movie flexdown ${type}">
      <div class="infoShop">${message}</div>
      <div class="link">
        <a href="/movie-pages/all-movies.html">Click here to see all movies</a>
      </div>
    </div>
  `;
}

function saveShoppingBag(shoppingBag) {
  if (!Array.isArray(shoppingBag)) {
    console.error("saveShoppingBag expected an array, got:", shoppingBag);
    return;
  }

  localStorage.setItem("shoppingBag", JSON.stringify(shoppingBag));
}

function createShoppingMarkup(shopMovie, index) {
  return `
    <div class="chosen_movie">
      <div class="item1">${index + 1}.</div>

      <div class="chosen_moviecover">
        <a href="/products/movie_details.html?id=${shopMovie.id}">
          <img
            class="batman_cover"
            src="${shopMovie.image.url}"
            alt="${shopMovie.image.alt} movie cover"
          />
        </a>
      </div>

      <div class="movie_details">
        <a href="/products/movie_details.html?id=${shopMovie.id}">
          <h3>${shopMovie.title}</h3>
        </a>
        <h4 class="movie_details_h4">${shopMovie.price} kr</h4>
        <div class="details_more"></div>
      </div>

      <div class="divtrash">
        <figure
          class="trashcan"
          aria-label="Remove movie from list"
          title="Remove movie from list"
          data-id="${shopMovie.id}"
        ></figure>
      </div>
    </div>
  `;
}

function createPaymentMarkup(shopMovie) {
  return `
    <div class="flexy">
      <p>${shopMovie.title}</p>
      <p>${shopMovie.price} kr</p>
    </div>
  `;
}

export function displayShoppingBag() {
  const shoppingBagContainer = document.getElementById("shoppingBagContainer");
  const shopBagItems = document.getElementById("shopBagItems");
  const totalPriceContainer = document.getElementById("totalPriceContainer");
  const inShopBagContainer = document.getElementById("inShopBagContainer");
  const totalPriceContainer2 = document.getElementById("totalPriceContainer2");

  if (
    !shoppingBagContainer ||
    !shopBagItems ||
    !totalPriceContainer ||
    !inShopBagContainer ||
    !totalPriceContainer2
  ) {
    console.error("One or more shopping bag containers were not found.");
    return;
  }

  const shoppingBag = getExistingShopInv();

  if (!Array.isArray(shoppingBag)) {
    console.error("Shopping bag is not an array:", shoppingBag);
    clearHTML(shoppingBagContainer);
    clearHTML(totalPriceContainer);
    clearHTML(inShopBagContainer);
    clearHTML(totalPriceContainer2);
    shopBagItems.innerText = "Number of items: 0";
    showMessage(shoppingBagContainer, "Something went wrong loading your shopping bag.", "error");
    totalPriceContainer.innerText = "0 kr";
    totalPriceContainer2.innerHTML = `
      <div class="flexy w100 marginbottom3rem">
        <p>Total price:</p>
        <p>0 kr</p>
      </div>
    `;
    return;
  }

  clearHTML(shoppingBagContainer);
  clearHTML(totalPriceContainer);
  clearHTML(inShopBagContainer);
  clearHTML(totalPriceContainer2);

  shopBagItems.innerText = `Number of items: ${shoppingBag.length}`;

  if (shoppingBag.length === 0) {
    showMessage(shoppingBagContainer, "Your shoppingbag is empty :O");
    totalPriceContainer.innerText = "0 kr";
    totalPriceContainer2.innerHTML = `
      <div class="flexy w100 marginbottom3rem">
        <p>Total price:</p>
        <p>0 kr</p>
      </div>
    `;
    return;
  }

  const validShoppingBag = shoppingBag.filter((shopMovie) => {
    const isValid =
      shopMovie &&
      shopMovie.id != null &&
      shopMovie.title &&
      shopMovie.image &&
      shopMovie.price != null;

    if (!isValid) {
      console.error("Invalid shopping bag item:", shopMovie);
    }

    return isValid;
  });

  if (validShoppingBag.length === 0) {
    showMessage(shoppingBagContainer, "Could not display your shopping bag.", "error");
    totalPriceContainer.innerText = "0 kr";
    totalPriceContainer2.innerHTML = `
      <div class="flexy w100 marginbottom3rem">
        <p>Total price:</p>
        <p>0 kr</p>
      </div>
    `;
    return;
  }

  shoppingBagContainer.innerHTML = validShoppingBag
    .map((shopMovie, index) => createShoppingMarkup(shopMovie, index))
    .join("");

  inShopBagContainer.innerHTML = validShoppingBag
    .map(createPaymentMarkup)
    .join("");

  const totalPrice = validShoppingBag.reduce((sum, shopMovie) => {
    const price = parseFloat(shopMovie.price);
    return sum + (Number.isNaN(price) ? 0 : price);
  }, 0);

  const totalPriceFormatted = parseFloat(totalPrice.toFixed(2));

  totalPriceContainer.innerText = `${totalPriceFormatted} kr`;
  totalPriceContainer2.innerHTML = `
    <div class="flexy w100 marginbottom3rem">
      <p>Total price:</p>
      <p>${totalPriceFormatted} kr</p>
    </div>
  `;

  const trashCanButtons = shoppingBagContainer.querySelectorAll(".trashcan");

  trashCanButtons.forEach((button) => {
    button.addEventListener("click", handleShopTrash);
  });
}

export function handleShopTrash(event) {
  const clickedButton = event.currentTarget;
  const movieId = clickedButton.dataset.id;

  if (!movieId) {
    console.error("Could not find movie id on trash button.");
    return;
  }

  const shoppingBag = getExistingShopInv();

  if (!Array.isArray(shoppingBag)) {
    console.error("Shopping bag is not an array:", shoppingBag);
    return;
  }

  const updatedShoppingBag = shoppingBag.filter(
    (movie) => String(movie.id) !== String(movieId),
  );

  saveShoppingBag(updatedShoppingBag);
  displayShoppingBag();
  updShoppingBagCount();
}

if (document.getElementById("shoppingBagContainer")) {
  displayShoppingBag();
}