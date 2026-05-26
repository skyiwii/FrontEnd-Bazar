// ======================================
// PROTEGER RUTA
// ======================================

protegerCliente();



// ======================================
// USUARIO
// ======================================

const usuario =
    obtenerUsuarioActual();



// ======================================
// ELEMENTOS
// ======================================

const nombreUsuario =
    document.getElementById(
        "nombre-usuario"
    );

const contenedorFavoritos =
    document.getElementById(
        "contenedor-favoritos"
    );

const favoritosVacio =
    document.getElementById(
        "favoritos-vacio"
    );

const btnLogout =
    document.getElementById(
        "btn-logout"
    );



// ======================================
// NOMBRE
// ======================================

if (nombreUsuario && usuario) {

    nombreUsuario.textContent =
        usuario.nombre;

}



// ======================================
// LOGOUT
// ======================================

if (btnLogout) {

    btnLogout.addEventListener(
        "click",
        cerrarSesion
    );

}



// ======================================
// FORMATEAR PRECIO
// ======================================

function formatearPrecio(precio) {

    return `$${Number(precio).toLocaleString("es-CL")}`;

}



// ======================================
// RESOLVER IMAGEN
// ======================================

function resolverImagenDashboard(ruta) {

    if (!ruta) {

        return "../../media/logo.png";

    }


    if (
        ruta.startsWith("http") ||
        ruta.startsWith("data:")
    ) {

        return ruta;

    }


    const nombreArchivo =
        ruta.split("/").pop();


    return `../../media/${nombreArchivo}`;

}



// ======================================
// MOSTRAR FAVORITOS
// ======================================

function mostrarFavoritos() {

    contenedorFavoritos.innerHTML =
        "";


    const favoritosIds =
        usuario.favoritos || [];


    const productos =
        obtenerProductos();


    const productosFavoritos =
        productos.filter(function (
            producto
        ) {

            return favoritosIds.some(function (
                idFavorito
            ) {

                return (
                    String(idFavorito) ===
                    String(producto.id)
                );

            });

        });


    if (productosFavoritos.length === 0) {

        favoritosVacio.style.display =
            "block";

        return;

    }


    favoritosVacio.style.display =
        "none";


    productosFavoritos.forEach(function (
        producto
    ) {

        const card =
            document.createElement(
                "article"
            );


        card.classList.add(
            "card-base",
            "favorito-card"
        );


        card.innerHTML = `

            <img
                src="${resolverImagenDashboard(producto.imagen)}"
                alt="${producto.nombre}">

            <div class="p-4">

                <h3 class="mb-3">

                    ${producto.nombre}

                </h3>

                <p>

                    ${producto.descripcion}

                </p>

                <strong>

                    ${formatearPrecio(producto.precio)}

                </strong>

                <div class="mt-4">

                    <a
                        href="../../productos/producto.html?id=${producto.id}"
                        class="btn btn-dark">

                        Ver producto

                    </a>

                </div>

            </div>

        `;


        contenedorFavoritos.appendChild(
            card
        );

    });

}



// ======================================
// INIT
// ======================================

mostrarFavoritos();