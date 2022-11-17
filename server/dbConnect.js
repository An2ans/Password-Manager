const mysql = require("mysql2/promise");

const db_config = {
  user: "adminPM",
  password: "password",
  host: "localhost",
  database: "passwordManager",
};

var connection;

exports.query = async function (query) {
  console.log("Running query:" + query);
  db = await this.connect();
  var result = db.query(query);

  return result;
};

exports.connect = async function () {
  if (connection) {
    console.log("connection already exists, returning");
    return connection;
  }

  try {
    console.log("Creatign connection");
    connection = await mysql.createConnection(db_config);
    console.info("Connected to MySql on '" + db_config.host + "'");
    return connection;
  } catch (error) {
    console.error("Error when connecting to db:", error);
    connection = undefined;
    // setTimeout(this.connect, 3000);
  }
};
