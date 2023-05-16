const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/:id', orderController.getOrderById);
router.get('/user/:userId', orderController.getOrdersByUser);

module.exports = router;
