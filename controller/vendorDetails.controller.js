const db = require("../model");
const VdetailSchema = db.vdetail;
const vendorCommunicationDetails = db.vendorCommunicationDetails;
const { check, validationResult } = require("express-validator");
var geoCountryZipCode = require('geonames-country-zipcode-lookup');
const { getData } = require('country-list');

exports.postVdetail = [
  //validate form
  check("address1")
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 50 })
    .withMessage("address1 is required"),
  check("address2")
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 50 })
    .withMessage("address2 is required"),
  check("country")
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 20 })
    .withMessage("country is required"),
  check("state")
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 20 })
    .withMessage("state is required"),
  check("city")
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 20 })
    .withMessage("city is required"),
  check("pinCode")
    .not()
    .isEmpty()
    .isNumeric()
    .isLength(6)
    .withMessage("pinCode is required"),
  check("companyName")
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 20 })
    .withMessage("companyName is required"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", errors: errors.array() });
    } else {
      const address1 = req.body.address1;
      const address2 = req.body.address2;
      const country = req.body.country;
      const state = req.body.state;
      const city = req.body.city;
      const pinCode = req.body.pinCode;
      const contactName = req.body.contactName;
      const companyName = req.body.companyName;
      const image = new Buffer(req.body.image, 'base64').toString('binary');
      const user = new VdetailSchema({
        address1: address1,
        address2: address2,
        city: city,
        state: state,
        country: country,
        pinCode: pinCode,
        contactName: contactName,
        companyName: companyName,
        image: image,
      });
      try {
        const result = await user.save();
        return res.status(200).json({
          status: "success",
          result,
          message: "Vendor details inserted Successfully",
        });
      } catch (err) {
        return res
          .status(404)
          .json({ status: "error", err, message: "Error Response" });
      }
    }
  },
];
//SaveVendorCommunication
exports.SaveVendorCommunication = (req, res) => {
  const VendorCommunication = {
    financeSpoccontactName: req.body.financeSpoccontactName,
    financeSpocdesignation: req.body.financeSpocdesignation,
    financeSpocphoneNo: req.body.financeSpocphoneNo,
    financeSpocemail: req.body.financeSpocemail,
    operationSpoccontactName: req.body.operationSpoccontactName,
    operationSpocdesignation: req.body.operationSpocdesignation,
    operationSpocphoneNo: req.body.operationSpocphoneNo,
    operationSpocemail: req.body.operationSpocemail,
    collectionSpoccontactName: req.body.collectionSpoccontactName,
    collectionSpocdesignation: req.body.collectionSpocdesignation,
    collectionSpocphoneNo: req.body.collectionSpocphoneNo,
    collectionSpocemail: req.body.collectionSpocemail,
    managementSpoccontactName: req.body.managementSpoccontactName,
    managementSpocdesignation: req.body.managementSpocdesignation,
    managementSpocphoneNo: req.body.managementSpocphoneNo,
    managementSpocemail: req.body.managementSpocemail,
    contactName: req.body.contactName,
    designation: req.body.designation,
    phoneNo: req.body.phoneNo,
    email: req.body.email
  };
  vendorCommunicationDetails.create(VendorCommunication)
    .then(data => {
      return res.status(200).json({ msg: "success", result: data });
    })
    .catch(err => {
      return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
    });
};

//getCountry
exports.getCountry = (req, res, next) => {
  var country = getData();
  return res.status(200).json({ status: "success", data: country });
}
//getState&cityByzipcode
exports.getStateAndcityByzipcode = (req, res, next) => {
  var code = req.params.code;
  var pinCode = req.params.pinCode;
  const url = `http://api.geonames.org/postalCodeLookupJSON?postalcode=${pinCode}&country=${code}&username=karthiga`
  const axios = require('axios')
  axios.get(url)
    .then(result => {
      return res.json({ status: "success", data: result.data });
    })
    .catch(err => console.log(err))
  // const result = geoCountryZipCode.lookup(code,pinCode); 
  // return res.status(200).json({ status: "success", data: result });
}
