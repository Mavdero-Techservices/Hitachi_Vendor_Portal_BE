const db = require("../model");
const BankdetailSchema = db.bankdetail;
const { check, validationResult } = require("express-validator");
let directory_name = "uploads";
const path = require("path");
var multer = require("multer");
const { log, Console } = require("console");
var bankdetailDocPath = "";
const fs = require("fs");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(directory_name, "/"));
  },
  filename: (req, file, cb) => {

    let filedirect = file.originalname.split(".")
    
    bankdetailDocPath =  directory_name + "/" + filedirect[0] + "_" + new Date().toISOString().replace(/:/g, '-') + "." + filedirect[1];

    cb(null, filedirect[0] + "_" +  new Date().toISOString().replace(/:/g, '-') + "." + filedirect[1]);
  },
});

exports.saveBankDetail = (req, res) => {
  bankdetailDocPath = "";

  var upload = multer({ storage: storage }).fields([
    { name: "bankdetailDoc", maxCount: 1 },
  ]);
  upload(req, res, function (err) {
    if (err) {
      console.log("InsideErr", err);
      return "err";
    } else {
      var file = req.files;
      var path = Object.entries(file).map(([key, value]) => {
        Object.entries(value).map(([key2, value2]) => {
          if (value2.fieldname === "bankdetailDoc") {
            bankdetailDocPath = value2.path;
          }
        });
      });
      const bankdetailDoc = bankdetailDocPath;
      const bankId = "bank" + Math.floor(100000 + Math.random() * 900000);
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
      user
        .save()
        .then((data) => {
          return res.status(200).json({
            message: "Bankdetail was created successfully!",
            status: "success",
            data: data,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message:
              err.message ||
              "Some error occurred while creating the Bankdetail schema.",
          });
        });
    }
  });
};

exports.updateBankDetail = async (req, res) => {
  bankdetailDocPath = "";

  var userId = req.params.userId;

  var upload = multer({ storage: storage }).fields([
    { name: "bankdetailDoc", maxCount: 1 },
  ]);

  upload(req, res, async function (err) {
    var bDetails = await BankdetailSchema.findOne({
      where: { userId: req.params.userId },
    });

    console.log("bDetails", bDetails);

    if (err) {
      console.log("InsideErr", err);
      return "err";
    } else {
      if (req.files.bankdetailDoc) {
        let bankdetailDoc = bankdetailDocPath;

        if (bDetails.bankdetailDoc === req.body.bankdetailDoc) {
          bankdetailDoc = req.body.bankdetailDoc;
        } else {
          bankdetailDoc = bankdetailDocPath;
          directoryDelete = bDetails.bankdetailDoc;

          console.log("directoryDelete", directoryDelete);

          if (directoryDelete) {
            fs.unlink(directoryDelete, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }

        req.body.bankdetailDoc = bankdetailDoc;
        BankdetailSchema.update(req.body, {
          where: {
            userId: userId,
          },
        })
          .then(() => {
            res.status(200).send({
              message: "Bankdetail was updated successfully!",
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

        req.body.bankdetailDoc = bankdetailDoc;
        BankdetailSchema.update(req.body, {
          where: {
            userId: userId,
          },
        })
          .then(() => {
            res.status(200).send({
              message: "Bankdetail was updated successfully!",
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
      }
    }
  });
};

exports.deleteBankDetailFile = (req, res) => {
  console.log("req", req);
};

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
};
