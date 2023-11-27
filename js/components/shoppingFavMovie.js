//
import { fetchApiSelectedMovie } from "../api/selectedMovieData.js";
import { displaySelectedMovie } from "./displaySelectedMovie.js";
import { getExistingFavInv } from "../utils/favFunctions.js";


const favoritesBag = getExistingFavInv();

export function handleClickFavMovie(event, movieInfo) {
  console.log(movieInfo.id)
  event.target.classList.toggle("icon_heart");
  event.target.classList.toggle("icon_heart_checked");

  const currentFavBag = getExistingFavInv();
  const id = movieInfo.id;
    const title = movieInfo.title;
    const image = movieInfo.image;
    const genre = movieInfo.genre;
    const price = movieInfo.price;
    const discountedPrice = movieInfo.discountedPrice;
    const released = movieInfo.released;
    const rating = movieInfo.rating;
    const index = movieInfo.index;
    const favorite = movieInfo.favorite;

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
