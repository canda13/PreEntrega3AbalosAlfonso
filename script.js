// Obtener referencia a elementos del DOM
const productosLista = document.getElementById('productos-lista');
const carritoLista = document.getElementById('carrito-lista');
const carritoTotalValor = document.getElementById('carrito-total-valor');
const agregarCarritoBtns = document.getElementsByClassName('agregar-carrito');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

// Función para obtener los productos desde el almacenamiento local o devolver un arreglo vacío
function obtenerProductosEnCarrito() {
  const productosEnCarrito = localStorage.getItem('carrito');
  return productosEnCarrito ? JSON.parse(productosEnCarrito) : [];
}

// Función para guardar los productos en el almacenamiento local
function guardarProductosEnCarrito(productos) {
  localStorage.setItem('carrito', JSON.stringify(productos));
}

// Función para mostrar los productos en el carrito
function mostrarProductosCarrito() {
  const productosEnCarrito = obtenerProductosEnCarrito();

  // Limpiar el contenido previo del carrito
  carritoLista.innerHTML = '';

  // Recorrer los productos en el carrito y agregarlos al DOM
  productosEnCarrito.forEach(function(producto) {
    const li = document.createElement('li');
    li.textContent = producto.nombre + ' - $' + producto.precio.toFixed(2);
    carritoLista.appendChild(li);
  });

  // Calcular el total y mostrarlo en el DOM
  calcularTotal();
}

// Función para calcular el total del carrito
function calcularTotal() {
  const productosEnCarrito = obtenerProductosEnCarrito();

  // Calcular el total sumando los precios de los productos en el carrito
  const total = productosEnCarrito.reduce(function(acumulador, producto) {
    return acumulador + producto.precio;
  }, 0);

  // Mostrar el total en el DOM
  carritoTotalValor.textContent = total.toFixed(2);
}

// Función para agregar un producto al carrito
function agregarProductoCarrito(nombre, precio) {
  const producto = {
    nombre: nombre,
    precio: precio
  };

  const productosEnCarrito = obtenerProductosEnCarrito();
  productosEnCarrito.push(producto);

  guardarProductosEnCarrito(productosEnCarrito);
  mostrarProductosCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
  localStorage.removeItem('carrito');
  carritoLista.innerHTML = '';
  carritoTotalValor.textContent = '0.00';
}

// Asignar eventos a los botones "Agregar al Carrito" y "Vaciar Carrito"
for (let i = 0; i < agregarCarritoBtns.length; i++) {
  agregarCarritoBtns[i].addEventListener('click', function() {
    const producto = this.parentNode;
    const nombre = producto.querySelector('h3').textContent;
    const precio = parseFloat(producto.querySelector('p').textContent.replace('Precio: $', ''));
    agregarProductoCarrito(nombre, precio);
  });
}

vaciarCarritoBtn.addEventListener('click', function() {
  vaciarCarrito();
});

// Mostrar los productos del carrito al cargar la página
mostrarProductosCarrito();
