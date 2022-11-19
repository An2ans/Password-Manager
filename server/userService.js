const dbPromise = require("./dbConnect");

exports.getUser = async (username, password) => {
  if (username && password) {
    const db = await dbPromise.connect();

    db.query(
      "SELECT username, user_id FROM users WHERE username = ? AND password = ?;",
      [username, password],
      (error, results, fields) => {
        if (error) {
          console.log(error);
        }
        console.log({ results });
        return results[0];
      }
    );
  }
};

exports.findUser = async (username, password) => {
  if (username && password) {
    const db = await dbPromise.connect();

    db.query(
      "SELECT username, user_id FROM users WHERE username = ? AND password = ?;",
      [username, password],
      (error, results, fields) => {
        if (error) {
          console.log(error);
        }
        console.log({ results });
        return results;
      }
    );
  }
};
