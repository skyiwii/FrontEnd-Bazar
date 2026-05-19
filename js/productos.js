// Arreglo de productos
const productos = [
    {
        id: 1,
        nombre: "Aceite Esencial de Eucalipto",
        categoria: "aceites",
        precio: 12990,
        descripcion: "Ideal para despejar vías respiratorias.",
        imagen: "../media/producto1-principal.jpg"
    },
    {
        id: 2,
        nombre: "Aceite de Rosa Mosqueta",
        categoria: "aceites",
        precio: 18500,
        descripcion: "Regenerador natural para la piel.",
        imagen: "../media/producto2-principal.jpg"
    },
    {
        id: 3,
        nombre: "Miel de Ulmo",
        categoria: "miel",
        precio: 9500,
        descripcion: "Propiedades antibacterianas únicas.",
        imagen: "../media/producto3-principal.jpg"
    },
    {
        id: 4,
        nombre: "Aceite Esencial de Lavanda",
        categoria: "aceites",
        precio: 13990,
        descripcion: "Ayuda a relajar y mejorar el sueño.",
        imagen: "../media/producto4-principal.jpg"
    }
];

// Función para mostrar los productos
function renderizarProductos(productosAMostrar) {
    const contenedor = document.getElementById('productos-container');
    if (!contenedor) return;

    contenedor.innerHTML = '';

    productosAMostrar.forEach(producto => {
        const cardHTML = `
            <div class="col-md-4 mb-4">
                <article class="producto-card">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcion}</p>
                    <p><strong>$${producto.precio.toLocaleString('es-CL')}</strong></p>
                    <button class="btn btn-dark btn-agregar" data-id="${producto.id}">Agregar al carrito</button>
                </article>
            </div>
        `;
        contenedor.innerHTML += cardHTML;
    });

    contenedor.querySelectorAll('.btn-agregar').forEach(button => {
        button.addEventListener('click', () => {
            const id = Number(button.dataset.ID);
            AgregarAlCarrito(id);
        });
    });
}

// Función de filtro y búsqueda
function filtrarProductos() {
    const texto = document.getElementById('buscador').value.toLowerCase().trim();
    const categoria = document.getElementById('filtro-categoria').value;

    const productosFiltrados = productos.filter(producto => {
        const coincideNombre = producto.nombre.toLowerCase().includes(texto);
        const coincideDescripcion = producto.descripcion.toLowerCase().includes(texto);
        const coincideCategoria = (categoria === 'todos') || (producto.categoria === categoria);

        return (coincideNombre || coincideDescripcion) && coincideCategoria;
    });

    renderizarProductos(productosFiltrados);
}

// Inicializar cuando cargue la página
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos(productos);

    // Eventos del filtro
    const buscador = document.getElementById('buscador');
    const filtroCategoria = document.getElementById('filtro-categoria');

    if (buscador) buscador.addEventListener('input', filtrarProductos);
    if (filtroCategoria) filtroCategoria.addEventListener('change', filtrarProductos);
});

// ==================== CARRITO DE COMPRAS ====================

let carrito = [];

// Agregar producto al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    const existente = carrito.find(item => item.id === id);
    
    if (existente) {
        existente.cantidad = (existente.cantidad || 1) + 1;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    actualizarCarrito();
    alert(`${producto.nombre} se agregó al carrito ✓`);
}

// Actualizar contador y total
function actualizarCarrito() {
    const contador = document.getElementById('contador-carrito');
    if (contador) {
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        contador.textContent = totalItems;
    }
}

// Mostrar el carrito en un modal
function mostrarCarrito() {
    const modal = document.getElementById('modal-carrito');
    const contenedorItems = document.getElementById('items-carrito');
    const totalElement = document.getElementById('total-carrito');

    if (!modal || !contenedorItems || !totalElement) return;

    contenedorItems.innerHTML = '';

    let total = 0;

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        contenedorItems.innerHTML += `
            <div class="item-carrito mb-3">
                <p><strong>${item.nombre}</strong></p>
                <p>Cantidad: ${item.cantidad} × $${item.precio.toLocaleString('es-CL')}</p>
                <p>Subtotal: $${subtotal.toLocaleString('es-CL')}</p>
                <button onclick="eliminarDelCarrito(${index})" class="btn btn-sm btn-danger">Eliminar</button>
            </div>
        `;
    });

    totalElement.textContent = total.toLocaleString('es-CL');
    modal.style.display = 'flex';
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
    actualizarCarrito();
}

// Vaciar carrito
function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
    actualizarCarrito();
}

// Cerrar modal
function cerrarModal() {
    const modal = document.getElementById('modal-carrito');
    if (modal) modal.style.display = 'none';
}

// Inicializar eventos del carrito
document.addEventListener('DOMContentLoaded', () => {
    const btnCarrito = document.getElementById('btn-carrito');
    if (btnCarrito) {
        btnCarrito.addEventListener('click', mostrarCarrito);
    }
});
