const db = require("../model");
const SignUpSchema = db.singUp;
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
//SignUp
exports.postSingUp = [
  //validate form
  check('companyName')
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 20 })
    .withMessage('companyName is required'),
  check('phoneNumber')
    .not()
    .isEmpty()
    .isNumeric()
    .isLength(10)
    .withMessage('phoneNumber is required'),
  check('contactPerson')
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 20 })
    .withMessage('contactPerson is required'),
  check('emailId')
    .not()
    .isEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage('emailId is not valid'),
  check('password')
    .not()
    .isEmpty()
    .isLength({ min: 6, max: 16 })
    .withMessage('password is required'),
  check('confirmPassword').exists().custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('password not same!!!');
    }
    return true;
  }),
  check('verifiedUser')
    .not()
    .isEmpty()
    .withMessage('verifiedUser is required'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'error', errors: errors.array() });
    }
    else {
      try {
        SignUpSchema.findOne({
          where: { emailId: req.body.emailId, companyName: req.body.companyName, phoneNumber: req.body.phoneNumber },
        })
          .then(user => {
            if (user) {
              return res.status(200).json("user already exist");
            }
            else {
              const companyName = req.body.companyName;
              const phoneNumber = req.body.phoneNumber;
              const contactPerson = req.body.contactPerson;
              const emailId = req.body.emailId;
              const password = req.body.password;
              const verifiedUser = req.body.verifiedUser;
              bcrypt
                .hash(password, 12)
                .then(hashedPassword => {
                  const user = new SignUpSchema({
                    companyName: companyName,
                    phoneNumber: phoneNumber,
                    contactPerson: contactPerson,
                    emailId: emailId,
                    password: hashedPassword,
                    confirmPassword: hashedPassword,
                    verifiedUser: verifiedUser
                  });
                  user.save()
                    .then(result => {
                      return res.status(200).json({ status: "success", result, message: "Registered Successfully" });
                    })
                })
            }
          })
          .catch(err => {
            return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
          });
      }
      catch (err) {
        console.log('Error in signUp api', err);
        return res.status(200).json({ status: 'error', data: 'Error Response' });
      }
    }

  }

];

//login
exports.postLogin = (req, res) => {
  const emailId = req.params.emailId;
  SignUpSchema.findOne({
    where: { emailId: emailId },
  })
    .then(user => {
      if (!user) {
        return res.status(200).json("invalid user");
      }
      else {
        return res.status(200).json({ msg: "success", result: user });
      }
    })
    .catch(err => {
      return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
    });
};
