const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');
const db = require('../configs/dbConfigs').getDb();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/envConfigs');

exports.getCart = async ( token ) => {
      let payload; 
      try {
         payload = jwt.verify(token, JWT_SECRET);
       
       } catch (err) {
         return { status: 400, data: { message: `Invalid or expired token ${err}` } };
       }

       let users=await db.collection('users').findOne(
         { _id: ObjectId.createFromHexString(payload.userId) },
        );
        // console.log(users)
        let result = await Promise.all(
          users.cart.map(async (courseId) => {
            const course = await db.collection('courses').findOne({ _id: ObjectId.createFromHexString(courseId) });
            return course;
          })
        );
        return result;
        
};

exports.addToCart = async (token, courseId ) => {
    let payload; 
    try {
       payload = jwt.verify(token, JWT_SECRET);
     } catch (err) {
       return { status: 400, data: { message: `Invalid or expired token ${err}` } };
     }

    await db.collection('users').updateOne(
        { _id: ObjectId.createFromHexString(payload.userId) },
        { $addToSet: { cart: courseId } }
      );
    
    return { status: 200, data: { message: "Course added to cart" } };
 
};

exports.deleteFromCart = async (token,courseId) => {
    let payload; 
    try {
       payload = jwt.verify(token, JWT_SECRET);
     } catch (err) {
       return { status: 400, data: { message: `Invalid or expired token ${err}` } };
     }

    await db.collection('users').updateOne(
        { _id: ObjectId.createFromHexString(payload.userId) },
        { $pull: { cart: courseId } }
      );
    
    return { status: 200, data: { message: "Course removed from cart" } };
 
};

