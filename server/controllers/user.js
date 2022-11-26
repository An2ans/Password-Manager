const repository = require("../repositories/user");

const createUser = (req, res, next) => {
  const { username, email, password } = req.body;
  const result = repository.createUser(username, email, password);
  if (result) {
    res.json(`User ${username} successfully created`);
  } else {
    res.json("Error while creating user");
  }
};

const listUsers = async (req, res, next) => {
  const users = await repository.listUsers();
  console.log(users);
  res.json(users);
};

const findUserById = async (req, res, next) => {
  const id = req.params.id;
  const user = await repository.findUserById(id);
  res.send(user);
};

const updateUserById = async (req, res, next) => {
  const id = req.params.id;
  const updatedUser = req.body;

  await repository.updateUserById(id, updatedUser);
  res.json(`User ${id} successfully updated`);
};

const deleteUserById = async (req, res, next) => {
  const id = req.params.id;

  await repository.deleteUserById(id);
  res.json(`User ${id} successfully deleted`);
};

module.exports = {
  createUser,
  listUsers,
  findUserById,
  updateUserById,
  deleteUserById,
};
