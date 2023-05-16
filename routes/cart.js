const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/', cartController.createCart);
// router.get('/:id', cartController.getCart);
router.post('/:id/product', cartController.addProduct);
router.delete('/:id/product/:productId', cartController.removeProduct);
router.put('/:id/product/:productId', cartController.updateQuantity);
router.post('/:id/checkout', cartController.checkout);

module.exports = router;
