import axios from 'axios';
import { API_SCHEMA } from '../_shared/shared';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }
    async getRecipe() {
        try 
        {
            const res = await axios(`https://api.spoonacular.com/recipes/${this.id}/information?includeNutrition=false&apiKey=${API_SCHEMA.API_KEY}`);
            this.title = res.data.title;
            this.vegan = res.data.vegan;
            this.vegetarian = res.data.vegetarian;
            this.veryHealthy =  res.data.veryHealthy;
            this.veryPopular = res.data.veryPopular;
            this.veryPopular = res.data.veryPopular;
            this.extendedIngredients = res.data.extendedIngredients;
            this.id = res.data.id;
            this.image = res.data.image;
            this.imageTpe = res.data.imageType;
            this.instructions = res.data.instructions;
            this.cookingMinutes = res.data.cookingMinutes;
            this.pricePerServing = res.data.pricePerServing;
            this.readyInMinutes = res.data.readyInMinutes;
            this.servings = res.data.servings;
            this.sourceUrl = res.data.sourceUrl;
            this.summary = res.data.summary;
            this.analyzedInstructions = res.data.analyzedInstructions;
            console.log(res.data);
        }
        catch(error) {
            alert(error);
        }

    }

    parseIngredients() {
        let objIng;
        debugger;
        const newIngredients  =  this.extendedIngredients.map(el => 
        {
            objIng = 
            {
                id: el.id,
                name: el.name,
                amount: parseInt(el.amount),
                unit: el.unit,
                original: el.original
            }
            return objIng;
        });
        this.extendedIngredients = newIngredients;
        console.log(this.extendedIngredients);
    }
}