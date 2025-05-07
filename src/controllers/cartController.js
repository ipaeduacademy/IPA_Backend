const cartService = require('../services/cartServices');

exports.addToCart = async (req, res) => {
  try {
    const authHeader = req.headers.authorization; // Log the authorization header for debugging
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }
    const token = authHeader.split(' ')[1];
    const result = await cartService.addToCart(token, req.body.courseId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteFromCart = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }
    const token = authHeader.split(' ')[1];
    const result = await cartService.deleteFromCart(token, req.body.courseId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};


exports.getCart = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }
    const token = authHeader.split(' ')[1];
    const result = await cartService.getCart(token);
    res.status(200).json({ cartData: result });
  } catch (err) {
    next(err);
  }
};
