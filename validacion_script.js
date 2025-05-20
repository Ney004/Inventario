document.addEventListener("DOMContentLoaded", async () => {
    const googleId = localStorage.getItem("google_id");

    if (!googleId) {
        console.warn("No hay google_id en localStorage, redirigiendo a login.");
        window.location.href = "login.html";
        return;
    }

    document.getElementById("validation-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(this);
        const data = {
            google_id: googleId, //enviamos google_id
            Nombre_completo: formData.get("firstname"),
            apellidos: formData.get("lastname"),
            T_documento: formData.get("typedocument"),
            documento: formData.get("id"),
            telefono: formData.get("phone"),
            ocupacion: formData.get("occupation"),
        };

        try {
            const response = await fetch("http://localhost:3000/validar", { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (result.success) {
                localStorage.setItem("validated", "true"); // 🔹 Guardar estado validado
                window.location.href = result.redirect; // = "index.html"
            } else {
                alert("Error al guardar los datos. Inténtalo de nuevo.");
            }
        } catch (error) {
            console.error("Error en validación:", error);
            alert("Error en la validación.");
        }
    });
});