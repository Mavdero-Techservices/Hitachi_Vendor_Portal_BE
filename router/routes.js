const express = require('express');
const signUp = require("../controller/signUp.controller");
const tutorialApi = require("../controller/tutorial.controller");
const vdetail = require("../controller/vendorDetails.controller");
const bankdetail = require("../controller/bankDetails.controller");
const fileUploadcontroller = require("../controller/fileUploads.controller");
const imageUploadcontroller = require("../controller/imageUpload.controller");
const fdetail = require("../controller/financialDetails.controller");
const statdetail = require("../controller/statDetails.controller")
const compDetail = require("../controller/compDetail.controller");
const commsDetail = require("../controller/commsDetails.controller")
const hisysContact = require("../controller/hisysContact.controller")
const contactTeam = require("../controller/ContactTeam.controller")

const router = express.Router();
// signUp
router.post("/signUp", signUp.postSingUp);
//login
router.post("/login", signUp.postLogin);

router.get('/signout', signUp.signout);
//saveUser
router.post("/saveUser", signUp.saveUser);

//fileUpload
router.post("/fileUpload", fileUploadcontroller.fileUpload);
//resetPassword
router.post("/resetPassword", signUp.resetPassword);
//resetPasswordByCode
router.post("/resetPasswordByCode", signUp.resetPasswordByCode);
//imageUpload
router.post("/imageUpload", imageUploadcontroller.imageUpload);
//getImage
router.get("/getImage", imageUploadcontroller.getImage);

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

//vdetail schema - create
router.post("/saveVdetail", vdetail.postVdetail);
//save vendor-communication details
router.post("/SaveVendorCommunication", vdetail.SaveVendorCommunication);
//getCountry
router.get('/getCountry', vdetail.getCountry);
//getStateAndcityByzipcode
router.get('/getStateAndcityByzipcode/:code/:pinCode', vdetail.getStateAndcityByzipcode);
//fdetail schema - Create
// router.post("/saveFdetail", fdetail.postFdetail);
router.post("/saveFinacialDetail", fdetail.saveFinacialDetail);
//bankdetail schema - Create
router.post("/saveBdetail", bankdetail.postBankdetail);
//statdetails schema - create
router.post("/saveStatdetail", statdetail.postStatdetail);
router.post("/saveStatutoryDetail", statdetail.saveStatutoryDetail);
//compdetails schema - create
router.post("/saveComplianceDetail", compDetail.saveComplianceDetail);

router.get('/downloadPdf/:name', compDetail.downloadPdf);
router.get('/readPdf', compDetail.readPdf);
//hisysContact schema - create
router.post("/saveHisysContact", hisysContact.postHisysContact);
router.post("/saveContactTeam", contactTeam.saveContactTeam);


module.exports = router;
