import { clearHTML } from "../render/clearHTML.js";

function showMessage(container, message) {
  if (!container) return;

  container.innerHTML = `
    <div class="message error">
      <p>${message}</p>
    </div>
  `;
}

export async function displayPopularMovie(allMovies) {
  const mostPopularNow = document.getElementById("mostPopularNow");

  if (!mostPopularNow) {
    console.error("Could not find #mostPopularNow");
    return;
  }

  clearHTML(mostPopularNow);

  // Validation checks
  if (!Array.isArray(allMovies)) {
    console.error("displayPopularMovie expected array, got:", allMovies);
    showMessage(mostPopularNow, "Could not load popular movie.");
    return;
  }

  if (allMovies.length === 0) {
    showMessage(mostPopularNow, "No popular movies available.");
    return;
  }

  const movie = allMovies[11] || allMovies[0];

  if (!movie || !movie.image || !movie.image.url) {
    console.error("Invalid movie data:", movie);
    showMessage(mostPopularNow, "Could not display popular movie.");
    return;
  }

  mostPopularNow.innerHTML = `
    <div class="section5_image">
      <img 
        src="${movie.image.url}" 
        class="mostPopular" 
        alt="${movie.title}" 
      />
    </div>
    <div class="background_gradient"></div>
    <div class="section5_info">
      <h2 class="AbrilFatface">Most popular right now:</h2>
      <h3>${movie.title}</h3>
      <a href="/products/movie_details.html?id=${movie.id}">
        More info
      </a>
    </div>
  `;
}