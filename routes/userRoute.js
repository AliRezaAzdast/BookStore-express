const express = require('express');
const { getUsers, createUser, deleteUser, crime, makeAdmin, demoteFromAdmin } = require('../controllers/userController');
const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.delete('/:id', deleteUser);
router.put('/crime/:id', crime);
router.put('/makeAdmin/:id', makeAdmin);
router.put('/demote/:id', demoteFromAdmin);

module.exports = router;
