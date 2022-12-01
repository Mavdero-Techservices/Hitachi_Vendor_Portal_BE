const express = require("express");
const cors = require("cors");
const routes = require('./router/routes');
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./model");

db.sequelize.sync()
    .then(() => {
        console.log("DB Synced.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });
app.use(routes)

app.get('*', (req, res) => {
    res.status(200).send({
        markup: "Unhandled Route Path",
    })
})

require("./router/routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 12707;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
