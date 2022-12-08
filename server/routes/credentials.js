const express = require("express");

const router = express.Router();

const credentialsController = require("../controllers/credentials");

// Create new credentials
router.post("/credentials", credentialsController.createCredentials);
// Get all credentials
router.get("/credentials", credentialsController.getAllCredentials);
// Get credentials by userId
router.get("/credentials/:userId", credentialsController.getUserCredentials);
// Update the credentials
router.put(
  "/credentials/:userId/:credId",
  credentialsController.updateCredentials
);

router.get(
  "/credentials/:userId/:credId",
  credentialsController.showCredentials
);

//ACTUALIZAR UPDATE CON 2 QUERY

// ADD DELETE CREDENTIALS

module.exports = router;
