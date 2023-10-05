const db = require("../model");
const contactTeamSchema = db.contactTeam;
const VdetailSchema = db.vdetail;
const vendorCommunicationDetails = db.vendorCommunicationDetails;
const StatDetailSchema = db.statdetail;
const CompliancedetailSchema = db.complianceDetail;
const FdetailSchema = db.fdetail;
const BankdetailSchema = db.bankdetail;
const EditLogSchema = db.EditLog;
var database = require("../config/db.config");
let directory_name = "uploads";
const path = require("path");
var multer = require("multer");
var bankdetailDocPath = "";
var GST_DocPath = "";
var PAN_DocPath = "";
var form_10f_DocPath = "";
var PE_Declaration_DocPath = "";
var TAN_DocPath = "";
var MSME_DocPath = "";
var Tax_residency_DocPath = "";
var fileDisclosurePath = "";
var RPD_DocPath = "";
var COC_DocPath = "";
var NDA_DocPath = "";
var financial_data_DocPath = "";
var financial_data2_DocPath = "";
var approverFile_DocPath = "";
const config = require("../config/auth.config");
const fs = require('fs');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = config.apiKey;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

const SignUpSchema = db.singUp;
// var nodemailer = require("nodemailer");
// const config = require("../config/auth.config");
// const user = config.user;
// const pass = config.pass;

// var transporter = nodemailer.createTransport({
//   service: "gmail",
//   // service: 'Outlook365',
//   auth: {
//     user: user,
//     pass: pass,
//   },
// });

exports.emailUpdateTabNotification = (
  req,
  res,
  subject,
  emailContent,
  returnFlag,
  emailId
) => {
  sendSmtpEmail.subject = `${subject}`;
  sendSmtpEmail.htmlContent = `${emailContent}`;
  sendSmtpEmail.sender = {
    name: config.name,
    email:config.email,
  };
  sendSmtpEmail.to = [{ email: `${emailId}` }];
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
    console.log('mail sent successfully: ' + JSON.stringify(data));
  }, function (error) {
    console.error(error);
  });
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(directory_name, "/"));
  },
  filename: (req, file, cb) => {
    var filetype = "";

    if (file.fieldname === "bankdetailDoc") {

      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      bankdetailDocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(
        null,
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1]
      );
    }

    if (file.fieldname === "GST_Doc") {

      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      GST_DocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(
        null,
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1]
      );
    }

    if (file.fieldname === "PAN_Doc") {

      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      PAN_DocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(
        null,
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1]
      );
    }

    if (file.fieldname === "form_10f_Doc") {

      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      form_10f_DocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(
        null,
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1]
      );
    }

    if (file.fieldname === "PE_Declaration_Doc") {

      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      PE_Declaration_DocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(
        null,
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1]
      );
    }

    if (file.fieldname === "TAN_Doc") {

      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      TAN_DocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(
        null,
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1]
      );
    }

    if (file.fieldname === "MSME_Doc") {

      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      MSME_DocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(
        null,
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1]
      );
    }

    if (file.fieldname === "Tax_residency_Doc") {

      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      Tax_residency_DocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(
        null,
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1]
      );
    }

    if (file.fieldname === "financial_data") {

      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      financial_data_DocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(
        null,
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1]
      );
    }

    if (file.fieldname === "financial_data2") {

      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      financial_data2_DocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(
        null,
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1]
      );
    }

    if (file.fieldname === "approverFile") {

      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      approverFile_DocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(
        null,
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1]
      );
    }

    if (file.fieldname === "RPD_Doc") {

      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      RPD_DocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(
        null,
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1]
      );
    }

    if (file.fieldname === "COC_Doc") {

      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      COC_DocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(
        null,
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1]
      );
    }

    if (file.fieldname === "NDA_Doc") {

      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      NDA_DocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(
        null,
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1]
      );
    }

    if (file.fieldname === "fileDisclosure") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      fileDisclosurePath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
  },
});

exports.saveContactTeam = (req, res) => {
  contactTeamSchema
    .findOne({
      where: {
        userId: req.body.userId,
        // id: req.body.id,
      },
    })
    .then(async (user) => {
      if (!user) {
        const contactId =
          "contactId" + Math.floor(100000 + Math.random() * 900000);
        const userId = req.body.userId;
        const contactName1 = req.body.contactName1;
        const emailId1 = req.body.emailId1;
        const contactNumber1 = req.body.contactNumber1;
        const contactName2 = req.body.contactName2;
        const emailId2 = req.body.emailId2;
        const contactNumber2 = req.body.contactNumber2;
        const contactName3 = req.body.contactName3;
        const emailId3 = req.body.emailId3;
        const contactNumber3 = req.body.contactNumber3;
        const Ticket_ID = req.body.Ticket_ID;
        const user = new contactTeamSchema({
          contactId: contactId,
          userId: userId,
          contactName1: contactName1,
          emailId1: emailId1,
          contactNumber1: contactNumber1,
          contactName2: contactName2,
          emailId2: emailId2,
          contactNumber2: contactNumber2,
          contactName3: contactName3,
          emailId3: emailId3,
          contactNumber3: contactNumber3,
          Ticket_ID: Ticket_ID,
        });
        user.save().then((result) => {
          return res.status(200).json({
            status: "success",
            message: "Registered Successfully",
            result,
          });
        });
      } else {
        console.log("Update Api");

        const userId = req.body.userId;
        const updates = req.body;
        // check if there are any empty fields
        for (const key in updates) {
          if (!updates[key]) {
            updates[key] = null;
          }
        }
        const updateResult = await contactTeamSchema.update(req.body, {
          where: { userId },
        });
        if (updateResult[0]) {
          res.status(200).json({
            status: "success",
            message: "Contact Team details updated successfully",
          });
        } else {
          res.status(404).json({
            status: "error",
            message: "Contact Team details not found",
          });
        }
      }
    });
};

