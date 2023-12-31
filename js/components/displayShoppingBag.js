//
import { clearHTML } from "../render/clearHTML.js";
// shopFunctions.js
import { getExistingShopInv } from "../utils/shopFunctions.js";
import { updShoppingBagCount } from "./displayShopCount.js";

export async function displayShoppingBag() {
  const shoppingBag = getExistingShopInv();

  const shoppingBagContainer = document.getElementById("shoppingBagContainer");
  const shopBagItems = document.getElementById("shopBagItems");
  const totalPriceContainer = document.getElementById("totalPriceContainer");
  const inShopBagContainer = document.getElementById("inShopBagContainer");
  const totalPriceContainer2 = document.getElementById("totalPriceContainer2");

  shopBagItems.innerText = `Number of items: ${shoppingBag.length}`;
  if (shoppingBag.length === 0) {
    shoppingBagContainer.innerText = "No movies added";
  }
  clearHTML(shoppingBagContainer);
  clearHTML(totalPriceContainer);
  clearHTML(inShopBagContainer);
  if (shoppingBag.length === 0) {
    shoppingBagContainer.innerHTML = `<div class="chosen_movie flexdown">
    <div class="infoShop">Your shoppingbag is empty :O  </div>
    <div class="link"><a href="/movie-pages/all-movies.html">Click here to see all movies</a></div>`;
    totalPriceContainer.innerText = "0 kr";
  } else {
  }
  let totalPrice = 0;
  shoppingBag.forEach((shopMovies, index) => {
    shoppingBagContainer.innerHTML += `<div class="chosen_movie">
                                        <div class="item1">${index + 1}.</div>
                                        <div class="chosen_moviecover">
                                        <a href="/products/movie_details.html?id=${
                                          shopMovies.id
                                        }">
                                        <img
                                            class="batman_cover"
                                            src="${shopMovies.image}"
                                            alt="Batman movie cover"
                                        /></a>
                                    </div>
                                    <div class="movie_details">
                                        <a href="/products/movie_details.html?id="${
                                          shopMovies.id
                                        }">
                                        <h3>${shopMovies.title}</h3>
                                        </a>
                                        <h4 class="movie_details_h4">${
                                          shopMovies.price
                                        } kr</h4>
                                        <div class="details_more">
                                        </div>
                                    </div>
                                    <div class="divtrash">
                                        <figure
                                        class="trashcan"
                                        aria-label="Remove movie from list"
                                        ></figure>
                                    </div>
                                    </div>
                                        `;

    //2.payment section
    inShopBagContainer.innerHTML += `<div class="flexy"><p>${shopMovies.title}</p>
    <p>${shopMovies.price} kr</p></div>`;

    totalPrice += parseFloat(shopMovies.price);
  });

  let totalPriceFormatted = parseFloat(totalPrice.toFixed(2));

  totalPriceContainer.innerText = `${totalPriceFormatted} kr`;
  totalPriceContainer2.innerHTML = `<div class="flexy w100 marginbottom3rem "><p>Total price:</p><p>${totalPriceFormatted} kr</p></div>`;

  const trashCanButton = document.querySelectorAll(".trashcan");

  trashCanButton.forEach((button) => {
    button.addEventListener("click", handleShopTrash);
  });
}
displayShoppingBag();

export function handleShopTrash(event) {
  if (event) {
    const trashCanButtons = document.querySelectorAll(".trashcan");
    const indexShopBag = Array.from(trashCanButtons).indexOf(event.target);

    // Retrieve the existing shopping bag from local storage
    const shoppingBag = getExistingShopInv();
    if (indexShopBag >= 0 && indexShopBag < shoppingBag.length) {
      // Remove the item from the shopping bag array
      shoppingBag.splice(indexShopBag, 1);

      // Update the local storage with the modified shopping bag
      localStorage.setItem("shoppingBag", JSON.stringify(shoppingBag));

      // Update the displayed shopping bag
      displayShoppingBag();
      updShoppingBagCount();
    }
  }
}
handleShopTrash();
