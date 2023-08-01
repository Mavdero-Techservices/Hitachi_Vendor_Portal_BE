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
const accountStatementApproval = require("../controller/accountStatementApproval.controller")
const purchaseOrder = require("../controller/purchaseOrder.controller")
const vendorCodeDetail = require("../controller/vendorCodeDetails.controller")
const MasterVendorSubUser=require("../controller/MasterVendorSubUser.controller")
const MasterVendorUserAccess=require("../controller/MasterVendorUserAccess")
const ErpAccess=require("../controller/Erp.controller")
const poTeam=require("../controller/poTeam.controller");
const invoice = require("../controller/invoice.controller")
const router = express.Router();
const edd = require("../controller/edd.controller")
/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({
    title: 'Express',
    message: 'Welcome to the API'
  });
});
// signUp
router.post("/signUp", signUp.postSingUp);
router.get("/signUp/getByUserId/:userId", signUp.getUserId);
router.get("/signUp/signupFindSubUserList/:userId", signUp.signupFindSubUserList);
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
//ErpDetail
router.get("/getErp", tutorialApi.getErp);
//getErpTestingOData
router.get("/getErpTestingOData", tutorialApi.getErpTestingOData);
//getErpVendorMasterIntegration
router.get("/getErpVendorMasterIntegration", tutorialApi.getErpVendorMasterIntegration);
//postErpTestingOData
router.post("/postErpTestingOData", tutorialApi.postErpTestingOData);
//postErpVendorMasterIntegration
router.post("/postErpVendorMasterIntegration", tutorialApi.postErpVendorMasterIntegration);
//getErpById
router.get("/getErpById", tutorialApi.getErpById);
//updateErpVendorMasterIntegration
router.put("/updateErpVendorMasterIntegration", tutorialApi.updateErpVendorMasterIntegration);
//Retrieve all data
router.get("/getAll", tutorialApi.getAll);
// Retrieve data with id
router.get("/getById/:id", tutorialApi.getById);
// Update with id
router.put("/updateById/:id", tutorialApi.updateById);
// Delete with id
router.delete("/deleteById/:id", tutorialApi.deleteById);
//SharepointfileUpload
router.post("/SharepointfileUpload", tutorialApi.SharepointfileUpload);
//Sharepoint get po file
router.get("/getPOfileDownload", tutorialApi.getPOfileDownload);
//vdetail schema - create
router.post("/saveVdetail", vdetail.postVdetail);
// update vdetail
router.put("/updateVdetail/:userId", vdetail.updateVendor);
router.put('/updateVdetail/userStatus/:userid', vdetail.UpdateUserStatusByUserId);
//save vendor-communication details
router.post("/SaveVendorCommunication", vdetail.SaveVendorCommunication);
//update communication details
router.put("/updateCommunication/:userId", vdetail.updateCommunication);
//getCountry
router.get('/getCountry', vdetail.getCountry);
//getStateAndcityByzipcode
router.get('/getStateAndcityByzipcode/:code/:Post_Code', vdetail.getStateAndcityByzipcode);
//fdetail schema - Create
// router.post("/saveFdetail", fdetail.postFdetail);
router.post("/saveFinacialDetail", fdetail.saveFinacialDetail);
//Update
router.put("/updateFinacialDetail/:userId", fdetail.updateFinacialDetail);
//bankdetail schema - Create
router.post("/saveBankDetail", bankdetail.saveBankDetail);
//bankdetail - Update
router.put("/updateBankDetail/:userId", bankdetail.updateBankDetail);
router.get('/AllRejectVendorList', vdetail.AllRejectVendorList);


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

router.put("/getVendorEditTabs/:vendorCode", contactTeam.vendorEditTabList);

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

router.get("/vendorIdList/:vendorId", periodicRequest.vendorIdList);

router.post("/saveVendorFile", vendorFile.saveVendorFiles);
router.put("/updateVendorFile/:userId", vendorFile.updateVendorFiles);

