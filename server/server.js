const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

const { encrypt, decrypt } = require("./encryption");

const db = mysql.createConnection({
  user: "adminPM",
  password: "password",
  host: "localhost",
  database: "passwordManager",
});

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const createTable = () => {
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
    "user VARCHAR(50) NOT NULL",
    "password VARCHAR(250) NOT NULL",
    "credentials_id VARCHAR(500)",
    "FOREIGN KEY (credentials_id) REFERENCES credentials(id)",
    "PRIMARY KEY(id))",
  ];

  const qusers =
    "CREATE TABLE IF NOT EXISTS users (" +
    usersTable.map((field) => {
      return field;
    });

  const q =
    "CREATE TABLE IF NOT EXISTS credentials (" +
    credentialsTable.map((field) => {
      return field;
    });

  // db.query("DROP TABLE IF EXISTS credentials;");

  db.query(qusers);
};

// Routes:

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// ADD NEW CREDENTIALS
app.post("/add", (req, res) => {
  const { name, url, username, password } = req.body;

  const hash = encrypt(password);

  db.query(
    "INSERT INTO credentials (name, url, username, password, iv) VALUES (?,?, ?, ?, ?)",
    [name, url, username, hash.password, hash.iv],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Added credentials", name);
      }
    }
  );
});

//GET ALL CREDENTIALS
app.post("/getAllCredentials", (req, res) => {
  const userId = req.body;

  // Validacion User

  if (userId) {
    db.query("SELECT id, name, url FROM credentials;", (err, results) => {
      if (err) {
        console.log(error);
      } else {
        res.send(results);
      }
    });
  } else {
    res.json({ message: "error, user not in DB" });
  }
});

// GET CREDENTIALS BY ID

app.post("/getCredentialsById", (req, res) => {
  const id = req.body.id;
  const q = `SELECT username, password, iv FROM credentials WHERE id = ${id};`;
  db.query(q, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      let { username, password, iv } = results[0];
      const hash = { password, iv };
      password = decrypt(hash);
      res.send([{ username, password }]);
    }
  });
});

// EDIT CREDENTIALS BY ID

app.post("/editCredentials", (req, res) => {
  const { id, newName, newUrl, newUsername, newPassword } = req.body;
  const newHash = encrypt(newPassword);

  console.log(`id in server`, id);
  console.log(`name in server`, newName);

  const q = `UPDATE credentials SET name = ${newName}, url = ${newUrl}, username = ${newUsername}, password = ${newHash.password}, iv = ${newHash.iv} WHERE id = ${id} `;

  db.query(q, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Credentials id= ${id} edited`);
    }
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
