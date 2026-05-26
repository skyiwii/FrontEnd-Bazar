// ======================================
// OBTENER SESIÓN ACTIVA
// ======================================

function obtenerSesion() {

    return JSON.parse(
        localStorage.getItem("sesionActiva")
    );

}



// ======================================
// VERIFICAR LOGIN
// ======================================

function usuarioLogueado() {

    return obtenerSesion() !== null;

}



// ======================================
// OBTENER USUARIO ACTUAL
// ======================================

function obtenerUsuarioActual() {

    return obtenerSesion();

}



// ======================================
// CERRAR SESIÓN
// ======================================

function cerrarSesion() {

    localStorage.removeItem(
        "sesionActiva"
    );


    const ruta =
        window.location.pathname;


    if (ruta.includes("/paginas/intranet/")) {

        window.location.href =
            "../../index.html";

    }

    else if (ruta.includes("/paginas/")) {

        window.location.href =
            "../index.html";

    }

    else {

        window.location.href =
            "./index.html";

    }

}



// ======================================
// OBTENER NOMBRE USUARIO
// ======================================

function obtenerNombreUsuario() {

    const usuario =
        obtenerUsuarioActual();

    if (!usuario) {

        return "";

    }

    return usuario.nombre;

}



// ======================================
// OBTENER ROL
// ======================================

function obtenerRolUsuario() {

    const usuario =
        obtenerUsuarioActual();

    if (!usuario) {

        return null;

    }

    return usuario.rol;

}



// ======================================
// ES ADMIN
// ======================================

function esAdmin() {

    return obtenerRolUsuario()
        === "admin";

}