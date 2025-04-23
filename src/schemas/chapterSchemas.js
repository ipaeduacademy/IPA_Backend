const { ObjectId } = require('mongodb');
const Joi = require('joi');


const postChapterSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    notes: Joi.string(),
});

const patchChapterSchema = postChapterSchema.keys({
    title: Joi.string(),
    description: Joi.string(),
    notes: Joi.string(),
}).or(
    'title',
    'description',
    'notes'
).required();


const chapterIndexSchema = Joi.object({
    courseId: Joi.string().required(),
    chapterIndex: Joi.string().required()
}).custom((value, helpers) => {
    if (!ObjectId.isValid(value.courseId)) {
		return helpers.message('Invalid course id');
	}
    value.chapterIndex = parseInt(value.chapterIndex);
    if (isNaN(value.chapterIndex) || value.chapterIndex < 0) {
        return helpers.message('Invalid chapter index');
    }
    return value;
}, 'custom validation for chapter index');


const chapterListIndexSchema = Joi.object({
    sourceIndex: Joi.number().integer().min(0).required(),
    destinationIndex: Joi.number().integer().min(0).required(),
});

module.exports = {
    postChapterSchema,
    patchChapterSchema,
    chapterIndexSchema,
    chapterListIndexSchema
};