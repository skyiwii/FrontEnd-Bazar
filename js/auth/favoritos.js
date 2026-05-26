// ======================================
// FAVORITOS
// ======================================



// ======================================
// OBTENER FAVORITOS USUARIO
// ======================================

function obtenerFavoritosUsuario() {

    const usuario =
        obtenerUsuarioActual();

    if (!usuario) {

        return [];

    }

    return usuario.favoritos || [];

}



// ======================================
// PRODUCTO ES FAVORITO
// ======================================

function productoEsFavorito(idProducto) {

    const favoritos =
        obtenerFavoritosUsuario();

    return favoritos.some(function (id) {

        return String(id) === String(idProducto);

    });

}



// ======================================
// ACTUALIZAR USUARIO EN STORAGE
// ======================================

function actualizarUsuarioFavoritos(usuarioActualizado) {

    const usuarios =
        obtenerUsuarios();

    const usuariosActualizados =
        usuarios.map(function (usuario) {

            if (
                String(usuario.id) ===
                String(usuarioActualizado.id)
            ) {

                return usuarioActualizado;

            }

            return usuario;

        });

    guardarUsuarios(
        usuariosActualizados
    );

    localStorage.setItem(
        "sesionActiva",
        JSON.stringify(usuarioActualizado)
    );

}



// ======================================
// AGREGAR / QUITAR FAVORITO
// ======================================

function toggleFavorito(idProducto) {

    const usuario =
        obtenerUsuarioActual();

    if (!usuario) {

        alert(
            "Debes iniciar sesión para guardar favoritos."
        );

        window.location.href =
            "../paginas/login.html";

        return false;

    }

    const favoritos =
        usuario.favoritos || [];

    const existe =
        favoritos.some(function (id) {

            return String(id) === String(idProducto);

        });

    let favoritosActualizados;

    if (existe) {

        favoritosActualizados =
            favoritos.filter(function (id) {

                return String(id) !== String(idProducto);

            });

    }

    else {

        favoritosActualizados = [
            ...favoritos,
            idProducto
        ];

    }

    const usuarioActualizado = {
        ...usuario,
        favoritos: favoritosActualizados
    };

    actualizarUsuarioFavoritos(
        usuarioActualizado
    );

    return !existe;

}



// ======================================
// PINTAR BOTÓN FAVORITO
// ======================================

function actualizarBotonFavorito(
    boton,
    idProducto
) {

    if (!boton) {

        return;

    }

    const activo =
        productoEsFavorito(idProducto);

    boton.textContent =
        activo ? "♥" : "♡";

    boton.classList.toggle(
        "favorito-activo",
        activo
    );

    boton.setAttribute(
        "aria-label",
        activo
            ? "Quitar de favoritos"
            : "Agregar a favoritos"
    );

}