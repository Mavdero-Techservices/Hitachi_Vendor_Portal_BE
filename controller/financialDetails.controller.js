const db = require("../model");
const FdetailSchema = db.fdetail;
const { check, validationResult } = require("express-validator");

// exports.postFdetail = [
//     //validate form
//     check("yearOfAuditedFinancial")
//         .not()
//         .isEmpty()
//         .isDate()
//         .withMessage("yearOfAuditedFinancial is required"),
//     check("Revenue")
//         .not()
//         .isEmpty()
//         .withMessage("Revenue is required"),
//     check("Profit")
//         .not()
//         .isEmpty()
//         .withMessage("Profit is required"),
//     check("netWorth")
//         .not()
//         .isEmpty()
//         .withMessage("netWorth is required"),
//     check("currentAssets")
//         .not()
//         .isEmpty()
//         .withMessage("currentAssets is required"),
//     check("directorDetails")
//         .not()
//         .isEmpty()
//         .withMessage("directorDetails is required"),
//     check("financial_data")
//         .not()
//         .isEmpty()
//         .withMessage("financial_data is required"),
//     check("financial_data2")
//         .not()
//         .isEmpty()
//         .withMessage("financial_data2 is required"),
//     async (req, res) => { // added the "async" keyword here
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(422).json({ errors: errors.array() });
//         }
//         try {
//             const data = await FdetailSchema.create({
//                 userid: req.body.userid,
//                 yearOfAuditedFinancial: req.body.yearOfAuditedFinancial,
//                 Revenue: req.body.Revenue,
//                 Profit: req.body.Profit,
//                 netWorth: req.body.netWorth,
//                 currentAssets: req.body.currentAssets,
//                 directorDetails: req.body.directorDetails,
//                 financial_data: req.body.financial_data,
//                 financial_data2: req.body.financial_data2
//             });
//             res.send({
//                 message: "FdetailSchema was created successfully!",
//                 status: "success",
//                 data :data});
//         } catch (err) {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while creating the FdetailSchema.",
//             });
//         }
//     }
// ];
let directory_name = "uploads";
const path = require('path');
var multer = require('multer');
var financial_data_DocPath = '';
var financial_data2_DocPath = '';

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(directory_name, '/'));

  },
  filename: (req, file, cb) => {
    console.log(file);
    var filetype = '';

    if (file.fieldname === "financial_data") {
      console.log("RPD_Doc")
      if (file.mimetype === 'image/gif') {
        filetype = 'gif';
        financial_data_DocPath = directory_name + "/" + 'financial_data-' + Date.now() + '.' + filetype;

      }
      if (file.mimetype === 'image/png') {
        filetype = 'png';
        financial_data_DocPath = directory_name + "/" + 'financial_data-' + Date.now() + '.' + filetype;

      }
      if (file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
        financial_data_DocPath = "../uploads/" + 'financial_data-' + Date.now() + '.' + filetype;

      }
      if (file.mimetype === 'application/pdf') {
        filetype = 'pdf';
        financial_data_DocPath = directory_name + "/" + 'financial_data-' + Date.now() + '.' + filetype;

      }
      cb(null, 'financial_data-' + Date.now() + '.' + filetype);
    }
    if (file.fieldname === "financial_data2") {
      console.log("financial_data_DocPath")
      if (file.mimetype === 'image/gif') {
        filetype = 'gif';
        financial_data2_DocPath = directory_name + "/" + 'financial_data2-' + Date.now() + '.' + filetype;

      }
      if (file.mimetype === 'image/png') {
        filetype = 'png';
        financial_data2_DocPath = directory_name + "/" + 'financial_data2-' + Date.now() + '.' + filetype;

      }
      if (file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
        financial_data2_DocPath = "../uploads/" + 'financial_data2-' + Date.now() + '.' + filetype;

      }
      if (file.mimetype === 'application/pdf') {
        filetype = 'pdf';
        financial_data2_DocPath = directory_name + "/" + 'financial_data2-' + Date.now() + '.' + filetype;

      }
      cb(null, 'financial_data2-' + Date.now() + '.' + filetype);
    }
  }
});
exports.saveFinacialDetail = (req, res) => {
  var upload = multer({ storage: storage }).fields(
    [
      {
        name: 'financial_data',
        maxCount: 1
      },
      {
        name: 'financial_data2',
        maxCount: 1
      },
    ]);
  upload(req, res, function (err) {
    if (err) {
      console.log("InsideErr", err);
      return "err";
    }
    else {
      const financial_data = financial_data_DocPath;
      const financial_data2 = financial_data2_DocPath;
      const yearOfAuditedFinancial = req.body.yearOfAuditedFinancial;
      const Revenue = req.body.Revenue;
      const Profit = req.body.Profit;
      const netWorth = req.body.netWorth;
      const currentAssets = req.body.currentAssets;
      const directorDetails = req.body.directorDetails;
      const userId=req.body.userId;
      const user = new FdetailSchema({
        financial_id: 'financial' + Math.floor(100000 + Math.random() * 900000),
        financial_data: financial_data,
        financial_data2: financial_data2,
        yearOfAuditedFinancial: yearOfAuditedFinancial,
        Revenue: Revenue,
        Profit: Profit,
        netWorth: netWorth,
        currentAssets: currentAssets,
        directorDetails: directorDetails,
        userId:userId,

      });
      user.save()
        .then(result => {
          return res.status(200).json({ status: "success", message: "Registered Successfully", result });
        })
    }
  })
} 