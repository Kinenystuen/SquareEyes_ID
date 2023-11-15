import { fetchApiSelectedMovie } from "../api/selectedMovieData.js";

const movieDetailContainer = document.getElementById("movieDetailContainer");

export function displaySelectedMovie(movieInfo) {
  document.title = "SquareEyes | " + `${movieInfo.title}`;
  if (movieInfo.id) {
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
                  <div class="watchButtonArea"></div>
                  
              </div>
              
              <div class="shoppingbag_options">
                  <a href="/movie-pages/all-movies.html"><span class="leftarrow"></span>Continue
                          shopping</a>
                  <a href="/checkout.html">Go to shopping bag<span
                              class="rightarrow"></span></a>
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
}
else {
    movieDetailContainer.innerHTML = `Sorry we could not access the id of the movie`;
}
}
