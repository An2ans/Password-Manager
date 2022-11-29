const db = require("../dbService");

exports.createUser = async (username, email, password) => {
  const con = await db.connect();

  await con.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?);",
    [username, email, password],
    (err, results, fields) => {
      if (err) {
        console.log(err);
        return false;
      }
      return true;
    }
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
  const results = await con.query(
    "SELECT * FROM users WHERE user_id = ?;",
    [id],
    (err, res) => {
      if (err) {
        console.log(err);
        return [];
      } else {
        return res;
      }
    }
  );
  return results;
};

exports.updateUserById = async (id, updatedUser) => {
  const con = await db.connect();

  const { username, password, email } = await updatedUser;

  await con.query(
    "UPDATE users SET username = ?, email = ?, password = ? WHERE user_id = ?",
    [username, email, password, parseInt(id)],
    (err, res) => {
      if (err) {
        console.log(err);
        return false;
      } else {
        return true;
      }
    }
  );
};

exports.deleteUserById = async (id) => {
  const con = await db.connect();

  await con.query("DELETE FROM users WHERE user_id = ?", [id], (err, res) => {
    if (err) {
      console.log(err);
      return false;
    } else {
      return true;
    }
  });
};

exports.authUser = async (login) => {
  const con = await db.connect();

  const { username, password } = login;

  const results = await con.query(
    "SELECT * FROM users WHERE username = ? AND password = ?;",
    [username, password],
    (err, res) => {
      if (err) {
        console.log(err);
        return false;
      } else {
        return res;
      }
    }
  );
  return results[0];
};
