let estudiantes = [];
let currentPage = 1;
const pageSize = 10;

// Abrir modal
function openModal() {
  document.getElementById("estudianteForm").reset();
  document.getElementById("estudianteId").value = "";
  document.getElementById("modalTitle").textContent = "Nuevo Estudiante";
  document.getElementById("fecha_registro").value = new Date().toISOString().split("T")[0];
  document.getElementById("estudianteModal").classList.remove("hidden");
}

// Cerrar modal
function closeModal() {
  document.getElementById("estudianteModal").classList.add("hidden");
}

// Mostrar alerta
function showAlert() {
  document.getElementById("customAlert").classList.remove("hidden");
}

// Cerrar alerta
function closeAlert() {
  document.getElementById("customAlert").classList.add("hidden");
}

// Guardar estudiante
function saveEstudiante() {
  const estudiante = {
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    documento: document.getElementById("documento").value,
    sexo: document.getElementById("sexo").value,
    edad: parseInt(document.getElementById("edad").value),
    curso: document.getElementById("curso").value,
    eps: document.getElementById("eps").value,
    telefono: document.getElementById("telefono").value,
    direccion: document.getElementById("direccion").value,
    discapacidad: document.getElementById("discapacidad").value,
    etnia: document.getElementById("etnia").value,
    fecha_registro: document.getElementById("fecha_registro").value,
    idRuta: document.getElementById("idRuta").value,
    activo: true
  };

  fetch("/api/estudiantes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(estudiante)
  })
    .then(response => {
      if (!response.ok) throw new Error("Error al guardar estudiante");
      return response.json();
    })
    .then(data => {
      estudiantes.push(data);
      renderEstudiantes();
      closeModal();
      showAlert();
    })
    .catch(error => {
      console.error("Error:", error);
      alert("No se pudo guardar el estudiante.");
    });
}

// Cargar estudiantes desde el backend
function loadEstudiantes() {
  fetch("/api/estudiantes")
    .then(response => response.json())
    .then(data => {
      estudiantes = data;
      renderEstudiantes();
      updateStats();
    })
    .catch(error => {
      console.error("Error al cargar estudiantes:", error);
    });
}

// Renderizar tabla
function renderEstudiantes() {
  const tbody = document.getElementById("estudiantesTableBody");
  tbody.innerHTML = "";

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const pageData = estudiantes.slice(start, end);

  pageData.forEach(est => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="px-6 py-4">${est.nombre} ${est.apellido}</td>
      <td class="px-6 py-4">${est.documento}</td>
      <td class="px-6 py-4">${est.edad}</td>
      <td class="px-6 py-4">${est.curso}</td>
      <td class="px-6 py-4">${est.idRuta}</td>
      <td class="px-6 py-4">${est.activo ? "Activo" : "Inactivo"}</td>
      <td class="px-6 py-4">
        <button class="text-blue-600 hover:underline" onclick="editEstudiante(${est.id})">Editar</button>
        <button class="text-red-600 hover:underline ml-2" onclick="deleteEstudiante(${est.id})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById("showing-start").textContent = start + 1;
  document.getElementById("showing-end").textContent = Math.min(end, estudiantes.length);
  document.getElementById("total-records").textContent = estudiantes.length;
  document.getElementById("current-page").textContent = currentPage;
  document.getElementById("prevBtn").disabled = currentPage === 1;
  document.getElementById("nextBtn").disabled = end >= estudiantes.length;
}

// Editar estudiante
function editEstudiante(id) {
  const est = estudiantes.find(e => e.id === id);
  if (!est) return;

  document.getElementById("estudianteId").value = est.id;
  document.getElementById("nombre").value = est.nombre;
  document.getElementById("apellido").value = est.apellido;
  document.getElementById("documento").value = est.documento;
  document.getElementById("sexo").value = est.sexo;
  document.getElementById("edad").value = est.edad;
  document.getElementById("curso").value = est.curso;
  document.getElementById("eps").value = est.eps;
  document.getElementById("telefono").value = est.telefono;
  document.getElementById("direccion").value = est.direccion;
  document.getElementById("discapacidad").value = est.discapacidad;
  document.getElementById("etnia").value = est.etnia;
  document.getElementById("fecha_registro").value = est.fecha_registro;
  document.getElementById("idRuta").value = est.idRuta;
  document.getElementById("modalTitle").textContent = "Editar Estudiante";
  document.getElementById("estudianteModal").classList.remove("hidden");
}

// Eliminar estudiante
function deleteEstudiante(id) {
  fetch(`/api/estudiantes/${id}`, {
    method: "DELETE"
  })
    .then(response => {
      if (!response.ok) throw new Error("Error al eliminar estudiante");
      estudiantes = estudiantes.filter(e => e.id !== id);
      renderEstudiantes();
    })
    .catch(error => {
      console.error("Error:", error);
      alert("No se pudo eliminar el estudiante.");
    });
}

// Estadísticas
function updateStats() {
  const total = estudiantes.length;
  const masculino = estudiantes.filter(e => e.sexo === "MASCULINO").length;
  const femenino = estudiantes.filter(e => e.sexo === "FEMENINO").length;
  const discapacidad = estudiantes.filter(e => e.discapacidad && e.discapacidad.trim() !== "").length;

  document.getElementById("total-estudiantes").textContent = total;
  document.getElementById("total-masculino").textContent = masculino;
  document.getElementById("total-femenino").textContent = femenino;
  document.getElementById("total-discapacidad").textContent = discapacidad;
}

// Paginación
function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    renderEstudiantes();
  }
}

function nextPage() {
  if ((currentPage * pageSize) < estudiantes.length) {
    currentPage++;
    renderEstudiantes();
  }
}

// Inicializar
window.onload = loadEstudiantes;
