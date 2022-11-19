const mysql = require("mysql2/promise");

const db_config = {
  user: "adminPM",
  password: "password",
  host: "localhost",
  database: "passwordManager",
};

var connection;

// Connects checks for connection and create it, or return it if db is already connected, to avoid multiple connections
exports.connect = async () => {
  if (typeof connection == "undefined") {
    connection = await mysql.createConnection(db_config);
    console.log(`Connected to db ${db_config.database} at ${db_config.host}`);
    return connection;
  }

  return connection;
};

// Create new db if not exist
exports.createDB = async () => {
  db = await mysql.createConnection({
    user: "adminPM",
    password: "password",
    host: "localhost",
  });

  const dbResults = await db.execute("SHOW DATABASES LIKE 'passwordManager';");

  if (dbResults[0].length < 1) {
    await db.query("CREATE DATABASE IF NOT EXISTS passwordManager");
    await this.createTables();
    console.log("Database & tables created");
  }

  db.end((err) => {
    if (err) throw err;
  });
};

exports.createTables = async () => {
  const db = await this.connect();

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

  await db.query(
    "CREATE TABLE IF NOT EXISTS users (" +
      usersTable.map((field) => {
        return field;
      })
  );

  await db.query(
    "CREATE TABLE IF NOT EXISTS credentials (" +
      credentialsTable.map((field) => {
        return field;
      })
  );

  await db.query(
    "INSERT INTO users (user_id, username, password, email) VALUES (1, 'test', 'testtest', 'test@test.com');"
  );

  // db.end((err) => {
  //   if (err) throw err;
  // });
};

exports.resetTables = async () => {
  const db = await this.connect();

  await db.execute("DROP TABLE IF EXISTS credentials");
  await db.execute("DROP TABLE IF EXISTS users");

  // db.end((err) => {
  //   if (err) throw err;
  // });

  this.createTables();
};

exports.checkTables = async () => {
  var db = await this.connect();
  var tables = await db.query("SHOW TABLES;");

  console.log("tables", tables[0]);

  // Checking there are 2 tables with correct names, OW tables reset and check again
  if (tables[0].length < 2) {
    console.log("length / false");
    return false;
  }
  await tables[0].map((table) => {
    if (
      !table.Tables_in_passwordManager.includes("users") &&
      !table.Tables_in_passwordManager.includes("credentials")
    ) {
      console.log("false contains");
      return false;
    } else {
      console.log("true / contains");
      return true;
    }
  });
  // db.end((err) => {
  //   if (err) throw err;
  // });
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
  await this.createDB();

  const check = await this.checkTables();

  console.log({ check });

  if (!check) {
    await this.resetTables();
    console.log("no check");
  }
  console.log("DB & tables ready to use");
};
