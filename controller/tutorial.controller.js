const db = require("../model");
const tutorialSchema = db.tutorial;

//Save data
exports.save = (req, res) => {
    const tutorial = {
        name: req.body.name,
        emailId: req.body.emailId,
        userId:req.body.userId
    };
    tutorialSchema.create(tutorial)
        .then(data => {
            return res.status(200).json({ msg: "success", result: data });
        })
        .catch(err => {
            return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
        });
};
//Retrieve all data
exports.getAll = (req, res) => {
    tutorialSchema.findAll()
        .then(data => {
            return res.status(200).json({ msg: "success", result: data });
        })
        .catch(err => {
            return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
        });
};
// Find with an id
exports.getById = (req, res) => {
    const id = req.params.id;
    tutorialSchema.findByPk(id)
        .then(data => {
            return res.status(200).json({ msg: "success", result: data });
        })
        .catch(err => {
            return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
        });
};
// Update by id in the request
exports.updateById = (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    tutorialSchema.update(
        { name: name },
        { where: { id: user.id } }
      )
        .then(data => {
            return res.status(200).json({ msg: "success", result: "updated successfully" });
        })
        .catch(err => {
            return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
        });
};
// Delete with the specified id in the request
exports.deleteById = (req, res) => {
    const id = req.params.id;
    tutorialSchema.destroy({
        where: { id: id }
    })
        .then(data => {
            return res.status(200).json({ msg: "success", result: "deleted successfully" });
        })
        .catch(err => {
            return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
        });
};


exports.update = (req, res, next) => {
    const id = req.body.emailId;
      SignUpSchema.findOne({
        where: {
          emailId:emailId,
        },
      })
      .then(async user => {
        console.log("user",user);
        const mailConfirmationCode = Math.floor(100000 + Math.random() * 900000);
       if (!user) {
        return res.status(200).json("invalid user");
      }
    else{
      console.log("fp",mailConfirmationCode);
      console.log("rid",user.id);
      var subject="confirmation code for password reset";
      var emailContent=`your code is ${mailConfirmationCode}`; 
      var returnFlag=false;
      await SignUpSchema.update(
        { mailConfirmationCode: mailConfirmationCode },
        { where: { id: user.id } }
      ).then(code=> {
  console.log("resetcode",code);
      })
      exports.emailNotification(req, res,subject, emailContent, returnFlag);
    }
      })
      .catch(err => console.log(err));
    
  
  
  };









  let directory_name = "uploads";
