// =====================================================
// COMENTARIOS VURA — Sistema completo
// Sin OTP — validación de formulario + localStorage
// =====================================================


// =====================================================
// ESTADO GLOBAL
// =====================================================

const STORAGE_KEY_COMENTARIOS = `vura_comentarios_post_${idPost}`;
const STORAGE_KEY_REACCIONES  = `vura_reacciones_post_${idPost}`;

let ordenActual = "recientes";


// =====================================================
// COMENTARIOS — localStorage
// =====================================================

function getComentarios() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY_COMENTARIOS)) || [];
    } catch { return []; }
}

function guardarComentarios(lista) {
    localStorage.setItem(STORAGE_KEY_COMENTARIOS, JSON.stringify(lista));
}

function obtenerTodosLosComentarios() {
    const guardados = getComentarios();
    if (guardados.length === 0 && post.comentarios?.length > 0) {
        guardarComentarios(post.comentarios);
        return post.comentarios;
    }
    return guardados;
}


// =====================================================
// REACCIONES — localStorage
// =====================================================

function getReacciones() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY_REACCIONES)) || { ...post.reacciones };
    } catch {
        return { ...post.reacciones };
    }
}

function guardarReacciones(obj) {
    localStorage.setItem(STORAGE_KEY_REACCIONES, JSON.stringify(obj));
}

let miReaccion = sessionStorage.getItem(`vura_mi_reaccion_${idPost}`) || null;


// =====================================================
// RENDER REACCIONES
// =====================================================

function renderReacciones() {
    const seccion = document.getElementById("post-reacciones");
    if (!seccion) return;

    const reacciones = getReacciones();
    const emojis = { love: "❤️", like: "👍", neutral: "😐", dislike: "👎" };

    let html = `<h3>¿Qué te pareció este artículo?</h3><div class="reacciones-grid">`;

    Object.entries(reacciones).forEach(([tipo, count]) => {
        const activo = miReaccion === tipo ? "reaccionado" : "";
        html += `
            <button type="button" class="reaccion-btn ${activo}" data-reaction="${tipo}">
                ${emojis[tipo]}
                <span>${count}</span>
            </button>`;
    });

    html += `</div>`;
    seccion.innerHTML = html;

    seccion.querySelectorAll(".reaccion-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const tipo = btn.dataset.reaction;
            const reacs = getReacciones();

            if (miReaccion === tipo) {
                reacs[tipo] = Math.max(0, reacs[tipo] - 1);
                miReaccion = null;
                sessionStorage.removeItem(`vura_mi_reaccion_${idPost}`);
            } else {
                if (miReaccion) {
                    reacs[miReaccion] = Math.max(0, reacs[miReaccion] - 1);
                }
                reacs[tipo]++;
                miReaccion = tipo;
                sessionStorage.setItem(`vura_mi_reaccion_${idPost}`, tipo);
            }

            guardarReacciones(reacs);
            renderReacciones();
        });
    });
}


// =====================================================
// VALIDACIONES
// =====================================================

function esEmailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function esNombreValido(nombre) {
    return nombre.trim().length >= 2 && nombre.trim().length <= 60;
}

function esTextoValido(texto) {
    return texto.trim().length >= 10 && texto.trim().length <= 500;
}

function mostrarError(campo, mensaje) {
    campo.classList.add("campo-error");
    let err = campo.parentElement.querySelector(".error-msg");
    if (!err) {
        err = document.createElement("span");
        err.classList.add("error-msg");
        campo.parentElement.appendChild(err);
    }
    err.textContent = mensaje;
}

function limpiarError(campo) {
    campo.classList.remove("campo-error");
    const err = campo.parentElement.querySelector(".error-msg");
    if (err) err.remove();
}

function mostrarMensaje(contenedor, tipo, texto) {
    const div = document.createElement("div");
    div.classList.add("mensaje-sistema", `mensaje-${tipo}`);
    div.textContent = texto;
    contenedor.prepend(div);
    setTimeout(() => div.remove(), 4000);
}


// =====================================================
// FORMULARIO PRINCIPAL
// =====================================================

