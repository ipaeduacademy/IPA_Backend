const { ObjectId } = require('mongodb');
const db = require('../configs/dbConfigs').getDb();
const { apiRequest } = require("../utils/apiHandler"); // Assuming you have a utility function for API requests
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/envConfigs');
const BUNNY_LIBRARY_ID = process.env.BUNNY_VIDEO_LIBRARY_ID;
const BUNNY_API_KEY = process.env.BUNNY_API_KEY;

exports.createCourse = async (courseData) => {
  // 1. Create a Collection in Bunny.net Library
  const collection = await apiRequest(
    `https://video.bunnycdn.com/library/${BUNNY_LIBRARY_ID}/collections`,
    {
      method: 'POST',
      headers: {
        AccessKey: BUNNY_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: courseData.courseName }),
    }
  );
  const courseToInsert = {
    ...courseData,
    title: courseData.courseName,
    bunnyCollectionId: collection.guid, // Save the collection GUID
  };

  const result = await db.collection('courses').insertOne(courseToInsert);

  return {
    message: 'Course created',
    courseId: result.insertedId,
    bunnyCollectionId: collection.guid,
  };
};

exports.getMycourses = async (token) => {
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);

  } catch (err) {
    return { status: 400, data: { message: `Invalid or expired token ${err}` } };
  }

  let users = await db.collection('users').findOne(
    { _id: ObjectId.createFromHexString(payload.userId) },
  );

  if (!users.myCourses) {
    return []
  }

  let result = await Promise.all(
    users?.myCourses?.map(async (obj) => {
      const course = await db.collection('courses').findOne({ _id: ObjectId.createFromHexString(obj.courseId) });
      return course;
    })
  );

  return result;


}

exports.getAllCourses = async (page, limit = 8) => {
  console.log('Page:', page, 'Limit:', limit);
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

  const updatedCourse = await db.collection('courses').updateOne(
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
  const rs = await db.collection('courses').deleteOne({ _id: ObjectId.createFromHexString(id) });

  if (rs.deletedCount === 0) {
    throw new Error('Course not found');
  }
  if (rs.deletedCount === 0) {
    throw new Error('No changes made to the course');
  }

  return { message: 'Course deleted' };
};

exports.getChaptersByCourseId = async (courseId, token) => {

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return {
      status: 401,
      message: `Invalid or expired token: ${err.message}`,
    };
  }

  const user = await db.collection('users').findOne(
    { _id: new ObjectId(payload.userId) }
  );

  if (!user) {
    return {
      status: 404,
      message: 'User not found',
    };
  }

  const currentCourse = user.myCourses?.find(c => c.courseId === courseId);

  if (!currentCourse) {
    return {
      status: 404,
      message: 'Course not found in user profile',
    };
  }

  const buyingDate = new Date(currentCourse.buyingDate);
  const currentDate = new Date();
  const oneYearInMs = 365 * 24 * 60 * 60 * 1000;

  if (currentDate - buyingDate > oneYearInMs) {
    return {
      status: 403,
      message: 'Your course validity has expired',
    };
  }

  const chapters = await db.collection('chapters').find({
    CourseId: new ObjectId(courseId)
  }).toArray();

  return {
    status: 200,
    data: chapters
  };
};



exports.addChapter = async (chapterData) => {
  const result = await db.collection('chapters').insertOne({
    ...chapterData,
    CourseId: ObjectId.createFromHexString(chapterData.CourseId),
  });

  return { message: 'Chapter added', chapterId: result.insertedId };
};

exports.updateChapter = async (chapterId, updatedData) => {
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
