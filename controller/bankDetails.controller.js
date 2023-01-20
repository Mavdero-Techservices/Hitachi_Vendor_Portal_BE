const db = require("../model");
const BankdetailSchema = db.bankdetail;
const { check, validationResult } = require("express-validator");

let directory_name = "uploads";
const path = require('path');
var multer = require('multer');
var bankdetailDocPath = '';

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(directory_name, '/'));
  },
  filename: (req, file, cb) => {
    var filetype = '';

    if (file.fieldname === "bankdetailDoc") {
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

exports.saveBankDetail = (req, res) => {
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
      const userId = req.body.userId;
      const user = new BankdetailSchema({
        bankId: bankId,
        userId: userId,
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
            data: data,
          })
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
exports.postBankdetail = (req, res) => {
  const bankdetail = BankdetailSchema.create({
    bankId: req.body.bankId,
    userId: req.body.userId,
    bankAccountName: req.body.bankAccountName,
    bankName: req.body.bankName,
    bankAccountNumber: req.body.bankAccountNumber,
    ifscCode: req.body.ifscCode,
    MICRcode: req.body.MICRcode,
    branchAddress: req.body.branchAddress,
    bankdetailDoc: req.body.bankdetailDoc,
  });
  res.send({
    message: "Bankdetail was created successfully!",
    status: "success",
    data: bankdetail,
  });
}