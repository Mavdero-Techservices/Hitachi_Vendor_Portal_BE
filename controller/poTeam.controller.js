const config = require("../config/auth.config");
const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = config.apiKey;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
const db = require("../model");
const pOSchema = db.pO;
const httpntlm = require('httpntlm');
let directory_name = "uploads";
const path = require("path");
const multer = require('multer');
const axios = require('axios');
//files Set up storage for uploaded 
let randomNumber = Math.floor(100000 + Math.random() * 900000);

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, 'rejectpodoc-' + Date.now() + ext);
  }
});


const upload = multer({ storage: storage });


//savePO
exports.savePo = (req, res) => {
  const Po = {
    Document_Type: req.body.Document_Type,
    No: req.body.No,
    Order_Date:req.body.Order_Date,
    Payment_Terms_Code:req.body.Payment_Terms_Code,
    Buy_from_Vendor_Name:req.body.Buy_from_Vendor_Name,
    Customer_Name:req.body.Customer_Name,
    Buy_from_Vendor_No:req.body.Buy_from_Vendor_No,
    Ship_to_Name:req.body.Ship_to_Name,
    Amount_to_Vendor:req.body.Amount_to_Vendor,
    Billed_Amount:req.body.Billed_Amount,
    Unbilled_Amount:req.body.Unbilled_Amount,
    level1ApprovalStatus:req.body.level1ApprovalStatus,
    Posting_Date:req.body.Posting_Date,
};
console.log("status::",Po.level1ApprovalStatus);
if(Po.level1ApprovalStatus==="Approved")
{
  pOSchema.findOne({ where: { No: Po.No } })
  .then(polist => {
    if(!polist)
    {
      pOSchema.create(Po)
      .then(data => {
        const email = req.body.email;
        const username = req.body.username;
        var subject = `Hitachi PO Approval`;
        var emailContent = `
          <h4>Hi ${username}</h4>
          <p>Po team approved ${Po.Buy_from_Vendor_Name} request and proceeded for the next stage of Approval.</p>
          <p>Thanks & regards,</p>
        `;
        exports.PoApprovalMail(
          req,
          res,
          subject,
          emailContent,
          email
        );
          return res.status(200).json({ msg: "success", result: "Approved" });
      })
      .catch(err => {
          return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
      });
    }
    else
    {
      return res.status(200).json({ msg: "success", result: `Already ${Po.level1ApprovalStatus}` });
    }
  
  }).catch(err => {
          return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
      });
}
else
{
  upload.single('level1rejectpodoc')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log('Multer Error:', err);
      res.status(400).json({ error: 'File upload error' });
    } else if (err) {

      console.log('Error:', err);
      res.status(500).json({ error: 'Server error' });
    } else {
 
      const { level1rejectpodoc, level1ApprovalStatus,comment,No } = req.body;
      const uploadedFile = req.file; 

     
      console.log('rejectDoc:',level1rejectpodoc);
      console.log('ApprovalStatus:', level1ApprovalStatus);
      console.log('uploadedFile:', uploadedFile);

      // Construct the full file path
      const filePath = path.join(directory_name, uploadedFile.filename);
      pOSchema.findOne({ where: { No: req.body.No } })
      .then(polist => {
        if(!polist)
        {
          pOSchema.create(  { Document_Type: req.body.Document_Type,
            No: req.body.No,
            Order_Date:req.body.Order_Date,
            Payment_Terms_Code:req.body.Payment_Terms_Code,
            Buy_from_Vendor_Name:req.body.Buy_from_Vendor_Name,
            Customer_Name:req.body.Customer_Name,
            Buy_from_Vendor_No:req.body.Buy_from_Vendor_No,
            Ship_to_Name:req.body.Ship_to_Name,
            Amount_to_Vendor:req.body.Amount_to_Vendor,
            Billed_Amount:req.body.Billed_Amount,
            Unbilled_Amount:req.body.Unbilled_Amount,
            level1ApprovalStatus:req.body.level1ApprovalStatus,
            Posting_Date:req.body.Posting_Date,
            level1rejectpodoc:filePath,
             })
            .then(data => {
              var email="apitestmail4@gmail.com"
              var subject = `Hitachi Vendor Request Rejected`;
              var emailContent = `
                          <h4>Hi</h4>
                          <p>PO request is Rejected by Purchase Team because of, ${comment}</p>
                          </div>`;
                     exports.mailRejectPo_Order(
                  req,
                  res,
                  subject,
                  emailContent,
                  email,
                  filePath
                );
    
              return res.status(200).json({ msg: "success", result: "rejected" });
            })
            .catch(err => {
              return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
            });
        }
        else
    {
      return res.status(200).json({ msg: "success", result: `Already ${req.body.level1ApprovalStatus}` });
    }
  
  }).catch(err => {
          return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
      });
     
   
    }
  });
}


}
//updateFinanceInvoiceApproval
exports.updateFinanceInvoiceApproval = (req, res) => {
const No=req.body.No;
const level2ApprovalStatus=req.body.level2ApprovalStatus;
  pOSchema.findOne({ where: { No:No } })
  .then(polist => {
    if (polist) {
      pOSchema.update(
        { level2ApprovalStatus: level2ApprovalStatus },
        { where: { No: No } }
      ) .then(updateFinanceInvoice => {
        console.log("update::",updateFinanceInvoice);
        const email = req.body.email;
        const username = req.body.username;
        var subject = `Hitachi PO Approval`;
        var emailContent = `
          <h4>Hi ${username}</h4>
          <p>Finance team approved ${polist.Buy_from_Vendor_Name} request</p>
          <p>Thanks & regards,</p>
        `;
        exports.PoApprovalMail(
          req,
          res,
          subject,
          emailContent,
          email
        );
        return res.status(200).json({ msg: "success", result: "Approved" });
      }).catch(err => {
        return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
    });
    }
    else {
    }
  }) .catch(err => {
    return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
});
}
exports.updateFinanceInvoiceReject = (req, res) => {
  const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, 'level2rejectpodoc-' + Date.now() + ext);
    }
  });
  
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      if (file.mimetype === 'application/pdf') {
        cb(null, true);
      } else {
        cb(new Error('Unsupported file format. Only PDF files are allowed.'));
      }
    }
  });
  upload.single('level2rejectpodoc')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log('Multer Error:', err);
      res.status(400).json({ error: 'File upload error' });
    } else if (err) {

      console.log('Error:', err);
      res.status(500).json({ error: 'Server error' });
    } else {
 
      const { level2rejectpodoc, level2ApprovalStatus,comment,No } = req.body;
      const uploadedFile = req.file; 

     
      console.log('rejectDoc:',level2rejectpodoc);
      console.log('ApprovalStatus:', level2ApprovalStatus);
      console.log('uploadedFile:', uploadedFile);

      // Construct the full file path
      const filePath = path.join(directory_name, uploadedFile.filename);
      pOSchema.findOne({ where: { No: req.body.No } })
      .then(polist => {
        console.log("level2ApprovalStatus",level2ApprovalStatus);
        pOSchema.update(
          { level2ApprovalStatus: level2ApprovalStatus },
          { where: { No: No } }
        )
          .then(data => {
            console.log("data::",data);
            var email="apitestmail4@gmail.com"
            var subject = `Hitachi Purchase Order Request Rejected`;
            var emailContent = `
                        <h4>Hi</h4>
                        <p>PO request is Rejected by Finance Team because of, ${comment}</p>
                        </div>`;
                   exports.mailRejectPo_Order(
                req,
                res,
                subject,
                emailContent,
                email,
                filePath
              );
  
            return res.status(200).json({ msg: "success", result: "rejected" });
          })
          .catch(err => {
            return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
          });
  
  }).catch(err => {
          return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
      });
     
   
    }
  });

}
exports.updatePo = async (req, res) => {
  const level2ApprovalStatus = req.params.level2ApprovalStatus;
  const No = req.params.No;

  try {
    const po = await pOSchema.findOne({ where: { No: No } });
    if (!po) {
      return res.status(404).json({ status: 'error', data: { message: 'PO not found' } });
    }

    await pOSchema.update(
      { level2ApprovalStatus: level2ApprovalStatus },
      { where: { No: No } }
    );

    console.log("Updated successfully");
    const response = await axios.get(`http://localhost:12707/getUpdatePoPage/${level2ApprovalStatus}/${No}`);
    const html = response.data;

    // Send the HTML page or response
    res.status(200).send(html);
  } catch (error) {
    console.error("Error updating PO:", error);
    return res.status(500).json({ status: 'error', data: { message: 'Error updating PO' } });
  }
};


