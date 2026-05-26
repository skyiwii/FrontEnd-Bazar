// ======================================
// CONTENEDOR NAV AUTH
// ======================================

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
                    href="./paginas/login.html">

                    Ingresar

                </a>

            </li>

            <li class="nav-item">

                <a
                    class="nav-link"
                    href="./paginas/registro.html">

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
                    href="./paginas/intranet/dashboard-admin.html">

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
                    href="./paginas/intranet/dashboard-cliente.html">

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