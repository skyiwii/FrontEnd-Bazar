const FAVORITES_KEY = 'vura-favorites';

function getFavorites() {
    try {
        const stored = localStorage.getItem(FAVORITES_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

function saveFavorites(ids) {
    const uniqueIds = [...new Set(ids.map(String))];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(uniqueIds));
}

function isFavorite(productId) {
    return getFavorites().includes(String(productId));
}

function toggleFavorite(productId) {
    const id = String(productId);
    const current = getFavorites();
    const has = current.includes(id);
    const next = has ? current.filter((item) => item !== id) : [...current, id];
    saveFavorites(next);
    return !has;
}

function updateFavoriteButtons() {
    document.querySelectorAll('[data-favorite-button]').forEach((button) => {
        const productId = button.dataset.productId;
        const label = button.dataset.favoriteLabel || 'producto';
        const iconOnly = button.dataset.iconOnly === 'true';
        const active = isFavorite(productId);

        button.setAttribute('aria-pressed', String(active));
        button.setAttribute('aria-label', active ? `Quitar ${label} de favoritos` : `Agregar ${label} a favoritos`);

        if (iconOnly) {
            button.textContent = active ? '❤️' : '🤍';
        } else {
            button.textContent = active ? `❤️ ${label}` : `🤍 ${label}`;
        }

        button.classList.toggle('favorito-activo', active);
    });
}

function initFavorites() {
    document.body.addEventListener('click', (event) => {
        const button = event.target.closest('[data-favorite-button]');

        if (!button) {
            return;
        }

        const productId = button.dataset.productId;

        if (!productId) {
            return;
        }

        toggleFavorite(productId);
        updateFavoriteButtons();
        document.dispatchEvent(new CustomEvent('favorites-changed', {
            detail: { productId }
        }));
    });

    updateFavoriteButtons();
}

export { getFavorites, isFavorite, toggleFavorite, updateFavoriteButtons, initFavorites };