router.post('/saveMasterVendorSubUser',MasterVendorSubUser.saveMasterVendorSubUser);
router.post("/getMasterVendorSubUserById",MasterVendorSubUser.getMasterVendorSubUserById);
router.get("/getAllMasterVendorSubUser",MasterVendorSubUser.getAllMasterVendorSubUser);

router.put("/UpdateMasterSubUserById",MasterVendorSubUser.UpdateMasterSubUserById);

router.put("/UpdateMasterVendorSubUserById",MasterVendorSubUser.UpdateMasterVendorSubUserById);
router.delete("/deleteMasterVendorSubUserById/:id",MasterVendorSubUser.deleteMasterVendorSubUserById);
router.get("/getAllVendorSubUser",MasterVendorSubUser.getAllVendorSubUser);

router.post('/saveMasterVendorUserAccess',MasterVendorUserAccess.saveMasterVendorUserAccess);
router.post("/getMasterVendorUserAccessById",MasterVendorUserAccess.getMasterVendorUserAccessById);
router.get("/getAllMasterVendorUserAccess",MasterVendorUserAccess.getAllMasterVendorUserAccess);
router.put("/UpdateMasterVendorUserAccessById",MasterVendorUserAccess.UpdateMasterVendorUserAccessById);
router.delete("/deleteMasterVendorUserAccessById/:id",MasterVendorUserAccess.deleteMasterVendorUserAccessById);




router.post("/accountStatementApproval/save", accountStatementApproval.saveAccountApprovalStatus);
router.put("/accountStatementApproval/update/:id", accountStatementApproval.updateAccountApprovalStatus);
router.get('/accountStatementApproval/findAll', accountStatementApproval.getAccountApprovalList);
router.get('/accountStatementApproval/exportExcel/:vendorCode', accountStatementApproval.downloadAccountItemExcel);

router.get('/downloadCurrentAccountStatement/exportExcel', accountStatementApproval.downloadAccountItemExcel);
router.post('/approveAccStatementDetail', accountStatementApproval.approveAccStatementDetail);
router.post('/rejectAccStatementDetail/:No', accountStatementApproval.rejectAccStatementDetail);
router.get('/downloadAccStatementConfirmation/exportExcel', accountStatementApproval.downloadAccStateExcel);

router.post("/purchaseOrderEstimate/save", purchaseOrder.savePurchaseOrderEstimateDate);
router.get('/purchaseOrderEstimate/findAll', purchaseOrder.getPurchaseOrderEstimateDateList);

router.post("/vendorCodeDetail/save", vendorCodeDetail.saveVendorCodeDetail);
router.get('/vendorCodeDetail/findAll', vendorCodeDetail.getVendorCodeDetail);

router.post("/saveNewRegVendordetail", vdetail.postNewRegVdetail);
//ErpAccess
router.get('/getErpVendor_API', ErpAccess.getErpVendor_API);
router.get('/getVendorLedgerEntries', ErpAccess.getVendorLedgerEntries);
router.get('/getErpVendor_APIById/:No', ErpAccess.getErpVendor_APIById);
router.post('/postErpVendor_API', ErpAccess.postErpVendor_API);
router.put('/updateErpVendor_API', ErpAccess.updateErpVendor_API);

router.get('/getErpResourcePortalVendorlist', ErpAccess.getErpResourcePortalVendorlist);
router.get('/getErpResourcePortalVendorlistById/:Vendor_No', ErpAccess.getErpResourcePortalVendorlistById);
router.post('/postErpResourcePortalVendorlist', ErpAccess.postErpResourcePortalVendorlist);
router.put('/updateErpResourcePortalVendorlist/:Entry_No', ErpAccess.updateErpResourcePortalVendorlist);
router.get('/getErpVendor_APIByParent_Vendor_Code/:Parent_Vendor_Code', ErpAccess.getErpVendor_APIByParent_Vendor_Code);
router.get('/getErpVendor_APIByP_A_N_No/:Ticket_ID', ErpAccess.getErpVendor_APIByP_A_N_No);
router.get('/getErpVendor_APIByVendorId/:ticketID', ErpAccess.getErpVendor_APIByVendorId);
router.post("/saveMasterLogin", signUp.saveMasterLogin);
router.get('/verifyUSerByMail/:mastervendor_email/:mailConfirmationCode',signUp.verifyUserByMail);
router.post('/twoFactorOTP', signUp.twoFactorOTP);
router.post('/twoFactorOTPVerification', signUp.twoFactorOTPValidation);
router.get('/getErpPurchaseOrder_API', ErpAccess.getErpPurchaseOrder_API);
router.get('/getErpPurchaseOrderLineEDD_API', ErpAccess.getErpPurchaseOrderLineEDD_API);
//getErpPurchaseOrdersLists
router.get('/getErpPurchaseOrdersLists', ErpAccess.getErpPurchaseOrdersLists);

