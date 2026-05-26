// ======================================
// CONTENEDORES
// ======================================

const contenedorProductos =
    document.getElementById("productos-grilla");

const listaCategorias =
    document.getElementById("lista-categorias");

const inputBusqueda =
    document.getElementById("input-busqueda");



// ======================================
// PRODUCTOS Y CATEGORÍAS DESDE STORAGE
// ======================================

const productos =
    obtenerProductos();

const categoriasStorage =
    typeof obtenerCategorias === "function"
        ? obtenerCategorias()
        : [];



// ======================================
// ESTADO
// ======================================

let categoriaActual =
    "Todos";

let textoBusqueda =
    "";



// ======================================
// FORMATEAR PRECIO
// ======================================

function formatearPrecio(precio) {

    return `$${Number(precio).toLocaleString("es-CL")}`;

}



// ======================================
// RESOLVER IMAGEN
// ======================================

function resolverImagen(ruta) {

    if (!ruta) {

        return "../media/logo.png";

    }


    if (
        ruta.startsWith("http") ||
        ruta.startsWith("data:")
    ) {

        return ruta;

    }


    const nombreArchivo =
        ruta.split("/").pop();


    return `../media/${nombreArchivo}`;

}



// ======================================
// RENDER PRODUCTOS
// ======================================

function renderProductos() {

    contenedorProductos.innerHTML =
        "";


    const productosFiltrados =
        productos.filter((producto) => {

            const coincideCategoria =

                categoriaActual === "Todos" ||

                producto.categoria === categoriaActual;


            const coincideBusqueda =

                producto.nombre
                    .toLowerCase()
                    .includes(
                        textoBusqueda.toLowerCase()
                    );


            return (
                coincideCategoria &&
                coincideBusqueda
            );

        });


    if (productosFiltrados.length === 0) {

        contenedorProductos.innerHTML = `
            <div class="sin-productos text-center">

                <h3>
                    No se encontraron productos
                </h3>

            </div>
        `;

        return;

    }


    productosFiltrados.forEach((producto) => {

        const card =
            document.createElement("article");

        card.classList.add("producto-card");


        card.innerHTML = `
            <button
                class="btn-favorito"
                data-id="${producto.id}"
                type="button">

                ♡

            </button>

            <img
                src="${resolverImagen(producto.imagen)}"
                alt="${producto.nombre}">

            <h3>
                ${producto.nombre}
            </h3>

            <p>
                ${producto.descripcion}
            </p>

            <strong class="precio-card">
                ${formatearPrecio(producto.precio)}
            </strong>

            <a
                href="../productos/producto.html?id=${producto.id}"
                class="btn btn-dark">

                Ver detalles

            </a>
        `;


        const btnFavorito =
            card.querySelector(".btn-favorito");


        // ======================================
        // PINTAR FAVORITO
        // ======================================

        if (
            typeof actualizarBotonFavorito ===
            "function"
        ) {

            actualizarBotonFavorito(
                btnFavorito,
                producto.id
            );

        }


        // ======================================
        // CLICK FAVORITO
        // ======================================

        btnFavorito.addEventListener(
            "click",
            function () {

                if (
                    typeof toggleFavorito !==
                    "function"
                ) {

                    alert(
                        "No se pudo cargar favoritos."
                    );

                    return;

                }


                toggleFavorito(
                    producto.id
                );


                actualizarBotonFavorito(
                    btnFavorito,
                    producto.id
                );

            }
        );


        contenedorProductos.appendChild(card);

    });

}



// ======================================
// RENDER CATEGORÍAS
// ======================================

function renderCategorias() {

    listaCategorias.innerHTML =
        "";


    const categoriasProductos =
    productos.map(
        producto => producto.categoria
    );


    const categoriasAdmin =
        categoriasStorage.map(
            categoria => categoria.nombre
        );


    const categorias = [

        "Todos",

        ...new Set([
            ...categoriasProductos,
            ...categoriasAdmin
        ])

    ].filter(Boolean);

    categorias.forEach((categoria) => {

        const li =
            document.createElement("li");


        li.innerHTML = `
            <a
                href="#"
                data-categoria="${categoria}">

                ${categoria}

            </a>
        `;


        const enlace =
            li.querySelector("a");


        enlace.addEventListener("click", (e) => {

            e.preventDefault();

            categoriaActual =
                categoria;

            renderProductos();

        });


        listaCategorias.appendChild(li);

    });

}



// ======================================
// BUSCADOR
// ======================================

inputBusqueda.addEventListener("input", (e) => {

    textoBusqueda =
        e.target.value.trim();

    renderProductos();

});



// ======================================
// INICIALIZAR
// ======================================

renderCategorias();

renderProductos();