// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // ==== MENÚ LATERAL ====
    const menu = document.getElementById('menu');
    const sidebar = document.getElementById('sidebar');
    const main = document.getElementById('main');

    menu.addEventListener('click', () => {
        sidebar.classList.toggle('menu-toggle');
        menu.classList.toggle('menu-toggle');
        main.classList.toggle('main');
    });

    // ==== SUBMENÚ DEL USUARIO ====
    const subMenu = document.getElementById("subMenu");

    function toggleMenu() {
        subMenu.classList.toggle("open-menu");
    }
    window.toggleMenu = toggleMenu; // Si se usa desde el HTML

    // Marcar la opción seleccionada en la barra lateral
    const sidebarLinks = document.querySelectorAll(".sidebar a");
    sidebarLinks.forEach(link => {
        link.addEventListener("click", function () {
            sidebarLinks.forEach(item => item.classList.remove("selected"));
            this.classList.add("selected");
        });
    });

    // ==== CERRAR SESIÓN ====
    document.getElementById("logoutButton")?.addEventListener("click", function () {
        google.accounts.id.disableAutoSelect();
        localStorage.removeItem("user");
        sessionStorage.clear();

        if ('caches' in window) {
            caches.keys().then(function (names) {
                for (let name of names) caches.delete(name);
            });
        }

        window.history.replaceState(null, null, "login.html");
        window.location.replace("login.html");
    });

    // ==== MOSTRAR INFO DE USUARIO ====
    const userData = localStorage.getItem("user");

    if (!userData) {
        window.location.replace("login.html");
    } else {
        const data = JSON.parse(userData);
        mostrarUsuario(data);
    }

    function mostrarUsuario(data) {
        document.querySelector(".user-info h3").textContent = data.name;
        document.querySelector(".user-info img").src = data.picture;
        document.querySelector(".user").src = data.picture;
    }

    // ==== DETECTAR CLIC FUERA DEL SIDEBAR Y SUBMENÚ ====
    document.addEventListener("click", function (event) {
        const userIcon = document.querySelector(".user");

        if (sidebar.classList.contains("menu-toggle") &&
            !sidebar.contains(event.target) &&
            !menu.contains(event.target)) {
            sidebar.classList.remove("menu-toggle");
            menu.classList.remove("menu-toggle");
        }

        if (subMenu.classList.contains("open-menu") &&
            !subMenu.contains(event.target) &&
            !userIcon.contains(event.target)) {
            subMenu.classList.remove("open-menu");
        }
    });
    
});
