const db = require("../model");
const accountStatementApprovalSchema = db.accountStatementApproval;
const SignUpSchema = db.singUp;
let directory_name = "uploads";
const path = require("path");
var multer = require("multer");
var rejectFile1DocPath = "";
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
const excel = require('exceljs');
const httpntlm = require('httpntlm');
const config = require("../config/auth.config");
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

    let randomNumber = Math.floor(100000 + Math.random() * 900000);

    let filedirect = file.originalname.split(".");

    rejectFile1DocPath =
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
  var mailOptions = {
    from: user,
    to: `${emailId}`,
    subject: subject,
    html: emailContent,
  };
  sendSmtpEmail.subject = `${subject}`;
  sendSmtpEmail.htmlContent = `${emailContent}`;
  sendSmtpEmail.sender = { name: 'Sender Name', email: 'sender@example.com' };
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
  rejectFileDoc
) => {
  const format = rejectFileDoc.split(".");

  // var mailOptions = {
  //   from: user,
  //   to: `${emailId}`,
  //   subject: subject,
  //   html: emailContent,
  //   attachments: [
  //     {
  //       // utf-8 string as an attachment
  //       filename: "attachment." + format[1],
  //       path: rejectFileDoc,
  //     },
  //   ],
  // };
  const attachment = new SibApiV3Sdk.SendSmtpEmailAttachment();
  attachment.name = "attachment." + format[1];
  attachment.content = fs.readFileSync(rejectFileDoc).toString('base64');
  sendSmtpEmail.subject = `${subject}`;
  sendSmtpEmail.htmlContent = `${emailContent}`;
  sendSmtpEmail.sender = { name: 'Sender Name', email: 'sender@example.com' };
  sendSmtpEmail.to = [{ email: `${emailId}` }];
  sendSmtpEmail.attachment = [attachment];
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
    console.log('mail sent successfully: ' + JSON.stringify(data));
  }, function (error) {
    console.error(error);
  });
};

