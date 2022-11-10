// const app = require("./server");

const mysql = require("mysql2/promise");

const db_config = {
  user: "adminPM",
  password: "password",
  host: "localhost",
  database: "passwordManager",
};

var connection;
exports.connect = async function () {
  if (connection) {
    return connection;
  }

  try {
    connection = await mysql.createConnection(db_config);
    console.info("Connected to MySql on '" + db_config.host + "'");
    return connection;
  } catch (error) {
    console.error("Error when connecting to db:", error);
    connection = undefined;
    setTimeout(connect, 5000);
  }
};

exports.createDB = () => {
  app.db.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
    app.db.query("CREATE DATABASE IF NOT EXIST passwordManager", (err) => {
      if (err) throw err;
      console.log("Database created!");
    });
  });
};

exports.createTables = () => {
  const credentialsTable = [
    "id INT AUTO_INCREMENT NOT NULL",
    "name VARCHAR(50) NOT NULL",
    "url VARCHAR(250) NOT NULL",
    "username VARCHAR(250) NOT NULL",
    "password VARCHAR(250) NOT NULL",
    "iv VARCHAR(250) NOT NULL",
    "PRIMARY KEY(id));",
  ];

  const usersTable = [
    "id INT AUTO_INCREMENT NOT NULL",
    "username VARCHAR(50) NOT NULL",
    "password VARCHAR(250) NOT NULL",
    "credentials_id VARCHAR(500)",
    "FOREIGN KEY (credentials_id) REFERENCES credentials(id)",
    "PRIMARY KEY(id));",
  ];

  app.db.query(
    "CREATE TABLE IF NOT EXISTS users (" +
      usersTable.map((field) => {
        return field;
      })
  );

  app.db.query(
    "CREATE TABLE IF NOT EXISTS credentials (" +
      credentialsTable.map((field) => {
        return field;
      })
  );

  db.query(
    "INSERT INTO users (id, username, password, email) VALUES (1, test, test, test@test.com);"
  );
};

exports.resetTables = () => {
  app.db.query("DROP TABLE IF EXISTS credentials");
  app.db.query("DROP TABLE IF EXISTS users");
  createTables();
};

exports.checkTables = () => {
  const tables = app.db.query("SHOW TABLES;", (err, results) => {
    if (err) throw err;
    return results;
  });

  console.log("check results ", tables);

  if (tables.lenght < 1) {
    return false;
  }
  return true;
};
