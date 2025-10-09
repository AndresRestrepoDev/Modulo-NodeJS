// === events.js ===
import { registerToEvent } from "./registrations.js";

const API_URL = "http://localhost:3002";

export function renderEvents(container) {
  container.innerHTML = `
    <section class="events-section">
      <h2>🎉 Gestión de Eventos</h2>

      <div class="event-actions">
        <input type="text" id="search-keyword" placeholder="Buscar por nombre o ubicación..." />
        <button id="search-btn">🔍 Buscar</button>
        <button id="future-btn">📅 Eventos futuros</button>
        <button id="refresh-btn">🔄 Ver todos</button>
        <button id="create-btn">➕ Crear evento</button>
      </div>

      <div id="events-list"></div>

      <div id="event-form-container" class="modal hidden"></div>
    </section>
  `;

  document.getElementById("search-btn").addEventListener("click", searchEvents);
  document.getElementById("future-btn").addEventListener("click", getFutureEvents);
  document.getElementById("refresh-btn").addEventListener("click", getAllEvents);
  document.getElementById("create-btn").addEventListener("click", showCreateForm);

  getAllEvents(); // carga inicial
}

// ======== FUNCIONES ======== //

async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${url}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error en la solicitud");
  return data.data || data;
}

async function getAllEvents() {
  const list = document.getElementById("events-list");
  list.innerHTML = "<p>Cargando eventos...</p>";

  try {
    const events = await apiFetch("/event");
    renderEventList(events);
  } catch (err) {
    list.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
}

async function searchEvents() {
  const keyword = document.getElementById("search-keyword").value.trim();
  if (!keyword) return alert("Ingresa una palabra para buscar");

  const list = document.getElementById("events-list");
  list.innerHTML = "<p>Buscando...</p>";

  try {
    const events = await apiFetch(`/event/search/${keyword}`);
    renderEventList(events);
  } catch (err) {
    list.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
}

async function getFutureEvents() {
  const list = document.getElementById("events-list");
  list.innerHTML = "<p>Cargando eventos futuros...</p>";

  try {
    const events = await apiFetch(`/event/future`);
    renderEventList(events);
  } catch (err) {
    list.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
}

function renderEventList(events) {
  const list = document.getElementById("events-list");
  if (!events || events.length === 0) {
    list.innerHTML = "<p>No hay eventos disponibles</p>";
    return;
  }

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  list.innerHTML = `
    <table class="event-table">
      <thead>
        <tr>
          <th>ID</th><th>Título</th><th>Ubicación</th><th>Fecha</th><th>Organizador</th><th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        ${events
          .map(
            (ev) => `
          <tr>
            <td>${ev.id}</td>
            <td>${ev.title}</td>
            <td>${ev.locacion || "—"}</td>
            <td>${new Date(ev.event_date).toLocaleDateString()}</td>
            <td>${ev.organizer_id}</td>
            <td>
              ${
                ev.organizer_id === user.id
                  ? `
                <button onclick="editEvent(${ev.id})">✏️</button>
                <button onclick="deleteEvent(${ev.id})">🗑️</button>`
                  : user.role === "participant"
                  ? `<button onclick="registerToEvent(${ev.id})">🧾 Inscribirme</button>`
                  : "<em>Sin permisos</em>"
              }
            </td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>
  `;
}

// ===== CRUD ===== //

function showCreateForm() {
  const modal = document.getElementById("event-form-container");
  modal.innerHTML = `
    <div class="modal-content">
      <h3>➕ Nuevo evento</h3>
      <input type="text" id="event-title" placeholder="Título" />
      <input type="text" id="event-description" placeholder="Descripción" />
      <input type="date" id="event-date" />
      <input type="text" id="event-locacion" placeholder="Ubicación" />
      <input type="number" id="event-capacity" placeholder="Capacidad" />
      <button id="save-event">Guardar</button>
      <button id="close-modal">Cancelar</button>
    </div>
  `;
  modal.classList.remove("hidden");

  document.getElementById("close-modal").onclick = () => modal.classList.add("hidden");
  document.getElementById("save-event").onclick = async () => {
    const title = document.getElementById("event-title").value.trim();
    const description = document.getElementById("event-description").value.trim();
    const date = document.getElementById("event-date").value;
    const locacion = document.getElementById("event-locacion").value.trim();
    const capacity = document.getElementById("event-capacity").value;

    try {
      await apiFetch("/event", {
        method: "POST",
        body: JSON.stringify({ title, description, event_date: date, locacion, capacity }),
      });
      modal.classList.add("hidden");
      getAllEvents();
    } catch (err) {
      alert("Error creando evento: " + err.message);
    }
  };
}

window.editEvent = async (id) => {
  const title = prompt("Nuevo título del evento:");
  if (!title) return;

  try {
    await apiFetch(`/event/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title }),
    });
    getAllEvents();
  } catch (err) {
    alert("Error actualizando: " + err.message);
  }
};

window.deleteEvent = async (id) => {
  if (!confirm("¿Eliminar este evento?")) return;
  try {
    await apiFetch(`/event/${id}`, { method: "DELETE" });
    getAllEvents();
  } catch (err) {
    alert("Error eliminando: " + err.message);
  }
};
