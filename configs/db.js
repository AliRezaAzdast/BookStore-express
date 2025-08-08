const { MongoClient } = require("mongodb");

const dbConnection = new MongoClient("mongodb://localhost:27017/");
const dbName = "BookStore";

module.exports = {
  dbConnection: async () => {
    await dbConnection.connect();
    console.log("Connected To DBConnection Successfully :))");

    const db = dbConnection.db(dbName);
    return db;
  },
};
