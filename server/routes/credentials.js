const express = require("express");

const router = express.Router();

const credentialsController = require("../controllers/credentials");

// Create new credentials
router.post("/credentials/add", credentialsController.createCredentials);

router.get("/credentials", credentialsController.getAllCredentials);

module.exports = router;
