const Joi = require("joi");

exports.contact = Joi.object({
  name: Joi.string().trim().required(),
  phone: Joi.string().trim().required(),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } }) // Validates email format
    .required(),
  message: Joi.string().trim().required(),
});