const { asyncHandler } = require('../utils/asyncUtils');
const {
    getChapterListService,
    addChapterService,
    updateChapterService,
    removeChapterService,
    updateChapterListService
} = require('../services/chapterServices');


const getChaptersController = asyncHandler(async (req, res) => {
    const courseId = req.params.courseId;
    const chapterList = await getChapterListService(courseId);
    if (chapterList) {
        res.status(200).json({
            success: true,
            message: 'chapter list fetched successfully',
            data: chapterList
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Chapter not found'
        });
    }
});

const postChapterController = asyncHandler(async (req, res) => {
    const { courseId, chapterIndex } = req.params;
    const chapterData = req.body;
    const result = await addChapterService(courseId, chapterIndex, chapterData);
    if (result) {
        res.status(201).json({
            success: true,
            message: 'Chapter added successfully'
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Chapter could not be added'
        });
    }
});

const patchChapterController = asyncHandler(async (req, res) => {
    const { courseId, chapterIndex } = req.params;
    const chapterData = req.body;
    const result = await updateChapterService(courseId, chapterIndex, chapterData);
    if (result) {
        res.status(200).json({
            success: true,
            message: 'Chapter updated successfully'
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Chapter could not be updated'
        });
    }
});

const deleteChapterController = asyncHandler(async (req, res) => {
    const { courseId, chapterIndex } = req.params;
    const result = await removeChapterService(courseId, chapterIndex);
    if (result) {
        res.status(200).json({
            success: true,
            message: 'Chapter removed successfully'
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Chapter could not be removed'
        });
    }
});

const patchChapterListController = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const { sourceIndex, destinationIndex } = req.body;
    const result = await updateChapterListService(courseId, sourceIndex, destinationIndex);
    if (result) {
        res.status(200).json({
            success: true,
            message: 'Chapter position updated successfully'
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Chapter position could not be updated'
        });
    }
});


module.exports = {
    getChaptersController,
    postChapterController,
    patchChapterController,
    deleteChapterController,
    patchChapterListController
};