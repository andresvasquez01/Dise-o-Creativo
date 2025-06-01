// js/auth.js

function registrar() {
  const email = document.getElementById("reg-email").value.trim();
  const username = document.getElementById("reg-username").value.trim();
  const password = document.getElementById("reg-password").value;
  const rol = document.getElementById("reg-rol").value;

  // Validaciones
  if (!email.endsWith("@usa.edu.co")) {
    alert("El correo debe terminar en @usa.edu.co");
    return;
  }

  if (password.length <= 4) {
    alert("La contraseña debe tener más de 4 caracteres.");
    return;
  }

  if (!username) {
    alert("El nombre de usuario es obligatorio.");
    return;
  }

  // Verificar si ya está registrado
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  const yaExiste = usuarios.some(u => u.email === email);
  if (yaExiste) {
    alert("Este correo ya está registrado.");
    return;
  }

  // Guardar usuario
  const nuevoUsuario = { email, username, password, rol };
  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Registro exitoso. Ahora puedes iniciar sesión.");
  document.getElementById("reg-email").value = "";
  document.getElementById("reg-username").value = "";
  document.getElementById("reg-password").value = "";
  document.getElementById("reg-rol").value = "usuario";
}

function iniciarSesion() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  const usuario = usuarios.find(u => u.email === email && u.password === password);

  if (!usuario) {
    alert("Correo o contraseña incorrectos. Asegúrate de estar registrado.");
    return;
  }

  alert(`Bienvenido, ${usuario.username} (${usuario.rol})`);
  // Puedes guardar en sessionStorage si necesitas saber quién inició sesión
  sessionStorage.setItem("usuarioActivo", JSON.stringify(usuario));
  
  // Redirigir
  window.location.href = "foro.html";
}

