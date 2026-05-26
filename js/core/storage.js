// ======================================
// PRODUCTOS
// ======================================

function obtenerProductos() {

    return JSON.parse(
        localStorage.getItem("productos")
    ) || [];

}


function guardarProductos(productos) {

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );

}