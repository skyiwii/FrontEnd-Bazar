import { productos } from './productos.js';
import { initFavorites, updateFavoriteButtons } from './favorites.js';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const producto = productos[id];

const mainElement = document.querySelector('main');
const favoriteButton = document.getElementById('favorite-toggle');

if (!producto) {
    if (mainElement) {
        mainElement.innerHTML = `
            <div class="text-center mt-5">
                <h2>Producto no encontrado</h2>
                <a href="productos.html" class="btn btn-primary mt-3">Volver a productos</a>
            </div>
        `;
    }
} else {
    document.title = `Vura - ${producto.nombre}`;

    const nombre = document.getElementById('nombre');
    const precio = document.getElementById('precio');
    const descripcion = document.getElementById('descripcion');
    const breadcrumbNombre = document.getElementById('breadcrumb-nombre');
    const imgPrincipal = document.getElementById('img-principal');
    const contenedorMini = document.getElementById('miniaturas');
    const infoTecnica = document.getElementById('info-tecnica');
    const uso = document.getElementById('uso');

    if (nombre) nombre.textContent = producto.nombre;
    if (precio) precio.textContent = producto.precio;
    if (descripcion) descripcion.textContent = producto.descripcion;
    if (breadcrumbNombre) breadcrumbNombre.textContent = producto.nombre;
    if (imgPrincipal) imgPrincipal.src = producto.imagen;

    if (contenedorMini) {
        contenedorMini.innerHTML = '';
        producto.miniaturas.forEach((imgSrc) => {
            const imagen = document.createElement('img');
            imagen.src = imgSrc;
            imagen.classList.add('miniatura-item');
            if (imgSrc === producto.imagen) {
                imagen.classList.add('activa');
            }
            imagen.addEventListener('click', () => {
                if (imgPrincipal) imgPrincipal.src = imgSrc;
                document.querySelectorAll('.miniatura-item').forEach((el) => el.classList.remove('activa'));
                imagen.classList.add('activa');
            });
            contenedorMini.appendChild(imagen);
        });
    }

    if (infoTecnica) {
        infoTecnica.innerHTML = '';
        producto.info.forEach((item) => {
            const li = document.createElement('li');
            li.textContent = item;
            infoTecnica.appendChild(li);
        });
    }

    if (uso) uso.textContent = producto.uso;

    if (favoriteButton) {
        favoriteButton.dataset.productId = id;
        favoriteButton.dataset.favoriteLabel = producto.nombre;
        favoriteButton.dataset.iconOnly = 'false';
    }

    initFavorites();
    updateFavoriteButtons();
}
