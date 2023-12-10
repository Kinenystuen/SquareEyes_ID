//

import { fetchApiSquareEyes } from "../api/squareeyesData.js"; 

// Function to fetch and filter/sort movies
export async function filterMovies(category, sortBy) {
  const allMovies = await fetchApiSquareEyes();

  // Filter by category
  let filteredMovies = category !== 'all' ? allMovies.filter(movie => movie.genre === category) : allMovies;

  // Sort by the selected criterion (e.g., title, price)
  switch (sortBy) {
    case 'title':
      filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'price':
      filteredMovies.sort((a, b) => {
        const priceA = a.discountedPrice < a.price ? a.discountedPrice : a.price;
        const priceB = b.discountedPrice < b.price ? b.discountedPrice : b.price;
        return priceA - priceB;
      });
      break;
    // Add more cases for other sorting criteria if needed
    default:
      break;
  }

  return filteredMovies;
}
