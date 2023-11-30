// import { fetchApiSquareEyes } from "../api/squareeyesData.js";

import { handleClick } from "../components/shopping.js";
import { handleClickFav } from "../components/favorites.js";

import { getExistingFavInv } from "./favFunctions.js";
import { getExistingShopInv } from "./shopFunctions.js";




export async function updateMovieDisplay(filteredMovies) {

    // fetching existing shoppingbag inventory
    const shoppingBag = getExistingShopInv();
    const favoritesBag = getExistingFavInv();

    const movieContainer = document.getElementById("allMoviesContainer");
    movieContainer.innerHTML = "";
    
    // display what genre that is selected
  for (let i = 0; i < filteredMovies.length; i++) {

    // Code for shopping bag
    let cssShopClass = "gray";
    const doesObjectExist = shoppingBag.find(bag => String(bag.id) === String(filteredMovies[i].id));

    //console.log(`Movie ID: ${filteredMovies[i].id}, Does Exist in Shopping Bag: ${!!doesObjectExist}`);
    if (doesObjectExist) {
      cssShopClass = "yellow";
    }
    // Code for favorites bag
    let cssFavClass = "icon_heart";
    const doesFavObjectExist = favoritesBag.find(bag => String(bag.id) === String(filteredMovies[i].id));
    if (doesFavObjectExist) {
      cssFavClass = "icon_heart_checked";
    }

    movieContainer.innerHTML += `
                                          <div class="movie_card">
                                          <div class="movie_cover">
                                              <a href="/products/movie_details.html?id=${filteredMovies[i].id}">
                                                  <img
                                                  class="cover_img"
                                                  src="${filteredMovies[i].image}"
                                                  />
                                              </a>
                                          </div>
                                          <div class="movie_info">
                                            <div class="flex space_between">
                                                <h2 class="movieinfoh2"><a href="/products/movie_details.html?id=${filteredMovies[i].id}">${filteredMovies[i].title}</a></h2>
                                                <div class="favoritesBagButton">
                                                <i class="icon_heart pointer ${cssFavClass}" aria-label="Save to your favorites" title="Add to favorites" data-id="${filteredMovies[i].id}" data-title="${filteredMovies[i].title}" data-image="${filteredMovies[i].image}" data-description="${filteredMovies[i].description}" data-price="${filteredMovies[i].price}" data-discountedPrice="${filteredMovies[i].discountedPrice}" data-rating="${filteredMovies[i].rating}" data-genre="${filteredMovies[i].genre}" data-index="${filteredMovies[i].index}"  data-favorite="${filteredMovies[i].favorite}"></i>
                                                </div>
                                              </div>
                                              
                                              <p class="movie_descrition">
                                              ${filteredMovies[i].description}
                                              </p>
                                              <p class="movie_price">${filteredMovies[i].price} kr</p>
                                              <div class="icons">
                                              </div>
                                              <div class="buttons pointer">
                                              <a
                                                  href="/products/movie_details.html?id=${filteredMovies[i].id}"
                                                  class="more_info_button"
                                                  >More info</a>
                                               <div class="shoppingBagButton"> 
                                                  <i class="shopping_bag_button ${cssShopClass} add" title="Add to shoppingcart" data-id="${filteredMovies[i].id}" data-title="${filteredMovies[i].title}" data-image="${filteredMovies[i].image}" data-description="${filteredMovies[i].description}" data-price="${filteredMovies[i].price}" data-discountedPrice="${filteredMovies[i].discountedPrice}" data-rating="${filteredMovies[i].rating}" data-genre="${filteredMovies[i].genre}" data-index="${filteredMovies[i].index}" data-favorite="${filteredMovies[i].favorite}">
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


  console.log(filteredMovies);
}