exports.getUpdatePoPage = (req, res) => {
  const { level2ApprovalStatus, No } = req.params;
  const html = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-size: 20px;
          }

          .message {
            max-width: 80%;
            text-align: center;
            margin: 20px;
          }

          .success {
            font-weight: bold;
          }

          a {
            color: blue;
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="message">
          <p>Invoice for PO-${No} successfully ${level2ApprovalStatus}.</p>
        </div>
      </body>
    </html>
  `;

  // Send the HTML page or response
  res.status(200).send(html);
};
exports.getUpdateInvoicePage = (req, res) => {
  const { level1ApprovalStatus, No } = req.params;
  const html = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-size: 20px;
          }

          .message {
            max-width: 80%;
            text-align: center;
            margin: 20px;
          }

          .success {
            font-weight: bold;
          }

          a {
            color: blue;
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="message">
          <p>Invoice for PO-${No} successfully ${level1ApprovalStatus}.</p>
        </div>
      </body>
    </html>
  `;

  // Send the HTML page or response
  res.status(200).send(html);
};
exports.updatePoInvoice=async (req, res) => {
  const level1ApprovalStatus = req.params.level1ApprovalStatus;
  const No = req.params.No;

  try {
    const po = await pOSchema.findOne({ where: { No: No } });
    if (!po) {
      return res.status(404).json({ status: 'error', data: { message: 'PO not found' } });
    }

    await pOSchema.update(
      { level1ApprovalStatus: level1ApprovalStatus },
      { where: { No: No } }
    );

    console.log("Updated successfully");
    const response = await axios.get(`http://localhost:12707/getUpdatePoPage/${level1ApprovalStatus}/${No}`);
    const html = response.data;

    // Send the HTML page or response
    res.status(200).send(html);
  } catch (error) {
    console.error("Error updating PO:", error);
    return res.status(500).json({ status: 'error', data: { message: 'Error updating PO' } });
  }
}

