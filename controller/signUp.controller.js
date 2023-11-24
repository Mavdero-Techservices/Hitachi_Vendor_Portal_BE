const db = require("../model");
const SignUpSchema = db.singUp;
const UserLogSchema = db.userLogs;
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = config.apiKey;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
//SignUp
exports.postSingUp = [
  //validate form
  check("companyName")
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 20 })
    .withMessage("companyName is required"),
  check("phoneNumber")
    .not()
    .isEmpty()
    .isNumeric()
    .isLength(10)
    .withMessage("phoneNumber is required"),
  check("contactPerson")
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 20 })
    .withMessage("contactPerson is required"),
  check("emailId")
    .not()
    .isEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage("emailId is not valid"),
  check("password")
    .not()
    .isEmpty()
    .isLength({ min: 6, max: 16 })
    .withMessage("password is required"),
  check("confirmPassword")
    .exists()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("password not same!!!");
      }
      return true;
    }),
  check("verifiedUser").not().isEmpty().withMessage("verifiedUser is required"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", errors: errors.array() });
    } else {
      try {
        SignUpSchema.findOne({
          where: {
            emailId: req.body.emailId,
            companyName: req.body.companyName,
            phoneNumber: req.body.phoneNumber,
          },
        })
          .then((user) => {
            if (user) {
              return res.status(200).json("User already exist");
            } else {
              const companyName = req.body.companyName;
              const phoneNumber = req.body.phoneNumber;
              const contactPerson = req.body.contactPerson;
              const emailId = req.body.emailId;
              const password = req.body.password;
              const verifiedUser = req.body.verifiedUser;
              const mailConfirmationCode = Math.floor(
                100000 + Math.random() * 900000
              );
              const phoneNoConfirmationCode = Math.floor(
                100000 + Math.random() * 900000
              );
              const role = "user";
              bcrypt.hash(password, 12).then((hashedPassword) => {
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
                  role: role,
                });
                user.save().then((result) => {
                  smsintegration(
                    req,
                    res,
                    phoneNoConfirmationCode,
                    phoneNumber
                  );
                  exports.emailNotification(
                    req,
                    res,
                    mailConfirmationCode,
                    contactPerson
                  );
                  return res.status(200).json({
                    status: "success",
                    message: "Registered Successfully",
                    result,
                  });
                });
              });
            }
          })
          .catch((err) => {
            return res.status(200).json({
              status: "error",
              data: { message: "Error Response", err },
            });
          });
      } catch (err) {
        return res
          .status(200)
          .json({ status: "error", data: "Error Response" });
      }
    }
  },
];

exports.getUserId = (req, res) => {
  const userId = req.params.userId;
  SignUpSchema.findOne({
    where: { userId: userId },
  })
    .then((data) => {
      return res.status(200).json({ msg: "success", result: data });
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
    });
};

