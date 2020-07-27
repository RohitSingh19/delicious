export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResult: document.querySelector('.results__list'),
    searchRes: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    recipeButtonAdd: document.querySelector('.recipe__btn__addToFav'),
    favMenu: document.querySelector('.likes__field'),
    favList: document.querySelector('.likes__list'),
    randomResult: document.querySelector('.random-results__list'),
    clearList:document.querySelector('.clear__list')
}
export const elementsStrings = {
    loader : 'loader',
}

export const AddLoader = parent => {
    const loader = `
        <div class="${elementsStrings.loader}">  
        <div class="lds-roller"><div></div><div></div><div></div>
        <div></div><div></div><div></div><div></div><div></div></div>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}

export const removeLoader = () => {
    const loader = document.querySelector(`.${elementsStrings.loader}`);
    if(loader) {
        loader.parentElement.removeChild(loader);
    }
}