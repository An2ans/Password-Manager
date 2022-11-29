const express = require("express");
const cors = require("cors");

const routes = require("./routes/user");

const app = express();

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

const listener = app.listen(process.env.PORT || 3001, () => {
  console.log("Server started on port: " + listener.address().port);
});
