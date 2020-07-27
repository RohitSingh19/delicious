import { elements } from './base';
export const clearRecipeView = () => {
    elements.recipe.innerHTML = '';
}

const createIngredient = ingredient => `
    <li class="recipe__item">
        <i class="fa fa-check-circle fa-2x" aria-hidden="true"></i>${ingredient.original}
    </li>
`;
export const renderRecipe = (recipe, isFav) => {

    const markup = `
    <figure class="recipe__fig">
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img">
        <h1 class="recipe__title">
            <span>${recipe.title}</span>
        </h1>
    </figure>
   <div class="recipe__details">
        <div class="recipe__info">
            <i class="fa fa-clock-o" aria-hidden="true"></i> ${recipe.cookingMinutes}</span>
            <span class="recipe__info-text" style="margin-left:6px"> minutes</span>
        </div>
   <div class="recipe__info">
            <i class="fa fa-inr" aria-hidden="true"></i> ${recipe.pricePerServing}</span>
            <span class="recipe__info-text" style="margin-left:2px"> per serving</span>
   </div>
   <div class="recipe__info">
            <i class="fa fa-user" aria-hidden="true"></i> ${recipe.servings}</span>
            <span class="recipe__info-text" style="margin-left:6px"> serving</span>
    </div>    
    </div>
    <div class="recipe_details_additional">
        <div class="recipe_item">
            <label>Vegetarian:
             ${recipe.vegetarian === true ? 
            '<span class="w3-badge w3-green">YES</span>':
            '<span class="w3-badge w3-red">NO</span>'}</label>
        </div>
        <div class="recipe_item">
            <label>Healthy : ${recipe.veryHealthy === true ? 'Yes': 'No'}</label>
        </div>
        <div class="recipe_item">
            <label>Popular : ${recipe.veryPopular === true ? 'Yes': 'No'}</label>
        </div>
    </div>
    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
            ${recipe.extendedIngredients.map(el => createIngredient(el)).join('')}
        </ul>
     <div>
        <h1>Summary</h1>
        <p>${recipe.summary}</p>
     </div>
     <br/>
     <button class="btn-small recipe__btn">
      <a class="recipe__sourceurl" href="${recipe.sourceUrl}" target="_blank"> View Detailed Recipe </a>
    </button>
    <br/>
    <button class="btn-small recipe__btn recipe__btn__addToFav">
        ${isFav === true ? 'Remove from favourites' : 'Add to favourites'}
    </button>
</div>
    `;
  elements.recipe.insertAdjacentHTML('afterbegin', markup);
};
