CREATE TABLE usuarios (
  id_user SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  create_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE libros (
  id_book SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  isbn VARCHAR(20),
  genre VARCHAR(50),
  language VARCHAR(50),
  cover_url TEXT,
  description TEXT,
  owner_id INTEGER NOT NULL REFERENCES usuarios(id_user)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  status VARCHAR(20) NOT NULL CHECK (status IN ('available', 'borrowed', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE libros_copias (
  id_copies SERIAL PRIMARY KEY,
  libro_id INTEGER NOT NULL REFERENCES libros(id_book),
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  condition VARCHAR(10) NOT NULL CHECK (condition IN ('new', 'good', 'worn')),
  availability_status VARCHAR(20) NOT NULL CHECK (availability_status IN ('available', 'borrowed', 'unavailable'))
);

CREATE TABLE prestamos (
  id_loans SERIAL PRIMARY KEY,
  book_id INTEGER NOT NULL REFERENCES libros(id_book),
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  borrower_id INTEGER NOT NULL REFERENCES usuarios(id_user),
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  owner_id INTEGER NOT NULL REFERENCES usuarios(id_user),
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  loan_date DATE NOT NULL DEFAULT CURRENT_DATE,
  return_date DATE NOT NULL,
  actual_return_date DATE,
  status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'returned', 'late', 'canceled'))
);

CREATE TABLE planes (
  id_plan SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  billing_cycle VARCHAR(10) NOT NULL CHECK (billing_cycle IN ('mensual', 'anual')),
  max_books_per_month INTEGER NOT NULL,
  description TEXT
);

CREATE TABLE referencias (
  id_reviews SERIAL PRIMARY KEY,
  book_id INTEGER NOT NULL REFERENCES libros(id_book),
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  reviewer_id INTEGER NOT NULL REFERENCES usuarios(id_user),
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notificaciones (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES usuarios(id_user),
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  type VARCHAR(30) NOT NULL CHECK (type IN ('loan_request', 'loan_due', 'loan_approved', 'loan_rejected', 'review_received')),
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subscripciones (
  id_subs SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES usuarios(id_user),
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  plan_id INTEGER NOT NULL REFERENCES planes(id_plan),
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE,
  status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'expired', 'canceled'))
);


INSERT INTO usuarios (name, last_name, email, password, phone, address, role)
VALUES
('Juan', 'Pérez', 'juan.perez@example.com', 'hashed_pass1', '3001112233', 'Calle 123 #45-67', 'admin'),
('María', 'Gómez', 'maria.gomez@example.com', 'hashed_pass2', '3002223344', 'Carrera 10 #11-22', 'user'),
('Carlos', 'Ramírez', 'carlos.ramirez@example.com', 'hashed_pass3', '3013334455', 'Av. Siempre Viva 742', 'user'),
('Ana', 'López', 'ana.lopez@example.com', 'hashed_pass4', '3024445566', 'Calle 45 #12-34', 'user');

INSERT INTO planes (name, price, billing_cycle, max_books_per_month, description)
VALUES
('Básico', 9.99, 'mensual', 3, 'Plan para usuarios casuales'),
('Premium', 19.99, 'mensual', 10, 'Plan para lectores frecuentes'),
('Anual Pro', 199.99, 'anual', 15, 'Plan anual con más beneficios');

INSERT INTO subscripciones (user_id, plan_id, start_date, end_date, status)
VALUES
(1, 2, '2025-01-01', '2025-12-31', 'active'),
(2, 1, '2025-02-15', '2025-03-15', 'expired'),
(3, 3, '2025-03-01', '2026-03-01', 'active'),
(4, 1, '2025-04-01', '2025-05-01', 'canceled');

INSERT INTO libros (title, author, isbn, genre, language, cover_url, description, owner_id, status)
VALUES
('Cien años de soledad', 'Gabriel García Márquez', '9780307474728', 'Novela', 'Español', 'url_cover_1', 'Obra maestra del realismo mágico.', 1, 'available'),
('Don Quijote de la Mancha', 'Miguel de Cervantes', '9788420431570', 'Clásico', 'Español', 'url_cover_2', 'La famosa novela española.', 2, 'available'),
('1984', 'George Orwell', '9780451524935', 'Distopía', 'Inglés', 'url_cover_3', 'Un mundo de vigilancia totalitaria.', 3, 'borrowed'),
('El Principito', 'Antoine de Saint-Exupéry', '9780156012195', 'Infantil', 'Francés', 'url_cover_4', 'Un clásico de la literatura infantil.', 1, 'inactive');

INSERT INTO libros_copias (libro_id, condition, availability_status)
VALUES
(1, 'new', 'available'),
(1, 'good', 'borrowed'),
(2, 'worn', 'available'),
(3, 'good', 'borrowed'),
(4, 'new', 'unavailable');

INSERT INTO prestamos (book_id, borrower_id, owner_id, loan_date, return_date, actual_return_date, status)
VALUES
(1, 2, 1, '2025-03-01', '2025-03-15', '2025-03-14', 'returned'),
(3, 4, 3, '2025-04-10', '2025-04-25', NULL, 'active'),
(2, 3, 2, '2025-01-05', '2025-01-20', '2025-01-25', 'late');

INSERT INTO referencias (book_id, reviewer_id, rating, comment)
VALUES
(1, 2, 5, 'Increíble novela, totalmente recomendada.'),
(2, 3, 4, 'Muy buena, aunque un poco larga.'),
(3, 4, 5, 'Obra maestra, muy actual.'),
(1, 4, 3, 'Interesante pero difícil de seguir.');

INSERT INTO notificaciones (user_id, type, message, read)
VALUES
(1, 'loan_request', 'María ha solicitado tu libro Cien años de soledad.', FALSE),
(2, 'loan_due', 'Tu préstamo de Don Quijote vence mañana.', FALSE),
(3, 'review_received', 'Recibiste una nueva reseña en tu libro 1984.', TRUE),
(4, 'loan_approved', 'Tu solicitud para El Principito fue aprobada.', FALSE);
