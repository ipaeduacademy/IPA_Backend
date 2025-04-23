const express = require('express');

const { validateParams, validateBody } = require('../middlewares/validationMiddlewares');
const { postVideoSchema } = require('../schemas/videoSchemas');
const { chapterIndexSchema } = require('../schemas/chapterSchemas');
const {
    getVideoURLController,
    postVideoController,
    deleteVideoController
} = require('../controllers/videoControllers');

const router = express.Router({ mergeParams: true });

router.use('/videos/:courseId/:chapterIndex', validateParams(chapterIndexSchema));
router.route('/videos/:courseId/:chapterIndex')
    .post(validateBody(postVideoSchema), postVideoController)
    .delete(deleteVideoController);
    
router.route('/videos/:videoId')
    .get(getVideoURLController);
    
module.exports = router;