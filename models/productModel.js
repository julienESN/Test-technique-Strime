const db = require('../db/db');

class ProductModel {
  static async getProduct(productId) {
    try {
      console.log('Executing getProduct query...');
      const product = await db.oneOrNone(
        'SELECT * FROM "Product" WHERE id = $1',
        [productId]
      );
      console.log('getProduct query result:', product);
      return product;
    } catch (error) {
      console.error('Error in getProduct:', error);
      throw error;
    }
  }

  static async getProducts(productIds) {
    try {
      const parsedProductIds = productIds.map((id) => parseInt(id, 10));
      const query = 'SELECT * FROM "Product" WHERE id IN ($1:csv)';
      const products = await db.any(query, [parsedProductIds]);
      return products;
    } catch (error) {
      console.error('Error in getProducts:', error);
      throw error;
    }
  }
}

module.exports = ProductModel;
