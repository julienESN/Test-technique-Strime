const db = require('../db/db');

class ProductModel {
  static async getProduct(productId) {
    return db.oneOrNone('SELECT * FROM "Product" WHERE id = $1', [productId]);
  }
}

module.exports = ProductModel;
