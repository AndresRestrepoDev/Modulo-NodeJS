const API_URL = "http://localhost:3002";

document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.getElementById("main-content");
  const navButtons = document.querySelectorAll(".nav-btn");
  const userInfo = document.getElementById("user-info");

  // Cargar info de usuario si hay token
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (token && user) {
    userInfo.innerHTML = `
      <p><strong>Usuario:</strong> ${user.name}</p>
      <p><strong>Rol:</strong> ${user.role || "Sin rol"}</p>
      <button id="logout-btn">Cerrar sesión</button>
    `;
    document.getElementById("logout-btn").addEventListener("click", logout);
  } else {
    userInfo.innerHTML = `<p>No has iniciado sesión</p>`;
  }

  // Manejador de navegación lateral
  navButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const section = btn.dataset.section;
      await loadSection(section, mainContent);
    });
  });
});

// main.js
async function loadSection(section, container) {
  container.innerHTML = "<p>Cargando...</p>";

  if (section === "auth") {
    const { renderAuth } = await import("./auth.js");
    renderAuth(container);
  } else if (section === "events") {
    const { renderEvents } = await import("./events.js");
    renderEvents(container);
  } else {
    container.innerHTML = `<h2>${section}</h2><p>Sección aún no disponible</p>`;
  }
}


function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  location.reload();
}

import { renderAuth } from "./auth.js";
import { renderEvents } from "./events.js";
import { renderRegistrations } from "./registrations.js"; // 👈 nuevo

document.addEventListener("DOMContentLoaded", () => {
  const navAuth = document.getElementById("nav-auth");
  const navEvents = document.getElementById("nav-events");
  const navRegistrations = document.getElementById("nav-registrations"); // 👈 nuevo
  const logoutBtn = document.getElementById("logout-btn");
  const mainContent = document.getElementById("main-content");

  navAuth.addEventListener("click", () => renderAuth(mainContent));
  navEvents.addEventListener("click", () => renderEvents(mainContent));
  navRegistrations.addEventListener("click", () => renderRegistrations(mainContent)); // 👈 nuevo

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Sesión cerrada.");
    renderAuth(mainContent);
    logoutBtn.style.display = "none";
  });

  // Render inicial
  if (localStorage.getItem("token")) {
    renderEvents(mainContent);
    logoutBtn.style.display = "block";
  } else {
    renderAuth(mainContent);
  }
});
