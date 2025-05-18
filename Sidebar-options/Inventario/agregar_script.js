//Redireccion al inventario
document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario-agregar");

    formulario.addEventListener("submit", function (e) {
        e.preventDefault(); // Previene que se recargue la página
        alert("Agregado con exito");
        window.location.href = "inventario.html"; // Redirige a la página principal
    });
});

//Agregar y eliminar (INSTRUMENTOS)
function agregarInstrumento() {
    const container = document.getElementById('instrumentosContainer');
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'lastname[]';
    input.className = 'formbold-form-input';
    container.appendChild(input);
}

function eliminarInstrumento() {
    const container = document.getElementById('instrumentosContainer');
    if (container.children.length > 1) {
        container.removeChild(container.lastElementChild);
    }
}
