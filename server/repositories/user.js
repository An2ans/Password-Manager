const db = require("../dbService");

const { encrypt, decrypt } = require("../encryption");

exports.createUser = async (username, email, password) => {
  const con = await db.connect();

  const { hash, iv } = encrypt(password);

  const search = await con.query("SELECT * FROM users WHERE username = ?;", [
    username,
  ]);

  if (search[0].length > 0) {
    throw new Error("This username already exists");
  }

  await con.query(
    "INSERT INTO users (username, email, password, iv) VALUES (?, ?, ?, ?);",
    [username, email, hash, iv]
  );
};

exports.listUsers = async () => {
  const con = await db.connect();

  const users = await con.query(
    "SELECT * FROM users;",
    [],
    (err, res, fields) => {
      if (err) {
        console.log(err);
        return [];
      } else {
        return res;
      }
    }
  );

  return users[0];
};

exports.findUserById = async (id) => {
  const con = await db.connect();

  const results = await con.query("SELECT * FROM users WHERE user_id = ?;", [
    id,
  ]);

  if (results[0].length < 1) {
    throw new Error("User not found");
  } else {
    return results[0];
  }
};

exports.findUserByName = async (username) => {
  const con = await db.connect();

  const results = await con.query("SELECT * FROM users WHERE username = ?;", [
    username,
  ]);

  if (results[0].length < 1) {
    throw new Error("User not found");
  } else {
    return results[0][0];
  }
};

exports.updateUserById = async (id, updatedUser) => {
  const con = await db.connect();

  const { username, password, email } = await updatedUser;

  const { hash, iv } = encrypt(password);

  if (!username || !password || !email) {
    throw new Error("The new details are wrong, user not updated");
  }

  try {
    await con.query(
      "UPDATE users SET username = ?, email = ?, password = ?, iv = ? WHERE user_id = ?",
      [username, email, hash, iv, parseInt(id)]
    );
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.deleteUserById = async (id) => {
  const con = await db.connect();

  const search = await con.query("SELECT * FROM users WHERE user_id = ?", [id]);

  if (search[0].length > 0) {
    await con.query("DELETE FROM users WHERE user_id = ?", [id]);
  } else {
    throw new Error("User not found");
  }
};

exports.authUser = async (login) => {
  const { username, password } = login;

  //To login user first we find the user in the db
  const user = await this.findUserByName(username);

  //If user is found, we decrypt the pass and store it in userPass, then compare with the input
  if (user) {
    const hash = user.password;
    const iv = user.iv;

    const userPass = decrypt({ hash, iv });
    if (password === userPass) {
      return user;
    } else {
      throw new Error(
        "The password that you have introduced is wrong, please try again"
      );
    }
  }
};
