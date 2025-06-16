const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddlewares');
const { validateBody } = require('../middlewares/validationMiddlewares');
const { addMainSlide, getMainSlide, updateMainSlide, deleteMainSlide } = require('../controllers/contentController');

router.post('/content/mainSlide', authenticate, addMainSlide);
router.get('/content/mainSlide', authenticate, getMainSlide);
router.put('/content/mainSlide/:id', authenticate, updateMainSlide);
router.delete('/content/mainSlide/:id', authenticate, deleteMainSlide);

module.exports = router;