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

const contenedorUsuarios =
    document.getElementById(
        "contenedor-usuarios"
    );

const buscadorUsuarios =
    document.getElementById(
        "buscador-usuarios"
    );

const contadorUsuarios =
    document.getElementById(
        "contador-usuarios"
    );



// ======================================
// INIT
// ======================================

renderUsuarios();



// ======================================
// BUSCADOR
// ======================================

buscadorUsuarios.addEventListener(

    "input",

    function () {

        renderUsuarios(
            buscadorUsuarios.value
        );

    }

);



// ======================================
// RENDER
// ======================================

function renderUsuarios(
    textoBusqueda = ""
) {

    contenedorUsuarios.innerHTML =
        "";


    const usuarios =
        obtenerUsuarios();


    // =========================
    // FILTRO
    // =========================

    const usuariosFiltrados =
        usuarios.filter(function (
            usuario
        ) {

            const texto =
                textoBusqueda
                .toLowerCase();


            return (

                usuario.nombre
                    .toLowerCase()
                    .includes(texto)

                ||

                usuario.correo
                    .toLowerCase()
                    .includes(texto)

            );

        });


    // =========================
    // CONTADOR
    // =========================

    contadorUsuarios.textContent =
        `Usuarios encontrados: ${usuariosFiltrados.length}`;


    // =========================
    // VACÍO
    // =========================

    if (
        usuariosFiltrados.length === 0
    ) {

        contenedorUsuarios.innerHTML =
            `

                <p>

                    No se encontraron usuarios.

                </p>

            `;

        return;

    }


    // =========================
    // RENDER CARDS
    // =========================

    usuariosFiltrados.forEach(

        function (usuario) {

            const article =
                document.createElement(
                    "article"
                );


            article.classList.add(
                "usuario-card"
            );


            article.innerHTML = `

                <h3 class="usuario-nombre">

                    ${usuario.nombre}

                </h3>


                <p class="usuario-correo">

                    ${usuario.correo}

                </p>


                <span class="usuario-rol">

                    ${usuario.rol}

                </span>


                <p class="usuario-favoritos">

                    Favoritos:
                    ${usuario.favoritos.length}

                </p>


                <div class="usuario-actions">

                    <button
                        class="btn btn-dark btn-eliminar">

                        Eliminar

                    </button>

                </div>

            `;


            // =========================
            // BOTÓN ELIMINAR
            // =========================

            const btnEliminar =
                article.querySelector(
                    ".btn-eliminar"
                );


            btnEliminar.addEventListener(

                "click",

                function () {


                    // =========================
                    // BLOQUEAR ADMIN
                    // =========================

                    if (
                        usuario.rol ===
                        "admin"
                    ) {

                        alert(
                            "No puedes eliminar administradores."
                        );

                        return;

                    }


                    const confirmar =
                        confirm(

                            `¿Eliminar a ${usuario.nombre}?`

                        );


                    if (!confirmar) {

                        return;

                    }


                    eliminarUsuario(
                        usuario.id
                    );

                    renderUsuarios(
                        buscadorUsuarios.value
                    );

                }

            );


            contenedorUsuarios.appendChild(
                article
            );

        }

    );

}



// ======================================
// ELIMINAR USUARIO
// ======================================

function eliminarUsuario(
    idUsuario
) {

    const usuarios =
        obtenerUsuarios();


    const usuariosActualizados =
        usuarios.filter(

            usuario =>

                usuario.id !==
                idUsuario

        );


    guardarUsuarios(
        usuariosActualizados
    );

}