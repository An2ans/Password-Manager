const mysql = require("mysql2");
const db = mysql.createConnection({
  user: "adminPM",
  password: "password",
  host: "localhost",
  database: "passwordManager",
});

exports.createDB = () => {
  db.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
    db.query("CREATE DATABASE IF NOT EXIST passwordManager", (err) => {
      if (err) throw err;
      console.log("Database created!");
    });
  });
};

exports.createTables = () => {
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

exports.resetTables = () => {
  db.query("DROP TABLE IF EXISTS credentials");
  db.query("DROP TABLE IF EXISTS users");

  this.createTables();
};

exports.checkTables = () => {
  const tables = app.db.query("SHOW TABLES;", (err, results) => {
    if (err) throw err;
    return results;
  });

  if (tables.lenght < 2) {
    return false;
  }
  return true;
};
