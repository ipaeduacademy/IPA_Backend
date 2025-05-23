const express = require('express');
const router = express.Router();
const { getUser} = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddlewares');


router.get('/getUser', authenticate, getUser);

module.exports = router;
