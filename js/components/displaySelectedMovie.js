import { handleClickSelMovie } from "./shoppingSelMovie.js";
import { handleClickFavMovie } from "./shoppingFavMovie.js";
import { getExistingShopInv } from "../utils/shopFunctions.js";
import { getExistingFavInv } from "../utils/favFunctions.js";

function showMessage(container, message) {
  if (!container) return;

  container.innerHTML = `
    <div class="message error">
      <p>${message}</p>
    </div>
  `;
}

function getMovieImage(movieInfo) {
  if (typeof movieInfo.image === "string") {
    return movieInfo.image;
  }

  if (movieInfo.image && movieInfo.image.url) {
    return movieInfo.image.url;
  }

  return "";
}

export function displaySelectedMovie(movieInfo) {
  const movieDetailContainer = document.getElementById("movieDetailContainer");

  if (!movieDetailContainer) {
    console.error("Could not find #movieDetailContainer");
    return;
  }

  if (!movieInfo || typeof movieInfo !== "object") {
    console.error("displaySelectedMovie received invalid movieInfo:", movieInfo);
    showMessage(movieDetailContainer, "Could not load movie details.");
    return;
  }

  if (!movieInfo.id) {
    console.error("Movie is missing id:", movieInfo);
    showMessage(movieDetailContainer, "Movie details are incomplete.");
    return;
  }

  const shoppingBag = getExistingShopInv();
  const favoritesBag = getExistingFavInv();

  if (!Array.isArray(shoppingBag) || !Array.isArray(favoritesBag)) {
    console.error("Shopping bag or favorites bag is invalid.", {
      shoppingBag,
      favoritesBag,
    });
    showMessage(movieDetailContainer, "Something went wrong loading this page.");
    return;
  }

  const imageUrl = getMovieImage(movieInfo);

  if (!imageUrl) {
    console.error("Movie image is missing:", movieInfo);
    showMessage(movieDetailContainer, "Could not load movie image.");
    return;
  }

  document.title = `SquareEyes | ${movieInfo.title || "Movie details"}`;

  let cssShopClass = "gray";
  const doesObjectExist = shoppingBag.find(
    (bag) => String(bag.id) === String(movieInfo.id),
  );

  if (doesObjectExist) {
    cssShopClass = "yellow";
  }

  let cssFavClass = "icon_heart";
  const doesFavObjectExist = favoritesBag.find(
    (bag) => String(bag.id) === String(movieInfo.id),
  );

  if (doesFavObjectExist) {
    cssFavClass = "icon_heart_checked";
  }

  let cssOnSale = "";
  let oldPrice = "";
  let cssOldPrice = "";
  let displayPrice = movieInfo.price;

  if (
    movieInfo.discountedPrice != null &&
    movieInfo.price != null &&
    Number(movieInfo.discountedPrice) < Number(movieInfo.price)
  ) {
    oldPrice = movieInfo.price;
    displayPrice = movieInfo.discountedPrice;
    cssOnSale = "on_sale";
    cssOldPrice = "old_price";
  }

  movieDetailContainer.innerHTML = `
    <section id="movieImage">
      <img class="movieImage" src="${imageUrl}" alt="${movieInfo.title || "Movie"}" />
      <div class="headerpic_gradient">
        <div class="content_wrap">
          <div class="movie_info">
            <div class="movie_info_top">
              <h1>${movieInfo.title || ""}</h1>
              <div class="imdb_rating_mobile">
                <span>IMDb RATING</span>
                <span>${movieInfo.rating || ""}</span>
              </div>
            </div>

            <p class="movie_descrition">${movieInfo.description || ""}</p>

            <p class="movie_price ${cssOnSale}">
              ${displayPrice ?? ""} kr
              <span class="${cssOldPrice}">${oldPrice}</span>
            </p>

            <div class="button_icon_area">
              <div class="watchButtonArea">
                <button id="playbutton" class="playbutton pointer" tabindex="0" type="button">
                  Watch trailer
                </button>
              </div>

              <div class="favoritesBagButton pointer">
                <i
                  class="${cssFavClass}"
                  aria-label="Save to your favorites"
                  title="Add to favorites"
                  data-id="${movieInfo.id}"
                  data-title="${movieInfo.title || ""}"
                  data-image="${imageUrl}"
                  data-description="${movieInfo.description || ""}"
                  data-price="${displayPrice ?? ""}"
                  data-discountedPrice="${movieInfo.discountedPrice ?? ""}"
                  data-rating="${movieInfo.rating || ""}"
                  data-genre="${movieInfo.genre || ""}"
                  data-index="${movieInfo.index || ""}"
                  data-favorite="${movieInfo.favorite || false}"
                  data-released="${movieInfo.released || ""}"
                ></i>
              </div>
            </div>

            <div
              class="shopBagButton pointer"
              data-id="${movieInfo.id}"
              data-title="${movieInfo.title || ""}"
              data-image="${imageUrl}"
              data-description="${movieInfo.description || ""}"
              data-price="${displayPrice ?? ""}"
              data-discountedPrice="${movieInfo.discountedPrice ?? ""}"
              data-rating="${movieInfo.rating || ""}"
              data-genre="${movieInfo.genre || ""}"
              data-index="${movieInfo.index || ""}"
              data-favorite="${movieInfo.favorite || false}"
              aria-label="Add to shopping bag"
              title="Add to shopping bag"
            >
              <div class="shoppingBagButtonSelMovie ${cssShopClass}"></div>
            </div>

            <div class="buttonsOptions" id="optionsButton">
              <a href="/movie-pages/all-movies.html" class="buttonOption">Continue shopping</a>
              <a href="/checkout.html" class="buttonOption">Go to shopping bag</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="movie_details_section content_wrap">
      <h2>Movie details:</h2>
      <div class="movie_details">
        <div class="details_more">
          <div class="movie_details_more">
            <p class="what">Title</p>
            <p class="it_is">${movieInfo.title || ""}</p>
          </div>
          <div class="movie_details_more">
            <p class="what">Genre</p>
            <p class="it_is">${movieInfo.genre || ""}</p>
          </div>
          <div class="movie_details_more">
            <p class="what">Released</p>
            <p class="it_is">${movieInfo.released || ""}</p>
          </div>
        </div>
        <div class="imdb_rating">
          <span>IMDb RATING</span>
          <span>${movieInfo.rating || ""}</span>
        </div>
      </div>
    </section>

    <section class="moviephotos_section content_wrap">
      <h2>Photos:</h2>
      <div class="photos_from_movie">
        <img src="${imageUrl}" alt="${movieInfo.title || "Movie"} cover image" />
      </div>
    </section>
  `;

  const shopBagButton = movieDetailContainer.querySelector(".shopBagButton");
  const favoriteButton = movieDetailContainer.querySelector(".favoritesBagButton i");
  const optionsContainer = document.getElementById("optionsButton");
  const playButton = document.getElementById("playbutton");

  if (optionsContainer) {
    optionsContainer.style.display = doesObjectExist ? "flex" : "none";
  }

  if (shopBagButton) {
    shopBagButton.addEventListener("click", (event) =>
      handleClickSelMovie(event, movieInfo),
    );
  }

  if (favoriteButton) {
    favoriteButton.addEventListener("click", (event) =>
      handleClickFavMovie(event, movieInfo),
    );
  }

  if (playButton) {
    playButton.addEventListener("click", () => {
      console.log("Trailer button clicked");
    });
  }
}