import { displaySelectedMovie } from "../components/displaySelectedMovie.js";

// Finds the id in the queryString
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const idSelectedMovie = params.get("id");

const urlId = `https://api.noroff.dev/api/v1/square-eyes/` + idSelectedMovie;

let movieInfo;
export async function fetchApiSelectedMovie() {
  try {
    const responseSM = await fetch(urlId);
    // If the url is wrong, then this (throw new Error) will make an error
    if (!responseSM.ok) {
      throw new Error(`API request failed with status: ` + responseSM.status);
    }
    const jsonSM = await responseSM.json();
    movieInfo = jsonSM;
    displaySelectedMovie(movieInfo);
  } catch (error) {
    console.log("Error selectedMovie: " + error);
  }
}
fetchApiSelectedMovie();
