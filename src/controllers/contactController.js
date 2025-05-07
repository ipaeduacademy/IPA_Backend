const contactService = require('../services/contactServices');

exports.addContact = async (req, res, next) => {
  try {
    const result = await contactService.addContact(req.body);
    res.status(result.status).json(result.data);
  } catch (err) {
    next(err);
  }
};
