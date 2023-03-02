const db = require("../model");
const vendorCodeDetailSchema = db.vendorCodeDetail;
const SignUpSchema = db.singUp;
let directory_name = "uploads";
const path = require("path");
var multer = require("multer");
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");

exports.saveVendorCodeDetail = async (req, res) => {
        const vendorCodeDetail = new vendorCodeDetailSchema({
            vendorCode: req.body.vendorCode,
            city: req.body.city
        });
        vendorCodeDetail.save()
        .then((data)=>{
            return res.status(200).json({
                status: "success",
                message: "VendorCode Details Saved Successfully",
                data,
            });
        })
        .catch((err) => {
            return res.status(500).json({
            message:
                err.message ||
                "Some error occurred while creating the VendorCode Details.",
            });
        });
}

exports.getVendorCodeDetail = (req, res, next) => {
    vendorCodeDetailSchema.findAll()
      .then((data) => {
        return res.status(200).json({ msg: "success", result: data });
      })
      .catch((err) => {
        return res
          .status(200)
          .json({ status: "error", data: { message: "Error Response", err } });
      });
};