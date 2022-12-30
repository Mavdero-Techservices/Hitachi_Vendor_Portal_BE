const db = require("../model");
const BankdetailSchema = db.bankdetail;
const { check, validationResult } = require("express-validator");

exports.postBankdetail = [
  //validate form
  check("bankId")
    .not()
    .isEmpty()
    .isNumeric()
    .withMessage("bankId is required"),
  check("bankAccountName")
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 20 })
    .withMessage("bankAccountName is required"),
  check("bankName")
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 20 })
    .withMessage("bankName is required"),
  check("bankAccountNumber")
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 20 })
    .withMessage("bankAccountNumber is required"),
  check("ifscCode")
    .not()
    .isEmpty()
    .isNumeric()
    .isLength({ min: 2, max: 20 })
    .withMessage("ifscCode is required"),
  check("MICRcode")
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 20 })
    .withMessage("MICRcode is required"),
  check("branchAddress")
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 20 })
    .withMessage("bankAddress is required"),
  check("bankdetailDoc")
    .not()
    .isEmpty()
    .withMessage("bankDoc is required"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const bankdetail = await BankdetailSchema.create({
        bankId: req.body.bankId,
        userid: req.body.userid,
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
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Bankdetail.",
      });
    }
  },
];

// Path: routes\routes.js
