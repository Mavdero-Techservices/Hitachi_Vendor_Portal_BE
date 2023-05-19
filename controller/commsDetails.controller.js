const db = require("../model");
const CommsdetailSchema = db.commsdetail;
const { check, validationResult } = require("express-validator");

exports.postCommsdetail = [
    //validate form
    check("fs_ContactName")
        .not()
        .isEmpty()
        .isLength({ min: 2, max: 20 })
        .withMessage("Financial Spoc ContactName is required"),
    check("fs_Designation")
        .not()
        .isEmpty()
        .isLength({ min: 2, max: 20 })
        .withMessage("Financial Spoc Designation is required"),
    check("fs_PhoneNo")
        .not()
        .isEmpty()
        .isNumeric()
        .isLength({ min: 2, max: 20 })
        .withMessage("Financial Spoc PhoneNo is required"),
    check("fs_Email")
        .not()
        .isEmpty()
        .isLength({ min: 2, max: 20 })
        .withMessage("Financial Spoc Email is required"),
    check("ops_ContactName")
        .not()
        .isEmpty()
        .isLength({ min: 2, max: 20 })
        .withMessage("Operations Spoc ContactName is required"),
    check("ops_Designation")
        .not()
        .isEmpty()
        .isLength({ min: 2, max: 20 })
        .withMessage("Operations Spoc Designation is required"),
    check("ops_PhoneNo")
        .not()
        .isEmpty()
        .isLength({ min: 2, max: 20 })
        .withMessage("Operations Spoc PhoneNo is required"),
    check("ops_Email")
        .not()
        .isEmpty()
        .isLength({ min: 2, max: 20 })
        .withMessage("Operations Spoc Email is required"),
    check("mngs_ContactName")
        .not()
        .isEmpty()
        .isLength({ min: 2, max: 20 })
        .withMessage("Management Spoc ContactName is required"),
    check("mngs_Designation")
        .not()
        .isEmpty()
        .isLength({ min: 2, max: 20 })
        .withMessage("Management Spoc Designation is required"),
    check("mngs_PhoneNo")
        .not()
        .isEmpty()
        .isLength({ min: 2, max: 20 })
        .withMessage("Management Spoc PhoneNo is required"),
    check("mngs_Email")
        .not()
        .isEmpty()
        .isLength({ min: 2, max: 20 })
        .withMessage("Management Spoc Email is required"),
    check("others_ContactName")
        .not()
        .isEmpty()
        .isLength({ min: 2, max: 20 })
        .withMessage("others ContactName is required"),
    check("others_Designation")
        .not()
        .isEmpty()
        .isLength({ min: 2, max: 20 })
        .withMessage("others Designation is required"),
    check("others_PhoneNo")
        .not()
        .isEmpty()
        .isLength({ min: 2, max: 20 })
        .withMessage("others PhoneNo is required"),
    check("others_Email")
        .not()
        .isEmpty()
        .isLength({ min: 2, max: 20 })
        .withMessage("others Email is required"),
    check("mastervendor_email")
        .not()
        .isEmpty()
        .isEmail()
        .withMessage("mastervendor_email is required"),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        try {
            const commsdetail = await CommsdetailSchema.create({
                userid: req.body.userid,
                fs_ContactName: req.body.fs_ContactName,
                fs_Designation: req.body.fs_Designation,
                fs_PhoneNo: req.body.fs_PhoneNo,
                fs_Email: req.body.fs_Email,
                ops_ContactName: req.body.ops_ContactName,
                ops_Designation: req.body.ops_Designation,
                ops_PhoneNo: req.body.ops_PhoneNo,
                ops_Email: req.body.ops_Email,
                mngs_ContactName: req.body.mngs_ContactName,
                mngs_Designation: req.body.mngs_Designation,
                mngs_PhoneNo: req.body.mngs_PhoneNo,
                mngs_Email: req.body.mngs_Email,
                others_ContactName: req.body.others_ContactName,
                others_Designation: req.body.others_Designation,
                others_PhoneNo: req.body.others_PhoneNo,
                others_Email: req.body.others_Email,
                mastervendor_email: req.body.mastervendor_email
            });
            res.send({
                message: "Commsdetail was created successfully!",
                data: commsdetail,
                status: "success"
            })
        } catch (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Commsdetail."
            });
        }
    }
];
