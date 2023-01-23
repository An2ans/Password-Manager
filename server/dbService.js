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

// Create new db if not exist.
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

// Create users and credentials tables
exports.createTables = async () => {
  const db = await this.connect();

  const credentialsTable = [
    "credentials_id INT AUTO_INCREMENT NOT NULL",
    "name VARCHAR(50) NOT NULL",
    "url VARCHAR(250) NOT NULL",
    "username VARCHAR(250) NOT NULL",
    "password VARCHAR(250) NOT NULL",
    "iv VARCHAR(250) NOT NULL",
    "created DATETIME DEFAULT current_timestamp",
    "user_id INT NOT NULL",
    "PRIMARY KEY (credentials_id)",
    "FOREIGN KEY (user_id) REFERENCES users(user_id));",
  ];

  const usersTable = [
    "user_id INT AUTO_INCREMENT NOT NULL",
    "username VARCHAR(50) NOT NULL UNIQUE",
    "password VARCHAR(250) NOT NULL",
    "iv VARCHAR(250) NOT NULL",
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
    "INSERT INTO users (user_id, username, password, iv, email) VALUES (1, 'admin', 'password', 'iv', 'test@test.com');"
  );

  await db.query(
    "INSERT INTO credentials (credentials_id, name, url, username, password, iv, user_id) VALUES (1, 'test', 'www.google.com', 'username',  'password', 'iv', 1);"
  );

  // db.end((err) => {
  //   if (err) throw err;
  // });
};

// Drop the tables and create them again
exports.resetTables = async () => {
  const db = await this.connect();

  await db.execute("DROP TABLE IF EXISTS credentials");
  await db.execute("DROP TABLE IF EXISTS users");

  this.createTables();
};

// Check  if tables created correctly
exports.checkTables = async () => {
  const db = await this.connect();
  const tables = await db.query("SHOW TABLES;");
  let success = undefined;

  console.log("tables", tables[0]);

  if (tables[0].length < 2) {
    success = false;
  }
  await tables[0].map((table) => {
    if (
      !table.Tables_in_passwordManager.includes("users") &&
      !table.Tables_in_passwordManager.includes("credentials")
    ) {
      success = false;
      return success;
    } else {
      success = true;
    }
  });

  return success;
};

exports.setup = async () => {
  await this.createDB();

  const check = await this.checkTables();

  console.log({ check });

  if (!check) {
    await this.resetTables();
    console.log("There was an error in the database, tables reset.");
  }
  console.log("DB & tables ready to use");
};
