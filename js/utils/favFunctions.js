
export function getExistingFavInv() {
  const favBag = localStorage.getItem("favoritesBag");

  if (favBag === null) {
    return [];
  }

  const parsed = JSON.parse(favBag);

  // Normalize legacy entries where image was stored as a plain string
  return parsed.map((item) => {
    if (typeof item.image === "string") {
      return { ...item, image: { url: item.image, alt: item.title || "Movie poster" } };
    }
    return item;
  });
}
