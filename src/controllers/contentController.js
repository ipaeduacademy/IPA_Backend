const { 
  getMainSlide, 
  addMainSlide, 
  updateMainSlide, 
  deleteMainSlide,
  addFacultySlide,
  getFacultySlide,
  updateFacultySlide,
  deleteFacultySlide,
} = require("../services/contentServices");

exports.addMainSlide = async (req, res) => {
  const {title, url} = req.body;
  if (!title || !url) {
    return res.status(400).json({ success: false, error: 'Invalid main slide data' });
  }

  try {
    const response = await addMainSlide(title, url);
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

  if (!id || !mainSlide.title || !mainSlide.url) {
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

exports.addFacultySlide = async (req, res) => {
  const { name, designation, url } = req.body;
  if (!name || !designation || !url) {
    return res.status(400).json({ success: false, error: 'Invalid faculty slide data' });
  }

  try {
    const response = await addFacultySlide(name, designation, url);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error adding faculty slide:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

exports.getFacultySlide = async (req, res) => {
  try {
    const response = await getFacultySlide();
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error fetching faculty slides:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

exports.updateFacultySlide = async (req, res) => {
  const {id} = req.params;
  const {data} = req.body;  
  if (!id || !data.name || !data.designation || !data.url) {
    return res.status(400).json({ success: false, error: 'Invalid faculty slide data' });
  }
  try {
    const response = await updateFacultySlide(data, id);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error updating faculty slide:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

exports.deleteFacultySlide = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, error: 'Invalid faculty slide ID' });
  }

  try {
    const response = await deleteFacultySlide(id);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error deleting faculty slide:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}