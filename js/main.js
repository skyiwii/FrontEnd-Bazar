// Notificación Contacto

document.addEventListener("DOMContentLoaded", () => {
    const panel = document.getElementById("notificacion-contacto");
    const boton = document.getElementById("btn-contacto");
    const cerrar = document.getElementById("cerrar-contacto");

    if (panel) {

        // Mostrar después de 3 segundos
        setTimeout(() => {
            panel.classList.remove("oculto");
            panel.classList.add("visible");
        }, 3000);

        // Botón abrir/cerrar (solo si existe)
        if (boton) {
            boton.addEventListener("click", () => {
                panel.classList.toggle("visible");
                panel.classList.toggle("oculto");
            });
        }

        // Botón cerrar (solo si existe)
        if (cerrar) {
            cerrar.addEventListener("click", () => {
                panel.classList.remove("visible");
                panel.classList.add("oculto");
            });
        }
    }
});

// Animaciones 

document.addEventListener("DOMContentLoaded", () => {
    const secciones = document.querySelectorAll(".seccion-animada");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.2
    });

    secciones.forEach(seccion => {
        observer.observe(seccion);
    });
});


// Animación por zonas (en pantalla)

document.addEventListener("DOMContentLoaded", () => {

    const zonas = document.querySelectorAll(".zona-full");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.3
    });

    zonas.forEach(zona => observer.observe(zona));

});