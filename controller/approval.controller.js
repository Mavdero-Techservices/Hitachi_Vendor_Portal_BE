const db = require("../model");
const ApprovalSchema = db.approvalStatus;
const vendorCommunicationDetailsSchema = db.vendorCommunicationDetails;
const VdetailSchema = db.vdetail;
const SignUpSchema = db.singUp;
const { check, validationResult } = require("express-validator");
let directory_name = "uploads";
const path = require("path");
var multer = require("multer");
var rejectFile1DocPath = "";
var rejectFile2DocPath = "";
var rejectFile3DocPath = "";
const bcrypt = require('bcrypt');
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
const fs = require('fs');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey =config.apiKey;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(directory_name, "/"));
  },
  filename: (req, file, cb) => {
    var filetype = "";

    if (file.fieldname === "level1rejectFileDoc") {
      if (file.mimetype === "image/gif") {
        filetype = "gif";
        rejectFile1DocPath =
          directory_name +
          "/" +
          "level1rejectFileDoc-" +
          Date.now() +
          "." +
          filetype;
      }
      if (file.mimetype === "image/png") {
        filetype = "png";
        rejectFile1DocPath =
          directory_name +
          "/" +
          "level1rejectFileDoc-" +
          Date.now() +
          "." +
          filetype;
      }
      if (file.mimetype === "image/jpeg") {
        filetype = "jpg";
        rejectFile1DocPath =
          directory_name +
          "/" +
          "level1rejectFileDoc-" +
          Date.now() +
          "." +
          filetype;
      }
      if (file.mimetype === "application/pdf") {
        filetype = "pdf";
        rejectFile1DocPath =
          directory_name +
          "/" +
          "level1rejectFileDoc-" +
          Date.now() +
          "." +
          filetype;
      }
      cb(null, "level1rejectFileDoc-" + Date.now() + "." + filetype);
    }
    if (file.fieldname === "level2rejectFileDoc") {
      if (file.mimetype === "image/gif") {
        filetype = "gif";
        rejectFile2DocPath =
          directory_name +
          "/" +
          "level2rejectFileDoc-" +
          Date.now() +
          "." +
          filetype;
      }
      if (file.mimetype === "image/png") {
        filetype = "png";
        rejectFile2DocPath =
          directory_name +
          "/" +
          "level2rejectFileDoc-" +
          Date.now() +
          "." +
          filetype;
      }
      if (file.mimetype === "image/jpeg") {
        filetype = "jpg";
        rejectFile2DocPath =
          directory_name +
          "/" +
          "level2rejectFileDoc-" +
          Date.now() +
          "." +
          filetype;
      }
      if (file.mimetype === "application/pdf") {
        filetype = "pdf";
        rejectFile2DocPath =
          directory_name +
          "/" +
          "level2rejectFileDoc-" +
          Date.now() +
          "." +
          filetype;
      }
      cb(null, "level2rejectFileDoc-" + Date.now() + "." + filetype);
    }
    if (file.fieldname === "level3rejectFileDoc") {
      if (file.mimetype === "image/gif") {
        filetype = "gif";
        rejectFile3DocPath =
          directory_name +
          "/" +
          "level3rejectFileDoc-" +
          Date.now() +
          "." +
          filetype;
      }
      if (file.mimetype === "image/png") {
        filetype = "png";
        rejectFile3DocPath =
          directory_name +
          "/" +
          "level3rejectFileDoc-" +
          Date.now() +
          "." +
          filetype;
      }
      if (file.mimetype === "image/jpeg") {
        filetype = "jpg";
        rejectFile3DocPath =
          directory_name +
          "/" +
          "level3rejectFileDoc-" +
          Date.now() +
          "." +
          filetype;
      }
      if (file.mimetype === "application/pdf") {
        filetype = "pdf";
        rejectFile3DocPath =
          directory_name +
          "/" +
          "level3rejectFileDoc-" +
          Date.now() +
          "." +
          filetype;
      }
      cb(null, "level3rejectFileDoc-" + Date.now() + "." + filetype);
    }
  },
});

// var nodemailer = require("nodemailer");
// const config = require("../config/auth.config");
// const user = config.user;
// const pass = config.pass;

// var transporter = nodemailer.createTransport({
//   service: "gmail",
//   // service: 'Outlook365',
//   auth: {
//     user: user,
//     pass: pass,
//   },
// });

