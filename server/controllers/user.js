const repository = require("../repositories/user");

const createUser = (req, res, next) => {
  // CRYPT & DECRYPT
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
  res.json(users);
};

const findUserById = async (req, res, next) => {
  const id = req.params.id;
  const user = await repository.findUserById(id);
  res.send(user);
};

const updateUserById = async (req, res, next) => {
  // CRYPT & DECRYPT
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

const authUser = async (req, res, next) => {
  // CRYPT & DECRYPT

  const login = req.body;

  const user = await repository.authUser(login);

  if (user.length < 1 || !user) {
    res.json({ success: false, message: "User not found, please try again" });
  } else {
    let session = {
      userId: user[0].user_id,
      username: user[0].username,
      created: new Date(),
    };

    res.json({
      success: true,
      session: session,
    });
  }
};

module.exports = {
  createUser,
  listUsers,
  findUserById,
  updateUserById,
  deleteUserById,
  authUser,
};
