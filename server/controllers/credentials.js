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
