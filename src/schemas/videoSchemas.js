const Joi = require('joi');

const postVideoSchema = Joi.object({
    title: Joi.string().required()
});




module.exports = {
    postVideoSchema
};