require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI,
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    BUNNY_ACCESS_KEY: process.env.BUNNY_ACCESS_KEY,
    BUNNY_TOKEN_KEY: process.env.BUNNY_TOKEN_KEY,
    BUNNY_LIB_ID: process.env.BUNNY_LIB_ID,
    BUNNY_UPLOAD_EXPIRY: process.env.BUNNY_UPLOAD_EXPIRY,
    BUNNY_VIEW_EXPIRY: process.env.BUNNY_VIEW_EXPIRY,

};