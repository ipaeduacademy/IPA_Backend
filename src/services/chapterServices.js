const { ObjectId } = require('mongodb');

const db = require('../configs/dbConfigs').getDb();

// have a index field for chapter or not?

const getChapterListService = async (courseId) => {
    const courseData = await db.collection('courses').findOne(
        { _id: ObjectId.createFromHexString(courseId) },
        { projection: { chapterList: 1 } }
    );
    if (!courseData) {
        const err = new Error("Course not found");
        err.statusCode = 404;
        throw err;
    }
    return courseData.chapterList;
};

const addChapterService = async (courseId, chapterIndex, chapterData) => {
    const result = await db.collection('courses').updateOne(
        { _id: ObjectId.createFromHexString(courseId) },
        { $push: { chapterList: { $each: [chapterData], $position: parseInt(chapterIndex) } } } 
    )
    return result.modifiedCount > 0;
};


const updateChapterService = async (courseId, chapterIndex, chapterData) => {
    const updateFields = {};
    for (const key in chapterData) {
        updateFields[`chapterList.${chapterIndex}.${key}`] = chapterData[key];
    }

    const result = await db.collection('courses').updateOne(
        { _id: ObjectId.createFromHexString(courseId) },
        { $set: updateFields }
    );
    return result.modifiedCount > 0;
};


const removeChapterService = async (courseId, chapterIndex) => {
    // delete video from bunny first


    let result = await db.collection('courses').updateOne(
        { _id: ObjectId.createFromHexString(courseId) },
        { $unset: { [`chapterList.${chapterIndex}`]: '' } }
    );

    if (result.modifiedCount > 0) {
        result = await db.collection('courses').updateOne(
            { _id: ObjectId.createFromHexString(courseId) },
            { $pull: { chapterList: null } }
        );
    }

    return result.modifiedCount > 0;
}


const updateChapterListService = async (courseId, sourceIndex, destinationIndex) => {
    let result = await db.collection('courses').findOne(
        { _id: ObjectId.createFromHexString(courseId) },
        { projection: { chapterList: 1 } }
    );
    if (result) {
        if (
            result.chapterList &&
            result.chapterList.length > 0 &&
            sourceIndex < result.chapterList.length &&
            destinationIndex < result.chapterList.length
        ) {
            const [chapterToBeMoved] = result.chapterList.splice(sourceIndex, 1);
            result.chapterList.splice(destinationIndex, 0, chapterToBeMoved);
            const updateResult = await db.collection('courses').updateOne(
                { _id: ObjectId.createFromHexString(courseId) },
                { $set: { chapterList: result.chapterList } }
            );
            return updateResult.modifiedCount > 0;
        }
        else {
            const err = new Error("Invalid source or destination index");
            err.statusCode = 400;
            throw err;
        }
    } else {
        const err = new Error("course not found");
        err.statusCode = 404;
        throw err;
    }
}

module.exports = {
    getChapterListService,
    addChapterService,
    updateChapterService,
    removeChapterService,
    updateChapterListService
};
