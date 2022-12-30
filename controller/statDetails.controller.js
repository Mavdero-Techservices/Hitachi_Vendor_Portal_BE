const db = require("../model");
const StatDetailSchema = db.statdetail;
const { check, validationResult } = require("express-validator");

exports.postStatdetail = [
    //validate form
    check("GST_type")
        .not()
        .isEmpty()
        .withMessage("GST_type is required"),
    check("GST_No")
        .not()
        .isEmpty()
        .isLength(15)
        .withMessage("GST_NO is required"),
    check("GST_Doc")
        .not()
        .isEmpty()
        .withMessage("GST_Doc is required"),
    check("PAN_No")
        .not()
        .isEmpty()
        .isLength(10)
        .withMessage("PAN_NO is required"),
    check("PAN_Doc")
        .not()
        .isEmpty()
        .withMessage("PAN_Doc is required"),
    check("CIN_No")
        .not()
        .isEmpty()
        .isLength({ min: 2, max: 20 })
        .withMessage("CIN_NO is required"),
    check("form_10f")
        .not()
        .isEmpty()
        .withMessage("form_10f is required"),
    check("pe_declaration")
        .not()
        .isEmpty()
        .withMessage("pe_declaration is required"),
    check("MSME_status")
        .not()
        .isEmpty()
        .withMessage("MSME_status is required"),
    check("MSME_No")
        .not()
        .isEmpty()
        .isLength({ min: 2, max: 20 })
        .withMessage("MSME_NO is required"),
    check("MSME_Doc")
        .not()
        .isEmpty()
        .withMessage("MSME_Doc is required"), 
    check("MSME_Type")
        .not()
        .isEmpty()
        .withMessage("MSME_Type is required"),
    check("TAN_No")
        .not(10)
        .isEmpty()
        .isLength({ min: 2, max: 20 })
        .withMessage("TAN_NO is required"),
    check("TAN_Doc")
        .not()
        .isEmpty()
        .withMessage("TAN_Doc is required"),
    check("Tax_residency")
        .not()
        .isEmpty()
        .withMessage("Tax_residency is required"),
async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const statdetail = await StatDetailSchema.create({
            userid: req.body.userid,
            GST_type: req.body.GST_type,
            GST_No: req.body.GST_No,
            GST_Doc: req.body.GST_Doc,
            PAN_No: req.body.PAN_No,
            PAN_Doc: req.body.PAN_Doc,
            CIN_No: req.body.CIN_No,
            form_10f: req.body.form_10f,
            pe_declaration: req.body.pe_declaration,
            MSME_status: req.body.MSME_status,
            MSME_No: req.body.MSME_No,
            MSME_Doc: req.body.MSME_Doc,
            MSME_Type: req.body.MSME_Type,
            TAN_No: req.body.TAN_No,
            TAN_Doc: req.body.TAN_Doc,
            Tax_residency: req.body.Tax_residency,
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

//update statutory details
exports.updateStatdetail = async (req, res) => {
    const userid = req.params.id;
    const updateStatdetail = await StatDetailSchema.update(req.body, {
        where: { userid: userid },
    })
    if(updateStatdetail[0]) {
        res.send({
            message: "Statdetail was updated successfully!",
            status: "success",
            data: updateStatdetail
        });
    } else {
        res.status(500).send({
            message: "Error updating Statdetail with id=" + id,
            status: "error",
            data: updateStatdetail
        });
    }
};
    