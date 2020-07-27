export default class Favourite {
    constructor() {
        this.favourites = [];
    }

    addToFavourite(id, title, img) {
        const favourite = {id, title, img};
        this.favourites.push(favourite);
        //adding data to local storage
        this.saveFavourites();
        return favourite;
    }



    deleteFavourite(id) {
        const index = this.favourites.findIndex(el => el.id === id);
        this.favourites.splice(index, 1);
        //removing data to local storage
    }

    isAlreadyFavourite(id) {
        return this.favourites.findIndex(el => el.id === id) !== -1;
    }

    getFavouritesCount() {
        return this.favourites.length;
    }

    saveFavourites() {
        localStorage.setItem('favourites', JSON.stringify(this.favourites))
    }

    getFavourites() {
        const storage = JSON.parse(localStorage.getItem('favourites'));
        if(storage) {
            this.favourites = storage;
        }
    }
}