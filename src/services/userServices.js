const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const db = require("../configs/dbConfigs").getDb();
const users = db.collection("users");
const { JWT_SECRET } = require("../configs/envConfigs");

exports.getUser = async ( token ) => {

  let payload;  
   try {
     payload = jwt.verify(token, JWT_SECRET);
   } catch (err) {
     return { status: 401, data: { message: `Invalid or expired token ${err}` } };
   }

  try {
    const user = await users.findOne({ _id: ObjectId.createFromHexString(payload.userId) });
    if (!user) {
      return { status: 404, data: { message: "User not found" } };
    }

    return { status: 200, data: { user } };
  } catch (err) {
    console.error("Error fetching user:", err);
    return { status: 500, data: { message: "Server error while fetching user" } };
  }
};

exports.addUserProgress = async ( userProgress) => {
  try {
    const { userId, courseId, modules } = userProgress;
    const exist = await userProgress.find({ userId, courseId });
    if (exist) {
      return { status: 409, data: { message: "User progress already exists" } };
    }
    await userProgress.insertOne({
      userId,
      courseId,
      modules
    });

    return { status: 201, data: { message: "User progress added successfully" } };

  } catch (error) {
    console.error("Error adding user progress:", error);
    return { status: 500, data: { message: "Server error while adding user progress" } };
  }
}
