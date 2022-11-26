const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

// Create user
router.post("/user", userController.createUser);
// List all users
router.get("/user", userController.listUsers);
// Find User by Id
router.get("/user/:id", userController.findUserById);
// Update User info
router.put("/user/:id", userController.updateUserById);
// Delete User
router.delete("/user/:id", userController.deleteUserById);

module.exports = router;
