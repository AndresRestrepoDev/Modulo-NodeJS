// === auth.js ===
const API_URL = "http://localhost:3002";

export function renderAuth(container) {
  container.innerHTML = `
    <section class="auth-section">
      <h2>🔐 Autenticación</h2>
      <div class="auth-forms">
        <div class="form-box">
          <h3>Registro</h3>
          <input type="text" id="register-name" placeholder="Nombre" required />
          <input type="email" id="register-email" placeholder="Correo electrónico" required />
          <input type="password" id="register-password" placeholder="Contraseña" required />
          <button id="register-btn">Registrarse</button>
          <p class="msg" id="register-msg"></p>
        </div>

        <div class="form-box">
          <h3>Login</h3>
          <input type="email" id="login-email" placeholder="Correo electrónico" required />
          <input type="password" id="login-password" placeholder="Contraseña" required />
          <button id="login-btn">Entrar</button>
          <p class="msg" id="login-msg"></p>
        </div>
      </div>
    </section>
  `;

  // Referencias a elementos
  const registerBtn = document.getElementById("register-btn");
  const loginBtn = document.getElementById("login-btn");

  registerBtn.addEventListener("click", registerUser);
  loginBtn.addEventListener("click", loginUser);
}

async function registerUser() {
  const name = document.getElementById("register-name").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value.trim();
  const msg = document.getElementById("register-msg");

  msg.textContent = "Procesando...";

  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      msg.textContent = data.message || "Error en el registro";
      msg.style.color = "red";
      return;
    }

    msg.textContent = "Usuario registrado correctamente ✅";
    msg.style.color = "green";
  } catch (error) {
    msg.textContent = "Error en el servidor";
    msg.style.color = "red";
  }
}

async function loginUser() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const msg = document.getElementById("login-msg");

  msg.textContent = "Procesando...";

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      msg.textContent = data.message || "Error al iniciar sesión";
      msg.style.color = "red";
      return;
    }

    // Guardamos token y usuario
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    msg.textContent = "Inicio de sesión exitoso ✅";
    msg.style.color = "green";

    // Redirigir automáticamente a la sección de eventos
    setTimeout(() => {
      const mainContent = document.getElementById("main-content");
      import("./main.js").then(({ loadSection }) => loadSection("events", mainContent));
    }, 1000);
  } catch (error) {
    msg.textContent = "Error de conexión con el servidor";
    msg.style.color = "red";
  }
}
