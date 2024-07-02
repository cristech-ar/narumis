const cors = require("cors");
const express = require("express");
const router = require("./router/routes.js");

const app = express();

app.use(express.json());
app.use(cors({ credentials: true }));
app.use("/v1", router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, (err) => {
  if (err) {
    console.log("Connection Error: ", err);
    return;
  }
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
