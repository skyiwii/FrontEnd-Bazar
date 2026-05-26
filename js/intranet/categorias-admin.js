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


btnLogout.addEventListener(
    "click",
    cerrarSesion
);



// ======================================
// ELEMENTOS
// ======================================

const formCategoria =
    document.getElementById(
        "form-categoria"
    );

const contenedorCategorias =
    document.getElementById(
        "contenedor-categorias"
    );



let categoriaEditandoId =
    null;



// ======================================
// INIT
// ======================================

renderCategorias();



// ======================================
// SUBMIT
// ======================================

formCategoria.addEventListener(

    "submit",

    function (evento) {

        evento.preventDefault();


        const nombre =
            document.getElementById(
                "nombre-categoria"
            )
            .value
            .trim();


        if (!nombre) {

            alert(
                "Ingresa un nombre"
            );

            return;

        }


        // =========================
        // EDITAR
        // =========================

        if (categoriaEditandoId) {

            editarCategoria(

                categoriaEditandoId,

                { nombre }

            );

            categoriaEditandoId =
                null;

        }


        // =========================
        // CREAR
        // =========================

        else {

            crearCategoria({

                id: crypto.randomUUID(),

                nombre

            });

        }


        formCategoria.reset();

        renderCategorias();

    }

);



// ======================================
// RENDER
// ======================================

function renderCategorias() {

    contenedorCategorias.innerHTML =
        "";


    const categorias =
        obtenerCategorias();


    categorias.forEach(function (
        categoria
    ) {

        const article =
            document.createElement(
                "article"
            );


        article.classList.add(
            "categoria-card"
        );


        article.innerHTML = `

            <h3>

                ${categoria.nombre}

            </h3>


            <div class="categoria-actions">

                <button
                    class="btn btn-outline-dark btn-editar">

                    Editar

                </button>

                <button
                    class="btn btn-dark btn-eliminar">

                    Eliminar

                </button>

            </div>

        `;


        // =========================
        // EDITAR
        // =========================

        article
            .querySelector(".btn-editar")
            .addEventListener(

                "click",

                function () {

                    categoriaEditandoId =
                        categoria.id;


                    document.getElementById(
                        "nombre-categoria"
                    ).value =
                        categoria.nombre;


                    window.scrollTo({

                        top: 0,

                        behavior: "smooth"

                    });

                }

            );


        // =========================
        // ELIMINAR
        // =========================

        article
            .querySelector(".btn-eliminar")
            .addEventListener(

                "click",

                function () {

                    const confirmar =
                        confirm(

                            `¿Eliminar "${categoria.nombre}"?`

                        );


                    if (!confirmar) {

                        return;

                    }


                    eliminarCategoria(
                        categoria.id
                    );


                    renderCategorias();

                }

            );


        contenedorCategorias.appendChild(
            article
        );

    });

}