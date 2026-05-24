/**
 * Gestiona el cambio entre modo claro y oscuro
 * Persiste la preferencia del usuario con localStorage
 */
function initTheme() {
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Cargar preferencia guardada
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark');
        toggleButton.textContent = '☀️';
    }

    // Evento de clic
    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark');
        
        if (body.classList.contains('dark')) {
            localStorage.setItem('darkMode', 'enabled');
            toggleButton.textContent = '☀️';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            toggleButton.textContent = '🌙';
        }
    });
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initTheme);
