const { ObjectId } = require('mongodb');
const db = require('../configs/dbConfigs').getDb();

exports.createCourse = async (courseData) => {
  const courseToInsert = {
    ...courseData,
    title: courseData.courseName, // Map courseName → title
  };

  const result = await db.collection('courses').insertOne(courseToInsert);
  return { message: 'Course created', courseId: result.insertedId };
};

exports.getAllCourses = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const collection = db.collection('courses');
  
    const total = await collection.countDocuments();
    const courses = await collection.find().skip(skip).limit(limit).toArray();
  
    return {
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: courses,
    };
};
  

exports.getCourseById = async (id) => {
  return await db.collection('courses').findOne({ _id: ObjectId.createFromHexString(id) });
};

exports.updateCourse = async (id, courseData) => {
  
 const updatedCourse= await db.collection('courses').updateOne(
    { _id: ObjectId.createFromHexString(id) },
    { $set: courseData }
  );

  if (updatedCourse.matchedCount === 0) {
    throw new Error('Course not found');
  }
  if (updatedCourse.modifiedCount === 0) {
    throw new Error('No changes made to the course');
  }
  return { message: 'Course updated' };
};

exports.deleteCourse = async (id) => {
  const rs=await db.collection('courses').deleteOne({ _id: ObjectId.createFromHexString(id) });

  if (rs.deletedCount === 0) {
    throw new Error('Course not found');
  }
  if (rs.deletedCount === 0) {
    throw new Error('No changes made to the course');
  }

  return { message: 'Course deleted' };
};

exports.getChaptersByCourseId = async (courseId) => {
  const db = require('../configs/dbConfigs').getDb();
  const chapters = await db.collection('chapters').find({
    CourseId: ObjectId.createFromHexString(courseId)
  }).toArray();

  if (!chapters || chapters.length === 0) {
    throw new Error('No chapters found for this course');
  }

  return chapters;
};


exports.addChapter = async (chapterData) => {
  const result = await db.collection('chapters').insertOne({
    ...chapterData,
    CourseId: ObjectId.createFromHexString(chapterData.CourseId),
  });

  return { message: 'Chapter added', chapterId: result.insertedId };
};

exports.updateChapter = async (chapterId, updatedData) => {

  console.log(chapterId)

  const result = await db.collection('chapters').updateOne(
    { _id: ObjectId.createFromHexString(chapterId) },
    { $set: updatedData }
  );

  if (result.matchedCount === 0) {
    throw new Error('Chapter not found');
  }
  if (result.modifiedCount === 0) {
    throw new Error('No changes made to the chapter');
  }

  return { message: 'Chapter updated', modifiedCount: result.modifiedCount };
};


exports.deleteChapter = async (chapterId) => {
  const result = await db.collection('chapters').deleteOne({
    _id: ObjectId.createFromHexString(chapterId),
  });

  if (result.deletedCount === 0) {
    throw new Error('Chapter not found');
  }

  if (result.deletedCount === 0) {
    throw new Error('No changes made to the chapter');
  }
  return { message: 'Chapter deleted', deletedCount: result.deletedCount };
};
