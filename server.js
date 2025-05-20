const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

// PostgreSQL
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Laboratorio",
    password: "1032",
    port: 5432,
});

// === FUNCIONES ===
async function verifyGoogleToken(token) {
    try {
        const response = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
        return response.data;
    } catch (error) {
        console.error("Error validando el token de Google:", error);
        return null;
    }
}

// === RUTAS ===

// 🟢 Autenticación con Google
app.post("/auth/google", async (req, res) => {
    const { credential } = req.body;

    if (!credential) {
        return res.status(400).json({ success: false, error: "No se recibió el token de Google" });
    }

    try {
        const decoded = await verifyGoogleToken(credential);
        if (!decoded) return res.status(401).json({ success: false, error: "Token de Google inválido" });

        const googleId = decoded.sub;
        const email = decoded.email;
        const nombre = decoded.name;

        // Verificar si el usuario ya existe
        const userResult = await pool.query("SELECT * FROM usuarios WHERE google_id = $1", [googleId]);

        if (userResult.rows.length === 0) {
            await pool.query(
                "INSERT INTO usuarios (google_id, nombre, email) VALUES ($1, $2, $3)",
                [googleId, nombre, email]
            );
            console.log("🆕 Nuevo usuario guardado:", email);
        }

        // Verificar si ya llenó el formulario
        const formResult = await pool.query("SELECT * FROM formulario WHERE google_id = $1", [googleId]);

        const redirectPage = formResult.rows.length === 0 ? "validacion.html" : "index.html";
        console.log(`Usuario ${googleId} será redirigido a ${redirectPage}`);

        return res.json({ success: true, google_id: googleId, redirect: redirectPage });
    } catch (error) {
        console.error("Error en autenticación:", error);
        return res.status(500).json({ success: false, error: "Error en autenticación con Google" });
    }
});

// ✅ Verificación del formulario completado
app.get("/verificar/:googleId", async (req, res) => {
    const { googleId } = req.params;

    try {
        const formResult = await pool.query("SELECT * FROM formulario WHERE google_id = $1", [googleId]);
        const redirect = formResult.rows.length === 0 ? "validacion.html" : "index.html";
        res.json({ success: true, redirect });
    } catch (error) {
        console.error("Error verificando usuario:", error);
        res.status(500).json({ success: false, error: "Error verificando usuario" });
    }
});

// ✅ Guardar formulario de validación del usuario
app.post("/validar", async (req, res) => {
    const { google_id, Nombre_completo, apellidos, T_documento, documento, telefono, ocupacion } = req.body;

    if (!google_id) {
        return res.status(400).json({ success: false, error: "google_id es requerido" });
    }

    try {
        const existing = await pool.query("SELECT * FROM formulario WHERE google_id = $1", [google_id]);

        if (existing.rows.length > 0) {
            return res.status(400).json({ success: false, error: "El formulario ya ha sido completado" });
        }

        const query = `
            INSERT INTO formulario (google_id, Nombre_completo, apellidos, T_documento, documento, telefono, ocupacion) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
        `;
        const values = [google_id, Nombre_completo, apellidos, T_documento, documento, telefono, ocupacion];

        await pool.query(query, values);
        console.log("✅ Formulario guardado para usuario:", google_id);
        res.json({ success: true, redirect: "index.html" });
    } catch (error) {
        console.error("❌ Error guardando el formulario:", error);
        res.status(500).json({ success: false, error: "Error al guardar los datos del formulario" });
    }
});

app.post("/inventario/agregar", async (req, res) => {
    const { nombre, instrumentos, clasificacion, aplicabilidad, descripcion } = req.body;

    if (!nombre || !instrumentos || !clasificacion || !aplicabilidad || !descripcion) {
        return res.status(400).json({ 
            success: false, 
            error: "Todos los campos son obligatorios" 
        });
    }

    try {
        const query = `
            INSERT INTO instrumentos (nombre, instrumentos, clasificacion, aplicabilidad, descripcion)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const values = [nombre, instrumentos, clasificacion, aplicabilidad, descripcion];

        const result = await pool.query(query, values);

        // Mostrar en terminal del servidor los datos insertados
        console.log("Instrumento guardado en BD:", result.rows[0]);

        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error("Error guardando instrumento:", error);
        res.status(500).json({ success: false, error: "Error guardando instrumento en BD" });
    }
});


// === INICIAR SERVIDOR ===
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
