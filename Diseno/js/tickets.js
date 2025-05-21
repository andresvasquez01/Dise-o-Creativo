// js/tickets.js

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

function cerrarSesion() {
  window.location.href = "index.html";
}
