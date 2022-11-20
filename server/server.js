const express = require("express");
const cors = require("cors");
// const session = require("express-session");
const app = express();

const { encrypt, decrypt } = require("./encryption");

const { getUser, createUser } = require("./userService");

const { connect, initialize } = require("./dbService");

// Initialize creates the DB and tables (if not exist), connect to db and reset tables if data corrupted
initialize();

// app.get("/setup", (req, res) => {
//   var result = initialize();
//   res.json({ success: Boolean(result) });
// });

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Routes:

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// Login User: I use getUser function to search in DB for the user, if found it returns the id and create the session
app.post("/auth", async (req, res) => {
  // Capture the input fields
  const { username, password } = req.body;
  try {
    const results = await getUser(username, password);
    console.log({ results });

    if ((await results[0].length) < 1 || !results) {
      console.log("User not found");
      res.send("User not found");
    }

    const userId = await results[0].user_id;
    if (userId) {
      // Create the session for localStorage and send it

      let session = {
        userId: userId,
        username: username,
        created: new Date(),
      };

      res.json({
        success: true,
        session: session,
      });

      console.log(`Logged in as ${username}`);
    } else {
      res.json({
        success: false,
        message: `User ${username} not found, please try again`,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/sign-up", (req, res) => {
  const { username, password, email } = req.body;
  if (username && password && email) {
    createUser({ username, password, email });
    res.json({
      success: true,
      user: { username, password },
      message: `User ${username} successfully created`,
    });
  } else {
    res.json({
      success: false,
      message: `User not valid, please try again`,
    });
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

// We'll be using sessions to determine whether the user is logged-in or not.
// app.use(
//   session({
//     secret: "secret",
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//       httpOnly: true,
//       maxAge: 360000,
//     },
//   })
// );
