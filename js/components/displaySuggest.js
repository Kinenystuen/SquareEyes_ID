import { randomArray } from "../utils/randomFunc.js";
export async function displaySugMovies(randomData) {
  // forloop for suggested movies
  if (randomData) {
    randomArray(randomData);
    const randomObjects = randomData.slice(0, 4);
    const suggestionContainer = document.getElementById("suggestionContainer");
    suggestionContainer.innerHTML = "";
    for (let rM = 0; rM < randomObjects.length; rM++) {
      // Display random movie cards
      const aElement = document.createElement("a");
      const movieImage = document.createElement("img");
      aElement.href = `/products/movie_details.html?id=${randomObjects[rM].id}`;
      movieImage.src = `${randomObjects[rM].image}`;
      movieImage.alt = `${randomObjects[rM].title}`;
      movieImage.title = `${randomObjects[rM].title}`;

      aElement.appendChild(movieImage);
      suggestionContainer.appendChild(aElement);
    }
  } else {
    console.log("allMovies is undefined. Something went wrong.");
  }
}
