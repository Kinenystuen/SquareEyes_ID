import { filterMovies } from "../filterCategory.js";
import { updateMovieDisplay } from "../updMovieDis.js";


export function categoryButtons() {
    // Add event listeners to the buttons
    document.getElementById('all-btn').addEventListener('click', async () => {
      handleButtonClick();
      const filteredMovies = await filterMovies('all');
      updateMovieDisplay(filteredMovies);
      const selectedGenre = '';
      updCategory(selectedGenre);
    });
  
    document.getElementById('action-btn').addEventListener('click', async () => {
      handleButtonClick();
      const filteredMovies = await filterMovies('Action');
      updateMovieDisplay(filteredMovies);
      const selectedGenre = 'Action';
      updCategory(selectedGenre);
    });
  
    document.getElementById('kids-btn').addEventListener('click', async () => {
      handleButtonClick();
      const filteredMovies = await filterMovies('Kids');
      updateMovieDisplay(filteredMovies);
      const selectedGenre = 'Kids';
      updCategory(selectedGenre);
    });
  
    document.getElementById('horror-btn').addEventListener('click', async () => {
      handleButtonClick();
      const filteredMovies = await filterMovies('Horror');
      updateMovieDisplay(filteredMovies);
      const selectedGenre = 'Horror';
      updCategory(selectedGenre);
    });
    document.getElementById('drama-btn').addEventListener('click', async () => {
      handleButtonClick();
      const filteredMovies = await filterMovies('Drama');
      updateMovieDisplay(filteredMovies);
      const selectedGenre = 'Drama';
      updCategory(selectedGenre);
    });
    document.getElementById('comedy-btn').addEventListener('click', async () => {
      handleButtonClick();
      const filteredMovies = await filterMovies('Comedy');
      updateMovieDisplay(filteredMovies);
      const selectedGenre = 'Comedy';
      updCategory(selectedGenre);
    });
    document.getElementById('sortButton').addEventListener('click', async () => {
      const selectedGenre = `all`;
    
      const sortedMovies = await filterMovies(selectedGenre);
      updateMovieDisplay(sortedMovies, selectedGenre);
    });
    document.getElementById('priceLowHigh').addEventListener('click', async () => {
      const selectedCategory = `all`;
      const selectedSortBy = 'price';

      const sortedMovies = await filterMovies(selectedCategory, selectedSortBy);
      updateMovieDisplay(sortedMovies, selectedCategory);
    });

  }

  function updCategory(selectedGenre) {
    const selectedCategory = document.getElementById("selectedCategory");
    if (!selectedGenre) {
      selectedCategory.innerText = `Categories:`;
    }
    else {
    selectedCategory.innerText = `Category: ${selectedGenre}`;
  }
  }

  // Function to handle button click
function handleButtonClick() {
  // Toggle the state of the checkbox to collapse the list
  const checkbox = document.getElementById('moviemenu_checkbox');
  checkbox.checked = false; // Set it to false to collapse the list
}