router.get('/getuserIdByVcode/:vCode', ErpAccess.getuserIdByVcode);

router.get('/getSubuserId/:subUserId', MasterVendorSubUser.getSubuserId);
router.get('/getOutOfIndiaVcode/:ticketId', ErpAccess.getOutOfIndiaVcode);
router.get('/getDocuments', MasterVendorSubUser.getDocuments);

//poTeam
router.post("/PoApprovalMail", poTeam.PoApprovalMail);

//savepoTeam
router.post("/savePo", poTeam.savePo);
//RejectPoteam
router.post("/RejectPo", poTeam.RejectPo);
//updatePo
router.get("/updatePo/:level2ApprovalStatus/:No",poTeam.updatePo);
router.get("/getUpdatePoPage/:level2ApprovalStatus/:No", poTeam.getUpdatePoPage);
router.get("/getUpdatePoInvoicePage/:level1ApprovalStatus/:No", poTeam.getUpdatePoInvoicePage);
router.get("/updatePoInvoiceByMail/:level1ApprovalStatus/:No",poTeam.updatePoInvoiceByMail);

//getpo
router.get("/getPo", poTeam.getPo);
//getMailIdbyvendorNo
router.get("/getMailIdbyvendorNo/:No", poTeam.getMailIdbyvendorNo);
//updatePoInvoice
router.put("/updatePoInvoice", poTeam.updatePoInvoice);
//updateFinanceInvoiceApproval
router.put("/updateFinanceInvoiceApproval", poTeam.updateFinanceInvoiceApproval);
//updateFinanceInvoiceReject
router.put("/updateFinanceInvoiceReject", poTeam.updateFinanceInvoiceReject);
//mailApprovePo_Invoice
router.post("/mailApprovePo_Invoice", poTeam.mailApprovePo_Invoice);
//mailApproveFinance_order
router.post("/POInvoiceMailApprove", poTeam.POInvoiceMailApprove);
//mailApprovedInvoice
router.get("/mailApprovedInvoice", poTeam.mailApprovedInvoice);
router.get("/mailRejectInvoice/:No", poTeam.mailRejectInvoice);
router.get("/mailRejectPOInvoice/:No", poTeam.mailRejectPOInvoice);
router.post('/updateRejectInvoice', poTeam.updateRejectInvoice);
router.post('/updateRejectPOInvoice', poTeam.updateRejectPOInvoice);

router.post("/saveInvoiceInfo", invoice.saveInvoiceInfo);
router.get('/getInvoiceinfo', invoice.getInvoiceinfo);
router.post("/postEddDetails", edd.postEddDetails);
router.post("/getMasterVendorById",MasterVendorSubUser.getMasterVendorById);
router.post('/createsharepointFolderByTicketId', ErpAccess.createsharepointFolderByTicketId);

router.post('/uploadDocbyVendorCode', ErpAccess.uploadDocbyVendorCode);
//updateMasterLogin
router.put("/updateMasterLogin", signUp.updateMasterLogin);
//getErpStateCode
router.get("/getErpStateCode/:state",ErpAccess.getErpStateCode);
router.post("/GenerateVendorCode",ErpAccess.GenerateVendorCode);
//SearchpanNo
router.get("/SearchpanNo/:P_A_N_No",ErpAccess.SearchpanNo);
module.exports = router;
