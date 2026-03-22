import { filterMovies } from "../utils/filterCategory.js"; 
import { updateMovieDisplay } from "../utils/updMovieDis.js"; 
import { categoryButtons } from "../utils/eventListeners.js/categoryButtons.js";

/*///////////////////////////////
Display all movies
////////////////////////////////*/

export async function displayMovies() {
  if (!document.getElementById("allMoviesContainer")) {
    return;
  }
  else {
    const allMovies = await filterMovies('all');
    updateMovieDisplay(allMovies);
  }
  categoryButtons();
}


