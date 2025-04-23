const express = require('express');

const { validateParams, validateBody } = require('../middlewares/validationMiddlewares');
const {
    postChapterSchema,
    patchChapterSchema,
    chapterIndexSchema,
    chapterListIndexSchema
} = require('../schemas/chapterSchemas');
const {
    courseIdSchema
} = require('../schemas/courseSchemas');
const {
    getChaptersController,
    postChapterController,
    patchChapterController,
    deleteChapterController,
    patchChapterListController
} = require('../controllers/chapterControllers');

const router = express.Router({ mergeParams: true });


router.route('/chapters/:courseId')
    .get(validateParams(courseIdSchema), getChaptersController);
    
router.use('/chapters/:courseId/:chapterIndex', validateParams(chapterIndexSchema));
router.route('/chapters/:courseId/:chapterIndex')
    .post(validateBody(postChapterSchema), postChapterController)
    .patch(validateBody(patchChapterSchema), patchChapterController)
    .delete(deleteChapterController);

router.route('/chapter-list/:courseId')
    .patch(validateParams(courseIdSchema), validateBody(chapterListIndexSchema), patchChapterListController);

module.exports = router;