exports.signupFindSubUserList = (req, res) => {
  const userId = req.params.userId;
  SignUpSchema.findAll({
    where: { subUserId: userId },
  })
    .then((data) => {
      return res.status(200).json({ msg: "success", result: data });
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
    });
};
//login
exports.postLogin = (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  SignUpSchema.findOne({
    where: { userName: userName },
  })
    .then((user) => {
      if (!user || user.finalStatus === "Approved") {
        return res
          .status(200)
          .json({ status: "error", data: { message: "invalid user" } });
      } else {
        bcrypt.compare(password, user.password).then(async (doMatch) => {
          if (doMatch) {
            // Create token
            const token = jwt.sign(
              { user_id: user._id },
              process.env.TOKEN_KEY,
              {
                expiresIn: "1h",
              }
            );
            // User IP logs
            try {
              const userLogData = new UserLogSchema({
                userId: user.id,
                userIp:
                  req.headers["x-real-ip"] ||
                  req.headers["x-forwarded-for"] ||
                  req.connection.remoteAddress,
              });

              await userLogData.save();
              console.info("User IP recorded!");
            } catch (error) {
              console.error("Couldn't record IP:", error);
              // Return an error response if IP logging fails
              return res.status(200).json({
                status: "error",
                data: { message: "Error recording IP" },
              });
            }
            // save user token
            user.token = token;
            return res.status(200).json({
              status: "success",
              token,
              result: {
                _id: user.id,
                companyName: user.companyName,
                emailId: user.emailId,
                verifiedUser: user.verifiedUser,
                userId: user.userId,
                userName: user.userName,
                role: user.role,
                Ticket_ID: user.Ticket_ID,
                Country_Region_Code: user.Country_Region_Code,
                subUserId: user.subUserId,
                phoneNumber:user.phoneNumber,
                contactPerson: user.contactPerson,
              },
            });
          } else {
            return res.status(200).json({
              status: "error",
              data: { message: "Incorrect password" },
            });
          }
        });
      }
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
    });
};
//ResetPassword-confirmationCode
exports.resetPasswordByCode = (req, res, next) => {
  const userName = req.body.userName;
  SignUpSchema.findOne({
    where: {
      userName: userName,
    },
  })
    .then(async (user) => {
      const mailConfirmationCode = Math.floor(100000 + Math.random() * 900000);
      if (!user) {
        return res.status(200).json({ status: "error", data: "invalid user" });
      } else {
        console.log("user.emailId", user.emailId);
        var subject = `confirmation mail for Reset Password`;
        var emailContent = `<h1>Reset password</h1>
    <h2>Hello ${user.contactPerson}</h2>
    <p>please click the below link to Reset your password.</p>
    <a href=${process.env.HOST}:3000/passwordGeneration/${user.emailId}/${mailConfirmationCode}/${userName}> Click here</a>
    </div>`;
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.subject = `${subject}`;
        sendSmtpEmail.htmlContent = `${emailContent}`;
        sendSmtpEmail.sender = {
          name: config.name,
          email: config.email,
        };
        sendSmtpEmail.to = [{ email: `${user.emailId}` }];
        apiInstance.sendTransacEmail(sendSmtpEmail).then(
          function (data) {
            console.log("mail sent successfully: " + JSON.stringify(data));
          },
          function (error) {
            console.error(error);
          }
        );
        await SignUpSchema.update(
          { mailConfirmationCode: mailConfirmationCode },
          { where: { id: user.id } }
        ).then((code) => {
          console.log("send password Code", code);
          return res.status(200).json({
            status: "success",
            data: "check your email,to reset your password",
          });
        });
      }
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
    });
};
//ResetPassword
exports.resetPassword = (req, res, next) => {
  const emailId = req.body.emailId;
  const mailConfirmationCode = req.body.mailConfirmationCode;
  const confirmPassword = req.body.confirmPassword;
  const password = req.body.password;
  const userName = req.body.userName;
  SignUpSchema.findOne({
    where: {
      emailId: emailId,
      mailConfirmationCode: mailConfirmationCode,
    },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(200).json({ status: "error", data: "invalid user" });
      } else {
        await SignUpSchema.findAll({
          where: {
            username: userName,
          },
        })
          .then((data) => {
            bcrypt.hash(password, 12).then(async (hashedPassword) => {
              await SignUpSchema.update(
                {
                  password: hashedPassword,
                  confirmPassword: hashedPassword,
                },
                { where: { id: user.id } }
              ).then((code) => {
                return res.status(200).json({
                  status: "success",
                  data: "password reset successfully",
                });
              });
            });
          })
          .catch((err) => {
            return res.status(500).json({
              status: "error",
              data: { message: "Error Response", err },
            });
          });
      }
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
    });
};
exports.resetUsernameAndPassword = (req, res, next) => {
  const emailId = req.body.emailId;
  const mailConfirmationCode = req.body.mailConfirmationCode;
  const confirmPassword = req.body.confirmPassword;
  const password = req.body.password;
  const userName = req.body.userName;

  SignUpSchema.findOne({
    where: {
      emailId: emailId,
      mailConfirmationCode: mailConfirmationCode,
    },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(200).json({ status: "error", data: "invalid user" });
      } else {
        bcrypt.hash(password, 12).then(async (hashedPassword) => {
          await SignUpSchema.update(
            {
              password: hashedPassword,
              confirmPassword: hashedPassword,
              userName:userName,
            },
            { where: { id: user.id } }
          ).then((code) => {
            return res.status(200).json({
              status: "success",
              data: "password reset successfully",
            });
          });
        });
      }
    })
    .catch((err) => {
      return res.status(200).json({
        status: "error",
        data: { message: "Error Response", err },
      });
    });
};
exports.signout = (req, res) => {
  res.clearCookie("t");
  return res.status("200").json({
    message: "signed out",
  });
};
//getCountry
exports.getCountry = (req, res, next) => {
  var country = getData();
  return res.status(200).json({ status: "success", data: country });
};
//getState&cityByzipcode
exports.getStateAndcityByzipcode = (req, res, next) => {
  var code = req.body.code;
  var zipCode = req.body.zipCode;
  const result = geoCountryZipCode.lookup(code, zipCode);
  return res.status(200).json({ status: "success", data: result });
};

