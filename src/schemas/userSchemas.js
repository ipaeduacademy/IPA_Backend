const joi = require("joi");

exports.userProgressSchema = joi.object({
  userId: joi.string().required(),
  courseId: joi.string().required(),
  modules: [
    {
      moduleId: joi.string().required(),
      moduleStatus: joi.string().valid("lock", "unlock").required(),
      videos: [
        {
          videoName: joi.string().required(),
          videoStatus: joi.string().valid("complete", "uncomplete").required(),
        }
      ],
      quiz: [
        {
          quizStatus: joi.string().valid("lock", "unlock").required(),
        }
      ]
    }
  ]
});

exports.userStatusSchema = joi.object({
  status: joi.string().valid("active", "suspended").required()
});