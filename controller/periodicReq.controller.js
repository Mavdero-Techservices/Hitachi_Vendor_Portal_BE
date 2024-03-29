const db = require("../model");
const PeriodicReqSchema = db.periodicRequest;
const VendorIdSchema = db.vendorId;
let directory_name = "uploads";
const path = require("path");
var multer = require("multer");
var documentFileDocPath = "";
const fs = require("fs");
var Sequelize = require("sequelize");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(directory_name, "/"));
  },
  filename: (req, file, cb) => {
    var filetype = "";

    if (file.fieldname === "documentFileDoc") {
      let filedirect = file.originalname.split(".");

      documentFileDocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        new Date().toISOString().replace(/:/g, "-") +
        "." +
        filedirect[1];

      cb(
        null,
        filedirect[0] +
          "_" +
          new Date().toISOString().replace(/:/g, "-") +
          "." +
          filedirect[1]
      );
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

  for (let i = 0; i < req.body.length; i++) {
    let row = { ...req.body[i] };

    PeriodicReqSchema.update(row, {
      where: { userId: row.userId },
      validate: true,
      returning: true,
    });

    let rowID = row.id;
    let ForeingId = [];
    ForeingId = await VendorIdSchema.findAll({
      where: {
        periodic_id: rowID,
      },
    });


    for (let j = 0; j < row.vendorCode.length; j++) {


      if (ForeingId.length > 0) {
        ForeingId.map((item) => {
          item.destroy();
        })

        const user = await new VendorIdSchema({
          userId: row.userId,
          docName: row.documentFileDoc,
          periodic_id: row.id,
          vendorId: row.vendorCode[j].vendorCode,
        });
        user.save();
      } else {

        const user = await new VendorIdSchema({
          userId: row.userId,
          docName: row.documentFileDoc,
          periodic_id: row.id,
          vendorId: row.vendorCode[j].vendorCode,
        });
        user.save();
      }
    }
  }
  res.status(200).send({
    message: "PeriodicRequest Details was updated successfully!",
    status: "success",
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

exports.vendorIdList = (req, res, next) => {
  VendorIdSchema.findAll({ where: { vendorId: req.params.vendorId } })
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

exports.periodicReqdelete = (req, res) => {
  const id = req.params.id;

  PeriodicReqSchema.findOne({
    where: {
      id: id,
    },
    include: "vendorId",
  })
    .then((data) => {
      data.vendorId.map((item) => {
        item.destroy();
      });
      data.destroy();
      return res.status(200).json({ msg: "success", result: data });
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
    });
};
