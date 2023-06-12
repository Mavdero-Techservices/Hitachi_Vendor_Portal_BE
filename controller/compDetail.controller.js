const db = require("../model");
const CompliancedetailSchema = db.complianceDetail;
const VdetailSchema = db.vdetail;
const { check, validationResult } = require("express-validator");
const PDFDocument = require("pdfkit");
const PDFDocument2 = require("pdfkit-table");
const fs = require("fs");
const blobStream = require("blob-stream");
// exports.postCompdetail = [
//     //validate form
//     check("RPD_Doc")
//         .not()
//         .isEmpty()
//         .withMessage("RPD_Doc is required"),
//     check("COC_Doc")
//         .not()
//         .isEmpty()
//         .withMessage("COC_Doc is required"),
//     check("NDA_Doc")
//         .not()
//         .isEmpty()
//         .withMessage("NDA_Doc is required"),
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(422).json({ errors: errors.array() });
//         }
//         try {
//             const compdetail = await CompdetailSchema.create({
//                 userid: req.body.userid,
//                 RPD_Doc: req.body.RPD_Doc,
//                 COC_Doc: req.body.COC_Doc,
//                 NDA_Doc: req.body.NDA_Doc,
//             });
//             res.send({
//                 message: "compdetail created successfully",
//                 status: "success",
//                 compdetail: compdetail,
//             });
//         } catch (error) {
//             res.status(500).json({
//                 message: "Error creating compdetail",
//                 error: error.message,
//             });
//         }
//     },
// ];
//saveComplianceDetail
let directory_name = "uploads";
const path = require("path");
var multer = require("multer");
var RPD_DocPath = "";
var COC_DocPath = "";
var NDA_DocPath = "";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(directory_name, "/"));
  },
  filename: (req, file, cb) => {
    if (file.fieldname === "RPD_Doc") {

      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      RPD_DocPath =
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

    if (file.fieldname === "COC_Doc") {

      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      COC_DocPath =
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

    if (file.fieldname === "NDA_Doc") {

      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      NDA_DocPath =
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

exports.saveComplianceDetail = (req, res) => {
  RPD_DocPath = "";
  COC_DocPath = "";
  NDA_DocPath = "";

  var upload = multer({ storage: storage }).fields([
    {
      name: "RPD_Doc",
      maxCount: 1,
    },
    {
      name: "COC_Doc",
      maxCount: 1,
    },
    {
      name: "NDA_Doc",
      maxCount: 1,
    },
  ]);
  upload(req, res, function (err) {
    if (err) {
      return "err";
    } else {
      CompliancedetailSchema.findOne({
        where: {
          userId: req.body.userId,
          // id: req.body.id,
        },
      }).then(async (user) => {
        if (!user) {
          console.log("save api call");
          const NDA_Doc = NDA_DocPath;
          const COC_Doc = COC_DocPath;
          const RPD_Doc = RPD_DocPath;
          const complianceId =
            "compliance" + Math.floor(100000 + Math.random() * 900000);
          const userId = req.body.userId;
          const user = new CompliancedetailSchema({
            complianceId: complianceId,
            userId: userId,
            NDA_Doc: NDA_Doc,
            COC_Doc: COC_Doc,
            RPD_Doc: RPD_Doc,
          });
          user.save().then((result) => {
            return res.status(200).json({
              status: "success",
              message: "Compliance Details Saved Successfully",
              result,
            });
          });
        } else {
          var cDetails = await CompliancedetailSchema.findOne({
            where: { userId: req.body.userId },
          });

          if (err) {
            return "err";
          } else {
            if (
              req.files.RPD_Doc?.length > 0 ||
              req.files.COC_Doc?.length > 0 ||
              req.files.NDA_Doc?.length > 0
            ) {
              let RPD_Doc = RPD_DocPath;
              let COC_Doc = COC_DocPath;
              let NDA_Doc = NDA_DocPath;

              if (cDetails.RPD_Doc === req.body.RPD_Doc) {
                RPD_Doc = req.body.RPD_Doc;
              } else {
                RPD_Doc = RPD_DocPath;
                ComplianceOneDelete = cDetails.RPD_Doc;
                if (ComplianceOneDelete && !req.body.RPD_Doc) {
                  fs.unlink(ComplianceOneDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }

              if (cDetails.COC_Doc === req.body.COC_Doc) {
                COC_Doc = req.body.COC_Doc;
              } else {
                COC_Doc = COC_DocPath;
                ComplianceTwoDelete = cDetails.COC_Doc;
                if (ComplianceTwoDelete && !req.body.COC_Doc) {
                  fs.unlink(ComplianceTwoDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }

              if (cDetails.NDA_Doc === req.body.NDA_Doc) {
                NDA_Doc = req.body.NDA_Doc;
              } else {
                NDA_Doc = NDA_DocPath;
                ComplianceThreeDelete = cDetails.NDA_Doc;
                if (ComplianceThreeDelete && !req.body.NDA_Doc) {
                  fs.unlink(ComplianceThreeDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }

              req.body.NDA_Doc = NDA_Doc;
              req.body.COC_Doc = COC_Doc;
              req.body.RPD_Doc = RPD_Doc;
              CompliancedetailSchema.update(req.body, {
                where: {
                  userId: req.body.userId,
                },
              })
                .then(() => {
                  res.status(200).send({
                    message: "Compliancedetail was updated successfully!",
                    status: "success",
                  });
                })
                .catch((err) => {
                  res.status(500).send({
                    message:
                      err.message ||
                      "Some error occurred while updating the Compliancedetail schema.",
                  });
                });
            } else {
              let RPD_Doc = RPD_DocPath;
              let COC_Doc = COC_DocPath;
              let NDA_Doc = NDA_DocPath;

              if (cDetails.RPD_Doc === req.body.RPD_Doc) {
                RPD_Doc = req.body.RPD_Doc;
              } else {
                RPD_Doc = RPD_DocPath;
                ComplianceOneDelete = cDetails.RPD_Doc;
                if (ComplianceOneDelete && !req.body.RPD_Doc) {
                  fs.unlink(ComplianceOneDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }

              if (cDetails.COC_Doc === req.body.COC_Doc) {
                COC_Doc = req.body.COC_Doc;
              } else {
                COC_Doc = COC_DocPath;
                ComplianceTwoDelete = cDetails.COC_Doc;
                if (ComplianceTwoDelete && !req.body.COC_Doc) {
                  fs.unlink(ComplianceTwoDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }

              if (cDetails.NDA_Doc === req.body.NDA_Doc) {
                NDA_Doc = req.body.NDA_Doc;
              } else {
                NDA_Doc = NDA_DocPath;
                ComplianceThreeDelete = cDetails.NDA_Doc;
                if (ComplianceThreeDelete && !req.body.NDA_Doc) {
                  fs.unlink(ComplianceThreeDelete, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }

              req.body.NDA_Doc = NDA_Doc;
              req.body.COC_Doc = COC_Doc;
              req.body.RPD_Doc = RPD_Doc;
              CompliancedetailSchema.update(req.body, {
                where: {
                  userId: req.body.userId,
                },
              })
                .then(() => {
                  res.status(200).send({
                    message: "Compliancedetail was updated successfully!",
                    status: "success",
                  });
                })
                .catch((err) => {
                  res.status(500).send({
                    message:
                      err.message ||
                      "Some error occurred while updating the Compliancedetail schema.",
                  });
                });
            }
          }
        }
      });
    }
  });
};

exports.updateComplianceDetail = async (req, res) => {
  RPD_DocPath = "";
  COC_DocPath = "";
  NDA_DocPath = "";

  var userId = req.params.userId;

  var upload = multer({ storage: storage }).fields([
    {
      name: "RPD_Doc",
      maxCount: 1,
    },
    {
      name: "COC_Doc",
      maxCount: 1,
    },
    {
      name: "NDA_Doc",
      maxCount: 1,
    },
  ]);
  upload(req, res, async function (err) {
    var cDetails = await CompliancedetailSchema.findOne({
      where: { userId: req.params.userId },
    });

    if (err) {
      return "err";
    } else {
      if (
        req.files.RPD_Doc?.length > 0 ||
        req.files.COC_Doc?.length > 0 ||
        req.files.NDA_Doc?.length > 0
      ) {
        let RPD_Doc = RPD_DocPath;
        let COC_Doc = COC_DocPath;
        let NDA_Doc = NDA_DocPath;

        if (cDetails.RPD_Doc === req.body.RPD_Doc) {
          RPD_Doc = req.body.RPD_Doc;
        } else {
          RPD_Doc = RPD_DocPath;
          ComplianceOneDelete = cDetails.RPD_Doc;
          if (ComplianceOneDelete && !req.body.RPD_Doc) {
            fs.unlink(ComplianceOneDelete, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }

        if (cDetails.COC_Doc === req.body.COC_Doc) {
          COC_Doc = req.body.COC_Doc;
        } else {
          COC_Doc = COC_DocPath;
          ComplianceTwoDelete = cDetails.COC_Doc;
          if (ComplianceTwoDelete && !req.body.COC_Doc) {
            fs.unlink(ComplianceTwoDelete, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }

        if (cDetails.NDA_Doc === req.body.NDA_Doc) {
          NDA_Doc = req.body.NDA_Doc;
        } else {
          NDA_Doc = NDA_DocPath;
          ComplianceThreeDelete = cDetails.NDA_Doc;
          if (ComplianceThreeDelete && !req.body.NDA_Doc) {
            fs.unlink(ComplianceThreeDelete, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }

        req.body.NDA_Doc = NDA_Doc;
        req.body.COC_Doc = COC_Doc;
        req.body.RPD_Doc = RPD_Doc;
        CompliancedetailSchema.update(req.body, {
          where: {
            userId: userId,
          },
        })
          .then(() => {
            res.status(200).send({
              message: "Compliancedetail was updated successfully!",
              status: "success",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while updating the Compliancedetail schema.",
            });
          });
      } else {
        let RPD_Doc = RPD_DocPath;
        let COC_Doc = COC_DocPath;
        let NDA_Doc = NDA_DocPath;

        if (cDetails.RPD_Doc === req.body.RPD_Doc) {
          RPD_Doc = req.body.RPD_Doc;
        } else {
          RPD_Doc = RPD_DocPath;
          ComplianceOneDelete = cDetails.RPD_Doc;
          if (ComplianceOneDelete && !req.body.RPD_Doc) {
            fs.unlink(ComplianceOneDelete, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }

        if (cDetails.COC_Doc === req.body.COC_Doc) {
          COC_Doc = req.body.COC_Doc;
        } else {
          COC_Doc = COC_DocPath;
          ComplianceTwoDelete = cDetails.COC_Doc;
          if (ComplianceTwoDelete && !req.body.COC_Doc) {
            fs.unlink(ComplianceTwoDelete, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }

        if (cDetails.NDA_Doc === req.body.NDA_Doc) {
          NDA_Doc = req.body.NDA_Doc;
        } else {
          NDA_Doc = NDA_DocPath;
          ComplianceThreeDelete = cDetails.NDA_Doc;
          if (ComplianceThreeDelete && !req.body.NDA_Doc) {
            fs.unlink(ComplianceThreeDelete, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }

        req.body.NDA_Doc = NDA_Doc;
        req.body.COC_Doc = COC_Doc;
        req.body.RPD_Doc = RPD_Doc;
        CompliancedetailSchema.update(req.body, {
          where: {
            userId: userId,
          },
        })
          .then(() => {
            res.status(200).send({
              message: "Compliancedetail was updated successfully!",
              status: "success",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while updating the Compliancedetail schema.",
            });
          });
      }
    }
  });
};
exports.downloadPdf = (req, res, next) => {
  var fileName = req.params.name;
  let directory_name = "./pdf/" + fileName;
  res.download(directory_name);
};
exports.downloadPdfUploads = (req, res, next) => {
  var fileName = req.params.name;
  let directory_name = "./uploads/" + fileName;
  res.download(directory_name);
};
exports.readPdf = (req, res, next) => {
  const fs = require("fs");
  var hostName = req.header("host");
  const baseUrl = `${process.env.HOST}:${process.env.PORT}/downloadPdf/`;
  let directory_name = "pdf";
  fs.readdir(directory_name, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    files.sort(function (a, b) {
      return (
        fs.statSync(directory_name + "/" + a).mtime.getTime() -
        fs.statSync(directory_name + "/" + b).mtime.getTime()
      );
    });
    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });
    res.status(200).send(fileInfos);
  });
};
exports.readPdfUploads = (req, res, next) => {
  const fs = require("fs");
  var hostName = req.header("host");
  const baseUrl = `${process.env.HOST}:${process.env.PORT}/downloadPdfUploads/`;
  let directory_name = "uploads";
  fs.readdir(directory_name, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    files.sort(function (a, b) {
      return (
        fs.statSync(directory_name + "/" + a).mtime.getTime() -
        fs.statSync(directory_name + "/" + b).mtime.getTime()
      );
    });
    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });
    res.status(200).send(fileInfos);
  });
};
exports.createRelatedDisclosurePdf = (req, res, next) => {
  var companyName = req.body.companyName;
  var userName = req.body.userName;
  const content1 = `We, `;
  const content01 = `${companyName}, `;
  const content001 = `Vendor of Hitachi Systems India Private Limited (“Company”),in the Capacity of relationship Manager, hereby declare, that:`;
  const content2 = `We `;
  const content02 = `have/do not have `;
  const content002 = `any financial or beneficial interest, or association with or in any entity, enterprise, establishment, organization, undertaking (including individual, sole proprietorship, partnership, limited partnership, joint venture, corporation, private company, or public company) with which the Company (i) does any business (directly or indirectly); or (ii) deals in any manner whatsoever; or (iii) with which the Company has any commercial or financial interest.`;
  const content11 = `if Vendor select "do not have any" then they need to fill N/A in the mentioned table./if Vendor select "have" then they have to fill the detail in table and submit the same. `;
  const content3 = `We agree and certify that in case there is any change in the above declaration we shall promptly and without any delay whatsoever inform the Company.`;
  const content4 = `We do hereby certify that the information provided hereinabove is true, complete and any false information contained herein may constitute ground(s) for any action taken by the Company which it deems fit including criminal and / or civil action as per law.`;
  const content5 = `We agree and certify that the Company reserves the right to decide whether any violations have been committed by me in terms of this Declaration and in regard to the terms of my appointment. Further We agree and certify that, in case the Company concludes that we have violated or breached any of the terms of this Declaration, the Company can initiate appropriate legal as well as disciplinary action which shall not be limited to suspension, immediate termination, recovery of financial loss, adjustment / withholding of my dues. We agree and certify that the Company will have the right to recover any amount due to any loss (including tax impact), damage, proceeding which the Company might suffer due to this Declaration being false and the same shall be deductible from my cost to the Company.`;
  const content6 = `Signature:`;
  const content7 = `Name:`;
  const content8 = `Designation:`;
  const content9 = `Date:`;
  const date = new Date().toLocaleDateString();
  const content10 = `*Association includes close relationship with any person of authority (in such entity),shareholding or any position such as director, manager, employee or beneficial interest of any nature whatsoever`;
  const doc = new PDFDocument2({ margin: 50, size: "A4" });
  const stream = doc.pipe(blobStream());
  var fileName = `${companyName}` + "Rpd.pdf";
  let directory_name = "./pdf/" + fileName;
  const filepath = "../pdf/" + `${companyName}` + "RelatedDisclosure.pdf";

  doc.pipe(fs.createWriteStream(directory_name));
  doc.moveUp();
  doc.font("Times-Roman");
  doc.fontSize(14);
  doc.text("DECLARATION OF NO CONFLICT OF INTEREST", {
    align: "center",
  });
  doc.moveDown();
  doc.fontSize(12);
  doc
    .text(`${content1}`, {
      continued: true,
      align: "justify",
    })
    .font("Times-Bold")
    .text(`${content01}`, {
      continued: true,
      align: "justify",
    })
    .font("Times-Roman")
    .text(`${content001}`, {
      continued: false,
      align: "justify",
    });

  doc.moveDown();
  doc.fontSize(12);
  doc
    .text(`${content2}`, {
      continued: true,
      align: "justify",
    })
    .font("Times-Bold")
    .text(`${content02}`, {
      continued: true,
      align: "justify",
    })
    .font("Times-Roman")
    .text(`${content002}`, {
      continued: false,
      align: "justify",
    });

  doc.moveDown();
  doc.fontSize(8).font("Helvetica-Oblique");
  doc.text(`${content11}`, {
    align: "justify",
  });
  doc.moveDown();
  doc.moveDown();
  const table = {
    headers: [
      "Name of entity(ies) or individual(s) involved with the actual or potential conflict of interest",
      "Details of business dealing (direct or indirect) of the Company with such entity(ies) or individual(s) which might constitute as a potential or actual conflict of interest",
      "Nature of my interest (financial or beneficial) / relation / involvement with such entity(ies) or individual(s)",
    ],
    rows: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
  };
  doc.table(table, {
    columnSpacing: 10,
    padding: 10,
    columnsSize: [160, 170, 160],
    align: "justify",
    // prepareHeader: () => doc.font('Times-Roman').fontSize(10),
    prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
      const { x, y, width, height } = rectCell;
      if (indexColumn === 0) {
        doc
          .lineWidth(0.5)
          .moveTo(x, y)
          .lineTo(x, y + height)
          .stroke();
      }
      doc
        .lineWidth(0.5)
        .moveTo(x + width, y)
        .lineTo(x + width, y + height)
        .stroke();
      doc.fontSize(12).font("Times-Roman").fillColor("#292929");
    },
  });

  doc.moveDown();
  doc.font("Times-Roman");
  doc.fontSize(12);
  doc.text(`${content3}`, {
    align: "justify",
  });

  doc.moveDown();
  doc.fontSize(12);
  doc.text(`${content4}`, {
    align: "justify",
  });
  doc.moveDown();
  doc.fontSize(12);
  doc.text(`${content5}`, {
    align: "justify",
  });
  doc.moveDown();
  doc.fontSize(12);
  doc.fillColor("red");
  doc.text(`${content6}`, {
    align: "justify",
    underline: true,
  });

  doc.moveDown();
  doc.fontSize(12);
  doc.fillColor("red");
  doc.text(`${content7}`, {
    align: "justify",
    underline: true,
  });

  doc.moveDown();
  doc.fontSize(12);
  doc.fillColor("red");
  doc.text(`${content8}`, {
    align: "justify",
    underline: true,
  });

  doc.moveDown();
  doc.fontSize(12);
  doc.fillColor("red");
  doc.text(`${content9}`, {
    align: "justify",
    underline: true,
  });

  doc.moveDown();
  doc.fontSize(10);
  doc.fillColor("black");
  doc.text(`${content10}`, {
    align: "justify",
  });

  doc.end();

  doc.pipe(res);
  res.writeHead(200, {
    "Content-Type": "application/pdf",
  });
};

exports.createCompliancePdf = (req, res, next) => {
  var companyName = req.body.companyName;
  var userName = req.body.userName;
  const content1 = `We warrant and represent that we have never taken and will never take any actions in furtherance of an offer, payment, promise to pay, or authorization of the payment or giving of money,or anything else of value, to (i) any person who engages in services for national or local governments; (ii) any person who engages in services for an agency or organization affiliated with a government entity;(iii) any person who engages in services for a public enterprise or state-owned entity; 1 (iv) any person who engages in public services for an international public organization; 2 (v) any political party, party official, or candidate for political office; or (vi) any person authorized by a government entity to exercise a public function -- all of the foregoing being referred to as “Public Officers”-- or to any other person while knowing that all or some portion of the money or value was or will be offered, given or promised to a Public Officer for the purposes of obtaining or retaining business or securing any improper advantage or influencing official action.`;
  const content2 = `We agree that no part of the payments received by us from Hitachi Systems India Pvt ltd will be used for any purpose which would cause a violation of laws,including,without limitation,the anti-bribery laws of any country or jurisdiction,by Hitachi Systems India Pvt ltd.`;
  const content3 = `We agree that we will conduct our business in compliance with laws, including, without limitation, the anti-bribery laws of any country or jurisdiction.`;
  const content4 = `Furthermore, we warrant and represent that we have not, and will not, participate in other forms of misconduct, including, but not limited to, fraud, collusion, and coercion in connection with any transaction or matter associated with our relationship to Hitachi Systems India Pvt ltd.`;
  const content5 = `If we are found or reasonably suspected to be in breach of any of the certifications, Hitachi Systems India Pvt ltd shall have the right to terminate the agreement immediatelyagreement immediately, unconditionally, and without penalty, upon serving us a written notice of termination, in addition to all other rights and remedies therein.`;
  const content6 = `Date`;
  const content7 = `Signature`;
  const content8 = `Name & Designation`;
  const content9 = `Company Name`;
  const content10 = `Company Stamp & address`;
  const content11 =
    "1.A “public enterprise” is any enterprise over which one or more governments exercise dominant influence either directly or indirectly";
  const content12 =
    "2. An “international organization” is any organization comprised of one or more sovereign states, including the World Bank, the United Nations, and the Organization for Economic Cooperation and Development, as well as other similar bi-lateral and multi-lateral institutions.";
  const date = new Date().toLocaleDateString();
  const lineSize = 100;
  const signatureHeight = 390;
  const startLine1 = 145;
  const endLine1 = 135 + lineSize;
  const doc = new PDFDocument({ margin: 50, size: "A4" });
  const stream = doc.pipe(blobStream());
  var fileName = `${companyName}` + "COC.pdf";
  let directory_name = "./pdf/" + fileName;
  doc.pipe(fs.createWriteStream(directory_name));
  doc.moveUp();
  doc.font("Times-Bold");
  doc.fontSize(12);
  doc.text("Compliance Certification", {
    align: "center",
  });

  doc.moveDown();
  doc.font("Times-Roman");
  doc.fontSize(12);
  doc.text(`${content1}`, {
    align: "justify",
  });
  doc.moveDown();
  doc
    .fillColor("black")
    .text(content2.slice(0, 58), {
      continued: true,
      align: "justify",
    })
    .fillColor("black")
    .font("Times-Bold")
    .text(content2.slice(58, 88), {
      underline: true,
      continued: true,
      align: "justify",
    })
    .fillColor("black")
    .font("Times-Roman")
    .text(content2.slice(88, 240), {
      align: "justify",
      underline: false,
      continued: true,
    })
    .fillColor("black")
    .font("Times-Bold")
    .text(content2.slice(240, 272), {
      underline: true,
      align: "justify",
      continued: false,
    });

  doc.moveDown();
  doc.fontSize(12);
  doc.font("Times-Roman").text(`${content3}`, {
    align: "justify",
    continued: false,
    underline: false,
  });
  doc.moveDown();
  doc.fontSize(12);
  doc
    .font("Times-Roman")
    .text(content4.slice(0, 255), {
      align: "justify",
      continued: false,
      underline: false,
    })
    .fillColor("black")
    .font("Times-Bold")
    .text(content4.slice(255, 285), {
      underline: true,
      continued: false,
      align: "justify",
    });
  doc.moveDown();
  doc.fontSize(12);
  doc
    .font("Times-Roman")
    .text(content5.slice(0, 85), {
      align: "justify",
      continued: true,
      underline: false,
    })
    .fillColor("black")
    .font("Times-Bold")
    .text(content5.slice(85, 115), {
      underline: true,
      continued: true,
      align: "justify",
    })
    .fillColor("black")
    .font("Times-Roman")
    .text(content5.slice(115, 338), {
      underline: false,
      continued: false,
      align: "justify",
    });
  doc.moveDown();
  doc.fontSize(12);
  doc.fillColor("black");
  doc.text(`${content6}:`, {
    align: "justify",
    continued: false,
  });
  doc.moveDown();
  doc.fontSize(12);
  doc.fillColor("black");
  doc.text(`${content7}:`, {
    align: "justify",
  });
  doc.moveDown();
  doc.fontSize(12);
  doc.fillColor("black");
  doc.text(`${content8}: `, {
    align: "justify",
    continued: false,
  });

  doc.moveDown();
  doc.fontSize(12);
  doc.fillColor("black");
  doc
    .text(`${content9}:`, {
      align: "justify",
      continued: true,
    })
    .text(`${companyName}`, {
      underline: true,
    });
  doc.moveDown();
  doc.fontSize(12);
  doc.fillColor("black");
  doc.text(`${content10}:`, {
    align: "justify",
  });
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  doc.fontSize(10);
  doc.fillColor("black");
  doc.text(`${content11}:`, {
    align: "justify",
  });
  doc.moveDown();
  doc.fontSize(10);
  doc.fillColor("black");
  doc.text(`${content12}:`, {
    align: "justify",
  });
  doc.end();
  doc.pipe(res);
  res.writeHead(200, {
    "Content-Type": "application/pdf",
  });
};
exports.createnonDisclosure = async (req, res, next) => {
  var companyName = req.body.companyName;
  var userName = req.body.userName;
  var vDetails = await VdetailSchema.findOne({
    where: { userId: req.body.userId },
  });
  const date = new Date().toLocaleDateString();
  const content1 = `This Confidentiality and Non-Disclosure Agreement (“Agreement”) dated `;
  const content01 = `___________ `;
  const content001 = `is entered into by and between`;
  const content2 = `Hitachi Systems India Private Limited `;
  const content02 = `a company incorporated under the provisions of Companies Act 2013 and having its principal place of business `;
  const content002 = `at E-44/2, Okhla Industrial Area, Phase-2, New Delhi-110020 `;
  const content0002 = `(hereinafter referred to as `;
  const content00002 = `“Party.” `;
  const content000002 = `which expression shall mean and include its parent, affiliates, sister concerns, subsidiaries and assigns),`;

  const content3 = `And`;
  const content4 = `${companyName} `;
  const content04 = `The company incorporated under the provisions of Companies Act,2013 and having its principal place of business at `;
  const content004 = `${vDetails?.Address}, ${vDetails?.City}, ${vDetails?.state}, ${vDetails?.Post_Code} `;
  const content0004 = `(hereinafter referred to as `;
  const content00004 = `“Party” `;
  const content000004 = `which expression shall mean and include its parent, affiliates, sister concerns, subsidiaries, and assigns)`;
  const content5 = `Purpose

Discussion on Information Technologies  enable Software Services and supply of hardware/software/IT Services, to protect the said confidential information both the party’s desires to sign this Non- Disclosure agreement.

Disclosure of Confidential Information

Either party may disclose to the other party either orally or in any recorded medium, information comprising or relating to its / or its affiliates, parent, sister concerns group companies: techniques; schematics; designs; contracts; financial information; sales and marketing plans; business plans; clients; client data; business affairs; operations; strategies; inventions; methodologies; technologies; employees; subcontractors; pricing; service proposals; methods of operations; procedures; products and/or services ("Confidential Information”).  Confidential Information shall include all nonpublic information furnished, disclosed or transmitted regardless of form. 

Confidentiality

Either Party shall use the Confidential Information solely in furtherance of the actual or potential business relationship between the parties.  The parties shall not use the Confidential Information in any way that is directly or indirectly detrimental to the other party or its subsidiaries or affiliates, and shall not disclose the Confidential Information to any unauthorized third party. 

Parties shall ensure that access to Confidential Information is granted only to those of its employees or agents (“Representatives”) who have a demonstrated need to know such information in order to carry out the business purpose of this Agreement.  Prior to disclosing any Confidential Information to such Representatives, party shall inform them of the confidential nature of the information and their obligation to refrain from disclosure of the Confidential Information. Each party and its Representatives will take all reasonable measures to maintain the confidentiality of the Confidential Information, but in no event less than the measures it uses for its own information of similar type. Parties and its Representatives shall not disclose to any person including, without limitation, any corporation, sovereign, partnership, limited liability company, entity or individual (i) the fact that any investigations, discussions or negotiations are taking place concerning the actual or potential business relationship between the parties, (ii) that it has requested or received Confidential Information, or (iii) any of the terms, conditions or any other fact about the actual or potential business relationship.  

Each Party and its Representatives will immediately notify the other Party of any use or disclosure of the Confidential Information that is not authorized by this Agreement. Each Party and its Representatives will use its best efforts to assist the other Party in remedying any such unauthorized use or disclosure of the Confidential Information.   

Either Party shall implement and follow the rules as laid down in the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 [‘the Rules’].

Either Party shall monitor the security practices, control processes and checks in place in respect of the Confidential Information on a regular basis and disclose any breaches in the security practices, control processes and checks in place to the other Party. 


The obligations contained in this Section 2 will not apply to the extent that either Party can demonstrate that the Confidential Information: (a) was part of the public domain at the time of disclosure or properly became part of the public domain, by publication or otherwise; (b) was rightfully acquired by Receiving Party prior to disclosure by Disclosing Party; (c) was independently developed by Receiving Party or its Representatives without reference to the Confidential Information; or (d) is required to be disclosed by a government agency or by a proper court of competent jurisdiction; provided, however, that Receiving Party and its Representatives shall provide Disclosing Party prompt prior written notice of such requirement, shall consult with and assist Disclosing Party in obtaining a protective order prior to such disclosure, and shall only disclose the portion of Confidential Information which it has been advised by written opinion of counsel is legally required to be disclosed and shall use its best efforts to obtain assurance that confidential treatment will be accorded such information if the protective order is not obtained or if Disclosing Party waives disclosure of such information.  

Ownership of Materials/No Warranty

Each Party retains all rights, title and interest to its Confidential Information.  No license under any trademark, patent or copyright, or application for same which are now or thereafter may be obtained by the other Party is either granted or implied by the disclosure of Confidential Information.  Confidential Information is provided “as is” with all faults.  In no event shall parties be liable for the accuracy or completeness of the Confidential Information. 

Term

This Agreement is valid from effective date i.e. Signing Date to __FY End year_________.  Receiving Party’s obligations with respect to confidentiality shall expire after two (2) years from the date of disclosure.

Return of Confidential Information

Upon written request of either Party, Parties and its Representatives shall promptly return to the other  Party all copies of Confidential Information in its possession including, without limitation, all copies of any analyses, compilations, studies or other documents prepared by Receiving Party or its Representatives containing or reflecting any Confidential Information.  Either Party shall certify in writing that it and its Representatives have returned all such information to the other Party.  

General

a) This Agreement shall be governed by and construed in accordance with the laws India without regard to its conflicts of law provisions.  

b)	Either Party agrees that the breach of the provisions of this Agreement by any Party will cause the other Party an irreparable damage for which recovery of money damages would be inadequate.  Either Party will, therefore, be entitled to obtain timely injunctive relief to protect its rights under this Agreement in addition to any and all remedies available at law or in equity.  Receiving Party and its Representatives hereby irrevocably and unconditionally consent to submit to the exclusive jurisdiction of the courts of new Delhi, Delhi for any actions, suits or proceedings arising out of or relating to this Agreement and the transactions contemplated hereby (and agree not to commence any action, suit or proceeding relating thereto except in such courts), and further agree that service of any process, summons, notice or document by registered mail or tracked courier service to the address set forth above shall be effective service of process for any action, suit or proceeding brought against Receiving Party and its Representatives in any such court.    

c)  Neither party may assign any of its rights or obligations under this Agreement without the prior written consent of the other party.  This Agreement shall be binding upon and inure to the benefit of the parties permitted successors and assigns.

d)	This Agreement may be amended or supplemented only by a writing that is signed by duly authorized representatives of both parties.

e)	No term or provision hereof will be considered waived by either party, and no breach excused by it, unless such waiver or consent is in writing signed an authorized representative of the non-breaching party.  No consent to, or waiver of, a breach by a party, whether express or implied, will constitute a consent to, waiver of, or excuse of any other, different, or subsequent breach.

f)	If any part of this Agreement is found invalid or unenforceable, that part will be amended to achieve as nearly as possible the same economic and legal effect as the original provision and the remainder of this Agreement will remain in full force.

g)	This Agreement constitutes the entire agreement between the parties relating to this subject matter and supersedes all prior or simultaneous representations, discussions, negotiations, and agreements, whether written or oral.

h) This agreement may be executed in two counterparts, each of which shall be deemed to be an original but all of which together shall constitute one and the same agreement.`;
  const content6 = `Accepted and agreed as of the date first above written by the following authorized Party representatives:`;
  const content7 = `For Hitachi Systems India Private Limited`;
  const doc = new PDFDocument({ margin: 50, bufferPages: true });

  const stream = doc.pipe(blobStream());
  var fileName = `${companyName}` + "NDA.pdf";
  let directory_name = "./pdf/" + fileName;
  doc.pipe(fs.createWriteStream(directory_name));
  doc.moveUp();
  doc.font("Times-Bold");
  doc.fontSize(10);
  doc.text("MUTUAL CONFIDENTIALITY AND NON DISCLOSURE AGREEMENT", {
    align: "center",
  });

  doc.moveDown();
  doc.fontSize(10);
  doc.font("Times-Roman");
  doc
    .text(`${content1}`, {
      continued: true,
      align: "justify",
    })
    .font("Times-Bold")
    .text(`${content01}`, {
      continued: true,
      align: "justify",
    })
    .font("Times-Roman")
    .text(`${content001}`, {
      continued: false,
      align: "justify",
    });

  doc.moveDown();
  doc
    .fontSize(10)
    .font("Times-Bold")
    .text(`${content2}`, {
      continued: true,
      align: "justify",
    })
    .font("Times-Roman")
    .text(`${content02}`, {
      continued: true,
      align: "justify",
    })
    .font("Times-Bold")
    .text(`${content002}`, {
      continued: true,
      align: "justify",
    })
    .font("Times-Roman")
    .text(`${content0002}`, {
      continued: true,
      align: "justify",
    })
    .font("Times-Bold")
    .text(`${content00002}`, {
      continued: true,
      align: "justify",
    })
    .font("Times-Roman")
    .text(`${content000002}`, {
      continued: false,
      align: "justify",
    });

  doc.moveDown();
  doc.fontSize(10);
  doc.font("Times-Roman").text(`${content3}`, {
    align: "justify",
    continued: false,
    underline: false,
  });

  doc.moveDown();
  doc
    .fontSize(10)
    .font("Times-Bold")
    .text(`${content4}`, {
      continued: true,
      align: "justify",
    })
    .font("Times-Roman")
    .text(`${content04}`, {
      continued: true,
      align: "justify",
    })
    .font("Times-Bold")
    .text(`${content004}`, {
      continued: true,
      align: "justify",
    })
    .font("Times-Roman")
    .text(`${content0004}`, {
      continued: true,
      align: "justify",
    })
    .font("Times-Bold")
    .text(`${content00004}`, {
      continued: true,
      align: "justify",
    })
    .font("Times-Roman")
    .text(`${content000004}`, {
      continued: false,
      align: "justify",
    });

  doc.moveDown();
  doc.text(`${content5}`, {
    columns: 2,
    columnGap: 15,
    // height: 1000,
    align: "justify",
  });
  doc
    .moveDown()
    .addPage()
    .fillColor("black")
    .font("Times-Bold")
    .text(`${content6}`, {
      align: "justify",
      continued: false,
      underline: false,
    });

  let col1LeftPos = 70;
  let colTop = 120;
  let colsecondTop = 140;
  let col3Top = 160;
  let col4Top = 180;
  let colWidth = 250;
  let col2LeftPos = colWidth + col1LeftPos + 40;
  doc
    .moveDown()
    .fontSize(10)
    .text(`${content7}`, col1LeftPos, colTop, {
      width: colWidth,
      underline: true,
    })
    .text(`For ${companyName}`, col2LeftPos, colTop, {
      width: colWidth,
      underline: true,
    });
  doc
    .moveDown()
    .fontSize(10)
    .text("By:", col1LeftPos, colsecondTop, {
      width: colWidth,
      underline: true,
    })
    .text(`By:`, col2LeftPos, colsecondTop, {
      width: colWidth,
      underline: true,
    });
  doc
    .moveDown()
    .fontSize(10)
    .text("Name: Anil Kumar Sharma", col1LeftPos, col3Top, {
      width: colWidth,
      underline: true,
    })
    .text(`Name:`, col2LeftPos, col3Top, { width: colWidth, underline: true });
  doc
    .moveDown()
    .fontSize(10)
    .text("Title: Finance Controller", col1LeftPos, col4Top, {
      width: colWidth,
      underline: true,
    })
    .text(`Title:`, col2LeftPos, col4Top, { width: colWidth, underline: true });
  doc.end();

  doc.pipe(res);
  res.writeHead(200, {
    "Content-Type": "application/pdf",
  });
};

exports.getfinacialYear = (req, res) => {
  var fiscalyear = "";
  var startYear = "";
  var endYear = "";
  var today = new Date();
  if (today.getMonth() + 1 <= 3) {
    fiscalyear = today.getFullYear() - 1 + "-" + today.getFullYear();
    startYear = today.getFullYear() - 1;
    endYear = today.getFullYear();
  } else {
    fiscalyear = today.getFullYear() + "-" + (today.getFullYear() + 1);
    startYear = today.getFullYear();
    endYear = today.getFullYear() + 1;
  }
  return res.status(200).json({
    status: "success",
    message: "fiscalyear",
    fiscalyear,
    startDate: "01/04/" + startYear,
    endDate: "31/03/" + endYear,
  });
};
