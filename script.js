

document.addEventListener("DOMContentLoaded", function() {
  const productos = document.querySelectorAll(".producto");
  const listaCarrito = document.getElementById("lista-carrito");
  const btnVaciarCarrito = document.getElementById("btn-vaciar");
  const totalCarrito = document.getElementById("total");
  let carrito = [];

  cargarEventos();

  function cargarEventos() {
    productos.forEach(function (producto) {
      producto.addEventListener("click", agregarProducto);
    });
  
    listaCarrito.addEventListener("click", eliminarProducto);
  
    btnVaciarCarrito.addEventListener("click", vaciarCarrito);
  }

  function mostrarAlerta(icon, text) {
    Swal.fire({
      icon: icon,
      text: text,
      showConfirmButton: false,
      timer: 1500
    });
  }
  
  
  function eliminarProducto(e) {
    if (e.target.classList.contains("borrar-producto")) {
      const productoId = e.target.getAttribute("data-id");
  
      carrito = carrito.filter(function (producto) {
        return producto.id !== productoId;
      });
  
      mostrarCarrito();
      mostrarAlerta("success", "Producto eliminado del carrito");
    }
    e.stopPropagation();
  }
  

  function agregarProducto(e) {
    if (e.target.classList.contains("btn-agregar")) {
      const productoSeleccionado = e.target.parentElement;
      obtenerDatosProducto(productoSeleccionado);
    }
    e.stopPropagation();
  }

  function obtenerDatosProducto(producto) {
    const imagen = producto.querySelector("img").src;
    const titulo = producto.querySelector("h3").textContent;
    const precioTexto = producto.querySelector("p").textContent;
    const precio = parseFloat(precioTexto.replace("Precio: $", ""));
    const id = producto.querySelector(".btn-agregar").getAttribute("data-id");
  
    const productoAgregado = {
      imagen: imagen,
      titulo: titulo,
      precio: precio,
      id: id,
    };
  
    carrito.push(productoAgregado);
    mostrarCarrito();
    mostrarAlerta("success", "Producto agregado al carrito");
  }
  

  function mostrarCarrito() {
    limpiarHTML();

    carrito.forEach(function(producto) {
      const { imagen, titulo, precio, id } = producto;
      const row = document.createElement("li");
      row.innerHTML = `
        <div class="producto-carrito">
          <img src="${imagen}" alt="${titulo}" class="imagen-carrito">
          <div>
            <h4>${titulo}</h4>
            <p>${precio}</p>
            <a href="#" class="borrar-producto" data-id="${id}">Eliminar</a>
          </div>
        </div>
      `;
      listaCarrito.appendChild(row);
    });

    actualizarTotal();

    sincronizarStorage();
  }

  function limpiarHTML() {
    while (listaCarrito.firstChild) {
      listaCarrito.removeChild(listaCarrito.firstChild);
    }
  }

  function vaciarCarrito() {
    carrito = [];
    limpiarHTML();
    actualizarTotal();
    sincronizarStorage();
    mostrarAlerta("success", "Carrito vaciado");
  }

  function actualizarTotal() {
    let total = 0;
  
    carrito.forEach(function (producto) {
      total += producto.precio;
    });
  
    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
  }
  
  function sincronizarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  function mostrarAlerta(icon, text) {
    Swal.fire({
      icon: icon,
      text: text,
      showConfirmButton: false,
      timer: 1500
    });
  }
});
