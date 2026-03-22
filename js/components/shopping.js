import { getExistingShopInv } from "../utils/shopFunctions.js";
import { updShoppingBagCount } from "./displayShopCount.js";
import { displayAddToCart } from "./displayShopBox.js";

function saveShopBag(shopBag) {
  if (!Array.isArray(shopBag)) {
    console.error("saveShopBag expected an array, got:", shopBag);
    return;
  }

  localStorage.setItem("shoppingBag", JSON.stringify(shopBag));
}

export function handleClick(event) {
  const button = event.currentTarget;

  if (!button) {
    console.error("No shopping button found.");
    return;
  }

  const currentShopBag = getExistingShopInv();

  if (!Array.isArray(currentShopBag)) {
    console.error("Shopping bag is not an array:", currentShopBag);
    return;
  }

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
  const favorite = button.dataset.favorite || false;

  if (!id) {
    console.error("Shopping button is missing data-id.");
    return;
  }

  const movieProductExists = currentShopBag.find(
    (bag) => String(bag.id) === String(id),
  );

  if (!movieProductExists) {
    const movieProduct = {
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
      favorite,
    };

    currentShopBag.push(movieProduct);
    saveShopBag(currentShopBag);

    button.classList.remove("gray");
    button.classList.add("yellow");

    displayAddToCart();
  } else {
    const newShopMovie = currentShopBag.filter(
      (bag) => String(bag.id) !== String(id),
    );

    saveShopBag(newShopMovie);

    button.classList.remove("yellow");
    button.classList.add("gray");
  }

  updShoppingBagCount();
}