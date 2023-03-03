const db = require("../model");
const MasterVendorUserAccessSchema = db.MasterVendorUserAccess;

exports.saveMasterVendorUserAccess = (req, res) => {
  const city_vendorCode_Pincode = req.body.city_vendorCode_Pincode;
  const Name = req.body.Name;

  const user = new MasterVendorUserAccessSchema({
    city_vendorCode_Pincode: city_vendorCode_Pincode,
    Name: Name,
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
