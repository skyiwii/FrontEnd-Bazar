// ==========================================
// WIDGET CONTACTO - VALIDACIONES
// ==========================================

const formularioWidget =
    document.querySelector(".formulario-widget");

const inputNombreWidget =
    document.getElementById("widget-nombre");

const inputRutWidget =
    document.getElementById("widget-rut");

const inputCorreoWidget =
    document.getElementById("widget-correo");

const inputTelefonoWidget =
    document.getElementById("widget-telefono");

const textareaMensajeWidget =
    document.getElementById("widget-mensaje");



// ==========================================
// MOSTRAR ERROR
// ==========================================

function mostrarError(input, mensaje) {

    eliminarError(input);

    const error =
        document.createElement("p");

    error.classList.add("mensaje-error");

    error.style.color =
        "#dc3545";

    error.style.fontSize =
        "0.85rem";

    error.style.marginTop =
        "5px";

    error.textContent =
        mensaje;

    input.style.border =
        "2px solid #dc3545";

    input.parentElement.appendChild(error);

}



// ==========================================
// ELIMINAR ERROR
// ==========================================

function eliminarError(input) {

    input.style.border =
        "";

    const errorExistente =
        input.parentElement.querySelector(
            ".mensaje-error"
        );

    if (errorExistente) {

        errorExistente.remove();

    }

}



// ==========================================
// VALIDAR NOMBRE
// ==========================================

function validarNombreWidget() {

    const nombre =
        inputNombreWidget.value.trim();

    eliminarError(inputNombreWidget);

    const regexNombre =
        /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (nombre.length < 3) {

        mostrarError(
            inputNombreWidget,
            "Mínimo 3 caracteres"
        );

        return false;

    }

    if (!regexNombre.test(nombre)) {

        mostrarError(
            inputNombreWidget,
            "Solo letras permitidas"
        );

        return false;

    }

    return true;

}



// ==========================================
// VALIDAR RUT
// ==========================================

function validarRutWidget() {

    const rut =
        inputRutWidget.value.trim();

    eliminarError(inputRutWidget);

    const regexRut =
        /^[0-9]{7,8}-[0-9kK]{1}$/;

    if (!regexRut.test(rut)) {

        mostrarError(
            inputRutWidget,
            "Formato inválido: 12345678-9"
        );

        return false;

    }

    let rutLimpio =
        rut.replace("-", "");

    let cuerpo =
        rutLimpio.slice(0, -1);

    let dv =
        rutLimpio
            .slice(-1)
            .toUpperCase();

    let suma =
        0;

    let multiplo =
        2;

    for (
        let i = cuerpo.length - 1;
        i >= 0;
        i--
    ) {

        suma +=
            Number(cuerpo[i]) * multiplo;

        multiplo++;

        if (multiplo > 7) {

            multiplo =
                2;

        }

    }

    let dvEsperado =
        11 - (suma % 11);

    if (dvEsperado === 11) {

        dvEsperado =
            "0";

    }

    else if (dvEsperado === 10) {

        dvEsperado =
            "K";

    }

    else {

        dvEsperado =
            dvEsperado.toString();

    }

    if (dv !== dvEsperado) {

        mostrarError(
            inputRutWidget,
            "RUT inválido"
        );

        return false;

    }

    return true;

}



// ==========================================
// VALIDAR EMAIL
// ==========================================

function validarCorreoWidget() {

    const correo =
        inputCorreoWidget.value.trim();

    eliminarError(inputCorreoWidget);

    const regexCorreo =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexCorreo.test(correo)) {

        mostrarError(
            inputCorreoWidget,
            "Correo inválido"
        );

        return false;

    }

    return true;

}



// ==========================================
// VALIDAR TELÉFONO
// ==========================================

function validarTelefonoWidget() {

    const telefono =
        inputTelefonoWidget.value.trim();

    eliminarError(inputTelefonoWidget);

    const regexTelefono =
        /^(\+56\s?9\s?[0-9]{4}\s?[0-9]{4}|9[0-9]{8})$/;

    if (telefono === "") {

        mostrarError(
            inputTelefonoWidget,
            "Ingresa teléfono"
        );

        return false;

    }

    if (!regexTelefono.test(telefono)) {

        mostrarError(
            inputTelefonoWidget,
            "Teléfono inválido"
        );

        return false;

    }

    return true;

}



// ==========================================
// VALIDAR MENSAJE
// ==========================================

function validarMensajeWidget() {

    const mensaje =
        textareaMensajeWidget.value.trim();

    eliminarError(textareaMensajeWidget);

    if (mensaje.length < 10) {

        mostrarError(
            textareaMensajeWidget,
            "Mínimo 10 caracteres"
        );

        return false;

    }

    return true;

}



// ==========================================
// ENVÍO FORMULARIO
// ==========================================

if (formularioWidget) {

    formularioWidget.addEventListener(
        "submit",
        function(evento) {

            evento.preventDefault();

            const nombreValido =
                validarNombreWidget();

            const rutValido =
                validarRutWidget();

            const correoValido =
                validarCorreoWidget();

            const telefonoValido =
                validarTelefonoWidget();

            const mensajeValido =
                validarMensajeWidget();


            if (
                nombreValido &&
                rutValido &&
                correoValido &&
                telefonoValido &&
                mensajeValido
            ) {

                const nuevoContacto = {

                    id:
                        crypto.randomUUID(),

                    origen:
                        "Widget Inicio",

                    nombre:
                        inputNombreWidget.value.trim(),

                    rut:
                        inputRutWidget.value.trim(),

                    correo:
                        inputCorreoWidget.value.trim().toLowerCase(),

                    telefono:
                        inputTelefonoWidget.value.trim(),

                    asunto:
                        "Consulta desde widget",

                    mensaje:
                        textareaMensajeWidget.value.trim(),

                    fecha:
                        new Date().toLocaleString("es-CL"),

                    estado:
                        "pendiente"

                };


                crearContacto(
                    nuevoContacto
                );


                alert(
                    "Consulta enviada correctamente"
                );

                formularioWidget.reset();

            }

        }
    );

}



// ==========================================
// VALIDACIONES EN TIEMPO REAL
// ==========================================

if (inputNombreWidget) {

    inputNombreWidget.addEventListener(
        "input",
        validarNombreWidget
    );

}

if (inputRutWidget) {

    inputRutWidget.addEventListener(
        "input",
        validarRutWidget
    );

}

if (inputCorreoWidget) {

    inputCorreoWidget.addEventListener(
        "input",
        validarCorreoWidget
    );

}

if (inputTelefonoWidget) {

    inputTelefonoWidget.addEventListener(
        "input",
        validarTelefonoWidget
    );

}

if (textareaMensajeWidget) {

    textareaMensajeWidget.addEventListener(
        "input",
        validarMensajeWidget
    );

}