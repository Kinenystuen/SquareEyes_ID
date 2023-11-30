import { getExistingShopInv } from "../utils/shopFunctions.js";

export async function displayCheckout() {
  const shoppingBag = await getExistingShopInv();

  //const paynowButton = document.querySelector(".payNowButton");
  const loadCheckout = document.getElementById(
    "checkoutSucsess"
  );

  //let paidMovies = JSON.parse(localStorage.getItem("paidMovies")) || [];
  shoppingBag.forEach((movies) => {
    loadCheckout.innerHTML += `
                              <div class="gridfit200">
                                <h2>${movies.title}</h2>
                                <img src="${movies.image}" alt="${movies.title}" />
                                <button>Start Watching</button>
                              </div>
    `;
    });

}

displayCheckout();


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

