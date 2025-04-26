const Joi = require("joi");

exports.imageSchema = Joi.object({
    file: Joi.object({
      originalname: Joi.string().required(),
      buffer: Joi.binary().required(),
      mimetype: Joi.string()
        .valid("image/jpeg", "image/png", "image/webp")
        .required(),
    })
      .required()
      .unknown(true), // 👈 allow extra keys like 'fieldname', 'size', etc.
  });