// Autenticación
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual')) || null;

function registrar() {
  const email = document.getElementById('reg-email').value.trim();
  const username = document.getElementById('reg-username').value.trim();
  const password = document.getElementById('reg-password').value.trim();
  const rol = document.getElementById('reg-rol').value;

  if (!email || !username || !password) return alert("Completa todos los campos");
  if (usuarios.some(u => u.email === email)) return alert("El correo ya está registrado");

  usuarios.push({ email, username, password, rol });
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  alert("Registro exitoso");
}

function iniciarSesion() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();
  const user = usuarios.find(u => u.email === email && u.password === password);

  if (!user) return alert("Credenciales incorrectas");

  usuarioActual = user;
  localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
  mostrarApp();
}

function cerrarSesion() {
  localStorage.removeItem('usuarioActual');
  location.reload();
}

function mostrarApp() {
  document.getElementById('auth').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  mostrarSeccion('foro');
}

if (usuarioActual) mostrarApp();

function mostrarSeccion(id) {
  document.querySelectorAll('.seccion').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

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
    div.innerHTML = `<p><strong>Estudiante:</strong> ${item.pregunta}</p>${adminRespuesta}`;

    if (!item.respuesta && usuarioActual?.rol === 'admin') {
      div.innerHTML += `
        <input type="text" placeholder="Responder como Secretaría" class="input mt-2" id="respuesta-${index}" />
        <button onclick="responderForo(${index})" class="btn-blue mt-2">Responder</button>
      `;
    }

    listaForo.appendChild(div);
  });
}

if (formForo) {
  formForo.addEventListener('submit', e => {
    e.preventDefault();
    const pregunta = document.getElementById('pregunta').value.trim();
    foro.push({ pregunta, respuesta: null });
    localStorage.setItem('foro', JSON.stringify(foro));
    formForo.reset();
    renderizarForo();
  });
}

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
    const esAdmin = usuarioActual?.rol === "admin";

    div.innerHTML = `
      <p><strong>${ticket.nombre}</strong> (${ticket.categoria})</p>
      <p>${ticket.mensaje}</p>
      ${adminRespuesta}
      ${esAdmin && !ticket.respuesta ? `
        <input type="text" placeholder="Responder ticket" class="border p-1 mt-2 w-full" id="resp-ticket-${i}" />
        <button onclick="responderTicket(${i})" class="mt-2 bg-green-500 text-white px-2 py-1 rounded">Responder</button>
      ` : ''}
    `;
    listaTickets.appendChild(div);
  });
}

if (formTicket) {
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
}

function responderTicket(i) {
  const input = document.getElementById(`resp-ticket-${i}`);
  if (input.value.trim()) {
    tickets[i].respuesta = input.value.trim();
    localStorage.setItem('tickets', JSON.stringify(tickets));
    renderizarTickets();
  }
}

renderizarTickets();

// Publicaciones
let publicaciones = JSON.parse(localStorage.getItem("publicaciones")) || [
  "Actualización de horarios disponible en el sistema académico.",
  "Recuerda renovar matrícula hasta el 20 de abril.",
  "Las solicitudes de cambio de grupo deben enviarse por ticket."
];

function renderizarPublicaciones() {
  const lista = document.getElementById("lista-publicaciones");
  const esAdmin = usuarioActual?.rol === "admin";
  lista.innerHTML = "";

  publicaciones.forEach((texto, index) => {
    const div = document.createElement("div");
    div.className = "bg-white p-3 rounded shadow";

    if (esAdmin) {
      div.innerHTML = `
        <textarea class="w-full p-2 border rounded" onchange="guardarPublicacion(${index}, this.value)">${texto}</textarea>
      `;
    } else {
      div.innerHTML = `<p>${texto}</p>`;
    }

    lista.appendChild(div);
  });
}

function guardarPublicacion(index, nuevoTexto) {
  publicaciones[index] = nuevoTexto;
  localStorage.setItem("publicaciones", JSON.stringify(publicaciones));
}

renderizarPublicaciones();
