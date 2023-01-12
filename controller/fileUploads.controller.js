const { v4: uuidv4 } = require('uuid');
const db = require("../model");
const UserInfo = db.fileUpload;
// upload file
var multer = require('multer');
var DocPath = '';
var constpath = uuidv4();
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    constpath = uuidv4();
    if (file.fieldname === "Doc") {
      if (file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
        DocPath = "/uploads/doc/" + 'image-' + file.fieldname + constpath + '.' + filetype;
        cb(null, './uploads/pan_Doc');
      }
      if (file.mimetype === 'application/pdf') {
        filetype = 'pdf';
        DocPath = "/uploads/pan_Doc/" + 'image-' + file.fieldname + constpath + '.' + filetype;
        cb(null, './uploads/pan_Doc');
      }
    }
  },
  filename: (req, file, cb) => {
    var filetype = '';
    if (file.mimetype === 'image/gif') {
      return cb(new Error('Only .pdf, .jpg and .jpeg format allowed!'));
    }
    if (file.mimetype === 'image/png') {
      return cb(new Error('Only .pdf, .jpg and .jpeg format allowed!'));
    }
    if (file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    if (file.mimetype === 'application/pdf') {
      filetype = 'pdf';
    }
    cb(null, 'file-' + file.fieldname + constpath + '.' + filetype);
  }
});
// file storage end

//fileUploadApi
exports.fileUpload = (req, res, next) => {
  var upload = multer({ storage: storage }).fields(
    [
      {
        name: 'Doc',
        maxCount: 1
      },
    ]
  );
  upload(req, res, function (err) {
    if (err) {
      return "err";
    }
    else {
      const Doc = DocPath;
      const fileUpload = new UserInfo({
        Doc: Doc,
      });
      fileUpload.save()
        .then(result => {
          console.log("test");
          return res.status(200).json({ status: "success", result, message: "File uploaded Successfully" });
        })
        .catch(err => {
        });
    }
  })
}
