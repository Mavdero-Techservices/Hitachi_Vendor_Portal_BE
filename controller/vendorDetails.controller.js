const db = require("../model");
const VdetailSchema = db.vdetail;
const { check, validationResult } = require("express-validator");

exports.postVdetail = [
  //validate form
  check("vendorId")
    .not()
    .isEmpty()
    .isNumeric()
    .withMessage("vendorId is required"),
  check("address1")
    .not()
    .isEmpty()
    .isLength({ min: 5, max: 50 })
    .withMessage("address1 is required"),
  check("address2")
    .not()
    .isEmpty()
    .isLength({ min: 5, max: 50 })
    .withMessage("address2 is required"),
  check("city")
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 20 })
    .withMessage("city is required"),
  check("state")
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 20 })
    .withMessage("state is required"),
  check("country")
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 20 })
    .withMessage("country is required"),
  check("pinCode")
    .not()
    .isEmpty()
    .isNumeric()
    .isLength(6)
    .withMessage("pinCode is required"),
  check("contactName")
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 20 })
    .withMessage("contactName is required"),
  check("companyName")
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 20 })
    .withMessage("companyName is required"),
  check("designation")
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 20 })
    .withMessage("designation is required"),
    check("phoneNumber")
    .not()
    .isEmpty()
    .isNumeric()
    .isLength(10)
    .withMessage("phoneNumber is required"),
  check("emailId")
    .not()
    .isEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage("email is not valid"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", errors: errors.array() });
    } else {
      const vendorId = req.body.vendorId;
      const address1 = req.body.address1;
      const address2 = req.body.address2;
      const city = req.body.city;
      const state = req.body.state;
      const country = req.body.country;
      const pinCode = req.body.pinCode;
      const contactName = req.body.contactName;
      const companyName = req.body.companyName;
      const designation = req.body.designation;
      const phoneNumber = req.body.phoneNumber;
      const emailId = req.body.emailId;
      const user = new VdetailSchema({
        vendorId: vendorId,
        address1: address1,
        address2: address2,
        city: city,
        state: state,
        country: country,
        pinCode: pinCode,
        contactName: contactName,
        companyName: companyName,
        designation: designation,
        phoneNumber: phoneNumber,
        emailId: emailId,
      });
      try {
        const result = await user.save();
        return res.status(200).json({
          status: "success",
          result,
          message: "Registered Successfully",
        });
      } catch (err) {
        return res
          .status(404)
          .json({ status: "error", err, message: "Error Response" });
      }
    }
  },
];