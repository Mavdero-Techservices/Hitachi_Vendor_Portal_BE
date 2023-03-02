const db = require("../model");
const purchaseOrderSchema = db.purchaseOrder;
const SignUpSchema = db.singUp;
let directory_name = "uploads";
const path = require("path");
var multer = require("multer");
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");

exports.savePurchaseOrderEstimateDate = async (req, res) => {
    // var userEmailId = await SignUpSchema.findOne({
    //     where: { userId: req.body.userId },
    //   });
    let date = new Date();
    for(let i = 0; i < req.body.length; i++){
        const purchaseOrder = new purchaseOrderSchema({
            userId: req.body[i].userId,
            itemCodeDesc: req.body[i].itemCodeDesc,
            qty: req.body[i].qty,
            totalAmount: req.body[i].totalAmount,
            edDate: date,
        });
        purchaseOrder.save()
    }                        

}

exports.getPurchaseOrderEstimateDateList = (req, res, next) => {
    purchaseOrderSchema.findAll()
      .then((data) => {
        return res.status(200).json({ msg: "success", result: data });
      })
      .catch((err) => {
        return res
          .status(200)
          .json({ status: "error", data: { message: "Error Response", err } });
      });
};