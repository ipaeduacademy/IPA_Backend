const Joi = require("joi");

exports.cart = Joi.object({
  courseId: Joi.string().required(),
});
