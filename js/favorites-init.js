import { initFavorites, updateFavoriteButtons } from './favorites.js';

function init() {
    initFavorites();
    updateFavoriteButtons();
}

document.addEventListener('DOMContentLoaded', init);