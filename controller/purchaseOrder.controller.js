const db = require("../model");
const purchaseOrderSchema = db.purchaseOrder;
const SignUpSchema = db.singUp;
let directory_name = "uploads";
const path = require("path");
var multer = require("multer");
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");

exports.savePurchaseOrderEstimateDate = async (req, res) => {

    var userEmailId = await SignUpSchema.findOne({
        where: { userId: req.body.userId },
      });

      const purchaseOrder = new purchaseOrderSchema({
        userId: req.body.userId,
        itemCodeDesc: req.body.itemCodeDesc,
        qty: req.body.qty,
        totalAmount: req.body.totalAmount,
        edDate: req.body.edDate,
    });
    purchaseOrder.save()
                        .then((data)=>{
                                    return res.status(200).json({
                                        status: "success",
                                        message: "PurchaseOrder Estimate Date Saved Successfully",
                                        data,
                                    });
                                })
                                .catch((err) => {
                                    return res.status(500).json({
                                    message:
                                        err.message ||
                                        "Some error occurred while creating the PurchaseOrder Estimate Date.",
                                    });
                                });

}