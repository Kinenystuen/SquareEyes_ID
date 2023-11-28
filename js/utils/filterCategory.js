//

import { fetchApiSquareEyes } from "../api/squareeyesData.js"; 

// Function to filter movies based on the selected genre
export async function filterMovies(genre) {
  const allMovies = await fetchApiSquareEyes();

  // Filter movies based on the selected genre
  return genre === 'all' ? allMovies : allMovies.filter(movie => movie.genre === genre);
}