const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseControllers');
const { validateBody } = require('../middlewares/validationMiddlewares');
const { courseSchema,chapterSchema } = require('../schemas/courseSchemas');
const { authenticate } = require('../middlewares/authMiddlewares');

router.use(authenticate);
router.post('/addCourse', validateBody(courseSchema), courseController.createCourse);
router.get('/getCourses', courseController.getAllCourses);
router.get('/getCourse/:id', courseController.getCourseById);
router.put('/updateCourse/:id', validateBody(courseSchema), courseController.updateCourse);
router.delete('/deleteCourse/:id', courseController.deleteCourse);
router.get('/chapter/course/:id', courseController.getChaptersByCourseId);
router.post('/addChapter', validateBody(chapterSchema), courseController.addChapter);
router.put('/updateChapter/:id', validateBody(chapterSchema), courseController.updateChapter);
router.delete('/deleteChapter/:id', courseController.deleteChapter);


module.exports = router;
