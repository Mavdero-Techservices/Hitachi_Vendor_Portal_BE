const db = require("../model");
const PeriodicReqSchema = db.periodicRequest;
let directory_name = "uploads";
const path = require("path");
var multer = require("multer");
var documentFileDocPath = "";
const fs = require("fs");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(directory_name, "/"));
  },
  filename: (req, file, cb) => {
    var filetype = "";

    if (file.fieldname === "documentFileDoc") {
      if (file.mimetype === "image/gif") {
        filetype = "gif";
        documentFileDocPath =
          directory_name +
          "/" +
          "documentFileDoc-" +
          Date.now() +
          "." +
          filetype;
      }
      if (file.mimetype === "image/png") {
        filetype = "png";
        documentFileDocPath =
          directory_name +
          "/" +
          "documentFileDoc-" +
          Date.now() +
          "." +
          filetype;
      }
      if (file.mimetype === "image/jpeg") {
        filetype = "jpg";
        documentFileDocPath =
          directory_name +
          "/" +
          "documentFileDoc-" +
          Date.now() +
          "." +
          filetype;
      }
      if (file.mimetype === "application/pdf") {
        filetype = "pdf";
        documentFileDocPath =
          directory_name +
          "/" +
          "documentFileDoc-" +
          Date.now() +
          "." +
          filetype;
      }
      cb(null, "documentFileDoc-" + Date.now() + "." + filetype);
    }
  },
});

exports.savePeriodicRequest = (req, res) => {
  documentFileDocPath = "";

  var upload = multer({ storage: storage }).fields([
    { name: "documentFileDoc", maxCount: 1 },
  ]);
  upload(req, res, async function (err) {
    if (err) {
      console.log("InsideErr", err);
      return "err";
    } else {
      const documentFileDoc = documentFileDocPath;
      let vendor = req.body.vendorCode;
      const user = new PeriodicReqSchema({
        quaterly: req.body.quaterly,
        userId: req.body.userId,
        halfyearly: req.body.halfyearly,
        yearly: req.body.yearly,
        vendorCode: req.body.vendorCode,
        documentFileDoc: documentFileDoc,
      });
      user
        .save()
        .then((data) => {
          return res.status(200).json({
            message: "Periodic Request Table was created successfully!",
            status: "success",
            data: data,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message:
              err.message ||
              "Some error occurred while creating the Bankdetail schema.",
          });
        });
    }
  });
};

exports.updatePeriodicRequest = async (req, res) => {
  var userId = req.params.userId;

  documentFileDocPath = "";

  var pDetails = await PeriodicReqSchema.findOne({
    where: { userId: req.params.userId },
  });

  var upload = multer({ storage: storage }).fields([
    { name: "documentFileDoc", maxCount: 1 },
  ]);

  upload(req, res, async function (err) {
    if (req.files.documentFileDoc) {
      if (pDetails.documentFileDoc === req.files.documentFileDoc.path) {
        const documentFileDoc = documentFileDocPath;
        req.body.documentFileDoc = documentFileDoc;
        PeriodicReqSchema.update(req.body, {
          where: {
            userId: userId,
          },
        })
          .then(() => {
            res.status(200).send({
              message: "PeriodicRequest was updated successfully!",
              status: "success",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while updating the Bankdetail schema.",
            });
          });
      } else {
        const documentFileDoc = documentFileDocPath;
        req.body.documentFileDoc = documentFileDoc;
        PeriodicReqSchema.update(req.body, {
          where: {
            userId: userId,
          },
        })
          .then(() => {
            res.status(200).send({
              message: "Bankdetail was updated successfully!",
              status: "success",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while updating the Bankdetail schema.",
            });
          });
        directoryDelete = pDetails.documentFileDoc;
        if (directoryDelete) {
          fs.unlink(directoryDelete, (err) => {
            if (err) {
              throw err;
            }
          });
        }
      }
    } else {
      const documentFileDoc = documentFileDocPath;
      req.body.documentFileDoc = documentFileDoc;
      PeriodicReqSchema.update(req.body, {
        where: {
          userId: userId,
        },
      })
        .then(() => {
          res.status(200).send({
            message: "Bankdetail was updated successfully!",
            status: "success",
          });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while updating the Bankdetail schema.",
          });
        });

      directoryDelete = pDetails.documentFileDoc;
      if (directoryDelete) {
        fs.unlink(directoryDelete, (err) => {
          if (err) {
            throw err;
          }
        });
      } else {
      }
    }
  });
};

exports.periodicReqList = (req, res, next) => {
  PeriodicReqSchema.findAll()
    .then((data) => {
      return res.status(200).json({ msg: "success", result: data });
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
    });
};

exports.periodicReqdelete = (req, res) => {
  const userId = req.params.userId;

  PeriodicReqSchema
    .destroy({
      where: { userId: userId },
    })
    .then((data) => {
      return res
        .status(200)
        .json({ msg: "success", result: "deleted successfully" });
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
    });
};
