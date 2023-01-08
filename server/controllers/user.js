const repository = require("../repositories/user");

const createUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    await repository.createUser(username, email, password);

    res.send({
      success: true,
      message: `User ${username} successfully created`,
    });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const listUsers = async (req, res, next) => {
  const users = await repository.listUsers();
  res.json(users);
};

const findUserById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await repository.findUserById(id);
    res.send({ success: true, user });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
};

const updateUserById = async (req, res, next) => {
  const id = req.params.id;
  const updatedUser = req.body;

  try {
    await repository.updateUserById(id, updatedUser);
    res.send({ success: true, message: `User ${id} successfully updated` });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
};

const deleteUserById = async (req, res, next) => {
  const id = req.params.id;

  try {
    await repository.deleteUserById(id);
    res.send({ success: true, message: `User ${id} successfully deleted` });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
};

const authUser = async (req, res, next) => {
  const login = req.body;

  try {
    const user = await repository.authUser(login);
    const session = {
      userId: user.user_id,
      username: user.username,
      created: new Date(),
    };

    res.send({
      success: true,
      message: `Welcome back ${user.username}`,
      session,
    });
  } catch (err) {
    res.send({ success: false, message: err.message });
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
