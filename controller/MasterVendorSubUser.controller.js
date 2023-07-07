const db = require("../model");
const SignUpSchema = db.singUp;
const MasterVendorSubUserSchema = db.MasterVendorSubUser;
const VendorCodeSchema = db.vendorCode;
const bcrypt = require("bcrypt");
const fs = require('fs');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const config = require("../config/auth.config");
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = config.apiKey;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
var nodemailer = require("nodemailer");
const VendorIdSchema = db.vendorId;
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

exports.emailUserCreationReg = (
  req,
  res,
  subject,
  emailContent,
  returnFlag,
  emailId
) => {
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
};

exports.saveMasterVendorSubUser = (req, res) => {
  var pass = "";
  var str =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";

  for (let i = 1; i <= 8; i++) {
    var char = Math.floor(Math.random() * str.length + 1);

    pass += str.charAt(char);
  }
  const SubUserId = "SubUserId" + Math.floor(100000 + Math.random() * 900000);
  const userId = req.body.userId;
  const Name = req.body.Name;
  const designation = req.body.designation;
  const Department = req.body.Department;
  const emailId = req.body.emailId;
  const mobileNo = req.body.mobileNo;
  const loginId = `${Name}` + Math.floor(10000 + Math.random() * 90000);
  const password = pass;
  const roles = req.body.roles;
  const city_vendorCode_Pincode = req.body.city_vendorCode_Pincode;
  bcrypt.hash(password, 12).then((hashedPassword) => {
    const user = new MasterVendorSubUserSchema({
      SubUserId: SubUserId,
      userId: userId,
      Name: Name,
      designation: designation,
      Department: Department,
      emailId: emailId,
      mobileNo: mobileNo,
      loginId: loginId,
      password: hashedPassword,
      roles: roles,
      city_vendorCode_Pincode: city_vendorCode_Pincode,
    });

    user.save().then((result) => {
      const user = new SignUpSchema({
        emailId: emailId,
        userId: userId,
        userName: loginId,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        role: roles,
        phoneNumber: mobileNo,
        subUserId: SubUserId,
        verifiedUser:"approved",
        Country_Region_Code: "IND"
      });
      user
        .save()
        .then((result) => {
          var subject = `Hitachi Multiple Sub User Creation`;
          var emailContent = `
                <h4>Hi ${loginId}</h4>
                <p>Your LoginId is ${loginId} and password is ${password}.</p>
                <p>Your Sub User Registration is SuccessFully Created.</p>
                <p>Thanks & regards,</p>
                </div>`;
          var returnFlag = false;
          exports.emailUserCreationReg(
            req,
            res,
            subject,
            emailContent,
            returnFlag,
            emailId
          );
          return res.status(200).json({
            status: "success",
            data: { message: "Sub User saved successfully" },
          });
        })
        .catch((err) => {
          return res.status(200).json({
            status: "error",
            data: { message: "Error Response", err },
          });
        });
    });
  });
};

exports.getAllMasterVendorSubUser = (req, res) => {
  MasterVendorSubUserSchema.findAll()
    .then((data) => {
      return res.status(200).json({ msg: "success", result: data });
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
    });
};
exports.getMasterVendorById = (req, res) => {
  var userId = req.body.userId;
  console.log("userID",userId);
  MasterVendorSubUserSchema.findAll({
    where: { userId: userId },
  })
  .then((data) => {
      return res.status(200).json({ msg: "success", result: data });
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
    });
};
exports.getMasterVendorSubUserById = (req, res) => {
  var SubUserId = req.body.SubUserId;
  MasterVendorSubUserSchema.findOne({
    where: { SubUserId: SubUserId },
  })
    .then((result) => {
      return res
        .status(200)
        .json({ status: "success", message: "saved Successfully", result });
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
    });
};

exports.getAllVendorSubUser = (req, res) => {
  VendorCodeSchema.findAll()
    .then((data) => {
      return res.status(200).json({ msg: "success", result: data });
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
    });
};

exports.UpdateMasterVendorSubUserById = async (req, res) => {
  const SubUserId = req.body.SubUserId;

  var subRegId = await VendorCodeSchema.findAll({
    where: { SubUserId: SubUserId },
  });

  for (let i = 0; i < req.body.vendorCode.length; i++) {
    if (subRegId.length > 0) {
      subRegId.map((item) => {
        item.destroy();
      });

      const user = await new VendorCodeSchema({
        SubUserId: SubUserId,
        vendorCode: req.body.vendorCode[i].No,
        city: req.body.vendorCode[i].City,
        Pincode: req.body.vendorCode[i].Post_Code,
      });
      user.save();
    } else {
      const user = await new VendorCodeSchema({
        SubUserId: SubUserId,
        vendorCode: req.body.vendorCode[i].No,
        city: req.body.vendorCode[i].City,
        Pincode: req.body.vendorCode[i].Post_Code,
      });
      user.save();
    }
  }
  return res
    .status(200)
    .json({ status: "success", message: "saved Successfully" });

  // user
  //   .save()
  //   .then((result) => {
  //     return res
  //       .status(200)
  //       .json({ status: "success", message: "saved Successfully", result });
  //   })
  //   .catch((err) => {
  //     return res
  //       .status(200)
  //       .json({ status: "error", data: { message: "Error Response", err } });
  //   });
  // 
};

exports.UpdateMasterSubUserById = async (req, res) => {




  const subId = req.body.SubUserId;
  const updates = req.body;
  // check if there are any empty fields
  for (const key in updates) {
    if (!updates[key]) {
      updates[key] = null;
    }
  }
  const updateResult = await MasterVendorSubUserSchema.update(req.body, {
    where: { SubUserId : subId },
  });
  if (updateResult[0]) {
    res.status(200).json({
      status: "success",
      message: "Contact Team details updated successfully",
    });
  } else {
    res.status(404).json({
      status: "error",
      message: "Contact Team details not found",
    });
  }

}

exports.deleteMasterVendorSubUserById = (req, res) => {
  const id = req.params.id;
  MasterVendorSubUserSchema.destroy({
    where: { id: id },
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

exports.getSubuserId = async(req, res) => {

  subUserId = req.params.subUserId;

  VendorCodeSchema.findAll({
    where: { SubUserId : subUserId }
  })
    .then((data) => {
      return res.status(200).json({ msg: "success", result: data });
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
  });

}

exports.getDocuments = async(req, res) => {


  VendorIdSchema.findAll()
    .then((data) => {
      return res.status(200).json({ msg: "success", result: data });
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
  });

}
