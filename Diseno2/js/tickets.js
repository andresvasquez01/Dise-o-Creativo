// js/tickets.js

document.addEventListener("DOMContentLoaded", () => {
  const rol = sessionStorage.getItem("rol");

  // Si no es admin, ocultar formulario de respuesta
  if (rol !== "admin") {
    document.getElementById("form-responder").classList.add("hidden");
  }
});

// Mostrar formulario de respuesta solo a admin
const rol = sessionStorage.getItem("rol");
if (rol === "admin") {
  document.getElementById("form-responder").classList.remove("hidden");
}

document.getElementById("form-ticket").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if (!nombre || !mensaje) return;

  const ticketLista = document.getElementById("ticket-lista");

  const nuevoTicket = document.createElement("div");
  nuevoTicket.className = "bg-white p-4 rounded shadow";
  nuevoTicket.innerHTML = `<p><strong>${nombre}:</strong></p><p>${mensaje}</p>`;

  ticketLista.prepend(nuevoTicket);

  // Limpiar campos
  document.getElementById("nombre").value = "";
  document.getElementById("mensaje").value = "";
});

// Responder ticket (solo admin)
document.getElementById("form-responder").addEventListener("submit", function (e) {
  e.preventDefault();

  const respuesta = document.getElementById("respuesta").value.trim();
  if (!respuesta) return;

  const respuestasDiv = document.getElementById("respuestas");

  const nuevaRespuesta = document.createElement("div");
  nuevaRespuesta.className = "bg-yellow-100 p-4 rounded shadow";
  nuevaRespuesta.innerHTML = `<p><strong>Respuesta de Admin:</strong></p><p>${respuesta}</p>`;

  respuestasDiv.prepend(nuevaRespuesta);

  // Limpiar textarea
  document.getElementById("respuesta").value = "";
});

function cerrarSesion() {
  sessionStorage.removeItem("rol");
  window.location.href = "index.html";
}

const usuarioActivo = sessionStorage.getItem("usuarioActivo");

if (usuarioActivo) {
  const usuarioObj = JSON.parse(usuarioActivo);  // Convertir string JSON a objeto
  const rol = usuarioObj.rol;                    // Obtener solo el rol
  document.getElementById("rol-usuario").textContent = `Rol: ${rol}`;
}


