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
/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({
    title: 'Express',
    message: 'Welcome to the API'
  });
});
// signUp
router.post("/signUp", signUp.postSingUp);
//login
router.post("/login", signUp.postLogin);

router.get('/signout', signUp.signout);
router.get('/emailNotification', signUp.emailNotification);
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
// update vdetail
router.put("/updateVdetail/:userId", vdetail.updateVendor);
//save vendor-communication details
router.post("/SaveVendorCommunication", vdetail.SaveVendorCommunication);
//update communication details
router.put("/updateCommunication/:userId", vdetail.updateCommunication);
//getCountry
router.get('/getCountry', vdetail.getCountry);
//getStateAndcityByzipcode
router.get('/getStateAndcityByzipcode/:code/:pinCode', vdetail.getStateAndcityByzipcode);
//fdetail schema - Create
// router.post("/saveFdetail", fdetail.postFdetail);
router.post("/saveFinacialDetail", fdetail.saveFinacialDetail);
//Update
router.put("/updateFinacialDetail/:userId", fdetail.updateFinacialDetail);
//bankdetail schema - Create
router.post("/saveBankDetail", bankdetail.saveBankDetail);
//bankdetail - Update
router.put("/updateBankDetail/:userId", bankdetail.updateBankDetail);

// router.delete("/deleteFile/:filename",bankdetail.deleteFile);
//statdetails schema - create
router.post("/saveStatdetail", statdetail.postStatdetail);
router.post("/saveStatutoryDetail", statdetail.saveStatutoryDetail);

router.put("/updateStatutoryDetail/:userId", statdetail.updateStatutoryDetail)
//compdetails schema - create
router.post("/saveComplianceDetail", compDetail.saveComplianceDetail);

router.put("/updateComplianceDetail/:userId", compDetail.updateComplianceDetail);

router.post('/createRelatedDisclosurePdf', compDetail.createRelatedDisclosurePdf);
router.post('/createCompliancePdf', compDetail.createCompliancePdf);
router.post('/createnonDisclosure', compDetail.createnonDisclosure);
//downloadLog
router.get('/downloadPdf/:name', compDetail.downloadPdf);
router.get('/downloadPdfUploads/:name', compDetail.downloadPdfUploads);
router.get('/readPdf', compDetail.readPdf);
router.get('/readPdfUploads', compDetail.readPdfUploads);

router.get('/getfinacialYear', compDetail.getfinacialYear);
//hisysContact schema - create
router.post("/saveHisysContact", hisysContact.postHisysContact);
router.post("/saveContactTeam", contactTeam.saveContactTeam);
//update contact team
router.put("/updateContactTeam/:userId", contactTeam.updateContactTeam);
router.get("/getAllCollection/:userId", contactTeam.getAllCollection);
//update all collection
router.put("/updateAllCollection/:userId", contactTeam.updateAllCollection);

router.get("/getvendorDetail/:userId", contactTeam.getvendorDetail);
router.get("/getAllUserDetail", contactTeam.getAllUserDetail);


module.exports = router;
