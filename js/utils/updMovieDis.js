import { handleClick } from "../components/shopping.js";
import { handleClickFav } from "../components/favorites.js";
import { getExistingFavInv } from "./favFunctions.js";
import { getExistingShopInv } from "./shopFunctions.js";
import { clearHTML } from "../render/clearHTML.js";

function showMessage(container, message, type = "error") {
  if (!container) return;

  container.innerHTML = `
    <div class="message ${type}">
      <p>${message}</p>
    </div>
  `;
}

export async function updateMovieDisplay(filteredMovies) {
  const movieContainer = document.getElementById("allMoviesContainer");

  if (!movieContainer) {
    console.error("Could not find #allMoviesContainer");
    return;
  }

  clearHTML(movieContainer);

  if (!filteredMovies) {
    console.error("updateMovieDisplay received no data:", filteredMovies);
    showMessage(movieContainer, "Something went wrong. Could not load movies.");
    return;
  }

  if (!Array.isArray(filteredMovies)) {
    console.error("updateMovieDisplay expected an array but got:", filteredMovies);
    showMessage(movieContainer, "Something went wrong. Invalid movie data received.");
    return;
  }

  if (filteredMovies.length === 0) {
    showMessage(movieContainer, "No movies found.");
    return;
  }

  const shoppingBag = getExistingShopInv();
  const favoritesBag = getExistingFavInv();

  for (let i = 0; i < filteredMovies.length; i++) {
    let cssShopClass = "gray";
    const doesObjectExist = shoppingBag.find(
      (bag) => String(bag.id) === String(filteredMovies[i].id),
    );

    if (doesObjectExist) {
      cssShopClass = "yellow";
    }

    let cssFavClass = "icon_heart";
    const doesFavObjectExist = favoritesBag.find(
      (bag) => String(bag.id) === String(filteredMovies[i].id),
    );

    if (doesFavObjectExist) {
      cssFavClass = "icon_heart_checked";
    }

    let cssOnSale = "";
    let oldPrice = "";
    let displayPrice = filteredMovies[i].price;
    let cssOldPrice = "";

    if (filteredMovies[i].discountedPrice < filteredMovies[i].price) {
      oldPrice = filteredMovies[i].price;
      displayPrice = filteredMovies[i].discountedPrice;
      cssOnSale = "on_sale";
      cssOldPrice = "old_price";
    }

    movieContainer.innerHTML += `
      <div class="movie_card">
        <div class="movie_cover">
          <a href="/products/movie_details.html?id=${filteredMovies[i].id}">
            <img
              class="cover_img"
              src="${filteredMovies[i].image.url}"
              alt="${filteredMovies[i].title}"
            />
          </a>
        </div>
        <div class="movie_info">
          <div class="flex space_between">
            <h2 class="movieinfoh2">
              <a href="/products/movie_details.html?id=${filteredMovies[i].id}">
                ${filteredMovies[i].title}
              </a>
            </h2>
            <div class="favoritesBagButton">
              <i class="pointer ${cssFavClass}"
                 aria-label="Save to your favorites"
                 title="Add to favorites"
                 data-id="${filteredMovies[i].id}"
                 data-title="${filteredMovies[i].title}"
                 data-image="${filteredMovies[i].image.url}"
                 data-description="${filteredMovies[i].description}"
                 data-price="${displayPrice}"
                 data-discountedPrice="${filteredMovies[i].discountedPrice}"
                 data-rating="${filteredMovies[i].rating}"
                 data-genre="${filteredMovies[i].genre}"
                 data-index="${filteredMovies[i].index}"
                 data-favorite="${filteredMovies[i].favorite}">
              </i>
            </div>
          </div>

          <p class="movie_descrition">
            ${filteredMovies[i].description}
          </p>

          <p class="movie_price ${cssOnSale}">
            ${displayPrice} kr
            <span class="${cssOldPrice}">${oldPrice}</span>
          </p>

          <div class="buttons pointer">
            <a href="/products/movie_details.html?id=${filteredMovies[i].id}"
               class="more_info_button">
              More info
            </a>
            <div class="shoppingBagButton">
              <i class="shopping_bag_button ${cssShopClass} add"
                 title="Add to shoppingcart"
                 data-id="${filteredMovies[i].id}"
                 data-title="${filteredMovies[i].title}"
                 data-image="${filteredMovies[i].image.url}"
                 data-description="${filteredMovies[i].description}"
                 data-price="${displayPrice}"
                 data-discountedPrice="${filteredMovies[i].discountedPrice}"
                 data-rating="${filteredMovies[i].rating}"
                 data-genre="${filteredMovies[i].genre}"
                 data-index="${filteredMovies[i].index}"
                 data-favorite="${filteredMovies[i].favorite}">
              </i>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  const shopBagButtons = document.querySelectorAll(".shopping_bag_button");
  const iconHeartButtons = document.querySelectorAll(".icon_heart, .icon_heart_checked");

  shopBagButtons.forEach((button) => {
    button.addEventListener("click", handleClick);
  });

  iconHeartButtons.forEach((button) => {
    button.addEventListener("click", handleClickFav);
  });
}