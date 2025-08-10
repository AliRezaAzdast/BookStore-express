const userModel = require('./../models/userModel')

exports.getAll = async (req,res) => {
    const alluser = await userModel.getAll()
    res.json(alluser)
}

exports.register = async (req, res) => {
    const { name, username, gmail } = req.body;
  
    // Check if any required field is missing
    if (!name || !username || !gmail) {
      return res.status(422).json({ message: "User data are not valid" });
    }
  
    // Check if the user already exists
    const isUserExist = await userModel.isUserExist(username, gmail)
    if (isUserExist) {
      return res.status(409).json({ message: "Email or Username already exists" });
    }
  
    // Create new user
    const newUser = {
      name,
      username,
      gmail,
      crime: 0,
      role: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  
    await userModel.register(newUser);
    return res.status(201).json({ message: "User registered successfully" });
};

exports.login = async(req, res) => {
  const {username, gmail} = req.body
  console.log(gmail)
  const userExist = await userModel.isUserExist(username, gmail)
  console.log(userExist)
  if(userExist){
    return res.status(201).json({ message: "User loged in" });
  }
  res.status(401).json({message: "user dont exist"})
}

exports.makeAdmin = async (req, res) => {
 const userId = req.params.id
 const isUserExist = await userModel.isUserExistById(userId)
 if(isUserExist){
   await userModel.makeAdmin(userId)
   return res.status(201).json({message: 'user is admin now'})
 }
 return  res.status(401).json({message: 'user dont exist'})
}