const { getUser, addUserProgress } = require('../services/userServices');

exports.getUser = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];
  console.log("Token in getUser controller:", token);
  const response = await getUser(token);
  res.status(response.status).json(response.data);
}

exports.addUserProgress = async (req, res) => {
  const userProgress = req.body;
  const response = await addUserProgress(userProgress);
  res.status(response.status).json(response.data);
}
