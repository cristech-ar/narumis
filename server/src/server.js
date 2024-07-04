require('dotenv').config()
const express = require('express');
const cors = require('cors');
const db = require('./db');
const router = require('./router/routes.js');

const app = express();

app.use(express.json());
app.use(cors({ credentials: true }));

db.connect().then(() => {
  app.use("/v1", router);

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, (err) => {
    if (err) {
      console.log("Connection Error: ", err);
      return;
    }
    console.log(`Server listening on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});

module.exports = app;
