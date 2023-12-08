//
import { fetchApiSelectedMovie } from "../api/selectedMovieData.js";
import { displaySelectedMovie } from "./displaySelectedMovie.js";
import { getExistingShopInv } from "../utils/shopFunctions.js";
import { updShoppingBagCount } from "./displayShopCount.js";


const shoppingBag = getExistingShopInv();

export function handleClickSelMovie(event, movieInfo) {
  event.target.classList.toggle("gray");
  event.target.classList.toggle("yellow");

  const optionsContainer = document.getElementById("optionsButton");

  if (event.target.classList.contains("yellow")) {
    optionsContainer.style.display = "flex"; 
  }
  else {
    optionsContainer.style.display = "none";
  }
  

  const currentShopBag = getExistingShopInv();
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
      favorite: favorite,
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
