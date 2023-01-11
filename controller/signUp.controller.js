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
    where: { emailId: emailId },
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
                result: { _id: user.id, companyName: user.companyName, emailId: user.emailId, verifiedUser: user.verifiedUser }
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
//ResetPassword-confirmationCode
exports.resetPasswordByCode = (req, res, next) => {
  const emailId = req.body.emailId;
  SignUpSchema.findOne({
    where: {
      emailId: emailId,
    },
  })
    .then(async user => {
      const mailConfirmationCode = Math.floor(100000 + Math.random() * 900000);
      if (!user) {
        return res.status(200).json("invalid user");
      }
      else {
        var subject = `confirmation mail for Reset Password`;
        var emailContent = `<h1>Reset password</h1>
    <h2>Hello ${user.contactPerson}</h2>
    <p>please click the below link to Reset your password.</p>
    <a href=http://localhost:3000/passwordGeneration/${user.emailId}/${mailConfirmationCode}> Click here</a>
    </div>`;
        var returnFlag = false;
        exports.emailNotification(req, res, subject, emailContent, returnFlag, user.emailId);
        await SignUpSchema.update(
          { mailConfirmationCode: mailConfirmationCode },
          { where: { id: user.id } }
        ).then(code => {
          console.log("send password Code", code);
        })

      }
    })
    .catch(err => console.log(err));



};
//ResetPassword
exports.resetPassword = (req, res, next) => {
  const emailId = req.body.emailId;
  const mailConfirmationCode = req.body.mailConfirmationCode;
  const confirmPassword = req.body.confirmPassword;
  const password = req.body.password;
  SignUpSchema.findOne({
    where: {
      emailId: emailId,
      mailConfirmationCode: mailConfirmationCode
    },
  })
    .then(async user => {
      if (!user) {
        return res.status(200).json("invalid user");
      }
      else {
        bcrypt
          .hash(password, 12)
          .then(async hashedPassword => {
            await SignUpSchema.update(
              {
                password: hashedPassword,
                confirmPassword: hashedPassword,
                verifiedUser: 'approved'
              },
              { where: { id: user.id } }
            ).then(code => {
              return res.status(200).json("password reset successfully");
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
//getCountry
exports.getCountry = (req, res, next) => {
  var country = getData();
  return res.status(200).json({ status: "success", data: country });
}
//getState&cityByzipcode
exports.getStateAndcityByzipcode = (req, res, next) => {
  var code = req.body.code;
  var zipCode = req.body.zipCode;
  const result = geoCountryZipCode.lookup(code, zipCode);
  return res.status(200).json({ status: "success", data: result });
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
exports.emailNotification = (req, res, subject, emailContent, returnFlag, emailId) => {
  var mailOptions = {
    from: user,
    to: `${emailId}`,
    subject: subject,
    html: emailContent,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.status(200).json({ status: 'error', data: error });
    } else {
      if (returnFlag === true) {
        return res.status(200).json({ status: 'error', data: 'Error Response' });
      }
      else {
        return res.status(200).json({ status: 'success', data: 'mail sent Successfully' });
      }
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

//signUpApi
exports.saveUser = (req, res) => {
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
        const verifiedUser = 'Pending';
        const vendorId = 'vendor' + Math.floor(100000 + Math.random() * 900000);
        const mailConfirmationCode = Math.floor(100000 + Math.random() * 900000);
        const phoneNoConfirmationCode = Math.floor(100000 + Math.random() * 900000);
        const user = new SignUpSchema({
          companyName: companyName,
          phoneNumber: phoneNumber,
          contactPerson: contactPerson,
          emailId: emailId,
          mailConfirmationCode: mailConfirmationCode,
          phoneNoConfirmationCode: phoneNoConfirmationCode,
          verifiedUser: verifiedUser,
          vendorId: vendorId
        });
        user.save()
          .then(result => {
            var subject = `confirmation mail for VendorId and password`;
            var emailContent = `<h1>Email Confirmation</h1>
                      <h2>Hello ${contactPerson}</h2>
                      <p>Your vendor Id is ${vendorId}, please click the below link to create password.</p>
                      <a href=http://localhost:3000/passwordGeneration/${result.emailId}/${result.mailConfirmationCode}> Click here</a>
                      </div>`;
            var returnFlag = false;
            exports.emailNotification(req, res, subject, emailContent, returnFlag, result.emailId);
            return res.status(200).json({ status: "success", message: "Registered Successfully", result });
          })
      }
    })
    .catch(err => {
      return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
    });

};