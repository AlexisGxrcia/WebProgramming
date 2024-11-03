import ApiService from "../services/api.js";

const api = new ApiService();

export function showDetails(catId) {
    api.getBreedsById(catId).then(cat => {
        const detailsBody = document.getElementById("details-body");

        detailsBody.innerHTML = "";

        detailsBody.innerHTML = `
            <h2>${cat.name}</h2>
            <img src="${cat.image ? cat.image.url : "assets/img/cat.jpg"}" alt="${cat.name}" />
            <p><strong>Temperament:</strong> ${cat.temperament}</p>
            <p><strong>Lifespan:</strong> ${cat.life_span} years</p>
            <p><strong>Description:</strong> ${cat.description}</p>
            <p><strong>Origin:</strong> ${cat.origin}</p>
            <p><strong>Child Friendly:</strong> ${cat.child_friendly}</p>
            <p><strong>Dog Friendly:</strong> ${cat.dog_friendly}</p>
            <a href="https://en.wikipedia.org/wiki/${cat.name}" target="_blank">Más información</a>
        `;

        openDetails();
    }).catch(error => console.error("Error fetching cat details:", error));
}

const openDetails = () => {
    document.getElementById("cat-details").style.display = "flex";
    document.querySelector('.container').style.filter = 'blur(5px)';
}

export const closeDetails = () => {
    document.getElementById("cat-details").style.display = "none";
    document.querySelector('.container').style.filter = '';
}