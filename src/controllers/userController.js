const { getUser, addUserProgress, getUsers, updateUserStatus } = require('../services/userServices');

exports.getUser = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer')) {
    return res.status(401).json({ success: false, error: 'Missing or invalid Authorization header' });
  }
  const token = authHeader.split(' ')[1];
  const response = await getUser(token);
  res.status(response.status).json(response.data);
}

exports.addUserProgress = async (req, res) => {
  const userProgress = req.body;
  const response = await addUserProgress(userProgress);
  res.status(response.status).json(response.data);
}

exports.getUsers = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  const response = await getUsers({ page: parseInt(page), limit: parseInt(limit), search });
  res.status(response.status).json(response.data);
};

exports.updateUserStatus = async (req, res) => {
  const userId = req.params.userId;
  const { status } = req.body;
  if (!userId || !status) {
    return res.status(400).json({ error: 'Missing userId or status' });
  }
  try {
    const response = await updateUserStatus(userId, status);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}