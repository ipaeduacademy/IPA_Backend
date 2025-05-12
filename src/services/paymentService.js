const Razorpay = require('razorpay');
const { ObjectId } = require('mongodb');
const db = require('../configs/dbConfigs').getDb(); // Assuming you're using MongoDB
const orders = db.collection('orders');  // Orders collection for storing orders
const { JWT_SECRET } = require('../configs/envConfigs');
const jwt = require('jsonwebtoken');
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,  // Replace with your Razorpay key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET// Replace with your Razorpay key secret
});

exports.createOrder = async ( {token, courseIds, amount} ) => {
  let payload;
  try {
    // Log the decoded payload for debugging
  
    payload = jwt.verify(token, JWT_SECRET); // Log the decoded payload for debugging
  } catch (err) {
    console.log(err)
    return { status: 400, data: { message: `Invalid or expired token ${err}` } };
  }

  try {
    const userId = payload.userId;
    const options = {
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      receipt: `order_${new Date().getTime()}`,
      notes: {
        userId: userId.toString(),
        courseIds: JSON.stringify(courseIds)
      }
    };

    const response = await razorpay.orders.create(options);
    console.log(response)
    const newOrder = {
      userId: ObjectId(userId),
      courseIds: courseIds.map(id => ObjectId(id)),
      amount,
      paymentStatus: 'pending',
      orderId: response.id,
      razorpayOrderId: response.id,
      razorpayPaymentId: null
    };

    const result = await orders.insertOne(newOrder);

    if (result.insertedId) {
      return {
        status: 'success',
        data: {
          orderId: response.id,
          amount: amount * 100,
          currency: 'INR'
        }
      };
    } else {
      throw new Error('Order creation failed');
    }
  } catch (err) {
    console.error(err);
    return {
      status: 'error',
      message: 'Error while creating order'
    };
  }
};

// Verify Payment (Call Razorpay API to verify payment status)
exports.verifyPayment = async ({ paymentToken, orderId, paymentStatus }) => {
  try {
    // Verify the payment status here, you might want to call Razorpay's payment verification API
    if (paymentStatus === 'success') {
      const payment = await razorpay.payments.fetch(paymentToken);
      
      if (payment.status === 'captured') {
        // Update order status in DB to 'paid'
        const result = await orders.updateOne(
          { orderId: orderId },
          { $set: { paymentStatus: 'paid', razorpayPaymentId: payment.id } }
        );

        if (result.modifiedCount > 0) {
          return { status: 'success', message: 'Payment successful' };
        }
        return { status: 'error', message: 'Failed to update payment status' };
      } else {
        return { status: 'error', message: 'Payment not captured' };
      }
    } else {
      // If payment fails, update the status to 'failed'
        await orders.updateOne(
        { orderId: orderId },
        { $set: { paymentStatus: 'failed' } }
      );
      return { status: 'error', message: 'Payment failed' };
    }
  } catch (err) {
    console.error(err);
    return { status: 'error', message: 'Error while verifying payment' };
  }
};
