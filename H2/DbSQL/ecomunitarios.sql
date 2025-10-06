DROP DATABASE ecomunitarios;
CREATE DATABASE ecomunitarios;

DROP TABLE users;
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	password TEXT NOT NULL,
	role VARCHAR(20) DEFAULT 'participant' CHECK (role IN ('admin', 'participant')) NOT NULL,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE events;
CREATE TABLE events (
	id SERIAL PRIMARY KEY,
	title VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	event_date DATE NOT NULL,
	locacion VARCHAR(150),
	capacity INT CHECK(capacity > 0),
	organizer_id INT NOT NULL,
	FOREIGN KEY (organizer_id) REFERENCES users(id) ON DELETE CASCADE,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE registrations;
CREATE TABLE registrations (
	id SERIAL PRIMARY KEY,
	status VARCHAR(20) DEFAULT 'pending' CHECK( status IN ('pending', 'confirmed', 'canceled')) NOT NULL,
	user_id INT NOT NULL,
	event_id INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UNIQUE (user_id, event_id)
);

ALTER TABLE users
ALTER COLUMN "createdAt" SET DEFAULT now(),
ALTER COLUMN "updatedAt" SET DEFAULT now();



INSERT INTO users (name, email, password, role) VALUES
('Carlos Pérez', 'carlos@example.com', 'hashedpassword1', 'admin'),
('Ana Gómez', 'ana@example.com', 'hashedpassword2', 'participant'),
('Luis Torres', 'luis@example.com', 'hashedpassword3', 'participant'),
('Marta Rodríguez', 'marta@example.com', 'hashedpassword4', 'participant'),
('Pedro López', 'pedro@example.com', 'hashedpassword5', 'participant'),
('Laura Sánchez', 'laura@example.com', 'hashedpassword6', 'participant'),
('José Hernández', 'pipe@example.com', 'hashedpassword7', 'participant'),
('Lucía Morales', 'lucia@example.com', 'hashedpassword8', 'participant'),
('Andrés Ramírez', 'juan@example.com', 'hashedpassword9', 'participant'),
('María Fernanda', 'maria@example.com', 'hashedpassword10', 'participant');


INSERT INTO events (title, description, event_date, locacion, capacity, organizer_id) VALUES
('Taller de Programación', 'Aprende fundamentos de programación en Node.js', '2025-10-10', 'Biblioteca Central', 30, 1),
('Charla de Emprendimiento', 'Historias de éxito de emprendedores locales', '2025-10-15', 'Auditorio Municipal', 100, 1),
('Festival Cultural', 'Evento comunitario con música y danza', '2025-11-01', 'Parque Principal', 500, 2),
('Curso de Inglés', 'Clases intensivas de inglés para principiantes', '2025-11-05', 'Colegio San José', 40, 3),
('Jornada de Salud', 'Consulta médica gratuita para la comunidad', '2025-11-10', 'Centro de Salud', 200, 1),
('Competencia de Ajedrez', 'Torneo abierto a toda la comunidad', '2025-11-20', 'Casa de la Cultura', 50, 6),
('Limpieza Comunitaria', 'Jornada de limpieza en el barrio', '2025-12-01', 'Barrio San Juan', 100, 6),
('Mercado Agroecológico', 'Feria de productos locales y orgánicos', '2025-12-05', 'Plaza de Mercado', 80, 27),
('Feria de Ciencia', 'Exposición de proyectos científicos escolares', '2025-12-15', 'Escuela Técnica', 60, 28),
('Concierto Navideño', 'Concierto gratuito de coros y bandas locales', '2025-12-20', 'Teatro Municipal', 150, 29);


INSERT INTO registrations (status, user_id, event_id) VALUES
('confirmed', 2, 34),
('confirmed', 3, 35),
('pending', 27, 36),
('canceled', 28, 37),
('confirmed', 6, 38),
('pending', 29, 39),
('confirmed', 30, 40),
('confirmed', 31, 41),
('canceled', 32, 42),
('pending', 33, 43),
('confirmed', 34, 42),
('pending', 35, 41),
('confirmed', 36, 40),
('confirmed', 6, 39),
('pending', 1, 38);

SELECT * FROM users;
SELECT * FROM events;
SELECT * FROM registrations; 

