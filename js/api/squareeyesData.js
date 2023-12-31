import { displayMovies } from "../components/displayAllMovies.js";
import { displaySugMovies } from "../components/displaySuggest.js";
import { displayPopularMovie } from "../components/displayMostPop.js";
import { checkIfFav } from "../components/favorites.js";


export async function fetchApiSquareEyes() {
  const urlSquareEyes = `https://api.noroff.dev/api/v1/square-eyes`;
  try {
    const responseSE = await fetch(urlSquareEyes);
    // If the url is wrong, then this (throw new Error) will make an error
    if (!responseSE.ok) {
      throw new Error(`API request failed with status: ` + responseSE.status);
    }
    const allMovies = await responseSE.json();
    const randomData = [...allMovies];

    displaySugMovies(randomData);
    displayPopularMovie(allMovies);
    //console.log(allMovies);
    return allMovies;
  } catch (error) {
    console.log(error);
  }
}

(async () => {
  await fetchApiSquareEyes();
})();