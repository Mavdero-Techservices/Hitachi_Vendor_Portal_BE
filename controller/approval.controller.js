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
apiKey.apiKey = config.apiKey;
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
      console.log("level1rejectFileDocsaved::")
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
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = `${subject}`;
  sendSmtpEmail.htmlContent = `${emailContent}`;
  sendSmtpEmail.sender = {
    name: config.name,
    email:config.email,
  };
  sendSmtpEmail.to = [{ email: `${emailId}` }];
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
    console.log('mail sent successfully: ' + JSON.stringify(data));
  }, function (error) {
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
  if (level1rejectFileDoc) {
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
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    const attachment = new SibApiV3Sdk.SendSmtpEmailAttachment();
    attachment.name = "attachment." + format[1];
    attachment.content = fs.readFileSync(level1rejectFileDoc).toString('base64');
    sendSmtpEmail.subject = `${subject}`;
    sendSmtpEmail.htmlContent = `${emailContent}`;
    sendSmtpEmail.sender = {
      name: config.name,
      email:config.email,
    };
    sendSmtpEmail.to = [{ email: `${emailId}` }];
    sendSmtpEmail.attachment = [attachment];
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
      console.log('mail sent successfully: ' + JSON.stringify(data));
    }, function (error) {
      console.error(error);
    });
  } else {
    sendSmtpEmail.subject = `${subject}`;
    sendSmtpEmail.htmlContent = `${emailContent}`;
    sendSmtpEmail.sender = {
      name: config.name,
      email:config.email,
    };
    sendSmtpEmail.to = [{ email: `${emailId}` }];
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
      console.log('mail sent successfully: ' + JSON.stringify(data));
    }, function (error) {
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
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = `${subject}`;
  sendSmtpEmail.htmlContent = `${emailContent}`;
  sendSmtpEmail.sender = {
    name: config.name,
    email:config.email,
  };
  sendSmtpEmail.to = [{ email: `${emailId}` }];
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
    console.log('mail sent successfully: ' + JSON.stringify(data));
  }, function (error) {
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
  level2rejectFileDoc
) => {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  if (level2rejectFileDoc) {
    console.log("levell2rejectDoc::");
    const format = level2rejectFileDoc.split(".");
    const attachment = new SibApiV3Sdk.SendSmtpEmailAttachment();
    attachment.name = "attachment." + format[1];
    attachment.content = fs.readFileSync(level2rejectFileDoc).toString('base64');
    sendSmtpEmail.subject = `${subject}`;
    sendSmtpEmail.htmlContent = `${emailContent}`;
    sendSmtpEmail.sender = {
      name: config.name,
      email:config.email,
    };
    sendSmtpEmail.to = [{ email: `${emailId}` }];
    sendSmtpEmail.attachment = [attachment];
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
      console.log('mail sent successfully: ' + JSON.stringify(data));
    }, function (error) {
      console.error(error);
    });
  }
 else
 {
  sendSmtpEmail.subject = `${subject}`;
  sendSmtpEmail.htmlContent = `${emailContent}`;
  sendSmtpEmail.sender = {
    name: config.name,
    email:config.email,
  };
  sendSmtpEmail.to = [{ email: `${emailId}` }];
  // sendSmtpEmail.attachment = [attachment];
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
    console.log('mail sent successfully: ' + JSON.stringify(data));
  }, function (error) {
    console.error(error);
  });
 }
};

