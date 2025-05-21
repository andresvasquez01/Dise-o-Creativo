// js/publicaciones.js

document.addEventListener("DOMContentLoaded", () => {
  const publicaciones = [
    { titulo: "Matrículas abiertas", contenido: "Las matrículas estarán abiertas hasta el 10 de junio." },
    { titulo: "Semana de parciales", contenido: "La semana de parciales será del 3 al 7 de julio." },
    { titulo: "Feria académica", contenido: "No te pierdas la feria académica el 20 de agosto." }
  ];

  const lista = document.getElementById("lista-publicaciones");

  publicaciones.forEach(pub => {
    const item = document.createElement("div");
    item.className = "bg-white p-4 rounded shadow";
    item.innerHTML = `<h3 class="font-bold text-lg">${pub.titulo}</h3><p>${pub.contenido}</p>`;
    lista.appendChild(item);
  });
});

function cerrarSesion() {
  window.location.href = "index.html";
}