exports.emailApprovalNotification = (
  req,
  res,
  subject,
  emailContent,
  returnFlag,
  emailId
) => {
  sendSmtpEmail.subject = `${subject}`;
  sendSmtpEmail.htmlContent = `${emailContent}`;
  sendSmtpEmail.sender = { name: 'Sender Name', email: 'sender@example.com' };
  sendSmtpEmail.to = [{ email: `${emailId}` }];
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
    console.log('mail sent successfully: ' + JSON.stringify(data));
  }, function(error) {
    console.error(error);
  });
};

exports.emailRejectNotification = (
  req,
  res,
  subject,
  emailContent,
  returnFlag,
  emailId,
  level1rejectFileDoc
) => {
  if (level1rejectFileDoc){
  const format = level1rejectFileDoc.split(".");

  // var mailOptions = {
  //   from: user,
  //   to: `${emailId}`,
  //   subject: subject,
  //   html: emailContent,
  //   attachments: [
  //     {
  //       // utf-8 string as an attachment
  //       filename: "attachment." + format[1],
  //       path: level1rejectFileDoc,
  //     },
  //   ],
  // };
  const attachment = new SibApiV3Sdk.SendSmtpEmailAttachment();
  attachment.name = "attachment." + format[1];
  attachment.content = fs.readFileSync(level1rejectFileDoc).toString('base64');
  sendSmtpEmail.subject = `${subject}`;
  sendSmtpEmail.htmlContent = `${emailContent}`;
  sendSmtpEmail.sender = { name: 'Sender Name', email: 'sender@example.com' };
  sendSmtpEmail.to = [{ email: `${emailId}` }];
  sendSmtpEmail.attachment = [attachment];
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
    console.log('mail sent successfully: ' + JSON.stringify(data));
  }, function(error) {
    console.error(error);
  });
}else{
  sendSmtpEmail.subject = `${subject}`;
  sendSmtpEmail.htmlContent = `${emailContent}`;
  sendSmtpEmail.sender = { name: 'Sender Name', email: 'sender@example.com' };
  sendSmtpEmail.to = [{ email: `${emailId}` }];
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
    console.log('mail sent successfully: ' + JSON.stringify(data));
  }, function(error) {
    console.error(error);
  });
}
};

exports.emailJapanApprovalNotification = (
  req,
  res,
  subject,
  emailContent,
  returnFlag,
  emailId
) => {
  // var mailOptions = {
  //   from: user,
  //   to: `${emailId}`,
  //   subject: subject,
  //   html: emailContent,
  // };
  sendSmtpEmail.subject = `${subject}`;
  sendSmtpEmail.htmlContent = `${emailContent}`;
  sendSmtpEmail.sender = { name: 'Sender Name', email: 'sender@example.com' };
  sendSmtpEmail.to = [{ email: `${emailId}` }];
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
    console.log('mail sent successfully: ' + JSON.stringify(data));
  }, function(error) {
    console.error(error);
  });
};

exports.emailJapanRejectNotification = (
  req,
  res,
  subject,
  emailContent,
  returnFlag,
  emailId,
) => {
  // const format = level2rejectFileDoc.split(".");

  // var mailOptions = {
  //   from: user,
  //   to: `${mVendoremailId}`,
  //   subject: subject,
  //   html: emailContent,
  //   attachments: [
  //     {
  //       // utf-8 string as an attachment
  //       filename: "attachment." + format[1],
  //       path: level2rejectFileDoc,
  //     },
  //   ],
  // };

  // const attachment = new SibApiV3Sdk.SendSmtpEmailAttachment();
  // attachment.name = "attachment." + format[1];
  // attachment.content = fs.readFileSync(level2rejectFileDoc).toString('base64');
  sendSmtpEmail.subject = `${subject}`;
  sendSmtpEmail.htmlContent = `${emailContent}`;
  sendSmtpEmail.sender = { name: 'Sender Name', email: 'sender@example.com' };
  sendSmtpEmail.to = [{ email: `${emailId}` }];
  // sendSmtpEmail.attachment = [attachment];
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
    console.log('mail sent successfully: ' + JSON.stringify(data));
  }, function(error) {
    console.error(error);
  });
};

