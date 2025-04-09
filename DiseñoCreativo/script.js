// Secciones
function mostrarSeccion(id) {
  document.querySelectorAll('.seccion').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
mostrarSeccion('foro');

// Foro
const formForo = document.getElementById('form-foro');
const listaForo = document.getElementById('foro-lista');
let foro = JSON.parse(localStorage.getItem('foro')) || [];

function renderizarForo() {
  listaForo.innerHTML = '';
  foro.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = "p-4 bg-white rounded shadow";

    const adminRespuesta = item.respuesta ? `<div class="respuesta-admin"><strong>Secretaría:</strong> ${item.respuesta}</div>` : '';

    div.innerHTML = `
      <p><strong>Estudiante:</strong> ${item.pregunta}</p>
      ${adminRespuesta}
      ${!item.respuesta ? `
        <input type="text" placeholder="Responder como Secretaría" class="border p-1 mt-2 w-full" id="respuesta-${index}" />
        <button onclick="responderForo(${index})" class="mt-2 bg-blue-500 text-white px-2 py-1 rounded">Responder</button>
      ` : ''}
    `;
    listaForo.appendChild(div);
  });
}

formForo.addEventListener('submit', e => {
  e.preventDefault();
  const pregunta = document.getElementById('pregunta').value.trim();
  foro.push({ pregunta, respuesta: null });
  localStorage.setItem('foro', JSON.stringify(foro));
  formForo.reset();
  renderizarForo();
});

function responderForo(index) {
  const input = document.getElementById(`respuesta-${index}`);
  if (input.value.trim()) {
    foro[index].respuesta = input.value.trim();
    localStorage.setItem('foro', JSON.stringify(foro));
    renderizarForo();
  }
}

renderizarForo();

// Tickets
const formTicket = document.getElementById('form-ticket');
const listaTickets = document.getElementById('ticket-lista');
let tickets = JSON.parse(localStorage.getItem('tickets')) || [];

function categorizar(mensaje) {
  const claves = {
    "horario": ["horario", "hora", "grupo"],
    "cupos": ["cupo", "inscripción", "materia"],
    "otros": []
  };
  for (let categoria in claves) {
    if (claves[categoria].some(pal => mensaje.toLowerCase().includes(pal))) {
      return categoria;
    }
  }
  return "otros";
}

function renderizarTickets() {
  listaTickets.innerHTML = '';
  tickets.forEach((ticket, i) => {
    const div = document.createElement('div');
    div.className = "p-4 bg-white rounded shadow border-l-4 border-green-600";

    const adminRespuesta = ticket.respuesta ? `<div class="respuesta-admin"><strong>Secretaría:</strong> ${ticket.respuesta}</div>` : '';

    div.innerHTML = `
      <p><strong>${ticket.nombre}</strong> (${ticket.categoria})</p>
      <p>${ticket.mensaje}</p>
      ${adminRespuesta}
      ${!ticket.respuesta ? `
        <input type="text" placeholder="Responder ticket" class="border p-1 mt-2 w-full" id="resp-ticket-${i}" />
        <button onclick="responderTicket(${i})" class="mt-2 bg-green-500 text-white px-2 py-1 rounded">Responder</button>
      ` : ''}
    `;
    listaTickets.appendChild(div);
  });
}

formTicket.addEventListener('submit', e => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  const categoria = categorizar(mensaje);

  tickets.push({ nombre, mensaje, categoria, respuesta: null });
  localStorage.setItem('tickets', JSON.stringify(tickets));
  formTicket.reset();
  renderizarTickets();
});

function responderTicket(i) {
  const input = document.getElementById(`resp-ticket-${i}`);
  if (input.value.trim()) {
    tickets[i].respuesta = input.value.trim();
    localStorage.setItem('tickets', JSON.stringify(tickets));
    renderizarTickets();
  }
}

renderizarTickets();