//send email
// var nodemailer = require("nodemailer");
// const config = require("../config/auth.config");
// const user = config.user;
// const pass = config.pass;

// var transporter = nodemailer.createTransport({
//   service: "gmail",
//   // host: "smtp.office365.com",
//   // service: "Outlook365",
//   auth: {
//     user: user,
//     pass: pass,
//   },
// });

exports.emailNotification = async (
  req,
  res,
  subject,
  emailContent,
  returnFlag,
  emailId
) => {
  sendSmtpEmail.subject = `${subject}`;
  sendSmtpEmail.htmlContent = `${emailContent}`;
  sendSmtpEmail.sender = {
    name: config.name,
    email: config.email,
  };
  sendSmtpEmail.to = [{ email: `${emailId}` }];
  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log("mail sent successfully: " + JSON.stringify(data));
    },
    function (error) {
      console.error(error);
    }
  );
};

function smsintegration(req, res, phoneNoConfirmationCode, phoneNumber) {
  const accountSid = "AC7dd6eea117c28296a64945c0d5e69d22";
  const authToken = "4a6876e0cd44abce7d4e7a17cdf5abc6";
  const client = require("twilio")(accountSid, authToken);
  client.messages
    .create({
      body: `please verify your account ${phoneNoConfirmationCode}`,
      from: "+14055544570",
      to: phoneNumber,
    })
    .then((message) => console.log(message.sid))
    .done();
}

//signUpApi
// exports.saveUser = (req, res) => {
//   var pass = "";
//   var str =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";

//   for (let i = 1; i <= 8; i++) {
//     var char = Math.floor(Math.random() * str.length + 1);

//     pass += str.charAt(char);
//   }

//   SignUpSchema.findOne({
//     where: { emailId: req.body.emailId, phoneNumber: req.body.phoneNumber },
//   })
//     .then((user) => {
//       if (user) {
//         return res
//           .status(200)
//           .json({ status: "success", message: "User already exist" });
//       } else {
//         const companyName = req.body.companyName;
//         const phoneNumber = req.body.phoneNumber;
//         const contactPerson = req.body.contactPerson;
//         const emailId = req.body.emailId;
//         const verifiedUser = "Pending";
//         const userId =
//           `${contactPerson}` + Math.floor(100000 + Math.random() * 900000);
//         const vendorId = "vendor" + Math.floor(100000 + Math.random() * 900000);
//         const mailConfirmationCode = Math.floor(
//           100000 + Math.random() * 900000
//         );
//         const phoneNoConfirmationCode = Math.floor(
//           100000 + Math.random() * 900000
//         );
//         const userName =
//           contactPerson + Math.floor(100000 + Math.random() * 900000);
//         const role = "user";
//         const password = pass;
//         bcrypt.hash(password, 12).then((hashedPassword) => {
//           const user = new SignUpSchema({
//             companyName: companyName,
//             phoneNumber: phoneNumber,
//             contactPerson: contactPerson,
//             emailId: emailId,
//             mailConfirmationCode: mailConfirmationCode,
//             phoneNoConfirmationCode: phoneNoConfirmationCode,
//             verifiedUser: verifiedUser,
//             vendorId: vendorId,
//             userId: userId,
//             userName: userName,
//             password: hashedPassword,
//             confirmPassword: hashedPassword,
//             role: role,
//           });
//           user
//             .save()
//             .then(async(result) => {
//               var subject = `confirmation mail for userName and password`;
//               var emailContent = `<h1>Email Confirmation</h1>
//                       <h2>Hello ${contactPerson}</h2>
//                       <p>Your Username is ${userName} and password is ${password} , To change your username and password, visit the link below.</p>
//                       <a href=http://localhost:3000/passwordGeneration/${result.emailId}/${result.mailConfirmationCode}> Click here</a>
//                       </div>`;
//               var returnFlag = false;
//               try {
//                 await exports.emailNotification(req,
//                   res,
//                   subject,
//                   emailContent,
//                   returnFlag,
//                   result.emailId);
//                   return res
//                   .status(200)
//                   .json({
//                     status: "success",
//                     message: "Registered Successfully",
//                     result,
//                   });
//               } catch (error) {
//                 console.error(error);
//                 return res.status(500).json({ error: 'Server error' });
//               }

