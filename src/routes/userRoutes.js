const express = require('express');
const router = express.Router();
const { getUser, getUsers, updateUserStatus } = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddlewares');
const { validateBody } = require('../middlewares/validationMiddlewares');
const { userStatusSchema } = require('../schemas/userSchemas');


router.get('/getUser', authenticate, getUser);
router.get('/getUsers', authenticate, getUsers);
router.put('/updateUserStatus/:userId', authenticate, validateBody(userStatusSchema), updateUserStatus);

module.exports = router;
