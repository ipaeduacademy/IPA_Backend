const express = require('express');
const router = express.Router();
const {addToCart,deleteFromCart,getCart } = require('../controllers/cartController');
const { validateBody } = require('../middlewares/validationMiddlewares');
const { cart } = require('../schemas/cartSchema');
const { authenticate } = require('../middlewares/authMiddlewares');

router.get('/getCart',authenticate, getCart);
router.post('/addToCart',authenticate, validateBody(cart), addToCart);
router.delete('/deleteFromCart',authenticate, validateBody(cart), deleteFromCart);

module.exports = router;
