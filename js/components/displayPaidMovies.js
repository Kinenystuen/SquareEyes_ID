import { getExistingShopInv } from "../utils/shopFunctions.js";

export async function displayYourMovies() {
  const shoppingBag = await getExistingShopInv();

  const purchase_movies_container = document.getElementById(
    "purchase_movies_container"
  );

  shoppingBag.forEach((movies) => {
      purchase_movies_container.innerHTML += `
                          <div class="information_box2">
                            <a href="/products/movie_details.html?id=${movies.id}" class="movie_cover"
                              ><img src="${movies.image.url}" alt="${movies.image.alt} cover"
                              /></a>
                              <div class="information_movie_text">
                              <h4>${movies.title}</h4>
                              </div>
                              <a href="#" class="profile_watch_now"
                              >Watch now
                              <figure class="rightarrow2"></figure
                              ></a>
                              </div>
    `;
    });

}

const purchaseMoviesContainer = document.getElementById("purchase_movies_container");

if (purchaseMoviesContainer) {
  displayYourMovies();
}

