// files for all movies page
import { fetchApiSquareEyes } from "./api/squareeyesData.js";

import { filterMovies } from "./utils/filterCategory.js"; 
import { displayMovies } from "./components/displayAllMovies.js";

// //files for selected movie pages
//import { fetchApiSelectedMovie } from "./api/selectedMovieData.js";
import { checkIfOpenMoviepage } from "./utils/checkpage.js";

// display shoppingbag/ checkoutpage
import {
  displayShoppingBag,
  handleShopTrash,
} from "./components/displayShoppingBag.js";

// display favoritesBag
import { displayFavoritesBag } from "./components/displayFavorites.js";

//display your profile
import { displayYourMovies } from "./components/displayPaidMovies.js";

// // scripts from html and css course
// // // Sign in out page
import { signInOutButton } from "./utils/signInOut.js";
// // // Contact us page/ send message

import { sendMessageFun } from "./utils/sendMessage.js";

// // Search bar on smaller screens
import { showSearchBar } from "./utils/searchBar.js";


async function initialize() {
  const filteredMovies = await filterMovies('all');
  displayMovies(filteredMovies);
}

initialize();