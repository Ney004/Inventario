//Redireccion al inventario de prestamos
document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario-prestar");

    formulario.addEventListener("submit", function (e) {
        e.preventDefault(); // Previene que se recargue la página
        alert("Agregado con exito");
        window.location.href = "prestamo.html"; // Redirige a la página principal
    });
});
