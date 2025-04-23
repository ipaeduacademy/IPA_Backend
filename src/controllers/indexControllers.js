const { asyncHandler } = require('../utils/asyncUtils');

const { getIndexService, postIndexService, deleteIndexService } = require('../services/indexServices');

const getIndexController = asyncHandler(async (req, res) => {
    const data = await getIndexService();
    res.status(200).json({
        success: true,
        message: 'IPA Edu Academy Backend Server Running',
        data
    });
});

const postIndexController = asyncHandler(async (req, res) => {
    const resultId = await postIndexService(req.body);
    res.status(201).json({
        success: true,
        message: 'Data inserted successfully',
        data: resultId
    });
});

const deleteIndexController = asyncHandler(async (req, res) => {
    const resultId = await deleteIndexService(req.body);
    res.status(201).json({
        success: true,
        message: 'Data deleted successfully',
        data: resultId
    });
});

module.exports = {
    getIndexController,
    postIndexController,
    deleteIndexController
};