// exports.updatePo = (req, res) => {
//   console.log("Update::")

//   if (ApprovalStatus === 'Approved') {
//     pOSchema.findOne({ where: { No: No } })
//       .then(po => {
//         pOSchema.update(
//           { ApprovalStatus: ApprovalStatus },
//           { where: { No: No } }
//         )
//           .then(data => {
//             const email = req.body.email;
//             const username = req.body.username;
//             var subject = `Hitachi PO Approval`;
//             var emailContent = `
//               <h4>Hi ${username}</h4>
//               <p>Po team approved your request and proceeded for the next stage of Approval.</p>
//               <p>Thanks & regards,</p>
//             `;
//             exports.PoApprovalMail(
//               req,
//               res,
//               subject,
//               emailContent,
//               email
//             );

//             return res.status(200).json({ msg: "success", result: "Approval updated successfully" });
//           })
//           .catch(err => {
//             return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
//           });
//       })
//       .catch(err => {
//         return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
//       });
//   }
//    else if (ApprovalStatus === 'Rejected') {
//     console.log("reject:::", level1rejectpodoc);
 
  
//   }
// };
  



exports.getPo = (req, res) => {
  pOSchema.findAll()
  .then(data => {
      return res.status(200).json({ msg: "success", result: data });
  })
  .catch(err => {
      return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
  });
}
//getMailIdbyvendorNo
exports.getMailIdbyvendorNo = (req, res) => {
  const No = req.params.No;
  pOSchema.findOne({
    where: {
      No: No,
    },
  })
      .then(data => {
        console.log("Buy_from_Vendor_No",data.Buy_from_Vendor_No);
        const Vendor_No = data.Buy_from_Vendor_No;
        httpntlm.get({
           url: "http://10.83.152.111:4049/NAVTestDB2/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/ResourcePortalVendorlist1?$format=json&$filter=Vendor_No eq '" + Vendor_No + "'",
           username: 'ERP-API',
           password: 'HSI@#543DCVB',
           workstation: '',
           domain: '',
           headers: {
             'Content-Type': 'application/json',
             'Accept': 'application/json;odata.metadata=minimal',
             'User-Agent': 'nodejs/httpntlm',
           }
         }, function(err, result) {
           if (err) {
             console.error(err);
           } else {
            console.log(result.body);
             const record = JSON.parse(result.body).value[0];
           res.writeHead(200, { 'Content-Type': 'application/json' });
           res.end(JSON.stringify(record));
           }
         });

      })
      .catch(err => {
          return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
      });
};

