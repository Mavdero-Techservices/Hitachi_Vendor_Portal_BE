const db = require("../model");
const ApprovalSchema = db.approvalStatus;
const SignUpSchema = db.singUp;
const { check, validationResult } = require("express-validator");
let directory_name = "uploads";
const path = require("path");
var multer = require("multer");
const { log, Console } = require("console");
var rejectFile1DocPath = "";
var rejectFile2DocPath = "";

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
        directory_name + "/" + "level2rejectFileDoc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "application/pdf") {
        filetype = "pdf";
        rejectFile2DocPath =
          directory_name +
          "/" +
          "financial_data2-" +
          Date.now() +
          "." +
          filetype;
      }
      cb(null, "level2rejectFileDoc-" + Date.now() + "." + filetype);
    }
  },
});

var nodemailer = require("nodemailer");
const config = require("../config/auth.config");
const user = config.user;
const pass = config.pass;

var transporter = nodemailer.createTransport({
  service: "gmail",
  // service: 'Outlook365',
  auth: {
    user: user,
    pass: pass,
  },
});

exports.emailApprovalNotification = (
  req,
  res,
  subject,
  emailContent,
  returnFlag,
  emailId,
) => {

  var mailOptions = {
    from: user,
    to: `${emailId}`,
    subject: subject,
    html: emailContent,
  };

  console.log("mailOptions--->", mailOptions);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.status(200).json({ status: "error", data: error });
    } else {
      if (returnFlag === true) {
        return res
          .status(200)
          .json({ status: "error", data: "Error Response" });
      } else {
        return res
          .status(200)
          .json({ status: "success", data: "mail sent Successfully" });
      }
    }
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
  console.log("level1rejectFileDoc", level1rejectFileDoc);
  const format = level1rejectFileDoc.split('.')
  console.log("format",format[1])

  var mailOptions = {
    from: user,
    to: `${emailId}`,
    subject: subject,
    html: emailContent,
    attachments: [
      {   // utf-8 string as an attachment
          filename: 'attachment.' + format[1],
          path: level1rejectFileDoc
      }
   ]
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.status(200).json({ status: "error", data: error });
    } else {
      if (returnFlag === true) {
        return res
          .status(200)
          .json({ status: "error", data: "Error Response" });
      } else {
        return res
          .status(200)
          .json({ status: "success", data: "mail sent Successfully" });
      }
    }
  });
};

exports.saveApprovalStatus = (req, res) => {
  rejectFile1DocPath = "";
  rejectFile2DocPath = "";

  var upload = multer({ storage: storage }).fields([
    { name: "level1rejectFileDoc", maxCount: 1 },
    { name: "level2rejectFileDoc", maxCount: 1 },
  ]);
  upload(req, res, async function (err) {

    console.log("req", req.body);

    var userEmailId = await SignUpSchema.findOne({
      where: { userId: req.body.userId },
    });


    if (err) {
      console.log("InsideErr", err);
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
      const userId = req.body.userId;
      const emailId = userEmailId.emailId;

      const user = new ApprovalSchema({
        userId: userId,
        level1Status: req.body.level1Status,
        level1RejectComment: req.body.level1RejectComment,
        level1rejectFileDoc: level1rejectFileDoc,
        level2Status: req.body.level2Status,
        level2RejectComment: req.body.level2RejectComment,
        level2rejectFileDoc: level2rejectFileDoc,
      });
      user
        .save()
        .then((data) => {
          console.log("data", data);
          if (data.level1Status === "approved") {
            console.log("1111111111111");
            console.log("level1Status", data.level1Status);
            var subject = `Hitachi Vendor Approval`;
            var emailContent = `
                        <h1>Hi ${data.userId}</h1>
                        <h4>Your Vendor Registration request is approved by Vendor Creation Team and proceeded for next stage of Approval.</h4>
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
                        <h1>Hi ${data.userId}</h1>
                        <h4>Your Vendor Registration request is Rejected by Vendor Creation Team because of, ${data.level1RejectComment}</h4>
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
  });
};

exports.updateApprovalStatus = async (req, res) => {

  rejectFile1DocPath = "";
  rejectFile2DocPath = "";

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
  ]);

  upload(req, res, async function (err) {
    if (err) {
      console.log("InsideErr", err);
      return "err";
    } else {
      const level1rejectFileDoc = rejectFile1DocPath;
      const level2rejectFileDoc = rejectFile2DocPath;
      req.body.level1rejectFileDoc = level1rejectFileDoc;
      req.body.level2rejectFileDoc = level2rejectFileDoc;
      ApprovalSchema.update(req.body, {
        where: { userId: userId },
      })
        .then(() => {
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
      console.log("data", data);
      return res.status(200).json({ msg: "success", result: data });
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
    });
};