CREATE TABLE IF NOT EXISTS "User" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Product" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Order" (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "User"(id),
    product_id INTEGER REFERENCES "Product"(id),
    quantity INTEGER NOT NULL
    
);
ALTER TABLE "Order" ADD COLUMN total_amount DECIMAL(10,2);
CREATE TABLE IF NOT EXISTS "Cart" (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "User"(id)
);

CREATE TABLE IF NOT EXISTS "CartItems" (
    id SERIAL PRIMARY KEY,
    cart_id INTEGER REFERENCES "Cart"(id),
    product_id INTEGER REFERENCES "Product"(id),
    quantity INTEGER NOT NULL
);
