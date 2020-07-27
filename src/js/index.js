import Search from './models/search';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as randomView from './views/randomRecipes';
import {elements, AddLoader, removeLoader} from './views/base';
import Recipe from './models/Recipe';
import Favourite from './models/fav';
import {toggleFavButtonText, toggleFavouriteMenu, renderFavourites} from './views/favViews';
import RandomRacipe from './models/RandomRecipe';

const state = {};

const controlSearch = async () => {
    const query = searchView.getInput();
    if(query) {
        state.search = new Search(query);
        searchView.clearResult();
        AddLoader(elements.searchRes);
        try 
        {
            await state.search.getResult();
            searchView.clearInput();
            removeLoader();
            searchView.renderResult(state.search.result);
        }
        catch(error) {
            alert(error);
            removeLoader();
        }
    }
}

elements.searchForm.addEventListener('submit',  e=> {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    e.preventDefault();
    const button = e.target.closest('.btn-inline');
    if(button) {
        const goToPage = parseInt(button.dataset.goto, 10);
        searchView.clearResult();
        searchView.renderResult(state.search.result, goToPage);
    }
    
})


/****
 * Recipe controller
 * *****/
const controlRecipe = async () => {
    const recipeId = window.location.hash.replace('#','');
    if(recipeId) {
        recipeView.clearRecipeView();
        AddLoader(elements.recipe);
       try
       {
        state.recipe =  new Recipe(recipeId);
        await state.recipe.getRecipe();
        state.recipe.parseIngredients();
        removeLoader();
        recipeView.renderRecipe(state.recipe,state.favourites.isAlreadyFavourite(recipeId));
       }
       catch(error)  {
           alert(error);
       }
    }
}

window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

/**
 * Favourites Controller
 **/


 elements.recipe.addEventListener('click', el => {
        if(el.target.matches('.recipe__btn__addToFav, .recipe__btn__addToFav *')) {
            favouriteController();
        }
 });
 state.favourites = new Favourite();
 toggleFavouriteMenu(state.favourites.getFavouritesCount());
 const favouriteController = () => {
    if(!state.favourites) {
        state.favourites = new Favourite();
    }
    const currId = state.recipe.id;
    //not yet favourite
    if(!state.favourites.isAlreadyFavourite(currId)) {
        const newFavourite = state.favourites.addToFavourite(
            currId,
            state.recipe.title,
            state.recipe.image
        );
        toggleFavButtonText(true);
        renderFavourites(newFavourite);
    } //already favourite
    else {
        state.favourites.deleteFavourite(currId);
        toggleFavButtonText(false);
        deleteFavourite(currId);
    }
    toggleFavouriteMenu(state.favourites.getFavouritesCount());
 };


 //Restoring data from current recipes
 window.addEventListener('load', ()=> {
     state.favourites = new Favourite();
     //getting data from local storage.
     state.favourites.getFavourites();
     //toggle fav button
     toggleFavouriteMenu(state.favourites.getFavouritesCount());

     //rendering the exisitn favs
     state.favourites.favourites.forEach(fav => {
            renderFavourites(fav) ;
     })
 })



 /**
  * Random Recipies  * 
  * 
 */
const RandomRecipesController = async () => {
    state.random = new RandomRacipe();
    await state.random.getRandomRecipes();
    randomView.clearResult();
    randomView.renderResult(state.random.randomRecipes)
}

RandomRecipesController();

elements.clearList.addEventListener('click', el => {
    if(el.target.matches('.clear__list, .clear__list *')) {
        /*removing from local storage*/
        localStorage.removeItem('favourites');
        /*clearing the favourite list*/
        elements.favList.innerHTML = '';
        state.favourites = null;
    }
})