exports.emailMRTApprovalNotification = (
  req,
  res,
  subject,
  emailContent,
  returnFlag,
  emailId
) => {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = `${subject}`;
  sendSmtpEmail.htmlContent = `${emailContent}`;
  sendSmtpEmail.sender = {
    name: config.name,
    email:config.email,
  };
  sendSmtpEmail.to = [{ email: `${emailId}` }];
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
    console.log('mail sent successfully: ' + JSON.stringify(data));
  }, function (error) {
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
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  if (level3rejectFileDoc) {
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
    sendSmtpEmail.sender = {
      name: config.name,
      email:config.email,
    };
    sendSmtpEmail.to = [{ email: `${emailId}` }];
    sendSmtpEmail.attachment = [attachment];
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
      console.log('mail sent successfully: ' + JSON.stringify(data));
    }, function (error) {
      console.error(error);
    });
  } else {
    sendSmtpEmail.subject = `${subject}`;
    sendSmtpEmail.htmlContent = `${emailContent}`;
    sendSmtpEmail.sender = {
      name: config.name,
      email:config.email,
    };
    sendSmtpEmail.to = [{ email: `${emailId}` }];
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
      console.log('mail sent successfully: ' + JSON.stringify(data));
    }, function (error) {
      console.error(error);
    });
  }
};

