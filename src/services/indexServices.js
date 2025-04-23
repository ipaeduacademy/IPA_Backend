const { getDb } = require('../configs/dbConfigs');

const db = getDb();

const getIndexService = async () => {
    return  await db.collection('test').find().toArray();
}

const postIndexService = async (data) => {
    const result = await db.collection('test').insertOne(data);
    return result.insertedId;
}

const deleteIndexService = async (data) => {
    const result = await db.collection('test').deleteOne(data);
    return result.deletedCount;
}


module.exports = {
    getIndexService,
    postIndexService,
    deleteIndexService
};