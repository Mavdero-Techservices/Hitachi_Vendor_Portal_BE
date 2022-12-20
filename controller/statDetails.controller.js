const db = require("../model");
const StatDetailSchema = db.statdetail;
const { check, validationResult } = require("express-validator");

exports.postStatdetail = [
    //validate form
    check("GST_No")
        .not()
        .isEmpty()
        .isLength({ min: 2, max: 20 })
        .withMessage("GST_NO is required"),
    check("PAN_No")
        .not()
        .isEmpty()
        .isLength({ min: 2, max: 20 })
        .withMessage("PAN_NO is required"),
    check("TAN_No")
        .not()
        .isEmpty()
        .isLength({ min: 2, max: 20 })
        .withMessage("TAN_NO is required"),
    check("TIN_No")
        .not()
        .isEmpty()
        .isLength({ min: 2, max: 20 })
        .withMessage("TIN_NO is required"),
    check("CIN_No")
        .not()
        .isEmpty()
        .isLength({ min: 2, max: 20 })
        .withMessage("CIN_NO is required"),
    check("MSME_No")
        .not()
        .isEmpty()
        .isLength({ min: 2, max: 20 })
        .withMessage("MSME_NO is required"),
    check("MSME_Type")
        .not()
        .isEmpty()
        .withMessage("MSME_Type is required"),
    check("PAN_Doc")
        .not()
        .isEmpty()
        .withMessage("PAN_Doc is required"),
    check("GST_Doc")
        .not()
        .isEmpty()
        .withMessage("GST_Doc is required"),
    check("MSME_Doc")
        .not()
        .isEmpty()
        .withMessage("MSME_Doc is required"),
    check("CI_Doc")
        .not()
        .isEmpty()
        .withMessage("PAN_Doc is required"),
async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const statdetail = await StatDetailSchema.create({
            GST_No: req.body.GST_No,
            PAN_No: req.body.PAN_No,
            TAN_No: req.body.TAN_No,
            TIN_No: req.body.TIN_No,
            CIN_No: req.body.CIN_No,
            MSME_No: req.body.MSME_No,
            MSME_Type: req.body.MSME_Type,
            PAN_Doc: req.body.PAN_Doc,
            GST_Doc: req.body.GST_Doc,
            MSME_Doc: req.body.MSME_Doc,
            CI_Doc: req.body.CI_Doc,
        });
        res.send({
            message: "Statdetail was registered successfully!",
            status: "success",
            data: statdetail });
    } catch (err) {
        res.status(500).send({ 
            message: err.message || "Some error occurrer while creating the StatDetailSchema"
        });
    }
}
];
