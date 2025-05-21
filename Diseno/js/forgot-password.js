function recuperarContrasena() {
  const email = document.getElementById("forgot-email").value.trim();
  const mensaje = document.getElementById("mensaje");

  if (!email.endsWith("@usa.edu.co")) {
    mensaje.textContent = "El correo debe ser institucional (@usa.edu.co)";
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  const usuario = usuarios.find(u => u.email === email);

  if (!usuario) {
    mensaje.textContent = "No se encontró una cuenta con ese correo.";
    return;
  }

  // Simulación: mostrar la contraseña registrada
  mensaje.innerHTML = `Tu contraseña registrada es: <strong>${usuario.password}</strong>`;
}
