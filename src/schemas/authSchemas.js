const Joi = require("joi");

exports.signupSchema = Joi.object({
  name: Joi.string().required().trim(),
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(6).required().trim(),
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required().trim(),
  password: Joi.string().required().trim(),
});

exports.forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

exports.resetPasswordSchema = Joi.object({
    password: Joi.string().min(6).required(),
});