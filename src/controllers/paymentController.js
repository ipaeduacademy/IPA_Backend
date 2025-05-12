const paymentService = require('../services/paymentService');

// Create Order
exports.createOrder = async (req, res) => {
  try {
    // Validate the input
    const { courseIds, amount } = req.body;

    const authHeader = req.headers.authorization; // Log the authorization header for debugging
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }
    const token = authHeader.split(' ')[1];
    // Call service to create Razorpay order
   
    const orderResponse = await paymentService.createOrder({ token,courseIds, amount });
   
    if (orderResponse.status === 'success') {
      return res.status(200).json({
        status: 'success',
        data: orderResponse.data,
      });
    } else {
      return res.status(400).json({
        status: 'error',
        message: orderResponse.message,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// Verify Payment (after successful payment)
exports.verifyPayment = async (req, res) => {
  try {
    // Validate the input
    const { paymentToken, orderId, paymentStatus } = req.body;

    // Call service to verify payment
    const verificationResponse = await paymentService.verifyPayment({
      paymentToken,
      orderId,
      paymentStatus,
    });

    if (verificationResponse.status === 'success') {
      return res.status(200).json({
        status: 'success',
        message: verificationResponse.message,
      });
    } else {
      return res.status(400).json({
        status: 'error',
        message: verificationResponse.message,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
