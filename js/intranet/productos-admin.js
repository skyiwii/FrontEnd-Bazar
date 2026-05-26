// ======================================
// PROTEGER ADMIN
// ======================================

protegerAdmin();



// ======================================
// LOGOUT
// ======================================

const btnLogout =
    document.getElementById(
        "btn-logout"
    );


if (btnLogout) {

    btnLogout.addEventListener(
        "click",
        cerrarSesion
    );

}



// ======================================
// ELEMENTOS
// ======================================

const formProducto =
    document.getElementById(
        "form-producto"
    );

const contenedorProductos =
    document.getElementById(
        "contenedor-productos-admin"
    );

const selectCategoria =
    document.getElementById(
        "categoria-producto"
    );



// ======================================
// MODO EDICIÓN
// ======================================

let productoEditandoId =
    null;



// ======================================
// INICIALIZAR
// ======================================

cargarCategoriasProducto();

renderProductos();



// ======================================
// RESOLVER IMAGEN ADMIN
// ======================================

function resolverImagenAdmin(ruta) {

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
// CARGAR CATEGORÍAS
// ======================================

function cargarCategoriasProducto() {

    if (!selectCategoria) {

        return;

    }


    const categorias =
        obtenerCategorias();


    selectCategoria.innerHTML = "";


    if (categorias.length === 0) {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            "";

        option.textContent =
            "No hay categorías creadas";

        selectCategoria.appendChild(
            option
        );

        return;

    }


    categorias.forEach(function (
        categoria
    ) {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            categoria.nombre;

        option.textContent =
            categoria.nombre;

        selectCategoria.appendChild(
            option
        );

    });

}



// ======================================
// OBTENER INFO COMO LISTA
// ======================================

function obtenerInfoProducto() {

    const textoInfo =
        document.getElementById(
            "info-producto"
        )
        .value
        .trim();


    return textoInfo
        .split("\n")
        .map(item => item.trim())
        .filter(item => item !== "");

}



// ======================================
// INFO A TEXTO
// ======================================

function convertirInfoATexto(info) {

    if (!info || info.length === 0) {

        return "";

    }


    return info.join("\n");

}



// ======================================
// SUBMIT FORM
// ======================================

formProducto.addEventListener(

    "submit",

    function (evento) {

        evento.preventDefault();


        const nombre =
            document.getElementById(
                "nombre-producto"
            )
            .value
            .trim();


        const descripcion =
            document.getElementById(
                "descripcion-producto"
            )
            .value
            .trim();


        const precio =
            Number(

                document.getElementById(
                    "precio-producto"
                ).value

            );


        const categoria =
            document.getElementById(
                "categoria-producto"
            )
            .value;


        const imagen =
            document.getElementById(
                "imagen-producto"
            )
            .value
            .trim();


        const info =
            obtenerInfoProducto();


        const uso =
            document.getElementById(
                "uso-producto"
            )
            .value
            .trim();


        if (
            !nombre ||
            !descripcion ||
            !precio ||
            !categoria ||
            info.length === 0 ||
            !uso
        ) {

            alert(
                "Completa todos los campos obligatorios"
            );

            return;

        }


        const imagenFinal =
            imagen || "logo.png";


        const datosProducto = {

            nombre,
            descripcion,
            precio,
            categoria,

            imagen:
                imagenFinal,

            zona:
                "general",

            miniaturas: [
                imagenFinal
            ],

            info,

            uso

        };


        if (productoEditandoId) {

            editarProducto(

                productoEditandoId,
                datosProducto

            );

            productoEditandoId =
                null;

        }

        else {

            crearProducto({

                id: crypto.randomUUID(),

                ...datosProducto

            });

        }


        formProducto.reset();

        renderProductos();

    }

);



// ======================================
// RENDER PRODUCTOS
// ======================================

function renderProductos() {

    contenedorProductos.innerHTML =
        "";


    const productos =
        obtenerProductos();


    if (productos.length === 0) {

        contenedorProductos.innerHTML =
            `
                <p style="text-align: center;">
                    No hay productos registrados.
                </p>
            `;

        return;

    }


    productos.forEach(function (
        producto
    ) {

        const article =
            document.createElement(
                "article"
            );


        article.classList.add(
            "producto-admin-card"
        );


        article.innerHTML = `

            <img
                src="${resolverImagenAdmin(producto.imagen)}"
                alt="${producto.nombre}"
                class="producto-admin-img">


            <div class="producto-admin-body">

                <h3>

                    ${producto.nombre}

                </h3>

                <p>

                    ${producto.descripcion}

                </p>

                <p class="mb-2">

                    <strong>

                        Categoría:

                    </strong>

                    ${producto.categoria || "Sin categoría"}

                </p>

                <p class="mb-2">

                    <strong>

                        Uso:

                    </strong>

                    ${producto.uso || "Sin información"}

                </p>

                <span class="producto-admin-precio">

                    $${Number(producto.precio).toLocaleString("es-CL")}

                </span>


                <div class="producto-admin-actions">

                    <button
                        class="btn btn-outline-dark btn-editar">

                        Editar

                    </button>

                    <button
                        class="btn btn-dark btn-eliminar">

                        Eliminar

                    </button>

                </div>

            </div>

        `;


        const btnEliminar =
            article.querySelector(
                ".btn-eliminar"
            );


        btnEliminar.addEventListener(

            "click",

            function () {

                const confirmar =
                    confirm(

                        `¿Eliminar "${producto.nombre}"?`

                    );


                if (!confirmar) {

                    return;

                }


                eliminarProducto(
                    producto.id
                );


                renderProductos();

            }

        );


        const btnEditar =
            article.querySelector(
                ".btn-editar"
            );


        btnEditar.addEventListener(

            "click",

            function () {

                cargarFormularioEditar(
                    producto
                );

            }

        );


        contenedorProductos.appendChild(
            article
        );

    });

}



// ======================================
// CARGAR FORM EDITAR
// ======================================

function cargarFormularioEditar(
    producto
) {

    productoEditandoId =
        producto.id;


    document.getElementById(
        "nombre-producto"
    ).value =
        producto.nombre;


    document.getElementById(
        "descripcion-producto"
    ).value =
        producto.descripcion;


    document.getElementById(
        "precio-producto"
    ).value =
        producto.precio;


    document.getElementById(
        "categoria-producto"
    ).value =
        producto.categoria || "";


    document.getElementById(
        "imagen-producto"
    ).value =
        producto.imagen;


    document.getElementById(
        "info-producto"
    ).value =
        convertirInfoATexto(
            producto.info
        );


    document.getElementById(
        "uso-producto"
    ).value =
        producto.uso || "";


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}