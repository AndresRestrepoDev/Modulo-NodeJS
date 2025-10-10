CREATE DATABASE inventario_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'analyst' CHECK (role IN ('admin', 'analyst')),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE warehouses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(150),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    stock INTEGER DEFAULT 0 CHECK (stock >= 0),
    warehouse_id INTEGER REFERENCES warehouses(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE movements (
    id SERIAL PRIMARY KEY,
    type VARCHAR(20) NOT NULL CHECK (type IN ('entrada', 'salida', 'traslado')),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    warehouse_origin_id INTEGER REFERENCES warehouses(id) ON DELETE SET NULL,
    warehouse_destiny_id INTEGER REFERENCES warehouses(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

SELECT * FROM users;
SELECT * FROM warehouses;
SELECT * FROM products;

INSERT INTO users (name, email, password, role) VALUES
('Admin Principal', 'admin@example.com', 'hashedpassword', 'admin'),
('Analista Inventarios', 'analyst@example.com', 'hashedpassword', 'analyst');

INSERT INTO warehouses (name, location) VALUES
('Bodega Central', 'Bogotá'),
('Bodega Norte', 'Medellín');

INSERT INTO products (name, code, stock, warehouse_id) VALUES
('Laptop Dell', 'PROD001', 20, 1),
('Monitor Samsung', 'PROD002', 15, 1),
('Teclado Logitech', 'PROD003', 10, 2);

