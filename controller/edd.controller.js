const db = require("../model");
const EddSchema = db.edd;
const InvoiceSchema = db.invoice;

exports.postEddDetails = async (req, res) => {
  console.log("req--------->", req.body);

  EddSchema.findOne({
    where: {
      Line_No: req.body.Line_No,
    },
  }).then((eddDetails) => {
    if (eddDetails) {

      console.log("Update Api------->");

      InvoiceSchema.update(req.body, {
        where: {
          Line_No: req.body.Line_No,
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

      console.log("Save Api------->");

      const user = new InvoiceSchema({
        Document_Type: req.body.Document_Type,
        Document_No: req.body.Document_No,
        Line_No: req.body.Line_No,
        Type: req.body.Type,
        No: req.body.No,
        Location_Code: req.body.Location_Code,
        Unit_of_Measure: req.body.Unit_of_Measure,
        Quantity: req.body.Quantity,
        Amount: req.body.Amount,
        Maintenance_Code: req.body.Maintenance_Code,
        Expected_Receipt_Date: req.body.Expected_Receipt_Date,
        EDD_Type: req.body.EDD_Type,
        End_Date: req.body.End_Date,
        Start_Date: req.body.Start_Date,
        Shortcut_Dimension_2_Code: req.body.Shortcut_Dimension_2_Code,
        Shortcut_Dimension_1_Code: req.body.Shortcut_Dimension_1_Code,
        Quantity_Invoiced: req.body.Quantity_Invoiced,
        Quantity_Received: req.body.Quantity_Received,
        Qty_to_Receive: req.body.Qty_to_Receive,
        Qty_to_Invoice: req.body.Qty_to_Invoice,
        Outstanding_Quantity: req.body.Outstanding_Quantity,
        Description: req.body.Description,
        Description_2: req.body.Description_2,
        ETag: req.body.ETag,
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


};
