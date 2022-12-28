const db = require("../model");
const VdetailSchema = db.vdetail;
const { check, validationResult } = require("express-validator");

exports.postVdetail = [
  //validate form
  check("company_logo")
    .not()
    .isEmpty()
    .withMessage("company_logo is required"),
  check("companyName")
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 20 })
    .withMessage("companyName is required"),
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
  check("country")
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 20 })
    .withMessage("country is required"),
  check("state")
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 20 })
    .withMessage("state is required"),
  check("city")
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 20 })
    .withMessage("city is required"),
  check("pinCode")
    .not()
    .isEmpty()
    .isNumeric()
    .isLength(6)
    .withMessage("pinCode is required"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", errors: errors.array() });
    } else {
      const userid = req.body.userid;
      const companyName = req.body.companyName;
      const address1 = req.body.address1;
      const address2 = req.body.address2;
      const country = req.body.country;
      const state = req.body.state;
      const city = req.body.city;
      const pinCode = req.body.pinCode;
      const user = new VdetailSchema({
        userid: userid,
        companyName: companyName,
        address1: address1,
        address2: address2,
        city: city,
        state: state,
        country: country,
        pinCode: pinCode,
      });
      try {
        const result = await user.save();
        return res.status(200).json({
          status: "success",
          result,
          message: "Vendor details inserted Successfully",
        });
      } catch (err) {
        return res
          .status(404)
          .json({ status: "error", err, message: "Error Response" });
      }
    }
  },
];

// updateVendor
exports.updateVendor = async (req, res) => {
  const userid = req.params.userid;
  const updateResult = await VdetailSchema.update(req.body, {
    where: { userid }
  });

  if (updateResult[0]) {
    res.status(200).json({
      status: "success",
      message: "Vendor updated successfully"
    });
  } else {
    res.status(404).json({
      status: "error",
      message: "Vendor not found"
    });
  }
};


