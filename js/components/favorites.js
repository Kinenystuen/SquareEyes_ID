//

import { displayMovies } from "./displayAllMovies.js";
import { getExistingFavInv } from "../utils/favFunctions.js";
import { fetchApiSquareEyes } from "../api/squareeyesData.js";


export function handleClickFav(event) {

  const favoritesBag = getExistingFavInv();
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
      favorite: true,
    };
    currentFavBag.push(movieProduct);
    saveFavBag(currentFavBag);
  } else {
    const newFavMovie = currentFavBag.filter((bag) => bag.id !== id);
    saveFavBag(newFavMovie);
  }

}

export function saveFavBag(favBag) {
  localStorage.setItem("favoritesBag", JSON.stringify(favBag));
}

export async function checkIfFav() {
  const allMovies = await fetchApiSquareEyes();
  const currentFavBag = getExistingFavInv();

  const movieProductExists = currentFavBag.find(function (bag) {
    return bag.id === id;
  });
  // Checks if there is any favorites in the api data already
  allMovies.forEach(movie => {
    if (movie.favorite && movieProductExists === undefined) {
      console.log(`${movie.title} is fav`);
      currentFavBag.push(movie);
      saveFavBag(currentFavBag);
    }
  });

}


checkIfFav();