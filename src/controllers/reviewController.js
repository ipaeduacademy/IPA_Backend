const reviewService = require('../services/reviewServices');

exports.addReview = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer')) {
      return res.status(401).json({ success: false, error: 'Missing or invalid Authorization header' });
    }

    const token = authHeader.split(' ')[1];
    const result = await reviewService.addReview(token, req.body);
    res.status(result.status).json(result.data);
  } catch (err) {
    next(err);
  }
};

exports.getReviews = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const result = await reviewService.getReview(courseId);
    res.status(result.status).json(result.data);
  } catch (err) {
    next(err);
  }
};
