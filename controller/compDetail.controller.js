const db = require("../model");
const CompliancedetailSchema =db.complianceDetail;
const { check, validationResult } = require("express-validator");

// exports.postCompdetail = [
//     //validate form
//     check("RPD_Doc")
//         .not()
//         .isEmpty()
//         .withMessage("RPD_Doc is required"),
//     check("COC_Doc")
//         .not()
//         .isEmpty()
//         .withMessage("COC_Doc is required"),
//     check("NDA_Doc")
//         .not()
//         .isEmpty()
//         .withMessage("NDA_Doc is required"),
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(422).json({ errors: errors.array() });
//         }
//         try {
//             const compdetail = await CompdetailSchema.create({
//                 userid: req.body.userid,
//                 RPD_Doc: req.body.RPD_Doc,
//                 COC_Doc: req.body.COC_Doc,
//                 NDA_Doc: req.body.NDA_Doc,
//             });
//             res.send({
//                 message: "compdetail created successfully",
//                 status: "success",
//                 compdetail: compdetail,
//             });
//         } catch (error) {
//             res.status(500).json({
//                 message: "Error creating compdetail",
//                 error: error.message,
//             });
//         }
//     },
// ];
//saveComplianceDetail
let directory_name = "uploads";
const path = require('path');
var multer = require('multer');
var RPD_DocPath = '';
var COC_DocPath = '';
var NDA_DocPath = '';

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join( directory_name,'/'));
      
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
    
      if (file.fieldname === "RPD_Doc") { 
        console.log("RPD_Doc")
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
            RPD_DocPath = directory_name+ "/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'image/png') {
            filetype = 'png';
            RPD_DocPath = directory_name+ "/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
            RPD_DocPath = "../uploads/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'application/pdf') {
            filetype = 'pdf';
            RPD_DocPath = directory_name+ "/" + 'image-' + Date.now() + '.' + filetype;
         
          }
          cb(null, 'image-' + Date.now() + '.' + filetype);
      }
      if (file.fieldname === "COC_Doc") { 
        console.log("PAN_Doc")
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
            COC_DocPath = directory_name+ "/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'image/png') {
            filetype = 'png';
            COC_DocPath = directory_name+ "/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
            COC_DocPath = "../uploads/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'application/pdf') {
            filetype = 'pdf';
            COC_DocPath = directory_name+ "/" + 'image-' + Date.now() + '.' + filetype;
         
          }
          cb(null, 'image-' + Date.now() + '.' + filetype);
      }
      if (file.fieldname === "NDA_Doc") { 
        console.log("NDA_Doc")
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
            NDA_DocPath = directory_name+ "/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'image/png') {
            filetype = 'png';
            NDA_DocPath = directory_name+ "/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
            NDA_DocPath = "../uploads/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'application/pdf') {
            filetype = 'pdf';
            NDA_DocPath = directory_name+ "/" + 'image-' + Date.now() + '.' + filetype;
         
          }
          cb(null, 'image-' + Date.now() + '.' + filetype);
      }
     
    } 
  });
exports.saveComplianceDetail = (req, res) => {
    var upload = multer({ storage: storage }).fields(
        [
          {
            name: 'RPD_Doc',
            maxCount: 1
          },
          {
            name: 'COC_Doc',
            maxCount: 1
          },
          {
            name: 'NDA_Doc',
            maxCount: 1
          },
         
        ]);
    upload(req, res, function (err) {
        if (err) {
            console.log("InsideErr", err);
            return "err";
          }
          else
          {
            const NDA_Doc=NDA_DocPath;
            const COC_Doc=COC_DocPath;
            const RPD_Doc = RPD_DocPath;
            const complianceId='compliance' + Math.floor(100000 + Math.random() * 900000);
            const userId=req.body.userId;

            const user = new CompliancedetailSchema({
              complianceId:complianceId,
              userId:userId,
              NDA_Doc:NDA_Doc,
              COC_Doc:COC_Doc,
              RPD_Doc: RPD_Doc,
              
          });
          user.save()
          .then(result => {
            return res.status(200).json({ status: "success", message: "Registered Successfully", result });
          })
          }
        })
}  