const productos = {
    1: {
        nombre: "Aceite Esencial de Eucalipto",
        precio: "$12.990",
        descripcion: "Ideal para despejar vías respiratorias.",
        imagen: "img/producto1-principal.jpg",
        miniaturas: [
            "img/producto1-vista2.jpg",
            "img/producto1-vista3.jpg"
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
        imagen: "img/producto2-principal.jpg",
        miniaturas: [
            "img/producto2-vista2.jpg",
            "img/producto2-vista3.jpg"
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
        imagen: "img/producto3-principal.jpg",
        miniaturas: [
            "img/producto3-textura.jpg",
            "img/producto3-paisaje.jpg"
        ],
        info: [
            "100% miel cruda",
            "Origen: Los Ríos",
            "Formato: 500g"
        ],
        uso: "Consumir o en infusiones."
    }
};




const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const producto = productos[id];

if (producto) {


    document.title = "Vura - " + producto.nombre;

    document.getElementById("nombre").textContent = producto.nombre;
    document.getElementById("precio").textContent = producto.precio;
    document.getElementById("descripcion").textContent = producto.descripcion;
    document.getElementById("breadcrumb-nombre").textContent = producto.nombre;

    document.getElementById("img-principal").src = producto.imagen;

    // miniaturas
    const contenedorMini = document.getElementById("miniaturas");

    producto.miniaturas.forEach(img => {
        const imagen = document.createElement("img");
        imagen.src = img;

        imagen.addEventListener("click", () => {
            document.getElementById("img-principal").src = img;
        });

        contenedorMini.appendChild(imagen);
    });

    // info técnica
    const ul = document.getElementById("info-tecnica");

    producto.info.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
    });

    // uso
    document.getElementById("uso").textContent = producto.uso;
}