//             })
//             .catch((err) => {
//               return res
//                 .status(200)
//                 .json({
//                   status: "error",
//                   data: { message: "Error Response", err },
//                 });
//             });
//         });
//       }
//     })
//     .catch((err) => {
//       return res
//         .status(200)
//         .json({ status: "error", data: { message: "Error Response", err } });
//     });
// };

exports.saveUser = (req, res) => {
  var pass = "";
  var str =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";

  for (let i = 1; i <= 8; i++) {
    var char = Math.floor(Math.random() * str.length + 1);

    pass += str.charAt(char);
  }

  SignUpSchema.findOne({
    where: { emailId: req.body.emailId },
  }).then((user) => {
    if (user) {
      return res
        .status(200)
        .json({ status: "success", message: "User Email already exist" });
    } else {
      SignUpSchema.findOne({
        where: { phoneNumber: req.body.phoneNumber },
      }).then((user2) => {
        if (user2) {
          return res.status(200).json({
            status: "success",
            message: "User Phone Number already exist",
          });
        } else {
          const companyName = req.body.companyName;
          const phoneNumber = req.body.phoneNumber;
          const contactPerson = req.body.contactPerson;
          const emailId = req.body.emailId;
          const verifiedUser = "Pending";
          const userId =
            contactPerson.replace(/\s/g, "") +
            Math.floor(100000 + Math.random() * 900000);
          const vendorId =
            "vendor" + Math.floor(100000 + Math.random() * 900000);
          const mailConfirmationCode = Math.floor(
            100000 + Math.random() * 900000
          );
          const phoneNoConfirmationCode = Math.floor(
            100000 + Math.random() * 900000
          );
          const userName =
            contactPerson.replace(/\s/g, "") +
            Math.floor(100000 + Math.random() * 900000);
          const role = "user";
          const password = pass;
          console.log("password::", pass);
          const Ticket_ID = "VCR" + Math.floor(100000 + Math.random() * 900000);
          bcrypt.hash(password, 12).then((hashedPassword) => {
            const user = new SignUpSchema({
              companyName: companyName,
              phoneNumber: phoneNumber,
              contactPerson: contactPerson,
              emailId: emailId,
              mailConfirmationCode: mailConfirmationCode,
              phoneNoConfirmationCode: phoneNoConfirmationCode,
              verifiedUser: verifiedUser,
              vendorId: vendorId,
              userId: userId,
              userName: userName,
              password: hashedPassword,
              confirmPassword: hashedPassword,
              role: role,
              Ticket_ID: Ticket_ID,
            });
            user
              .save()
              .then(async (result) => {
                console.log("result", result, config.name, config.email);
                var subject = `confirmation mail for userName and password`;
                var emailContent = `
                <h1>Email Confirmation</h1>
                <h2>Hello ${companyName},</h2>
                <h3>Verify Your Email</h3>
                <p>Please <b>click</b> the button below to <b>VERIFY</b> your email address:</p>
                <br/>
                <a style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; font-weight: bold; border-radius: 5px;" href="${process.env.HOST}:${process.env.PORT}/verifyUSerByMail/${result.emailId}/${mailConfirmationCode}">Verify Email</a>
                
                <br/>
                <p style="color: red;">EMAIL verification is mandatory*</p>
                
                <br/>
                <h3>Your Username and Password is</h3>
                <p style="font-size: 18px; margin-bottom: 10px;">Username: <b>${userName}</b><br>Password: <b>${password}</b></p>
              
                <h3>Change Username and Password</h3>
                <p>If you need to <b>create a new username and password.</b>, you can do so by clicking the button below:</p>
                <br/>
                <a style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; font-weight: bold; border-radius: 5px;" href="${process.env.HOST}:3000/passwordGeneration/${result.emailId}/${result.mailConfirmationCode}/${result.userName}/New">Change Username and Password</a>
              `;
                try {
                  sendSmtpEmail.subject = `${subject}`;
                  sendSmtpEmail.htmlContent = `${emailContent}`;
                  sendSmtpEmail.sender = {
                    name: config.name,
                    email: config.email,
                  };
                  sendSmtpEmail.to = [{ email: `${result.emailId}` }];
                  apiInstance.sendTransacEmail(sendSmtpEmail).then(
                    function (data) {
                      console.log(
                        "mail sent successfully: " + JSON.stringify(data)
                      );
                    },
                    function (error) {
                      console.error(error);
                    }
                  );
                  return res.status(200).json({
                    status: "success",
                    message: "Registered Successfully",
                    result,
                  });
                } catch (error) {
                  console.log("error::", error);
                  return res.status(500).json({ error: "Server error" });
                }
              })
              .catch((err) => {
                return res.status(500).json({ error: "Server error" });
              });
          });
        }
      });
    }
  }).catch((err) => {
    return res
      .status(200)
      .json({ status: "error", data: { message: "Error Response", err } });
  });
};
exports.saveMasterLogin = async (req, res) => {
  var pass = "";
  var str =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";

  for (let i = 1; i <= 8; i++) {
    var char = Math.floor(Math.random() * str.length + 1);

    pass += str.charAt(char);
  }
  const companyName = req.body.companyName;
  const mastervendor_email = req.body.mastervendor_email;
  const verifiedUser = "Pending";
  const userId = "Master" + Math.floor(100000 + Math.random() * 900000);
  const mailConfirmationCode = Math.floor(100000 + Math.random() * 900000);
  const userName = "Master" + Math.floor(100000 + Math.random() * 900000);
  const role = "Admin";
  const Country_Region_Code = req.body.Country_Region_Code;
  const password = pass;
  const Ticket_ID = req.body.Ticket_ID;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const [user, created] = await SignUpSchema.upsert(
      {
        companyName: companyName,
        emailId: mastervendor_email,
        mailConfirmationCode: mailConfirmationCode,
        verifiedUser: verifiedUser,
        userId: userId,
        userName: userName,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        role: role,
        Ticket_ID: Ticket_ID,
        Country_Region_Code: Country_Region_Code,
      },
      { returning: true }
    );

    if (!created) {
      return res
        .status(200)
        .json({ status: "success", message: "User already exist" });
    }

    var subject = `confirmation email for master login userName and password`;
    var emailContent = `<h1>Email Confirmation</h1>
    <h2>Hello ${companyName}</h2>

    <h3>Verify Your Email</h3>
    <p>Please click the button below to verify your email address:</p>
    <br/>
    <a style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; font-weight: bold; border-radius: 5px;" href="${process.env.HOST}:${process.env.PORT}/verifyUSerByMail/${mastervendor_email}/${mailConfirmationCode}">Verify Email</a>
    <br/>
    <h3>Your Username and Password is</h3>
                <p style="font-size: 18px; margin-bottom: 10px;">Username: <b>${userName}</b><br>Password: <b>${password}</b></p>
               </div>`;

    sendSmtpEmail.subject = `${subject}`;
    sendSmtpEmail.htmlContent = `${emailContent}`;
    sendSmtpEmail.sender = {
      name: config.name,
      email: config.email,
    };
    sendSmtpEmail.to = [{ email: `${user.emailId}` }];

    apiInstance.sendTransacEmail(sendSmtpEmail).then(
      function (data) {
        console.log("mail sent successfully: " + JSON.stringify(data));
        return res.status(200).json({
          status: "success",
          message: "Master Registered Successfully",
          result: user,
        });
      },
      function (error) {
        console.error(error);

        // Retry sending the email
        apiInstance.sendTransacEmail(sendSmtpEmail).then(
          function (data) {
            console.log("mail sent successfully: " + JSON.stringify(data));
            return res.status(200).json({
              status: "success",
              message: "Master Registered Successfully",
              result: user,
            });
          },
          function (error) {
            console.error(error);
            return res.status(500).json({ error: "Failed to send email" });
          }
        );
      }
    );
  } catch (error) {
    console.log("error::", error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.verifyUserByMail = (req, res) => {
  const link = `${process.env.HOST}:3000/login`;
  const { mastervendor_email, mailConfirmationCode } = req.params;
  SignUpSchema.findOne({
    where: {
      emailId: mastervendor_email,
      mailConfirmationCode: mailConfirmationCode,
    },
  }).then((user) => {
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Invalid email or confirmation code",
      });
    }
    SignUpSchema.update(
      { verifiedUser: "approved" },
      { where: { emailId: mastervendor_email } }
    )
      .then((result) => {
        return res.status(200).header("Content-Type", "text/html").send(`
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              font-size:20px;
            }
    
            .message {
              max-width: 80%;
              text-align: center;
              margin: 20px;
            }
    
            .success {
              font-weight: bold;            
            }
    
            a {
              color: blue;
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="message">
            <p>Your email has been <span class="success">successfully verified.</span></p>
            <p>Thank you for confirming your email address.</p>
            <p>Please <a href="${link}">click here</a> to continue.</p>
          </div>
        </body>
      </html>
    `);
      })
      .catch((error) => {
        return res.status(500).json({
          status: "error",
          message: "Unable to update verified user",
        });
      });
  }).catch((err) => {
    return res
      .status(200)
      .json({ status: "error", data: { message: "Error Response", err } });
  });
};

