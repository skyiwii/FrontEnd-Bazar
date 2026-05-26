// ==========================================
// MODO OSCURO
// ==========================================

const botonDarkMode =
    document.getElementById(
        "btn-darkmode"
    );



// ==========================================
// CARGAR TEMA GUARDADO
// ==========================================

const temaGuardado =
    localStorage.getItem(
        "tema"
    );



if (temaGuardado === "oscuro") {

    document.body.classList.add(
        "dark-mode"
    );


    // ==========================
    // VERIFICAR BOTÓN
    // ==========================

    if (botonDarkMode) {

        botonDarkMode.textContent =
            "☀️";

    }

}



// ==========================================
// TOGGLE DARK MODE
// ==========================================

if (botonDarkMode) {

    botonDarkMode.addEventListener(

        "click",

        () => {

            document.body.classList.toggle(
                "dark-mode"
            );


            const modoOscuroActivo =

                document.body.classList.contains(
                    "dark-mode"
                );


            // ==========================
            // GUARDAR
            // ==========================

            localStorage.setItem(

                "tema",

                modoOscuroActivo
                    ? "oscuro"
                    : "claro"

            );


            // ==========================
            // ICONO
            // ==========================

            botonDarkMode.textContent =

                modoOscuroActivo
                    ? "☀️"
                    : "🌙";

        }

    );

}