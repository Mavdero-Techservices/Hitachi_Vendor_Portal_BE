const express = require('express');
const signUp = require("../controller/signUp.controller");
const tutorialApi = require("../controller/tutorial.controller");
const fileUploadcontroller = require("../controller/fileUploads.controller");
const router = express.Router();
// signUp
router.post("/signUp", signUp.postSingUp);
//login
router.get("/login/:emailId", signUp.postLogin);
//fileUpload
router.post("/fileUpload", fileUploadcontroller.fileUpload);
//tutorialApi's Crud
// Create
router.post("/save", tutorialApi.save);
//Retrieve all data
router.get("/getAll", tutorialApi.getAll);
// Retrieve data with id
router.get("/getById/:id", tutorialApi.getById);
// Update with id
router.put("/updateById/:id", tutorialApi.updateById);
// Delete with id
router.delete("/deleteById/:id", tutorialApi.deleteById);

module.exports = router;
