import { getExistingShopInv } from "../utils/shopFunctions.js";

const paynowButton = document.querySelector(".payNowButton");

export function displayYourMovies() {
  const purchase_movies_container = document.getElementById(
    "purchase_movies_container"
  );
  // let paidMovies = JSON.parse(localStorage.getItem("paidMovies")) || [];
  // if (Array.isArray(paidMovies)) {
  //   paidMovies.forEach((movies) => {
  //     purchase_movies_container.innerHTML += `
  //                         <div class="information_box2">
  //                           <a href="/products/movie_details.html?id=${movies.id}" class="movie_cover"
  //                             ><img src="${movies.image}" alt="${movies.title} cover"
  //                             /></a>
  //                             <div class="information_movie_text">
  //                             <h4>${movies.title}</h4>
  //                             </div>
  //                             <a href="#" class="profile_watch_now"
  //                             >Watch now
  //                             <figure class="rightarrow2"></figure
  //                             ></a>
  //                             </div>
  //   `;
  //   });
  // } else {
  //   console.log("this is not an array");
  // }
}
displayYourMovies();

function handlePayClick() {
  // let shoppingBag = JSON.parse(localStorage.getItem("shoppingBag")) || [];
  // let paidMovies = JSON.parse(localStorage.getItem("paidMovies")) || [];
  // // Move items from shoppingBag to paidMovies
  // paidMovies = paidMovies.push(shoppingBag);
  // // Clear shoppingBag
  // //shoppingBag = [];
  // // Update local storage with the modified arrays
  // localStorage.setItem("shoppingBag", JSON.stringify(shoppingBag));
  // localStorage.setItem("paidMovies", JSON.stringify(paidMovies));
  // // After processing, display the updated movies
}
paynowButton.addEventListener("click", handlePayClick);
