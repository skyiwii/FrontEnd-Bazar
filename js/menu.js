function initHamburgerMenu() {
    const togglers = document.querySelectorAll('.navbar-toggler');

    togglers.forEach((button) => {
        const targetId = button.getAttribute('data-bs-target')?.replace('#', '');
        const target = targetId ? document.getElementById(targetId) : null;

        if (!target) {
            return;
        }

        button.setAttribute('aria-controls', targetId);
        button.setAttribute('aria-expanded', target.classList.contains('show') ? 'true' : 'false');
        button.setAttribute('aria-label', 'Abrir menú de navegación');

        button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', String(!isExpanded));

            setTimeout(() => {
                button.setAttribute('aria-expanded', String(target.classList.contains('show')));
            }, 150);
        });
    });
}

document.addEventListener('DOMContentLoaded', initHamburgerMenu);

export { initHamburgerMenu };