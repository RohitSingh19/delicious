import { elements } from './base';
import { API_SCHEMA } from '../_shared/shared';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
}
export const clearResult = () => {
    elements.searchResult.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}


export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        // return the result
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderRecipe = recipe => {
    const markUp = `
    <li class="recipe__item">
    <a class="results__link results__link--active" href="#${recipe.id}">
        <figure class="results__fig">
            <img src="${API_SCHEMA.RECIPE_IMAGE_URL + recipe.image}" alt="${limitRecipeTitle(recipe.title, 17)}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title, 17)}</h4>
            <i class="fa fa-clock-o fa-2x" aria-hidden="true"></i> ${recipe.readyInMinutes} minutes
        </div>
    </a>
    </li>
    `;
    elements.searchResult.insertAdjacentHTML('beforeend', markUp);
}

const createButton = (page, type) => `
<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1: page + 1}>
    <span>Page ${type === 'prev' ? page - 1: page + 1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left': 'right'}"></use>
    </svg>
</button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if (page === 1 && pages > 1) {
        button = createButton(page, 'next');
    } else if (page < pages) {
        //both
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
        
    }
    else if (page === pages && pages > 1) {
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
}

export const renderResult = (recipes, page = 1, resultPerPage = 10) => {
    const start = (page - 1) * resultPerPage;
    const end = page * resultPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
    renderButtons(page, recipes.length, resultPerPage);
}