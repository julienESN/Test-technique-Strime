CREATE TABLE IF NOT EXISTS "Users" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Products" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Orders" (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "Users"(id),
    product_id INTEGER REFERENCES "Products"(id),
    quantity INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS "Carts" (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "Users"(id),
    product_id INTEGER REFERENCES "Products"(id),
    quantity INTEGER NOT NULL
);
