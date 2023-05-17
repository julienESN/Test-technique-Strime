const express = require('express');
const cartController = require('../controllers/cartController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.post('/', authenticateToken, cartController.createCart);
router.get('/:id', authenticateToken, cartController.getCart);
router.post('/:id/products', authenticateToken, cartController.addProduct);
router.delete(
  '/:id/products/:productId',
  authenticateToken,
  cartController.removeProduct
);
router.patch(
  '/:id/products/:productId',
  authenticateToken,
  cartController.updateQuantity
);
router.post('/:id/checkout', authenticateToken, cartController.checkout);

module.exports = router;
