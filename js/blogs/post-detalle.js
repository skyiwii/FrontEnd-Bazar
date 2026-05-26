// ======================================
// OBTENER ID DESDE URL
// ======================================

const paramsPost =
    new URLSearchParams(window.location.search);

const idPost =
    Number(paramsPost.get("id"));


// ======================================
// BUSCAR POST
// ======================================

const post = blogs.find(b => b.id === idPost);


// ======================================
// VALIDACIÓN
// ======================================

if (!post) {

    document.querySelector("main").innerHTML = `
        <div class="text-center py-5 mt-5">
            <h2>Artículo no encontrado</h2>
            <a href="../paginas/blogs.html" class="btn btn-outline-dark mt-3">
                Volver al blog
            </a>
        </div>
    `;

} else {

    renderPost();

}


// ======================================
// RENDER PRINCIPAL
// ======================================

function renderPost() {

    document.title = `Vura - ${post.titulo}`;

    renderHero();
    renderImagen();
    renderContenido();
    renderEstadisticas();
    renderNavegacion();

    // Reacciones y comentarios son manejados por comentarios.js
    // que se inicializa en DOMContentLoaded
}


// ======================================
// HERO
// ======================================

function renderHero() {

    const hero = document.getElementById("post-hero");
    if (!hero) return;

    hero.innerHTML = `
        <div class="container">

            <nav class="breadcrumb-custom">
                <a href="../index.html">Inicio</a>
                <span>/</span>
                <a href="../paginas/blogs.html">Blog</a>
                <span>/</span>
                <span>${post.categoria}</span>
            </nav>

            <div class="post-categoria">
                ${post.categoriaLabel}
            </div>

            <h1>${post.titulo}</h1>

            <p class="post-subtitulo">
                ${post.subtitulo}
            </p>

            <div class="meta-data">
                <span>${post.fecha}</span>
                <span>•</span>
                <span>${post.lectura}</span>
                <span>•</span>
                <span>${post.autor}</span>
            </div>

        </div>
    `;
}


// ======================================
// IMAGEN PRINCIPAL
// ======================================

function renderImagen() {

    const seccion = document.getElementById("post-imagen");
    if (!seccion) return;

    seccion.innerHTML = `
        <img
            src="${post.imagen}"
            class="img-fluid"
            alt="${post.imagenAlt}">
    `;
}


// ======================================
// CONTENIDO
// ======================================

function renderContenido() {

    const seccion = document.getElementById("post-contenido");
    if (!seccion) return;

    let html = `
        <p class="introduccion">
            ${post.contenido.introduccion}
        </p>
    `;

    post.contenido.secciones.forEach((sec) => {

        if (sec.tipo === "h3") {

            html += `<h3>${sec.texto}</h3>`;

        } else if (sec.tipo === "ul") {

            html += `<ul>`;
            sec.items.forEach(item => { html += `<li>${item}</li>`; });
            html += `</ul>`;

        } else if (sec.tipo === "ol") {

            html += `<ol>`;
            sec.items.forEach(item => { html += `<li>${item}</li>`; });
            html += `</ol>`;

        } else if (sec.tipo === "blockquote") {

            html += `<blockquote>${sec.texto}</blockquote>`;

        } else if (sec.tipo === "p") {

            html += `<p>${sec.texto}</p>`;

        }

    });

    seccion.innerHTML = html;
}


// ======================================
// ESTADÍSTICAS
// ======================================

function renderEstadisticas() {

    const seccion = document.getElementById("post-estadisticas");
    if (!seccion) return;

    seccion.innerHTML = `
        <div class="estadistica-item">
            👁️ <span>${post.vistas}</span> lecturas
        </div>
        <div class="estadistica-item">
            💬 <span>${post.comentariosCount}</span> comentarios
        </div>
    `;
}


// ======================================
// NAVEGACIÓN ENTRE POSTS
// ======================================

function renderNavegacion() {

    const nav = document.getElementById("post-navegacion");
    if (!nav) return;

    let anteriorHTML  = `<div class="anterior"></div>`;
    let siguienteHTML = `<div class="siguiente"></div>`;

    if (post.anterior) {
        anteriorHTML = `
            <div class="anterior">
                <span>Artículo anterior</span>
                <p>
                    <a href="post.html?id=${post.anterior.id}">
                        ${post.anterior.titulo}
                    </a>
                </p>
            </div>`;
    }

    if (post.siguiente) {
        siguienteHTML = `
            <div class="siguiente">
                <span>Siguiente artículo</span>
                <p>
                    <a href="post.html?id=${post.siguiente.id}">
                        ${post.siguiente.titulo}
                    </a>
                </p>
            </div>`;
    }

    nav.innerHTML = `<div class="fila">${anteriorHTML}${siguienteHTML}</div>`;
}