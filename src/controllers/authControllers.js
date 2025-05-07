const authService = require('../services/authServices');

exports.signup = async (req, res) => {
  const response = await authService.signup(req.body);
  res.status(response.status).json(response.data);
};

exports.login = async (req, res) => {
  const response = await authService.login(req.body);
  res.status(response.status).json(response.data);
};

exports.forgotPassword = async (req, res) => {
  const response = await authService.forgotPassword(req.body.email);
  res.status(response.status).json(response.data);
};

exports.resetPassword = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing or invalid Authorization header' });
      }
  
      const token = authHeader.split(' ')[1];
      await authService.resetPasswordService(token, req.body.password);
      res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
      next(err);
    }
  };
  
  exports.getUser = async(req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }
  
    const token = authHeader.split(' ')[1];
    const response = await authService.getUser(token);
    res.status(response.status).json(response.data);
  }