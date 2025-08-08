const { dbConnection } = require("./../configs/db");
const { ObjectId } = require("mongodb");

const getAll = async () => {
  const db = await dbConnection();
  const userCollection = db.collection("users");
  const result = userCollection.find({}).toArray();
  return result;
};

const isUserExist = async (username, gmail) => {
  const db = await dbConnection();
  const userCollection = db.collection("users");
  const result = !!(await userCollection.findOne({
    username,
    gmail
  }))
  return result;
};

const register = async (body) => {
  const db = await dbConnection();
  const userCollection = db.collection("users");
  await userCollection.insertOne({
    ...body,
  });
};

module.exports = {
  register,
  isUserExist,
  getAll,
};
