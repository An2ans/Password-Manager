const express = require("express");

const routes = require("./routes/user");

const app = express();

app.use(express.json());
app.use("/", routes);

const listener = app.listen(process.env.PORT || 3001, () => {
  console.log("Server started on port: " + listener.address().port);
});
