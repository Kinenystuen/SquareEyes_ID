import { fetchApiSelectedMovie } from "../api/selectedMovieData.js";
import { handleClickSelMovie } from "./shoppingSelMovie.js"; 
import { getExistingShopInv } from "../utils/shopFunctions.js";
const shoppingBag = getExistingShopInv();

const movieDetailContainer = document.getElementById("movieDetailContainer");

export function displaySelectedMovie(movieInfo) {
  document.title = "SquareEyes | " + `${movieInfo.title}`;
  console.log(movieInfo.id)
  if (movieInfo.id) {
    // Code for shopping bag
    let cssShopClass = "gray";
    const doesObjectExist = shoppingBag.find(function (bag) {
      return parseInt(bag.id) === parseInt(movieInfo.id);
    });
    if (doesObjectExist) {
      cssShopClass = "yellow";
    }


    movieDetailContainer.innerHTML = `<section class="content_wrap" id="movieImage">
  <img class="movieImage" src="${movieInfo.image}"/>
  <div class="headerpic_gradient">
      <div class="content_wrap ">
          <div class="movie_info">
              <div class="movie_info_top">
                  <h1>${movieInfo.title}</h1>
                  <div class="imdb_rating_mobile">
                      <span>IMDb RATING</span>
                      <span>${movieInfo.rating}</span>
                  </div>
              </div>
              <p class="movie_descrition">${movieInfo.description}</p>
              <p class="movie_price">${movieInfo.price} kr</p>
              <div class="button_icon_area">
                  <div class="watchButtonArea">
                  <button id="playbutton" class="playbutton" tabindex="0" onclick="watchtrailer()">Watch trailer</button></div>
                  <div class="icons">
                <i class="icon_heart" aria-label="Save to your favorites"></i>
                <i class="icon_pluss" aria-label="Save to your list"></i>
            </div>          
          </div>
        <div class="shopBagButton"><div class="shoppingBagButtonSelMovie ${cssShopClass}" data-id="${movieInfo.id}" data-title="${movieInfo.title}" data-image="${movieInfo.image}" data-description="${movieInfo.description}" data-price="${movieInfo.price}" data-discountedPrice="${movieInfo.discountedPrice}" data-rating="${movieInfo.rating}" data-genre="${movieInfo.genre}" data-index="${movieInfo.index}" aria-label="Add to shopping bag"><span class="shopping_bag_icon sizeFit"></span></div></div>
      </div>
  </div>
</section>
<section class="movie_details_section content_wrap">
  <h2>Movie details:</h2>
  <div class="movie_details">
      <div class="details_more">
          <div class="movie_details_more">
              <p class="what">Title</p>
              <p class="it_is">${movieInfo.title}</p>
          </div>    
          <div class="movie_details_more">
              <p class="what">Genre</p>
              <p class="it_is">${movieInfo.genre}</p>
          </div>
          <div class="movie_details_more">
              <p class="what">Released</p>
              <p class="it_is">${movieInfo.released}</p>
          </div>
      </div>
      <div class="imdb_rating">
          <span>IMDb RATING</span>
          <span>${movieInfo.rating}</span>
      </div>
  </div>
</section>`;


const shopBagButtons = document.querySelectorAll(".shopBagButton");

// Event listener for shopping bag
shopBagButtons.forEach((button) => {
    //button.addEventListener("click", handleClickSelMovie);
    button.addEventListener("click", (event) => handleClickSelMovie(event, movieInfo));
  });
  } else {
    movieDetailContainer.innerHTML = `Sorry we could not access the id of the movie`;
  }
}
