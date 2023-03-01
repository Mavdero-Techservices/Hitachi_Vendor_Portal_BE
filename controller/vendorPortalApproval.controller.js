const db = require("../model");
const vendorApprovalSchema = db.vendorApproval;
const SignUpSchema = db.singUp;
let directory_name = "uploads";
const path = require("path");
var multer = require("multer");
var rejectFile1DocPath = "";
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
const excel = require('exceljs');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(directory_name, "/"));
    },
    filename: (req, file, cb) => {
      var filetype = "";
      if (file.fieldname === "rejectFileDoc") {
        if (file.mimetype === "image/gif") {
          filetype = "gif";
          rejectFile1DocPath =
            directory_name +
            "/" +
            "rejectFileDoc-" +
            Date.now() +
            "." +
            filetype;
        }
        if (file.mimetype === "image/png") {
          filetype = "png";
          rejectFile1DocPath =
            directory_name +
            "/" +
            "rejectFileDoc-" +
            Date.now() +
            "." +
            filetype;
        }
        if (file.mimetype === "image/jpeg") {
          filetype = "jpg";
          rejectFile1DocPath =
            directory_name +
            "/" +
            "rejectFileDoc-" +
            Date.now() +
            "." +
            filetype;
        }
        if (file.mimetype === "application/pdf") {
          filetype = "pdf";
          rejectFile1DocPath =
            directory_name +
            "/" +
            "rejectFileDoc-" +
            Date.now() +
            "." +
            filetype;
        }
        cb(null, "rejectFileDoc-" + Date.now() + "." + filetype);
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
    emailId
  ) => {
    var mailOptions = {
      from: user,
      to: `${emailId}`,
      subject: subject,
      html: emailContent,
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
  
  exports.emailRejectNotification = (
    req,
    res,
    subject,
    emailContent,
    returnFlag,
    emailId,
    rejectFileDoc
  ) => {
    const format = rejectFileDoc.split(".");
  
    var mailOptions = {
      from: user,
      to: `${emailId}`,
      subject: subject,
      html: emailContent,
      attachments: [
        {
          // utf-8 string as an attachment
          filename: "attachment." + format[1],
          path: rejectFileDoc,
        },
      ],
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

    exports.saveVendorApprovalStatus = (req, res) => {
        rejectFile1DocPath = "";

        var upload = multer({ storage: storage }).fields([
            { name: "rejectFileDoc", maxCount: 1 },
        ]);
        upload(req, res, async function (err) {
            var userEmailId = await SignUpSchema.findOne({
                where: { userId: req.body.userId },
              });
        if (err) {
            return "err";
        } else {
         
            const rejectFileDoc = rejectFile1DocPath;
            // const userId = req.body.userId;
            const emailId = userEmailId.emailId;
            const vendorApproval = new vendorApprovalSchema({
                userId: req.body.userId,
                vendorId: req.body.vendorId,
                vendorCode: req.body.vendorCode,
                poNo: req.body.poNo,
                itemName: req.body.itemName,
                rejectComment: req.body.rejectComment,
                rejectFileDoc: rejectFileDoc,
                vendorStatus: req.body.vendorStatus
            });
            vendorApproval.save()
                                .then((data) => {
                                    if (data.vendorStatus === "approved") {
                                        var subject = `Hitachi Vendor Approval`;
                                        var emailContent = `
                                                    <h4>Hi ${data.userId}</h4>
                                                    <p>Your Vendor portal request is approved by Vendor Creation Team and proceeded for next stage of Approval.</p>
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
                                                        <p>Your Vendor Registration request is Rejected by Vendor Creation Team because of, ${data.rejectComment}</p>
                                                        </div>`;
                                            var returnFlag = false;
                                            exports.emailRejectNotification(
                                            req,
                                            res,
                                            subject,
                                            emailContent,
                                            returnFlag,
                                            emailId,
                                            rejectFileDoc
                                            );
                                        }

                                    // return res.status(200).json({
                                    //     status: "success",
                                    //     message: "Approval Detail Saved Successfully",
                                    //     data,
                                    // });
                                })
                                .catch((err) => {
                                    return res.status(500).json({
                                    message:
                                        err.message ||
                                        "Some error occurred while creating the vendorApproval schema.",
                                    });
                                });
        }
    });
  }
  
  exports.updateVendorApprovalStatus = async (req, res) => {
   
    var vendorApprovalId = req.params.id;
      rejectFile1DocPath = "";

      var upload = multer({ storage: storage }).fields([
          { name: "rejectFileDoc", maxCount: 1 },
      ]);
      upload(req, res, async function (err) {
          var userEmailId = await SignUpSchema.findOne({
              where: { userId: req.body.userId },
            });
      if (err) {
          return "err";
      } else {
       
        const rejectFileDoc = rejectFile1DocPath;
        const emailId = userEmailId.emailId;
                          vendorApprovalSchema.update(req.body, {
                            where: { id: vendorApprovalId,vendorId: req.body.vendorId},
                          })
                            .then((data) => {
                                if (data.vendorStatus === "approved") {
                                    var subject = `Hitachi Vendor Approval`;
                                    var emailContent = `
                                                <h4>Hi ${data.userId}</h4>
                                                <p>Your Vendor portal request is approved by Vendor Creation Team and proceeded for next stage of Approval.</p>
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
                                                    <p>Your Vendor Registration request is Rejected by Vendor Creation Team because of, ${data.rejectComment}</p>
                                                    </div>`;
                                        var returnFlag = false;
                                        exports.emailRejectNotification(
                                        req,
                                        res,
                                        subject,
                                        emailContent,
                                        returnFlag,
                                        emailId,
                                        rejectFileDoc
                                        );
                                    }

                                // return res.status(200).json({
                                //     status: "success",
                                //     message: "Approval Detail Saved Successfully",
                                //     data,
                                // });
                            })
                            .catch((err) => {
                                return res.status(500).json({
                                message:
                                    err.message ||
                                    "Some error occurred while creating the vendorApproval schema.",
                                });
                            });
      }
  })

  }

  exports.getVendorApprovalList = (req, res, next) => {
    vendorApprovalSchema.findAll()
      .then((data) => {
        return res.status(200).json({ msg: "success", result: data });
      })
      .catch((err) => {
        return res
          .status(200)
          .json({ status: "error", data: { message: "Error Response", err } });
      });
  };

  exports.downloadVendorItemExcel = async (req, res, next) => {
    let vendorCode = req.params.vendorCode;
    const path = "./files";
    let vendorItemlist = await vendorApprovalSchema.findAll({where:{vendorCode:vendorCode}});
    if (vendorItemlist.length < 0) {
      return;
    }else{
      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet('Current Account Statement'); // creating worksheet

      worksheet.columns = [
        { key: 'A', width: 5.0 },
        { key: 'B', width: 30.0 },
        { key: 'C', width: 30.0 },
        { key: 'D', width: 30.0 },
        { key: 'E', width: 30.0 },
        { key: 'F', width: 30.0 },
        { key: 'G', width: 30.0 },

      ];

      worksheet.columns.forEach((col) => {
        col.style.font = {
            size: 10,
            bold: true
        };
        col.style.alignment = { vertical: 'middle', horizontal: 'center' };
        col.style.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      })

            worksheet.mergeCells('A1');
            worksheet.getCell('A1').value = "S.No";
            worksheet.getCell('A1').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('B1');
            worksheet.getCell('B1').value = "Name";
            worksheet.getCell('B1').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('C1');
            worksheet.getCell('C1').value = "Document Date";
            worksheet.getCell('C1').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('D1');
            worksheet.getCell('D1').value = "External Document No";
            worksheet.getCell('D1').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('E1');
            worksheet.getCell('E1').value = "Purchase Order No";
            worksheet.getCell('E1').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('F1');
            worksheet.getCell('F1').value = "TDS Amount";
            worksheet.getCell('F1').font = {
                size: 11,
                bold: true
            };

            worksheet.mergeCells('G1');
            worksheet.getCell('G1').value = "Remaining Amount";
            worksheet.getCell('G1').font = {
                size: 11,
                bold: true
            };

            for (let i = 0; i < 2; i++) {
              let temp = i + 2;

              worksheet.mergeCells('A' + temp);
              worksheet.getCell('A' + temp).value = i + 1;

              worksheet.mergeCells('B' + temp);
              worksheet.getCell('B' + temp).value = "HARMEEN INFONET";

              const today = new Date();
              const yyyy = today.getFullYear();
              let mm = today.getMonth() + 1;
              let dd = today.getDate();
              const formattedToday = dd + '/' + mm + '/' + yyyy;

              worksheet.mergeCells('C' + temp);
              worksheet.getCell('C' + temp).value = formattedToday;
              
              worksheet.mergeCells('D' + temp);
              worksheet.getCell('D' + temp).value = "HIP";

              worksheet.mergeCells('E' + temp);
              worksheet.getCell('E' + temp).value = "DELXXXX";

              worksheet.mergeCells('F' + temp);
              worksheet.getCell('F' + temp).value = "62.6";

              worksheet.mergeCells('G' + temp);
              worksheet.getCell('G' + temp).value = "-80,000.40";
            }

        return workbook.xlsx.write(res).then(function () {
          res['status'](200).end();
        });
        
    }
  };