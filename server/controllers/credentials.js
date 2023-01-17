const repository = require("../repositories/credentials");

exports.createCredentials = async (req, res, next) => {
  const newCredentials = req.body;
  const userId = req.params.userId;

  try {
    await repository.createCredentials(newCredentials, userId);
    res.send({
      success: true,
      message: `New credentials ${newCredentials.name} created`,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.getAllCredentials = async (req, res, next) => {
  const results = await repository.getAllCredentials();

  try {
    res.send({ success: true, results });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
};

exports.getUserCredentials = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const results = await repository.getUserCredentials(userId);
    res.send({ success: true, results });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
};

exports.updateCredentials = async (req, res, next) => {
  const { credId, userId } = req.params;

  const updatedCredentials = req.body;

  try {
    await repository.updateCredentials(userId, credId, updatedCredentials);
    res.send({ success: true, message: `Credentials updated successfully ` });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.showCredentials = async (req, res, next) => {
  const { userId, credId } = req.params;

  try {
    const results = await repository.showCredentials(userId, credId);
    res.send({ success: true, results });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
};

exports.deleteCredentials = async (req, res, next) => {
  const { userId, credId } = req.params;

  try {
    await repository.deleteCredentials(userId, credId);
    res.send({ success: true, message: "Credentials successfully deleted" });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
};
