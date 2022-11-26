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

// const updateUserById = async (req, res, next) => {
//   const id = await req.params.id;

//   const updatedUser = await req.body;

//   if ((await findUserById(id).length) > 0) {
//     await repository.updateUserById(id, updatedUser);
//     res.json(`User ${username} successfully updated`);
//   }
// };
module.exports = { createUser, listUsers, findUserById, updateUserById };
