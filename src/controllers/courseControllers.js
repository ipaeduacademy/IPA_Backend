const courseService = require('../services/courseServices');

exports.createCourse = async (req, res, next) => {
  try {
    const result = await courseService.createCourse(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getAllCourses = async (req, res, next) => {
    try {
      console.log("all courses called")
      console.log(req.params.page)
      const page = parseInt(req.params.page) || 1;
      const result = await courseService.getAllCourses(page);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
  

exports.getCourseById = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const result = await courseService.getCourseById(req.params.id);
    if (!result) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getCourseDataById = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const courseData = await courseService.getCourseById(req.params.id);
    const chapters = await courseService.getChaptersByCourseId(req.params.id);
    const result = {
      courseData: courseData,
      chapters: chapters,
    };
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const result = await courseService.updateCourse(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    await courseService.deleteCourse(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.getChaptersByCourseId = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const chapters = await courseService.getChaptersByCourseId(courseId);

    res.status(200).json({ chapters });
  } catch (err) {
    next(err);
  }
};


exports.addChapter = async (req, res, next) => {
  try {
    const result = await courseService.addChapter(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateChapter = async (req, res, next) => {
  try {
    const result = await courseService.updateChapter(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteChapter = async (req, res, next) => {
  try {
    const result = await courseService.deleteChapter(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