exports.getAllCollection = (req, res) => {
  var userId = req.params.userId;
  const basicInfoArray = [];
  const CommunicationDetailsArray = [];
  const StatDetailArray = [];
  const CompliancedetailArray = [];
  const FdetailArray = [];
  const bankdetailArray = [];
  const contactTeamArray = [];
  var p1 = VdetailSchema.findOne({
    where: { userId: userId },
  }).then((basicInfo) => {
    if (basicInfo === null) {
      basicInfoArray.length = 0;
    } else {
      basicInfoArray.push(basicInfo);
    }
  }).catch((err) => {
    basicInfoArray.length = 0;
  });
  var p2 = vendorCommunicationDetails
    .findOne({
      where: { userId: userId },
    })
    .then((CommunicationDetails) => {
      if (CommunicationDetails === null) {
        CommunicationDetailsArray.length = 0;
      } else {
        CommunicationDetailsArray.push(CommunicationDetails);
      }
    }).catch((err) => {
      CommunicationDetailsArray.length = 0;
    });
  var p3 = StatDetailSchema.findOne({
    where: { userId: userId },
  }).then((StatDetail) => {
    if (StatDetail === null) {
      StatDetailArray.length = 0;
    } else {
      StatDetailArray.push(StatDetail);
    }
  }).catch((err) => {
    StatDetailArray.length = 0;
  });
  var p4 = CompliancedetailSchema.findOne({
    where: { userId: userId },
  }).then((Compliancedetail) => {
    if (Compliancedetail === null) {
      CompliancedetailArray.length = 0;
    } else {
      CompliancedetailArray.push(Compliancedetail);
    }
  }).catch((err) => {
    CompliancedetailArray.length = 0;
  });
  var p5 = FdetailSchema.findOne({
    where: { userId: userId },
  }).then(async (Fdetail) => {
    if (Fdetail === null) {
      FdetailArray.length = 0;
    } else {
      FdetailArray.push(Fdetail);
    }
  }).catch((err) => {
    FdetailArray.length = 0;
  });
  var p6 = BankdetailSchema.findOne({
    where: { userId: userId },
  }).then(async (Bankdetail) => {
    if (Bankdetail === null) {
      bankdetailArray.length = 0;
    } else {
      bankdetailArray.push(Bankdetail);
    }
  }).catch((err) => {
    bankdetailArray.length = 0;
  });
  var p7 = contactTeamSchema
    .findOne({
      where: { userId: userId },
    })
    .then(async (contactTeam) => {
      if (contactTeam === null) {
        contactTeamArray.length = 0;
      } else {
        contactTeamArray.push(contactTeam);
      }
    }).catch((err) => {
      contactTeamArray.length = 0;
    });
  Promise.all([p1, p2, p3, p4, p5, p6, p7]).then((values) => {
    res.status(200).json({
      status: "success",
      basicInfo: basicInfoArray,
      CommunicationDetails: CommunicationDetailsArray,
      Statutory: StatDetailArray,
      ComplianceDetail: CompliancedetailArray,
      FinancialDetail: FdetailArray,
      Bankdetail: bankdetailArray,
      contactDetail: contactTeamArray,
    });
  });
};
exports.getAllUserDetail = async (req, res) => {
  const basicInfoArray = [];
  const CommunicationDetailsArray = [];
  const StatDetailArray = [];
  const CompliancedetailArray = [];
  const FdetailArray = [];
  const bankdetailArray = [];
  await VdetailSchema.findAll().then(async (basicInfo) => {
    basicInfoArray.push(basicInfo);
    await vendorCommunicationDetails
      .findAll()
      .then(async (CommunicationDetails) => {
        CommunicationDetailsArray.push(CommunicationDetails);
        await StatDetailSchema.findAll().then(async (StatDetail) => {
          StatDetailArray.push(StatDetail);
          await CompliancedetailSchema.findAll().then(
            async (Compliancedetail) => {
              CompliancedetailArray.push(Compliancedetail);
              await FdetailSchema.findAll().then(async (Fdetail) => {
                FdetailArray.push(Fdetail);
                await BankdetailSchema.findAll().then(async (Bankdetail) => {
                  bankdetailArray.push(Bankdetail);
                });
              });
            }
          );
        });
      });
  });
  res.status(200).json({
    status: "success",
    basicInfo: basicInfoArray,
    CommunicationDetails: CommunicationDetailsArray,
    Statutory: StatDetailArray,
    ComplianceDetail: CompliancedetailArray,
    FinancialDetail: FdetailArray,
    Bankdetail: bankdetailArray,
  });
};
exports.updateAllCollection = async (req, res) => {
  var userId = req.params.userId;
  bankdetailDocPath = "";
  GST_DocPath = "";
  PAN_DocPath = "";
  form_10f_DocPath = "";
  PE_Declaration_DocPath = "";
  MSME_DocPath = "";
  TAN_DocPath = "";
  Tax_residency_DocPath = "";
  fileDisclosurePath = "";
  RPD_DocPath = "";
  COC_DocPath = "";
  NDA_DocPath = "";
  financial_data_DocPath = "";
  financial_data2_DocPath = "";
  approverFile_DocPath = "";

  var userId = req.params.userId;

  var upload = multer({ storage: storage }).fields([
    {
      name: "bankdetailDoc",
      maxCount: 1,
    },
    {
      name: "GST_Doc",
      maxCount: 1,
    },
    {
      name: "PAN_Doc",
      maxCount: 1,
    },
    {
      name: "form_10f_Doc",
      maxCount: 1,
    },
    {
      name: "PE_Declaration_Doc",
      maxCount: 1,
    },
    {
      name: "TAN_Doc",
      maxCount: 1,
    },
    {
      name: "MSME_Doc",
      maxCount: 1,
    },
    {
      name: "Tax_residency_Doc",
      maxCount: 1,
    },
    {
      name: "fileDisclosure",
      maxCount: 1,
    },
    {
      name: "RPD_Doc",
      maxCount: 1,
    },
    {
      name: "COC_Doc",
      maxCount: 1,
    },
    {
      name: "NDA_Doc",
      maxCount: 1,
    },
    {
      name: "financial_data",
      maxCount: 1,
    },
    {
      name: "financial_data2",
      maxCount: 1,
    },
    {
      name: "approverFile",
      maxCount: 1,
    },
  ]);

  upload(req, res, async function (err) {
    var bDetails = await BankdetailSchema.findOne({
      where: { userId: req.params.userId },
    });

    var cDetails = await CompliancedetailSchema.findOne({
      where: { userId: req.params.userId },
    });

    var statDetails = await StatDetailSchema.findOne({
      where: { userId: req.params.userId },
    });

    var fDetails = await FdetailSchema.findOne({
      where: { userId: req.params.userId },
    });

    var basicData = await VdetailSchema.findOne({
      where: { userId: req.params.userId },
    });
    var commuDetails = await vendorCommunicationDetails.findOne({
      where: { userId: req.params.userId },
    });
    var contactTeamDetails = await contactTeamSchema.findOne({
      where: { userId: req.params.userId },
    });
    const editedFields = [];
    if (basicData && basicData.Address !== req.body.Address) {
      editedFields.push("Address");
    }
    if (basicData && basicData.Address_2 !== req.body.Address_2) {
      editedFields.push("Address_2");
    }
    if (basicData && basicData.companyName !== req.body.companyName) {
      editedFields.push("companyName");
    }
    if (basicData && basicData.Country_Region_Code !== req.body.Country_Region_Code) {
      editedFields.push("Country_Region_Code");
    }
    if (basicData && basicData.state !== req.body.state) {
      editedFields.push("state");
    }
    if (basicData && basicData.City !== req.body.City) {
      editedFields.push("City");
    }
    if (basicData && basicData.Post_Code !== req.body.Post_Code) {
      editedFields.push("Post_Code");
    }
    if (basicData && basicData.Vendor_Type !== req.body.Vendor_Type) {
      editedFields.push("Vendor_Type");
    }
    if (basicData && basicData.Vendor_Account_Manager !== req.body.Vendor_Account_Manager) {
      editedFields.push("Vendor_Account_Manager");
    }
    if (basicData && basicData.mkDenialCheque !== req.body.mkDenialCheque) {
      editedFields.push("mkDenialCheque");
    }
    if (basicData && basicData.approverFile !== req.body.approverFile) {
      editedFields.push("approverFile");
    }
    if (
      commuDetails && commuDetails.financeSpoccontactName !== req.body.financeSpoccontactName
    ) {
      editedFields.push("financeSpoccontactName");
    }
    if (
      commuDetails && commuDetails.financeSpocdesignation !== req.body.financeSpocdesignation
    ) {
      editedFields.push("financeSpocdesignation");
    }
    if (commuDetails && commuDetails.financeSpocphoneNo !== req.body.financeSpocphoneNo) {
      editedFields.push("financeSpocphoneNo");
    }
    if (commuDetails.financeSpocemail !== req.body.financeSpocemail) {
      editedFields.push("financeSpocemail");
    }
    if (
      commuDetails && commuDetails.operationSpoccontactName !==
      req.body.operationSpoccontactName
    ) {
      editedFields.push("operationSpoccontactName");
    }
    if (
      commuDetails && commuDetails.operationSpocdesignation !==
      req.body.operationSpocdesignation
    ) {
      editedFields.push("operationSpocdesignation");
    }
    if (commuDetails && commuDetails.operationSpocphoneNo !== req.body.operationSpocphoneNo) {
      editedFields.push("operationSpocdesignation");
    }
    if (commuDetails && commuDetails.operationSpocemail !== req.body.operationSpocemail) {
      editedFields.push("operationSpocemail");
    }
    if (
      commuDetails && commuDetails.collectionSpoccontactName !==
      req.body.collectionSpoccontactName
    ) {
      editedFields.push("collectionSpoccontactName");
    }
    if (
      commuDetails && commuDetails.collectionSpocdesignation !==
      req.body.collectionSpocdesignation
    ) {
      editedFields.push("collectionSpocdesignation");
    }
    if (commuDetails && commuDetails.collectionSpocphoneNo !== req.body.collectionSpocphoneNo) {
      editedFields.push("collectionSpocphoneNo");
    }
    if (commuDetails && commuDetails.collectionSpocemail !== req.body.collectionSpocemail) {
      editedFields.push("collectionSpocemail");
    }
    if (
      commuDetails && commuDetails.managementSpoccontactName !==
      req.body.managementSpoccontactName
    ) {
      editedFields.push("managementSpoccontactName");
    }
    if (
      commuDetails && commuDetails.managementSpocdesignation !==
      req.body.managementSpocdesignation
    ) {
      editedFields.push("managementSpocdesignation");
    }
    if (commuDetails && commuDetails.managementSpocphoneNo !== req.body.managementSpocphoneNo) {
      editedFields.push("managementSpocphoneNo");
    }
    if (commuDetails && commuDetails.managementSpocemail !== req.body.managementSpocemail) {
      editedFields.push("managementSpocemail");
    }
    if (commuDetails && commuDetails.contactName !== req.body.contactName) {
      editedFields.push("contactName");
    }
    if (commuDetails && commuDetails.designation !== req.body.designation) {
      editedFields.push("designation");
    }
    if (commuDetails && commuDetails.phoneNo !== req.body.phoneNo) {
      editedFields.push("phoneNo");
    }
    if (commuDetails && commuDetails.email !== req.body.others_Email) {
      editedFields.push("email");
    }
    if (commuDetails && commuDetails.mastervendor_email !== req.body.mastervendor_email) {
      editedFields.push("mastervendor_email");
    }
    if (statDetails && statDetails.GST_Doc !== req.body.GST_Doc) {
      editedFields.push("GST_Doc");
    }
    if (statDetails && statDetails.fileDisclosure !== req.body.fileDisclosure) {
      editedFields.push("fileDisclosure");
    }
    if (statDetails && statDetails.PAN_Doc !== req.body.PAN_Doc) {
      editedFields.push("PAN_Doc");
    }

    if (statDetails && statDetails.form_10f_Doc !== req.body.form_10f_Doc) {
      editedFields.push("form_10f_Doc");
    }

    if (statDetails && statDetails.TAN_Doc !== req.body.TAN_Doc) {
      editedFields.push("TAN_Doc");
    }

    if (statDetails && statDetails.PE_Declaration_Doc !== req.body.PE_Declaration_Doc) {
      editedFields.push("PE_Declaration_Doc");
    }

    if (statDetails && statDetails.MSME_Doc !== req.body.MSME_Doc) {
      editedFields.push("MSME_Doc");
    }

    if (statDetails && statDetails.Tax_residency_Doc !== req.body.Tax_residency_Doc) {
      editedFields.push("Tax_residency_Doc");
    }

    if (statDetails && statDetails.GST_Vendor_Type !== req.body.GST_Vendor_Type) {
      editedFields.push("GST_Vendor_Type");
    }
    if (statDetails && statDetails.GST_Registration_No !== req.body.GST_Registration_No) {
      editedFields.push("GST_Registration_No");
    }
    if (statDetails && statDetails.P_A_N_No !== req.body.P_A_N_No) {
      editedFields.push("P_A_N_No");
    }
    if (statDetails && statDetails.CIN_No !== req.body.CIN_No) {
      editedFields.push("CIN_No");
    }
    if (statDetails && statDetails.MSMED !== req.body.MSMED) {
      editedFields.push("MSMED");
    }
    if (statDetails && statDetails.MSMED_Number !== req.body.MSMED_Number) {
      editedFields.push("MSMED_Number");
    }
    if (statDetails && statDetails.MSMED_Vendor_Type !== req.body.MSMED_Vendor_Type) {
      editedFields.push("MSMED_Vendor_Type");
    }
    if (statDetails && statDetails.TAN_No !== req.body.TAN_No) {
      editedFields.push("TAN_No");
    }
    if (cDetails && cDetails.RPD_Doc !== req.body.RPD_Doc) {
      editedFields.push("RPD_Doc");
    }

    if (cDetails && cDetails.COC_Doc !== req.body.COC_Doc) {
      editedFields.push("COC_Doc");
    }

    if (cDetails && cDetails.NDA_Doc !== req.body.NDA_Doc) {
      editedFields.push("NDA_Doc");
    }

    if (fDetails && fDetails.financial_data !== req.body.financial_data) {
      editedFields.push("financial_data");
    }

    if (fDetails && fDetails.financial_data2 !== req.body.financial_data2) {
      editedFields.push("financial_data2");
    }

    if (fDetails && fDetails.yearOfAuditedFinancial !== req.body.yearOfAuditedFinancial) {
      editedFields.push("yearOfAuditedFinancial");
    }

    if (fDetails && fDetails.Revenue !== req.body.Revenue) {
      editedFields.push("Revenue");
    }

    if (fDetails && fDetails.Profit !== req.body.Profit) {
      editedFields.push("Profit");
    }

    if (fDetails && fDetails.netWorth !== req.body.netWorth) {
      editedFields.push("netWorth");
    }

    if (fDetails && fDetails.currentAssets !== req.body.currentAssets) {
      editedFields.push("currentAssets");
    }

    if (fDetails && fDetails.directorDetails !== req.body.directorDetails) {
      editedFields.push("directorDetails");
    }

    if (fDetails && fDetails.organisationType !== req.body.organisationType) {
      editedFields.push("organisationType");
    }

    if (fDetails && fDetails.shareholderName !== req.body.shareholderName) {
      editedFields.push("shareholderName");
    }

    if (bDetails && bDetails.bankdetailDoc !== req.body.bankdetailDoc) {
      editedFields.push("bankdetailDoc");
    }

    if (bDetails && bDetails.Account_Holder_Name !== req.body.Account_Holder_Name) {
      editedFields.push("Account_Holder_Name");
    }

    if (bDetails && bDetails.Bank_Name !== req.body.Bank_Name) {
      editedFields.push("Bank_Name");
    }

    if (bDetails && bDetails.Account_No !== req.body.Account_No) {
      editedFields.push("Account_No");
    }

    if (bDetails && bDetails.IFSC_Code !== req.body.IFSC_Code) {
      editedFields.push("IFSC_Code");
    }

    if (bDetails && bDetails.MICRcode !== req.body.MICRcode) {
      editedFields.push("MICRcode");
    }

    if (bDetails && bDetails.Bank_Address !== req.body.Bank_Address) {
      editedFields.push("Bank_Address");
    }

    if (contactTeamDetails && contactTeamDetails.contactName1 !== req.body.name) {
      editedFields.push("contactName1");
    }

    if (contactTeamDetails && contactTeamDetails.emailId1 !== req.body.email) {
      editedFields.push("emailId1");
    }

    if (contactTeamDetails && contactTeamDetails.contactNumber1 !== req.body.contactNumber) {
      editedFields.push("contactNumber1");
    }

    if (contactTeamDetails && contactTeamDetails.contactName2 !== req.body.name2) {
      editedFields.push("contactName2");
    }

    if (contactTeamDetails && contactTeamDetails.emailId2 !== req.body.email2) {
      editedFields.push("emailId2");
    }

    if (contactTeamDetails && contactTeamDetails.contactNumber2 !== req.body.contactNumber2) {
      editedFields.push("contactNumber2");
    }

    if (contactTeamDetails && contactTeamDetails.contactName3 !== req.body.name3) {
      editedFields.push("contactName3");
    }

    if (contactTeamDetails && contactTeamDetails.emailId3 !== req.body.email3) {
      editedFields.push("emailId3");
    }

    if (contactTeamDetails && contactTeamDetails.contactNumber3 !== req.body.contactNumber3) {
      editedFields.push("contactNumber3");
    }

    if (req.body.role === "MRT") {
      console.log("SaveEditlogbyuserId::");
      const newEditLogEntry = {
        userId: req.body.userId,
        EditedFields: JSON.stringify(editedFields),
        role: req.body.role,
      };
      EditLogSchema.findOne({
        where: { userId: req.body.userId },
      })
        .then((record) => {
          if (record) {
            const existingEditedFields = JSON.parse(record.EditedFields);
            const mergedEditedFields = Array.from(
              new Set(existingEditedFields.concat(editedFields))
            );
            record
              .update({
                EditedFields: JSON.stringify(mergedEditedFields),
              })
              .then((updatedRecord) => {
                console.log("Record updated:", updatedRecord.get());
              })
              .catch((updateError) => {
                console.error("Error updating record:", updateError);
              });
          } else {
            EditLogSchema.create(newEditLogEntry)
              .then((createdRecord) => {
                console.log("New record created:", createdRecord.get());
              })
              .catch((createError) => {
                console.error("Error creating record:", createError);
              });
          }
        })
        .catch((error) => {
          console.error("Error finding record:", error);
        });
    }

    let approverFileDoc = approverFile_DocPath;

    if (basicData.approverFile === req.body.approverFile) {
      approverFileDoc = req.body.approverFile;
    } else {
      approverFileDoc = approverFile_DocPath;
      directoryDelete = basicData.approverFile;

      // if (directoryDelete) {
      //   fs.unlink(directoryDelete, (err) => {
      //     if (err) {
      //       throw err;
      //     }
      //   });
      // }
    }

    const basicDetails = {
      userId: req.body.userId,
      Address: req.body.Address,
      Address_2: req.body.Address_2,
      companyName: req.body.companyName,
      Country_Region_Code: req.body.Country_Region_Code,
      state: req.body.state,
      City: req.body.City,
      Post_Code: req.body.Post_Code,
      image: req.body.image,
      Vendor_Type: req.body.Vendor_Type,
      Vendor_Account_Manager: req.body.Vendor_Account_Manager,
      mkDenialCheque: req.body.mkDenialCheque,
      approverFile: approverFileDoc,
    };

    const communicationDetails = {
      userId: req.body.userId,
      financeSpoccontactName: req.body.financeSpoccontactName,
      financeSpocdesignation: req.body.financeSpocdesignation,
      financeSpocphoneNo: req.body.financeSpocphoneNo,
      financeSpocemail: req.body.financeSpocemail,
      operationSpoccontactName: req.body.operationSpoccontactName,
      operationSpocdesignation: req.body.operationSpocdesignation,
      operationSpocphoneNo: req.body.operationSpocphoneNo,
      operationSpocemail: req.body.operationSpocemail,
      collectionSpoccontactName: req.body.collectionSpoccontactName,
      collectionSpocdesignation: req.body.collectionSpocdesignation,
      collectionSpocphoneNo: req.body.collectionSpocphoneNo,
      collectionSpocemail: req.body.collectionSpocemail,
      managementSpoccontactName: req.body.managementSpoccontactName,
      managementSpocdesignation: req.body.managementSpocdesignation,
      managementSpocphoneNo: req.body.managementSpocphoneNo,
      managementSpocemail: req.body.managementSpocemail,
      contactName: req.body.contactName,
      designation: req.body.designation,
      phoneNo: req.body.phoneNo,
      email: req.body.others_Email,
      mastervendor_email: req.body.mastervendor_email,
    };

    let GST_Doc = GST_DocPath;
    let PAN_Doc = PAN_DocPath;
    let form_10f_Doc = form_10f_DocPath;
    let TAN_Doc = TAN_DocPath;
    let PE_Declaration_Doc = PE_Declaration_DocPath;
    let MSME_Doc = MSME_DocPath;
    let Tax_residency_Doc = Tax_residency_DocPath;
    let fileDisclosure = fileDisclosurePath;

    if (statDetails.GST_Doc === req.body.GST_Doc) {
      GST_Doc = req.body.GST_Doc;
    } else {
      GST_Doc = GST_DocPath;
      StatOneDelete = statDetails.GST_Doc;
      if (StatOneDelete && !req.body.GST_Doc) {
        fs.unlink(StatOneDelete, (err) => {
          if (err) {
            throw err;
          }
        });
      }
    }

    if (statDetails.fileDisclosure === req.body.fileDisclosure) {
      fileDisclosure = req.body.fileDisclosure;
    } else {
      fileDisclosure = fileDisclosurePath;
      StatEightDelete = statDetails.fileDisclosure;
      if (StatEightDelete && !req.body.fileDisclosure) {
        fs.unlink(StatEightDelete, (err) => {
          if (err) {
            throw err;
          }
        });
      }
    }

    if (statDetails.PAN_Doc === req.body.PAN_Doc) {
      PAN_Doc = req.body.PAN_Doc;
    } else {
      PAN_Doc = PAN_DocPath;
      StatTwoDelete = statDetails.PAN_Doc;
      if (StatTwoDelete && !req.body.PAN_Doc) {
        fs.unlink(StatTwoDelete, (err) => {
          if (err) {
            throw err;
          }
        });
      }
    }

    if (statDetails.form_10f_Doc === req.body.form_10f_Doc) {
      form_10f_Doc = req.body.form_10f_Doc;
    } else {
      form_10f_Doc = form_10f_DocPath;
      StatThreeDelete = statDetails.form_10f_Doc;
      if (StatThreeDelete && !req.body.form_10f_Doc) {
        fs.unlink(StatThreeDelete, (err) => {
          if (err) {
            throw err;
          }
        });
      }
    }

    if (statDetails.TAN_Doc === req.body.TAN_Doc) {
      TAN_Doc = req.body.TAN_Doc;
    } else {
      TAN_Doc = TAN_DocPath;
      StatFourDelete = statDetails.TAN_Doc;
      if (StatFourDelete && !req.body.TAN_Doc) {
        fs.unlink(StatFourDelete, (err) => {
          if (err) {
            throw err;
          }
        });
      }
    }

    if (statDetails.PE_Declaration_Doc === req.body.PE_Declaration_Doc) {
      PE_Declaration_Doc = req.body.PE_Declaration_Doc;
    } else {
      PE_Declaration_Doc = PE_Declaration_DocPath;
      StatFiveDelete = statDetails.PE_Declaration_Doc;
      if (StatFiveDelete && !req.body.PE_Declaration_Doc) {
        fs.unlink(StatFiveDelete, (err) => {
          if (err) {
            throw err;
          }
        });
      }
    }

    if (statDetails.MSME_Doc === req.body.MSME_Doc) {
      MSME_Doc = req.body.MSME_Doc;
    } else {
      MSME_Doc = MSME_DocPath;
      StatSixDelete = statDetails.MSME_Doc;
      if (StatSixDelete && !req.body.MSME_Doc) {
        fs.unlink(StatSixDelete, (err) => {
          if (err) {
            throw err;
          }
        });
      }
    }

    if (statDetails.Tax_residency_Doc === req.body.Tax_residency_Doc) {
      Tax_residency_Doc = req.body.Tax_residency_Doc;
    } else {
      Tax_residency_Doc = Tax_residency_DocPath;
      StatsevenDelete = statDetails.Tax_residency_Doc;
      if (StatsevenDelete && !req.body.Tax_residency_Doc) {
        fs.unlink(StatsevenDelete, (err) => {
          if (err) {
            throw err;
          }
        });
      }
    }

    const statutoryDetails = {
      userId: req.body.userId,
      GST_Vendor_Type: req.body.GST_Vendor_Type,
      GST_Registration_No: req.body.GST_Registration_No,
      GST_Doc: GST_Doc,
      P_A_N_No: req.body.P_A_N_No,
      PAN_Doc: PAN_Doc,
      CIN_No: req.body.CIN_No,
      form_10f_Doc: form_10f_Doc,
      PE_Declaration_Doc: PE_Declaration_Doc,
      MSMED: req.body.MSMED,
      MSMED_Number: req.body.MSMED_Number,
      MSME_Doc: MSME_Doc,
      MSMED_Vendor_Type: req.body.MSMED_Vendor_Type,
      TAN_No: req.body.TAN_No,
      TAN_Doc: TAN_Doc,
      Tax_residency_Doc: Tax_residency_Doc,
      fileDisclosure: fileDisclosure,
    };

    let RPD_Doc = RPD_DocPath;
    let COC_Doc = COC_DocPath;
    let NDA_Doc = NDA_DocPath;

    if (cDetails.RPD_Doc === req.body.RPD_Doc) {
      RPD_Doc = req.body.RPD_Doc;
    } else {
      RPD_Doc = RPD_DocPath;
      ComplianceOneDelete = cDetails.RPD_Doc;
      if (ComplianceOneDelete && !req.body.RPD_Doc) {
        fs.unlink(ComplianceOneDelete, (err) => {
          if (err) {
            throw err;
          }
        });
      }
    }

    if (cDetails.COC_Doc === req.body.COC_Doc) {
      COC_Doc = req.body.COC_Doc;
    } else {
      COC_Doc = COC_DocPath;
      ComplianceTwoDelete = cDetails.COC_Doc;
      if (ComplianceTwoDelete && !req.body.COC_Doc) {
        fs.unlink(ComplianceTwoDelete, (err) => {
          if (err) {
            throw err;
          }
        });
      }
    }

    if (cDetails.NDA_Doc === req.body.NDA_Doc) {
      NDA_Doc = req.body.NDA_Doc;
    } else {
      NDA_Doc = NDA_DocPath;
      ComplianceThreeDelete = cDetails.NDA_Doc;
      if (ComplianceThreeDelete && !req.body.NDA_Doc) {
        fs.unlink(ComplianceThreeDelete, (err) => {
          if (err) {
            throw err;
          }
        });
      }
    }

    const complianceDetails = {
      userId: req.body.userId,
      RPD_Doc: RPD_Doc,
      COC_Doc: COC_Doc,
      NDA_Doc: NDA_Doc,
    };

    let financial_data = financial_data_DocPath || "";
    let financial_data2 = financial_data2_DocPath || "";

    if (fDetails && fDetails.financial_data === req.body.financial_data) {
      financial_data = req.body.financial_data;
    } else {
      financial_data = financial_data_DocPath;
      directoryFiananceOneDelete = fDetails && fDetails.financial_data;
      if (fDetails && directoryFiananceOneDelete && !req.body.financial_data) {
        fs.unlink(directoryFiananceOneDelete, (err) => {
          if (err) {
            throw err;
          }
        });
      }
    }

    if (fDetails && fDetails.financial_data2 === req.body.financial_data2) {
      financial_data2 = req.body.financial_data2;
    } else {
      financial_data2 = financial_data2_DocPath;
      directoryFiananceTwoDelete = fDetails && fDetails.financial_data2;
      if (fDetails && directoryFiananceTwoDelete && !req.body.financial_data2) {
        fs.unlink(directoryFiananceTwoDelete, (err) => {
          if (err) {
            throw err;
          }
        });
      }
    }
    const financeDetails = {
      userId: req.body.userId,
      financial_data: financial_data,
      financial_data2: financial_data2,
      yearOfAuditedFinancial: req.body.yearOfAuditedFinancial,
      Revenue: req.body.Revenue,
      Profit: req.body.Profit,
      netWorth: req.body.netWorth,
      currentAssets: req.body.currentAssets,
      directorDetails: req.body.directorDetails,
      organisationType: req.body.organisationType,
      shareholderName: req.body.shareholderName,
    };

    let bankdetailDoc = bankdetailDocPath;

    if (bDetails.bankdetailDoc === req.body.bankdetailDoc) {
      bankdetailDoc = req.body.bankdetailDoc;
    } else {
      bankdetailDoc = bankdetailDocPath;
      directoryDelete = bDetails.bankdetailDoc;

      if (directoryDelete) {
        fs.unlink(directoryDelete, (err) => {
          if (err) {
            throw err;
          }
        });
      }
    }

    const bankDetails = {
      userId: req.body.userId,
      Account_Holder_Name: req.body.Account_Holder_Name,
      Bank_Name: req.body.Bank_Name,
      Account_No: req.body.Account_No,
      IFSC_Code: req.body.IFSC_Code,
      MICRcode: req.body.MICRcode,
      Bank_Address: req.body.Bank_Address,
      bankdetailDoc: bankdetailDoc,
    };

    const contactDetails = {
      userId: req.body.userId,
      contactName1: req.body.name,
      emailId1: req.body.email,
      contactNumber1: req.body.contactNumber,
      contactName2: req.body.name2,
      emailId2: req.body.email2,
      contactNumber2: req.body.contactNumber2,
      contactName3: req.body.name3,
      emailId3: req.body.email3,
      contactNumber3: req.body.contactNumber3,
      Ticket_ID: req.body.Ticket_ID,
    };

    const promises = [
      VdetailSchema.update(basicDetails, { where: { userId: userId } }),
      vendorCommunicationDetails.update(communicationDetails, {
        where: { userId: userId },
      }),
      contactTeamSchema.update(contactDetails, { where: { userId: userId } }),
      BankdetailSchema.update(bankDetails, { where: { userId: userId } }),
      StatDetailSchema.update(statutoryDetails, { where: { userId: userId } }),
      CompliancedetailSchema.update(complianceDetails, {
        where: { userId: userId },
      }),
      FdetailSchema.update(financeDetails, { where: { userId: userId } }),
    ];
    try {
      const [
        basicDetails,
        bankDetails,
        statutoryDetails,
        complianceDetails,
        financeDetails,
        communicationDetails,
        contactDetails,
      ] = await Promise.all(promises);
      console.log("editedfields:::", editedFields);
      res.status(200).json({
        status: "success",
        basicDetails,
        communicationDetails,
        bankDetails,
        statutoryDetails,
        complianceDetails,
        financeDetails,
        contactDetails,
        editedFields,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: "An error occurred while updating the collections",
      });
    }
  });
};
exports.getEditLogOfAllcollection = async (req, res) => {
  var userId = req.params.userId;
  EditLogSchema.findOne({
    where: { userId: userId },
  })
    .then((response) => {
      res.status(200).json({
        status: "success",
        Result: response,
      });
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
    });
};


