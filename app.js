const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./router/routes");
const bodyParser = require("body-parser");
const config = require("./config");
const path = require("path");
const cron = require("node-cron");
const ErpAccess = require('./controller/Erp.controller');

const callSharepointApi = () => {
  ErpAccess.getSharepointFolders({}, {
    status: (statusCode) => ({
      json: (response) => {
        console.log("sharepoint refreshed Every one hour::");
        console.log(`API response status: ${statusCode}`);
        console.log('API response:', response);
      }
    })
  });
};

// Schedule the function to run every 1 hour
cron.schedule("0 * * * *", () => {
  callSharepointApi();
});

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
app.get('/check-internet', (req, res) => {
  fetch('https://www.google.com')
    .then(() => {
      res.send({ connected: true });
    })
    .catch(() => {
      res.send({ connected: false });
    });
});

const PORT = process.env.PORT;
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("Host:::", process.env.HOST);
});
