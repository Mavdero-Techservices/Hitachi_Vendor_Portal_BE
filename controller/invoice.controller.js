const db = require("../model");
const InvoiceSchema = db.invoice;
let directory_name = "uploads";
const path = require("path");
var multer = require("multer");
const { log, Console } = require("console");

var eWayBillFileDocPath = "";
var transportDocumentDocPath = "";
var miscDocsDocPath = "";
var boeDocPath = "";
var awbDocPath = "";
var serviceAgreementDocPath = "";
var licDocPath = "";
var licDeliveryProofDocPath = "";
var warrantyCertificateDocPath = "";
var irWccDocPath = "";
var signOffFromCustomerPath = "";
var cocDocPath = "";
var esiPayementChallanDocPath = "";
var pfPayementChallannDocPath = "";
var employeeSummaryDocPath = "";
var arWorkingDocPath = "";
var deliveryProofDocPath = "";
var calculationDocPath = "";
var customExRateDocPath = "";

var level1rejectInvoicedocPath = "";
var level2rejectInvoicedocPath = "";
var level3rejectInvoicedoc = "";

const fs = require("fs");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(directory_name, "/"));
  },
  filename: (req, file, cb) => {
    if (file.fieldname === "eWayBill") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      eWayBillFileDocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
    if (file.fieldname === "transportDocument") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      transportDocumentDocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
    if (file.fieldname === "miscDocs") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      miscDocsDocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
    if (file.fieldname === "boe") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      boeDocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
    if (file.fieldname === "awb") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      awbDocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
    if (file.fieldname === "serviceAgreement") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      serviceAgreementDocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
    if (file.fieldname === "lic") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      licDocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
    if (file.fieldname === "licDeliveryProof") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      licDeliveryProofDocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
    if (file.fieldname === "warrantyCertificate") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      warrantyCertificateDocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
    if (file.fieldname === "irWcc") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      irWccDocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
    if (file.fieldname === "signOffFromCustomer") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      signOffFromCustomerPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
    if (file.fieldname === "coc") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      cocDocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
    if (file.fieldname === "esiPayementChallan") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      esiPayementChallanDocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
    if (file.fieldname === "pfPayementChallan") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      pfPayementChallannDocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
    if (file.fieldname === "employeeSummary") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      employeeSummaryDocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
    if (file.fieldname === "arWorking") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      arWorkingDocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
    if (file.fieldname === "deliveryProof") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      deliveryProofDocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
    if (file.fieldname === "calculation") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      calculationDocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
    if (file.fieldname === "customExRate") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      customExRateDocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
// reject documents
    if (file.fieldname === "level1rejectInvoicedoc") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      level1rejectInvoicedocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
    if (file.fieldname === "level2rejectInvoicedoc") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      level2rejectInvoicedocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
    if (file.fieldname === "level3rejectInvoicedoc") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      level3rejectInvoicedocPath =
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

exports.saveInvoiceInfo = async (req, res) => {
  var upload = multer({ storage: storage }).fields([
    {
      name: "eWayBill",
      maxCount: 1,
    },
    {
      name: "transportDocument",
      maxCount: 1,
    },
    {
      name: "miscDocs",
      maxCount: 1,
    },
    {
      name: "boe",
      maxCount: 1,
    },
    {
      name: "awb",
      maxCount: 1,
    },
    {
      name: "serviceAgreement",
      maxCount: 1,
    },
    {
      name: "lic",
      maxCount: 1,
    },
    {
      name: "licDeliveryProof",
      maxCount: 1,
    },
    {
      name: "warrantyCertificate",
      maxCount: 1,
    },
    {
      name: "irWcc",
      maxCount: 1,
    },
    {
      name: "signOffFromCustomer",
      maxCount: 1,
    },
    {
      name: "coc",
      maxCount: 1,
    },
    {
      name: "esiPayementChallan",
      maxCount: 1,
    },
    {
      name: "pfPayementChallan",
      maxCount: 1,
    },
    {
      name: "employeeSummary",
      maxCount: 1,
    },
    {
      name: "arWorking",
      maxCount: 1,
    },
    {
      name: "deliveryProof",
      maxCount: 1,
    },
    {
      name: "calculation",
      maxCount: 1,
    },
    {
      name: "customExRate",
      maxCount: 1,
    },
    
  ]);
  await upload(req, res, function (err) {
    InvoiceSchema.findOne({
      where: {
        No: req.body.No,
      },
    }).then(async (poDetails) => {
      if (poDetails) {

        let eWayBill = eWayBillFileDocPath;
        let transportDocument = transportDocumentDocPath;
        let miscDocs = miscDocsDocPath;
        let boe = boeDocPath;
        let awb = awbDocPath;
        let serviceAgreement = serviceAgreementDocPath;
        let lic = licDocPath;
        let licDeliveryProof = licDeliveryProofDocPath;
        let warrantyCertificate = warrantyCertificateDocPath;
        let irWcc = irWccDocPath;
        let signOffFromCustomer = signOffFromCustomerPath;
        let coc = cocDocPath;
        let esiPayementChallan = esiPayementChallanDocPath;
        let pfPayementChallan = pfPayementChallannDocPath;
        let employeeSummary = employeeSummaryDocPath;
        let arWorking = arWorkingDocPath;
        let deliveryProof = deliveryProofDocPath;
        let calculation = calculationDocPath;
        let customExRate = customExRateDocPath;
        

        if (poDetails.eWayBill === req.body.eWayBill) {
          eWayBill = req.body.eWayBill;
        } else {
          eWayBill = eWayBillFileDocPath;
        }

        if (poDetails.transportDocument === req.body.transportDocument) {
          transportDocument = req.body.transportDocument;
        } else {
          transportDocument = transportDocumentDocPath;
        }

        if (poDetails.miscDocs === req.body.miscDocs) {
          miscDocs = req.body.miscDocs;
        } else {
          miscDocs = miscDocsDocPath;
        }

        if (poDetails.boe === req.body.boe) {
          boe = req.body.boe;
        } else {
          boe = boeDocPath;
        }

        if (poDetails.awb === req.body.awb) {
          awb = req.body.awb;
        } else {
          awb = awbDocPath;
        }

        if (poDetails.serviceAgreement === req.body.serviceAgreement) {
          serviceAgreement = req.body.serviceAgreement;
        } else {
          serviceAgreement = serviceAgreementDocPath;
        }

        if (poDetails.lic === req.body.lic) {
          lic = req.body.lic;
        } else {
          lic = licDocPath;
        }

        if (poDetails.licDeliveryProof === req.body.licDeliveryProof) {
          licDeliveryProof = req.body.licDeliveryProof;
        } else {
          licDeliveryProof = licDeliveryProofDocPath;
        }

        if (poDetails.warrantyCertificate === req.body.warrantyCertificate) {
          warrantyCertificate = req.body.warrantyCertificate;
        } else {
          warrantyCertificate = warrantyCertificateDocPath;
        }

        if (poDetails.irWcc === req.body.irWcc) {
          irWcc = req.body.irWcc;
        } else {
          irWcc = irWccDocPath;
        }

        if (poDetails.signOffFromCustomer === req.body.signOffFromCustomer) {
          signOffFromCustomer = req.body.signOffFromCustomer;
        } else {
          signOffFromCustomer = signOffFromCustomerPath;
        }

        if (poDetails.coc === req.body.coc) {
          coc = req.body.coc;
        } else {
          coc = cocDocPath;
        }

        if (poDetails.esiPayementChallan === req.body.esiPayementChallan) {
          esiPayementChallan = req.body.esiPayementChallan;
        } else {
          esiPayementChallan = esiPayementChallanDocPath;
        }

        if (poDetails.pfPayementChallan === req.body.pfPayementChallan) {
          pfPayementChallan = req.body.pfPayementChallan;
        } else {
          pfPayementChallan = pfPayementChallannDocPath;
        }

        if (poDetails.employeeSummary === req.body.employeeSummary) {
          employeeSummary = req.body.employeeSummary;
        } else {
          employeeSummary = employeeSummaryDocPath;
        }

        if (poDetails.arWorking === req.body.arWorking) {
          arWorking = req.body.arWorking;
        } else {
          arWorking = arWorkingDocPath;
        }

        if (poDetails.deliveryProof === req.body.deliveryProof) {
          deliveryProof = req.body.deliveryProof;
        } else {
          deliveryProof = arWorkingDocPath;
        }

        if (poDetails.calculation === req.body.calculation) {
          calculation = req.body.calculation;
        } else {
          calculation = calculationDocPath;
        }

        if (poDetails.customExRate === req.body.customExRate) {
          customExRate = req.body.customExRate;
        } else {
          customExRate = customExRateDocPath;
        }

        req.body.eWayBill = eWayBill;
        req.body.transportDocument = transportDocument;
        req.body.miscDocs = miscDocs;
        req.body.boe = boe;
        req.body.awb = awb;
        req.body.serviceAgreement = serviceAgreement;
        req.body.lic = lic;
        req.body.licDeliveryProof = licDeliveryProof;
        req.body.warrantyCertificate = warrantyCertificate;
        req.body.irWcc = irWcc;
        req.body.signOffFromCustomer = signOffFromCustomer;
        req.body.coc = coc;
        req.body.esiPayementChallan = esiPayementChallan;
        req.body.pfPayementChallan = pfPayementChallan;
        req.body.employeeSummary = employeeSummary;
        req.body.arWorking = arWorking;
        req.body.deliveryProof = deliveryProof;
        req.body.calculation = calculation;
        req.body.customExRate = customExRate;

        InvoiceSchema.update(req.body, {
          where: {
            No: req.body.No,
          },
        })
          .then(() => {
            res.status(200).send({
              message: "Invoice Portal Detail was updated successfully!",
              status: "success",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while updating the Bankdetail schema.",
            });
          });
      } else {

        const eWayBill = eWayBillFileDocPath;
        const transportDocument = transportDocumentDocPath;
        const miscDocs = miscDocsDocPath;
        const boe = boeDocPath;
        const awb = awbDocPath;
        const serviceAgreement = serviceAgreementDocPath;
        const lic = licDocPath;
        const licDeliveryProof = licDeliveryProofDocPath;
        const warrantyCertificate = warrantyCertificateDocPath;
        const irWcc = irWccDocPath;
        const signOffFromCustomer = signOffFromCustomerPath;
        const coc = cocDocPath;
        const esiPayementChallan = esiPayementChallanDocPath;
        const pfPayementChallan = pfPayementChallannDocPath;
        const employeeSummary = employeeSummaryDocPath;
        const arWorking = arWorkingDocPath;
        const deliveryProof = deliveryProofDocPath;
        const calculation = calculationDocPath;
        const customExRate = customExRateDocPath;

        const user = new InvoiceSchema({
          No: req.body.No,
          Document_Type:"Invoice",
          vendorName: req.body.vendorName ? req.body.vendorName:"",
          docDate: req.body.docDate,
          vendorInvoiceNo: req.body.vendorInvoiceNo,
          srNo: req.body.srNo,
          glCode: req.body.glCode,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          qty: req.body.qty,
          qtyDelivered: req.body.qtyDelivered,
          rate: req.body.rate,
          baseAmount: req.body.baseAmount,
          taxAmount: req.body.taxAmount,
          grossAmount: req.body.grossAmount,
          eWayBill: eWayBill,
          transportDocument: transportDocument,
          miscDocs: miscDocs,
          boe: boe,
          awb: awb,
          serviceAgreement: serviceAgreement,
          lic: lic,
          licDeliveryProof: licDeliveryProof,
          warrantyCertificate: warrantyCertificate,
          irWcc: irWcc,
          signOffFromCustomer: signOffFromCustomer,
          coc: coc,
          esiPayementChallan: esiPayementChallan,
          pfPayementChallan: pfPayementChallan,
          employeeSummary: employeeSummary,
          arWorking: arWorking,
          deliveryProof: deliveryProof,
          calculation: calculation,
          customExRate: customExRate,
        });
        user.save().then((result) => {
          return res.status(200).json({
            status: "success",
            message: "Invoice Portal Detail Saved Successfully",
            result,
          });
        });
      }
    });
  });
};

exports.getInvoiceinfo = (req, res, next) => {
  InvoiceSchema.findAll()
    .then((data) => {
      return res.status(200).json({ msg: "success", result: data });
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
    });
};
