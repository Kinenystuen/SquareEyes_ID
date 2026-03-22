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
                                <img src="${movies.image.url}" alt="${movies.image.alt}" />
                                <button>Start Watching</button>
                              </div>
    `;
    });

}

const checkoutContainer = document.getElementById("checkoutSucsess");

if (checkoutContainer) {
  displayCheckout();
}
