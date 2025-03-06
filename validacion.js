document.getElementById('validation-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Evitar que el formulario se envíe realmente
    // Si todo es válido, redirigir al usuario a index.html
    window.location.href = "index.html";
});