exports.emailMRTApprovalNotification = (
  req,
  res,
  subject,
  emailContent,
  returnFlag,
  emailId
) => {
  sendSmtpEmail.subject = `${subject}`;
  sendSmtpEmail.htmlContent = `${emailContent}`;
  sendSmtpEmail.sender = { name: 'Sender Name', email: 'sender@example.com' };
  sendSmtpEmail.to = [{ email: `${emailId}` }];
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
    console.log('mail sent successfully: ' + JSON.stringify(data));
  }, function(error) {
    console.error(error);
  });
};

exports.emailMRTRejectNotification = (
  req,
  res,
  subject,
  emailContent,
  returnFlag,
  emailId,
  level3rejectFileDoc
) => {
  if (level3rejectFileDoc){
  const format = level3rejectFileDoc.split(".");
  // var mailOptions = {
  //   from: user,
  //   to: `${emailId}`,
  //   subject: subject,
  //   html: emailContent,
  //   attachments: [
  //     {
  //       // utf-8 string as an attachment
  //       filename: "attachment." + format[1],
  //       path: level3rejectFileDoc,
  //     },
  //   ],
  // };
  const attachment = new SibApiV3Sdk.SendSmtpEmailAttachment();
  attachment.name = "attachment." + format[1];
  attachment.content = fs.readFileSync(level3rejectFileDoc).toString('base64');
  sendSmtpEmail.subject = `${subject}`;
  sendSmtpEmail.htmlContent = `${emailContent}`;
  sendSmtpEmail.sender = { name: 'Sender Name', email: 'sender@example.com' };
  sendSmtpEmail.to = [{ email: `${emailId}` }];
  sendSmtpEmail.attachment = [attachment];
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
    console.log('mail sent successfully: ' + JSON.stringify(data));
  }, function(error) {
    console.error(error);
  });
}else{
  sendSmtpEmail.subject = `${subject}`;
  sendSmtpEmail.htmlContent = `${emailContent}`;
  sendSmtpEmail.sender = { name: 'Sender Name', email: 'sender@example.com' };
  sendSmtpEmail.to = [{ email: `${emailId}` }];
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
    console.log('mail sent successfully: ' + JSON.stringify(data));
  }, function(error) {
    console.error(error);
  });
}
};

exports.saveApprovalStatus = (req, res) => {
  rejectFile1DocPath = "";
  rejectFile2DocPath = "";
  rejectFile3DocPath = "";

  var upload = multer({ storage: storage }).fields([
    { name: "level1rejectFileDoc", maxCount: 1 },
    { name: "level2rejectFileDoc", maxCount: 1 },
    { name: "level3rejectFileDoc", maxCount: 1 },
  ]);
  upload(req, res, async function (err) {
    var approvalValidate =await ApprovalSchema.findOne({
      where: { userId: req.body.userId },
    });
    if (approvalValidate ){

      // if (rejectFile1DocPath){
      //   fs.unlink(rejectFile1DocPath, (err) => {
      //     if (err) {
      //       throw err;
      //     }
      //   });
      // }
      if (approvalValidate.level1Status ==="approved"){
        return res
          .status(200)
          .json({ status: "error",  message: "Already Approved"  });
      }
      if (approvalValidate.level1Status === "rejected") {
        return res
          .status(200)
          .json({ status: "error",  message: " Already rejected"  });
      }
    }else{

    var userEmailId = await SignUpSchema.findOne({
      where: { userId: req.body.userId },
    });

      var basicData = await VdetailSchema.findOne({
        where: { userId: req.body.userId },
      });
    if (err) {
      return "err";
    } else {
      var file = req.files;
      // var path = Object.entries(file).map(([key, value]) => {
      //   Object.entries(value).map(([key2, value2]) => {
      //     if (value2.fieldname === "level1rejectFileDoc") {
      //       rejectFile1DocPath = value2.path;
      //     }
      //     if (value2.fieldname === "level2rejectFileDoc") {
      //       rejectFile2DocPath = value2.path;
      //     }
      //   });
      // });
      const level1rejectFileDoc = rejectFile1DocPath;
      const level2rejectFileDoc = rejectFile2DocPath;
      const level3rejectFileDoc = rejectFile3DocPath;
      const userId = req.body.userId;
      const emailId = userEmailId.emailId;
      if (req.body.level1Status==='rejected'){
        req.body.submitStatus ="rejected"
        const vdetail = await VdetailSchema.update(req.body,{
          where: { userId: userId }
        }) 
      }
      const user = new ApprovalSchema({
        userId: userId,
        companyName: userEmailId?.companyName,
        image: basicData?.image,
        level1Status: req.body.level1Status,
        level1RejectComment: req.body.level1RejectComment,
        level1rejectFileDoc: level1rejectFileDoc,
        level2Status: req.body.level2Status,
        level2RejectComment: req.body.level2RejectComment,
        level2rejectFileDoc: level2rejectFileDoc,
        level2Date: null,
        level3Status: req.body.level3Status,
        level3RejectComment: req.body.level3RejectComment,
        level3rejectFileDoc: level3rejectFileDoc,
        level3Date: null,
      });
      user
        .save()
        .then((data) => {
          if (data.level1Status === "approved") {
            var subject = `Hitachi Vendor Approval`;
            var emailContent = `
                        <h4>Hi ${data.userId}</h4>
                        <p>Your Vendor Registration request is approved by Vendor Creation Team and proceeded for next stage of Approval.</p>
                        <p>Thanks & regards,</p>
                        </div>`;
            var returnFlag = false;
            exports.emailApprovalNotification(
              req,
              res,
              subject,
              emailContent,
              returnFlag,
              emailId
            );
          } else {
            var subject = `Hitachi Vendor Request Rejected`;
            var emailContent = `
                        <h4>Hi ${data.userId}</h4>
                        <p>Your Vendor Registration request is Rejected by Vendor Creation Team because of, ${data.level1RejectComment}</p>
                        </div>`;
            var returnFlag = false;
            exports.emailRejectNotification(
              req,
              res,
              subject,
              emailContent,
              returnFlag,
              emailId,
              level1rejectFileDoc
            );
          }

          return res.status(200).json({
            status: "success",
            message: "Approval Detail Saved Successfully",
            data,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message:
              err.message ||
              "Some error occurred while creating the ApprovalDetail schema.",
          });
        });
    }
  }
  });
};

