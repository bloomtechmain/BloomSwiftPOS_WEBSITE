const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create new order
router.post('/create', orderController.createOrder);

// Get order by ID
router.get('/:id', orderController.getOrder);

// Get user orders
router.get('/user/:userId', orderController.getUserOrders);

// Get all orders (admin)
router.get('/', orderController.getAllOrders);

// Update order status
router.put('/:id/status', orderController.updateOrderStatus);

// Payment processing endpoints
router.post('/:id/payment/stripe', orderController.processStripePayment);
router.post('/:id/payment/paypal', orderController.processPayPalPayment);
router.post('/:id/payment/payhere', orderController.processPayHerePayment);

module.exports = router;
