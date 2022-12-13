const repository = require("../repositories/credentials");

exports.createCredentials = async (req, res, next) => {
  const newCredentials = req.body;
  const userId = req.params.userId;

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
    credId,
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

  const results = await repository.showCredentials(userId, credId);
  if (results.length > 0) {
    res.json({ success: true, results });
  } else {
    res.json({ success: false });
  }
};

exports.deleteCredentials = async (req, res, next) => {
  const { userId, credId } = req.params;

  const success = await repository.deleteCredentials(userId, credId);

  if (success === false) {
    res.json({
      success: false,
      message: "Sorry, we were unable to update the credentials",
    });
  } else {
    res.json({ success: true, message: "Credentials updated" });
  }
};
