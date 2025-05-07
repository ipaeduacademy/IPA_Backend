const express = require('express');
const router = express.Router();
const {addContact} = require('../controllers/contactController')
const {validateBody} = require('../middlewares/validationMiddlewares')
const { contact } = require('../schemas/contactSchemas')

router.post('/contact',validateBody(contact), addContact);

module.exports = router;