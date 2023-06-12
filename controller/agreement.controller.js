const db = require("../model");
const AgreementSchema = db.agreement;
let directory_name = "uploads";
const path = require("path");
var multer = require("multer");
var agreementDocPath = "";
const fs = require("fs");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(directory_name, "/"));
  },
  filename: (req, file, cb) => {
    let randomNumber = Math.floor(100000 + Math.random() * 900000);

    let filedirect = file.originalname.split(".");

    agreementDocPath =
      directory_name +
      "/" +
      filedirect[0] +
      "_" +
      randomNumber +
      "." +
      filedirect[1];

    cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
  },
});

exports.saveAgreementDoc = (req, res) => {
  var upload = multer({ storage: storage }).fields([
    { name: "agreementDoc", maxCount: 1 },
  ]);
  upload(req, res, function (err) {
    console.log("req----->", req.files);
    console.log("req----->", req.body);

    if (err) {
      console.log("InsideErr", err);
      return "err";
    } else {
      AgreementSchema.findOne({
        where: {
          userId: req.body.userId,
        },
      }).then(async (user) => {
        if (!user) {
          const agreementDoc = agreementDocPath;
          const userId = req.body.userId;
          const user = new AgreementSchema({
            userId: userId,
            agreementDoc: agreementDoc,
          });
          user
            .save()
            .then((data) => {
              return res.status(200).json({
                message: "Agreement Detail was created successfully!",
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
        } else {
          var aDetails = await AgreementSchema.findOne({
            where: { userId: req.body.userId },
          });

          if (err) {
            console.log("InsideErr", err);
            return "err";
          } else {
            if (req.files.agreementDoc) {
              let agreementDoc = agreementDocPath;

              if (aDetails.agreementDoc === req.body.agreementDoc) {
                agreementDoc = req.body.agreementDoc;
              } else {
                agreementDoc = agreementDocPath;
                directoryDelete = aDetails.agreementDoc;

                if (directoryDelete) {
                  fs.unlink(directoryDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }

              req.body.agreementDoc = agreementDoc;
              AgreementSchema.update(req.body, {
                where: {
                  userId: req.body.userId,
                },
              })
                .then(() => {
                  res.status(200).send({
                    message: "Agreement Detail was updated successfully!",
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
              let agreementDoc = agreementDocPath;

              if (aDetails.agreementDoc === req.body.agreementDoc) {
                agreementDoc = req.body.agreementDoc;
              } else {
                agreementDoc = agreementDocPath;
                directoryDelete = aDetails.agreementDoc;
                if (directoryDelete) {
                  fs.unlink(directoryDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }

              req.body.agreementDoc = agreementDoc;
              AgreementSchema.update(req.body, {
                where: {
                  userId: req.body.userId,
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
            }
          }
        }
      });
    }
  });
};

exports.getAgreementDocList = (req, res, next) => {
    AgreementSchema.findAll()
      .then((data) => {
        return res.status(200).json({ msg: "success", result: data });
      })
      .catch((err) => {
        return res
          .status(200)
          .json({ status: "error", data: { message: "Error Response", err } });
      });
  };
