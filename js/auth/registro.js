// ======================================
// BLOQUEAR SI YA HAY SESIÓN
// ======================================

if (usuarioLogueado()) {

    const usuario =
        obtenerUsuarioActual();


    if (usuario.rol === "admin") {

        window.location.href =
            "../paginas/intranet/dashboard-admin.html";

    }

    else {

        window.location.href =
            "../paginas/intranet/dashboard-cliente.html";

    }

}




// ======================================
// FORMULARIO
// ======================================

const formularioRegistro =
    document.getElementById(
        "form-registro"
    );


// ======================================
// REGISTRO
// ======================================

formularioRegistro.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // ======================================
        // CAMPOS
        // ======================================

        const nombre =
            document.getElementById("registro-nombre")
            .value
            .trim();

        const email =
            document.getElementById("registro-email")
            .value
            .trim()
            .toLowerCase();

        const password =
            document.getElementById("registro-password")
            .value
            .trim();

        const confirmarPassword =
            document.getElementById("registro-confirmar-password")
            .value
            .trim();


        // ======================================
        // VALIDACIONES
        // ======================================

        if (

            !nombre ||
            !email ||
            !password ||
            !confirmarPassword

        ) {

            alert(
                "Todos los campos son obligatorios"
            );

            return;

        }


        // Nombre mínimo
        if (nombre.length < 3) {

            alert(
                "El nombre debe tener mínimo 3 caracteres"
            );

            return;

        }


        // Password mínima
        if (password.length < 6) {

            alert(
                "La contraseña debe tener mínimo 6 caracteres"
            );

            return;

        }


        // Password coincide
        if (password !== confirmarPassword) {

            alert(
                "Las contraseñas no coinciden"
            );

            return;

        }


        // ======================================
        // NUEVO USUARIO
        // ======================================

        const nuevoUsuario = {

            id: crypto.randomUUID(),

            nombre,

            correo: email,

            password,

            rol: "cliente",

            favoritos: []

        };


        // ======================================
        // REGISTRAR
        // ======================================

        const resultado =
            registrarUsuario(nuevoUsuario);


        // Error
        if (!resultado.ok) {

            alert(resultado.mensaje);

            return;

        }


        // Éxito
        alert(
            "Cuenta creada correctamente"
        );


        // Redirección
        window.location.href =
            "./login.html";

    }
);