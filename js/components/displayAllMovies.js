import { fetchApiSquareEyes } from "../api/squareeyesData.js";
import { handleClick } from "./shopping.js";
import { handleClickFav } from "./favorites.js";
import { getExistingShopInv } from "../utils/shopFunctions.js";
import { getExistingFavInv } from "../utils/favFunctions.js";

/*///////////////////////////////
Display all movies
////////////////////////////////*/

// fetching existing shoppingbag inventory
const shoppingBag = getExistingShopInv();
const favoritesBag = getExistingFavInv();

export async function displayMovies(allMovies) {
  const allMoviesContainer = document.getElementById("allMoviesContainer");
  allMoviesContainer.innerHTML = "";
  for (let i = 0; i < allMovies.length; i++) {
    // Code for shopping bag
    let cssShopClass = "gray";
    const doesObjectExist = shoppingBag.find(function (bag) {
      return parseInt(bag.id) === parseInt(allMovies[i].id);
    });
    if (doesObjectExist) {
      cssShopClass = "yellow";
    }
    // Code for favorites bag
    let cssFavClass = "icon_heart";
    const doesFavObjectExist = favoritesBag.find(function (bag) {
      return parseInt(bag.id) === parseInt(allMovies[i].id);
    });
    if (doesFavObjectExist) {
      cssFavClass = "icon_heart_checked";
    }

    allMoviesContainer.innerHTML += `
                                        <div class="movie_card">
                                        <div class="movie_cover">
                                            <a href="/products/movie_details.html?id=${allMovies[i].id}">
                                                <img
                                                class="cover_img"
                                                src="${allMovies[i].image}"
                                                />
                                            </a>
                                        </div>
                                        <div class="movie_info">
                                            <h2><a href="/products/movie_details.html?id=${allMovies[i].id}">${allMovies[i].title}</a></h2>
                                            <p class="movie_descrition">
                                            ${allMovies[i].description}
                                            </p>
                                            <p class="movie_price">${allMovies[i].price} kr</p>
                                            <div class="icons">
                                            <div class="favoritesBagButton">
                                              <i class="icon_heart pointer ${cssFavClass}" aria-label="Save to your favorites" title="Add to favorites" data-id="${allMovies[i].id}" data-title="${allMovies[i].title}" data-image="${allMovies[i].image}" data-description="${allMovies[i].description}" data-price="${allMovies[i].price}" data-discountedPrice="${allMovies[i].discountedPrice}" data-rating="${allMovies[i].rating}" data-genre="${allMovies[i].genre}" data-index="${allMovies[i].index}"  data-favorite="${allMovies[i].favorite}"></i>
                                              </div>
                                              <i class="icon_pluss pointer" aria-label="Save to your list"></i>
                                            </div>
                                            <div class="buttons pointer">
                                            <a
                                                href="/products/movie_details.html?id=${allMovies[i].id}"
                                                class="more_info_button"
                                                >More info</a>
                                             <div class="shoppingBagButton"> 
                                                <i class="shopping_bag_button ${cssShopClass} add" title="Add to shoppingcart" data-id="${allMovies[i].id}" data-title="${allMovies[i].title}" data-image="${allMovies[i].image}" data-description="${allMovies[i].description}" data-price="${allMovies[i].price}" data-discountedPrice="${allMovies[i].discountedPrice}" data-rating="${allMovies[i].rating}" data-genre="${allMovies[i].genre}" data-index="${allMovies[i].index}" data-favorite="${allMovies[i].favorite}">
                                                 <span class="shopping_bag"></span></i>
                                            </div>
                                            </div>
                                        </div>
                                    </div>

                                    `;
  }
  const shopBagButtons = document.querySelectorAll(".shopping_bag_button");
  const iconHeartButtons = document.querySelectorAll(".icon_heart");

  // Event listener for shopping bag
  shopBagButtons.forEach((button) => {
    button.addEventListener("click", handleClick);
  });
  // Event listener for shopping bag
  iconHeartButtons.forEach((button) => {
    button.addEventListener("click", handleClickFav);
  });
}

// // Creating genre buttons
// document.getElementById("genreButtons").addEventListener("click", function (event) {
//   if (event.target.tagName === "BUTTON") {
//     const selectedGenre = event.target.dataset.genre;
//     displayMoviesByGenre(selectedGenre);
//   }
// });

