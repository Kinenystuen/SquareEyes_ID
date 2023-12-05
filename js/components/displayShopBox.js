

import { getExistingShopInv } from "../utils/shopFunctions.js"; 
//import { closeShopBox } from "../utils/eventListeners.js/closeShopBox.js";

export async function displayAddToCart() {
    try {
        const shoppingBag = getExistingShopInv();
        console.log(shoppingBag);
    
        const cartBoxShow = document.getElementById("cartBoxShow");
        cartBoxShow.style.display = "block";

        shoppingBag.forEach((movies) => {
            cartBoxShow.innerHTML = `
            <div class="cartBox">
              <h3>Added to cart:</h3>
              <h4>${movies.title}</h4>
              <div class="cartBoxImg">
                <img class="" src="${movies.image}" alt="${movies.title}">
              </div>
              <a href="/checkout.html" class="boxButton">Go to shopping bag</a>
              <button id="closeShopBox" class="boxButton">Continue shopping</button>
            </div>
        `
        });
        setTimeout(() => {
            cartBoxShow.style.display = 'none';
          }, 5000);
        

          document.getElementById('closeShopBox').addEventListener('click', async () => {
            const cartBoxShow = document.getElementById("cartBoxShow");
            cartBoxShow.style.display = "none";
            console.log("Button is clicked")
      
          });
    }
    catch (error) {
        console.log(error);
    }
    
}

export function closeShopBox() {
  
}



// export function displayAddToCart() {
//     const shopBagCountContainer = document.getElementById(
//       "shopBagCountContainer"
//     );
//     const shoppingBag = getExistingShopInv();
  
//     const shoppingBagCount = shoppingBag.length;
//     if (shoppingBag.length === 0) {
//       shopBagCountContainer.style.display = "none";
//     } else {
//       shopBagCountContainer.style.display = "flex";
//     }
  
//     shopBagCountContainer.innerHTML = `<span class="badge">${shoppingBagCount}</span>`;
//   }
//   displayAddToCart();