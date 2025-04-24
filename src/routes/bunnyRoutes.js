// routes/videoRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { authenticate } = require('../middlewares/authMiddlewares');
const bunnyController = require("../controllers/bunnyController");

router.use(authenticate);
const upload = multer(); // in-memory buffer


router.post("/uploadVideo", upload.single("video"), bunnyController.upload);
router.get("/iframe/:videoId", bunnyController.getIframe);

module.exports = router;
