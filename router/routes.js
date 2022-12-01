module.exports = app => {
    const signUp = require("../controller/signUp.controller");

    var router = require("express").Router();

    // Create
    router.post("/signUp", signUp.postSingUp);

    // Retrieve a single data with id
    router.get("/getUserById/:id", signUp.getUserById);

    // Update with id
    router.put("/updateUserById/:id", signUp.updateUserById);

    // Delete with id
    router.delete("/deleteUserById/:id", signUp.deleteUserById);

};
