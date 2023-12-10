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
                              ><img src="${movies.image}" alt="${movies.title} cover"
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

displayYourMovies();


// Function to handle the "paynow" button click

// document.getElementById("paynow").addEventListener("click", function () {
//   const shoppingBag = getExistingShopInv();
//   const paidMovies = getExistingPaidMovies() || [];
//   paidMovies.push(...shoppingBag);
//   localStorage.setItem("paidMovies", JSON.stringify(paidMovies));
//   displayPaidMovies();
// });



// // Function to retrieve existing paid movies from local storage
// function getExistingPaidMovies() {
//   return JSON.parse(localStorage.getItem("paidMovies")) || [];
// }


// // Function to fetch and display paid movies at the specified container
// export function displayPaidMovies() {
//   const paidMoviesContainer = document.getElementById("purchase_movies_container");
//   const paidMovies = getExistingPaidMovies();
//   paidMoviesContainer.innerHTML = '';
//   paidMovies.forEach(movie => {
//     const movieDiv = document.createElement('div');
//     movieDiv.textContent = movie.title; // Adjust this based on your movie object structure
//     paidMoviesContainer.appendChild(movieDiv);
//   });
// }

