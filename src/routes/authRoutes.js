const express = require('express');
const router = express.Router();
const { signup, login, forgotPassword, resetPassword, getUser } = require('../controllers/authControllers');
const { validateBody } = require('../middlewares/validationMiddlewares');
const { signupSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } = require('../schemas/authSchemas');
const { authenticate } = require('../middlewares/authMiddlewares');

router.post('/signup', validateBody(signupSchema), signup);
router.post('/login', validateBody(loginSchema), login);
router.post('/forgot-password', validateBody(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', validateBody(resetPasswordSchema), resetPassword);
router.get('/getUser', authenticate, getUser);

module.exports = router;
