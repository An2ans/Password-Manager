const { connect } = require("./dbService");

exports.getUser = async (username, password) => {
  console.log("ON GET USER");
  if (username && password) {
    const db = await connect();

    const results = await db.query(
      "SELECT username, user_id FROM users WHERE username = ? AND password = ?;",
      [username, password]
    );
    console.log("results on get user:", results[0]);
    return results[0];
  }
};

exports.createUser = async (user) => {
  const { username, password, email } = user;

  try {
    const db = await connect();

    await db.query(
      "INSERT INTO users (username, password, email) VALUES(?, ?, ?);",
      [username, password, email]
    );

    console.log(`User ${username} successfully created"!`);
  } catch (error) {
    console.log("Error while creating user", error);
  }
};

//deleteUser

//updatePassword
