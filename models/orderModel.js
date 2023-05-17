const db = require('../db/db');

class OrderModel {
  static async createOrder(userId, totalAmount) {
    return db.one(
      'INSERT INTO "Order" (user_id, total_amount) VALUES ($1, $2) RETURNING id',
      [userId, totalAmount]
    );
  }

  static async getOrder(orderId) {
    return db.oneOrNone(
      'SELECT id, user_id, total_amount FROM "Order" WHERE id = $1',
      [orderId]
    );
  }

  static async addProduct(orderId, productId, quantity) {
    return db.none(
      'INSERT INTO "OrderProduct" (order_id, product_id, quantity) VALUES ($1, $2, $3)',
      [orderId, productId, quantity]
    );
  }

  static async getProducts(orderId) {
    return db.manyOrNone('SELECT * FROM "OrderProduct" WHERE order_id = $1', [
      orderId,
    ]);
  }
}

module.exports = OrderModel;
