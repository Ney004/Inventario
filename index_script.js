//MENU
const menu = document.getElementById('menu');
const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');

menu.addEventListener('click',()=>{
    sidebar.classList.toggle('menu-toggle');
    menu.classList.toggle('menu-toggle');
    main.classList.toggle('main');
});

//SUBMENU
let subMenu = document.getElementById("subMenu");

function toggleMenu(){
    subMenu.classList.toggle("open-menu");
}

//.selected
document.addEventListener("DOMContentLoaded", function () {
    const sidebarLinks = document.querySelectorAll(".sidebar a");
    sidebarLinks.forEach(link => {
        link.addEventListener("click", function () {
            sidebarLinks.forEach(item => item.classList.remove("selected"));
            this.classList.add("selected");
        });
    });
});

//CERRAR SESION
document.getElementById("logoutButton").addEventListener("click", function () {
    google.accounts.id.disableAutoSelect(); // Evita auto-login en la próxima carga
    localStorage.removeItem("user"); // Elimina usuario guardado
    sessionStorage.clear();

    // Intenta borrar caché (opcional, depende del navegador)
    if ('caches' in window) {
        caches.keys().then(function (names) {
            for (let name of names) caches.delete(name);
        });
    }

    // Reemplazar historial para que no pueda volver atrás
    window.history.replaceState(null, null, "login.html");

    // Redirigir a login
    window.location.replace("login.html");
});

//CAPTURA DE DATOS - MOSTRAR IMAGEN Y NOMBRE
window.onload = function () {
    // Verificar si hay datos del usuario guardados en localStorage
    const userData = localStorage.getItem("user");

    if (userData) {
        const data = JSON.parse(userData);

        // Actualizar el menú con la información del usuario
        document.querySelector(".user-info h3").textContent = data.name;
        document.querySelector(".user-info img").src = data.picture;
        document.querySelector(".user").src = data.picture; // También cambiar el ícono del navbar
    }
};

//DETECTAR CLICK FUERA DEL SIDEBAR Y EL SUBMENU
document.addEventListener("click", function (event) {
    const sidebar = document.getElementById("sidebar");
    const menu = document.getElementById("menu");
    const subMenu = document.getElementById("subMenu");
    const userIcon = document.querySelector(".user");
    const content = document.getElementById("content"); // Asegúrate de que el contenedor del contenido tenga este ID

    // Cerrar el sidebar si el clic fue fuera de él y del botón de menú
    if (sidebar.classList.contains("menu-toggle") && 
        !sidebar.contains(event.target) && 
        !menu.contains(event.target)) {
        sidebar.classList.remove("menu-toggle");
        menu.classList.remove("menu-toggle");
    }

    // Cerrar el submenú si el clic fue fuera de él y del icono de usuario
    if (subMenu.classList.contains("open-menu") && 
        !subMenu.contains(event.target) && 
        !userIcon.contains(event.target)) {
        subMenu.classList.remove("open-menu");
    }
});
