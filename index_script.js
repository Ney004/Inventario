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
    localStorage.removeItem("user"); // Borrar usuario guardado
    sessionStorage.clear();

    // Redirigir a la página de login
    window.location.href = "login.html";
});

//CAPTURA DE DATOS - MOSTRAR
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

