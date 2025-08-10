const express = require("express");
const router = express.Router();
const userController = require("./../controller/userController");

router.get("/", userController.getAll);
router.post("/register", userController.register)
router.post('/login',userController.login)
router.put('/:id',userController.makeAdmin)

module.exports = router;
