// js/foro.js

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

  // Eventos de voto
  let currentScore = 0;
  btnUp.addEventListener("click", () => {
    currentScore++;
    score.textContent = currentScore;
  });
  btnDown.addEventListener("click", () => {
    currentScore--;
    score.textContent = currentScore;
  });

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
  formComentario.addEventListener("submit", (e) => {
    e.preventDefault();
    const comentarioTexto = inputComentario.value.trim();
    if (comentarioTexto) {
      const nuevoComentario = document.createElement("div");
      nuevoComentario.className = "text-sm text-gray-700 bg-gray-100 p-2 rounded";
      nuevoComentario.textContent = comentarioTexto;
      listaComentarios.appendChild(nuevoComentario);
      inputComentario.value = "";
    }
  });

  comentariosDiv.appendChild(listaComentarios);
  comentariosDiv.appendChild(formComentario);

  content.appendChild(comentariosDiv);
  post.appendChild(votos);
  post.appendChild(content);

  return post;
}

function cerrarSesion() {
  window.location.href = "index.html";
}

