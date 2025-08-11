const express = require("express");
const router = express.Router();
const userController = require("./../controller/userController");

router.get("/", userController.getAll);
router.post("/register", userController.register)
router.post('/login',userController.login)
router.put('/madeadmin/:id',userController.makeAdmin)
router.put('/crime/:id', userController.updatedCrime)

module.exports = router;
