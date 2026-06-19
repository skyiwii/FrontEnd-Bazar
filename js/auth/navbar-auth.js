// ======================================
// CONTENEDOR NAV AUTH
// ======================================


const estaEnPaginas =
    window.location.pathname.includes("/paginas/");

const rutaPaginas =
    estaEnPaginas ? "./" : "./paginas/";

const rutaIntranet =
    estaEnPaginas ? "./intranet/" : "./paginas/intranet/";

const navAuth =
    document.getElementById(
        "nav-auth"
    );



// ======================================
// RENDER NAVBAR
// ======================================

function renderNavbarAuth() {

    if (!navAuth) {

        return;

    }


    const usuario =
        obtenerUsuarioActual();


    // ======================================
    // NO LOGIN
    // ======================================

    if (!usuario) {

        navAuth.innerHTML = `

            <li class="nav-item">

                <a
                    class="nav-link"
                    href="${rutaPaginas}login.html">

                    Ingresar

                </a>

            </li>

            <li class="nav-item">

                <a
                    class="nav-link"
                    href="${rutaPaginas}registro.html">

                    Registro

                </a>

            </li>

        `;

        return;

    }


    // ======================================
    // ADMIN
    // ======================================

    if (usuario.rol === "admin") {

        navAuth.innerHTML = `

            <li class="nav-item">

                <a
                    class="nav-link"
                    href="${rutaIntranet}dashboard-admin.html">

                    Panel Admin

                </a>

            </li>

            <li class="nav-item">

                <button
                    id="btn-logout"
                    class="btn btn-sm btn-dark ms-lg-2">

                    Salir

                </button>

            </li>

        `;

    }


    // ======================================
    // CLIENTE
    // ======================================

    else {

        navAuth.innerHTML = `

            <li class="nav-item">

                <a
                    class="nav-link"
                    href="${rutaIntranet}dashboard-cliente.html">

                    ${usuario.nombre}

                </a>

            </li>

            <li class="nav-item">

                <button
                    id="btn-logout"
                    class="btn btn-sm btn-dark ms-lg-2">

                    Salir

                </button>

            </li>

        `;

    }


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

}



// ======================================
// INIT
// ======================================

renderNavbarAuth();