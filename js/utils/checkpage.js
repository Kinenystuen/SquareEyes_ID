import { fetchApiSelectedMovie } from "../api/selectedMovieData.js";

export function checkIfOpenMoviepage() {
  if (window.location.href.indexOf("movie_details.html") !== -1) {
    // Your specific page is open
    fetchApiSelectedMovie();
  } else {
  }
}
checkIfOpenMoviepage();
