// controllers/videoController.js
const bunny = require("../services/bunnyServices");

exports.upload = async (req, res) => {
  try {
    const { originalname, buffer } = req.file;
    const { title } = req.body;
    const videoId = await bunny.uploadVideo(title, buffer, originalname); // Log the video ID for debugging
    if (!videoId) {
      return res.status(500).json({ error: "Failed to upload video" });
    }
    res.json({ videoId });
  } catch (err) {
    res.status(500).json({ error: "Video upload failed", details: err.message });
  }
};

exports.getIframe = (req, res) => {
  try {
    const { videoId } = req.params;
    const iframeUrl = bunny.generateSecureIframe(videoId);
    res.json({ iframeUrl });
  } catch (err) {
    res.status(500).json({ error: "Failed to get iframe", details: err.message });
  }
};
