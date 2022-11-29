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
