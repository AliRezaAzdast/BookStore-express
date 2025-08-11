const { dbConnection } = require("./../configs/db");
const { ObjectId } = require("mongodb");

const getAll = async () => {
  const db = await dbConnection();
  const userCollection = db.collection("users");
  const result = userCollection.find({}).toArray();
  return result;
};

const isUserExist = async (username, gmail) => {
  if (!userId || !/^[0-9a-fA-F]{24}$/.test(userId)) {
    return false;
  }
  const db = await dbConnection();
  const userCollection = db.collection("users");
  const result = !!(await userCollection.findOne({
    username,
    gmail
  }))
  return result;
};

const isUserExistById = async (userId) => {
  if (!userId || !/^[0-9a-fA-F]{24}$/.test(userId)) {
    return false;
  }
  const db = await dbConnection();
  const userCollection = db.collection("users");
  const result = !!(await userCollection.findOne({
    _id: new ObjectId(userId)
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

const makeAdmin = async (userId) => {
  const db = await dbConnection();
  const userCollection = db.collection('users')
  await userCollection.findOneAndUpdate({_id: new ObjectId(userId)}, {
    $set: {
      role: 'Admin'
    }
  })
}

const updateCrime = async (userId, crime) => {
  const db = await dbConnection();
  const userCollection = db.collection('users')
  await userCollection.findOneAndUpdate({_id: new ObjectId(userId)}, {
    $set: {
      crime
    }
  })
}

module.exports = {
  register,
  isUserExist,
  isUserExistById,
  getAll,
  makeAdmin,
  updateCrime,
};
