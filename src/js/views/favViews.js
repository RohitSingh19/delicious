import {elements} from './base';
import {limitRecipeTitle} from './searchView';

/*
*This function helps to check whether the current recipe is already in favourites
or not*
*/
export const toggleFavButtonText = isFav => {
    const favButtonText = isFav ? 'Remove from favourites' : 'Add to favourite';
    var button = document.querySelector('.recipe__btn__addToFav');
    button.innerHTML = favButtonText;
};

export const toggleFavouriteMenu = numFavs => {
    elements.favMenu.style.visibility = numFavs  > 0 ? 'visible': 'hidden';
};

export const renderFavourites = fav => {
    const markUp = 
    `
    <li class="recipe__item">
            <a class="likes__link" href="#${fav.id}">
                <figure class="likes__fig">
                    <img src="${fav.img}" alt="${limitRecipeTitle(fav.title, 17)}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitRecipeTitle(fav.title, 17)}</h4>
                </div>
            </a>
    </li>
    `;
    elements.favList.insertAdjacentHTML('beforeend', markUp);
    console.log(fav);
};


export const deleteLike = id => {
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if(el) {
        el.parentElement.removeChild(el);
    }
}