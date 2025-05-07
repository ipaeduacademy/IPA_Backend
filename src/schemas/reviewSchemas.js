const Joi = require("joi");

exports.review = Joi.object({
  courseId: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().required()
});
