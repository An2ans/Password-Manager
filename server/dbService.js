const mysql = require("mysql2");

// Import db promise from connection file
const dbPromise = require("./dbConnect");

var connection;

function getConnection() {
  if (typeof connection == "undefined") {
    // connection =  connect to db;
  }

  return connection;
}

function closeConnection() {
  connection.end();
}

// Create new db if not exist
exports.createDB = async () => {
  db = getConnection();

  const dbResults = db.query("SHOW DATABASES LIKE 'passwordManager';");

  console.log({ dbResults });

  db.query("CREATE DATABASE IF NOT EXISTS passwordManager", (err) => {
    if (err) throw err;
  });
  closeConnection();
};

exports.createTables = async () => {
  const db = await dbPromise.connect();

  const credentialsTable = [
    "credentials_id INT AUTO_INCREMENT NOT NULL",
    "name VARCHAR(50) NOT NULL",
    "url VARCHAR(250) NOT NULL",
    "username VARCHAR(250) NOT NULL",
    "password VARCHAR(250) NOT NULL",
    "iv VARCHAR(250) NOT NULL",
    "user_id INT NOT NULL",
    "PRIMARY KEY (credentials_id)",
    "FOREIGN KEY (user_id) REFERENCES users(user_id));",
  ];

  const usersTable = [
    "user_id INT AUTO_INCREMENT NOT NULL",
    "username VARCHAR(50) NOT NULL",
    "password VARCHAR(250) NOT NULL",
    "email VARCHAR(250) NOT NULL",
    "PRIMARY KEY (user_id));",
  ];

  db.query(
    "CREATE TABLE IF NOT EXISTS users (" +
      usersTable.map((field) => {
        return field;
      })
  );

  db.query(
    "CREATE TABLE IF NOT EXISTS credentials (" +
      credentialsTable.map((field) => {
        return field;
      })
  );

  db.query(
    "INSERT INTO users (user_id, username, password, email) VALUES (1, 'test', 'test', 'test@test.com');"
  );
};

exports.resetTables = async () => {
  const db = await dbPromise.connect();

  db.query("DROP TABLE IF EXISTS credentials");
  db.query("DROP TABLE IF EXISTS users");

  this.createTables();
};

exports.checkTables = async () => {
  var db = await dbPromise.connect();
  var tables = await db.query("SHOW TABLES;");

  var success = false;
  console.log({ tables });

  // Checking there are 2 tables with correct names, OW tables reset and check again
  if (tables[0].length < 2) {
    console.log("Needs to reset tables");
    this.resetTables();
    console.log("Tables reset");
  }
  tables[0].map((table) => {
    if (
      table.Tables_in_passwordManager.includes("users") ||
      table.Tables_in_passwordManager.includes("credentials")
    ) {
      console.log("Tables ready to use");
      success = true;
    } else {
      this.resetTables();
      console.log("Tables reset, users and credentials empty");
      setTimeout(this.checkTables, 2000);
      success = false;
    }
  });

  return success;
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

exports.initialize = async () => {
  // const db = await dbPromise.connect();
  // console.log(typeof db);
  // if (db) {
  // console.log("conectado");
  return this.checkTables();

  // db.end();
  // } else {
  // console.log("no conectado");
  // }

  // if (!db) {
  //   createDB();
  //   createTables();
  //   console.log("Created new Database passwordManager");
  // }

  // checkTables();
};
