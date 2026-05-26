/**
 * Menú Hamburguesa Dinámico + Accesibilidad
 */

export function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) return;

    function toggleMenu() {
        const isOpen = hamburger.getAttribute('aria-expanded') === 'true';

        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        hamburger.setAttribute('aria-expanded', String(!isOpen));
        navMenu.setAttribute('aria-hidden', String(isOpen));
    }

    hamburger.addEventListener('click', toggleMenu);

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        }
    });
}
