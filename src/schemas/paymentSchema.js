const Joi = require('joi');

// Schema for creating an order (taking course ids as input)
exports.createOrderSchema = Joi.object({
  courseIds: Joi.array().items(Joi.string()).required(),  // List of course IDs
  amount: Joi.number().required(),  // Total amount for payment
});

// Schema for verifying the payment after successful transaction
exports.verifyPaymentSchema = Joi.object({
  paymentToken: Joi.string().required(),  // Payment gateway token received after payment
  orderId: Joi.string().required(),  // Order ID from the payment gateway
  paymentStatus: Joi.string().valid('success', 'failed').required(),  // Payment status
});
