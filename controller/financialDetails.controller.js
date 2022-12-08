const db = require("../model");
const FdetailSchema = db.fdetail;
const { check, validationResult } = require("express-validator");

exports.postFdetail = [
    //validate form
    check("yearOfAuditedFinancial")
        .not()
        .isEmpty()
        .isDate()
        .withMessage("yearOfAuditedFinancial is required"),
    check("Revenue")
        .not()
        .isEmpty()
        .withMessage("Revenue is required"),
    check("netWorth")
        .not()
        .isEmpty()
        .withMessage("netWorth is required"),
    check("currentAssets")
        .not()
        .isEmpty()
        .withMessage("currentAssets is required"),
    check("directorDetails")
        .not()
        .isEmpty()
        .withMessage("directorDetails is required"),
    async (req, res) => { // added the "async" keyword here
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        try {
            const data = await FdetailSchema.create({
                yearOfAuditedFinancial: req.body.yearOfAuditedFinancial,
                Revenue: req.body.Revenue,
                netWorth: req.body.netWorth,
                currentAssets: req.body.currentAssets,
                directorDetails: req.body.directorDetails,
            });
            res.send({
                message: "FdetailSchema was created successfully!",
                status: "success",
                data :data});
        } catch (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the FdetailSchema.",
            });
        }
    }
];

// Path: routes\routes.js