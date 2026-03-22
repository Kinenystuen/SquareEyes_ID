import { displayMovies } from "../components/displayAllMovies.js";
import { displaySugMovies } from "../components/displaySuggest.js";
import { displayPopularMovie } from "../components/displayMostPop.js";



export async function fetchApiSquareEyes() {
  const urlSquareEyes = "https://v2.api.noroff.dev/square-eyes";

  try {
    const responseSE = await fetch(urlSquareEyes);

    if (!responseSE.ok) {
      throw new Error(`API request failed with status: ${responseSE.status}`);
    }

    const result = await responseSE.json();
    const movies = result.data || [];

    return movies;
  } catch (error) {
    console.error("Failed to fetch Square Eyes data:", error);
    return [];
  }
}

(async () => {
  await fetchApiSquareEyes();
})();

const movies = await fetchApiSquareEyes();

if (document.getElementById("suggestionContainer")) {
  displaySugMovies([...movies]);
}

if (document.getElementById("mostPopularNow")) {
  displayPopularMovie(movies);
} 