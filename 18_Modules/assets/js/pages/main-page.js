import ApiService from "../services/api.js";
import { showDetails } from "./details-page.js";

let currentPage = 1;
const limit = 5;
const api = new ApiService();

export function SearchCatData(page = 1) {
    api.getBreeds(limit, page)
        .then(data => displayCats(data))
        .catch(error => console.error("Error fetching cat data:", error));
}

function displayCats(cats) {
    const catGrid = document.getElementById("cat-grid");
    catGrid.innerHTML = "";

    cats.forEach(cat => {
        const catCard = document.createElement("div");
        catCard.classList.add("card");

        const catImage = document.createElement("img");
        catImage.src = cat.image ? cat.image.url : "assets/img/cat.jpg";
        catImage.alt = cat.name;

        const catBody = document.createElement("div");
        catBody.classList.add("card-body");

        const catName = document.createElement("h2");
        catName.textContent = cat.name;

        const catDescription = document.createElement("p");
        catDescription.textContent = `${cat.description.slice(0, 100)}...`;

        const viewMoreButton = document.createElement("button");
        viewMoreButton.textContent = "Ver más";
        viewMoreButton.addEventListener("click", () => showDetails(cat.id));

        catBody.appendChild(catName);
        catBody.appendChild(catDescription);
        catBody.appendChild(viewMoreButton);
        catCard.appendChild(catImage);
        catCard.appendChild(catBody);
        catGrid.appendChild(catCard);
    });
}

export function nextPage() {
    if (document.getElementById("cat-grid").children.length < limit) return;

    currentPage++;
    SearchCatData(currentPage);
}

export function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        SearchCatData(currentPage);
    }
}