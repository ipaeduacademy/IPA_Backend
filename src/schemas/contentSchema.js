const joi = require("joi");

exports.sliderSchema = joi.object({
  title: joi.string().trim().required(),
  url: joi.string().uri().required(),
});