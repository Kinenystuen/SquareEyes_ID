import { displaySelectedMovie } from "../components/displaySelectedMovie.js";

function showError(message) {
  const movieDetailContainer = document.getElementById("movieDetailContainer");

  if (!movieDetailContainer) {
    console.error(message);
    return;
  }

  movieDetailContainer.innerHTML = `
    <div class="message error">
      <p>${message}</p>
    </div>
  `;
}

// Finds the id in the query string
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const idSelectedMovie = params.get("id");

export async function fetchApiSelectedMovie() {
  if (!idSelectedMovie) {
    console.error("No movie id found in URL.");
    showError("Could not find movie id in the URL.");
    return null;
  }

  const urlId = `https://v2.api.noroff.dev/square-eyes/${idSelectedMovie}`;

  try {
    const responseSM = await fetch(urlId);

    if (!responseSM.ok) {
      throw new Error(`API request failed with status: ${responseSM.status}`);
    }

    const jsonSM = await responseSM.json();
    const movieInfo = jsonSM.data;

    if (!movieInfo) {
      throw new Error("Movie data was missing from API response.");
    }

    displaySelectedMovie(movieInfo);
    return movieInfo;
  } catch (error) {
    console.error("Error selectedMovie:", error);
    showError("Could not load movie details.");
    return null;
  }
}