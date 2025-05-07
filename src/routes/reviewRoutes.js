const express = require('express');
const router = express.Router();
const {addReview, getReviews} = require('../controllers/reviewController');
const { authenticate } = require('../middlewares/authMiddlewares');
const {validateBody} = require('../middlewares/validationMiddlewares')
const { review } = require('../schemas/reviewSchemas')

router.post('/addReview',authenticate,validateBody(review), addReview);
router.get('/getReviews/:courseId', getReviews);

module.exports = router;