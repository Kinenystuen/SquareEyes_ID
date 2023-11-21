//

import { displayMovies } from "./displayAllMovies.js";
import { getExistingFavInv } from "../utils/favFunctions.js";

const favoritesBag = getExistingFavInv();

export function handleClickFav(event) {
  event.target.classList.toggle("icon_heart");
  event.target.classList.toggle("icon_heart_checked");

  const currentFavBag = getExistingFavInv();
  const id = this.dataset.id;
  const title = this.dataset.title;
  const image = this.dataset.image;
  const genre = this.dataset.genre;
  const price = this.dataset.price;
  const discountedPrice = this.dataset.discountedPrice;
  const released = this.dataset.released;
  const rating = this.dataset.rating;
  const index = this.dataset.index;
  const favorite = this.dataset.favorite;

  const movieProductExists = currentFavBag.find(function (bag) {
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
      favorite: favorite,
    };
    currentFavBag.push(movieProduct);
    saveFavBag(currentFavBag);
  } else {
    const newFavMovie = currentFavBag.filter((bag) => bag.id !== id);
    saveFavBag(newFavMovie);
  }

}

function saveFavBag(favBag) {
  localStorage.setItem("favoritesBag", JSON.stringify(favBag));
}
