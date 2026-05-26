// ======================================
// CONTENEDORES
// ======================================

const nombre =
    document.getElementById("nombre");

const precio =
    document.getElementById("precio");

const descripcion =
    document.getElementById("descripcion");

const categoria =
    document.getElementById("categoria");

const breadcrumbNombre =
    document.getElementById("breadcrumb-nombre");

const imgPrincipal =
    document.getElementById("img-principal");

const miniaturas =
    document.getElementById("miniaturas");

const infoTecnica =
    document.getElementById("info-tecnica");

const uso =
    document.getElementById("uso");

const relacionados =
    document.getElementById("relacionados");



// ======================================
// FORMATEAR PRECIO
// ======================================

function formatearPrecio(precio) {

    return `$${Number(precio).toLocaleString("es-CL")}`;

}



// ======================================
// RESOLVER IMAGEN
// ======================================

function resolverImagen(ruta) {

    if (!ruta) {

        return "../media/logo.png";

    }


    // URLs externas
    if (
        ruta.startsWith("http") ||
        ruta.startsWith("data:")
    ) {

        return ruta;

    }


    // Obtener nombre archivo
    const nombreArchivo =
        ruta.split("/").pop();


    // Ruta correcta desde /productos/
    return `../media/${nombreArchivo}`;

}



// ======================================
// OBTENER ID DESDE URL
// ======================================

const params =
    new URLSearchParams(window.location.search);

const id =
    params.get("id");



// ======================================
// BUSCAR PRODUCTO
// ======================================

const productos =
    obtenerProductos();

const producto =
    productos.find(
        p => String(p.id) === String(id)
    );



// ======================================
// VALIDACIÓN
// ======================================

if (!producto) {

    document.querySelector("main").innerHTML = `

        <div class="text-center mt-5">

            <h2>

                Producto no encontrado

            </h2>

            <a
                href="productos.html"
                class="btn btn-dark mt-3">

                Volver a productos

            </a>

        </div>

    `;

}

else {

    renderProducto();

    renderMiniaturas();

    renderInfoTecnica();

    renderRelacionados();

}



// ======================================
// RENDER PRODUCTO
// ======================================

function renderProducto() {

    // TÍTULO
    document.title =
        `Vura - ${producto.nombre}`;


    // DATOS
    nombre.textContent =
        producto.nombre;

    precio.textContent =
        formatearPrecio(producto.precio);

    descripcion.textContent =
        producto.descripcion;

    categoria.textContent =
        producto.categoria;

    breadcrumbNombre.textContent =
        producto.nombre;

    uso.textContent =
        producto.uso ||
        "Producto agregado desde administración.";


    // IMAGEN PRINCIPAL
    imgPrincipal.src =
        resolverImagen(producto.imagen);

}



// ======================================
// MINIATURAS
// ======================================

function renderMiniaturas() {

    miniaturas.innerHTML = "";


    const miniaturasProducto =
        producto.miniaturas ||
        [producto.imagen];


    miniaturasProducto.forEach((imagenSrc) => {

        const imagen =
            document.createElement("img");


        imagen.src =
            resolverImagen(imagenSrc);

        imagen.classList.add(
            "miniatura-item"
        );


        // ACTIVA
        if (
            imagenSrc === producto.imagen
        ) {

            imagen.classList.add(
                "activa"
            );

        }


        // CAMBIAR IMAGEN
        imagen.addEventListener("click", () => {

            imgPrincipal.src =
                resolverImagen(imagenSrc);


            document
                .querySelectorAll(".miniatura-item")
                .forEach((img) => {

                    img.classList.remove(
                        "activa"
                    );

                });


            imagen.classList.add(
                "activa"
            );

        });


        miniaturas.appendChild(
            imagen
        );

    });

}



// ======================================
// INFO TÉCNICA
// ======================================

function renderInfoTecnica() {

    infoTecnica.innerHTML = "";


    const infoProducto =
        producto.info ||
        ["Producto agregado desde administración"];


    infoProducto.forEach((item) => {

        const li =
            document.createElement("li");

        li.textContent =
            item;

        infoTecnica.appendChild(li);

    });

}



// ======================================
// RELACIONADOS
// ======================================

function renderRelacionados() {

    relacionados.innerHTML = "";


    productos.forEach((p) => {

        // EVITAR MISMO PRODUCTO
        if (String(p.id) !== String(producto.id)) {

            const card =
                document.createElement("article");

            card.classList.add(
                "card-mini"
            );


            card.innerHTML = `

                <div class="card-img">

                    <img
                        src="${resolverImagen(p.imagen)}"
                        alt="${p.nombre}">

                </div>

                <div class="card-body">

                    <h4>

                        ${p.nombre}

                    </h4>

                    <p>

                        ${formatearPrecio(p.precio)}

                    </p>

                    <a
                        href="producto.html?id=${p.id}"
                        class="btn btn-sm">

                        Ver producto

                    </a>

                </div>

            `;


            relacionados.appendChild(
                card
            );

        }

    });

}