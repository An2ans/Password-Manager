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
