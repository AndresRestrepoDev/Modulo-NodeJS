// === js/registrations.js ===
const API_URL = "http://localhost:3002/registration";

export function renderRegistrations(container) {
  container.innerHTML = `
    <h2>🧾 Mis Inscripciones</h2>
    <button id="btn-load-registrations">🔄 Cargar inscripciones</button>
    <div id="registrations-list"></div>
  `;

  document
    .getElementById("btn-load-registrations")
    .addEventListener("click", loadRegistrations);

  loadRegistrations(); // Cargar al entrar
}

async function loadRegistrations() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Debes iniciar sesión para ver tus inscripciones.");
    return;
  }

  try {
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    const list = document.getElementById("registrations-list");

    if (!res.ok) {
      list.innerHTML = `<p style="color:red;">Error: ${data.message}</p>`;
      return;
    }

    const registrations = data.data || [];

    if (registrations.length === 0) {
      list.innerHTML = "<p>No tienes inscripciones todavía.</p>";
      return;
    }

    list.innerHTML = registrations
      .map(
        (r) => `
        <div class="registration-card">
          <p><b>ID:</b> ${r.id}</p>
          <p><b>Evento:</b> ${r.event_id}</p>
          <p><b>Estado:</b> ${r.status}</p>
          <button onclick="cancelRegistration(${r.id})">❌ Cancelar</button>
        </div>
      `
      )
      .join("");
  } catch (error) {
    console.error("Error cargando inscripciones:", error);
  }
}

window.cancelRegistration = async function (id) {
  const token = localStorage.getItem("token");
  if (!token) return alert("Debes iniciar sesión.");

  if (!confirm("¿Seguro que deseas cancelar esta inscripción?")) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    alert(data.message || "Inscripción cancelada.");
    loadRegistrations();
  } catch (error) {
    console.error("Error eliminando inscripción:", error);
  }
};

// 📌 Función auxiliar para inscribirse desde events.js
export async function registerToEvent(eventId) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) return alert("Debes iniciar sesión para inscribirte.");
  if (user.role !== "participant")
    return alert("Solo los participantes pueden inscribirse a eventos.");

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ event_id: eventId }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Error al inscribirse.");

    alert("✅ Inscripción creada exitosamente.");

    // Si el usuario está viendo sus inscripciones, refrescamos la lista
    if (document.getElementById("registrations-list")) {
      loadRegistrations();
    }
  } catch (error) {
    console.error("Error al inscribirse:", error);
    alert("❌ " + error.message);
  }
}
