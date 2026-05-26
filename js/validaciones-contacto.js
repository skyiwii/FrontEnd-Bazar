// ==========================================
// FORMULARIO CONTACTO - VALIDACIONES
// ==========================================

// FORMULARIO
const formulario =
    document.querySelector(".formulario-contacto");


// INPUTS
const inputNombre =
    document.getElementById("nombre");

const inputRut =
    document.getElementById("rut");

const inputCorreo =
    document.getElementById("correo");

const inputTelefono =
    document.getElementById("telefono");

const selectAsunto =
    document.getElementById("asunto");

const textareaMensaje =
    document.getElementById("mensaje");

const checkboxDatos =
    document.querySelector(
        ".checkbox-custom input"
    );


// ==========================================
// MOSTRAR ERROR
// ==========================================
function mostrarError(input, mensaje) {

    eliminarError(input);

    const error =
        document.createElement("p");

    error.classList.add("mensaje-error");

    error.textContent = mensaje;

    input.style.border =
        "2px solid #dc3545";

    input.parentElement.appendChild(error);

}


// ==========================================
// ELIMINAR ERROR
// ==========================================
function eliminarError(input) {

    input.style.border = "";

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
function validarNombre() {

    const nombre =
        inputNombre.value.trim();

    eliminarError(inputNombre);

    // SOLO LETRAS Y ESPACIOS
    const regexNombre =
        /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (nombre.length < 3) {

        mostrarError(
            inputNombre,
            "El nombre debe tener mínimo 3 caracteres"
        );

        return false;

    }

    if (!regexNombre.test(nombre)) {

        mostrarError(
            inputNombre,
            "El nombre solo puede contener letras"
        );

        return false;

    }

    return true;

}


// ==========================================
// VALIDAR RUT CHILENO
// ==========================================
function validarRut() {

    const rut =
        inputRut.value.trim();

    eliminarError(inputRut);

    // FORMATO:
    // 12345678-9
    // 12345678-K
    const regexRut =
        /^[0-9]{7,8}-[0-9kK]{1}$/;

    if (!regexRut.test(rut)) {

        mostrarError(
            inputRut,
            "Ingresa un RUT válido"
        );

        return false;

    }

    // LIMPIAR
    let rutLimpio =
        rut.replace("-", "");

    let cuerpo =
        rutLimpio.slice(0, -1);

    let dv =
        rutLimpio
            .slice(-1)
            .toUpperCase();

    let suma = 0;

    let multiplo = 2;

    // CÁLCULO DV
    for (
        let i = cuerpo.length - 1;
        i >= 0;
        i--
    ) {

        suma +=
            cuerpo[i] * multiplo;

        multiplo++;

        if (multiplo > 7) {

            multiplo = 2;

        }

    }

    let dvEsperado =
        11 - (suma % 11);

    if (dvEsperado === 11) {

        dvEsperado = "0";

    }

    else if (dvEsperado === 10) {

        dvEsperado = "K";

    }

    else {

        dvEsperado =
            dvEsperado.toString();

    }

    if (dv !== dvEsperado) {

        mostrarError(
            inputRut,
            "El RUT no es válido"
        );

        return false;

    }

    return true;

}


// ==========================================
// VALIDAR EMAIL
// ==========================================
function validarCorreo() {

    const correo =
        inputCorreo.value.trim();

    eliminarError(inputCorreo);

    const regexCorreo =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexCorreo.test(correo)) {

        mostrarError(
            inputCorreo,
            "Ingresa un correo válido"
        );

        return false;

    }

    return true;

}


// ==========================================
// VALIDAR TELÉFONO
// ==========================================
function validarTelefono() {

    const telefono =
        inputTelefono.value.trim();

    eliminarError(inputTelefono);

    /*
        FORMATOS VÁLIDOS:

        +56912345678
        +56 9 1234 5678
        912345678
    */

    const regexTelefono =
        /^(\+56\s?9\s?[0-9]{4}\s?[0-9]{4}|9[0-9]{8})$/;

    if (telefono === "") {

        mostrarError(
            inputTelefono,
            "Ingresa un número telefónico"
        );

        return false;

    }

    if (!regexTelefono.test(telefono)) {

        mostrarError(
            inputTelefono,
            "Ingresa un teléfono chileno válido"
        );

        return false;

    }

    return true;

}


// ==========================================
// VALIDAR ASUNTO
// ==========================================
function validarAsunto() {

    eliminarError(selectAsunto);

    if (selectAsunto.value === "") {

        mostrarError(
            selectAsunto,
            "Selecciona un tipo de consulta"
        );

        return false;

    }

    return true;

}


// ==========================================
// VALIDAR MENSAJE
// ==========================================
function validarMensaje() {

    const mensaje =
        textareaMensaje.value.trim();

    eliminarError(textareaMensaje);

    if (mensaje.length < 10) {

        mostrarError(
            textareaMensaje,
            "El mensaje debe tener mínimo 10 caracteres"
        );

        return false;

    }

    return true;

}


// ==========================================
// VALIDAR CHECKBOX
// ==========================================
function validarCheckbox() {

    eliminarError(checkboxDatos);

    if (!checkboxDatos.checked) {

        mostrarError(
            checkboxDatos,
            "Debes aceptar el tratamiento de datos"
        );

        return false;

    }

    return true;

}


// ==========================================
// VALIDACIÓN GENERAL
// ==========================================
formulario.addEventListener(
    "submit",
    function(evento) {

        evento.preventDefault();

        const nombreValido =
            validarNombre();

        const rutValido =
            validarRut();

        const correoValido =
            validarCorreo();

        const telefonoValido =
            validarTelefono();

        const asuntoValido =
            validarAsunto();

        const mensajeValido =
            validarMensaje();

        const checkboxValido =
            validarCheckbox();


        // SI TODO ESTÁ CORRECTO
        if (
            nombreValido &&
            rutValido &&
            correoValido &&
            telefonoValido &&
            asuntoValido &&
            mensajeValido &&
            checkboxValido
        ) {

            const nuevoContacto = {

                id:
                    crypto.randomUUID(),

                origen:
                    "Página Contacto",

                nombre:
                    inputNombre.value.trim(),

                rut:
                    inputRut.value.trim(),

                correo:
                    inputCorreo.value.trim().toLowerCase(),

                telefono:
                    inputTelefono.value.trim(),

                asunto:
                    selectAsunto.value,

                mensaje:
                    textareaMensaje.value.trim(),

                fecha:
                    new Date().toLocaleString("es-CL"),

                estado:
                    "pendiente"

            };


            crearContacto(
                nuevoContacto
            );


            alert(
                "Formulario enviado correctamente"
            );

            formulario.reset();

        }

    }
);


// ==========================================
// VALIDACIONES EN TIEMPO REAL
// ==========================================
inputNombre.addEventListener(
    "input",
    validarNombre
);

inputRut.addEventListener(
    "input",
    validarRut
);

inputCorreo.addEventListener(
    "input",
    validarCorreo
);

inputTelefono.addEventListener(
    "input",
    validarTelefono
);

selectAsunto.addEventListener(
    "change",
    validarAsunto
);

textareaMensaje.addEventListener(
    "input",
    validarMensaje
);

checkboxDatos.addEventListener(
    "change",
    validarCheckbox
);