function iniciarFormComentario() {
    const form = document.getElementById("form-comentario");
    if (!form) return;

    const inputNombre = form.querySelector("input[type='text']");
    const inputEmail  = form.querySelector("input[type='email']");
    const textarea    = form.querySelector("textarea");

    // Validación en tiempo real
    inputNombre.addEventListener("blur", () => {
        if (!esNombreValido(inputNombre.value)) {
            mostrarError(inputNombre, "Mínimo 2 caracteres.");
        } else {
            limpiarError(inputNombre);
        }
    });

    inputEmail.addEventListener("blur", () => {
        if (!esEmailValido(inputEmail.value)) {
            mostrarError(inputEmail, "Correo electrónico inválido.");
        } else {
            limpiarError(inputEmail);
        }
    });

    textarea.addEventListener("input", () => {
        const restante = 500 - textarea.value.length;
        let contador = form.querySelector(".contador-chars");
        if (!contador) {
            contador = document.createElement("span");
            contador.classList.add("contador-chars");
            textarea.parentElement.appendChild(contador);
        }
        contador.textContent = `${restante} caracteres restantes`;
        contador.classList.toggle("contador-limite", restante < 50);

        if (!esTextoValido(textarea.value)) {
            mostrarError(textarea, "Entre 10 y 500 caracteres.");
        } else {
            limpiarError(textarea);
        }
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = inputNombre.value.trim();
        const email  = inputEmail.value.trim().toLowerCase();
        const texto  = textarea.value.trim();

        let valido = true;

        if (!esNombreValido(nombre)) {
            mostrarError(inputNombre, "Mínimo 2 caracteres.");
            valido = false;
        } else { limpiarError(inputNombre); }

        if (!esEmailValido(email)) {
            mostrarError(inputEmail, "Correo electrónico inválido.");
            valido = false;
        } else { limpiarError(inputEmail); }

        if (!esTextoValido(texto)) {
            mostrarError(textarea, "Entre 10 y 500 caracteres.");
            valido = false;
        } else { limpiarError(textarea); }

        if (!valido) return;

        const nuevo = {
            id: Date.now(),
            avatar: nombre[0].toUpperCase(),
            nombre,
            tiempo: "Ahora mismo",
            timestamp: Date.now(),
            texto,
            likes: 0,
            dislikes: 0,
            respuestas: [],
            esNuevo: true
        };

        const lista = obtenerTodosLosComentarios();
        lista.unshift(nuevo);
        guardarComentarios(lista);

        form.reset();
        form.querySelector(".contador-chars")?.remove();

        renderListaComentarios();

        mostrarMensaje(
            document.querySelector(".comentarios-seccion"),
            "exito",
            "✅ Comentario publicado."
        );
    });
}


// =====================================================
// FORMULARIO RESPUESTA
// =====================================================

function crearFormRespuesta(comentarioId) {
    document.querySelectorAll(".form-respuesta").forEach(f => f.remove());

    const formResp = document.createElement("form");
    formResp.classList.add("form-respuesta");
    formResp.dataset.padreId = comentarioId;
    formResp.noValidate = true;

    formResp.innerHTML = `
        <input
            type="text"
            class="form-control mb-2 campo-respuesta-nombre"
            placeholder="Tu nombre"
            maxlength="60">

        <input
            type="email"
            class="form-control mb-2 campo-respuesta-email"
            placeholder="Correo electrónico">

        <textarea
            class="form-control mb-2"
            rows="3"
            placeholder="Tu respuesta... (mínimo 10 caracteres)"
            maxlength="500"></textarea>

        <div class="form-respuesta-acciones">
            <button type="submit" class="btn btn-outline-dark btn-sm">
                Publicar respuesta
            </button>
            <button type="button" class="btn-cancelar-respuesta btn btn-sm">
                Cancelar
            </button>
        </div>
    `;

    const txtResp = formResp.querySelector("textarea");
    txtResp.addEventListener("input", () => {
        if (!esTextoValido(txtResp.value)) {
            mostrarError(txtResp, "Mínimo 10 caracteres.");
        } else {
            limpiarError(txtResp);
        }
    });

    formResp.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = formResp.querySelector(".campo-respuesta-nombre").value.trim();
        const email  = formResp.querySelector(".campo-respuesta-email").value.trim();
        const texto  = formResp.querySelector("textarea").value.trim();

        let valido = true;

        if (!esNombreValido(nombre)) {
            mostrarError(formResp.querySelector(".campo-respuesta-nombre"), "Mínimo 2 caracteres.");
            valido = false;
        } else { limpiarError(formResp.querySelector(".campo-respuesta-nombre")); }

        if (!esEmailValido(email)) {
            mostrarError(formResp.querySelector(".campo-respuesta-email"), "Correo inválido.");
            valido = false;
        } else { limpiarError(formResp.querySelector(".campo-respuesta-email")); }

        if (!esTextoValido(texto)) {
            mostrarError(formResp.querySelector("textarea"), "Mínimo 10 caracteres.");
            valido = false;
        } else { limpiarError(formResp.querySelector("textarea")); }

        if (!valido) return;

        const nuevaResp = {
            id: Date.now(),
            avatar: nombre[0].toUpperCase(),
            nombre,
            tiempo: "Ahora mismo",
            timestamp: Date.now(),
            texto,
            likes: 0,
            dislikes: 0
        };

        const lista = obtenerTodosLosComentarios();
        const comentario = buscarComentarioPorId(lista, comentarioId);

        if (comentario) {
            if (!comentario.respuestas) comentario.respuestas = [];
            comentario.respuestas.push(nuevaResp);
            guardarComentarios(lista);
        }

        formResp.remove();
        renderListaComentarios();

        mostrarMensaje(
            document.querySelector(".comentarios-seccion"),
            "exito",
            "✅ Respuesta publicada."
        );
    });

    formResp.querySelector(".btn-cancelar-respuesta").addEventListener("click", () => {
        formResp.remove();
    });

    return formResp;
}

