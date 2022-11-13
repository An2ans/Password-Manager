const express = require("express");
const cors = require("cors");
const session = require("express-session");
const app = express();

const { encrypt, decrypt } = require("./encryption");

const dbPromise = require("./dbConnect");

const {
  createDB,
  createTables,
  resetTables,
  checkTables,
} = require("./dbService");

const initialize = async () => {
  const db = await dbPromise.connect();
  const tables = await db.execute("SHOW TABLES;");

  if (tables[0].length < 2) {
    createTables();
    console.log("Tables created");
  }
  tables[0].map((table) => {
    if (
      table.Tables_in_passwordManager.includes("users") ||
      table.Tables_in_passwordManager.includes("credentials")
    ) {
      console.log("Tables ready to use");
      return true;
    } else {
      resetTables();
      console.log("Tables reset, users and credentials empty");
    }
  });
};

initialize();

// We'll be using sessions to determine whether the user is logged-in or not.
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Routes:

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.post("/auth", (req, res) => {
  // Capture the input fields
  let username = req.body.username;
  let password = req.body.password;
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    db.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password],
      (error, results, fields) => {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
          // Authenticate the user
          req.session.loggedin = true;
          req.session.username = username;
          // Redirect to home page
          res.redirect("/");
        } else {
          res.send("Incorrect Username and/or Password!");
        }
        res.end();
      }
    );
  } else {
    res.send("Please enter Username and Password!");
    res.end();
  }
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
