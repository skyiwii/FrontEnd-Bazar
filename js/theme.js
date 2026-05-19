
document.addEventListener('DOMContentLoaded', () => {

    const btnTema = document.getElementById('btn-tema');
    const body = document.body;

    // Función para cambiar el tema
    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
        
        // Guardar preferencia en localStorage
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('modoOscuro', isDark);
    }

    // Cargar el tema guardado al abrir la página
    function cargarTemaGuardado() {
        const modoGuardado = localStorage.getItem('modoOscuro');
        if (modoGuardado === 'true') {
            body.classList.add('dark-mode');
        }
    }

    // Agregar evento al botón
    if (btnTema) {
        btnTema.addEventListener('click', toggleDarkMode);
    }

    // Cargar tema al iniciar
    cargarTemaGuardado();
});
