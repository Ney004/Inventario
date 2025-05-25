//Redireccion al inventario de prestamos
document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario-venta");

    formulario.addEventListener("submit", function (e) {
        e.preventDefault(); // Previene que se recargue la página
        alert("Agregado con exito");
        window.location.href = "ventas.html"; // Redirige a la página principal
    });
});

//CALCULAR TOTAL
const cantidadInput = document.getElementById('cantidad');
const precioInput = document.getElementById('precio');
const totalInput = document.getElementById('total');

function calcularTotal() {
    const cantidad = parseFloat(cantidadInput.value) || 0;
    const precio = parseFloat(precioInput.value) || 0;
    const total = cantidad * precio;
    totalInput.value = total.toFixed(2);
}

cantidadInput.addEventListener('input', calcularTotal);
precioInput.addEventListener('input', calcularTotal);
