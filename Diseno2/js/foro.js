//foro.js

document.getElementById("form-foro").addEventListener("submit", function (e) {
  e.preventDefault();

  const preguntaInput = document.getElementById("pregunta");
  const imagenInput = document.getElementById("imagen");

  const texto = preguntaInput.value.trim();
  const imagenArchivo = imagenInput.files[0];

  if (!texto && !imagenArchivo) return;

  if (imagenArchivo) {
    const lector = new FileReader();
    lector.onload = function (event) {
      const imagenURL = event.target.result;
      const nuevaPregunta = crearPostReddit(texto, imagenURL);
      document.getElementById("foro-lista").prepend(nuevaPregunta);
    };
    lector.readAsDataURL(imagenArchivo);
  } else {
    const nuevaPregunta = crearPostReddit(texto, null);
    document.getElementById("foro-lista").prepend(nuevaPregunta);
  }

  preguntaInput.value = "";
  imagenInput.value = "";
});

function crearPostReddit(texto, imagenURL = null) {
  const post = document.createElement("div");
  post.className = "post p-4 bg-white rounded shadow flex gap-4";

  // Columna de votos
  const votos = document.createElement("div");
  votos.className = "votes flex flex-col items-center";

  const btnUp = document.createElement("button");
  btnUp.className = "upvote text-lg";
  btnUp.textContent = "▲";

  const score = document.createElement("div");
  score.className = "score font-bold";
  score.textContent = "0";

  const btnDown = document.createElement("button");
  btnDown.className = "downvote text-lg";
  btnDown.textContent = "▼";

  votos.appendChild(btnUp);
  votos.appendChild(score);
  votos.appendChild(btnDown);

  // Contenido del post
  const content = document.createElement("div");
  content.className = "content flex-1";

  const text = document.createElement("p");
  text.className = "text mb-2";
  text.textContent = texto;

  content.appendChild(text);

  if (imagenURL) {
    const imagen = document.createElement("img");
    imagen.src = imagenURL;
    imagen.alt = "Imagen subida";
    imagen.className = "mt-2 max-w-xs rounded";
    content.appendChild(imagen);
  }

  const meta = document.createElement("div");
  meta.className = "meta text-sm text-gray-500 mt-2";
  meta.textContent = "Publicado por Anónimo • hace un momento";
  content.appendChild(meta);

  // Sección de comentarios
  const comentariosDiv = document.createElement("div");
  comentariosDiv.className = "comentarios mt-4 space-y-2";

  const formComentario = document.createElement("form");
  formComentario.className = "form-comentario flex gap-2 mt-2";

  const inputComentario = document.createElement("input");
  inputComentario.type = "text";
  inputComentario.placeholder = "Escribe un comentario";
  inputComentario.className = "flex-1 border rounded px-2 py-1";

  const btnEnviar = document.createElement("button");
  btnEnviar.type = "submit";
  btnEnviar.textContent = "Comentar";
  btnEnviar.className = "bg-blue-600 text-white px-3 py-1 rounded";

  formComentario.appendChild(inputComentario);
  formComentario.appendChild(btnEnviar);

  const listaComentarios = document.createElement("div");
  listaComentarios.className = "lista-comentarios mt-2 space-y-1";

// Evento para agregar comentario
// Evento para agregar comentario
formComentario.addEventListener("submit", (e) => {
  e.preventDefault();
  const comentarioTexto = inputComentario.value.trim();
  if (comentarioTexto) {
    const nuevoComentario = document.createElement("div");
    nuevoComentario.className = "text-sm text-gray-700 bg-gray-100 p-2 rounded flex justify-between items-center";

    // Recuperar usuario logueado
    const usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo") || "{}");
    const username = usuarioActivo.username || "Anónimo";
    const rol = usuarioActivo.rol || "usuario";

    const textoComentario = document.createElement("span");
    textoComentario.innerHTML = `<strong>${username}:</strong> ${comentarioTexto}`;

    const badgeRol = document.createElement("span");
    badgeRol.className = rol === "admin" ? "text-white bg-red-600 px-2 py-0.5 rounded text-xs ml-2" : "text-white bg-blue-600 px-2 py-0.5 rounded text-xs ml-2";
    badgeRol.textContent = rol.charAt(0).toUpperCase() + rol.slice(1);

    nuevoComentario.appendChild(textoComentario);
    nuevoComentario.appendChild(badgeRol);

    listaComentarios.appendChild(nuevoComentario);
    inputComentario.value = "";
  }
});


  comentariosDiv.appendChild(listaComentarios);
  comentariosDiv.appendChild(formComentario);

  content.appendChild(comentariosDiv);
  post.appendChild(votos);
  post.appendChild(content);

  // Inicializar puntaje y dataset
  let currentScore = 0;
  post.dataset.score = currentScore;

  // Eventos de voto con ordenamiento
  btnUp.addEventListener("click", () => {
    currentScore++;
    score.textContent = currentScore;
    post.dataset.score = currentScore;
    ordenarPosts();
  });

  btnDown.addEventListener("click", () => {
    currentScore--;
    score.textContent = currentScore;
    post.dataset.score = currentScore;
    ordenarPosts();
  });

  return post;
}