exports.saveAccountApprovalStatus = (req, res) => {
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
      const accountApproval = new accountStatementApprovalSchema({
        userId: req.body.userId,
        vendorId: req.body.vendorId,
        vendorCode: req.body.vendorCode,
        poNo: req.body.poNo,
        itemName: req.body.itemName,
        rejectComment: req.body.rejectComment,
        rejectFileDoc: rejectFileDoc,
        vendorStatus: req.body.vendorStatus
      });
      accountApproval.save()
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

exports.updateAccountApprovalStatus = async (req, res) => {

  var accountApprovalId = req.params.id;
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
      accountStatementApprovalSchema.update(req.body, {
        where: { id: accountApprovalId, vendorId: req.body.vendorId },
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

exports.getAccountApprovalList = (req, res, next) => {
  accountStatementApprovalSchema.findAll()
    .then((data) => {
      return res.status(200).json({ msg: "success", result: data });
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
    });
};

exports.downloadAccountItemExcel = async (req, res, next) => {

  const path = "./files";

  await httpntlm.get(
    {
      url: "http://10.83.152.111:4049/NAVTestDB2/OData/Company(%27Hitachi%20Systems%20India%20Pvt%20Ltd%27)/VendorLedgerEntries?$format=json",
      username: "ERP-API",
      password: "HSI@#543DCVB",
      workstation: "",
      domain: "",
    },
    function (err, result) {
      const record = JSON.parse(result.body).value;

      if (!record) {
        return;
      } else {
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
        worksheet.getCell('G1').value = "Amount";
        worksheet.getCell('G1').font = {
          size: 11,
          bold: true
        };

        for (let i = 0; i < record.length; i++) {
          let temp = i + 2;

          worksheet.mergeCells('A' + temp);
          worksheet.getCell('A' + temp).value = i + 1;

          worksheet.mergeCells('B' + temp);
          worksheet.getCell('B' + temp).value = record[i].Vendor_Name;

          const today = new Date(record[i].Document_Date);
          const yyyy = today.getFullYear();
          let mm = today.getMonth() + 1;
          let dd = today.getDate();
          const formattedToday = dd + '/' + mm + '/' + yyyy;

          worksheet.mergeCells('C' + temp);
          worksheet.getCell('C' + temp).value = formattedToday;

          worksheet.mergeCells('D' + temp);
          worksheet.getCell('D' + temp).value = record[i].External_Document_No;

          worksheet.mergeCells('E' + temp);
          worksheet.getCell('E' + temp).value = record[i].Purchase_Order_No;

          worksheet.mergeCells('F' + temp);
          worksheet.getCell('F' + temp).value = record[i].TDS_Amt;

          worksheet.mergeCells('G' + temp);
          worksheet.getCell('G' + temp).value = record[i].Remaining_Amount;
        }

        return workbook.xlsx.write(res).then(function () {
          res['status'](200).end();
        });

      }
    }
  )





};


exports.downloadAccStateExcel = async (req, res, next) => {

  const path = "./files";

  await httpntlm.get(
    {
      url: "http://10.83.152.111:4049/NAVTestDB2/OData/Company(%27Hitachi%20Systems%20India%20Pvt%20Ltd%27)/VendorLedgerEntries?$format=json",
      username: "ERP-API",
      password: "HSI@#543DCVB",
      workstation: "",
      domain: "",
    },
    function (err, result) {
      const record = JSON.parse(result.body).value;

      if (!record) {
        return;
      } else {
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

        for (let i = 0; i < record.length; i++) {
          let temp = i + 2;

          worksheet.mergeCells('A' + temp);
          worksheet.getCell('A' + temp).value = i + 1;

          worksheet.mergeCells('B' + temp);
          worksheet.getCell('B' + temp).value = record[i].Vendor_Name;

          const today = new Date(record[i].Document_Date);
          const yyyy = today.getFullYear();
          let mm = today.getMonth() + 1;
          let dd = today.getDate();
          const formattedToday = dd + '/' + mm + '/' + yyyy;

          worksheet.mergeCells('C' + temp);
          worksheet.getCell('C' + temp).value = formattedToday;

          worksheet.mergeCells('D' + temp);
          worksheet.getCell('D' + temp).value = record[i].External_Document_No;

          worksheet.mergeCells('E' + temp);
          worksheet.getCell('E' + temp).value = record[i].Purchase_Order_No;

          worksheet.mergeCells('F' + temp);
          worksheet.getCell('F' + temp).value = record[i].TDS_Amt;

          worksheet.mergeCells('G' + temp);
          worksheet.getCell('G' + temp).value = record[i].Remaining_Amount;
        }

        return workbook.xlsx.write(res).then(function () {
          res['status'](200).end();
        });

      }
    }
  )

};


exports.emailApprovalLedgeDetails = (
  req,
  res,
  subject,
  emailContent,
  returnFlag,
  emailId
) => {
  sendSmtpEmail.subject = `${subject}`;
  sendSmtpEmail.htmlContent = `${emailContent}`;
  sendSmtpEmail.sender = { name: 'Sender Name', email: 'sender@example.com' };
  sendSmtpEmail.to = [{ email: `${emailId}` }];
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
    console.log('mail sent successfully: ' + JSON.stringify(data));
  }, function (error) {
    console.error(error);
  });
};


exports.approveAccStatementDetail = (req, res) => {

  var emailId = "abcd@gmail.com"
  var subject = `Approval Mail From Account Statement`;
  var emailContent = `<h1>Account Statement Confirmation</h1>
              <h2>Hi ${req.body.Vendor_Name}</h2>
              <table style="border-collapse: collapse;width: 100%">
              <tr>
              <th style="border: 1px solid #808080;text-align: left">Name</th>
              <th style="border: 1px solid #808080;text-align: left">Document Date</th>
              <th style="border: 1px solid #808080;text-align: left">External Document No</th>
              <th style="border: 1px solid #808080;text-align: left">Purchase Order No</th>
              <th style="border: 1px solid #808080;text-align: left">TDS No</th>
              <th style="border: 1px solid #808080;text-align: left">Remaining Amount</th>
              </tr>
  
              <tr>
              <td style="border: 1px solid #808080;text-align: left">${req.body.Vendor_Name}</td>
              <td style="border: 1px solid #808080;text-align: left">${req.body.Document_Date}</td>
              <td style="border: 1px solid #808080;text-align: left">${req.body.External_Document_No}</td>
              <td style="border: 1px solid #808080;text-align: left">${req.body.Purchase_Order_No}</td>
              <td style="border: 1px solid #808080;text-align: left">${req.body.TDS_Amt}</td>
              <td style="border: 1px solid #808080;text-align: left">${req.body.Remaining_Amount}</td>
              </tr>
    
              </table>
              </div>`;
  try {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = config.apiKey;
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = `${subject}`;
    sendSmtpEmail.htmlContent = `${emailContent}`;
    sendSmtpEmail.sender = { name: 'Sender Name', email: 'sender@example.com' };
    sendSmtpEmail.to = [{ email: `${emailId}` }];
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
      console.log('mail sent successfully: ' + JSON.stringify(data));
    }, function (error) {
      console.error(error);
    });
    return res.status(200).json({
      status: "success",
      message: "Registered Successfully",
    });
  } catch (error) {
    console.log("error::", error);
    return res.status(500).json({ error: "Server error" });
  }

}

