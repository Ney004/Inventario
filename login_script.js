function loginExitoso(name, email, picture) {
    const user = {
        name: name,
        email: email,
        picture: picture || "./assets/Avatar.png"
    };

    // Guardar la información del usuario en el localStorage
    localStorage.setItem("user", JSON.stringify(user));

    // Redirigir al index.html
    window.location.href = "index.html";
}

function handleCredentialResponse(response) {
    console.log("ID Token:", response.credential);

    // Decodificar el token de Google
    const user = parseJwt(response.credential);
    const userData = {
        google_id: user.sub, 
        name: user.name,
        email: user.email,
        picture: user.picture || "./assets/Avatar.png"  // Asegúrate de incluir la imagen
    };

    console.log("Usuario autenticado:", userData);

    // Enviar los datos al backend para guardarlos en PostgreSQL
    fetch('http://localhost:3000/auth/google', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ credential: response.credential })  
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta del servidor:", data);

        if (data.google_id) {
            // Guardar el google_id en localStorage
            localStorage.setItem("google_id", data.google_id);

            // Guardar también la información completa del usuario que se espera en index.js
            const userForFrontend = {
                name: user.name,
                email: user.email,
                picture: user.picture || "./assets/Avatar.png"
            };

            // Guardar la información del usuario para ser usada en index.js
            localStorage.setItem("user", JSON.stringify(userForFrontend));

            console.log("Usuario guardado:", userForFrontend);

            // Redirigir a la página principal (index.html)
            window.location.href = "index.html";  // Asegúrate de redirigir al index.html correctamente
        } else {
            console.error("Error en autenticación:", data.error);
            alert("Error al autenticar con Google.");
        }
    })
    .catch(error => {
        console.error('Error en la autenticación:', error);
        alert("Hubo un problema con la autenticación.");
    });
}

// Función para decodificar el ID Token de Google
function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
}

// Inicialización de Google One Tap
document.addEventListener("DOMContentLoaded", () => {
    google.accounts.id.initialize({
        client_id: "218301923381-dtp2ql9k479r4aouuv6ope37ntf16kse.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById("google-login-btn"),
        { theme: "outline", size: "large" }
    );
});
