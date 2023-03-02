const db = require("../model");
const contactTeamSchema = db.contactTeam;
const VdetailSchema = db.vdetail;
const vendorCommunicationDetails = db.vendorCommunicationDetails;
const StatDetailSchema = db.statdetail;
const CompliancedetailSchema = db.complianceDetail;
const FdetailSchema = db.fdetail;
const BankdetailSchema = db.bankdetail;
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
// var fileDisclosurePath = "";
var RPD_DocPath = "";
var COC_DocPath = "";
var NDA_DocPath = "";
var financial_data_DocPath = "";
var financial_data2_DocPath = "";
const fs = require("fs");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(directory_name, "/"));
  },
  filename: (req, file, cb) => {
    var filetype = "";

    if (file.fieldname === "bankdetailDoc") {
      if (file.mimetype === "image/gif") {
        filetype = "gif";
        bankdetailDocPath =
          directory_name + "/" + "bankdetailDoc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "image/png") {
        filetype = "png";
        bankdetailDocPath =
          directory_name + "/" + "bankdetailDoc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "image/jpeg") {
        filetype = "jpg";
        bankdetailDocPath =
          directory_name + "/" + "bankdetailDoc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "application/pdf") {
        filetype = "pdf";
        bankdetailDocPath =
          directory_name + "/" + "bankdetailDoc-" + Date.now() + "." + filetype;
      }
      cb(null, "bankdetailDoc-" + Date.now() + "." + filetype);
    }
    if (file.fieldname === "GST_Doc") {
      if (file.mimetype === "image/gif") {
        filetype = "gif";
        GST_DocPath =
          directory_name + "/" + "GST_Doc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "image/png") {
        filetype = "png";
        GST_DocPath =
          directory_name + "/" + "GST_Doc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "image/jpeg") {
        filetype = "jpg";
        GST_DocPath =
          directory_name + "/" + "GST_Doc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "application/pdf") {
        filetype = "pdf";
        GST_DocPath =
          directory_name + "/" + "GST_Doc-" + Date.now() + "." + filetype;
      }
      cb(null, "GST_Doc-" + Date.now() + "." + filetype);
    }
    if (file.fieldname === "PAN_Doc") {
      if (file.mimetype === "image/gif") {
        filetype = "gif";
        PAN_DocPath =
          directory_name + "/" + "PAN_Doc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "image/png") {
        filetype = "png";
        PAN_DocPath =
          directory_name + "/" + "PAN_Doc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "image/jpeg") {
        filetype = "jpg";
        PAN_DocPath =
          directory_name + "/" + "PAN_Doc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "application/pdf") {
        filetype = "pdf";
        PAN_DocPath =
          directory_name + "/" + "PAN_Doc-" + Date.now() + "." + filetype;
      }
      cb(null, "PAN_Doc-" + Date.now() + "." + filetype);
    }
    if (file.fieldname === "form_10f_Doc") {
      if (file.mimetype === "image/gif") {
        filetype = "gif";
        form_10f_DocPath =
          directory_name + "/" + "form_10f_Doc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "image/png") {
        filetype = "png";
        form_10f_DocPath =
          directory_name + "/" + "form_10f_Doc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "image/jpeg") {
        filetype = "jpg";
        form_10f_DocPath =
          directory_name + "/" + "form_10f_Doc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "application/pdf") {
        filetype = "pdf";
        form_10f_DocPath =
          directory_name + "/" + "form_10f_Doc-" + Date.now() + "." + filetype;
      }
      cb(null, "form_10f_Doc-" + Date.now() + "." + filetype);
    }
    if (file.fieldname === "PE_Declaration_Doc") {
      if (file.mimetype === "image/gif") {
        filetype = "gif";
        PE_Declaration_DocPath =
          directory_name +
          "/" +
          "PE_Declaration_Doc-" +
          Date.now() +
          "." +
          filetype;
      }
      if (file.mimetype === "image/png") {
        filetype = "png";
        PE_Declaration_DocPath =
          directory_name +
          "/" +
          "PE_Declaration_Doc-" +
          Date.now() +
          "." +
          filetype;
      }
      if (file.mimetype === "image/jpeg") {
        filetype = "jpg";
        PE_Declaration_DocPath =
          directory_name +
          "/" +
          "PE_Declaration_Doc-" +
          Date.now() +
          "." +
          filetype;
      }
      if (file.mimetype === "application/pdf") {
        filetype = "pdf";
        PE_Declaration_DocPath =
          directory_name +
          "/" +
          "PE_Declaration_Doc-" +
          Date.now() +
          "." +
          filetype;
      }
      cb(null, "PE_Declaration_Doc-" + Date.now() + "." + filetype);
    }
    if (file.fieldname === "TAN_Doc") {
      if (file.mimetype === "image/gif") {
        filetype = "gif";
        TAN_DocPath =
          directory_name + "/" + "TAN_Doc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "image/png") {
        filetype = "png";
        TAN_DocPath =
          directory_name + "/" + "TAN_Doc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "image/jpeg") {
        filetype = "jpg";
        TAN_DocPath =
          directory_name + "/" + "TAN_Doc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "application/pdf") {
        filetype = "pdf";
        TAN_DocPath =
          directory_name + "/" + "TAN_Doc-" + Date.now() + "." + filetype;
      }
      cb(null, "TAN_Doc-" + Date.now() + "." + filetype);
    }

    if (file.fieldname === "MSME_Doc") {
      if (file.mimetype === "image/gif") {
        filetype = "gif";
        MSME_DocPath =
          directory_name + "/" + "MSME_Doc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "image/png") {
        filetype = "png";
        MSME_DocPath =
          directory_name + "/" + "MSME_Doc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "image/jpeg") {
        filetype = "jpg";
        MSME_DocPath =
          directory_name + "/" + "MSME_Doc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "application/pdf") {
        filetype = "pdf";
        MSME_DocPath =
          directory_name + "/" + "MSME_Doc-" + Date.now() + "." + filetype;
      }
      cb(null, "MSME_Doc-" + Date.now() + "." + filetype);
    }

    // if (file.fieldname === "Tax_residency_Doc") {
    //   if (file.mimetype === "image/gif") {
    //     filetype = "gif";
    //     fileDisclosurePath =
    //       directory_name + "/" + "Tax_residency_Doc-" + Date.now() + "." + filetype;
    //   }
    //   if (file.mimetype === "image/png") {
    //     filetype = "png";
    //     fileDisclosurePath =
    //       directory_name + "/" + "Tax_residency_Doc-" + Date.now() + "." + filetype;
    //   }
    //   if (file.mimetype === "image/jpeg") {
    //     filetype = "jpg";
    //     fileDisclosurePath =
    //       directory_name + "/" + "Tax_residency_Doc-" + Date.now() + "." + filetype;
    //   }
    //   if (file.mimetype === "application/pdf") {
    //     filetype = "pdf";
    //     fileDisclosurePath =
    //       directory_name + "/" + "Tax_residency_Doc-" + Date.now() + "." + filetype;
    //   }
    //   cb(null, "Tax_residency_Doc-" + Date.now() + "." + filetype);
    // }
    if (file.fieldname === "Tax_residency_Doc") {
      if (file.mimetype === "image/gif") {
        filetype = "gif";
        Tax_residency_DocPath =
          directory_name +
          "/" +
          "Tax_residency_Doc-" +
          Date.now() +
          "." +
          filetype;
      }
      if (file.mimetype === "image/png") {
        filetype = "png";
        Tax_residency_DocPath =
          directory_name +
          "/" +
          "Tax_residency_Doc-" +
          Date.now() +
          "." +
          filetype;
      }
      if (file.mimetype === "image/jpeg") {
        filetype = "jpg";
        Tax_residency_DocPath =
          directory_name +
          "/" +
          "Tax_residency_Doc-" +
          Date.now() +
          "." +
          filetype;
      }
      if (file.mimetype === "application/pdf") {
        filetype = "pdf";
        Tax_residency_DocPath =
          directory_name +
          "/" +
          "Tax_residency_Doc-" +
          Date.now() +
          "." +
          filetype;
      }
      cb(null, "Tax_residency_Doc-" + Date.now() + "." + filetype);
    }
    if (file.fieldname === "financial_data") {
      if (file.mimetype === "image/gif") {
        filetype = "gif";
        financial_data_DocPath =
          directory_name +
          "/" +
          "financial_data-" +
          Date.now() +
          "." +
          filetype;
      }
      if (file.mimetype === "image/png") {
        filetype = "png";
        financial_data_DocPath =
          directory_name +
          "/" +
          "financial_data-" +
          Date.now() +
          "." +
          filetype;
      }
      if (file.mimetype === "image/jpeg") {
        filetype = "jpg";
        financial_data_DocPath =
          directory_name +
          "/" +
          "financial_data-" +
          Date.now() +
          "." +
          filetype;
      }
      if (file.mimetype === "application/pdf") {
        filetype = "pdf";
        financial_data_DocPath =
          directory_name +
          "/" +
          "financial_data-" +
          Date.now() +
          "." +
          filetype;
      }
      cb(null, "financial_data-" + Date.now() + "." + filetype);
    }
    if (file.fieldname === "financial_data2") {
      if (file.mimetype === "image/gif") {
        filetype = "gif";
        financial_data2_DocPath =
          directory_name +
          "/" +
          "financial_data2-" +
          Date.now() +
          "." +
          filetype;
      }
      if (file.mimetype === "image/png") {
        filetype = "png";
        financial_data2_DocPath =
          directory_name +
          "/" +
          "financial_data2-" +
          Date.now() +
          "." +
          filetype;
      }
      if (file.mimetype === "image/jpeg") {
        filetype = "jpg";
        financial_data2_DocPath =
          directory_name +
          "/" +
          "financial_data2-" +
          Date.now() +
          "." +
          filetype;
      }
      if (file.mimetype === "application/pdf") {
        filetype = "pdf";
        financial_data2_DocPath =
          directory_name +
          "/" +
          "financial_data2-" +
          Date.now() +
          "." +
          filetype;
      }
      cb(null, "financial_data2-" + Date.now() + "." + filetype);
    }
    if (file.fieldname === "RPD_Doc") {
      if (file.mimetype === "image/gif") {
        filetype = "gif";
        RPD_DocPath =
          directory_name + "/" + "RPD_Doc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "image/png") {
        filetype = "png";
        RPD_DocPath =
          directory_name + "/" + "RPD_Doc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "image/jpeg") {
        filetype = "jpg";
        RPD_DocPath =
          directory_name + "/" + "RPD_Doc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "application/pdf") {
        filetype = "pdf";
        RPD_DocPath =
          directory_name + "/" + "RPD_Doc-" + Date.now() + "." + filetype;
      }
      cb(null, "RPD_Doc-" + Date.now() + "." + filetype);
    }
    if (file.fieldname === "COC_Doc") {
      if (file.mimetype === "image/gif") {
        filetype = "gif";
        COC_DocPath =
          directory_name + "/" + "COC_Doc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "image/png") {
        filetype = "png";
        COC_DocPath =
          directory_name + "/" + "COC_Doc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "image/jpeg") {
        filetype = "jpg";
        COC_DocPath =
          directory_name + "/" + "COC_Doc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "application/pdf") {
        filetype = "pdf";
        COC_DocPath =
          directory_name + "/" + "COC_Doc-" + Date.now() + "." + filetype;
      }
      cb(null, "COC_Doc-" + Date.now() + "." + filetype);
    }
    if (file.fieldname === "NDA_Doc") {
      if (file.mimetype === "image/gif") {
        filetype = "gif";
        NDA_DocPath =
          directory_name + "/" + "NDA_Doc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "image/png") {
        filetype = "png";
        NDA_DocPath =
          directory_name + "/" + "NDA_Doc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "image/jpeg") {
        filetype = "jpg";
        NDA_DocPath =
          directory_name + "/" + "NDA_Doc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "application/pdf") {
        filetype = "pdf";
        NDA_DocPath =
          directory_name + "/" + "NDA_Doc-" + Date.now() + "." + filetype;
      }
      cb(null, "NDA_Doc-" + Date.now() + "." + filetype);
    }
  },
});

