const db = require("../model");
const MasterVendorUserAccessSchema = db.MasterVendorUserAccess;


exports.saveMasterVendorUserAccess = (req, res) => {
  console.log("req------->", req.body);
  const userId = req.body.userId;
  const vendorCode = req.body.vendorCode;
  const city = req.body.city;
  const Pincode = req.body.Pincode;

  const user = new MasterVendorUserAccessSchema({
    userId: userId,
    vendorCode: vendorCode,
    city: city,
    Pincode: Pincode,
  });
  user
    .save()
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

exports.getAllMasterVendorUserAccess = (req, res) => {
  MasterVendorUserAccessSchema.findAll()
    .then((data) => {
      return res.status(200).json({ msg: "success", result: data });
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
    });
};

exports.getMasterVendorUserAccessById = (req, res) => {
  var id = req.body.id;
  MasterVendorUserAccessSchema.findOne({
    where: { id: id },
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
exports.UpdateMasterVendorUserAccessById = (req, res) => {
  var Name = req.body.Name;
  var city_vendorCode_Pincode = req.body.city_vendorCode_Pincode;
  MasterVendorUserAccessSchema.update(
    { Name: Name, city_vendorCode_Pincode: city_vendorCode_Pincode },
    { where: { id: id } }
  )
    .then((result) => {
      return res
        .status(200)
        .json({ status: "success", message: "updated Successfully", result });
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
    });
};

exports.deleteMasterVendorUserAccessById = (req, res) => {
  const id = req.params.id;
  MasterVendorUserAccessSchema.destroy({
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
