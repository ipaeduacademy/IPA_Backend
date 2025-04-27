// routes/videoRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { validateBody } = require('../middlewares/validationMiddlewares');
const { authenticate } = require('../middlewares/authMiddlewares');
const bunnyController = require("../controllers/bunnyController");
const { imageSchema } = require("../schemas/bunnySchemas");


const upload = multer(); // in-memory buffer


router.post("/uploadVideo", authenticate,upload.single("video"), bunnyController.upload);
router.get("/iframe/:videoId",authenticate, bunnyController.getIframe);

router.post(
  "/upload-image",
  authenticate,
  upload.single("file"),
  (req, res, next) => {
    if (req.file) {
      req.body.file = req.file;
    } else {
      return res.status(400).json({ error: "File is required" });
    }
    next();
  },
  validateBody(imageSchema),
  bunnyController.uploadImage
);



module.exports = router;
