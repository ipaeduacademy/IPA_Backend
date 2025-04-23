const { MONGODB_URI, DB_NAME } = require('./envConfigs');
const { MongoClient } = require('mongodb');

let db;

const connectToDb = async () => {
    try {
        db = new MongoClient(MONGODB_URI).db(DB_NAME);
        await db.collection('courses').createIndex({ "title": 1 }, { unique: true });
        console.log("connected to the database");
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
}

const getDb = () => {
    if (!db) { throw new Error('Database not connected'); }
    return db;
};

module.exports = {
    connectToDb,
    getDb,
};