// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // you can access user ID with req.user.userId
    next();
  } catch (err) {
    console.error('Token verification error:', err); // Log the error for debugging
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};


// const authorize = (...roles) => (req, res, next) => {
//     async (req, res, next) => {
//         // check if user has permission to access route
//         if (!roles.includes(req.user.role)) {
//             return res.status(403).json({ message: 'You do not have permission to access this route' });
//         }
//         next();
//     }
// }

