const router = require('express').Router({ mergeParams: true });

const { validateBody } = require('../middlewares/validationMiddlewares');
const { indexDataSchema } = require('../schemas/indexSchemas');
const { getIndexController, postIndexController, deleteIndexController } = require('../controllers/indexControllers');

router.route('/')
    .get(getIndexController)
    .post(validateBody(indexDataSchema), postIndexController)
    .delete(validateBody(indexDataSchema), deleteIndexController);

module.exports = router;