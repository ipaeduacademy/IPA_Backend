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
      const page = parseInt(req.params.page) || 1;
      const result = await courseService.getAllCourses(page);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
  

exports.getCourseById = async (req, res, next) => {
  try {
    const result = await courseService.getCourseById(req.params.id);
    if (!result) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getVideos= async (req,res,next)=>{
  try {
    console.log(req.params.id);
    const authHeader = req.headers.authorization; // Log the authorization header for debugging
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }
    const token = authHeader.split(' ')[1];
    const courseData = await courseService.getCourseById(req.params.id);
    const chapters = await courseService.getChaptersByCourseId(req.params.id,token);
    console.log(chapters)
    const result = {
      courseData: courseData,
      chapters: chapters.data,
    };
    console.log(result)
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }

}

exports.getCourseDataById = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const courseData = await courseService.getCourseById(req.params.id);
    const chapters = await courseService.getChapters(req.params.id);
    const result = {
      courseData: courseData,
      chapters: chapters.data,
    };
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getMycourses = async (req,res,next)=>{
  try{
    const authHeader = req.headers.authorization; // Log the authorization header for debugging
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }
    const token = authHeader.split(' ')[1];
    const myCourses = await courseService.getMycourses(token)
    res.status(200).json(myCourses)
  }catch(err){
    next(err)
  }
}

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
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }

    const token = authHeader.split(' ')[1];
    const result = await courseService.getChaptersByCourseId(courseId, token);

    if (result.status === 401) {
      return res.status(401).json({ message: result.message });
    }

    if (result.status === 403) {
      return res.status(403).json({ message: result.message });
    }

    if (result.status === 404) {
      return res.status(404).json({ message: result.message });
    }

    return res.status(200).json({ chapters: result.data });
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