function buscarComentarioPorId(lista, id) {
    for (const c of lista) {
        if (c.id === id) return c;
        if (c.respuestas) {
            const found = buscarComentarioPorId(c.respuestas, id);
            if (found) return found;
        }
    }
    return null;
}


// =====================================================
// RENDER LISTA COMENTARIOS
// =====================================================

function renderListaComentarios() {
    const lista = document.getElementById("lista-comentarios");
    if (!lista) return;

    let comentarios = obtenerTodosLosComentarios();

    if (ordenActual === "recientes") {
        comentarios = [...comentarios].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    } else {
        comentarios = [...comentarios].sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }

    lista.innerHTML = "";

    if (comentarios.length === 0) {
        lista.innerHTML = `<p class="sin-comentarios">Sé el primero en comentar este artículo.</p>`;
        return;
    }

    comentarios.forEach((c) => {
        lista.appendChild(crearElementoComentario(c, false));
    });
}

function crearElementoComentario(comentario, esRespuesta) {
    const article = document.createElement("article");
    article.classList.add("comentario-item");
    if (esRespuesta)        article.classList.add("respuesta");
    if (comentario.esNuevo) article.classList.add("comentario-nuevo");
    article.dataset.id = comentario.id;

    article.innerHTML = `
        <div class="comentario-header">
            <div class="comentario-user">
                <div class="avatar">${comentario.avatar}</div>
                <div>
                    <strong>${comentario.nombre}</strong>
                    <span>${formatearTiempo(comentario.timestamp)}</span>
                </div>
            </div>
        </div>

        <div class="comentario-body">
            <p>${comentario.texto}</p>
        </div>

        <div class="comentario-acciones">
            <button type="button" class="btn-like-comentario" data-id="${comentario.id}">
                👍 <span>${comentario.likes || 0}</span>
            </button>
            <button type="button" class="btn-dislike-comentario" data-id="${comentario.id}">
                👎 <span>${comentario.dislikes || 0}</span>
            </button>
            ${!esRespuesta
                ? `<button type="button" class="btn-responder-comentario" data-id="${comentario.id}">
                       Responder
                   </button>`
                : ""}
        </div>

        ${!esRespuesta ? `<div class="comentario-respuestas"></div>` : ""}
    `;

    // Respuestas anidadas
    const contenedorResp = article.querySelector(".comentario-respuestas");
    if (contenedorResp && comentario.respuestas?.length) {
        comentario.respuestas.forEach(r => {
            contenedorResp.appendChild(crearElementoComentario(r, true));
        });
    }

    // Like
    article.querySelector(".btn-like-comentario")?.addEventListener("click", (e) => {
        const id = Number(e.currentTarget.dataset.id);
        const lista = obtenerTodosLosComentarios();
        const target = buscarComentarioPorId(lista, id);
        if (target) { target.likes = (target.likes || 0) + 1; guardarComentarios(lista); renderListaComentarios(); }
    });

    // Dislike
    article.querySelector(".btn-dislike-comentario")?.addEventListener("click", (e) => {
        const id = Number(e.currentTarget.dataset.id);
        const lista = obtenerTodosLosComentarios();
        const target = buscarComentarioPorId(lista, id);
        if (target) { target.dislikes = (target.dislikes || 0) + 1; guardarComentarios(lista); renderListaComentarios(); }
    });

    // Responder
    article.querySelector(".btn-responder-comentario")?.addEventListener("click", (e) => {
        const id = Number(e.currentTarget.dataset.id);
        const existente = article.querySelector(".form-respuesta");
        if (existente) { existente.remove(); return; }
        const form = crearFormRespuesta(id);
        article.appendChild(form);
        form.querySelector("input")?.focus();
    });

    return article;
}


