// ======================================
// STORAGE
// ======================================

const STORAGE_CATEGORIAS =
    "categorias";



// ======================================
// OBTENER CATEGORÍAS
// ======================================

function obtenerCategorias() {

    return JSON.parse(

        localStorage.getItem(
            STORAGE_CATEGORIAS
        )

    ) || [];

}



// ======================================
// GUARDAR CATEGORÍAS
// ======================================

function guardarCategorias(categorias) {

    localStorage.setItem(

        STORAGE_CATEGORIAS,

        JSON.stringify(categorias)

    );

}



// ======================================
// CREAR CATEGORÍA
// ======================================

function crearCategoria(nuevaCategoria) {

    const categorias =
        obtenerCategorias();


    categorias.push(
        nuevaCategoria
    );


    guardarCategorias(
        categorias
    );

}



// ======================================
// ELIMINAR CATEGORÍA
// ======================================

function eliminarCategoria(idCategoria) {

    const categorias =
        obtenerCategorias();


    const categoriasActualizadas =
        categorias.filter(

            categoria =>

                categoria.id !==
                idCategoria

        );


    guardarCategorias(
        categoriasActualizadas
    );

}



// ======================================
// EDITAR CATEGORÍA
// ======================================

function editarCategoria(
    idCategoria,
    datosActualizados
) {

    const categorias =
        obtenerCategorias();


    const categoriasActualizadas =
        categorias.map(function (
            categoria
        ) {

            if (
                categoria.id ===
                idCategoria
            ) {

                return {

                    ...categoria,

                    ...datosActualizados

                };

            }

            return categoria;

        });


    guardarCategorias(
        categoriasActualizadas
    );

}



// ======================================
// CATEGORÍAS DEMO
// ======================================

function crearCategoriasDemo() {

    const categorias =
        obtenerCategorias();


    if (categorias.length > 0) {

        return;

    }


    const categoriasDemo = [

        {

            id: crypto.randomUUID(),

            nombre:
                "Aromaterapia"

        },

        {

            id: crypto.randomUUID(),

            nombre:
                "Cosmética Natural"

        },

        {

            id: crypto.randomUUID(),

            nombre:
                "Bienestar"

        },

        {

            id: crypto.randomUUID(),

            nombre:
                "Té Natural"

        }

    ];


    guardarCategorias(
        categoriasDemo
    );

}



// ======================================
// INIT
// ======================================

crearCategoriasDemo();