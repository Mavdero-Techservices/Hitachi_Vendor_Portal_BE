const db = require("../model");
const InvoiceSchema = db.invoice;
let directory_name = "uploads";
const path = require("path");
var multer = require("multer");
const { log, Console } = require("console");
var InvoiceFileDocPath = "";
var Document1DocPath = "";
var Document2DocPath = "";
var Document3DocPath = "";
var Document4DocPath = "";
var Document5DocPath = "";
var Document6DocPath = "";
const fs = require("fs");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(directory_name, "/"));
  },
  filename: (req, file, cb) => {
    if (file.fieldname === "invoiceFile") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      InvoiceFileDocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
    if (file.fieldname === "document1") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      Document1DocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
    if (file.fieldname === "document2") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      Document2DocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
    if (file.fieldname === "document3") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      Document3DocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
    if (file.fieldname === "document4") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      Document4DocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
    if (file.fieldname === "document5") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      Document5DocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
    if (file.fieldname === "document6") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      Document6DocPath =
        directory_name +
        "/" +
        filedirect[0] +
        "_" +
        randomNumber +
        "." +
        filedirect[1];

      cb(null, filedirect[0] + "_" + randomNumber + "." + filedirect[1]);
    }
  },
});

exports.saveInvoiceInfo = async (req, res) => {
  var upload = multer({ storage: storage }).fields([
    {
      name: "invoiceFile",
      maxCount: 1,
    },
    {
      name: "document1",
      maxCount: 1,
    },
    {
      name: "document2",
      maxCount: 1,
    },
    {
      name: "document3",
      maxCount: 1,
    },
    {
      name: "document4",
      maxCount: 1,
    },
    {
      name: "document5",
      maxCount: 1,
    },
    {
      name: "document6",
      maxCount: 1,
    },
  ]);
  await upload(req, res, function (err) {
    InvoiceSchema.findOne({
      where: {
        poNumber: req.body.poNumber,
      },
    }).then(async (poDetails) => {
      if (poDetails) {

        let invoiceFile = InvoiceFileDocPath;
        let document1 = Document1DocPath;
        let document2 = Document2DocPath;
        let document3 = Document3DocPath;
        let document4 = Document4DocPath;
        let document5 = Document5DocPath;
        let document6 = Document6DocPath;

        if (poDetails.invoiceFile === req.body.invoiceFile) {
          invoiceFile = req.body.invoiceFile;
        } else {
          invoiceFile = InvoiceFileDocPath;
        }

        if (poDetails.document1 === req.body.document1) {
          document1 = req.body.document1;
        } else {
          document1 = Document1DocPath;
        }

        if (poDetails.document2 === req.body.document2) {
          document2 = req.body.document2;
        } else {
          document2 = Document2DocPath;
        }

        if (poDetails.document3 === req.body.document3) {
          document3 = req.body.document3;
        } else {
          document3 = Document3DocPath;
        }

        if (poDetails.document4 === req.body.document4) {
          document4 = req.body.document4;
        } else {
          document4 = Document4DocPath;
        }

        if (poDetails.document5 === req.body.document5) {
          document5 = req.body.document5;
        } else {
          document5 = Document5DocPath;
        }

        if (poDetails.document6 === req.body.document6) {
          document6 = req.body.document6;
        } else {
          document6 = Document6DocPath;
        }

        req.body.invoiceFile = invoiceFile;
        req.body.document1 = document1;
        req.body.document2 = document2;
        req.body.document3 = document3;
        req.body.document4 = document4;
        req.body.document5 = document5;
        req.body.document6 = document6;

        InvoiceSchema.update(req.body, {
          where: {
            poNumber: req.body.poNumber,
          },
        })
          .then(() => {
            res.status(200).send({
              message: "Invoice Portal Detail was updated successfully!",
              status: "success",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while updating the Bankdetail schema.",
            });
          });
      } else {
        const invoiceFile = InvoiceFileDocPath;
        const document1 = Document1DocPath;
        const document2 = Document2DocPath;
        const document3 = Document3DocPath;
        const document4 = Document4DocPath;
        const document5 = Document5DocPath;
        const document6 = Document6DocPath;

        const user = new InvoiceSchema({
          poNumber: req.body.poNumber,
          docDate: req.body.docDate,
          vendorInvoiceNo: req.body.vendorInvoiceNo,
          srNo: req.body.srNo,
          glCode: req.body.glCode,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          qty: req.body.qty,
          rate: req.body.rate,
          baseAmount: req.body.baseAmount,
          taxAmount: req.body.taxAmount,
          grossAmount: req.body.grossAmount,
          invoiceFile: invoiceFile,
          document1: document1,
          document2: document2,
          document3: document3,
          document4: document4,
          document5: document5,
          document6: document6,
        });
        user.save().then((result) => {
          return res.status(200).json({
            status: "success",
            message: "Invoice Portal Detail Saved Successfully",
            result,
          });
        });
      }
    });
  });
};

exports.getInvoiceinfo = (req, res, next) => {
  InvoiceSchema.findAll()
    .then((data) => {
      return res.status(200).json({ msg: "success", result: data });
    })
    .catch((err) => {
      return res
        .status(200)
        .json({ status: "error", data: { message: "Error Response", err } });
    });
};
