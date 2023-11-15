import { getExistingShopInv } from "../utils/shopFunctions.js";

export function updShoppingBagCount() {
  const shopBagCountContainer = document.getElementById(
    "shopBagCountContainer"
  );
  const shoppingBag = getExistingShopInv();

  const shoppingBagCount = shoppingBag.length;
  if (shoppingBag.length === 0) {
    shopBagCountContainer.style.display = "none";
  } else {
    shopBagCountContainer.style.display = "flex";
  }

  shopBagCountContainer.innerHTML = `<span class="badge">${shoppingBagCount}.</span>`;
}

updShoppingBagCount();
