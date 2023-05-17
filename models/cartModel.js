const db = require('../db/db');

exports.createCart = async (userId) => {
  return db.none('INSERT INTO "Cart" (user_id) VALUES ($1)', [userId]);
};

exports.getCart = async (cartId) => {
  try {
    const query = 'SELECT * FROM "Cart" WHERE id = $1';
    const values = [cartId];
    const cart = await db.oneOrNone(query, values);
    if (!cart) {
      throw new Error('Cart not found');
    }

    const productsQuery = `
      SELECT c.cart_id, c.product_id, c.quantity, p.name, p.price
      FROM "CartItems" c
      INNER JOIN "Product" p ON c.product_id = p.id
      WHERE c.cart_id = $1
    `;
    const products = await db.any(productsQuery, [cartId]);

    cart.items = products;

    return cart;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
exports.addProduct = async (cartId, productId, quantity) => {
  try {
    const query = `
      INSERT INTO "CartItems" (cart_id, product_id, quantity)
      VALUES ($1, $2, $3)
    `;
    const values = [cartId, productId, quantity];
    await db.none(query, values);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
exports.removeProduct = async (cartId, productId) => {
  return db.none(
    'DELETE FROM "CartItems" WHERE cart_id = $1 AND product_id = $2',
    [cartId, productId]
  );
};

exports.updateQuantity = async (cartId, productId, quantity) => {
  return db.none(
    'UPDATE "CartItems" SET quantity = $3 WHERE cart_id = $1 AND product_id = $2',
    [cartId, productId, quantity]
  );
};
exports.emptyCart = async (cartId) => {
  return db.none('DELETE FROM "CartItems" WHERE cart_id = $1', [cartId]);
};
exports.checkout = async (cartId) => {
  return db.tx(async (t) => {
    const items = await t.any('SELECT * FROM "CartItems" WHERE cart_id = $1', [
      cartId,
    ]);
    for (let item of items) {
      await t.none(
        'INSERT INTO "Order" (user_id, product_id, quantity) VALUES ($1, $2, $3)',
        [item.user_id, item.product_id, item.quantity]
      );
      await t.none('DELETE FROM "CartItems" WHERE cart_id = $1', [
        item.cart_id,
      ]);
    }
  });
};