// =====================================================
// TIEMPO RELATIVO
// =====================================================

function formatearTiempo(timestamp) {
    if (!timestamp) return "Hace un momento";
    const diff = Date.now() - timestamp;
    const min  = Math.floor(diff / 60000);
    const hrs  = Math.floor(diff / 3600000);
    const dias = Math.floor(diff / 86400000);
    if (min < 1)    return "Ahora mismo";
    if (min < 60)   return `Hace ${min} min`;
    if (hrs < 24)   return `Hace ${hrs} h`;
    if (dias === 1) return "Ayer";
    return `Hace ${dias} días`;
}


// =====================================================
// FILTRO ORDEN
// =====================================================

function iniciarFiltroOrden() {
    const select = document.querySelector(".orden-comentarios");
    if (!select) return;

    select.addEventListener("change", (e) => {
        ordenActual = e.target.value;
        renderListaComentarios();
    });
}


// =====================================================
// COMENTARIOS EN VIVO SIMULADOS
// =====================================================

const comentariosSimulados = [
    { avatar: "S", nombre: "Sofía M.",    texto: "Excelente artículo, lo comparto con mis amigas." },
    { avatar: "R", nombre: "Rodrigo V.",  texto: "Llevo tiempo buscando información así de clara. ¡Gracias!" },
    { avatar: "P", nombre: "Paula C.",    texto: "Lo probé la semana pasada y los resultados son increíbles." },
    { avatar: "T", nombre: "Tomás N.",    texto: "Muy útil para empezar con productos naturales." },
    { avatar: "V", nombre: "Valentina R.", texto: "¿Alguien sabe dónde conseguir los ingredientes en Santiago?" }
];

let indiceSimulado = 0;

function iniciarComentariosEnVivo() {
    setTimeout(() => {
        agregarComentarioEnVivo();
        setInterval(agregarComentarioEnVivo, 45000);
    }, 25000);
}

function agregarComentarioEnVivo() {
    if (indiceSimulado >= comentariosSimulados.length) return;

    const base   = comentariosSimulados[indiceSimulado % comentariosSimulados.length];
    indiceSimulado++;

    const nuevo = {
        ...base,
        id: Date.now() + Math.random(),
        timestamp: Date.now(),
        likes: 0,
        dislikes: 0,
        respuestas: [],
        esNuevo: true
    };

    const lista = obtenerTodosLosComentarios();
    lista.unshift(nuevo);
    guardarComentarios(lista);
    renderListaComentarios();
    mostrarToast(`💬 ${nuevo.nombre} acaba de comentar`);

    setTimeout(() => {
        const el = document.querySelector(`.comentario-item[data-id="${nuevo.id}"]`);
        if (el) el.classList.remove("comentario-nuevo");
    }, 3000);
}

function mostrarToast(texto) {
    const toast = document.createElement("div");
    toast.classList.add("toast-nuevo-comentario");
    toast.textContent = texto;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("toast-visible"), 50);
    setTimeout(() => {
        toast.classList.remove("toast-visible");
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}


// =====================================================
// INICIALIZAR
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
    if (typeof post !== "undefined" && post) {
        renderReacciones();
        renderListaComentarios();
        iniciarFormComentario();
        iniciarFiltroOrden();
        iniciarComentariosEnVivo();
    }
});