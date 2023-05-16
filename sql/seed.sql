-- seed.sql

-- Insert users
INSERT INTO "User" (username, password)
VALUES ('user1', 'password1'), ('user2', 'password2');

-- Insert products
INSERT INTO "Product" (name, price)
VALUES ('Product1', 10.00), ('Product2', 20.00);

-- Get user id for user1
DO $$ 
DECLARE 
    user_id integer;
BEGIN
    SELECT id INTO user_id FROM "User" WHERE username = 'user1';
    
    -- Insert a cart for user1
    INSERT INTO "Cart" (user_id)
    VALUES (user_id);
END $$;

-- Get cart id for user1's cart and product id for Product1
DO $$ 
DECLARE 
    cart_id integer;
    product_id integer;
BEGIN
    SELECT id INTO cart_id FROM "Cart" WHERE user_id = (SELECT id FROM "User" WHERE username = 'user1');
    SELECT id INTO product_id FROM "Product" WHERE name = 'Product1';
    
    -- Insert Product1 into user1's cart
    INSERT INTO "CartItems" (cart_id, product_id, quantity)
    VALUES (cart_id, product_id, 1);
END $$;
