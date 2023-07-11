const db = require("../model");
const VdetailSchema = db.vdetail;
const ApprovalSchema = db.approvalStatus;
const SignUpSchema = db.singUp;
const vendorCommunicationDetails = db.vendorCommunicationDetails;
const { check, validationResult } = require("express-validator");
var geoCountryZipCode = require("geonames-country-zipcode-lookup");
const { getData } = require("country-list");
const config = require("../config/auth.config");
const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = config.apiKey;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

exports.postNewRegVdetail = async (req, res, next) => {
  const masterId = req.body.userId;
  let masterEmail = "";
  let master = await SignUpSchema.findOne({
    where: {
      userId: req.body.userId,
    },
  });

  const contactPerson = "user";
  // const userId =
  //   `${contactPerson}` + Math.floor(100000 + Math.random() * 900000);
  const subUserid = `${masterId}` + Math.floor(100000 + Math.random() * 900000);
  const userName = contactPerson + Math.floor(100000 + Math.random() * 900000);
  const Ticket_ID = "VCR" + Math.floor(100000 + Math.random() * 900000);
  // const role = "master";
  // const password = 'pass';
  // bcrypt.hash(password, 12).then((hashedPassword) => {
  const user = new SignUpSchema({
    emailId: master ? master.emailId : null,
    // userId: userId,
    userType: masterId,
    // subUserId: masterId,
    userId: subUserid,
    companyName: master ? master.companyName : "",
    // userName: userName,
    // password: hashedPassword,
    // confirmPassword: hashedPassword,
    role: "user",
    Ticket_ID: Ticket_ID,
  });
  user
    .save()

    .then((data) => {
      // return res.status(200).json({ msg: "success", result: data });
      // if (data.dataValues.userId) {
      //   const VendorDetails = new VdetailSchema({
      //     Address: req.body.Address,
      //     Address_2: req.body.Address_2,
      //     City: req.body.City,
      //     state: req.body.state,
      //     Country_Region_Code: req.body.Country_Region_Code,
      //     Post_Code: req.body.Post_Code,
      //     contactName: req.body.contactName,
      //     companyName: req.body.companyName,
      //     image: req.body.image,
      //     Vendor_Type: req.body.Vendor_Type,
      //     Vendor_Account_Manager: req.body.Vendor_Account_Manager,
      //     mkDenialCheque: req.body.mkDenialCheque,
      //     userId: data.dataValues.userId,
      //     submitStatus: req.body.submitStatus,
      //     submitDate: req.body.submitDate,
      //   });
      //   VendorDetails.save()
      // .then((data) => {
      return res.status(200).json({
        status: "success",
        result: data,
        message: "Vendor details saved Successfully",
      });
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ status: "error", err, message: "Error Response" });
    });
}
    // })
    // .catch((err) => {
    //   return res.status(200).json({
    //     status: "error",
    //     data: { message: "Error Response", err },
    //   });
    // });
// };

exports.postVdetail = (req, res, next) => {
  const userId = req.body.userId;
  const Address = req.body.Address;
  const Address_2 = req.body.Address_2;
  const Country_Region_Code = req.body.Country_Region_Code;
  const state = req.body.state;
  const City = req.body.City;
  const Post_Code = req.body.Post_Code;
  const contactName = req.body.contactName;
  const companyName = req.body.companyName;
  const image = req.body.image;
  const Vendor_Type = req.body.Vendor_Type;
  const Vendor_Account_Manager = req.body.Vendor_Account_Manager;
  const mkDenialCheque = req.body.mkDenialCheque;
  const submitStatus = req.body.submitStatus;
  const submitDate = req.body.submitDate;
  const userStatus = req.body.userStatus;

  VdetailSchema.findOne({
    where: {
      userId: userId,
    },
  }).then(async (user) => {
    if (!user) {
      console.log("save api call");
      const VendorDetails = new VdetailSchema({
        Address: Address,
        Address_2: Address_2,
        City: City,
        state: state,
        Country_Region_Code: Country_Region_Code,
        Post_Code: Post_Code,
        contactName: contactName,
        companyName: companyName,
        image: image,
        Vendor_Type: Vendor_Type,
        Vendor_Account_Manager: Vendor_Account_Manager,
        mkDenialCheque: mkDenialCheque,
        userId: userId,
        submitStatus: submitStatus,
        submitDate: submitDate,
        userStatus: userStatus
      });
      VendorDetails.save()
        .then((data) => {
          return res.status(200).json({
            status: "success",
            data,
            message: "Vendor details saved Successfully",
          });
        })
        .catch((err) => {
          return res
            .status(404)
            .json({ status: "error", err, message: "Error Response" });
        });
    } else {
      console.log("call update Api:::");
    }
  });
};

