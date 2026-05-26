const elementosAnimados = document.querySelectorAll(".seccion-animada");

const mostrarElemento = (entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

        }

    });

};

const observer = new IntersectionObserver(mostrarElemento, {
    threshold: 0.15
});

elementosAnimados.forEach((elemento) => {
    observer.observe(elemento);
});