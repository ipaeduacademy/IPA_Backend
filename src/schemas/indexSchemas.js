const Joi = require('joi');

const indexDataSchema = Joi.object({
    name: Joi.string().required()
});

module.exports = {
    indexDataSchema
};