const path = require('path');
var multer = require('multer');
var GST_DocPath = '';
var PAN_DocPath = '';
var form_10f_DocPath = '';
var PE_Declaration_DocPath = '';
var TAN_DocPath = '';
var MSME_DocPath = '';
var Tax_residency_DocPath = '';
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join( directory_name,'/'));
      
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if (file.fieldname === "GST_Doc") { 
        console.log("GST_Doc")
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
            ProfilePath = directory_name+ "/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'image/png') {
            filetype = 'png';
            ProfilePath = directory_name+ "/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
            ProfilePath = "../uploads/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'application/pdf') {
            filetype = 'pdf';
            ProfilePath = directory_name+ "/" + 'image-' + Date.now() + '.' + filetype;
         
          }
          cb(null, 'image-' + Date.now() + '.' + filetype);
      }
      if (file.fieldname === "PAN_Doc") { 
        console.log("PAN_Doc")
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
            ProfilePath = directory_name+ "/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'image/png') {
            filetype = 'png';
            ProfilePath = directory_name+ "/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
            ProfilePath = "../uploads/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'application/pdf') {
            filetype = 'pdf';
            ProfilePath = directory_name+ "/" + 'image-' + Date.now() + '.' + filetype;
         
          }
          cb(null, 'image-' + Date.now() + '.' + filetype);
      }
      if (file.fieldname === "form_10f_Doc") { 
        console.log("form_10f_Doc")
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
            ProfilePath = directory_name+ "/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'image/png') {
            filetype = 'png';
            ProfilePath = directory_name+ "/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
            ProfilePath = "../uploads/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'application/pdf') {
            filetype = 'pdf';
            ProfilePath = directory_name+ "/" + 'image-' + Date.now() + '.' + filetype;
         
          }
          cb(null, 'image-' + Date.now() + '.' + filetype);
      }
      if (file.fieldname === "TAN_Doc") { 
        console.log("TAN_Doc")
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
            ProfilePath = directory_name+ "/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'image/png') {
            filetype = 'png';
            ProfilePath = directory_name+ "/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
            ProfilePath = "../uploads/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'application/pdf') {
            filetype = 'pdf';
            ProfilePath = directory_name+ "/" + 'image-' + Date.now() + '.' + filetype;
         
          }
          cb(null, 'image-' + Date.now() + '.' + filetype);
      }
      if (file.fieldname === "PE_Declaration_Doc") { 
        console.log("PE_Declaration_Doc")
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
            ProfilePath = directory_name+ "/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'image/png') {
            filetype = 'png';
            ProfilePath = directory_name+ "/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
            ProfilePath = "../uploads/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'application/pdf') {
            filetype = 'pdf';
            ProfilePath = directory_name+ "/" + 'image-' + Date.now() + '.' + filetype;
         
          }
          cb(null, 'image-' + Date.now() + '.' + filetype);
      }
      if (file.fieldname === "MSME_Doc") { 
        console.log("MSME_Doc")
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
            ProfilePath = directory_name+ "/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'image/png') {
            filetype = 'png';
            ProfilePath = directory_name+ "/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
            ProfilePath = "../uploads/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'application/pdf') {
            filetype = 'pdf';
            ProfilePath = directory_name+ "/" + 'image-' + Date.now() + '.' + filetype;
         
          }
          cb(null, 'image-' + Date.now() + '.' + filetype);
      }
      if (file.fieldname === "Tax_residency_Doc") { 
        console.log("TAN_Doc")
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
            ProfilePath = directory_name+ "/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'image/png') {
            filetype = 'png';
            ProfilePath = directory_name+ "/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
            ProfilePath = "../uploads/" +'image-' + Date.now() + '.' + filetype;
         
          }
          if (file.mimetype === 'application/pdf') {
            filetype = 'pdf';
            ProfilePath = directory_name+ "/" + 'image-' + Date.now() + '.' + filetype;
         
          }
          cb(null, 'image-' + Date.now() + '.' + filetype);
      }
      
    }
    
  });
//savestatutory
exports.saveStatutoryDetail = (req, res) => {
    console.log("wrk");
    var upload = multer({ storage: storage }).fields(
        [
          {
            name: 'GST_Doc',
            maxCount: 1
          },
          {
            name: 'PAN_Doc',
            maxCount: 1
          },
          {
            name: 'form_10f_Doc',
            maxCount: 1
          },
          {
            name: 'TAN_Doc',
            maxCount: 1
          },
          {
            name: 'PE_Declaration_Doc',
            maxCount: 1
          },
          {
            name: 'MSME_Doc',
            maxCount: 1
          },
          {
            name: 'Tax_residency_Doc',
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

            const GST_Doc = GST_DocPath;
            const PAN_Doc = PAN_DocPath;
            const form_10f_Doc = form_10f_DocPath;
            const TAN_Doc = TAN_DocPath;
            const PE_Declaration_Doc = PE_Declaration_DocPath;
            const MSME_Doc = MSME_DocPath;
            const Tax_residency_Doc = Tax_residency_DocPath;
            const user = new StatDetailSchema({
                GST_Doc: GST_Doc,
                PAN_Doc: PAN_Doc,
                form_10f_Doc:form_10f_Doc,
                TAN_Doc:TAN_Doc,
                PE_Declaration_Doc:PE_Declaration_Doc,
                MSME_Doc:MSME_Doc,
                Tax_residency_Doc:Tax_residency_Doc,
            });
            console.log("GST_Doc",GST_Doc);
            user.save()
              .then(result => {
                return res.status(200).json({ status: "success", message: "Registered Successfully", result });
              })
          }
        })
}  