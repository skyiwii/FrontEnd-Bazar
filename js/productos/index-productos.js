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

        return "./media/logo.png";

    }

    if (
        ruta.startsWith("http") ||
        ruta.startsWith("data:")
    ) {

        return ruta;

    }

    const nombreArchivo =
        ruta.split("/").pop();

    return `./media/${nombreArchivo}`;

}



// ======================================
// PRODUCTOS
// ======================================

const productos =
    obtenerProductos();



// ======================================
// CONTENEDOR CARRUSEL
// ======================================

const carouselInner =
    document.getElementById(
        "carousel-inner-productos"
    );



// ======================================
// VALIDAR CONTENEDOR
// ======================================

if (carouselInner) {

    carouselInner.innerHTML =
        "";


    if (productos.length === 0) {

        carouselInner.innerHTML = `
            <div class="carousel-item active">
                <article class="producto-card-carrusel">
                    <h3>No se encontraron productos</h3>
                    <p>¡Por ahora no tenemos productos!</p>
                </article>
            </div>
        `;

    }

    else {

        productos.forEach((producto, index) => {

            const item =
                document.createElement("div");

            item.classList.add("carousel-item");

            if (index === 0) {

                item.classList.add("active");

            }

            item.innerHTML = `
                <article class="producto-card-carrusel">

                    <img
                        src="${resolverImagen(producto.imagen)}"
                        alt="${producto.nombre}">

                    <h3>
                        ${producto.nombre}
                    </h3>

                    <p>
                        ${formatearPrecio(producto.precio)}
                    </p>

                    <a
                        href="./productos/producto.html?id=${producto.id}"
                        class="btn btn-primary">

                        Ver más detalles

                    </a>

                </article>
            `;

            carouselInner.appendChild(item);

        });

    }

}