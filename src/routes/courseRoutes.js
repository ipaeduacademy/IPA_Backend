const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseControllers');
const { validateBody,validateQueries } = require('../middlewares/validationMiddlewares');
const { courseSchema, chapterSchema ,AccessSchema,ProgressSchema ,getProgressSchema} = require('../schemas/courseSchemas');
const { authenticate } = require('../middlewares/authMiddlewares');

// Public route - no authentication
router.get('/getCourses/:page', courseController.getAllCourses);
router.get('/getCourse/:id', courseController.getCourseById);
router.get('/getCourseData/:id', courseController.getCourseDataById);

// Protected routes - require authentication
router.get('/myCourses',authenticate,courseController.getMycourses)
router.get('/chapter/course/:id',authenticate,courseController.getChaptersByCourseId);
router.get('/getVideos/:id',authenticate,courseController.getVideos);
router.get('/getProgress/:id',authenticate,courseController.getProgress);
router.post('/addCourse', authenticate, validateBody(courseSchema), courseController.createCourse);
router.put('/updateCourse/:id', authenticate, validateBody(courseSchema), courseController.updateCourse);
router.delete('/deleteCourse/:id', authenticate, courseController.deleteCourse);
router.post('/addChapter', authenticate, validateBody(chapterSchema), courseController.addChapter);
router.put('/updateChapter/:id', authenticate, validateBody(chapterSchema), courseController.updateChapter);
router.delete('/deleteChapter/:id', authenticate, courseController.deleteChapter);
router.post('/giveAccess', authenticate, validateBody(AccessSchema), courseController.giveAccess);
router.post('/updateProgress', authenticate, validateBody(ProgressSchema), courseController.updateProgress);

module.exports = router;
