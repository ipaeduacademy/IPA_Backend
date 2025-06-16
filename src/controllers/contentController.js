const { getMainSlide, addMainSlide, updateMainSlide, deleteMainSlide} = require("../services/userServices");

exports.addMainSlide = async (req, res) => {
  const mainSlide = req.body;
  if (!mainSlide.title || !mainSlide.imageUrl) {
    return res.status(400).json({ success: false, error: 'Invalid main slide data' });
  }

  try {
    const response = await addMainSlide(mainSlide);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error adding main slide:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

exports.getMainSlide = async (req, res) => {
  try {
    const response = await getMainSlide();
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

exports.updateMainSlide = async (req, res) => {
  const { id } = req.params;
  const mainSlide = req.body;

  if (!id || !mainSlide.title || !mainSlide.imageUrl) {
    return res.status(400).json({ success: false, error: 'Invalid main slide data' });
  }

  try {
    const response = await updateMainSlide(mainSlide, id);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error updating main slide:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

exports.deleteMainSlide = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, error: 'Invalid main slide ID' });
  }

  try {
    const response = await deleteMainSlide(id);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error deleting main slide:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}