exports.saveApprovalStatus = (req, res) => {
  rejectFile1DocPath = "";
  rejectFile2DocPath = "";
  rejectFile3DocPath = "";
console.log("filelevel2req::",req.body);
  var upload = multer({ storage: storage }).fields([
    { name: "level1rejectFileDoc", maxCount: 1 },
    { name: "level2rejectFileDoc", maxCount: 1 },
    { name: "level3rejectFileDoc", maxCount: 1 },
  ]);
  upload(req, res, async function (err) {
    var approvalValidate = await ApprovalSchema.findOne({
      where: { userId: req.body.userId },
    });
    if (approvalValidate) {

      // if (rejectFile1DocPath){
      //   fs.unlink(rejectFile1DocPath, (err) => {
      //     if (err) {
      //       throw err;
      //     }
      //   });
      // }
      if (approvalValidate.level1Status === "approved") {
        return res
          .status(200)
          .json({ status: "error", message: "Already Approved" });
      }
      if (approvalValidate.level1Status === "rejected") {
        return res
          .status(200)
          .json({ status: "error", message: " Already rejected" });
      }
    } else {

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
        if (req.body.level1Status === 'rejected') {
          req.body.submitStatus = "rejected"
          const vdetail = await VdetailSchema.update(req.body, {
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
          userStatus: basicData.userStatus,
        });
        user
          .save()
          .then((data) => {
            if (data.level1Status === "approved") {
              var subject = `Hitachi Vendor Approval for Ticket ID ${userEmailId.Ticket_ID}`;
              // var emailContent = `
              //           <h4>Hi ${data.companyName}</h4>
              //           <p>Your Vendor Registration request is approved by Vendor Creation Team and proceeded for next stage of Approval.</p>
              //           <p>Thanks & regards,</p>
              //           </div>`;
              var emailContent = `
<h4>Hi ${data.companyName}</h4>
                        <p>Your Vendor Registration request is approved by Vendor Creation Team and proceeded for next stage of Approval.</p>
                        <p>Please find below the approval status:</p>
                        </div>
                                  <div class="table-box">
                                  <table style="border-collapse: collapse; width: 100%;">
                                      <tr>
                                          <th>Department</th>
                                          <th>Status</th>
                                      </tr>
                                      <tr>
                                          <td>VCT</td>
                                          <td>Approved</td>
                                      </tr>
                                      <tr>
                                          <td>Japan</td>
                                          <td>Pending</td>
                                      </tr>
                                      <tr>
                                          <td>MRT</td>
                                          <td>Pending</td>
                                      </tr>
                                  </table>  
                                  </div>    
                                  <p>Please <a href=${process.env.HOST}:3000/login><b>Click</b></a> here to login</p>
                                  <p>Thanks & regards,</p>
                                  </div>`;
                                  var emailStyles = `
  <style>
    .table-box {
      border: 1px solid #ccc;
      margin: 10px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
  </style>
`;

emailContent = emailStyles + emailContent;
              var returnFlag = false;
              exports.emailApprovalNotification(
                req,
                res,
                subject,
                emailContent,
                returnFlag,
                emailId
              );
              var NotificationSubject = `Vendor approval request pending for Ticket ID ${userEmailId.Ticket_ID}.`;
              var NotificationemailContent = `
                                  <h4>Hi Japan team,</h4>
                                  <p>You have a request pending for approval from  ${data.companyName}.As the VCT team approved the Workflow.</p> 
                                  <p>Please find below the approval status:</p>
                                  <div class="table-box">
                                  <table style="border-collapse: collapse; width: 100%;">
                                      <tr>
                                          <th>Department</th>
                                          <th>Status</th>
                                      </tr>
                                      <tr>
                                          <td>VCT</td>
                                          <td>approved</td>
                                      </tr>
                                      <tr>
                                          <td>Japan</td>
                                          <td>Pending</td>
                                      </tr>
                                      <tr>
                                          <td>MRT</td>
                                          <td>Pending</td>
                                      </tr>
                                  </table>  
                                  </div>    
                                  <p>Please <a href=${process.env.HOST}:3000/login><b>Click</b></a> here to initiate the approval process</p>
                                  <p>Thanks & regards,</p>
                                  </div>`;
                                  var NotificationemailStyles = `
  <style>
    .table-box {
      border: 1px solid #ccc;
      margin: 10px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
  </style>
`;

NotificationemailContent = NotificationemailStyles + NotificationemailContent;

                                  var GroupemailId=config.JapanTeamEmail
              exports.NotificationEmail(
                req,
                res,
                NotificationSubject,
                NotificationemailContent,
                returnFlag,
                GroupemailId
              )
            } else {
              var subject = `Hitachi Vendor Request Rejected`;
              // var emailContent = `
              //           <h4>Hi ${data.companyName}</h4>
              //           <p>Your Vendor Registration request is Rejected by Vendor Creation Team because of, ${data.level1RejectComment}</p>
              //           </div>`;
              var emailContent = `<h4>Hi ${data.companyName}</h4>
                        <p>Your Vendor Registration request is Rejected by Vendor Creation Team because of, ${data.level1RejectComment}</p>
                        <p>Please find below the approval status:</p>
                        </div>
                                  <div class="table-box">
                                  <table style="border-collapse: collapse; width: 100%;">
                                      <tr>
                                          <th>Department</th>
                                          <th>Status</th>
                                      </tr>
                                      <tr>
                                          <td>VCT</td>
                                          <td>Rejected</td>
                                      </tr>
                                      <tr>
                                          <td>Japan</td>
                                          <td>N/A</td>
                                      </tr>
                                      <tr>
                                          <td>MRT</td>
                                          <td>N/A</td>
                                      </tr>
                                  </table>  
                                  </div>    
                                  <p>Please <a href=${process.env.HOST}:3000/login><b>Click</b></a> here to login</p>
                                  <p>Thanks & regards,</p>
                                  </div>`;
                                  var emailStyles = `
  <style>
    .table-box {
      border: 1px solid #ccc;
      margin: 10px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
  </style>
`;

emailContent = emailStyles + emailContent;
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
  console.log("level2updatereq::",req.body);
  var approvalValidate = await ApprovalSchema.findOne({
    where: { userId: req.params.userId },
  });
  let rejectFile1DocPath = "";
  let rejectFile2DocPath = "";
  let rejectFile3DocPath = "";

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
    if (err) {
      // Handle upload errors
      console.log('Error occurred during file upload:', err);
      return res.status(200).json({ error: 'Error occurred during file upload' });
    }

    if (req.body.level2Status) {
      if (approvalValidate.level2Status === "approved") {
        return res
          .status(200)
          .json({ status: "error", message: "Already Approved Japan" });
      }
      else if (approvalValidate.level2Status === "rejected") {
        return res
          .status(200)
          .json({ status: "error", message: " Already rejected by Japan" });
      } else {
        NewData();
      }
    }

    if (req.body.level3Status) {
      if (approvalValidate.level3Status === "approved") {
        return res
          .status(200)
          .json({ status: "error", message: "Already Approved by MRT" });
      }
      else if (approvalValidate.level3Status === "rejected") {
        return res
          .status(200)
          .json({ status: "error", message: " Already rejected by MRT" });
      } else {
        NewData();
      }
    }
  });

  async function NewData() {
    try {
      var userEmailId = await SignUpSchema.findOne({
        where: { userId: req.body.userId },
      });

      var masterVendoremail = await vendorCommunicationDetailsSchema.findOne({
        where: { userId: req.body.userId },
      });
console.log("req.body.level1rejectFileDoc",req.body)
if (req.files && req.files.level2rejectFileDoc) {
  rejectFile2DocPath = req.files?.level2rejectFileDoc[0].path;
}
if (req.files && req.files.level3rejectFileDoc) {
  rejectFile3DocPath = req.files.level3rejectFileDoc[0].path;
}
      const level1rejectFileDoc = rejectFile1DocPath;
      const level2rejectFileDoc = rejectFile2DocPath;
      const level3rejectFileDoc = rejectFile3DocPath;
      req.body.level1rejectFileDoc = level1rejectFileDoc;
      req.body.level2rejectFileDoc = level2rejectFileDoc;
      req.body.level3rejectFileDoc = level3rejectFileDoc;
      const emailId = userEmailId.emailId;
      const mVendoremailId = masterVendoremail.mastervendor_email;
      const name = masterVendoremail.financeSpoccontactName;

      if ((req.body.level2Status === "approved") || req.body.level3Status === "approved") {
        req.body.finalStatus = "Approved";
        await SignUpSchema.update(req.body, {
          where: { userId: userId },
        });
      }
      if (req.body.level3Status === 'rejected') {
        req.body.submitStatus = "rejected";
        await VdetailSchema.update(req.body, {
          where: { userId: userId }
        });
      }
      await ApprovalSchema.update(req.body, {
        where: { userId: userId },
      });

      if (req.body.level2Status === "approved") {
        var subject = `Hitachi Japan Team Approval`;
        // var emailContent = `
        //     <h4>Hi ${approvalValidate.companyName}</h4>
        //     <p>You successfully onboarded as vendor of <b>Hitachi Systems India.</b></p>
        //     <p>Thanks & regards,</p>
        //     </div>`;
        var emailContent = `<h4>Hi ${approvalValidate.companyName}</h4>
            <p>You successfully onboarded as vendor of <b>Hitachi Systems India.</b></p>
            <p>Please find below the approval status:</p>
            </div>
                                  <div class="table-box">
                                  <table style="border-collapse: collapse; width: 100%;">
                                      <tr>
                                          <th>Department</th>
                                          <th>Status</th>
                                      </tr>
                                      <tr>
                                          <td>VCT</td>
                                          <td>Approved</td>
                                      </tr>
                                      <tr>
                                          <td>Japan</td>
                                          <td>Approved</td>
                                      </tr>
                                      <tr>
                                          <td>MRT</td>
                                          <td>N/A</td>
                                      </tr>
                                  </table>  
                                  </div>    
                                  <p>Please <a href=${process.env.HOST}:3000/login><b>Click</b></a> here to login</p>
                                  <p>Thanks & regards,</p>
                                  </div>`;
                                  var emailStyles = `
  <style>
    .table-box {
      border: 1px solid #ccc;
      margin: 10px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
  </style>
`;

emailContent = emailStyles + emailContent;
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
        console.log("rejectdoclevel2:::",level2rejectFileDoc);
        var subject = `Hitachi Japan Team Request Rejected for Ticket ID ${userEmailId.Ticket_ID}`;
        var emailContent = `<h4>Hi ${approvalValidate.companyName}</h4>
        <p>Your Vendor Registration request is Rejected by Japan Team because of,${req.body.level2RejectComment} and the workflow is moved to Master Right Team for further processing.</p>
        <p>Please find below the approval status:</p>
        </div>
                        <div class="table-box">
                        <table style="border-collapse: collapse; width: 100%;">
                            <tr>
                                <th>Department</th>
                                <th>Status</th>
                            </tr>
                            <tr>
                                <td>VCT</td>
                                <td>Approved</td>
                            </tr>
                            <tr>
                                <td>Japan</td>
                                <td>Rejected</td>
                            </tr>
                            <tr>
                                <td>MRT</td>
                                <td>Pending</td>
                            </tr>
                        </table>  
                        </div>    
                        <p>Please <a href=${process.env.HOST}:3000/login><b>Click</b></a> here to login</p>
                        <p>Thanks & regards,</p>
                        </div>`;
                        var emailStyles = `
<style>
.table-box {
border: 1px solid #ccc;
margin: 10px 0;
}
table {
width: 100%;
border-collapse: collapse;
}
th, td {
border: 1px solid #ccc;
padding: 8px;
text-align: left;
}
th {
background-color: #f2f2f2;
}
</style>
`;

emailContent = emailStyles + emailContent;
        var returnFlag = false;
         exports.emailJapanRejectNotification(
          req,
          res,
          subject,
          emailContent,
          returnFlag,
          emailId,
          level2rejectFileDoc
        );
        var NotificationSubject = `Vendor approval request pending for Ticket ID ${userEmailId.Ticket_ID}.`;
        var NotificationemailContent = `
                            <h4>Hi MRT team,</h4>
                            <p>You have a request pending for approval from ${approvalValidate.companyName}.As the Japan rejected the request because of,${req.body.level2RejectComment}.</p> 
                            <p>Please find below the approval status:</p>
                            <div class="table-box">
                            <table style="border-collapse: collapse; width: 100%;">
                                <tr>
                                    <th>Department</th>
                                    <th>Status</th>
                                </tr>
                                <tr>
                                    <td>VCT</td>
                                    <td>approved</td>
                                </tr>
                                <tr>
                                    <td>Japan</td>
                                    <td>Rejected</td>
                                </tr>
                                <tr>
                                    <td>MRT</td>
                                    <td>Pending</td>
                                </tr>
                            </table> 
                            </div>     
                            <p>Please <a href=${process.env.HOST}:3000/login><b>Click</b></a> here to initiate the approval process</p>
                            <p>Thanks & regards,</p>
                            </div>`;
                            var NotificationemailStyles = `
  <style>
    .table-box {
      border: 1px solid #ccc;
      margin: 10px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
  </style>
`;

NotificationemailContent = NotificationemailStyles + NotificationemailContent;

                            var GroupemailId= config.MrtTeamEmail;
                            await exports.NotificationEmail(
          req,
          res,
          NotificationSubject,
          NotificationemailContent,
          returnFlag,
          GroupemailId
        )
      }
      if (req.body.level3Status === "approved") {
        const status=req.body.level3Status;
        var japanmailId=config.JapanTeamEmail;
        console.log("sendmailTojapan::");
        var mrtStatusMailToJapanSubject = `MRT team Status for Ticket Id ${userEmailId.Ticket_ID}`;
        // var mrtStatusMailToJapanemailContent = `
        //                                         <h4>Hi Japan team,</h4>
        //                                         <p>Vendor <b> ${approvalValidate.companyName} </b> request is <b> ${status} </b> by MRT Team</p>
        //                                         <p>please click the below link to login and see the status.</p>
        //                                         <a href=${process.env.HOST}:3000/login> Click here</a>
        //                                         <p>Thanks & regards,</p>
        //                                         </div>`;
        var mrtStatusMailToJapanemailContent = `<h4>Hi Japan team</h4>
                                                <p>Vendor ${approvalValidate.companyName} request is ${status} by MRT Team</p>
<p>Please find below the approval status:</p>
                  </div>
                                  <div class="table-box">
                                  <table style="border-collapse: collapse; width: 100%;">
                                      <tr>
                                          <th>Department</th>
                                          <th>Status</th>
                                      </tr>
                                      <tr>
                                          <td>VCT</td>
                                          <td>Approved</td>
                                      </tr>
                                      <tr>
                                          <td>Japan</td>
                                          <td>Rejected</td>
                                      </tr>
                                      <tr>
                                          <td>MRT</td>
                                          <td>${status}</td>
                                      </tr>
                                  </table>  
                                  </div>    
                                  <p>Please <a href=${process.env.HOST}:3000/login><b>Click</b></a> here to login</p>
                                  <p>Thanks & regards,</p>
                                  </div>`;
                                  var emailStyles = `
  <style>
    .table-box {
      border: 1px solid #ccc;
      margin: 10px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
  </style>
`;

mrtStatusMailToJapanemailContent = emailStyles + mrtStatusMailToJapanemailContent;
        exports.mrtStatusMailToJapan(
    req,
    res,
    status,
    mrtStatusMailToJapanSubject,
    mrtStatusMailToJapanemailContent,
    japanmailId,
  );
        var subject = `Hitachi MRT Team Approval`;
        // var emailContent = `
        //     <h4>Hi ${approvalValidate.companyName}</h4>
        //     <p>Your Vendor Registration request is approved by MRT Team, and you are successfully onboarded as Vendor of<b> Hitachi Systems India</b>.</p>
        //     <p>Thanks & regards,</p>
        //     </div>`;
        var emailContent = `  <h4>Hi ${approvalValidate.companyName}</h4>
            <p>Your Vendor Registration request is approved by MRT Team, and you are successfully onboarded as Vendor of<b> Hitachi Systems India</b>.</p>
            <p>Please find below the approval status:</p>
            </div>
                                  <div class="table-box">
                                  <table style="border-collapse: collapse; width: 100%;">
                                      <tr>
                                          <th>Department</th>
                                          <th>Status</th>
                                      </tr>
                                      <tr>
                                          <td>VCT</td>
                                          <td>Approved</td>
                                      </tr>
                                      <tr>
                                          <td>Japan</td>
                                          <td>Rejected</td>
                                      </tr>
                                      <tr>
                                          <td>MRT</td>
                                          <td>Approved</td>
                                      </tr>
                                  </table>  
                                  </div>    
                                  <p>Please <a href=${process.env.HOST}:3000/login><b>Click</b></a> here to login</p>
                                  <p>Thanks & regards,</p>
                                  </div>`;
                                  var emailStyles = `
  <style>
    .table-box {
      border: 1px solid #ccc;
      margin: 10px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
  </style>
`;

emailContent = emailStyles + emailContent;
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
        const status=req.body.level3Status;
        var japanmailId=config.JapanTeamEmail;
        console.log("sendmailTojapan::");
        var mrtStatusMailToJapanSubject = `MRT team Status for Ticket Id ${userEmailId.Ticket_ID}`;
        // var mrtStatusMailToJapanemailContent = `
        //                                         <h4>Hi Japan team</h4>
        //                                         <p>Vendor ${approvalValidate.companyName} request is ${status} by MRT Team</p>
        //                                         <p>Thanks & regards,</p>
        //                                         </div>`;
        var mrtStatusMailToJapanemailContent = `<h4>Hi Japan team</h4>
                                                <p>Vendor ${approvalValidate.companyName} request is ${status} by MRT Team</p>
<p>Please find below the approval status:</p>
                  </div>
                                  <div class="table-box">
                                  <table style="border-collapse: collapse; width: 100%;">
                                      <tr>
                                          <th>Department</th>
                                          <th>Status</th>
                                      </tr>
                                      <tr>
                                          <td>VCT</td>
                                          <td>Approved</td>
                                      </tr>
                                      <tr>
                                          <td>Japan</td>
                                          <td>Rejected</td>
                                      </tr>
                                      <tr>
                                          <td>MRT</td>
                                          <td>${status}</td>
                                      </tr>
                                  </table>  
                                  </div>    
                                  <p>Please <a href=${process.env.HOST}:3000/login><b>Click</b></a> here to login</p>
                                  <p>Thanks & regards,</p>
                                  </div>`;
                                  var emailStyles = `
  <style>
    .table-box {
      border: 1px solid #ccc;
      margin: 10px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
  </style>
`;

mrtStatusMailToJapanemailContent = emailStyles + mrtStatusMailToJapanemailContent;
        exports.mrtStatusMailToJapan(
    req,
    res,
    status,
    mrtStatusMailToJapanSubject,
    mrtStatusMailToJapanemailContent,
    japanmailId,
  );
        var subject = `Hitachi MRT Request Rejected`;
        // var emailContent = `
        //           <h2>Hi ${approvalValidate.companyName}</h2>
        //           <p>Your Vendor Registration request is Rejected by MRT Team because of,${req.body.level3RejectComment}</p>
        //           </div>`;
        var emailContent = `<h2>Hi ${approvalValidate.companyName}</h2>
                  <p>Your Vendor Registration request is Rejected by MRT Team because of,${req.body.level3RejectComment}</p>
                  <p>Please find below the approval status:</p>
                  </div>
                                  <div class="table-box">
                                  <table style="border-collapse: collapse; width: 100%;">
                                      <tr>
                                          <th>Department</th>
                                          <th>Status</th>
                                      </tr>
                                      <tr>
                                          <td>VCT</td>
                                          <td>Approved</td>
                                      </tr>
                                      <tr>
                                          <td>Japan</td>
                                          <td>Rejected</td>
                                      </tr>
                                      <tr>
                                          <td>MRT</td>
                                          <td>Rejected</td>
                                      </tr>
                                  </table>  
                                  </div>    
                                  <p>Please <a href=${process.env.HOST}:3000/login><b>Click</b></a> here to login</p>
                                  <p>Thanks & regards,</p>
                                  </div>`;
                                  var emailStyles = `
  <style>
    .table-box {
      border: 1px solid #ccc;
      margin: 10px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
  </style>
`;

emailContent = emailStyles + emailContent;
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

      return res.status(200).send({
        message: "ApprovalStatus was updated successfully!",
        status: "success",
      });
    } catch (err) {
      console.log('Error updating approval status:', err);
      return res.status(200).send({
        message: "Some error occurred while updating the ApprovalStatus schema.",
      });
    }
  }
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

exports.NotificationEmail= async (
  req,
  res,
  NotificationSubject,
  NotificationemailContent,
  returnFlag,
  GroupemailId,
) => {
  console.log("NotificationemailContent",NotificationemailContent);
  try {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = `${NotificationSubject}`;
    sendSmtpEmail.htmlContent = `${NotificationemailContent}`;
    sendSmtpEmail.sender = {
      name: config.name,
      email:config.email,
    };
    sendSmtpEmail.to = [{ email: `${GroupemailId}` }];
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
      console.log('Group mail sent successfully: ' + JSON.stringify(data));
    }, function (error) {
      console.error('Group mail Error: ',error);
    });
  } catch (error) {
    console.error('Group mail Error: ',error);
    return res.status(200).json({ status: "error", data: error });
  }
};

exports.mrtStatusMailToJapan= async (
  req,
  res,
  status,
  mrtStatusMailToJapanSubject,
  mrtStatusMailToJapanemailContent,
  japanmailId,
) => {
  console.log("mrtStatusMailToJapanemailContent");
  try {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = `${mrtStatusMailToJapanSubject}`;
    sendSmtpEmail.htmlContent = `${mrtStatusMailToJapanemailContent}`;
    sendSmtpEmail.sender = {
      name: config.name,
      email:config.email,
    };
    sendSmtpEmail.to = [{ email: `${japanmailId}` }];
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
      console.log('japan notification mail sent : ' + JSON.stringify(data));
    }, function (error) {
      console.error('Group mail Error: ',error);
    });
  } catch (error) {
    console.error('japan notification mail Error: ',error);
    return res.status(200).json({ status: "error", data: error });
  }
};