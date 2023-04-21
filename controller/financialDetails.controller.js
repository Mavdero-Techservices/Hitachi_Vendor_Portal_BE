const db = require("../model");
const FdetailSchema = db.fdetail;
const { check, validationResult } = require("express-validator");
const fs = require("fs");
// exports.postFdetail = [
//     //validate form
//     check("yearOfAuditedFinancial")
//         .not()
//         .isEmpty()
//         .isDate()
//         .withMessage("yearOfAuditedFinancial is required"),
//     check("Revenue")
//         .not()
//         .isEmpty()
//         .withMessage("Revenue is required"),
//     check("Profit")
//         .not()
//         .isEmpty()
//         .withMessage("Profit is required"),
//     check("netWorth")
//         .not()
//         .isEmpty()
//         .withMessage("netWorth is required"),
//     check("currentAssets")
//         .not()
//         .isEmpty()
//         .withMessage("currentAssets is required"),
//     check("directorDetails")
//         .not()
//         .isEmpty()
//         .withMessage("directorDetails is required"),
//     check("financial_data")
//         .not()
//         .isEmpty()
//         .withMessage("financial_data is required"),
//     check("financial_data2")
//         .not()
//         .isEmpty()
//         .withMessage("financial_data2 is required"),
//     async (req, res) => { // added the "async" keyword here
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(422).json({ errors: errors.array() });
//         }
//         try {
//             const data = await FdetailSchema.create({
//                 userid: req.body.userid,
//                 yearOfAuditedFinancial: req.body.yearOfAuditedFinancial,
//                 Revenue: req.body.Revenue,
//                 Profit: req.body.Profit,
//                 netWorth: req.body.netWorth,
//                 currentAssets: req.body.currentAssets,
//                 directorDetails: req.body.directorDetails,
//                 financial_data: req.body.financial_data,
//                 financial_data2: req.body.financial_data2
//             });
//             res.send({
//                 message: "FdetailSchema was created successfully!",
//                 status: "success",
//                 data :data});
//         } catch (err) {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while creating the FdetailSchema.",
//             });
//         }
//     }
// ];
let directory_name = "uploads";
const path = require("path");
var multer = require("multer");
var financial_data_DocPath = "";
var financial_data2_DocPath = "";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(directory_name, "/"));
  },
  filename: (req, file, cb) => {

    if (file.fieldname === "financial_data") {

      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      financial_data_DocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(
        null,
        filedirect[0] +
          "_" +
          randomNumber +
          "." +
          filedirect[1]
      );
    }
    if (file.fieldname === "financial_data2") {

      let randomNumber = Math.floor(100000 + Math.random() * 900000);
      
      let filedirect = file.originalname.split(".");

      financial_data2_DocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(
        null,
        filedirect[0] +
          "_" +
          randomNumber +
          "." +
          filedirect[1]
      );
    }
  },
});
exports.saveFinacialDetail = (req, res) => {
  financial_data_DocPath = "";
  financial_data2_DocPath = "";

  var upload = multer({ storage: storage }).fields([
    {
      name: "financial_data",
      maxCount: 1,
    },
    {
      name: "financial_data2",
      maxCount: 1,
    },
  ]);
  upload(req, res, function (err) {

    if (err) {
      console.log("InsideErr", err);
      return "err";
    } else {
      FdetailSchema.findOne({
        where: {
          userId: req.body.userId,
        },
      }).then(async (user) => {
        if (!user) {
          const financial_data = financial_data_DocPath;
          const financial_data2 = financial_data2_DocPath;
          const yearOfAuditedFinancial = req.body.yearOfAuditedFinancial;
          const Revenue = req.body.Revenue;
          const Profit = req.body.Profit;
          const netWorth = req.body.netWorth;
          const currentAssets = req.body.currentAssets;
          const directorDetails = req.body.directorDetails;
          const organisationType = req.body.organisationType;
          const shareholderName = req.body.shareholderName;
          const userId = req.body.userId;
          const user = new FdetailSchema({
            financial_id:
              "financial" + Math.floor(100000 + Math.random() * 900000),
            financial_data: financial_data,
            financial_data2: financial_data2,
            yearOfAuditedFinancial: yearOfAuditedFinancial,
            Revenue: Revenue,
            Profit: Profit,
            netWorth: netWorth,
            currentAssets: currentAssets,
            directorDetails: directorDetails,
            organisationType: organisationType,
            shareholderName: shareholderName,
            userId: userId,
          });
          user.save().then((result) => {
            return res.status(200).json({
              status: "success",
              message: "Financial Details Saved Successfully",
              result,
            });
          });
        } else {
          console.log("Update Api");
          var fDetails = await FdetailSchema.findOne({
            where: { userId: req.body.userId },
          });
      
          if (err) {
            console.log("InsideErr", err);
            return "err";
          } else {
            if (
              req.files.financial_data?.length > 0 ||
              req.files.financial_data2?.length > 0
            ) {
              let financial_data = financial_data_DocPath;
              let financial_data2 = financial_data2_DocPath;
      
              if (fDetails.financial_data === req.body.financial_data) {
                financial_data = req.body.financial_data;
              } else {
                financial_data = financial_data_DocPath;
                directoryFiananceOneDelete = fDetails.financial_data;
                if (directoryFiananceOneDelete && !req.body.financial_data) {
                  fs.unlink(directoryFiananceOneDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }
      
              if (fDetails.financial_data2 === req.body.financial_data2) {
                financial_data2 = req.body.financial_data2;
              } else {
                financial_data2 = financial_data2_DocPath;
                directoryFiananceTwoDelete = fDetails.financial_data2;
                if (directoryFiananceTwoDelete && !req.body.financial_data2) {
                  fs.unlink(directoryFiananceTwoDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }
      
              req.body.financial_data = financial_data;
              req.body.financial_data2 = financial_data2;
              FdetailSchema.update(req.body, {
                where: {
                  userId: req.body.userId,
                },
              })
                .then(() => {
                  res.status(200).send({
                    message: "Financial Detail was updated successfully!",
                    status: "success",
                  });
                })
                .catch((err) => {
                  res.status(500).send({
                    message:
                      err.message ||
                      "Some error occurred while updating the Financial Detail schema.",
                  });
                });
            } else {
              let financial_data = financial_data_DocPath;
              let financial_data2 = financial_data2_DocPath;
      
              if (fDetails.financial_data === req.body.financial_data) {
                financial_data = req.body.financial_data;
              } else {
                financial_data = financial_data_DocPath;
                directoryFiananceOneDelete = fDetails.financial_data;
                if (directoryFiananceOneDelete && !req.body.financial_data) {
                  fs.unlink(directoryFiananceOneDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }
      
              if (fDetails.financial_data2 === req.body.financial_data2) {
                financial_data2 = req.body.financial_data2;
              } else {
                financial_data2 = financial_data2_DocPath;
                directoryFiananceTwoDelete = fDetails.financial_data2;
                if (directoryFiananceTwoDelete && !req.body.financial_data2) {
                  fs.unlink(directoryFiananceTwoDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }
      
              req.body.financial_data = financial_data;
              req.body.financial_data2 = financial_data2;
              FdetailSchema.update(req.body, {
                where: {
                  userId: req.body.userId,
                },
              })
                .then(() => {
                  res.status(200).send({
                    message: "Financial Detail was updated successfully!",
                    status: "success",
                  });
                })
                .catch((err) => {
                  res.status(500).send({
                    message:
                      err.message ||
                      "Some error occurred while updating the Financial Detail schema.",
                  });
                });
            }
          }
        }
      });
    }
  });
};
exports.updateFinacialDetail = async (req, res) => {
  financial_data_DocPath = "";
  financial_data2_DocPath = "";

  var userId = req.params.userId;
  var upload = multer({ storage: storage }).fields([
    {
      name: "financial_data",
      maxCount: 1,
    },
    {
      name: "financial_data2",
      maxCount: 1,
    },
  ]);

  upload(req, res, async function (err) {
    var fDetails = await FdetailSchema.findOne({
      where: { userId: req.params.userId },
    });

    if (err) {
      console.log("InsideErr", err);
      return "err";
    } else {
      if (
        req.files.financial_data?.length > 0 ||
        req.files.financial_data2?.length > 0
      ) {
        let financial_data = financial_data_DocPath;
        let financial_data2 = financial_data2_DocPath;

        if (fDetails.financial_data === req.body.financial_data) {
          financial_data = req.body.financial_data;
        } else {
          financial_data = financial_data_DocPath;
          directoryFiananceOneDelete = fDetails.financial_data;
          if (directoryFiananceOneDelete && !req.body.financial_data) {
            fs.unlink(directoryFiananceOneDelete, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }

        if (fDetails.financial_data2 === req.body.financial_data2) {
          financial_data2 = req.body.financial_data2;
        } else {
          financial_data2 = financial_data2_DocPath;
          directoryFiananceTwoDelete = fDetails.financial_data2;
          if (directoryFiananceTwoDelete && !req.body.financial_data2) {
            fs.unlink(directoryFiananceTwoDelete, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }

        req.body.financial_data = financial_data;
        req.body.financial_data2 = financial_data2;
        FdetailSchema.update(req.body, {
          where: {
            userId: userId,
          },
        })
          .then(() => {
            res.status(200).send({
              message: "Financial Detail was updated successfully!",
              status: "success",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while updating the Financial Detail schema.",
            });
          });
      } else {
        let financial_data = financial_data_DocPath;
        let financial_data2 = financial_data2_DocPath;

        if (fDetails.financial_data === req.body.financial_data) {
          financial_data = req.body.financial_data;
        } else {
          financial_data = financial_data_DocPath;
          directoryFiananceOneDelete = fDetails.financial_data;
          if (directoryFiananceOneDelete && !req.body.financial_data) {
            fs.unlink(directoryFiananceOneDelete, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }

        if (fDetails.financial_data2 === req.body.financial_data2) {
          financial_data2 = req.body.financial_data2;
        } else {
          financial_data2 = financial_data2_DocPath;
          directoryFiananceTwoDelete = fDetails.financial_data2;
          if (directoryFiananceTwoDelete && !req.body.financial_data2) {
            fs.unlink(directoryFiananceTwoDelete, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }

        req.body.financial_data = financial_data;
        req.body.financial_data2 = financial_data2;
        FdetailSchema.update(req.body, {
          where: {
            userId: userId,
          },
        })
          .then(() => {
            res.status(200).send({
              message: "Financial Detail was updated successfully!",
              status: "success",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while updating the Financial Detail schema.",
            });
          });
      }
    }
  });
};
