const express = require("express");

const router = express.Router();

const credentialsController = require("../controllers/credentials");

// Get all credentials
router.get("/credentials", credentialsController.getAllCredentials);

// Get credentials by userId
router.get("/credentials/:userId", credentialsController.getUserCredentials);

// Create new credentials
router.post("/credentials/:userId", credentialsController.createCredentials);

// Show all details (username, password) from this credential
router.get(
  "/credentials/:userId/:credId",
  credentialsController.showCredentials
);

// Update the credentials details
router.put(
  "/credentials/:userId/:credId",
  credentialsController.updateCredentials
);

// Update the credentials details
router.delete(
  "/credentials/:userId/:credId",
  credentialsController.deleteCredentials
);

module.exports = router;
