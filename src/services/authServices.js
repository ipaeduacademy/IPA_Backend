const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const db = require('../configs/dbConfigs').getDb();
const sendEmail = require('../utils/sendEmail');
const users = db.collection('users');
const { JWT_SECRET } = require('../configs/envConfigs');



exports.signup = async ({ name, email, password }) => {
  const existingUser = await users.findOne({ email });
  if (existingUser) return { status: 409, data: { message: "User already exists" } };

  const hashedPassword = await bcrypt.hash(password, 10);
  await users.insertOne({ name, email, password: hashedPassword });

  return { status: 201, data: { message: "User created successfully" } };
};

exports.login = async ({ email, password }) => {
  const user = await users.findOne({ email });
  if (!user) return { status: 401, data: { message: "Invalid credentials" } };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { status: 401, data: { message: "Invalid credentials" } };

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return { status: 200, data: { token, user: { name: user.name, email: user.email } } };
};

exports.forgotPassword = async (email) => {
  const user = await users.findOne({ email });
  if (!user) return { status: 404, data: { message: "User not found" } };

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

  const resetUrl = `http://localhost:5173/reset-password/${encodeURIComponent(token)}`;
  await sendEmail(email, "Reset Password", `Click here: ${resetUrl}`);

  return { status: 200, data: { message: "Password reset link sent to email", url: resetUrl } };
};

exports.resetPasswordService = async (token, newPassword) => {
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return { status: 400, data: { message: `Invalid or expired token ${err}` } };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  let res = await db.collection('users').updateOne(
    { _id: ObjectId.createFromHexString(payload.userId) },
    { $set: { password: hashedPassword } }
  );

  if (res.matchedCount === 0) {
    return { status: 404, data: { message: "User not found" } };
  }
  return { message: 'Password updated' };
}