const express = require("express");

const router = express.Router();

const credentialsController = require("../controllers/credentials");

// Create new credentials
router.post("/credentials/add", credentialsController.createCredentials);
// Get all credentials
router.get("/credentials", credentialsController.getAllCredentials);
// Get credentials by userId
router.get("/credentials/:userId", credentialsController.getUserCredentials);
// Update the credentials
router.put("/credentials/:userId", credentialsController.updateCredentials);

module.exports = router;
