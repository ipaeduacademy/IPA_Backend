const { ObjectId } = require('mongodb');

const { BUNNY_ACCESS_KEY, BUNNY_TOKEN_KEY, BUNNY_LIB_ID, BUNNY_UPLOAD_EXPIRY, BUNNY_VIEW_EXPIRY } = require('../configs/envConfigs');
const { createSHA256Hash } = require('../utils/securityUtils');

const db = require('../configs/dbConfigs').getDb();

const getVideoDataService = async (videoId) => {
    const url = `https://video.bunnycdn.com/library/${BUNNY_LIB_ID}/videos/${videoId}`;
    const options = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'AccessKey': BUNNY_ACCESS_KEY
        }
    };
    const response = await fetch(url, options);
    if (!response.ok) {
        if (response.status === 404) {
            const err = new Error('video not found');
            err.statusCode = 404;
            throw err;
        }
        throw new Error('Failed to get video data');
    }
    const data = await response.json();
    return data;
};

const addVideoService = async (title, courseId, chapterIndex) => {
    // fetch collectionId from mongodb
    // if collectionId not found throw error
    chapterIndex = parseInt(chapterIndex);
    const chapter = await db.collection('courses').findOne(
        { _id: ObjectId.createFromHexString(courseId) },
        { projection: { chapterList: { $slice: [chapterIndex, 1] } }, courseId: 1 }
    );
    if (!chapter) {
        const err = new Error('Chapter not found');
        err.statusCode = 400;
        throw err;
    }
    if (chapter.videoId) {
        const err = new Error('Chapter already has a video');
        err.statusCode = 400;
        throw err;
    }
    // create video on bunny and get video id
    const url = `https://video.bunnycdn.com/library/${BUNNY_LIB_ID}/videos`;
    const options = {
        method: 'POST',
        headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'AccessKey': BUNNY_ACCESS_KEY
        },
        body: JSON.stringify({ title: title, collectionId: chapter.videoCollectionId })
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (!data?.guid) {
        throw new Error('Could not create video on bunny');
    }
    const videoId = data.guid;
    // update the chapter with videoId in it
    const result = await db.collection('courses').updateOne(
        { _id: ObjectId.createFromHexString(courseId) },
        { $set: { [`chapterList.${chapterIndex}.videoId`]: videoId } }
    );
    if (result.modifiedCount === 0) {
        throw new Error('Could not update chapter with videoId');
    }

    // create signature for video upload
    // signature = SHA256(libraryId + apiKey + expirationTime + videoId)
    const expiryTimestamp = Math.floor(Date.now() / 1000) + BUNNY_UPLOAD_EXPIRY;
    const signature = createSHA256Hash(BUNNY_LIB_ID + BUNNY_ACCESS_KEY + expiryTimestamp + videoId);
    console.log(signature);
    // create a timeout for when the signature expires...check if the video is uploaded or not
    // else delete the video from bunny and mongodb
    setTimeout(async () => {
        const data = await getVideoDataService(videoId);
        if (data.status < 1 || data.status > 4) {
            // delete video from bunny and mongodb
            console.log('Video upload failed, deleting video');     // remove line after testing
            await deleteVideoService(courseId, chapterIndex);  
        }
        // only for testing
        else {
            console.log('Video uploaded successfully');
        }
    }, BUNNY_UPLOAD_EXPIRY * 1000);
    return { signature, expiryTimestamp, videoId, BUNNY_LIB_ID };
};

const getVideoURLService = async (videoId) => {
    const data = await getVideoDataService(videoId);
    if (data.status !== 4) {
        throw new Error('Video not available');
    }
    const expiration = Math.floor(Date.now() / 1000) + BUNNY_VIEW_EXPIRY;
    const sha256Hex = createSHA256Hash(BUNNY_TOKEN_KEY + videoId + expiration);
    return `https://iframe.mediadelivery.net/embed/${BUNNY_LIB_ID}/${videoId}?token=${sha256Hex}&expires=${expiration}&autoplay=true&loop=false&muted=false&preload=true&responsive=true`;

};

const deleteVideoService = async (courseId, chapterIndex) => {
    chapterIndex = parseInt(chapterIndex);
    const chapter = await db.collection('courses').findOne(
        { _id: ObjectId.createFromHexString(courseId) },
        { projection: { chapterList: { $slice: [chapterIndex, 1] } } }
    );
    if (!chapter) {
        const err = new Error('Chapter not found');
        err.statusCode = 400;
        throw err;
    }
    const videoId = chapter.chapterList[0].videoId;
    const url = `https://video.bunnycdn.com/library/${BUNNY_LIB_ID}/videos/${videoId}`;
    const options = {
        method: 'DELETE',
        headers: {
            'accept': 'application/json',
            'AccessKey': BUNNY_ACCESS_KEY
        }
    };
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error('Failed to delete video from bunny');
    }
    await db.collection('courses').updateOne(
        { _id: ObjectId.createFromHexString(courseId) },
        { $unset: { [`chapterList.${chapterIndex}.videoId`]: '' } }
    );
    return true;
};

module.exports = {
    addVideoService,
    getVideoURLService,
    deleteVideoService
};