exports.updateApprovalStatus = async (req, res) => {
  var approvalValidate = await ApprovalSchema.findOne({
    where: { userId: req.params.userId },
  });
  rejectFile1DocPath = "";
  rejectFile2DocPath = "";
  rejectFile3DocPath = "";

  var userId = req.params.userId;
  var upload = multer({ storage: storage }).fields([
    {
      name: "level1rejectFileDoc",
      maxCount: 1,
    },
    {
      name: "level2rejectFileDoc",
      maxCount: 1,
    },
    {
      name: "level3rejectFileDoc",
      maxCount: 1,
    },
  ]);

  upload(req, res, async function (err) {
    if (req.body.level2Status){
      if (approvalValidate.level2Status === "approved") {

        // if (rejectFile2DocPath) {
        //   fs.unlink(rejectFile2DocPath, (err) => {
        //     if (err) {
        //       throw err;
        //     }
        //   });
        // }
        return res
          .status(200)
          .json({ status: "error", message: "Already Approved Japan" });
      }
      else if (approvalValidate.level2Status === "rejected") {

        // if (rejectFile2DocPath) {
        //   fs.unlink(rejectFile2DocPath, (err) => {
        //     if (err) {
        //       throw err;
        //     }
        //   });
        // }
        return res
          .status(200)
          .json({ status: "error", message: " Already rejected by Japan" });
      }else{
        NewData()
      }
    }

    if (req.body.level3Status) {

      if (approvalValidate.level3Status === "approved") {
        // if (rejectFile3DocPath) {
        //   fs.unlink(rejectFile3DocPath, (err) => {
        //     if (err) {
        //       throw err;
        //     }
        //   });
        // }
        return res
          .status(200)
          .json({ status: "error", message: "Already Approved by MRT" });
      }
      else if (approvalValidate.level3Status === "rejected") {

        // if (rejectFile3DocPath) {
        //   fs.unlink(rejectFile3DocPath, (err) => {
        //     if (err) {
        //       throw err;
        //     }
        //   });
        // }
        return res
          .status(200)
          .json({ status: "error", message: " Already rejected by MRT" });
      }else{
        NewData()
      }
    }

  async  function NewData (){
    var userEmailId = await SignUpSchema.findOne({
      where: { userId: req.body.userId },
    });

    var masterVendoremail = await vendorCommunicationDetailsSchema.findOne({
      where: { userId: req.body.userId },
    });


    if (err) {
      return "err";
    } else {
      const level1rejectFileDoc = rejectFile1DocPath;
      const level2rejectFileDoc = rejectFile2DocPath;
      const level3rejectFileDoc = rejectFile3DocPath;
      req.body.level1rejectFileDoc = level1rejectFileDoc;
      req.body.level2rejectFileDoc = level2rejectFileDoc;
      req.body.level3rejectFileDoc = level3rejectFileDoc;
      const emailId = userEmailId.emailId;
      const mVendoremailId = masterVendoremail.mastervendor_email;
      const name = masterVendoremail.financeSpoccontactName;
      console.log("emailIDReject::",userEmailId.emailId);
      console.log("masteremailApprove::",mVendoremailId);
      if ((req.body.level2Status === "approved")|| req.body.level3Status === "approved") {
        // let vendorCode = 'VDIS-' + Math.floor(1000 + Math.random() * 9000);
        req.body.finalStatus = "Approved";
        SignUpSchema.update(req.body, {
          where: { userId: userId },
        })
      }
      if (req.body.level3Status === 'rejected') {
        req.body.submitStatus = "rejected"
        const vdetail = await VdetailSchema.update(req.body, {
          where: { userId: userId }
        })
      }
      ApprovalSchema.update(req.body, {
        where: { userId: userId },
      })
        .then(() => {
          if (req.body.level2Status === "approved") {
            var subject = `Hitachi Japan Team Approval`;
            var emailContent = `
                  <h4>Hi ${userId}</h4>
                  <p>Your Vendor Registration request is approved by Japan Team and proceeded for next stage of Approval.</p>
                  <p>Thanks & regards,</p>
                  </div>`;
            var returnFlag = false;
            exports.emailJapanApprovalNotification(
              req,
              res,
              subject,
              emailContent,
              returnFlag,
              emailId
            );
          }
          if (req.body.level2Status === "rejected") {
            var subject = `Hitachi Japan Team Request Rejected`;
            var emailContent = `
                        <h4>Hi ${req.body.userId}</h4>
                        <p>Your Vendor Registration request is Rejected by Japan Team </p>
                        </div>`;
            var returnFlag = false;
            exports.emailJapanRejectNotification(
              req,
              res,
              subject,
              emailContent,
              returnFlag,
              emailId,
            );
          }
          if (req.body.level3Status === "approved") {
            var subject = `Hitachi MRT Team Approval`;
            var emailContent = `
                  <h4>Hi ${userId}</h4>
                  <p>Your Vendor Registration request is approved by MRT Team and proceeded for next stage of Approval.</p>
                  <p>Thanks & regards,</p>
                  </div>`;
            var returnFlag = false;
            exports.emailMRTApprovalNotification(
              req,
              res,
              subject,
              emailContent,
              returnFlag,
              emailId
            );
          }
          if (req.body.level3Status === "rejected") {
            var subject = `Hitachi MRT Request Rejected`;
            var emailContent = `
                        <h2>Hi ${req.body.userId}</h2>
                        <p>Your Vendor Registration request is Rejected by MRT Team because of, ${req.body.level3RejectComment}</p>
                        </div>`;
            var returnFlag = false;
            exports.emailMRTRejectNotification(
              req,
              res,
              subject,
              emailContent,
              returnFlag,
              emailId,
              level3rejectFileDoc
            );
          }
          res.status(200).send({
            message: "ApprovalStatus was updated successfully!",
            status: "success",
          });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while updating the ApprovalStatus schema.",
          });
        });
    }
  }
  });
};

exports.getApprovedStatus = (req, res, next) => {
  ApprovalSchema.findAll({ where: { level1Status: "approved" } })
    .then((data) => {
      return res.status(200).json({ msg: "success", result: data });
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
    });
};

exports.getRejectStatus = (req, res, next) => {
  ApprovalSchema.findAll({ where: { level1Status: "rejected" } })
    .then((data) => {
      return res.status(200).json({ msg: "success", result: data });
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
    });
};

exports.getApprovalList = (req, res, next) => {
  ApprovalSchema.findAll()
    .then((data) => {
      return res.status(200).json({ msg: "success", result: data });
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
    });
};
