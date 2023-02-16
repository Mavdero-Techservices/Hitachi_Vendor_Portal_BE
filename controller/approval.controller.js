const db = require("../model");
const ApprovalSchema = db.approvalStatus;
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
    if (file.fieldname === "rejectFile2DocPath") {
      if (file.mimetype === "image/gif") {
        filetype = "gif";
        rejectFile2DocPath =
          directory_name +
          "/" +
          "rejectFile2DocPath-" +
          Date.now() +
          "." +
          filetype;
      }
      if (file.mimetype === "image/png") {
        filetype = "png";
        rejectFile2DocPath =
          directory_name +
          "/" +
          "rejectFile2DocPath-" +
          Date.now() +
          "." +
          filetype;
      }
      if (file.mimetype === "image/jpeg") {
        filetype = "jpg";
        rejectFile2DocPath =
          "../uploads/" + "rejectFile2DocPath-" + Date.now() + "." + filetype;
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
      cb(null, "rejectFile2DocPath-" + Date.now() + "." + filetype);
    }
  },
});

exports.saveApprovalStatus = (req, res) => {

  rejectFile1DocPath = "";
  rejectFile2DocPath = "";

  var upload = multer({ storage: storage }).fields([
    { name: "level1rejectFileDoc", maxCount: 1 },
    { name: "level2rejectFileDoc", maxCount: 1 }
  ]);
  upload(req, res, function (err) {
    console.log("req", req.files);
    console.log("req", req.body);
    if (err) {
      console.log("InsideErr", err);
      return "err";
    } else {
      var file = req.files;
      var path = Object.entries(file).map(([key, value]) => {
        Object.entries(value).map(([key2, value2]) => {
          if (value2.fieldname === "level1rejectFileDoc") {
            rejectFile1DocPath = value2.path;
          }
          if (value2.fieldname === "level2rejectFileDoc") {
            rejectFile2DocPath = value2.path;
          }
        });
      });
      const level1rejectFileDoc = rejectFile1DocPath;
      const level2rejectFileDoc = rejectFile2DocPath;
      const userId = req.body.userId;
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
          return res.status(200).json({
            message: "ApprovalDetail was created successfully!",
            status: "success",
            data: data,
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
        where: { userId },
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
