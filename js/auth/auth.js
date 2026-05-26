// ======================================
// STORAGE
// ======================================

const STORAGE_USUARIOS =
    "usuarios";

const STORAGE_SESION =
    "sesionActiva";



// ======================================
// OBTENER USUARIOS
// ======================================

function obtenerUsuarios() {

    return JSON.parse(

        localStorage.getItem(
            STORAGE_USUARIOS
        )

    ) || [];

}



// ======================================
// GUARDAR USUARIOS
// ======================================

function guardarUsuarios(usuarios) {

    localStorage.setItem(

        STORAGE_USUARIOS,

        JSON.stringify(usuarios)

    );

}



// ======================================
// REGISTRAR
// ======================================

function registrarUsuario(usuarioNuevo) {

    const usuarios =
        obtenerUsuarios();


    const existeUsuario =
        usuarios.some(

            usuario =>

                usuario.correo ===
                usuarioNuevo.correo

        );


    if (existeUsuario) {

        return {

            ok: false,

            mensaje:
                "El correo ya está registrado"

        };

    }


    usuarios.push(usuarioNuevo);

    guardarUsuarios(usuarios);


    return {

        ok: true

    };

}



// ======================================
// LOGIN
// ======================================

function iniciarSesion(
    correo,
    password
) {

    const usuarios =
        obtenerUsuarios();


    const usuarioEncontrado =
        usuarios.find(

            usuario =>

                usuario.correo === correo &&
                usuario.password === password

        );


    if (!usuarioEncontrado) {

        return {

            ok: false,

            mensaje:
                "Correo o contraseña incorrectos"

        };

    }


    localStorage.setItem(

        STORAGE_SESION,

        JSON.stringify(usuarioEncontrado)

    );


    return {

        ok: true,

        usuario: usuarioEncontrado

    };

}




// ======================================
// SESIÓN
// ======================================

function obtenerSesion() {

    return JSON.parse(

        localStorage.getItem(
            STORAGE_SESION
        )

    );

}



// ======================================
// OBTENER USUARIO ACTUAL
// ======================================

function obtenerUsuarioActual() {

    return obtenerSesion();

}




// ======================================
// LOGIN ACTIVO
// ======================================

function usuarioLogueado() {

    return !!obtenerSesion();

}



// ======================================
// ADMIN
// ======================================

function esAdmin() {

    const sesion =
        obtenerSesion();


    if (!sesion) {

        return false;

    }


    return sesion.rol === "admin";

}



// ======================================
// ADMIN DEFAULT
// ======================================

function crearAdminDefault() {

    const usuarios =
        obtenerUsuarios();


    const existeAdmin =
        usuarios.some(

            usuario =>
                usuario.rol === "admin"

        );


    if (existeAdmin) {

        return;

    }


    const admin = {

        id: crypto.randomUUID(),

        nombre: "Administrador",

        correo: "admin@vura.cl",

        password: "Admin123",

        rol: "admin",

        favoritos: []

    };


    usuarios.push(admin);

    guardarUsuarios(usuarios);

}



// ======================================
// INIT
// ======================================

crearAdminDefault();