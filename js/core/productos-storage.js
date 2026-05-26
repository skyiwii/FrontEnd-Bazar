// ======================================
// STORAGE
// ======================================

const STORAGE_PRODUCTOS =
    "productos";



// ======================================
// OBTENER PRODUCTOS
// ======================================

function obtenerProductos() {

    return JSON.parse(

        localStorage.getItem(
            STORAGE_PRODUCTOS
        )

    ) || [];

}



// ======================================
// GUARDAR PRODUCTOS
// ======================================

function guardarProductos(productos) {

    localStorage.setItem(

        STORAGE_PRODUCTOS,

        JSON.stringify(productos)

    );

}



// ======================================
// CREAR PRODUCTO
// ======================================

function crearProducto(nuevoProducto) {

    const productos =
        obtenerProductos();

    productos.push(
        nuevoProducto
    );

    guardarProductos(
        productos
    );

}



// ======================================
// ELIMINAR PRODUCTO
// ======================================

function eliminarProducto(idProducto) {

    const productos =
        obtenerProductos();

    const productosActualizados =
        productos.filter(

            producto =>

                String(producto.id) !==
                String(idProducto)

        );

    guardarProductos(
        productosActualizados
    );

}



// ======================================
// OBTENER PRODUCTO POR ID
// ======================================

function obtenerProductoPorId(idProducto) {

    const productos =
        obtenerProductos();

    return productos.find(

        producto =>

            String(producto.id) ===
            String(idProducto)

    );

}



// ======================================
// EDITAR PRODUCTO
// ======================================

function editarProducto(
    idProducto,
    datosActualizados
) {

    const productos =
        obtenerProductos();

    const productosActualizados =
        productos.map(function (producto) {

            if (
                String(producto.id) ===
                String(idProducto)
            ) {

                return {
                    ...producto,
                    ...datosActualizados
                };

            }

            return producto;

        });

    guardarProductos(
        productosActualizados
    );

}