exports.getvendorDetail = async (req, res) => {
  var userId = req.params.userId;
  VdetailSchema.findOne({
    where: { userId: userId },
  })
    .then((basicInfo) => {
      if (basicInfo) {
        res.status(200).json({
          status: "success",
          message: "basicInfo",
          Country_Region_Code: basicInfo.Country_Region_Code,
        });
      }
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
    });
};

exports.updateContactTeam = async (req, res) => {
  const userId = req.params.userId;
  const updates = req.body;
  // check if there are any empty fields
  for (const key in updates) {
    if (!updates[key]) {
      updates[key] = null;
    }
  }
  const updateResult = await contactTeamSchema.update(req.body, {
    where: { userId },
  });
  if (updateResult[0]) {
    res.status(200).json({
      status: "success",
      message: "Contact Team details updated successfully",
    });
  } else {
    res.status(404).json({
      status: "error",
      message: "Contact Team details not found",
    });
  }
};

exports.vendorEditTabList = async (req, res) => {
  let vendorcode = req.params.vendorCode;
  var masterVendoremail = await vendorCommunicationDetails.findOne({
    where: { userId: req.body.userId },
  });
  const mVendoremailId = masterVendoremail.mastervendor_email;
  if (vendorcode) {
    var subject = `Hitachi Update Vendor Details`;
    var emailContent = `
                          <h4>Hi ${vendorcode}</h4>
                          <p>Your Update Vendor Tab Details are:</p>
                          <ul style="list-style-type:none !important">
                          <li>${req.body.tab1}</li>
                          <li>${req.body.tab2}</li>
                          </ul>
                          <p>Thanks & regards,</p>
                          </div>`;
    var returnFlag = false;
    exports.emailUpdateTabNotification(
      req,
      res,
      subject,
      emailContent,
      returnFlag,
      mVendoremailId
    );
    res.status(200).send({
      message: "VendorCode email Sent successfully!",
      status: "success",
    });
  }
};
