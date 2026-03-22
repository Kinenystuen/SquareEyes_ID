import { clearHTML } from "../render/clearHTML.js";
import { randomArray } from "../utils/randomFunc.js";

function showMessage(container, message) {
  if (!container) return;

  container.innerHTML = `
    <div class="message error">
      <p>${message}</p>
    </div>
  `;
}

export async function displaySugMovies(randomData) {
  const suggestionContainer = document.getElementById("suggestionContainer");

  if (!suggestionContainer) {
    console.error("Could not find #suggestionContainer");
    return;
  }

  clearHTML(suggestionContainer);

  if (!Array.isArray(randomData)) {
    console.error("displaySugMovies expected an array, got:", randomData);
    showMessage(suggestionContainer, "Could not load suggested movies.");
    return;
  }

  if (randomData.length === 0) {
    showMessage(suggestionContainer, "No suggested movies available.");
    return;
  }

  const shuffledMovies = [...randomData];
  randomArray(shuffledMovies);

  const randomObjects = shuffledMovies.slice(0, 4);

  if (randomObjects.length === 0) {
    showMessage(suggestionContainer, "No suggested movies available.");
    return;
  }

  randomObjects.forEach((movie) => {
    if (!movie || !movie.id || !movie.image || !movie.image.url) {
      console.error("Invalid movie object in suggestions:", movie);
      return;
    }

    const aElement = document.createElement("a");
    const movieImage = document.createElement("img");

    aElement.href = `/products/movie_details.html?id=${movie.id}`;
    movieImage.src = movie.image.url;
    movieImage.alt = movie.image.alt || movie.title || "Movie poster";
    movieImage.title = movie.title || "Movie";

    aElement.appendChild(movieImage);
    suggestionContainer.appendChild(aElement);
  });

  if (suggestionContainer.innerHTML.trim() === "") {
    showMessage(suggestionContainer, "Could not display suggested movies.");
  }
}