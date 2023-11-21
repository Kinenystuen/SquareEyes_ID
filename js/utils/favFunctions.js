//

export function getExistingFavInv() {
  const favBag = localStorage.getItem("favoritesBag");
  if (favBag === null) {
    return [];
  } else {
    return JSON.parse(favBag);
  }
}
