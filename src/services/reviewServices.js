const { ObjectId } = require('mongodb');
const db = require('../configs/dbConfigs').getDb();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/envConfigs');

exports.addReview = async (token, data) => {
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return {
      status: 401,
      data: { success: false, message: `Invalid or expired token: ${err.message}` },
    };
  }

  const { courseId, rating, comment } = data;

  // Check for duplicate review
  const existing = await db.collection('reviews').findOne({
    courseId: ObjectId.createFromHexString(courseId),
    userId: ObjectId.createFromHexString(payload.userId),
  });

  if (existing) {
    return {
      status: 400,
      data: { success: false, message: 'You have already reviewed this course.' },
    };
  }

  const review = {
    courseId: ObjectId.createFromHexString(courseId),
    userId: ObjectId.createFromHexString(payload.userId),
    rating,
    comment,
  };

  await db.collection('reviews').insertOne(review);
  return {
    status: 201,
    data: { success: true, message: 'Review added successfully' },
  };
};

exports.getReview = async (courseId) => {
  let courseObjectId;
  try {
    courseObjectId = ObjectId.createFromHexString(courseId);
  } catch {
    return { status: 400, data: { success: false, message: 'Invalid course ID' } };
  }

  const reviews = await db
    .collection('reviews')
    .find({ courseId: courseObjectId })
    .sort({ createdAt: -1 })
    .toArray();

  return { status: 200, data: { success: true, reviews } };
};
