import axios from 'axios';
import { API_SCHEMA } from '../_shared/shared';



export default class RandomRacipe
{  
    async getRandomRecipes() {
        try {
            debugger;
            const res = await
            axios(`${API_SCHEMA.BASE_URL}recipes/random?&number=10&tags=vegetarian,dessert&apiKey=${API_SCHEMA.API_KEY}`)
            this.randomRecipes = res.data.recipes;
        }
        catch (error) {
            alert(error);
        }
    }
}
