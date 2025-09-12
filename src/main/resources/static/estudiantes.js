function openModal() {
    document.getElementById("estudianteForm").reset();
    document.getElementById("modalTitle").textContent = "Nuevo Estudiante";
}

function closeModal() {
    alert("Formulario cerrado");
}

function saveEstudiante() {
    const estudiante = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        documento: document.getElementById("documento").value,
        sexo: document.getElementById("sexo").value,
        eps: document.getElementById("eps").value,
        direccion: document.getElementById("direccion").value,
        edad: parseInt(document.getElementById("edad").value), // número
        discapacidad: document.getElementById("discapacidad").value,
        etnia: document.getElementById("etnia").value,
        curso: document.getElementById("curso").value,
        telefono: document.getElementById("telefono").value,
        id_ruta: parseInt(document.getElementById("id_ruta").value), // número
        fecha_registro: document.getElementById("fecha_registro").value,
        activo: document.getElementById("activo").value === "true" // boolean
    };

    console.log("Estudiante a guardar:", estudiante);

    fetch("http://localhost:8080/api/estudiantes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(estudiante)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al guardar estudiante");
        }
        return response.json();
    })
    .then(data => {
        alert("Estudiante guardado correctamente con ID: " + data.id_estudiante);
        closeModal();
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Hubo un error al guardar el estudiante");
    });
}
