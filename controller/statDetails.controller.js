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
        .withMessage("IEC_NO is required"),
    check("MSME_Type")
        .not()
        .isEmpty()
        .isLength({ min: 2, max: 20 })
        .withMessage("MSME_Type is required"),
    check("CI_Doc")
        .not()
        .isEmpty()
        .withMessage("PAN_Doc is required"),
    check("RPD_Doc")
        .not()
        .isEmpty()
        .withMessage("GST_Doc is required"),
    check("COC_Doc")
        .not()
        .isEmpty()
        .withMessage("TAN_Doc is required"),
    check("ND_Doc")
        .not()
        .isEmpty()
        .withMessage("TIN_Doc is required"),
async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const statdetail = await StatDetailSchema.create({
            GST_NO: req.body.GST_NO,
            PAN_NO: req.body.PAN_NO,
            TAN_NO: req.body.TAN_NO,
            TIN_NO: req.body.TIN_NO,
            CIN_NO: req.body.CIN_NO,
            MSME_NO: req.body.MSME_NO,
            MSME_Type: req.body.MSME_Type,
            CI_Doc: req.body.CI_Doc,
            RPD_Doc: req.body.RPD_Doc,
            COC_Doc: req.body.COC_Doc,
            ND_Doc: req.body.ND_Doc
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
