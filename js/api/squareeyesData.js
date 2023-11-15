import { displayMovies } from "../components/displayAllMovies.js";
import { displaySugMovies } from "../components/displaySuggest.js";
import { displayPopularMovie } from "../components/displayMostPop.js";

const urlSquareEyes = `https://api.noroff.dev/api/v1/square-eyes`;

export async function fetchApiSquareEyes() {
  try {
    const responseSE = await fetch(urlSquareEyes);
    // If the url is wrong, then this (throw new Error) will make an error
    if (!responseSE.ok) {
      throw new Error(`API request failed with status: ` + responseSE.status);
    }
    const allMovies = await responseSE.json();
    const randomData = [...allMovies];
    
    displayMovies(allMovies);
    displaySugMovies(randomData);
    displayPopularMovie(allMovies);
  } catch (error) {
    console.log(error);
  }
}

fetchApiSquareEyes();
