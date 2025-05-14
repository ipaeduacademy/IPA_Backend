// controllers/videoController.js
const bunny = require("../services/bunnyServices");

exports.upload = async (req, res) => {
  try {
    const { originalname, buffer } = req.file;
    const { title,collectionId } = req.body;
    const videoId = await bunny.uploadVideo(title, buffer, originalname, collectionId); // Log the video ID for debugging
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

exports.uploadImage = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const url = await bunny.uploadImageToBunny(file);
    if (url) {
      return res.status(201).json({ message: "Image uploaded", url });
    } else {
      return res.status(500).json({ message: "Image upload failed" });
    }
  } catch (err) {
    console.error("Image upload error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};