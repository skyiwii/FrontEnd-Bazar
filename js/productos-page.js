import { initFavorites, updateFavoriteButtons } from './favorites.js';
import { initHamburgerMenu } from './menu.js';

const searchInput = document.querySelector('.buscador input');
const searchButton = document.querySelector('.buscador button');
const categoryButtons = document.querySelectorAll('.category-filter');
const productCards = Array.from(document.querySelectorAll('.producto-card'));
const productsCount = document.getElementById('products-count');

function updateProductsCount() {
    if (!productsCount) return;
    const visible = productCards.filter((card) => card.offsetParent !== null).length;
    productsCount.textContent = `${visible} producto${visible === 1 ? '' : 's'} encontrados`;
}

function applyFilters() {
    const query = searchInput?.value.trim().toLowerCase() || '';
    const activeCategory = Array.from(categoryButtons).find((button) => button.getAttribute('aria-pressed') === 'true')?.dataset.category || 'Todos';

    productCards.forEach((card) => {
        const name = card.dataset.name?.toLowerCase() || '';
        const description = card.dataset.description?.toLowerCase() || '';
        const category = card.dataset.category || 'Todos';

        const matchesSearch = `${name} ${description} ${category}`.includes(query);
        const matchesCategory = activeCategory === 'Todos' || category === activeCategory;

        card.style.display = matchesSearch && matchesCategory ? '' : 'none';
    });

    updateProductsCount();
}

function bindCategoryButtons() {
    categoryButtons.forEach((button) => {
        button.addEventListener('click', () => {
            categoryButtons.forEach((btn) => {
                const isActive = btn === button;
                btn.setAttribute('aria-pressed', String(isActive));
                btn.classList.toggle('active', isActive);
            });

            applyFilters();
            button.focus();
        });
    });
}

function bindSearch() {
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    if (searchButton) {
        searchButton.addEventListener('click', applyFilters);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initHamburgerMenu();
    initFavorites();
    bindCategoryButtons();
    bindSearch();
    applyFilters();
    updateFavoriteButtons();
});