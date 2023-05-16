const db = require('../db/db');

exports.createCart = async (userId) => {
  return db.none('INSERT INTO "Cart" (user_id) VALUES ($1)', [userId]);
};

exports.getCart = async (cartId) => {
  try {
    const query = 'SELECT * FROM "Cart" WHERE id = $1';
    const values = [cartId];
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw new Error('Error retrieving cart from the database');
  }
};
exports.addProduct = async (cartId, productId, quantity) => {
  return db.none(
    'INSERT INTO "CartItems" (cart_id, product_id, quantity) VALUES ($1, $2, $3)',
    [cartId, productId, quantity]
  );
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
