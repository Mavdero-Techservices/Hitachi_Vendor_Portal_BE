const db = require("../model");
const VendorFileSchema = db.vendorFile;
let directory_name = "uploads";
const path = require("path");
VendorFileDocDocPath = "";
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log("file11111", file);
    cb(null, path.join(directory_name));
  },
  filename: (req, file, cb) => {
    var filetype = "";

    if (file.fieldname === "VendorFileDoc") {
      if (file.mimetype === "image/gif") {
        filetype = "gif";
        VendorFileDocDocPath =
          directory_name + "/" + "VendorFileDoc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "image/png") {
        filetype = "png";
        VendorFileDocDocPath =
          directory_name + "/" + "VendorFileDoc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "image/jpeg") {
        filetype = "jpg";
        VendorFileDocDocPath =
          directory_name + "/" + "VendorFileDoc-" + Date.now() + "." + filetype;
      }
      if (file.mimetype === "application/pdf") {
        filetype = "pdf";
        VendorFileDocDocPath =
          directory_name + "/" + "VendorFileDoc-" + Date.now() + "." + filetype;
      }
      cb(null, "VendorFileDoc-" + Date.now() + "." + filetype);
    }
  },
});

const upload = multer({ storage });

exports.saveVendorFiles = (req, res) => {
  // VendorFileDocDocPath = "";

  upload.array(["VendorFileDoc"], 20)(req, res, async (err) => {


    if (err) {
      console.log("InsideErr", err);
      return "err";
    } else {

      let numb = [];

      for (let i = 0; i < req.files.length; i++) {

        numb.push(req.files[i].path);
      }

      const user = new VendorFileSchema({
        userId: req.body.userId,
        VendorFileDoc: numb.toString(),
      });
      user.save();
    }
  });
};

exports.updateVendorFiles = (req, res) => {
  var userId = req.params.userId;

  upload.array(["VendorFileDoc"], 20)(req, res, async (err) => {
   

    if (err) {
      console.log("InsideErr", err);
      return "err";
    } else {
      if (req.files) {

        let numb = [];

        for (let i = 0; i < req.files.length; i++) {
          numb.push(req.files[i].path);
        }

        req.body.VendorFileDoc = numb.toString()


        VendorFileSchema.update(req.body, {
          where: {
            userId: userId,
          },
        });

      } else {
        
      }
    }
  });
};
