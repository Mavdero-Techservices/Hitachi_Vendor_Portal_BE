const db = require("../model");
const HisysContactSchema = db.hisysContact
const { check, validationResult } = require("express-validator");

exports.postHisysContact = [
    //validate form
    check("name")
        .not()
        .isEmpty()
        .withMessage("name is required"),
    check("email")
        .not()
        .isEmpty()
        .isEmail()
        .withMessage("email is required"),
    check("contactNumber")
        .not()
        .isEmpty()
        .isLength(10)
        .withMessage("contactNumber is required"),
    check("name2")
        .not()
        .isEmpty()
        .withMessage("name2 is required"),
    check("email2")
        .not()
        .isEmpty()
        .isEmail()
        .withMessage("email2 is required"),
    check("contactNumber2")
        .not()
        .isEmpty()
        .isLength(10)
        .withMessage("contactNumber2 is required"),
    check("name3")
        .not()
        .isEmpty()
        .withMessage("name3 is required"),
    check("email3")
        .not()
        .isEmpty()
        .isEmail()
        .withMessage("email3 is required"),
    check("contactNumber3")
        .not()
        .isEmpty()
        .isLength(10)
        .withMessage("contactNumber3 is required"),
    async (req, res) => { // added the "async" keyword here
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        try {
            const data = await HisysContactSchema.create({
                userid: req.body.userid,
                name: req.body.name,
                email: req.body.email,
                contactNumber: req.body.contactNumber,
                name2: req.body.name2,
                email2: req.body.email2,
                contactNumber2: req.body.contactNumber2,
                name3: req.body.name3,
                email3: req.body.email3,
                contactNumber3: req.body.contactNumber3
            });
            res.send({
                message: "HisysContactSchema was created successfully!",
                status: "success",
                data :data});
        }
        catch (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the HisysContactSchema."
            });
        }
    }
];
    