// 2 Factor Authentication
exports.twoFactorOTP = (req, res, next) => {
  const userName = req.body.userName;
  SignUpSchema.findOne({
    where: {
      userName: userName,
    },
  })
    .then(async (user) => {
      const Otp2Factor = Math.floor(100000 + Math.random() * 900000);
      const subuserName = userName.replace(/\d/g, "");
      if (!user) {
        return res.status(200).json({ status: "error", data: "invalid user" });
      } else {
        console.log("user.emailId", user.emailId);
        var subject = `2FA OTP for your login!`;
        var emailContent =
        `<h1>OTP</h1>
        <h2>Hello ${((user.contactPerson !== "" && user.contactPerson !== null) || (user.companyName !== "" && user.companyName !== null)) ? (user.contactPerson || user.companyName) : subuserName}</h2>
        <p style="font-size: 16px;">Please Use the OTP below to Login:</p>` +
        Otp2Factor +
        `
    </div>`;
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.subject = `${subject}`;
        sendSmtpEmail.htmlContent = `${emailContent}`;
        sendSmtpEmail.sender = {
          name: config.name,
          email: config.email,
        };
        sendSmtpEmail.to = [{ email: `${user.emailId}` }];
        apiInstance.sendTransacEmail(sendSmtpEmail).then(
          function (data) {
            console.log("mail sent successfully: " + JSON.stringify(data));
          },
          function (error) {
            console.error(error);
          }
        );
        await SignUpSchema.update(
          { twoFactorOTP: Otp2Factor },
          { where: { id: user.id } }
        ).then((code) => {
          console.log("send password Code", code);
          return res.status(200).json({
            status: "success",
            data: "check your email,to reset your password",
          });
        });
      }
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
    });
};

