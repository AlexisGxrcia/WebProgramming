import { SearchCatData, nextPage, prevPage } from './pages/main-page.js';
import { closeDetails } from './pages/details-page.js';


document.getElementById("next").addEventListener("click", nextPage);
document.getElementById("prev").addEventListener("click", prevPage);
document.getElementById("close").addEventListener("click", closeDetails);

// Setup
SearchCatData();