const db = require("../dbService");

exports.createCredentials = async (newCredentials, userId) => {
  const con = await db.connect();

  const { name, url, username, password } = newCredentials;

  const success = await con.query(
    "INSERT INTO credentials (name, url, username, password, iv, user_id) VALUES(?, ?, ?, ?, 'AAAA', ?);",
    [name, url, username, password, userId],
    (err, res) => {
      if (err) {
        console.log(err);
        return false;
      } else {
        return true;
      }
    }
  );
  return success;
};

exports.getAllCredentials = async () => {
  const con = await db.connect();

  const results = await con.query("SELECT * FROM credentials");

  if (results[0]) {
    return results[0];
  }
  return [];
};

exports.getUserCredentials = async (userId) => {
  const con = await db.connect();

  const results = await con.query(
    "SELECT * FROM credentials WHERE user_id = ?;",
    [userId]
  );

  if (results[0]) {
    return results[0];
  }
  return [];
};

exports.updateCredentials = async (
  userId,
  credentialsId,
  updatedCredentials
) => {
  const con = await db.connect();

  const { name, url, username, password } = updatedCredentials;

  const success = await con.query(
    "UPDATE credentials SET name = ?, url = ?, username = ?, password = ? WHERE credentials_id = ? AND user_id = ?;",
    [name, url, username, password, credentialsId, userId],
    (err, res) => {
      if (err) {
        console.log(err);
        return false;
      }
    }
  );

  if (success[0].affectedRows == 0) {
    return false;
  } else {
    return true;
  }
};

exports.showCredentials = async (userId, credId) => {
  const con = await db.connect();

  const results = await con.query(
    "SELECT username, password FROM credentials WHERE user_id = ? AND credentials_id = ?",
    [userId, credId]
  );

  if (results[0]) {
    return results[0];
  } else {
    return [];
  }
};

exports.deleteCredentials = async (userId, credId) => {
  const con = await db.connect();

  const success = await con.query(
    "DELETE from credentials WHERE user_id = ? AND credentials_id = ?",
    [userId, credId]
  );

  if (success[0].affectedRows == 0) {
    return false;
  } else {
    return true;
  }
};
