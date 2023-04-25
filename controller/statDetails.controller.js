const db = require("../model");
const StatDetailSchema = db.statdetail;
const { check, validationResult } = require("express-validator");
const fs = require("fs");
// exports.postStatdetail = [
//   //validate form
//   check("GST_type").not().isEmpty().withMessage("GST_type is required"),
//   check("GST_No")
//     .not()
//     .isEmpty()
//     .isLength(15)
//     .withMessage("GST_NO is required"),
//   check("GST_Doc").not().isEmpty().withMessage("GST_Doc is required"),
//   check("PAN_No")
//     .not()
//     .isEmpty()
//     .isLength(10)
//     .withMessage("PAN_NO is required"),
//   check("PAN_Doc").not().isEmpty().withMessage("PAN_Doc is required"),
//   check("CIN_No")
//     .not()
//     .isEmpty()
//     .isLength({ min: 2, max: 20 })
//     .withMessage("CIN_NO is required"),
//   check("form_10f").not().isEmpty().withMessage("form_10f is required"),
//   check("pe_declaration")
//     .not()
//     .isEmpty()
//     .withMessage("pe_declaration is required"),
//   check("MSME_status").not().isEmpty().withMessage("MSME_status is required"),
//   check("MSME_No")
//     .not()
//     .isEmpty()
//     .isLength({ min: 2, max: 20 })
//     .withMessage("MSME_NO is required"),
//   check("MSME_Doc").not().isEmpty().withMessage("MSME_Doc is required"),
//   check("MSME_Type").not().isEmpty().withMessage("MSME_Type is required"),
//   check("TAN_No")
//     .not(10)
//     .isEmpty()
//     .isLength({ min: 2, max: 20 })
//     .withMessage("TAN_NO is required"),
//   check("TAN_Doc").not().isEmpty().withMessage("TAN_Doc is required"),
//   check("Tax_residency")
//     .not()
//     .isEmpty()
//     .withMessage("Tax_residency is required"),
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(422).json({ errors: errors.array() });
//     }
//     try {
//       const statdetail = await StatDetailSchema.create({
//         userid: req.body.userid,
//         GST_type: req.body.GST_type,
//         GST_No: req.body.GST_No,
//         GST_Doc: req.body.GST_Doc,
//         PAN_No: req.body.PAN_No,
//         PAN_Doc: req.body.PAN_Doc,
//         CIN_No: req.body.CIN_No,
//         form_10f: req.body.form_10f,
//         pe_declaration: req.body.pe_declaration,
//         MSME_status: req.body.MSME_status,
//         MSME_No: req.body.MSME_No,
//         MSME_Doc: req.body.MSME_Doc,
//         MSME_Type: req.body.MSME_Type,
//         TAN_No: req.body.TAN_No,
//         TAN_Doc: req.body.TAN_Doc,
//         Tax_residency: req.body.Tax_residency,
//       });
//       res.send({
//         message: "Statdetail was registered successfully!",
//         status: "success",
//         data: statdetail,
//       });
//     } catch (err) {
//       res.status(500).send({
//         message:
//           err.message ||
//           "Some error occurrer while creating the StatDetailSchema",
//       });
//     }
//   },
// ];