// Ordenar posts por puntaje descendente
function ordenarPosts() {
  const lista = document.getElementById("foro-lista");
  const posts = Array.from(lista.children);

  posts.sort((a, b) => {
    return parseInt(b.dataset.score) - parseInt(a.dataset.score);
  });

  posts.forEach((post) => lista.appendChild(post)); // reordenar visualmente
}

function cerrarSesion() {
  sessionStorage.removeItem("rol");
  window.location.href = "index.html";
}

// Publicaciones demo para presentación
function cargarDatosDemo() {
  const publicacionesDemo = [
    {
      texto: "Presnetamos Feria Para que se puedan inscribir y partisipar",
      imagen: "img/FI.png",
      comentarios: [
        { usuario: "María", rol: "usuario", texto: "Cuando se publican los seleccionados." },
        { usuario: "Carlos", rol: "admin", texto: "A mediados de Mayo se escogen los 8 y se presentan los proyectos." }
      ],
      score: 4
    },
    {
      texto: "Feria laboaral para los estuduantes habiles a paracticas para el 2025-3",
      imagen: "img/FL.png",
      comentarios: [
        { usuario: "Andrés", rol: "usuario", texto: "Podemos saber que mpresas van a asisistir a la feria?." },
        { usuario: "Carlos", rol: "admin", texto: "claro en la ecuela les damos un folleto con las empresas que vana asisitir" }
      ],
      score: 2
    },
    {
      texto: "¿Qué requisitos hay para habilitar una materia?",
      imagen: null,
      comentarios: [
        { usuario: "Laura", rol: "usuario", texto: "Que tu promedio sea mayor a 3.0 y no más de dos asignaturas." },
        { usuario: "Julián", rol: "admin", texto: "Revisa el reglamento estudiantil, está todo ahí." }
      ],
      score: 5
    }
  ];

  publicacionesDemo.forEach((pub) => {
    const post = crearPostReddit(pub.texto, pub.imagen);

    // Ajustar puntaje inicial
    post.dataset.score = pub.score;
    post.querySelector(".score").textContent = pub.score;

    // Agregar comentarios demo
    const listaComentarios = post.querySelector(".lista-comentarios");
    pub.comentarios.forEach((coment) => {
      const nuevoComentario = document.createElement("div");
      nuevoComentario.className = "text-sm text-gray-700 bg-gray-100 p-2 rounded flex justify-between items-center";

      const textoComentario = document.createElement("span");
      textoComentario.innerHTML = `<strong>${coment.usuario}:</strong> ${coment.texto}`;

      const badgeRol = document.createElement("span");
      badgeRol.className = coment.rol === "admin" ? "text-white bg-red-600 px-2 py-0.5 rounded text-xs ml-2" : "text-white bg-blue-600 px-2 py-0.5 rounded text-xs ml-2";
      badgeRol.textContent = coment.rol.charAt(0).toUpperCase() + coment.rol.slice(1);

      nuevoComentario.appendChild(textoComentario);
      nuevoComentario.appendChild(badgeRol);

      listaComentarios.appendChild(nuevoComentario);
    });

    document.getElementById("foro-lista").appendChild(post);
  });

  // Ordenar por puntaje inicial
  ordenarPosts();
}

// Cargar demo al iniciar
window.addEventListener("DOMContentLoaded", cargarDatosDemo);
