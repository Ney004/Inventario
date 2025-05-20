document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario-agregar");

    formulario.addEventListener("submit", async function (e) {
        e.preventDefault();

        const nombre = document.getElementById("firstname").value;
        const instrumentos = Array.from(document.querySelectorAll('input[name="lastname[]"]')).map(el => el.value);
        const clasificacion = document.querySelector('input[name="clasificacion"]:checked')?.value;
        const aplicabilidad = document.getElementById("aplicabilidad").value;
        const descripcion = document.getElementById("descripcion").value;

        const data = {
            nombre,
            instrumentos,
            clasificacion,
            aplicabilidad,
            descripcion
        };

        try {
            const response = await fetch("http://localhost:3000/instrumento", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (result.success) {
                console.log("Instrumento guardado:", result);
                alert("Agregado con éxito");
                window.location.href = "inventario.html";
            } else {
                alert("Error al guardar en la base de datos.");
            }
        } catch (error) {
            console.error("Error en el envío:", error);
            alert("Hubo un error al conectar con el servidor.");
        }
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
