// ======================================
// CONTENEDORES
// ======================================

const contenedorBlogs =
    document.getElementById("grilla-blogs");

const inputBusquedaBlog =
    document.getElementById("input-busqueda-blog");

const listaTags =
    document.querySelectorAll(".blog-tags a");


// ======================================
// ESTADO
// ======================================

let categoriaActivaBlog = "Todos";

let textoBusquedaBlog = "";


// ======================================
// RENDER GRILLA
// ======================================

function renderGrilla() {

    contenedorBlogs.innerHTML = "";


    // ======================================
    // FILTRAR
    // ======================================

    const filtrados = blogs.filter((post) => {

        const coincideCategoria =
            categoriaActivaBlog === "Todos" ||
            post.categoria === categoriaActivaBlog;

        const coincideBusqueda =
            post.titulo
                .toLowerCase()
                .includes(textoBusquedaBlog.toLowerCase()) ||
            post.resumen
                .toLowerCase()
                .includes(textoBusquedaBlog.toLowerCase());

        return coincideCategoria && coincideBusqueda;

    });


    // ======================================
    // SIN RESULTADOS
    // ======================================

    if (filtrados.length === 0) {

        contenedorBlogs.innerHTML = `
            <div class="sin-resultados text-center py-5">
                <h3>No se encontraron artículos</h3>
                <p>Intenta con otra categoría o búsqueda.</p>
            </div>
        `;

        return;
    }


    // ======================================
    // CREAR CARDS
    // ======================================

    filtrados.forEach((post) => {

        const article = document.createElement("article");

        article.classList.add("post-card", "seccion-animada");

        article.innerHTML = `
            <img
                src="${post.imagen}"
                alt="${post.imagenAlt}">

            <div class="contenido-post">

                <span class="etiqueta">
                    ${post.categoria}
                </span>

                <h3>${post.titulo}</h3>

                <p>${post.resumen}</p>

                <a
                    href="../blogs/post.html?id=${post.id}"
                    class="btn btn-outline-dark">

                    Leer artículo

                </a>

            </div>
        `;

        contenedorBlogs.appendChild(article);

    });

}


// ======================================
// BUSCADOR
// ======================================

if (inputBusquedaBlog) {

    inputBusquedaBlog.addEventListener("input", (e) => {

        textoBusquedaBlog = e.target.value.trim();

        renderGrilla();

    });

}


// ======================================
// TAGS — FILTRO POR CATEGORÍA
// ======================================

listaTags.forEach((tag) => {

    tag.addEventListener("click", (e) => {

        e.preventDefault();

        // Quitar activo anterior
        listaTags.forEach(t =>
            t.classList.remove("tag-activo")
        );

        tag.classList.add("tag-activo");

        const cat = tag.dataset.categoria;

        categoriaActivaBlog = cat || "Todos";

        renderGrilla();

    });

});


// ======================================
// INICIALIZAR
// ======================================

renderGrilla();