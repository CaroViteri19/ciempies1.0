let estudiantes = [];
let currentPage = 1;
const pageSize = 10;
const API_URL = "/api/estudiantes";

// Abrir modal (crear nuevo)
function openModal() {
  document.getElementById("estudianteForm").reset();
  document.getElementById("estudianteId").value = "";
  document.getElementById("modalTitle").textContent = "Nuevo Estudiante";
  document.getElementById("fechaRegistro").value = new Date().toISOString().split("T")[0];
  document.getElementById("estudianteModal").classList.remove("hidden");
}

// Cerrar modal
function closeModal() {
  document.getElementById("estudianteModal").classList.add("hidden");
}

// Mostrar alerta
function showAlert(message, type = "error") {
    let alerta = document.getElementById("alerta");

    // Si no existe el contenedor, lo creamos
    if (!alerta) {
        alerta = document.createElement("div");
        alerta.id = "alerta";
        alerta.className = "fixed top-5 right-5 px-4 py-3 rounded shadow-lg text-white z-50";
        document.body.appendChild(alerta);
    }

    // Colores según tipo
    alerta.classList.remove("bg-red-500", "bg-green-500");
    alerta.classList.add(type === "success" ? "bg-green-500" : "bg-red-500");

    alerta.textContent = message;
    alerta.classList.remove("hidden");

    // Se oculta después de 3 segundos
    setTimeout(() => {
        alerta.classList.add("hidden");
    }, 3000);
}
// Cerrar alerta
function closeAlert() {
  document.getElementById("customAlert").classList.add("hidden");
}

// Guardar estudiante (crear o actualizar)
function saveEstudiante() {
  const id = document.getElementById("estudianteId").value;

  const estudiante = {
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    documento: document.getElementById("documento").value,
    sexo: document.getElementById("sexo").value,
    edad: parseInt(document.getElementById("edad").value) || 0,
    curso: document.getElementById("curso").value,
    eps: document.getElementById("eps").value,
    telefono: document.getElementById("telefono").value,
    direccion: document.getElementById("direccion").value,
    discapacidad: document.getElementById("discapacidad").value,
    etnia: document.getElementById("etnia").value,
    fechaRegistro: document.getElementById("fechaRegistro").value,
    idRuta: document.getElementById("idRuta").value,
    activo: true
  };

  const method = id ? "PUT" : "POST";
  const url = id ? `${API_URL}/${id}` : API_URL;

  fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(estudiante)
  })
    .then(response => {
      if (!response.ok) throw new Error("Error al guardar estudiante");
      return response.json();
    })
    .then(data => {
      if (id) {
        const idx = estudiantes.findIndex(e => e.idEstudiante === data.idEstudiante);
        if (idx !== -1) estudiantes[idx] = data;
      } else {
        estudiantes.push(data);
      }
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
  fetch(API_URL)
    .then(response => {
      if (!response.ok) throw new Error("Error al cargar estudiantes");
      return response.json();
    })
    .then(data => {
      estudiantes = data;
      currentPage = 1;
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
      <td class="px-6 py-4">${est.nombre || ""} ${est.apellido || ""}</td>
      <td class="px-6 py-4">${est.documento || ""}</td>
      <td class="px-6 py-4">${est.edad ?? ""}</td>
      <td class="px-6 py-4">${est.curso || ""}</td>
      <td class="px-6 py-4">${est.idRuta || "-"}</td>
      <td class="px-6 py-4">${est.activo ? "Activo" : "Inactivo"}</td>
      <td class="px-6 py-4">
        <button class="text-blue-600 hover:underline" onclick="editEstudiante(${est.idEstudiante})">Editar</button>
        <button class="text-red-600 hover:underline ml-2" onclick="deleteEstudiante(${est.idEstudiante})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById("showing-start").textContent =
    start + 1 <= estudiantes.length ? start + 1 : 0;
  document.getElementById("showing-end").textContent = Math.min(end, estudiantes.length);
  document.getElementById("total-records").textContent = estudiantes.length;
  document.getElementById("prevBtn").disabled = currentPage === 1;
  document.getElementById("nextBtn").disabled = end >= estudiantes.length;
}

// Editar estudiante
function editEstudiante(id) {
  const est = estudiantes.find(e => e.idEstudiante === id);
  if (!est) return;

  document.getElementById("estudianteId").value = est.idEstudiante;
  document.getElementById("nombre").value = est.nombre || "";
  document.getElementById("apellido").value = est.apellido || "";
  document.getElementById("documento").value = est.documento || "";
  document.getElementById("sexo").value = est.sexo || "";
  document.getElementById("edad").value = est.edad || "";
  document.getElementById("curso").value = est.curso || "";
  document.getElementById("eps").value = est.eps || "";
  document.getElementById("telefono").value = est.telefono || "";
  document.getElementById("direccion").value = est.direccion || "";
  document.getElementById("discapacidad").value = est.discapacidad || "";
  document.getElementById("etnia").value = est.etnia || "";
   // est.fechaRegistro || new Date().toISOString().split("T")[0];
  document.getElementById("idRuta").value = est.idRuta || "";
  document.getElementById("modalTitle").textContent = "Editar Estudiante";
  document.getElementById("estudianteModal").classList.remove("hidden");
}

// Eliminar estudiante
function deleteEstudiante(id) {
  if (!confirm("¿Seguro que deseas eliminar este estudiante?")) return;

  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(response => {
      if (!response.ok) throw new Error("Error al eliminar estudiante");
      estudiantes = estudiantes.filter(e => e.idEstudiante !== id);
      renderEstudiantes();
      updateStats();
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
  if (currentPage * pageSize < estudiantes.length) {
    currentPage++;
    renderEstudiantes();
  }
}

// Inicializar
window.onload = loadEstudiantes;
