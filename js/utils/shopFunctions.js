//

export function getExistingShopInv() {
  const shopBag = localStorage.getItem("shoppingBag");
  if (shopBag === null) {
    return [];
  } else {
    return JSON.parse(shopBag);
  }
}
