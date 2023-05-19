const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./router/routes");
const bodyParser = require("body-parser");
const config = require("./config");
const path = require("path");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
const db = require("./model");
const dotenv = require("dotenv");
dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});
const CURRENT_WORKING_DIR = process.cwd();
db.sequelize
  .sync()
  .then(() => {
    console.log("DB Synced");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
app.use(cors());
app.use(routes);
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(express.json({ limit: "50mb", extended: true, parameterLimit: 50000 }));

const PORT = process.env.PORT;
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("variables:::", process.env.HOST);
});
