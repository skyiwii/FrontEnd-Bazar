// ======================================
// MENÚ HAMBURGUESA
// ======================================

const botonMenu =
    document.getElementById("btn-menu");

const menu =
    document.getElementById("navbarNav");


if (botonMenu && menu) {

    botonMenu.addEventListener("click", () => {

        const abierto =
            menu.classList.toggle("menu-activo");


        botonMenu.setAttribute(
            "aria-expanded",
            abierto
        );

        menu.setAttribute(
            "aria-hidden",
            !abierto
        );

    });

}