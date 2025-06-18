const joi = require("joi");

exports.sliderSchema = joi.object({
  title: joi.string().trim().required(),
  url: joi.string().uri().required(),
});

exports.facultySchema = joi.object({
  name: joi.string().trim().required(),
  designation: joi.string().trim().required(),
  url: joi.string().uri().required(),
});