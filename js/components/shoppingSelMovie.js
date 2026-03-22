import { getExistingShopInv } from "../utils/shopFunctions.js";
import { updShoppingBagCount } from "./displayShopCount.js";

function saveShopBag(shopBag) {
  if (!Array.isArray(shopBag)) {
    console.error("saveShopBag expected an array, got:", shopBag);
    return;
  }

  localStorage.setItem("shoppingBag", JSON.stringify(shopBag));
}

function getMovieImage(movieInfo) {
  if (typeof movieInfo.image === "string") {
    return {
      url: movieInfo.image,
      alt: movieInfo.title || "Movie poster",
    };
  }

  return {
    url: movieInfo.image?.url || "",
    alt: movieInfo.image?.alt || movieInfo.title || "Movie poster",
  };
}

export function handleClickSelMovie(event, movieInfo) {
  const button = event.currentTarget;

  if (!button) {
    console.error("No shopping button found.");
    return;
  }

  if (!movieInfo || typeof movieInfo !== "object") {
    console.error("handleClickSelMovie received invalid movieInfo:", movieInfo);
    return;
  }

  const optionsContainer = document.getElementById("optionsButton");
  const currentShopBag = getExistingShopInv();

  if (!Array.isArray(currentShopBag)) {
    console.error("Shopping bag is not an array:", currentShopBag);
    return;
  }

  const id = movieInfo.id;
  const title = movieInfo.title || "";
  const image = getMovieImage(movieInfo);
  const genre = movieInfo.genre || "";
  const price = movieInfo.price || "";
  const discountedPrice = movieInfo.discountedPrice || "";
  const released = movieInfo.released || "";
  const rating = movieInfo.rating || "";
  const index = movieInfo.index || "";
  const favorite = movieInfo.favorite || false;

  if (!id) {
    console.error("Movie is missing id:", movieInfo);
    return;
  }

  const movieProductExists = currentShopBag.find(
    (bag) => String(bag.id) === String(id),
  );

  if (!movieProductExists) {
    const movieProduct = {
      id,
      title,
      image,
      genre,
      price,
      discountedPrice,
      released,
      rating,
      index,
      favorite,
    };

    currentShopBag.push(movieProduct);
    saveShopBag(currentShopBag);

    button.classList.remove("gray");
    button.classList.add("yellow");

    if (optionsContainer) {
      optionsContainer.style.display = "flex";
    }
  } else {
    const newShopMovie = currentShopBag.filter(
      (bag) => String(bag.id) !== String(id),
    );

    saveShopBag(newShopMovie);

    button.classList.remove("yellow");
    button.classList.add("gray");

    if (optionsContainer) {
      optionsContainer.style.display = "none";
    }
  }

  updShoppingBagCount();
}