const Joi = require('joi');

const videoSchema = Joi.object({
  videoName: Joi.string().required(),
  videoDescription: Joi.string().required(),
  videoDuration: Joi.string().required(),
  videoId: Joi.string().required(),
});

const quizSchema = Joi.object({
  quizName: Joi.string().required(),
  quizLink: Joi.string().uri().required(),
});

const chapterSchema = Joi.object({
  CourseId: Joi.string().required(),
  ModuleName: Joi.string().required(),
  ModuleDescription: Joi.string(),
  ModuleDuration: Joi.string(),
  Videos: Joi.array().items(videoSchema),
  quizes: Joi.array().items(quizSchema),
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
  courseThumbNail: Joi.string(),
  coursePrice: Joi.string().required(),
  courseDescription: Joi.string().required(),
  rating: Joi.number().min(0).max(5).default(0),
  Features: Joi.object({
    watchTime: Joi.string().required(),
    chapters: Joi.string().required(),
    quizes: Joi.string().required(),
  }).required(),
});

const AccessSchema = Joi.object({
  courseId: Joi.string().required(),
  email: Joi.string().email().required(),
});

const ProgressSchema = Joi.object({
  courseId: Joi.string().required(),
  moduleId: Joi.string().required(),
  videoId: Joi.string().required(),
});

const getProgressSchema = Joi.object({
  courseId: Joi.string().required(),
});

module.exports = { courseSchema,chapterSchema, reviewSchema ,AccessSchema,ProgressSchema,getProgressSchema};
