import { elements } from './base';
import { API_SCHEMA } from '../_shared/shared';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
}
export const clearResult = () => {
    elements.randomResult.innerHTML = '';
}


const renderRandomRecipe = recipe => {
    console.log(recipe);
    const markUp = `
    <li class="recipe__item">
    <a class="results__link results__link--active" href="#${recipe.id}">
        <figure class="results__fig">
            <img src="${recipe.image}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${recipe.title}</h4>
            <i class="fa fa-clock-o fa-2x" aria-hidden="true"></i> ${recipe.readyInMinutes} minutes
        </div>
    </a>
    </li>
    `;
    elements.randomResult.insertAdjacentHTML('beforeend', markUp);
}


export const renderResult = (recipes) => {
    recipes.forEach(renderRandomRecipe);
}