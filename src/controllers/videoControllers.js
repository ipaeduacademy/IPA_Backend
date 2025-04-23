const { asyncHandler } = require('../utils/asyncUtils');
const {
    getVideoURLService,
    addVideoService,
    deleteVideoService
} = require('../services/videoServices');


const getVideoURLController = asyncHandler(async (req, res) => {
    const videoId = req.params.videoId;
    const videoURL = await getVideoURLService(videoId);
    res.status(200).json({
        success: true,
        message: 'Video URL fetched successfully',
        data: videoURL
    });
});

const postVideoController = asyncHandler(async (req, res) => {
    const { courseId, chapterIndex } = req.params;
    const { title } = req.body;
    const result = await addVideoService(title, courseId, chapterIndex);
    if (result) {
        res.status(201).json({
            success: true,
            message: 'Video added successfully',
            data: result
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Video could not be added'
        });
    }
});

const deleteVideoController = asyncHandler(async (req, res) => {
    const { courseId, chapterIndex } = req.params;
    await deleteVideoService(courseId, chapterIndex);
    res.status(200).json({
        success: true,
        message: 'Video deleted successfully'
    });
});


module.exports = {
    getVideoURLController,
    postVideoController,
    deleteVideoController
};