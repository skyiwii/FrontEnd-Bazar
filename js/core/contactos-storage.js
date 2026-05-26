// ======================================
// STORAGE
// ======================================

const STORAGE_CONTACTOS =
    "contactos";



// ======================================
// OBTENER CONTACTOS
// ======================================

function obtenerContactos() {

    return JSON.parse(

        localStorage.getItem(
            STORAGE_CONTACTOS
        )

    ) || [];

}



// ======================================
// GUARDAR CONTACTOS
// ======================================

function guardarContactos(contactos) {

    localStorage.setItem(

        STORAGE_CONTACTOS,

        JSON.stringify(contactos)

    );

}



// ======================================
// CREAR CONTACTO
// ======================================

function crearContacto(nuevoContacto) {

    const contactos =
        obtenerContactos();


    contactos.push(nuevoContacto);


    guardarContactos(contactos);

}



// ======================================
// EDITAR CONTACTO
// ======================================

function editarContacto(idContacto, datosActualizados) {

    const contactos =
        obtenerContactos();


    const contactosActualizados =
        contactos.map(function (contacto) {

            if (contacto.id === idContacto) {

                return {
                    ...contacto,
                    ...datosActualizados
                };

            }

            return contacto;

        });


    guardarContactos(contactosActualizados);

}



// ======================================
// ELIMINAR CONTACTO
// ======================================

function eliminarContacto(idContacto) {

    const contactos =
        obtenerContactos();


    const contactosActualizados =
        contactos.filter(function (contacto) {

            return contacto.id !== idContacto;

        });


    guardarContactos(contactosActualizados);

}



// ======================================
// MARCAR RESPONDIDO
// ======================================

function marcarContactoRespondido(idContacto) {

    editarContacto(
        idContacto,
        {
            estado: "respondido"
        }
    );

}



// ======================================
// ARCHIVAR CONTACTO
// ======================================

function archivarContacto(idContacto) {

    editarContacto(
        idContacto,
        {
            estado: "archivado"
        }
    );

}