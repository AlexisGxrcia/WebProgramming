const apiKey = "live_MkMtGmswj5BkD4CxXtpm0sd7RTqNNuDBcjSlw0Q0MUrslrV0utVhk2Kw8RjzIH78";
const baseURL = "https://api.thecatapi.com/v1/breeds";
let currentPage = 1;
const limit = 5;

async function SearchCatData(page = 1) {
    try {
        const response = await fetch(`${baseURL}?limit=${limit}&page=${page}`, {
            headers: { "x-api-key": apiKey }
        });
        const data = await response.json();
        displayCats(data);
    } catch (error) {
        console.error("Error fetching cat data:", error);
    }
}

function displayCats(cats) {
    const catGrid = document.getElementById("cat-grid");
    catGrid.innerHTML = "";

    cats.forEach(cat => {
        const catCard = document.createElement("div");
        catCard.classList.add("card");

        const catImage = document.createElement("img");
        catImage.src = cat.image.url;
        catImage.alt = cat.name;

        const catBody = document.createElement("div");
        catBody.classList.add("card-body");

        catBody.innerHTML = `
            <h2>${cat.name}</h2>
            <p>${cat.description.slice(0, 100)}...</p>
            <button onclick="showDetails('${cat.id}')">Ver más</button>
        `;

        catCard.appendChild(catImage);
        catCard.appendChild(catBody);
        catGrid.appendChild(catCard);
    });
}

async function showDetails(catId) {
    try {
        const response = await fetch(`${baseURL}/${catId}`, {
            headers: { "x-api-key": apiKey }
        });
        const cat = await response.json();
        const detailsBody = document.getElementById("details-body");

        detailsBody.innerHTML = "";

        detailsBody.innerHTML = `
            <h2>${cat.name}</h2>
            <img src="${cat.image ? cat.image.url : "cat.jpg"}" alt="${cat.name}" />
            <p><strong>Temperament:</strong> ${cat.temperament}</p>
            <p><strong>Lifespan:</strong> ${cat.life_span} years</p>
            <p><strong>Description:</strong> ${cat.description}</p>
            <p><strong>Origin:</strong> ${cat.origin}</p>
            <p><strong>Child Friendly:</strong> ${cat.child_friendly}</p>
            <p><strong>Dog Friendly:</strong> ${cat.dog_friendly}</p>
            <a href="https://en.wikipedia.org/wiki/${cat.name}" target="_blank">Más información</a>
        `;

        openDetails();
    } catch (error) {
        console.error("Error fetching cat details:", error);
    }
}

const openDetails = () => {
    document.getElementById("cat-details").style.display = "flex";
}

const closeDetails = () => {
    document.getElementById("cat-details").style.display = "none";
}

function nextPage() {
    currentPage++;
    SearchCatData(currentPage);
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        SearchCatData(currentPage);

    }

    document.getElementById("prev").disabled = (currentPage === 1);
}

SearchCatData(currentPage);