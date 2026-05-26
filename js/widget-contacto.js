// ==========================================
// WIDGET CONTACTO
// ==========================================

const widget =
    document.getElementById(
        "notificacion-contacto"
    );

const botonCerrar =
    document.getElementById(
        "btn-cerrar-widget"
    );



// ==========================================
// MOSTRAR WIDGET
// ==========================================

if (widget) {

    window.addEventListener("load", () => {

        setTimeout(() => {

            widget.classList.add(
                "visible"
            );

            widget.classList.remove(
                "oculto"
            );

            widget.setAttribute(
                "aria-hidden",
                "false"
            );

        }, 1800);

    });

}



// ==========================================
// CERRAR WIDGET
// ==========================================

if (botonCerrar && widget) {

    botonCerrar.addEventListener("click", () => {

        widget.classList.remove(
            "visible"
        );

        widget.classList.add(
            "oculto"
        );

        widget.setAttribute(
            "aria-hidden",
            "true"
        );

    });

}



// ==========================================
// CERRAR CON ESC
// ==========================================

document.addEventListener("keydown", (evento) => {

    if (
        evento.key === "Escape" &&
        widget
    ) {

        widget.classList.remove(
            "visible"
        );

        widget.classList.add(
            "oculto"
        );

        widget.setAttribute(
            "aria-hidden",
            "true"
        );

    }

});