exports.saveContactTeam = (req, res) => {
  const contactId = "contactId" + Math.floor(100000 + Math.random() * 900000);
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
  });
  user.save().then((result) => {
    return res
      .status(200)
      .json({ status: "success", message: "Registered Successfully", result });
  });
};
exports.getAllCollection = async (req, res) => {
  var userId = req.params.userId;
  const basicInfoArray = [];
  const CommunicationDetailsArray = [];
  const StatDetailArray = [];
  const CompliancedetailArray = [];
  const FdetailArray = [];
  const bankdetailArray = [];
  const contactTeamArray = [];
  await VdetailSchema.findOne({
    where: { userId: userId },
  }).then(async (basicInfo) => {
    if (basicInfo === null) {
      basicInfoArray.length = 0;
    } else {
      basicInfoArray.push(basicInfo);
    }
    await vendorCommunicationDetails
      .findOne({
        where: { userId: userId },
      })
      .then(async (CommunicationDetails) => {
        if (CommunicationDetails === null) {
          CommunicationDetailsArray.length = 0;
        } else {
          CommunicationDetailsArray.push(CommunicationDetails);
        }
        await StatDetailSchema.findOne({
          where: { userId: userId },
        }).then(async (StatDetail) => {
          if (StatDetail === null) {
            StatDetailArray.length = 0;
          } else {
            StatDetailArray.push(StatDetail);
          }

          await CompliancedetailSchema.findOne({
            where: { userId: userId },
          }).then(async (Compliancedetail) => {
            if (Compliancedetail === null) {
              CompliancedetailArray.length = 0;
            } else {
              CompliancedetailArray.push(Compliancedetail);
            }

            await FdetailSchema.findOne({
              where: { userId: userId },
            }).then(async (Fdetail) => {
              if (Fdetail === null) {
                FdetailArray.length = 0;
              } else {
                FdetailArray.push(Fdetail);
              }

              await BankdetailSchema.findOne({
                where: { userId: userId },
              }).then(async (Bankdetail) => {
                if (Bankdetail === null) {
                  bankdetailArray.length = 0;
                } else {
                  bankdetailArray.push(Bankdetail);
                }
                await contactTeamSchema
                  .findOne({
                    where: { userId: userId },
                  })
                  .then(async (contactTeam) => {
                    if (contactTeam === null) {
                      contactTeamArray.length = 0;
                    } else {
                      contactTeamArray.push(contactTeam);
                    }
                  });
              });
            });
          });
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
    contactDetail: contactTeamArray,
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
  // fileDisclosurePath = "";
  RPD_DocPath = "";
  COC_DocPath = "";
  NDA_DocPath = "";
  financial_data_DocPath = "";
  financial_data2_DocPath = "";

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
    // {
    //   name: "fileDisclosure",
    //   maxCount: 1,
    // },
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
  ]);

  upload(req, res, async function (err) {


    const basicDetails = {
      userId: req.body.userId,
      address1: req.body.address1,
      address2: req.body.address2,
      companyName: req.body.companyName,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      pinCode: req.body.pinCode,
      image: req.body.image,
      vendorType: req.body.vendorType,
      vendorManager: req.body.vendorManager,
      mkDenialCheque: req.body.mkDenialCheque,
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
    let TAN_Doc = TAN_DocPath;
    let form_10f_Doc = form_10f_DocPath;
    let PE_Declaration_Doc = PE_Declaration_DocPath;
    let MSME_Doc = MSME_DocPath;
    let Tax_residency_Doc = Tax_residency_DocPath;

    if (GST_Doc || PAN_Doc || TAN_Doc || form_10f_Doc || PE_Declaration_Doc || MSME_Doc || Tax_residency_Doc) {
      req.body.GST_Doc = GST_Doc;
      req.body.PAN_Doc = PAN_Doc;
      req.body.TAN_Doc = TAN_Doc;
      req.body.form_10f_Doc = form_10f_Doc;
      req.body.PE_Declaration_Doc = PE_Declaration_Doc;
      req.body.MSME_Doc = MSME_Doc;
      req.body.Tax_residency_Doc = Tax_residency_Doc;
    } else {
      GST_Doc = req.body.GST_Doc;
      PAN_Doc = req.body.PAN_Doc;
      TAN_Doc = req.body.TAN_Doc;
      form_10f_Doc = req.body.form_10f_Doc;
      PE_Declaration_Doc = req.body.PE_Declaration_Doc;
      MSME_Doc = req.body.MSME_Doc;
      Tax_residency_Doc = req.body.Tax_residency_Doc;
    }

    req.body.GST_Doc = GST_Doc;
    req.body.PAN_Doc = PAN_Doc;
    req.body.TAN_Doc = TAN_Doc;
    req.body.form_10f_Doc = form_10f_Doc;
    req.body.PE_Declaration_Doc = PE_Declaration_Doc;
    req.body.MSME_Doc = MSME_Doc;
    req.body.Tax_residency_Doc = Tax_residency_Doc;

    const statutoryDetails = {
      userId: req.body.userId,
      GST_type: req.body.GST_type,
      GST_No: req.body.GST_No,
      GST_Doc: GST_Doc,
      PAN_No: req.body.PAN_No,
      PAN_Doc: PAN_Doc,
      CIN_No: req.body.CIN_No,
      form_10f_Doc: form_10f_Doc,
      PE_Declaration_Doc: PE_Declaration_Doc,
      MSME_status: req.body.MSME_status,
      MSME_No: req.body.MSME_No,
      MSME_Doc: MSME_Doc,
      MSME_Type: req.body.MSME_Type,
      TAN_No: req.body.TAN_No,
      TAN_Doc: TAN_Doc,
      Tax_residency_Doc: Tax_residency_Doc,
    };

    let NDA_Doc = NDA_DocPath;
    let COC_Doc = COC_DocPath;
    let RPD_Doc = RPD_DocPath;

    if (RPD_Doc || COC_Doc || NDA_Doc) {
      req.body.NDA_Doc = NDA_Doc;
      req.body.COC_Doc = COC_Doc;
      req.body.RPD_Doc = RPD_Doc;
    } else {
      NDA_Doc = req.body.NDA_Doc;
      COC_Doc = req.body.COC_Doc;
      RPD_Doc = req.body.RPD_Doc;
    }

    const complianceDetails = {
      userId: req.body.userId,
      RPD_Doc: RPD_Doc,
      COC_Doc: COC_Doc,
      NDA_Doc: NDA_Doc,
    };

    let financial_data = financial_data_DocPath;
    let financial_data2 = financial_data2_DocPath;

    if (financial_data || financial_data2) {
      req.body.financial_data = financial_data;
      req.body.financial_data2 = financial_data2;
    } else {
      financial_data = req.body.financial_data;
      financial_data = req.body.financial_data;
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
    };

    let bankdetailDoc = bankdetailDocPath;
    if (bankdetailDoc) {
      req.body.bankdetailDoc = bankdetailDoc;
    } else {
      bankdetailDoc = req.body.bankdetailDoc;
    }

    const bankDetails = {
      userId: req.body.userId,
      bankAccountName: req.body.bankAccountName,
      bankName: req.body.bankName,
      bankAccountNumber: req.body.bankAccountNumber,
      ifscCode: req.body.ifscCode,
      MICRcode: req.body.MICRcode,
      branchAddress: req.body.branchAddress,
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
      res.status(200).json({
        status: "success",
        basicDetails,
        communicationDetails,
        bankDetails,
        statutoryDetails,
        complianceDetails,
        financeDetails,
        contactDetails,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: "An error occurred while updating the collections",
      });
    }
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
          country: basicInfo.country,
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
