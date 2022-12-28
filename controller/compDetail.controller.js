const db = require("../model");
const CompdetailSchema = db.compdetail;
const { check, validationResult } = require("express-validator");

exports.postCompdetail = [
    //validate form
    check("RPD_Doc")
        .not()
        .isEmpty()
        .withMessage("RPD_Doc is required"),
    check("COC_Doc")
        .not()
        .isEmpty()
        .withMessage("COC_Doc is required"),
    check("NDA_Doc")
        .not()
        .isEmpty()
        .withMessage("NDA_Doc is required"),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        try {
            const compdetail = await CompdetailSchema.create({
                userid: req.body.userid,
                RPD_Doc: req.body.RPD_Doc,
                COC_Doc: req.body.COC_Doc,
                NDA_Doc: req.body.NDA_Doc,
            });
            res.send({
                message: "compdetail created successfully",
                status: "success",
                compdetail: compdetail,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error creating compdetail",
                error: error.message,
            });
        }
    },
];
