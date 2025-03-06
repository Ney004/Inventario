function handleCredentialResponse(response) {
    console.log("ID Token:", response.credential);
    // Decodificar el ID Token de Google para obtener el usuario
    const user = parseJwt(response.credential);
    const userId = user.sub; // El ID único del usuario (sub es el ID en Google)
    
    // Verifica si el usuario ya ha iniciado sesión previamente
    if (!localStorage.getItem(`hasLoggedInBefore_${userId}`)) {
        // Si no ha iniciado sesión antes, redirige al usuario a validacion.html
        window.location.href = "validacion.html";
        // Marca al usuario como que ya inició sesión y guarda la información en localStorage
        localStorage.setItem(`hasLoggedInBefore_${userId}`, 'true');
    } else {
        // Si ya inició sesión antes, redirige directamente al index.html
        window.location.href = "index.html";
    }
}

// Función para decodificar el ID Token de Google y obtener los datos del usuario
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}