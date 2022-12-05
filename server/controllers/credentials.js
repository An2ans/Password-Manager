const repository = require("../repositories/credentials");

exports.createCredentials = async (req, res, next) => {
  const newCredentials = req.body.credentials;
  const userId = req.body.userId;

  const success = await repository.createCredentials(newCredentials, userId);

  console.log(success);

  if (success === false) {
    res.json({
      success: false,
      message: "Sorry, we were unable to create the new credentials",
    });
  } else {
    res.json({ success: true, message: "New credentials created" });
  }
};

exports.getAllCredentials = async (req, res, next) => {
  const results = await repository.getAllCredentials();

  if (results.length > 0) {
    res.json(results);
  } else {
    res.json({ success: false, message: "Couldn't retrieve any credentials" });
  }
};

exports.getUserCredentials = async (req, res, next) => {
  const userId = req.params.userId;

  const results = await repository.getUserCredentials(userId);

  if (results.length > 0) {
    res.json(results);
  } else {
    res.json({ success: false, message: "Couldn't retrieve any credentials" });
  }
};

exports.updateCredentials = async (req, res, next) => {
  const userId = req.params.userId;

  const credId = req.params.credId;

  const updatedCredentials = req.body;

  const success = await repository.updateCredentials(
    userId,
    credentialsId,
    updatedCredentials
  );

  if (success === false) {
    res.json({
      success: false,
      message: "Sorry, we were unable to update the credentials",
    });
  } else {
    res.json({ success: true, message: "Credentials updated" });
  }
};

exports.showCredentials = async (req, res, next) => {
  const { userId, credId } = req.params;

  const success = await repository.showCredentials(userId, credId);
};