//update statutory details
// exports.updateStatdetail = async (req, res) => {
//   const userid = req.params.id;
//   const updateStatdetail = await StatDetailSchema.update(req.body, {
//     where: { userid: userid },
//   })
//   if (updateStatdetail[0]) {
//     res.send({
//       message: "Statdetail was updated successfully!",
//       status: "success",
//       data: updateStatdetail
//     });
//   } else {
//     res.status(500).send({
//       message: "Error updating Statdetail with id=" + id,
//       status: "error",
//       data: updateStatdetail
//     });
//   }
// };
let directory_name = "uploads";
const path = require("path");
var multer = require("multer");
var GST_DocPath = "";
var PAN_DocPath = "";
var form_10f_DocPath = "";
var PE_Declaration_DocPath = "";
var TAN_DocPath = "";
var MSME_DocPath = "";
var Tax_residency_DocPath = "";
var fileDisclosure_DocPath = "";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(directory_name, "/"));
  },
  filename: (req, file, cb) => {
    var filetype = "";

    if (file.fieldname === "GST_Doc") {

      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      GST_DocPath =
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
    if (file.fieldname === "fileDisclosure") {

      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      fileDisclosure_DocPath =
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
    if (file.fieldname === "PAN_Doc") {

      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      PAN_DocPath =
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
    if (file.fieldname === "form_10f_Doc") {

      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      form_10f_DocPath =
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
    if (file.fieldname === "TAN_Doc") {

      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      TAN_DocPath =
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
    if (file.fieldname === "PE_Declaration_Doc") {

      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      PE_Declaration_DocPath =
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
    if (file.fieldname === "MSME_Doc") {

      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      MSME_DocPath =
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
    if (file.fieldname === "Tax_residency_Doc") {

      let randomNumber = Math.floor(100000 + Math.random() * 900000);
      
      let filedirect = file.originalname.split(".");

      Tax_residency_DocPath =
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
//savestatutory
exports.saveStatutoryDetail = (req, res) => {
  GST_DocPath = "";
  PAN_DocPath = "";
  form_10f_DocPath = "";
  TAN_DocPath = "";
  PE_Declaration_DocPath = "";
  MSME_DocPath = "";
  Tax_residency_DocPath = "";
  fileDisclosure_DocPath = "";

  var upload = multer({ storage: storage }).fields([
    {
      name: "GST_Doc",
      maxCount: 1,
    },
    {
      name: "PAN_Doc",
      maxCount: 1,
    },
    {
      name: "form_10f_Doc",
      maxCount: 1,
    },
    {
      name: "TAN_Doc",
      maxCount: 1,
    },
    {
      name: "PE_Declaration_Doc",
      maxCount: 1,
    },
    {
      name: "MSME_Doc",
      maxCount: 1,
    },
    {
      name: "Tax_residency_Doc",
      maxCount: 1,
    },
    {
      name: "fileDisclosure",
      maxCount: 1,
    },
  ]);
  upload(req, res, function (err) {
    console.log("req", req.body);
    console.log("req", req.files);

    if (err) {
      console.log("InsideErr", err);
      return "err";
    } else {
      StatDetailSchema.findOne({
        where: {
          userId: req.body.userId,
        },
      }).then(async (user) => {
        if (!user) {
          const GST_Vendor_Type = req.body.GST_Vendor_Type;
          const GST_Registration_No = req.body.GST_Registration_No;
          const GST_Doc = GST_DocPath;
          const fileDisclosure = fileDisclosure_DocPath;
          const P_A_N_No = req.body.P_A_N_No;
          const PAN_Doc = PAN_DocPath;
          const form_10f_Doc = form_10f_DocPath;
          const TAN_Doc = TAN_DocPath;
          const PE_DeclarationNo = req.body.PE_DeclarationNo;
          const PE_Declaration_Doc = PE_Declaration_DocPath;
          const MSME_Doc = MSME_DocPath;
          const Tax_residency_Doc = Tax_residency_DocPath;
          const CIN_No = req.body.CIN_No;
          const form_10f = req.body.form_10f;
          const MSMED = req.body.MSMED;
          const MSMED_Number = req.body.MSMED_Number;
          const MSMED_Vendor_Type = req.body.MSMED_Vendor_Type;
          const TAN_No = req.body.TAN_No;
          const Tax_residency_No = req.body.Tax_residency_No;
          const StatutoryId =
            "Statutory" + Math.floor(100000 + Math.random() * 900000);
          const userId = req.body.userId;
          const user = new StatDetailSchema({
            StatutoryId: StatutoryId,
            userId: userId,
            GST_Vendor_Type: GST_Vendor_Type,
            GST_Registration_No: GST_Registration_No,
            GST_Doc: GST_Doc,
            P_A_N_No: P_A_N_No,
            PAN_Doc: PAN_Doc,
            form_10f_Doc: form_10f_Doc,
            TAN_Doc: TAN_Doc,
            PE_DeclarationNo: PE_DeclarationNo,
            PE_Declaration_Doc: PE_Declaration_Doc,
            MSME_Doc: MSME_Doc,
            Tax_residency_Doc: Tax_residency_Doc,
            CIN_No: CIN_No,
            form_10f: form_10f,
            MSMED: MSMED,
            MSMED_Number: MSMED_Number,
            MSMED_Vendor_Type: MSMED_Vendor_Type,
            TAN_No: TAN_No,
            Tax_residency_No: Tax_residency_No,
            fileDisclosure: fileDisclosure,
          });
          user.save().then((result) => {
            return res.status(200).json({
              status: "success",
              message: "Statuory Details Saved Successfully",
              result,
            });
          });
        } else {
          var statDetails = await StatDetailSchema.findOne({
            where: { userId: req.body.userId },
          });

          if (err) {
            console.log("InsideErr", err);
            return "err";
          } else {
            if (
              req.files.GST_Doc?.length > 0 ||
              req.files.PAN_Doc?.length > 0 ||
              req.files.form_10f_Doc?.length > 0 ||
              req.files.TAN_Doc?.length > 0 ||
              req.files.PE_Declaration_Doc?.length > 0 ||
              req.files.MSME_Doc?.length > 0 ||
              req.files.Tax_residency_Doc?.length > 0
            ) {
              let GST_Doc = GST_DocPath;
              let PAN_Doc = PAN_DocPath;
              let form_10f_Doc = form_10f_DocPath;
              let TAN_Doc = TAN_DocPath;
              let PE_Declaration_Doc = PE_Declaration_DocPath;
              let MSME_Doc = MSME_DocPath;
              let Tax_residency_Doc = Tax_residency_DocPath;
              let fileDisclosure = fileDisclosure_DocPath;

              if (statDetails.GST_Doc === req.body.GST_Doc) {
                GST_Doc = req.body.GST_Doc;
              } else {
                GST_Doc = GST_DocPath;
                StatOneDelete = statDetails.GST_Doc;
                if (StatOneDelete && !req.body.GST_Doc) {
                  fs.unlink(StatOneDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }

              if (statDetails.PAN_Doc === req.body.PAN_Doc) {
                PAN_Doc = req.body.PAN_Doc;
              } else {
                PAN_Doc = PAN_DocPath;
                StatTwoDelete = statDetails.PAN_Doc;
                if (StatTwoDelete && !req.body.PAN_Doc) {
                  fs.unlink(StatTwoDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }

              if (statDetails.form_10f_Doc === req.body.form_10f_Doc) {
                form_10f_Doc = req.body.form_10f_Doc;
              } else {
                form_10f_Doc = form_10f_DocPath;
                StatThreeDelete = statDetails.form_10f_Doc;
                if (StatThreeDelete && !req.body.form_10f_Doc) {
                  fs.unlink(StatThreeDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }

              if (statDetails.TAN_Doc === req.body.TAN_Doc) {
                TAN_Doc = req.body.TAN_Doc;
              } else {
                TAN_Doc = TAN_DocPath;
                StatFourDelete = statDetails.TAN_Doc;
                if (StatFourDelete && !req.body.TAN_Doc) {
                  fs.unlink(StatFourDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }

              if (
                statDetails.PE_Declaration_Doc === req.body.PE_Declaration_Doc
              ) {
                PE_Declaration_Doc = req.body.PE_Declaration_Doc;
              } else {
                PE_Declaration_Doc = PE_Declaration_DocPath;
                StatFiveDelete = statDetails.PE_Declaration_Doc;
                if (StatFiveDelete && !req.body.PE_Declaration_Doc) {
                  fs.unlink(StatFiveDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }

              if (statDetails.MSME_Doc === req.body.MSME_Doc) {
                MSME_Doc = req.body.MSME_Doc;
              } else {
                MSME_Doc = MSME_DocPath;
                StatSixDelete = statDetails.MSME_Doc;
                if (StatSixDelete && !req.body.MSME_Doc) {
                  fs.unlink(StatSixDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }

              if (
                statDetails.Tax_residency_Doc === req.body.Tax_residency_Doc
              ) {
                Tax_residency_Doc = req.body.Tax_residency_Doc;
              } else {
                Tax_residency_Doc = Tax_residency_DocPath;
                StatsevenDelete = statDetails.Tax_residency_Doc;
                if (StatsevenDelete && !req.body.Tax_residency_Doc) {
                  fs.unlink(StatsevenDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }

              if (statDetails.fileDisclosure === req.body.fileDisclosure) {
                fileDisclosure = req.body.fileDisclosure;
              } else {
                fileDisclosure = fileDisclosure_DocPath;
                StatEightDelete = statDetails.fileDisclosure;
                if (StatEightDelete && !req.body.fileDisclosure) {
                  fs.unlink(StatEightDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }

              if (req.body.MSMED === "UnRegistered") {
                req.body.MSMED_Number = "N/A";
                if (req.body.MSME_Doc) {
                  fs.unlink(req.body.MSME_Doc, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
                MSME_Doc = "";
              }


              req.body.GST_Doc = GST_Doc;
              req.body.PAN_Doc = PAN_Doc;
              req.body.form_10f_Doc = form_10f_Doc;
              req.body.TAN_Doc = TAN_Doc;
              req.body.PE_Declaration_Doc = PE_Declaration_Doc;
              req.body.MSME_Doc = MSME_Doc;
              req.body.Tax_residency_Doc = Tax_residency_Doc;
              req.body.fileDisclosure = fileDisclosure;

              StatDetailSchema.update(req.body, {
                where: {
                  userId: req.body.userId,
                },
              })
                .then(() => {
                  res.status(200).send({
                    message: "Statuory Detail was updated successfully!",
                    status: "success",
                  });
                })
                .catch((err) => {
                  res.status(500).send({
                    message:
                      err.message ||
                      "Some error occurred while updating the Statuory Detail schema.",
                  });
                });
            } else {
              let GST_Doc = GST_DocPath;
              let PAN_Doc = PAN_DocPath;
              let form_10f_Doc = form_10f_DocPath;
              let TAN_Doc = TAN_DocPath;
              let PE_Declaration_Doc = PE_Declaration_DocPath;
              let MSME_Doc = MSME_DocPath;
              let Tax_residency_Doc = Tax_residency_DocPath;
              let fileDisclosure = fileDisclosure_DocPath;
              

              if (statDetails.GST_Doc === req.body.GST_Doc) {
                GST_Doc = req.body.GST_Doc;
              } else {
                GST_Doc = GST_DocPath;
                StatOneDelete = statDetails.GST_Doc;
                if (StatOneDelete && !req.body.GST_Doc) {
                  fs.unlink(StatOneDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }

              if (statDetails.PAN_Doc === req.body.PAN_Doc) {
                PAN_Doc = req.body.PAN_Doc;
              } else {
                PAN_Doc = PAN_DocPath;
                StatTwoDelete = statDetails.PAN_Doc;
                if (StatTwoDelete && !req.body.PAN_Doc) {
                  fs.unlink(StatTwoDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }

              if (statDetails.form_10f_Doc === req.body.form_10f_Doc) {
                form_10f_Doc = req.body.form_10f_Doc;
              } else {
                form_10f_Doc = form_10f_DocPath;
                StatThreeDelete = statDetails.form_10f_Doc;
                if (StatThreeDelete && !req.body.form_10f_Doc) {
                  fs.unlink(StatThreeDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }

              if (statDetails.TAN_Doc === req.body.TAN_Doc) {
                TAN_Doc = req.body.TAN_Doc;
              } else {
                TAN_Doc = TAN_DocPath;
                StatFourDelete = statDetails.TAN_Doc;
                if (StatFourDelete && !req.body.TAN_Doc) {
                  fs.unlink(StatFourDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }

              if (
                statDetails.PE_Declaration_Doc === req.body.PE_Declaration_Doc
              ) {
                PE_Declaration_Doc = req.body.PE_Declaration_Doc;
              } else {
                PE_Declaration_Doc = PE_Declaration_DocPath;
                StatFiveDelete = statDetails.PE_Declaration_Doc;
                if (StatFiveDelete && !req.body.PE_Declaration_Doc) {
                  fs.unlink(StatFiveDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }

              if (statDetails.MSME_Doc === req.body.MSME_Doc) {
                MSME_Doc = req.body.MSME_Doc;
              } else {
                MSME_Doc = MSME_DocPath;
                StatSixDelete = statDetails.MSME_Doc;
                if (StatSixDelete && !req.body.MSME_Doc) {
                  fs.unlink(StatSixDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }

              if (
                statDetails.Tax_residency_Doc === req.body.Tax_residency_Doc
              ) {
                Tax_residency_Doc = req.body.Tax_residency_Doc;
              } else {
                Tax_residency_Doc = Tax_residency_DocPath;
                StatsevenDelete = statDetails.Tax_residency_Doc;
                if (StatsevenDelete && !req.body.Tax_residency_Doc) {
                  fs.unlink(StatsevenDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }

              if (statDetails.fileDisclosure === req.body.fileDisclosure) {
                fileDisclosure = req.body.fileDisclosure;
              } else {
                fileDisclosure = fileDisclosure_DocPath;
                StatEightDelete = statDetails.fileDisclosure;
                if (StatEightDelete && !req.body.fileDisclosure) {
                  fs.unlink(StatEightDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }

              if (req.body.MSMED === "UnRegistered") {
                req.body.MSMED_Number = "N/A";
                if (req.body.MSME_Doc) {
                  fs.unlink(req.body.MSME_Doc, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
                MSME_Doc = "";
              }

              req.body.GST_Doc = GST_Doc;
              req.body.PAN_Doc = PAN_Doc;
              req.body.form_10f_Doc = form_10f_Doc;
              req.body.TAN_Doc = TAN_Doc;
              req.body.PE_Declaration_Doc = PE_Declaration_Doc;
              req.body.MSME_Doc = MSME_Doc;
              req.body.Tax_residency_Doc = Tax_residency_Doc;
              req.body.fileDisclosure = fileDisclosure;

              StatDetailSchema.update(req.body, {
                where: {
                  userId: req.body.userId,
                },
              })
                .then(() => {
                  res.status(200).send({
                    message: "Statuory Detail was updated successfully!",
                    status: "success",
                  });
                })
                .catch((err) => {
                  res.status(500).send({
                    message:
                      err.message ||
                      "Some error occurred while updating the Statuory Detail schema.",
                  });
                });
            }
          }
        }
      });
    }
  });
};

exports.updateStatutoryDetail = async (req, res) => {
  GST_DocPath = "";
  PAN_DocPath = "";
  TAN_DocPath = "";
  form_10f_DocPath = "";
  PE_Declaration_DocPath = "";
  MSME_DocPath = "";
  Tax_residency_DocPath = "";
  fileDisclosure_DocPath = "";

  var userId = req.params.userId;

  var upload = multer({ storage: storage }).fields([
    {
      name: "GST_Doc",
      maxCount: 1,
    },
    {
      name: "PAN_Doc",
      maxCount: 1,
    },
    {
      name: "form_10f_Doc",
      maxCount: 1,
    },
    {
      name: "TAN_Doc",
      maxCount: 1,
    },
    {
      name: "PE_Declaration_Doc",
      maxCount: 1,
    },
    {
      name: "MSME_Doc",
      maxCount: 1,
    },
    {
      name: "Tax_residency_Doc",
      maxCount: 1,
    },
    {
      name: "fileDisclosure",
      maxCount: 1,
    },
  ]);
  upload(req, res, async function (err) {
    var statDetails = await StatDetailSchema.findOne({
      where: { userId: req.params.userId },
    });

    if (err) {
      console.log("InsideErr", err);
      return "err";
    } else {
      if (
        req.files.GST_Doc?.length > 0 ||
        req.files.PAN_Doc?.length > 0 ||
        req.files.form_10f_Doc?.length > 0 ||
        req.files.TAN_Doc?.length > 0 ||
        req.files.PE_Declaration_Doc?.length > 0 ||
        req.files.MSME_Doc?.length > 0 ||
        req.files.Tax_residency_Doc?.length > 0
      ) {
        let GST_Doc = GST_DocPath;
        let PAN_Doc = PAN_DocPath;
        let form_10f_Doc = form_10f_DocPath;
        let TAN_Doc = TAN_DocPath;
        let PE_Declaration_Doc = PE_Declaration_DocPath;
        let MSME_Doc = MSME_DocPath;
        let Tax_residency_Doc = Tax_residency_DocPath;
        let fileDisclosure = fileDisclosure_DocPath;

        if (statDetails.GST_Doc === req.body.GST_Doc) {
          GST_Doc = req.body.GST_Doc;
        } else {
          GST_Doc = GST_DocPath;
          StatOneDelete = statDetails.GST_Doc;
          if (StatOneDelete && !req.body.GST_Doc) {
            fs.unlink(StatOneDelete, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }

        if (statDetails.PAN_Doc === req.body.PAN_Doc) {
          PAN_Doc = req.body.PAN_Doc;
        } else {
          PAN_Doc = PAN_DocPath;
          StatTwoDelete = statDetails.PAN_Doc;
          if (StatTwoDelete && !req.body.PAN_Doc) {
            fs.unlink(StatTwoDelete, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }

        if (statDetails.form_10f_Doc === req.body.form_10f_Doc) {
          form_10f_Doc = req.body.form_10f_Doc;
        } else {
          form_10f_Doc = form_10f_DocPath;
          StatThreeDelete = statDetails.form_10f_Doc;
          if (StatThreeDelete && !req.body.form_10f_Doc) {
            fs.unlink(StatThreeDelete, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }

        if (statDetails.TAN_Doc === req.body.TAN_Doc) {
          TAN_Doc = req.body.TAN_Doc;
        } else {
          TAN_Doc = TAN_DocPath;
          StatFourDelete = statDetails.TAN_Doc;
          if (StatFourDelete && !req.body.TAN_Doc) {
            fs.unlink(StatFourDelete, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }

        if (statDetails.PE_Declaration_Doc === req.body.PE_Declaration_Doc) {
          PE_Declaration_Doc = req.body.PE_Declaration_Doc;
        } else {
          PE_Declaration_Doc = PE_Declaration_DocPath;
          StatFiveDelete = statDetails.PE_Declaration_Doc;
          if (StatFiveDelete && !req.body.PE_Declaration_Doc) {
            fs.unlink(StatFiveDelete, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }

        if (statDetails.MSME_Doc === req.body.MSME_Doc) {
          MSME_Doc = req.body.MSME_Doc;
        } else {
          MSME_Doc = MSME_DocPath;
          StatSixDelete = statDetails.MSME_Doc;
          if (StatSixDelete && !req.body.MSME_Doc) {
            fs.unlink(StatSixDelete, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }

        if (statDetails.Tax_residency_Doc === req.body.Tax_residency_Doc) {
          Tax_residency_Doc = req.body.Tax_residency_Doc;
        } else {
          Tax_residency_Doc = Tax_residency_DocPath;
          StatsevenDelete = statDetails.Tax_residency_Doc;
          if (StatsevenDelete && !req.body.Tax_residency_Doc) {
            fs.unlink(StatsevenDelete, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }

        if (statDetails.fileDisclosure === req.body.fileDisclosure) {
          fileDisclosure = req.body.fileDisclosure;
        } else {
          fileDisclosure = fileDisclosure_DocPath;
          StatEightDelete = statDetails.fileDisclosure;
          if (StatEightDelete && !req.body.fileDisclosure) {
            fs.unlink(StatEightDelete, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }

        if (req.body.MSMED === "UnRegistered") {
          req.body.MSMED_Number = "N/A";
          if (req.body.MSME_Doc) {
            fs.unlink(req.body.MSME_Doc, (err) => {
              if (err) {
                throw err;
              }
            });
          }
          MSME_Doc = "";
        }

        req.body.GST_Doc = GST_Doc;
        req.body.PAN_Doc = PAN_Doc;
        req.body.form_10f_Doc = form_10f_Doc;
        req.body.TAN_Doc = TAN_Doc;
        req.body.PE_Declaration_Doc = PE_Declaration_Doc;
        req.body.MSME_Doc = MSME_Doc;
        req.body.Tax_residency_Doc = Tax_residency_Doc;
        req.body.fileDisclosure = fileDisclosure_DocPath;

        StatDetailSchema.update(req.body, {
          where: {
            userId: userId,
          },
        })
          .then(() => {
            res.status(200).send({
              message: "Statuory Detail was updated successfully!",
              status: "success",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while updating the Statuory Detail schema.",
            });
          });
      } else {
        let GST_Doc = GST_DocPath;
        let PAN_Doc = PAN_DocPath;
        let form_10f_Doc = form_10f_DocPath;
        let TAN_Doc = TAN_DocPath;
        let PE_Declaration_Doc = PE_Declaration_DocPath;
        let MSME_Doc = MSME_DocPath;
        let Tax_residency_Doc = Tax_residency_DocPath;
        let fileDisclosure = fileDisclosure_DocPath;

        if (statDetails.GST_Doc === req.body.GST_Doc) {
          GST_Doc = req.body.GST_Doc;
        } else {
          GST_Doc = GST_DocPath;
          StatOneDelete = statDetails.GST_Doc;
          if (StatOneDelete && !req.body.GST_Doc) {
            fs.unlink(StatOneDelete, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }

        if (statDetails.PAN_Doc === req.body.PAN_Doc) {
          PAN_Doc = req.body.PAN_Doc;
        } else {
          PAN_Doc = PAN_DocPath;
          StatTwoDelete = statDetails.PAN_Doc;
          if (StatTwoDelete && !req.body.PAN_Doc) {
            fs.unlink(StatTwoDelete, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }

        if (statDetails.form_10f_Doc === req.body.form_10f_Doc) {
          form_10f_Doc = req.body.form_10f_Doc;
        } else {
          form_10f_Doc = form_10f_DocPath;
          StatThreeDelete = statDetails.form_10f_Doc;
          if (StatThreeDelete && !req.body.form_10f_Doc) {
            fs.unlink(StatThreeDelete, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }

        if (statDetails.TAN_Doc === req.body.TAN_Doc) {
          TAN_Doc = req.body.TAN_Doc;
        } else {
          TAN_Doc = TAN_DocPath;
          StatFourDelete = statDetails.TAN_Doc;
          if (StatFourDelete && !req.body.TAN_Doc) {
            fs.unlink(StatFourDelete, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }

        if (statDetails.PE_Declaration_Doc === req.body.PE_Declaration_Doc) {
          PE_Declaration_Doc = req.body.PE_Declaration_Doc;
        } else {
          PE_Declaration_Doc = PE_Declaration_DocPath;
          StatFiveDelete = statDetails.PE_Declaration_Doc;
          if (StatFiveDelete && !req.body.PE_Declaration_Doc) {
            fs.unlink(StatFiveDelete, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }

        if (statDetails.MSME_Doc === req.body.MSME_Doc) {
          MSME_Doc = req.body.MSME_Doc;
        } else {
          MSME_Doc = MSME_DocPath;
          StatSixDelete = statDetails.MSME_Doc;
          if (StatSixDelete && !req.body.MSME_Doc) {
            fs.unlink(StatSixDelete, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }

        if (statDetails.Tax_residency_Doc === req.body.Tax_residency_Doc) {
          Tax_residency_Doc = req.body.Tax_residency_Doc;
        } else {
          Tax_residency_Doc = Tax_residency_DocPath;
          StatsevenDelete = statDetails.Tax_residency_Doc;
          if (StatsevenDelete && !req.body.Tax_residency_Doc) {
            fs.unlink(StatsevenDelete, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }

        if (statDetails.fileDisclosure === req.body.fileDisclosure) {
          fileDisclosure = req.body.fileDisclosure;
        } else {
          fileDisclosure = fileDisclosure_DocPath;
          StatEightDelete = statDetails.fileDisclosure;
          if (StatEightDelete && !req.body.fileDisclosure) {
            fs.unlink(StatEightDelete, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }

        if (req.body.MSMED === "UnRegistered") {
          req.body.MSMED_Number = "N/A";
          if (req.body.MSME_Doc) {
            fs.unlink(req.body.MSME_Doc, (err) => {
              if (err) {
                throw err;
              }
            });
          }
          MSME_Doc = "";
        }

        req.body.GST_Doc = GST_Doc;
        req.body.PAN_Doc = PAN_Doc;
        req.body.form_10f_Doc = form_10f_Doc;
        req.body.TAN_Doc = TAN_Doc;
        req.body.PE_Declaration_Doc = PE_Declaration_Doc;
        req.body.MSME_Doc = MSME_Doc;
        req.body.Tax_residency_Doc = Tax_residency_Doc;
        req.body.fileDisclosure = fileDisclosure_DocPath;

        StatDetailSchema.update(req.body, {
          where: {
            userId: userId,
          },
        })
          .then(() => {
            res.status(200).send({
              message: "Statuory Detail was updated successfully!",
              status: "success",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while updating the Statuory Detail schema.",
            });
          });
      }
    }
  });
};
