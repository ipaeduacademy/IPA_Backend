// services/bunnyService.js
const { apiRequest } = require("../utils/apiHandler");
const crypto = require("crypto");

const BUNNY_API_KEY = process.env.BUNNY_API_KEY;
const VIDEO_LIBRARY_ID = process.env.BUNNY_VIDEO_LIBRARY_ID;
const SIGNING_KEY = process.env.BUNNY_SIGNING_KEY;
const STORAGE_ZONE = process.env.BUNNY_STORAGE_ZONE;
const BUNNY_STORAGE_API_KEY = process.env.BUNNY_STORAGE_API_KEY;
const CDN_URL = process.env.BUNNY_CDN_URL;

exports.uploadVideo = async ( fileBuffer, fileName,collectionId) => {
 // Log the file name for debugging
 
  const createRes = await apiRequest(
    `https://video.bunnycdn.com/library/${VIDEO_LIBRARY_ID}/videos`,
    {
      method: "POST",
      headers: {
        AccessKey: BUNNY_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        title : fileName,
        collectionId
       }),
    }
  );

  console.log("Create response:", createRes); // Log the response for debugging

  const videoId = createRes.guid;
  if (!videoId) {
    throw new Error("Failed to create video in Bunny CDN.");
  }

  const uploadRes = await apiRequest(
    `https://video.bunnycdn.com/library/${VIDEO_LIBRARY_ID}/videos/${videoId}`,
    {
      method: "PUT",
      headers: {
        AccessKey: BUNNY_API_KEY,
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
      body: fileBuffer,
    }
  );

  console.log("Upload response:", uploadRes);

  if (uploadRes.statusCode !== 200) {
    throw new Error("Failed to upload video to Bunny CDN.");
  }
  return videoId;
  
};


exports.generateSecureIframe = (videoId) => {
  const expiry = Math.floor(Date.now() / 1000) + 3600; // 1 hour
  const rawString = SIGNING_KEY + videoId + expiry;

  const token = crypto
    .createHash("sha256")
    .update(rawString)
    .digest("hex"); // NOT base64url anymore

  return `https://iframe.mediadelivery.net/embed/${VIDEO_LIBRARY_ID}/${videoId}?token=${token}&expires=${expiry}`;
};

exports.uploadImageToBunny = async (file) => {
  const uniqueFilename =`${Date.now()}-${file.originalname}`;

  const url = `https://sg.storage.bunnycdn.com/${STORAGE_ZONE}/${uniqueFilename}`;
  console.log(url); // Log the URL for debugging
  try {
    let res=await apiRequest(url, {
      method: "PUT",
      headers: {
        AccessKey:BUNNY_STORAGE_API_KEY,
        "Content-Type": file.mimetype,
      },
      body: file.buffer,
    });
    console.log("Upload response:", res); // Log the response for debugging
    
    return `${CDN_URL}/${uniqueFilename}`;
  } catch (err) {
    console.error("Upload failed:", err.message);
    return false;
  }
};