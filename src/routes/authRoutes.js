const express = require('express');
const router = express.Router();
const { signup, login, forgotPassword, resetPassword} = require('../controllers/authControllers');
const { validateBody } = require('../middlewares/validationMiddlewares');
const { signupSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } = require('../schemas/authSchemas');

router.post('/signup', validateBody(signupSchema), signup);
router.post('/login', validateBody(loginSchema), login);
router.post('/forgot-password', validateBody(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', validateBody(resetPasswordSchema), resetPassword);

module.exports = router;
