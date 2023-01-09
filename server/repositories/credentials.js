const db = require("../dbService");
const { encrypt, decrypt } = require("../encryption");

exports.createCredentials = async (newCredentials, userId) => {
  const con = await db.connect();

  const { name, url, username, password } = newCredentials;

  const { hash, iv } = encrypt(password);

  const created = new Date();

  await con.query(
    "INSERT INTO credentials (name, url, username, password, iv, created, user_id) VALUES(?, ?, ?, ?, ?, ?, ?);",
    [name, url, username, hash, iv, created, userId]
  );
};

exports.getAllCredentials = async () => {
  const con = await db.connect();

  const results = await con.query("SELECT * FROM credentials");

  return results[0];
};

exports.getUserCredentials = async (userId) => {
  const con = await db.connect();

  const results = await con.query(
    "SELECT credentials_id, name, url FROM credentials WHERE user_id = ?;",
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

  if (!password) {
    throw new Error("The new password is incorrect, please try again");
  }

  if (!username) {
    throw new Error("The new username is incorrect, please try again");
  }

  const { hash, iv } = encrypt(password);

  const success = await con.query(
    "UPDATE credentials SET name = ?, url = ?, username = ?, password = ?, iv = ? WHERE credentials_id = ? AND user_id = ?;",
    [name, url, username, hash, iv, credentialsId, userId]
  );

  if (success[0].affectedRows == 0) {
    throw new Error("Unable to update the credentials");
  }
};

exports.showCredentials = async (userId, credId) => {
  const con = await db.connect();

  const results = await con.query(
    "SELECT username, password, iv FROM credentials WHERE user_id = ? AND credentials_id = ?",
    [userId, credId]
  );

  if (results[0].length < 1) {
    throw new Error("Unable to fetch the credentials");
  }

  const hash = results[0][0].password;
  const username = results[0][0].username;
  const iv = results[0][0].iv;

  const password = decrypt({ hash, iv });

  return { username, password };
};

exports.deleteCredentials = async (userId, credId) => {
  const con = await db.connect();

  const success = await con.query(
    "DELETE from credentials WHERE user_id = ? AND credentials_id = ?",
    [userId, credId]
  );

  if (success[0].affectedRows == 0) {
    throw new Error("Unable to delete the credentials");
  }
};
