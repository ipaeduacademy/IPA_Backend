const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddlewares');
const { validateBody } = require('../middlewares/validationMiddlewares');
const { 
  addMainSlide, 
  getMainSlide, 
  updateMainSlide, 
  deleteMainSlide ,
  addFacultySlide,
  getFacultySlide,
  updateFacultySlide,
  deleteFacultySlide,
} = require('../controllers/contentController');
const { sliderSchema, facultySchema } = require('../schemas/contentSchema');

router.post('/content/mainSlide', authenticate, validateBody(sliderSchema), addMainSlide);
router.get('/content/mainSlide', authenticate, getMainSlide);
router.put('/content/mainSlide/:id', authenticate, validateBody(sliderSchema), updateMainSlide);
router.delete('/content/mainSlide/:id', authenticate, deleteMainSlide);

router.post('/content/facultySlide', authenticate, validateBody(facultySchema), addFacultySlide);
router.get('/content/facultySlide', authenticate, getFacultySlide);
router.put('/content/facultySlide/:id', authenticate, validateBody(facultySchema), updateFacultySlide);
router.delete('/content/facultySlide/:id', authenticate, deleteFacultySlide);

module.exports = router;