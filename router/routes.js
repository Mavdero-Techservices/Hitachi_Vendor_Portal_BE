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
const approvalStatus = require("../controller/approval.controller")
const periodicRequest = require("../controller/periodicReq.controller")
const vendorFile = require("../controller/vendorFile.controller")
const MasterVendorSubUser=require("../controller/MasterVendorSubUser.controller")
const vendorApproval = require("../controller/vendorPortalApproval.controller")

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
// router.post("/saveStatdetail", statdetail.postStatdetail);
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


router.post("/saveApproval", approvalStatus.saveApprovalStatus);
router.put("/updateApprovalStatus/:userId", approvalStatus.updateApprovalStatus);
router.get('/getApprovedStatus', approvalStatus.getApprovedStatus);
router.get('/getRejectStatus', approvalStatus.getRejectStatus);
router.get('/getApprovalList', approvalStatus.getApprovalList);

router.post("/savePeriodicReq", periodicRequest.savePeriodicRequest);
router.put("/updatePeriodicReq/:userId", periodicRequest.updatePeriodicRequest);
router.get("/getPeriodicReq", periodicRequest.periodicReqList);
router.delete("/deletePeriodicReq/:id", periodicRequest.periodicReqdelete);

router.post("/saveVendorFile", vendorFile.saveVendorFiles);
router.put("/updateVendorFile/:userId", vendorFile.updateVendorFiles);

router.post('/saveMasterVendorSubUser',MasterVendorSubUser.saveMasterVendorSubUser);
router.post("/getMasterVendorSubUserById",MasterVendorSubUser.getMasterVendorSubUserById);
router.get("/getAllMasterVendorSubUser",MasterVendorSubUser.getAllMasterVendorSubUser);
router.post("/UpdateMasterVendorSubUserById",MasterVendorSubUser.UpdateMasterVendorSubUserById);

router.post("/saveVendorApproval", vendorApproval.saveVendorApprovalStatus);
router.put("/updatevendorApprovalStatus/:id", vendorApproval.updateVendorApprovalStatus);
router.get('/vendorApprovalList', vendorApproval.getVendorApprovalList);
router.get('/downloadVendorApprovalList/:vendorCode', vendorApproval.downloadVendorItemExcel);

module.exports = router;
