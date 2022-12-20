const db = require("../model");
const SignUpSchema = db.singUp;
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
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
              return res.status(200).json("User already exist");
            }
            else {
              const companyName = req.body.companyName;
              const phoneNumber = req.body.phoneNumber;
              const contactPerson = req.body.contactPerson;
              const emailId = req.body.emailId;
              const password = req.body.password;
              const verifiedUser = req.body.verifiedUser;
              const mailConfirmationCode = Math.floor(100000 + Math.random() * 900000);
              const phoneNoConfirmationCode = Math.floor(100000 + Math.random() * 900000);
              const role = req.body.role;
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
                    mailConfirmationCode: mailConfirmationCode,
                    phoneNoConfirmationCode: phoneNoConfirmationCode,
                    verifiedUser: verifiedUser,
                    role: role
                  });
                  user.save()
                    .then(result => {
                      smsintegration(req, res, phoneNoConfirmationCode, phoneNumber);
                      exports.emailNotification(req, res, mailConfirmationCode, contactPerson);
                      return res.status(200).json({ status: "success", message: "Registered Successfully", result });
                    })
                })
            }
          })
          .catch(err => {
            return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
          });
      }
      catch (err) {
        return res.status(200).json({ status: 'error', data: 'Error Response' });
      }
    }
  }
];
//login
exports.postLogin = (req, res) => {
  const emailId = req.body.emailId;
  const password = req.body.password;
  SignUpSchema.findOne({
    where: { emailId: emailId},
  })
    .then(user => {
      if (!user) {
        return res.status(200).json("invalid user");
      }
      else {

        bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
                     // Create token
              const token = jwt.sign(
                { user_id: user._id },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "1h",
                }
              );
              // save user token 
              user.token = token;
              return res.json({
                token,
                result: { _id: user.id, companyName: user.companyName, emailId: user.emailId, role: user.role }
              })
          }
          else {
            return res.status(200).json("invalid user");
          }
        })

      }
    })
    .catch(err => {
      return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
    });
};
//resetPassword
exports.resetPassword = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  SignUpSchema.findOne({ email: email })
    .then(user => {
     if (!user) {
      return res.status(200).json("invalid user");
    }
    else
    {
    return bcrypt
      .hash(password, 12)
      .then(hashedPassword => {
        SignUpSchema.update({
          password: hashedPassword
        }, {
          where: { id: user.id },
          returning: true,
          plain: true
        }).then(result => {
            return res.status(200).json({ status: "success", data: "password Updated Successfully" });
          }).catch(err => {
            console.log("Error in password update api:", err);
          
          })
      })
    }
    })
    .catch(err => console.log(err));
};

exports.signout = (req, res) => {
  res.clearCookie("t")
  return res.status('200').json({
    message: "signed out"
  })
}

//send email
var nodemailer = require('nodemailer');
const config = require("../config/auth.config");
const user = config.user;
const pass = config.pass;
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: user,
    pass: pass,
  }
});

exports.emailNotification = (req, res, mailConfirmationCode, contactPerson) => {
  var mailOptions = {
    from: user,
    to: "test@gmail.com",
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
        <h2>Hello,${contactPerson}</h2>
        <p>Please confirm your email,Your Verification code is ${mailConfirmationCode} </p>
        </div>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.status(200).json({ status: 'error', data: error });
    } else {
      return res.status(200).json({ status: 'success', data: 'mail sent Successfully' });
    }
  });
}
function smsintegration(req, res, phoneNoConfirmationCode, phoneNumber) {
  const accountSid = 'AC7dd6eea117c28296a64945c0d5e69d22';
  const authToken = '4a6876e0cd44abce7d4e7a17cdf5abc6';
  const client = require('twilio')(accountSid, authToken);
  client.messages
    .create({
      body: `please verify your account ${phoneNoConfirmationCode}`,
      from: '+14055544570',
      to: phoneNumber
    })
    .then(message => console.log(message.sid))
    .done();
}