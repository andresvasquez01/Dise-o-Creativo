document.addEventListener("DOMContentLoaded", () => {
  const publicaciones = [
    { fecha: "28 de mayo", titulo: "Matrículas abiertas", contenido: "Las matrículas estarán abiertas hasta el 10 de junio." },
    { fecha: "15 de mayo", titulo: "Semana de parciales", contenido: "La semana de parciales será del 3 al 7 de julio." },
    { fecha: "5 de mayo", titulo: "Feria académica", contenido: "No te pierdas la feria académica el 20 de agosto." }
  ];

  const rol = sessionStorage.getItem("rol");

  // Si es admin, mostrar el formulario
  if (rol === "admin") {
    document.getElementById("formulario-publicacion").classList.remove("hidden");
  }

  const publicacionesContainer = document.getElementById("publicaciones");

  publicaciones.forEach(pub => {
    const item = document.createElement("div");
    item.className = "mb-6";
    item.innerHTML = `
      <h3 class="text-lg font-semibold border-b pb-1 mb-3">📅 ${pub.fecha}</h3>
      <div class="bg-white p-4 rounded shadow mb-3">
        <h4 class="font-bold">${pub.titulo}</h4>
        <p>${pub.contenido}</p>
      </div>
    `;
    publicacionesContainer.appendChild(item);
  });
});

function agregarPublicacion() {
  const titulo = document.getElementById("titulo").value;
  const contenido = document.getElementById("contenido").value;

  if (titulo.trim() === "" || contenido.trim() === "") {
    alert("Por favor completa todos los campos.");
    return;
  }

  const publicacionesContainer = document.getElementById("publicaciones");

  const hoy = new Date();
  const opcionesFecha = { day: 'numeric', month: 'long' };
  const fechaFormateada = hoy.toLocaleDateString('es-ES', opcionesFecha);

  const nuevaPublicacion = document.createElement("div");
  nuevaPublicacion.className = "mb-6";
  nuevaPublicacion.innerHTML = `
    <h3 class="text-lg font-semibold border-b pb-1 mb-3">📅 ${fechaFormateada}</h3>
    <div class="bg-white p-4 rounded shadow mb-3">
      <h4 class="font-bold">${titulo}</h4>
      <p>${contenido}</p>
    </div>
  `;

  publicacionesContainer.prepend(nuevaPublicacion);

  // Limpiar formulario
  document.getElementById("titulo").value = "";
  document.getElementById("contenido").value = "";
}

function cerrarSesion() {
  sessionStorage.removeItem("rol");
  window.location.href = "index.html";
}

