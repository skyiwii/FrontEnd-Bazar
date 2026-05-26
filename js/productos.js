const productos = {
    1: {
        nombre: "Aceite Esencial de Eucalipto",
        precio: "$12.990",
        descripcion: "Ideal para despejar vías respiratorias.",
        categoria: "Bienestar",

        imagen: "../media/producto1-vista1.jpg",

        miniaturas: [
            "../media/producto1-vista1.jpg",
            "../media/producto1-vista2.jpg",
            "../media/producto1-vista3.jpg"
        ],

        info: [
            "100% Eucalyptus Globulus",
            "Origen: Los Lagos",
            "Formato: 15ml"
        ],
        uso: "Usar en difusor o masajes."
    },

    2: {
        nombre: "Aceite de Rosa Mosqueta",
        precio: "$18.500",
        descripcion: "Regenerador natural para la piel.",
        categoria: "Bienestar",

        imagen: "../media/producto2-principal.jpg",

        miniaturas: [
            "../media/producto2-principal.jpg",
            "../media/producto2-vista2.jpg",
            "../media/producto2-vista3.jpg"
        ],

        info: [
            "100% Rosa Rubiginosa",
            "Origen: Biobío",
            "Formato: 30ml"
        ],
        uso: "Aplicar en la noche."
    },

    3: {
        nombre: "Miel de Ulmo",
        precio: "$9.500",
        descripcion: "Propiedades antibacterianas únicas.",
        categoria: "Bebidas",

        imagen: "../media/producto3-principal.jpg",

        miniaturas: [
            "../media/producto3-principal.jpg",
            "../media/producto3-vista2.jpg",
            "../media/producto3-vista3.jpg"
        ],

        info: [
            "100% miel cruda",
            "Origen: Los Ríos",
            "Formato: 500g"
        ],
        uso: "Consumir o en infusiones."
    },

    4: {
        nombre: "Jabón de Lavanda",
        precio: "$4.500",
        descripcion: "Jabón artesanal de lavanda para limpieza suave y aroma natural.",
        categoria: "Cuidado",

        imagen: "../media/jabon-lavanda.png",

        miniaturas: [
            "../media/jabon-lavanda.png",
            "../media/jabon-lavanda.png",
            "../media/jabon-lavanda.png"
        ],

        info: [
            "Lavanda orgánica",
            "Libre de parabenos",
            "Peso: 120g"
        ],
        uso: "Usar en la ducha diaria para una piel suave y perfumada."
    },

    5: {
        nombre: "Miel de Quillay",
        precio: "$11.500",
        descripcion: "Miel monofloral de quillay, ideal para endulzar y cuidar.",
        categoria: "Bebidas",

        imagen: "../media/miel-de-quillay.png",

        miniaturas: [
            "../media/miel-de-quillay.png",
            "../media/miel-de-quillay.png",
            "../media/miel-de-quillay.png"
        ],

        info: [
            "100% miel de quillay",
            "Origen: Chile",
            "Formato: 500g"
        ],
        uso: "Consumir directamente o añadir a té y postres."
    },

    6: {
        nombre: "Mermelada de Damasco",
        precio: "$6.200",
        descripcion: "Mermelada artesanal de damasco, dulce y natural.",
        categoria: "Alimentos",

        imagen: "../media/mermelada-damasco_nuevo.png",

        miniaturas: [
            "../media/mermelada-damasco_nuevo.png",
            "../media/damasco_1.png",
            "../media/damasco_2.png",
            "../media/damasco_3.png"
        ],

        info: [
            "Fruta natural",
            "Sin colorantes artificiales",
            "Contenido: 300g"
        ],
        uso: "Ideal para untar en panes y repostería."
    }
};


// ===============================
// OBTENER ID
// ===============================
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const producto = productos[id];


// ===============================
// VALIDACIÓN
// ===============================
if (!producto) {
    document.querySelector("main").innerHTML = `
        <div class="text-center mt-5">
            <h2>Producto no encontrado</h2>
            <a href="productos.html" class="btn btn-primary mt-3">Volver a productos</a>
        </div>
    `;
} else {

    // ===============================
    // DATOS BÁSICOS
    // ===============================
    document.title = "Vura - " + producto.nombre;

    document.getElementById("nombre").textContent = producto.nombre;
    document.getElementById("precio").textContent = producto.precio;
    document.getElementById("descripcion").textContent = producto.descripcion;
    document.getElementById("breadcrumb-nombre").textContent = producto.nombre;

    const imgPrincipal = document.getElementById("img-principal");
    imgPrincipal.src = producto.imagen;


    // ===============================
    // MINIATURAS
    // ===============================
    const contenedorMini = document.getElementById("miniaturas");
    contenedorMini.innerHTML = "";

    producto.miniaturas.forEach((imgSrc) => {

    const imagen = document.createElement("img");
    imagen.src = imgSrc;
    imagen.classList.add("miniatura-item");

    // marcar activa si coincide con principal
    if (imgSrc === producto.imagen) {
        imagen.classList.add("activa");
        }

        imagen.addEventListener("click", () => {
            imgPrincipal.src = imgSrc;

            document.querySelectorAll(".miniatura-item").forEach(el =>
                el.classList.remove("activa")
            );

            imagen.classList.add("activa");
        });

        contenedorMini.appendChild(imagen);
    });


    // ===============================
    // INFO TÉCNICA
    // ===============================
    const ul = document.getElementById("info-tecnica");
    ul.innerHTML = "";

    producto.info.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
    });


    // ===============================
    // USO
    // ===============================
    document.getElementById("uso").textContent = producto.uso;
}



// ===============================
// RELACIONADOS
// ===============================
const contenedorRelacionados = document.getElementById("relacionados");
contenedorRelacionados.innerHTML = "";

Object.entries(productos).forEach(([key, p]) => {

    if (key != id) {

        const card = document.createElement("article");
        card.classList.add("card-mini");

        card.innerHTML = `
            <div class="card-img">
                <img src="${p.imagen}" alt="${p.nombre}">
            </div>

            <div class="card-body">
                <h4>${p.nombre}</h4>
                <p>${p.precio}</p>
                <a href="producto.html?id=${key}" class="btn btn-sm">Ver producto</a>
            </div>
        `;

        contenedorRelacionados.appendChild(card);
    }
});


