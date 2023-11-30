
//

// favFunctions.js
import { getExistingFavInv } from "../utils/favFunctions.js";

export async function displayFavoritesBag() {
  const favoritesBag = getExistingFavInv();

  const favoritesBagContainer = document.getElementById("favoritesBagContainer");

  if (favoritesBag.length === 0) {
    favoritesBagContainer.innerHTML = "No movies added";
  }
  favoritesBagContainer.innerHTML = ``;
  if (favoritesBag.length === 0) {
    favoritesBagContainer.innerHTML = `<div class="information_box flexdown">
    <div class="information_text">There is no favorites yet  </div>
    <div class="information_text link"><a href="/movie-pages/all-movies.html">Click here to see all movies</a></div>`;
  } else {
  }
  favoritesBag.forEach((favMovies) => {
    favoritesBagContainer.innerHTML += `<div class="information_box">
                                        <a href="/products/movie_details.html?id=${favMovies.id}" class="movie_cover"
                                          ><img
                                            src="${favMovies.image}"
                                            alt="${favMovies.title} movie cover"
                                        /></a>
                                        <div class="information_text">
                                          <a href="/products/movie_details.html?id=${favMovies.id}"><h3>${favMovies.title}</h3></a>
                                        </div>
                                        <div class="information_box_end">
                                            <div class="figure_flex">
                                                <figure
                                                class="icon_x"
                                                aria-label="Remove from favorites"
                                                title="Remove from favorites"
                                                ></figure>
                                            </div>
                                          <a href="/products/movie_details.html?id=${favMovies.id}">
                                            <div class="figure_rightarrow">
                                              <p>More info</p>
                                              <figure class="rightarrow2"></figure>
                                            </div>
                                          </a>
                                          
                                        </div>
                                      </div>`;

  });

  const figurexButton = document.querySelectorAll(".icon_x");

  figurexButton.forEach((button) => {
    button.addEventListener("click", handleFavTrash);
  });
}
displayFavoritesBag();

export function handleFavTrash(event) {
  if (event) {
    const figurexButton = document.querySelectorAll(".icon_x");
    const indexFavBag = Array.from(figurexButton).indexOf(event.target);

    // Retrieve the existing favorites bag from local storage
    const favoritesBag = getExistingFavInv();
    if (indexFavBag >= 0 && indexFavBag < favoritesBag.length) {
      // Remove the item from the favorites bag array
      favoritesBag.splice(indexFavBag, 1);

      // Update the local storage with the modified favorites bag
      localStorage.setItem("favoritesBag", JSON.stringify(favoritesBag));

      // Update the displayed favorites bag
      displayFavoritesBag();
    }
  }
}
handleFavTrash();



/* <div class="information_box">
              <a href="/products/batman-movie-page.html" class="movie_cover"
                ><img
                  src="/images/Movie_hollywood.jpeg"
                  alt="Once upon a time in Hollywood movie cover"
              /></a>
              <div class="information_text">
                <h3>Once upon a time in Hollywood</h3>
              </div>
              <div class="information_box_end">
                <a href="/products/batman-movie-page.html">
                  <div class="figure_rightarrow">
                    <p>Rent now</p>
                    <figure class="rightarrow2"></figure>
                  </div>
                </a>
                <div class="figure_x">
                  <figure
                    class="icon_x"
                    aria-label="Remove from list"
                    title="Remove from list"
                  ></figure>
                </div>
              </div>
            </div> */