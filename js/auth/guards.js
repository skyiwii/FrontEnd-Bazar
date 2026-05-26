// ======================================
// REQUIERE LOGIN
// ======================================

function requireLogin() {

    if (!usuarioLogueado()) {

        window.location.href =
            "../login.html";

    }

}



// ======================================
// SOLO ADMIN
// ======================================

function protegerAdmin() {

    if (!usuarioLogueado()) {

        window.location.href =
            "../login.html";

        return;

    }


    if (!esAdmin()) {

        window.location.href =
            "../../index.html";

    }

}



// ======================================
// SOLO CLIENTE
// ======================================

function protegerCliente() {

    if (!usuarioLogueado()) {

        window.location.href =
            "../login.html";

        return;

    }


    if (esAdmin()) {

        window.location.href =
            "./dashboard-admin.html";

    }

}