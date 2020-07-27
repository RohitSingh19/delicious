import { API_SCHEMA } from '../_shared/shared';
import axios from 'axios';
import Recipe from '../models/Recipe';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResult() {
        try {
            const res = await axios(`${API_SCHEMA.BASE_URL}recipes/search?query=
                                ${this.query}&number=100&apiKey=${API_SCHEMA.API_KEY}`)
            this.result = res.data.results;
        }
        catch (error) {
            alert(error);
        }
    }
}

