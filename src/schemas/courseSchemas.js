const Joi = require('joi');

const videoSchema = Joi.object({
  videoName: Joi.string().required(),
  videoDescription: Joi.string().required(),
  videoDuration: Joi.string().required(),
  videoId: Joi.string().required(),
});

const quizSchema = Joi.object({
  quizName: Joi.string().required(),
  quizDescription: Joi.string().required(),
  quizDuration: Joi.string().required(),
  quizLink: Joi.string().uri().required(),
});

const chapterSchema = Joi.object({
  CourseId: Joi.string().required(),
  ModuleName: Joi.string().required(),
  ModuleDescription: Joi.string().required(),
  ModuleDuration: Joi.string().required(),
  Videos: Joi.array().items(videoSchema).required(),
  quizes: Joi.array().items(quizSchema).required(),
});

const reviewSchema = Joi.object({
  userName: Joi.string().required(),
  userDescription: Joi.string().required(),
  userRating: Joi.number().min(0).max(5).required(),
  timeStamp: Joi.date().required(),
});

const courseSchema = Joi.object({
  courseName: Joi.string().required(),
  status: Joi.string().valid('draft','published','unpublished').required(),
  heading: Joi.string().required(),
  courseTopic: Joi.string().required(),
  courseThumbNail: Joi.string().required(),
  coursePrice: Joi.string().required(),
  introVideo: Joi.string().required(),
  courseDescription: Joi.string().required(),
  rating: Joi.number().min(0).max(5).default(0),
  Features: Joi.object({
    watchTime: Joi.string().required(),
    chapters: Joi.string().required(),
    quizes: Joi.string().required(),
  }).required(),
});

module.exports = { courseSchema,chapterSchema, reviewSchema };