//SaveVendorCommunication
exports.SaveVendorCommunication = (req, res) => {
  console.log("req", req.body);
  vendorCommunicationDetails
    .findOne({
      where: {
        userId: req.body.userId,
        // id: req.body.id,
      },
    })
    .then(async (user) => {
      if (!user) {
        const VendorCommunication = {
          financeSpoccontactName: req.body.financeSpoccontactName,
          financeSpocdesignation: req.body.financeSpocdesignation,
          financeSpocphoneNo: req.body.financeSpocphoneNo,
          financeSpocemail: req.body.financeSpocemail,
          operationSpoccontactName: req.body.operationSpoccontactName,
          operationSpocdesignation: req.body.operationSpocdesignation,
          operationSpocphoneNo: req.body.operationSpocphoneNo,
          operationSpocemail: req.body.operationSpocemail,
          collectionSpoccontactName: req.body.collectionSpoccontactName,
          collectionSpocdesignation: req.body.collectionSpocdesignation,
          collectionSpocphoneNo: req.body.collectionSpocphoneNo,
          collectionSpocemail: req.body.collectionSpocemail,
          managementSpoccontactName: req.body.managementSpoccontactName,
          managementSpocdesignation: req.body.managementSpocdesignation,
          managementSpocphoneNo: req.body.managementSpocphoneNo,
          managementSpocemail: req.body.managementSpocemail,
          contactName: req.body.contactName,
          designation: req.body.designation,
          phoneNo: req.body.phoneNo,
          email: req.body.email,
          userId: req.body.userId,
          mastervendor_email: req.body.mastervendor_email,
        };
        vendorCommunicationDetails
          .create(VendorCommunication)
          .then((data) => {
            return res.status(200).json({ msg: "success", result: data });
          })
          .catch((err) => {
            return res.status(200).json({
              status: "error",
              data: { message: "Error Response", err },
            });
          });
      } else {
        const userId = req.body.userId;
        const updates = req.body;

        // check if there are any empty fields
        for (const key in updates) {
          if (!updates[key]) {
            updates[key] = null;
          }
        }
        const updateResult = await vendorCommunicationDetails.update(req.body, {
          where: { userId },
        });

        if (updateResult[0]) {
          return res.status(200).json({
            msg: "success",
            result: "Communication details updated successfully",
          });
        } else {
          res.status(404).json({
            msg: "error",
            result: "Vendor not found",
          });
        }
      }
    });
};

//getCountry
exports.getCountry = (req, res, next) => {
  var country = getData();
  return res.status(200).json({ status: "success", data: country });
};
const axios = require("axios");
//getState&cityByzipcode
exports.getStateAndcityByzipcode = async (req, res, next) => {
 
  try {
    const code = req.params.code;
    const Post_Code = req.params.Post_Code;
    const url = `http://api.geonames.org/postalCodeLookupJSON?postalcode=${Post_Code}&country=${code}&username=karthiga&style=full`;

    const result = await axios.get(url);
    const codes = result.data.postalcodes;


    const filteredCodes = codes.filter((item) => {
      return item.postalcode === Post_Code
    })

    return res.json({ status: "success", postalcodes: filteredCodes });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

var nodemailer = require("nodemailer");
// const config = require("../config/auth.config");
// const user = config.user;
// const pass = config.pass;

// var transporter = nodemailer.createTransport({
//   service: "gmail",
//   // host: "smtp.office365.com",
//   // service: "Outlook365",
//   auth: {
//     user: user,
//     pass: pass,
//   },
// });

let transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: 'apitestmail4@gmail.com',
    pass: 'gmlubwghcqtqkldm'
  }
});

