export default class ApiService {
    constructor() {
        this.url = 'https://api.thecatapi.com/v1/breeds';
        this.apiKey = 'live_MkMtGmswj5BkD4CxXtpm0sd7RTqNNuDBcjSlw0Q0MUrslrV0utVhk2Kw8RjzIH78';
    }

    async getBreeds(limit, page) {
        const response = await fetch(`${this.url}?limit=${limit}&page=${page}`, {
            headers: { "x-api-key": this.apiKey }
        });
        return await response.json();
    }

    async getBreedsById(catId) {
        const response = await fetch(`${this.url}/${catId}`, {
            headers: { "x-api-key": this.apiKey }
        });
        return await response.json();
    }
}