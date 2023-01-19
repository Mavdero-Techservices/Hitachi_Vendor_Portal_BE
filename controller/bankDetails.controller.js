const db = require("../model");
const BankdetailSchema = db.bankdetail;
const { check, validationResult } = require("express-validator");

// exports.postBankdetail = [
//   //validate form
//   check("bankAccountName")
//     .not()
//     .isEmpty()
//     .isLength({ min: 2, max: 20 })
//     .withMessage("bankAccountName is required"),
//   check("bankName")
//     .not()
//     .isEmpty()
//     .isLength({ min: 2, max: 20 })
//     .withMessage("bankName is required"),
//   check("bankAccountNumber")
//     .not()
//     .isEmpty()
//     .isLength({ min: 2, max: 20 })
//     .withMessage("bankAccountNumber is required"),
//   check("ifscCode")
//     .not()
//     .isEmpty()
//     .isNumeric()
//     .isLength({ min: 2, max: 20 })
//     .withMessage("ifscCode is required"),
//   check("MICRcode")
//     .not()
//     .isEmpty()
//     .isLength({ min: 2, max: 20 })
//     .withMessage("MICRcode is required"),
//   check("branchAddress")
//     .not()
//     .isEmpty()
//     .isLength({ min: 2, max: 20 })
//     .withMessage("bankAddress is required"),
//   check("bankdetailDoc")
//     .not()
//     .isEmpty()
//     .withMessage("bankDoc is required"),
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(422).json({ errors: errors.array() });
//     }
//     try {
//       const bankdetail = await BankdetailSchema.create({
//         bankId: req.body.bankId,
//         userid: req.body.userid,
//         bankAccountName: req.body.bankAccountName,
//         bankName: req.body.bankName,
//         bankAccountNumber: req.body.bankAccountNumber,
//         ifscCode: req.body.ifscCode,
//         MICRcode: req.body.MICRcode,
//         branchAddress: req.body.branchAddress,
//         bankdetailDoc: req.body.bankdetailDoc,
//       });
//       res.send({
//         message: "Bankdetail was created successfully!",
//         status: "success",
//         data: bankdetail,
//       });
//     } catch (err) {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Bankdetail schema.",
//       });
//     }
//   },
// ];

let directory_name = "uploads";
const path = require('path');
var multer = require('multer');
var bankdetailDocPath = '';

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(directory_name, '/'));
  },
  filename: (req, file, cb) => {
    console.log(file);
    var filetype = '';
  
    if (file.fieldname === "bankdetailDoc") {
      console.log("bankdetailDoc")
      if (file.mimetype === 'image/gif') {
        filetype = 'gif';
        bankdetailDocPath = directory_name + "/" + 'bankdetailDoc-' + Date.now() + '.' + filetype;
      }
      if (file.mimetype === 'image/png') {
        filetype = 'png';
        bankdetailDocPath = directory_name + "/" + 'bankdetailDoc-' + Date.now() + '.' + filetype;

      }
      if (file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
        bankdetailDocPath = "../uploads/" + 'bankdetailDoc-' + Date.now() + '.' + filetype;

      }
      if (file.mimetype === 'application/pdf') {
        filetype = 'pdf';
        bankdetailDocPath = directory_name + "/" + 'bankdetailDoc-' + Date.now() + '.' + filetype;

      }
      cb(null, 'bankdetailDoc-' + Date.now() + '.' + filetype);
    }
  }
});

exports.saveBankDetail = (req,res) => {
  var upload = multer({ storage: storage }).fields(
    [
      { name: 'bankdetailDoc', maxCount: 1 },
    ]);
  upload(req, res, function (err) {
    if (err) {
      console.log("InsideErr", err);
      return "err";
    }
    else {
      const bankdetailDoc = bankdetailDocPath
      const bankId = 'bank' + Math.floor(100000 + Math.random() * 900000);
      const userid = req.body.userid;
      const user = new BankdetailSchema({
        bankId: bankId,
        userid: userid,
        bankAccountName: req.body.bankAccountName,
        bankName: req.body.bankName,
        bankAccountNumber: req.body.bankAccountNumber,
        ifscCode: req.body.ifscCode,
        MICRcode: req.body.MICRcode,
        branchAddress: req.body.branchAddress,
        bankdetailDoc: bankdetailDoc,
      });
      user.save()
        .then(data => {
          return res.status(200).json({
            message: "Bankdetail was created successfully!",
            status: "success",
            data: data, })
        })
        .catch(err => {
          return res.status(500).json({
            message:
              err.message || "Some error occurred while creating the Bankdetail schema.",
          });
        });
    }
  })
}

// Path: routes\routes.js
