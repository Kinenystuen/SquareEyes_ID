import { getExistingFavInv } from "../utils/favFunctions.js";

function saveFavBag(favBag) {
  if (!Array.isArray(favBag)) {
    console.error("saveFavBag expected an array, got:", favBag);
    return;
  }

  localStorage.setItem("favoritesBag", JSON.stringify(favBag));
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

export function handleClickFavMovie(event, movieInfo) {
  const button = event.currentTarget;

  if (!button) {
    console.error("No favorite button found.");
    return;
  }

  if (!movieInfo || typeof movieInfo !== "object") {
    console.error("handleClickFavMovie received invalid movieInfo:", movieInfo);
    return;
  }

  const currentFavBag = getExistingFavInv();

  if (!Array.isArray(currentFavBag)) {
    console.error("Favorites bag is not an array:", currentFavBag);
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
  const favorite = true;

  if (!id) {
    console.error("Movie is missing id:", movieInfo);
    return;
  }

  const movieProductExists = currentFavBag.find(
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

    currentFavBag.push(movieProduct);
    saveFavBag(currentFavBag);

    button.classList.remove("icon_heart");
    button.classList.add("icon_heart_checked");
  } else {
    const newFavMovie = currentFavBag.filter(
      (bag) => String(bag.id) !== String(id),
    );

    saveFavBag(newFavMovie);

    button.classList.remove("icon_heart_checked");
    button.classList.add("icon_heart");
  }
}