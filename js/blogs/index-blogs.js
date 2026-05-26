// ======================================
// BLOG DESTACADOS — index.html
// Muestra los primeros 3 posts de blogs[]
// ======================================

const contenedorDestacados =
    document.getElementById(
        "contenedor-blog-destacados"
    );


// ======================================
// RENDER
// ======================================

function renderBlogsDestacados() {

    if (!contenedorDestacados) return;

    contenedorDestacados.innerHTML = "";


    // Tomar los 3 primeros (o todos si hay menos)
    const destacados = blogs.slice(0, 3);


    destacados.forEach((post) => {

        const article =
            document.createElement("article");

        article.classList.add("blog-card");

        article.innerHTML = `

            <div class="badge-vistas">
                👁️ ${post.vistas}
            </div>

            <div class="blog-img">
                <img
                    src="${post.imagen}"
                    alt="${post.imagenAlt}">
            </div>

            <h3>${post.titulo}</h3>

            <p>${post.resumen}</p>

            <div class="reacciones-preview">
                😍 ${post.reacciones.love} | 🙂 ${post.reacciones.like}
            </div>

            <a
                href="./blogs/post.html?id=${post.id}"
                class="btn btn-outline-dark m-3">

                Leer entrada

            </a>
        `;

        contenedorDestacados.appendChild(article);

    });

}


// ======================================
// INICIALIZAR
// ======================================

renderBlogsDestacados();