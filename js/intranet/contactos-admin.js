// ======================================
// PROTEGER ADMIN
// ======================================

protegerAdmin();



// ======================================
// LOGOUT
// ======================================

const btnLogout =
    document.getElementById(
        "btn-logout"
    );

btnLogout.addEventListener(
    "click",
    cerrarSesion
);



// ======================================
// ELEMENTOS
// ======================================

const contenedorContactos =
    document.getElementById(
        "contenedor-contactos"
    );

const buscadorContactos =
    document.getElementById(
        "buscador-contactos"
    );

const filtroEstado =
    document.getElementById(
        "filtro-estado"
    );

const contadorContactos =
    document.getElementById(
        "contador-contactos"
    );



// ======================================
// INIT
// ======================================

renderContactos();



// ======================================
// EVENTOS
// ======================================

buscadorContactos.addEventListener(
    "input",
    renderContactos
);


filtroEstado.addEventListener(
    "change",
    renderContactos
);



// ======================================
// RENDER CONTACTOS
// ======================================

function renderContactos() {

    contenedorContactos.innerHTML =
        "";


    const texto =
        buscadorContactos
            .value
            .trim()
            .toLowerCase();


    const estado =
        filtroEstado.value;


    const contactos =
        obtenerContactos();


    const contactosFiltrados =
        contactos.filter(function (contacto) {

            const coincideTexto =

                contacto.nombre
                    .toLowerCase()
                    .includes(texto)

                ||

                contacto.correo
                    .toLowerCase()
                    .includes(texto)

                ||

                contacto.mensaje
                    .toLowerCase()
                    .includes(texto);


            const coincideEstado =

                estado === "todos" ||

                contacto.estado === estado;


            return (
                coincideTexto &&
                coincideEstado
            );

        });


    contadorContactos.textContent =
        `Mensajes encontrados: ${contactosFiltrados.length}`;


    if (contactosFiltrados.length === 0) {

        contenedorContactos.innerHTML =
            `

                <p>

                    No hay mensajes para mostrar.

                </p>

            `;

        return;

    }


    contactosFiltrados.forEach(function (contacto) {

        const article =
            document.createElement("article");

        article.classList.add(
            "contacto-card"
        );


        article.innerHTML = `

            <div class="contacto-header">

                <div>

                    <h3>

                        ${contacto.nombre}

                    </h3>

                    <p class="contacto-correo">

                        ${contacto.correo}

                    </p>

                    <p class="contacto-telefono">

                        ${contacto.telefono || "Sin teléfono"}

                    </p>

                    <p class="contacto-fecha">

                        ${contacto.fecha}

                    </p>

                </div>


                <span class="estado-contacto estado-${contacto.estado}">

                    ${contacto.estado}

                </span>

            </div>


            <div class="contacto-mensaje">

                <p>

                    ${contacto.mensaje}

                </p>

            </div>


            <div class="contacto-actions">

                <button class="btn btn-outline-dark btn-respondido">

                    Respondido

                </button>

                <button class="btn btn-outline-dark btn-archivar">

                    Archivar

                </button>

                <button class="btn btn-dark btn-eliminar">

                    Eliminar

                </button>

            </div>

        `;


        article
            .querySelector(".btn-respondido")
            .addEventListener("click", function () {

                marcarContactoRespondido(
                    contacto.id
                );

                renderContactos();

            });


        article
            .querySelector(".btn-archivar")
            .addEventListener("click", function () {

                archivarContacto(
                    contacto.id
                );

                renderContactos();

            });


        article
            .querySelector(".btn-eliminar")
            .addEventListener("click", function () {

                const confirmar =
                    confirm(
                        `¿Eliminar mensaje de ${contacto.nombre}?`
                    );


                if (!confirmar) {

                    return;

                }


                eliminarContacto(
                    contacto.id
                );

                renderContactos();

            });


        contenedorContactos.appendChild(
            article
        );

    });

}