exports.rejectAccStatementDetail = async (req, res) => {

  rejectFile1DocPath = "";

  const EntryNo = req.params.No;


  await httpntlm.get(
    {
      url: "http://10.83.152.111:4049/NAVTestDB2/OData/Company(%27Hitachi%20Systems%20India%20Pvt%20Ltd%27)/VendorLedgerEntries?$format=json",
      username: "ERP-API",
      password: "HSI@#543DCVB",
      workstation: "",
      domain: "",
    },
    function (err, result) {
      const record = JSON.parse(result.body).value;
      let ledgerIndId = record.filter((ledEntries) => {
        return ledEntries.Entry_No == EntryNo
      })
      var upload = multer({ storage: storage }).fields([
        { name: "rejectdoc", maxCount: 1 },
      ]);
      upload(req, res, function (err) {
        const comments = req.body.comment;
        const file = rejectFile1DocPath;
        const format = rejectFile1DocPath.split("/");
        var emailId = "abcd@gmail.com"
        var subject = `Rejection Mail From Account Statement`;
        var emailContent = `<h1>Account Statement Confirmation</h1>
                  <h2>Hi ${ledgerIndId[0].Vendor_Name}</h2>
                  <p>Your Reason For Rejection is ${comments}</p>
                  </div>`;
        try {
          const attachment = new SibApiV3Sdk.SendSmtpEmailAttachment();
          const defaultClient = SibApiV3Sdk.ApiClient.instance;
          const apiKey = defaultClient.authentications['api-key'];
          apiKey.apiKey = config.apiKey;
          const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
          const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
          attachment.name = "attachment." + format[1];
          attachment.content = fs.readFileSync(rejectFile1DocPath).toString('base64');
          sendSmtpEmail.attachment = [attachment];
          sendSmtpEmail.subject = `${subject}`;
          sendSmtpEmail.htmlContent = `${emailContent}`;
          sendSmtpEmail.sender = { name: 'Sender Name', email: 'sender@example.com' };
          sendSmtpEmail.to = [{ email: `${emailId}` }];
          apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
            console.log('mail sent successfully: ' + JSON.stringify(data));
          }, function (error) {
            console.error(error);
          });
          return res.status(200).json({
            status: "success",
            message: "Registered Successfully",
          });
        } catch (error) {
          console.log("error::", error);
          return res.status(500).json({ error: "Server error" });
        }
      });
    }
  );
}