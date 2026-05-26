// ======================================
// PROTEGER RUTA ADMIN
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