import { productos } from './productos.js';
import { getFavorites, initFavorites, updateFavoriteButtons } from './favorites.js';

const favoritesContainer = document.getElementById('favorites-container');

function createFavoriteCard(product, id) {
    return `
        <article class="producto-card">
            <button
                type="button"
                class="favorite-btn"
                data-favorite-button
                data-product-id="${id}"
                data-favorite-label="${product.nombre}"
                data-icon-only="true"
                aria-pressed="true"
                title="Quitar de favoritos">
                ❤️
            </button>
            <img src="${product.imagen}" alt="${product.nombre}">
            <div class="producto-card-body">
                <h3>${product.nombre}</h3>
                <p>${product.descripcion}</p>
                <p class="categoria-chip">${product.categoria}</p>
                <a href="../productos/producto.html?id=${id}" class="btn btn-dark">Ver detalles</a>
            </div>
        </article>
    `;
}

function renderFavorites() {
    if (!favoritesContainer) {
        return;
    }

    const favorites = getFavorites();

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = `
            <section class="text-center mt-4">
                <p>No tienes productos favoritos aún.</p>
                <a href="productos.html" class="btn btn-dark mt-3">Ver productos</a>
            </section>
        `;
        return;
    }

    const favoriteCards = favorites
        .map((id) => {
            const product = productos[id];
            return product ? createFavoriteCard(product, id) : '';
        })
        .join('');

    favoritesContainer.innerHTML = `
        <section class="mt-4">
            <h2 class="mb-4">Tus favoritos</h2>
            <div class="productos-grilla">${favoriteCards}</div>
        </section>
    `;

    updateFavoriteButtons();
}

document.addEventListener('DOMContentLoaded', () => {
    renderFavorites();
    initFavorites();
    document.addEventListener('favorites-changed', renderFavorites);
});