exports.emailSubmitNotification = async (
  req,
  res,
  subject,
  emailContent,
  returnFlag,
  emailId
) => {
  try {
    sendSmtpEmail.subject = `${subject}`;
    sendSmtpEmail.htmlContent = `${emailContent}`;
    sendSmtpEmail.sender = {
      name: config.name,
      email:config.email,
    };
    sendSmtpEmail.to = [{ email: `${emailId}` }];
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
      console.log('mail sent successfully: ' + JSON.stringify(data));
    }, function (error) {
      console.error(error);
    });
  } catch (error) {
    return res.status(200).json({ status: "error", data: error });
  }
};

exports.updateVendor = async (req, res) => {
  console.log("req--->", req.body);
  const userId = req.params.userId;
  const updates = req.body;
  const vendorExists = await VdetailSchema.findOne({
    where: { userId: userId },
  });

  if (!vendorExists) {
    return res.status(200).json({
      status: "error",
      message: "Vendor not found",
    });
  }
  if (req.body.submitStatus === "Submitted") {

    var submitEmailId = await SignUpSchema.findOne({
      where: { userId: req.params.userId },
    });
    console.log("emailID::", submitEmailId);

    const emailId = submitEmailId.emailId;
    var subject = `Hitachi Vendor Creation Submit Status`;
    var emailContent = `
                        <h4>Hi ${userId}</h4>
                        <p>Your vendor creation request is submitted successful to Hitachi and your Ticket ID is ${submitEmailId.Ticket_ID}.</p>
                        <p>Thanks & regards,</p>
                        </div>`;
    var returnFlag = false;
    exports.emailSubmitNotification(
      req,
      res,
      subject,
      emailContent,
      returnFlag,
      emailId
    );
    const del = await ApprovalSchema.findOne({
      where: {
        userId: userId,
      },
    });
    if (del) {
      ApprovalSchema.destroy({
        where: { userId: userId },
      });
    }
  }

  // check if there are any empty fields
  for (const key in updates) {
    if (!updates[key]) {
      updates[key] = null;
    }
  }

  const updateResult = await VdetailSchema.update(updates, {
    where: { userId: userId },
  });

  if (updateResult[0]) {
    res.status(200).json({
      status: "success",
      message: "Vendor updated successfully",
    });
  } else {
    res.status(200).json({
      status: "error",
      message: "Vendor not found",
    });
  }
};

exports.updateCommunication = async (req, res) => {
  const userId = req.params.userId;
  const updates = req.body;

  // check if there are any empty fields
  for (const key in updates) {
    if (!updates[key]) {
      updates[key] = null;
    }
  }
  const updateResult = await vendorCommunicationDetails.update(req.body, {
    where: { userId },
  });

  if (updateResult[0]) {
    res.status(200).json({
      status: "success",
      message: "Communication details updated successfully",
    });
  } else {
    res.status(404).json({
      status: "error",
      message: "Vendor not found",
    });
  }
};

exports.AllRejectVendorList = (req, res, next) => {
  VdetailSchema.findAll({ where: { submitStatus: "rejected" } })
    .then((data) => {
      return res.status(200).json({ msg: "success", result: data });
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
    });
};

exports.UpdateUserStatusByUserId = async (req, res) => {
  console.log("req.params.userId-----##########-------", req.params.userid)
  const userId = req.params.userid;
  const updates = req.body;
  req.body.userStatus = "MasterData"
  const updateResult = await VdetailSchema.update(req.body, {
    where: { userId },
  });

  if (updateResult[0]) {
    res.status(200).json({
      status: "success",
      message: "Vendor Basic details updated successfully",
    });
  } else {
    res.status(404).json({
      status: "error",
      message: "Vendor not found",
    });
  }
};