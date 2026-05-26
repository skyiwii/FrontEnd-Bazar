import { productos } from './productos.js';
import { initFavorites, updateFavoriteButtons } from './favorites.js';

const searchInput = document.querySelector('.buscador input');
const searchButton = document.querySelector('.buscador button');
const productsGrid = document.getElementById('products-grid');
const productsCount = document.getElementById('products-count');
const categoryList = document.getElementById('category-list');

let activeCategory = 'Todos';

function getProductArray() {
    return Object.entries(productos).map(([id, item]) => ({ id, ...item }));
}

function getCategories() {
    const categories = new Set(getProductArray().map((item) => item.categoria));
    return ['Todos', ...categories];
}

function createProductCard(product) {
    return `
        <article class="producto-card">
            <button
                type="button"
                class="favorite-btn"
                data-favorite-button
                data-product-id="${product.id}"
                data-favorite-label="${product.nombre}"
                data-icon-only="true"
                aria-pressed="false"
                title="Agregar a favoritos">
                🤍
            </button>

            <img src="${product.imagen}" alt="${product.nombre}">

            <div class="producto-card-body">
                <h3>${product.nombre}</h3>
                <p>${product.descripcion}</p>
                <p class="categoria-chip">${product.categoria}</p>
                <a href="../productos/producto.html?id=${product.id}" class="btn btn-dark">Ver detalles</a>
            </div>
        </article>
    `;
}

function renderProducts(list) {
    if (!productsGrid) {
        return;
    }

    if (list.length === 0) {
        productsGrid.innerHTML = '<div class="no-results">No se encontraron productos.</div>';
        productsCount.textContent = '0 productos encontrados';
        return;
    }

    productsGrid.innerHTML = list.map(createProductCard).join('');
    productsCount.textContent = `${list.length} productos encontrados`;
    updateFavoriteButtons();
}

function renderCategoryButtons() {
    if (!categoryList) {
        return;
    }

    categoryList.innerHTML = getCategories()
        .map((category) => `
            <li>
                <button type="button" class="category-filter" data-category="${category}" aria-pressed="${category === 'Todos'}">
                    ${category}
                </button>
            </li>
        `)
        .join('');
}

function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    const products = getProductArray();

    const filtered = products.filter((product) => {
        const matchesCategory = activeCategory === 'Todos' || product.categoria === activeCategory;
        const matchesSearch = [product.nombre, product.descripcion, product.categoria]
            .join(' ')
            .toLowerCase()
            .includes(query);

        return matchesCategory && matchesSearch;
    });

    renderProducts(filtered);
}

function updateCategoryControls() {
    categoryList.querySelectorAll('button[data-category]').forEach((button) => {
        const isActive = button.dataset.category === activeCategory;
        button.setAttribute('aria-pressed', String(isActive));
        button.classList.toggle('active', isActive);
    });
}

function bindEvents() {
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }

    if (searchButton) {
        searchButton.addEventListener('click', applyFilters);
    }

    if (categoryList) {
        categoryList.addEventListener('click', (event) => {
            const button = event.target.closest('button[data-category]');
            if (!button) {
                return;
            }

            activeCategory = button.dataset.category;
            updateCategoryControls();
            applyFilters();
        });
    }
}

function initProductsApp() {
    renderCategoryButtons();
    renderProducts(getProductArray());
    updateCategoryControls();
    bindEvents();
    initFavorites();
}

window.addEventListener('DOMContentLoaded', initProductsApp);
