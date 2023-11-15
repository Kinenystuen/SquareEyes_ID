/* ///////////////////////////
    Most popular movie - in my opinion
    ////////////////////////////*/

import { fetchApiSquareEyes } from "../api/squareeyesData.js";

export function displayPopularMovie(allMovies) {
  const mostPopularNow = document.getElementById("mostPopularNow");

  mostPopularNow.innerHTML = "";
  // Find the movie with the highest rating - it works
  //   const higestRatedMovie = allMovies.reduce((prev, current) => {
  //     return prev.rating > current.rating ? prev : current;
  //   });

  mostPopularNow.innerHTML = `
                <div class="section5_image">
                    <img src="${allMovies[11].image}" class="mostPopular" alt="${allMovies[11].title}"/>
                </div>
                <div class="background_gradient"></div>
                <div class="section5_info">
                    <h2 class="AbrilFatface">Most popular right now:</h2>
                    <h3>${allMovies[11].title}</h3>
                    <a href="/products/movie_details.html?id=${allMovies[11].id}">More info</a>
                </div>
              `;
}
