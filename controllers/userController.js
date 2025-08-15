const { isValidObjectId } = require("mongoose");
const User = require("../models/userModel");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  if (isValidObjectId(id)) {
    const deletedUser = await User.findByIdAndDelete({ _id: id });
    if (!deletedUser) {
      return res.status(404).json({ message: "user dose not exist" });
    }
  } else {
    return res.status(422).json({ message: "user id is not valid" });
  }

  res.status(202).json({ message: "user deleted" });
};

exports.crime = async (req, res) => {
  const { id } = req.params;
  const { crime } = req.body;
  if (isValidObjectId(id)) {
    const updateCrime = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          crime: crime,
        },
      }
    );
    if (!updateCrime) {
      return res.status(404).json({ message: "user dose not exist" });
    }
  } else {
    return res.status(422).json({ message: "user id is not valid" });
  }
  res.status(202).json({ message: "User crime updated" });
};


exports.makeAdmin = async (req, res) => {
  const { id } = req.params;
  if (isValidObjectId(id)) {
    const findAndMadeAdmin = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          role: 'ADMIN'
        },
      }
    );
    if (!findAndMadeAdmin) {
      return res.status(404).json({ message: "user dose not exist" });
    }
  } else {
    return res.status(422).json({ message: "user id is not valid" });
  }
  res.status(202).json({ message: "User is admin now" });
}

exports.demoteFromAdmin = async (req, res) => {
  const { id } = req.params;
  if (isValidObjectId(id)) {
    const findAndDemot = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          role: 'USER'
        },
      }
    );
    if (!findAndDemot) {
      return res.status(404).json({ message: "user dose not exist" });
    }
  } else {
    return res.status(422).json({ message: "user id is not valid" });
  }
  res.status(202).json({ message: "User is demoted now" });
}