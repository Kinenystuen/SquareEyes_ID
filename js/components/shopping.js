//

import { displayMovies } from "./displayAllMovies.js";
import { getExistingShopInv } from "../utils/shopFunctions.js";
import { updShoppingBagCount } from "./displayShopCount.js";

const shoppingBag = getExistingShopInv();

export function handleClick(event) {
  event.target.classList.toggle("gray");
  event.target.classList.toggle("yellow");

  const id = this.dataset.id;
  const title = this.dataset.title;
  const image = this.dataset.image;
  const genre = this.dataset.genre;
  const price = this.dataset.price;
  const discountedPrice = this.dataset.discountedPrice;
  const released = this.dataset.released;
  const rating = this.dataset.rating;
  const index = this.dataset.index;
  const currentShopBag = getExistingShopInv();

  const movieProductExists = currentShopBag.find(function (bag) {
    return bag.id === id;
  });
  if (movieProductExists === undefined) {
    const movieProduct = {
      id: id,
      title: title,
      image: image,
      genre: genre,
      price: price,
      discountedPrice: discountedPrice,
      released: released,
      rating: rating,
      index: index,
    };
    currentShopBag.push(movieProduct);
    saveShopBag(currentShopBag);
  } else {
    const newShopMovie = currentShopBag.filter((bag) => bag.id !== id);
    saveShopBag(newShopMovie);
  }

  updShoppingBagCount();
}

function saveShopBag(shopBag) {
  localStorage.setItem("shoppingBag", JSON.stringify(shopBag));
}
