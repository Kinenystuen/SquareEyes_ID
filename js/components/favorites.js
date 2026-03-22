import { getExistingFavInv } from "../utils/favFunctions.js";

export function saveFavBag(favBag) {
  if (!Array.isArray(favBag)) {
    console.error("saveFavBag expected an array, got:", favBag);
    return;
  }

  localStorage.setItem("favoritesBag", JSON.stringify(favBag));
}

export function isFavorite(movieId) {
  const currentFavBag = getExistingFavInv();

  if (!Array.isArray(currentFavBag)) {
    console.error("Favorites bag is not an array:", currentFavBag);
    return false;
  }

  return currentFavBag.some((bag) => String(bag.id) === String(movieId));
}

function getMovieDataFromButton(button) {
  const id = button.dataset.id;
  const title = button.dataset.title || "";
  const imageUrl = button.dataset.image || "";
  const imageAlt = button.dataset.imageAlt || title || "Movie poster";
  const genre = button.dataset.genre || "";
  const price = button.dataset.price || "";
  const discountedPrice = button.dataset.discountedprice || "";
  const released = button.dataset.released || "";
  const rating = button.dataset.rating || "";
  const index = button.dataset.index || "";

  return {
    id,
    title,
    image: {
      url: imageUrl,
      alt: imageAlt,
    },
    genre,
    price,
    discountedPrice,
    released,
    rating,
    index,
    favorite: true,
  };
}

export function handleClickFav(event) {
  const button = event.currentTarget;

  if (!button) {
    console.error("No favorite button found.");
    return;
  }

  const currentFavBag = getExistingFavInv();

  if (!Array.isArray(currentFavBag)) {
    console.error("Favorites bag is not an array:", currentFavBag);
    return;
  }

  const movieProduct = getMovieDataFromButton(button);

  if (!movieProduct.id) {
    console.error("Favorite button is missing data-id.");
    return;
  }

  const movieProductExists = currentFavBag.find(
    (bag) => String(bag.id) === String(movieProduct.id),
  );

  if (!movieProductExists) {
    currentFavBag.push(movieProduct);
    saveFavBag(currentFavBag);

    button.classList.remove("icon_heart");
    button.classList.add("icon_heart_checked");
  } else {
    const newFavMovie = currentFavBag.filter(
      (bag) => String(bag.id) !== String(movieProduct.id),
    );

    saveFavBag(newFavMovie);

    button.classList.remove("icon_heart_checked");
    button.classList.add("icon_heart");
  }
}