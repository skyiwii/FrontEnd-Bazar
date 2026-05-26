// ======================================
// INICIALIZAR PRODUCTOS
// ======================================

function inicializarProductos() {

    const productosGuardados =
        localStorage.getItem(
            "productos"
        );


    if (productosGuardados) {

        return;

    }


    if (!window.productosBase) {

        console.error(
            "productosBase no existe. Revisa que productos-base.js cargue antes que init-storage.js"
        );

        localStorage.setItem(
            "productos",
            JSON.stringify([])
        );

        return;

    }


    localStorage.setItem(

        "productos",

        JSON.stringify(
            window.productosBase
        )

    );

}



// ======================================
// INIT
// ======================================

inicializarProductos();