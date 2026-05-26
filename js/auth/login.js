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
// ELEMENTOS
// ======================================

const formLogin =
    document.getElementById(
        "form-login"
    );

const mensajeLogin =
    document.getElementById(
        "mensaje-login"
    );



// ======================================
// LOGIN
// ======================================

formLogin.addEventListener(

    "submit",

    function (evento) {

        evento.preventDefault();


        const correo =
            document.getElementById(
                "correo"
            )
            .value
            .trim()
            .toLowerCase();


        const password =
            document.getElementById(
                "password"
            )
            .value
            .trim();


        const resultado =
            iniciarSesion(
                correo,
                password
            );


        if (!resultado.ok) {

            mostrarMensajeLogin(
                resultado.mensaje,
                "error"
            );

            return;

        }


        mostrarMensajeLogin(
            `Bienvenido ${resultado.usuario.nombre}`,
            "success"
        );


        setTimeout(function () {


            // =========================
            // ADMIN
            // =========================

            if (
                resultado.usuario.rol
                === "admin"
            ) {

                window.location.href =
                    "../paginas/intranet/dashboard-admin.html";

            }


            // =========================
            // CLIENTE
            // =========================

            else {

                window.location.href =
                    "../paginas/intranet/dashboard-cliente.html";

            }

        }, 1200);

    }

);



// ======================================
// MENSAJES
// ======================================

function mostrarMensajeLogin(
    texto,
    tipo
) {

    mensajeLogin.textContent =
        texto;


    if (tipo === "success") {

        mensajeLogin.style.color =
            "#198754";

    }

    else {

        mensajeLogin.style.color =
            "#dc3545";

    }

}