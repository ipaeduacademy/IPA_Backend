const Joi = require('joi');

const postVideoSchema = Joi.object({
    title: Joi.string().required()
});

const videoSchema = Joi.object({
    collectionId: Joi.string().required(),
    Videos: Joi.array().items(
        Joi.object({
            title: Joi.string().required(),
            videoId: Joi.string().required()
        })
    ).required()
});


module.exports = {
    postVideoSchema,
    videoSchema
};