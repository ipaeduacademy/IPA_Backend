const express = require('express');
const router = express.Router();
const { getUser, updateUserProgress, getUserProgress, addUserProgress } = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddlewares');
const { userProgressSchema } = require('../schemas/userSchemas');
const { validate } = require('../middlewares/validationMiddlewares');

router.get('/getUser', authenticate, getUser);
router.post('/addUserProgress', authenticate, validate(userProgressSchema), addUserProgress);
router.put('/updateUserProgress', authenticate, validate(userProgressSchema), updateUserProgress);
router.get('/getUserProgress', authenticate, getUserProgress);

module.exports = router;