exports.twoFactorOTPValidation = (req, res, next) => {
  const userName = req.body.userName;
  const otp = req.body.otp;
  console.log("XXXXXX" + " " + userName + " "+ otp);
  SignUpSchema.findOne({
    where: {
      userName: userName,
    },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(200).json({ status: "error", data: "invalid user" });
      } else {
        if (user.twoFactorOTP == otp) {
          return res
            .status(200)
            .json({
              status: "success",
              data: "OTP verified, login successful!",
            });
        } else {
          return res
            .status(200)
            .json({ status: "error", data: "Invalid OTP" });
        }
      }
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
    });
};

exports.updateMasterLogin = async (req, res) => {
  console.log("updateMasterLogin::", req.body);
  const mailConfirmationCode = Math.floor(100000 + Math.random() * 900000);
  const companyName=req.body.companyName;
  const userName = "Master" + Math.floor(100000 + Math.random() * 900000);
  var pass = "";
  var str =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";

  for (let i = 1; i <= 8; i++) {
    var char = Math.floor(Math.random() * str.length + 1);

    pass += str.charAt(char);
  }
  const password = pass;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const users = await SignUpSchema.findAll({ 
      where: {
        Ticket_ID: req.body.Ticket_ID,
        role: 'Admin'
      }
    });
    console.log("users::",users);
    if (users.length > 0) {
      console.log("Users already exist:",users);
      
      const user = users[0]; 
      
      if (user.emailId === req.body.mastervendor_email) {
        console.log("same user:");
        return res.status(200).json({
          status: "success",
          message: "same user",
          result:user.emailId,
          updateResult:req.body.mastervendor_email
        });
      } else {
        console.log("Different user-update masteremailid and send password via mail::");
        SignUpSchema.update(
          { emailId: req.body.mastervendor_email,
            userName:userName,
            verifiedUser:"Pending",
            mailConfirmationCode:mailConfirmationCode,
            password: hashedPassword },
          { where: {
            Ticket_ID: req.body.Ticket_ID,
            role: 'Admin',
          } }
        )
          .then((result) => {
            var subject = `confirmation email for master login userName and password`;
            var emailContent = `<h1>Email Confirmation</h1>
            <h2>Hello ${companyName}</h2>
            <br/>
            <h3>Verify Your Email</h3>
            <p>Please click the button below to verify your email address:</p>
            <br/>
            <a style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; font-weight: bold; border-radius: 5px;" href="${process.env.HOST}:${process.env.PORT}/verifyUSerByMail/${mastervendor_email}/${mailConfirmationCode}">Verify Email</a>
            <br/>
            <h3>Your Username and Password is</h3>
            <p style="font-size: 18px; margin-bottom: 10px;">Username: <b>${userName}</b><br>Password: <b>${password}</b></p>
                       </div>`;
        
            sendSmtpEmail.subject = `${subject}`;
            sendSmtpEmail.htmlContent = `${emailContent}`;
            sendSmtpEmail.sender = {
              name: config.name,
              email: config.email,
            };
            sendSmtpEmail.to = [{ email: `${req.body.mastervendor_email}` }];
        
            apiInstance.sendTransacEmail(sendSmtpEmail).then(
              function (data) {
                console.log("mail sent successfully: " + JSON.stringify(data));
                return res.status(200).json({
                  status: "success",
                  message: "mastervendor_email Updated successfully and mail sent",
                });
              },
              function (error) {
                console.error(error);
        
                // Retry sending the email
                apiInstance.sendTransacEmail(sendSmtpEmail).then(
                  function (data) {
                    console.log("mail sent successfully: " + JSON.stringify(data));
                    return res.status(200).json({
                      status: "success",
                      message: "mastervendor_email Updated successfully",
                    });
                  },
                  function (error) {
                    console.error(error);
                    return res.status(500).json({ error: "Failed to send email" });
                  }
                );
              }
            );
          
          }).catch((err) => {
            return res
              .status(200)
              .json({ status: "error", data: { message: "Error Response", err } });
          });
     
      }
    } else {
      console.log("No users found for the given Ticket_ID and role.");
      exports.saveMasterLogin(req, res);
    }
  } catch (error) {
    console.error("Error occurred while fetching/updating users:", error);
    return res.status(200).json({
      status: "error",
      message: "Error while updating master",
      result: error,
    });
  }
};
const VdetailSchema = db.vdetail;
const { Op } = require('sequelize');

