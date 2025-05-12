const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment } = require('../controllers/paymentController');
const { validateBody } = require('../middlewares/validationMiddlewares');
const { createOrderSchema, verifyPaymentSchema } = require('../schemas/paymentSchema');

// Route to create an order
router.post('/create-order', validateBody(createOrderSchema), createOrder);
// Route to verify payment after the transaction
router.post('/verify-payment', validateBody(verifyPaymentSchema), verifyPayment);
module.exports = router;