//Polevel1Approval
exports.PoApprovalMail = (req, res,subject,
  emailContent,
  email) => {              
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = emailContent;
    sendSmtpEmail.sender = { name: "Sender Name", email: "sender@example.com" };
    sendSmtpEmail.to = [{ email: email }];
  
    apiInstance.sendTransacEmail(sendSmtpEmail)
      .then(function (data) {
        console.log("Mail sent successfully: " + JSON.stringify(data));

      })
      .catch(function (error) {
        console.error(error);
        return res.status(200).json({
            status: "error",
            data: { message: error },
          });
      });
}


exports.mailApprovedInvoice = (req, res) => {
   
    return res.status(200).header('Content-Type', 'text/html').send(`
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              font-size:20px;
            }
    
            .message {
              max-width: 80%;
              text-align: center;
              margin: 20px;
            }
    
            .success {
              font-weight: bold;            
            }
    
            a {
              color: blue;
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="message">
            <p>Invoice for PO-<span class="success">successfully Approved.</span></p>
          </div>
        </body>
      </html>
    `);

}
exports.mailRejectInvoice = (req, res) => {
  const No = req.params.No;
  return res.status(200).header('Content-Type', 'text/html').send(`
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          /* Your CSS styles for the popup and success message */
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-size: 20px;
          }

          .popup {
            max-width: 80%;
            text-align: center;
            margin: 20px;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 5px;
          }

          .success {
            font-weight: bold;            
          }

          .comment-input {
            width: 100%;
            margin: 10px 0;
            padding: 5px;
          }

          .document-input {
            width: 100%;
            margin: 10px 0;
            padding: 5px;
          }

          .submit-button {
            background-color: red;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          .submit-button:hover {
            background-color: #45a049;
          }

          .success-popup {
            display: none;
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            border-radius: 5px;
            margin-top: 10px;
          }

          .show-popup {
            display: block;
          }
          .error-popup
          {
            color: red;
          }
        </style>
      </head>
      <body>
        <div class="popup">
          <p><span class="success">Reject Reason</span></p>
          <div id="errorPopup" class="error-popup"></div>
          <input type="text" class="comment-input" placeholder="Reject Reason">
          <input type="file" class="document-input" placeholder="Reject Document">
          <button class="submit-button" onclick="submitComment()">Reject</button>
          <div id="successPopup" class="success-popup"></div>
        </div>

        <script>
        function submitComment() {
          const comment = document.querySelector('.comment-input').value;
          const fileInput = document.querySelector('.document-input');
          if (comment.trim() === '' && fileInput.files.length === 0) {
            showErrorPopup('Please enter a reject reason and select a file');
            return;
          }
          if (comment.trim() === '') {
            showErrorPopup('Please give Comments');
            return;
          }
          if (fileInput.files.length === 0) {
            showErrorPopup('Please Upload File');
            return;
          }
          // Check if a file is selected
          if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const formData = new FormData();
            formData.append('comment', comment);
            formData.append('document', file, file.name); // Include the file and its name
            formData.append('No', '${No}');
            
            fetch('/updateRejectInvoice', {
              method: 'POST',
              body: formData
            })
              .then(response => {
                if (response.ok) {
                  showSuccessPopup();
                } else {
                  throw new Error('Failed to submit the rejection');
                }
              })
              .catch(error => {
                console.error(error);
              });
          } else {
            console.error('No file selected');
          }
        }
        function showErrorPopup(message) {
          var errorPopup = document.getElementById('errorPopup');
          errorPopup.classList.add('show-popup');
          errorPopup.textContent = message;
        
          setTimeout(function() {
            errorPopup.classList.remove('show-popup');
          }, 3000);
        }

          function showSuccessPopup() {
            var successPopup = document.getElementById('successPopup');
            successPopup.classList.add('show-popup');
            successPopup.textContent = 'Rejected successfully!';

            setTimeout(function() {
              successPopup.classList.remove('show-popup');
              window.location.href = 'http://localhost:3000';
            }, 3000);
          }
        </script>
      </body>
    </html>
  `);
};



 const fs = require('fs');

  exports.mailRejectPo_Order = (req, res,subject,
    emailContent,
    email,filePath) => {   
      console.log("file::",filePath)           
      if (filePath){
        const format = filePath.split(".");
        const attachment = new SibApiV3Sdk.SendSmtpEmailAttachment();
        attachment.name = "attachment." + format[1];
        attachment.content = fs.readFileSync(filePath).toString('base64');
        sendSmtpEmail.subject = `${subject}`;
        sendSmtpEmail.htmlContent = `${emailContent}`;
        sendSmtpEmail.sender = { name: 'Sender Name', email: 'sender@example.com' };
        sendSmtpEmail.to = [{ email: `${email}` }];
        sendSmtpEmail.attachment = [attachment];
        apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
          console.log('mail sent successfully: ' + JSON.stringify(data));
        }, function(error) {
          console.error(error);
        });
      }else{
        sendSmtpEmail.subject = `${subject}`;
        sendSmtpEmail.htmlContent = `${emailContent}`;
        sendSmtpEmail.sender = { name: 'Sender Name', email: 'sender@example.com' };
        sendSmtpEmail.to = [{ email: `${email}` }];
        apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
          console.log('mail sent successfully: ' + JSON.stringify(data));
        }, function(error) {
          console.error(error);
        });
      }
  }

  exports.mailApproveFinance_order = (req, res
 ) => { 
  console.log("req::",req.body);
  const tableContent = `
  <table style="border-collapse: collapse; border: 1px solid black; border-radius:10px;">
    <thead>
      <tr>
        <th style="border: 1px solid black; padding: 5px;">PO Number</th>
        <th style="border: 1px solid black; padding: 5px;">PO Date</th>
        <th style="border: 1px solid black; padding: 5px;">Payment Terms</th>
        <th style="border: 1px solid black; padding: 5px;">Vendor Address</th>
        <th style="border: 1px solid black; padding: 5px;">Customer Name</th>
        <th style="border: 1px solid black; padding: 5px;">Bill to</th>
        <th style="border: 1px solid black; padding: 5px;">Ship to</th>
        <th style="border: 1px solid black; padding: 5px;">Total Po Amt</th>
        <th style="border: 1px solid black; padding: 5px;">Billed amt</th>
        <th style="border: 1px solid black; padding: 5px;">Unbilled amt</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid black; padding: 5px;">${req.body.No}</td>
        <td style="border: 1px solid black; padding: 5px;">${req.body.Order_Date}</td>
        <td style="border: 1px solid black; padding: 5px;">${req.body.Payment_Terms_Code}</td>
        <td style="border: 1px solid black; padding: 5px;">${req.body.Buy_from_Vendor_Name}</td>
        <td style="border: 1px solid black; padding: 5px;">${req.body.Customer_Name}</td>
        <td style="border: 1px solid black; padding: 5px;">${req.body.Buy_from_Vendor_No}</td>
        <td style="border: 1px solid black; padding: 5px;">${req.body.Ship_to_Name}</td>
        <td style="border: 1px solid black; padding: 5px;">${req.body.Amount_to_Vendor}</td>
        <td style="border: 1px solid black; padding: 5px;">${req.body.Billed_Amount}</td>
        <td style="border: 1px solid black; padding: 5px;">${req.body.Unbilled_Amount}</td>
      </tr>
    </tbody>
  </table>
`;
    const approveButton = `
    <a href="http://localhost:12707/updatePo/Approved/${req.body.No}" target="_blank" style="text-decoration: none;">
    <button style="background-color: green;border:none;border-radius:15px; color: white; padding: 10px;">Approve</button>
    </a>
  `;

  const rejectButton = `
  <a href="http://localhost:12707/updatePo/Approved/${req.body.No}" target="_blank" style="text-decoration: none;">
    <button style="background-color: red;border:none;border-radius:15px; color: white; padding: 10px;">Reject</button>
    </a>
  `;
  const emailContent="test"
  sendSmtpEmail.subject = "hi";
  sendSmtpEmail.htmlContent = `${emailContent}<br>${tableContent}<br>${approveButton} ${rejectButton}`; 
  sendSmtpEmail.sender = { name: 'Sender Name', email: 'sender@example.com' };
  sendSmtpEmail.to = [{ email: "apitestmail4@gmail.com" }];

  apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
    console.log('Mail sent successfully: ' + JSON.stringify(data));
    return res.status(200).json({ status: 'success', data: { message: 'sent' } });
  }, function(error) {
    console.error(error);
  });
    }

    exports.mailApprovePo_Invoice = (req, res
      ) => { 
       console.log("req::",req.body);
       const tableContent = `
       <table style="border-collapse: collapse; border: 1px solid black; border-radius:10px;">
         <thead>
           <tr>
             <th style="border: 1px solid black; padding: 5px;">PO Number</th>
             <th style="border: 1px solid black; padding: 5px;">PO Date</th>
             <th style="border: 1px solid black; padding: 5px;">Payment Terms</th>
             <th style="border: 1px solid black; padding: 5px;">Vendor Address</th>
             <th style="border: 1px solid black; padding: 5px;">Customer Name</th>
             <th style="border: 1px solid black; padding: 5px;">Bill to</th>
             <th style="border: 1px solid black; padding: 5px;">Ship to</th>
             <th style="border: 1px solid black; padding: 5px;">Total Po Amt</th>
             <th style="border: 1px solid black; padding: 5px;">Billed amt</th>
             <th style="border: 1px solid black; padding: 5px;">Unbilled amt</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <td style="border: 1px solid black; padding: 5px;">${req.body.No}</td>
             <td style="border: 1px solid black; padding: 5px;">${req.body.Order_Date}</td>
             <td style="border: 1px solid black; padding: 5px;">${req.body.Payment_Terms_Code}</td>
             <td style="border: 1px solid black; padding: 5px;">${req.body.Buy_from_Vendor_Name}</td>
             <td style="border: 1px solid black; padding: 5px;">${req.body.Customer_Name}</td>
             <td style="border: 1px solid black; padding: 5px;">${req.body.Buy_from_Vendor_No}</td>
             <td style="border: 1px solid black; padding: 5px;">${req.body.Ship_to_Name}</td>
             <td style="border: 1px solid black; padding: 5px;">${req.body.Amount_to_Vendor}</td>
             <td style="border: 1px solid black; padding: 5px;">${req.body.Billed_Amount}</td>
             <td style="border: 1px solid black; padding: 5px;">${req.body.Unbilled_Amount}</td>
           </tr>
         </tbody>
       </table>
     `;
         const approveButton = `
         <a href="http://localhost:12707/updatePo/Approved/${req.body.No}" target="_blank" style="text-decoration: none;">
         <button style="background-color: green;border:none;border-radius:15px; color: white; padding: 10px;">Approve</button>
         </a>
       `;
     
       const rejectButton = `
       <a href="http://localhost:12707/mailRejectInvoice/${req.body.No}" target="_blank" style="text-decoration: none;">
         <button style="background-color: red;border:none;border-radius:15px; color: white; padding: 10px;">Reject</button>
         </a>
       `;
       const emailContent="test"
       sendSmtpEmail.subject = "hi";
       sendSmtpEmail.htmlContent = `${emailContent}<br>${tableContent}<br>${approveButton} ${rejectButton}`; // Include the table and buttons in the email content
       sendSmtpEmail.sender = { name: 'Sender Name', email: 'sender@example.com' };
       sendSmtpEmail.to = [{ email: "apitestmail4@gmail.com" }];
     
       apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
         console.log('Mail sent successfully: ' + JSON.stringify(data));
         return res.status(200).json({ status: 'success', data: { message: 'sent' } });
       }, function(error) {
         console.error(error);
       });
         }
         exports.updateRejectInvoice = (req, res) => {
          const upload = multer({ storage: storage }).single('document');
        
          upload(req, res, function (err) {
            if (err) {
              return res.status(200).json({ status: 'error', data: { message: 'Failed to upload file' } });
            }     
            const { comment, No } = req.body;
            const document = req.file;
            pOSchema
              .findOne({
                where: {
                  No: No,
                },
              })
              .then(data => {
                console.log("vendorNo::",data.Buy_from_Vendor_No);
                pOSchema.update(
                  { level2ApprovalStatus: "Rejected" },
                  { where: { No: No } }
                ) .then(data => {
                  return res.status(200).json({ status: 'Success', data: { message: 'updated successfully'} });

                }).catch(err => {
                  return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
                });
              })
              .catch(err => {
                return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
              });
          });
        };
        
//sendRejectReasonToVendor       