exports.ReviewNewRegisteredVendorByMaster = (req, res) => {
  const userId = req.params.userId;

  SignUpSchema.findAll({
    where: { userType: userId },
  })
    .then((userData) => {
      const userIds = userData.map((user) => user.userId);

      VdetailSchema.findAll({
        where: {
          submitStatus: {
            [Op.or]: ['Submitted', 'rejected', 'approved'],
          },
          userId: userIds,
        },
      })
        .then((submittedData) => {
          const matchedUserData = userData.filter((user) =>
            submittedData.some((submittedUser) => submittedUser.userId === user.userId)
          );

          return res
            .status(200)
            .json({ msg: 'success', result: matchedUserData });
        })
        .catch((err) => {
          return res.status(200).json({
            status: 'error',
            data: { message: 'Error Response', err },
          });
        });
    })
    .catch((err) => {
      return res.status(200).json({
        status: 'error',
        data: { message: 'Error Response', err },
      });
    });
};

// exports.ReviewNewRegisteredVendorByMaster = (req, res) => {
//   const userId = req.params.userId;
//   SignUpSchema.findAll({
//     where: { userType: userId },
//   })
//     .then((data) => {
//       return res.status(200).json({ msg: "success", result: data });
//     })
//     .catch((err) => {
//       return res
//         .status(200)
//         .json({ status: "error", data: { message: "Error Response", err } });
//     });
// };