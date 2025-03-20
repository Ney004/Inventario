//MOSTRAR N ENTRADAS
document.addEventListener("DOMContentLoaded", function() {
    const selectEntries = document.getElementById("n-entries");
    const tableRows = document.querySelectorAll("tbody tr");

    function updateTableRows() {
        let value = parseInt(selectEntries.value);
        tableRows.forEach((row, index) => {
            row.style.display = index < value ? "table-row" : "none";
        });
    }

    selectEntries.addEventListener("change", updateTableRows);
    updateTableRows(); // Llamada inicial para aplicar el valor por defecto
});

//PAGINACION
document.addEventListener("DOMContentLoaded", function () {
    const selectEntries = document.getElementById("n-entries");
    const tableRows = Array.from(document.querySelectorAll("tbody tr"));
    const paginationContainer = document.getElementById("pagination");

    let currentPage = 1;
    let rowsPerPage = parseInt(selectEntries.value);

    function updateTable() {
        let start = (currentPage - 1) * rowsPerPage;
        let end = start + rowsPerPage;

        tableRows.forEach((row, index) => {
            row.style.display = index >= start && index < end ? "table-row" : "none";
        });

        updatePagination();
    }

    function updatePagination() {
        let totalPages = Math.ceil(tableRows.length / rowsPerPage);
        paginationContainer.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            let pageItem = document.createElement("li");
            let pageLink = document.createElement("span");

            pageLink.textContent = i;
            pageLink.classList.add("page-link");
            if (i === currentPage) {
                pageLink.classList.add("active");
            }

            pageLink.addEventListener("click", function () {
                currentPage = i;
                updateTable();
            });

            pageItem.appendChild(pageLink);
            paginationContainer.appendChild(pageItem);
        }
    }

    selectEntries.addEventListener("change", function () {
        rowsPerPage = parseInt(selectEntries.value);
        currentPage = 1;
        updateTable();
    });

    updateTable();
});


