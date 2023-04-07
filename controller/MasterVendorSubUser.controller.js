const db = require("../model");
const SignUpSchema = db.singUp;
const MasterVendorSubUserSchema = db.MasterVendorSubUser;
const VendorCodeSchema = db.vendorCode;
const bcrypt = require("bcrypt");
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

    user
      .save()
      .then((result) => {
        const user = new SignUpSchema({
          emailId: emailId,
          userId: userId,
          userName: Name,
          password: hashedPassword,
          confirmPassword: hashedPassword,
          role: roles,
          phoneNumber: mobileNo,
        });
        user.save();
        return res
          .status(200)
          .json({ status: "success", message: "saved Successfully", result });
      })
      .catch((err) => {
        return res
          .status(200)
          .json({ status: "error", data: { message: "Error Response", err } });
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

exports.UpdateMasterVendorSubUserById = async (req, res) => {

  for (let i = 0; i < req.body.vendorCode.length; i++) {
    const user = await new VendorCodeSchema({
      SubUserId: req.body.SubUserId,
      vendorCode: req.body.vendorCode[i].vendorCode,
      city: req.body.vendorCode[i].city,
      Pincode: req.body.vendorCode[i].Pincode,
    });
    user.save();
  }
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
  // var SubUserId = req.body.SubUserId;
  // var city_vendorCode_Pincode = req.body.city_vendorCode_Pincode;

  // MasterVendorSubUserSchema.update(
  //   // {
  //   //   Name: Name,
  //   //   designation: designation,
  //   //   Department: Department,
  //   //   emailId: emailId,
  //   //   mobileNo: mobileNo,
  //   //   loginId: loginId,
  //   //   password: password,
  //   //   roles: roles,
  //   //   city_vendorCode_Pincode: city_vendorCode_Pincode,
  //   // },
  //   // { where: { SubUserId: SubUserId } }
  // )
  //   .then( async (result) => {
  //     console.log("result--->", result);
  //     for (let i = 0; i < req.body.vendorCode.length; i++) {
  //       console.log("req---->", req.body.vendorCode[i].vendorCode);
  //       const user = await new VendorCodeSchema({
  //         SubUserId: SubUserId,
  //         vendorCode: req.body.vendorCode[i].vendorCode,
  //         city: req.body.vendorCode[i].city,
  //         Pincode: row.vendorCode[i].Pincode,
  //       });
  //       user.save();
  //     }
  //     console.log("user--->", user);
  //     return res

  //       .status(200)
  //       .json({ status: "success", message: "updated Successfully", result });
  //   })
  //   .catch((err) => {
  //     return res
  //       .status(200)
  //       .json({ status: "error", data: { message: "Error Response", err } });
  //   });
};

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
