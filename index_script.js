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
    // Eliminar datos de sesión (según cómo los guardaste)
    localStorage.removeItem("user");  // Si guardaste el usuario en localStorage
    sessionStorage.clear();           // También puedes limpiar sessionStorage
    
    // Redirigir a la página de login
    window.location.href = "login.html"; // Asegúrate de tener esta página
});
