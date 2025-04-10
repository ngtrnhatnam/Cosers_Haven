// backend/routers/carts.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/carts');

router.get('/:customerId', cartController.getCartByCustomer);
router.post('/:customerId', cartController.addItemToCart);
router.put('/:customerId/items/:costumeId', cartController.updateCartItem);
router.delete('/:customerId/items/:costumeId', cartController.removeCartItem);
router.post('/:customerId/checkout', cartController.checkoutCart);

module.exports = router;