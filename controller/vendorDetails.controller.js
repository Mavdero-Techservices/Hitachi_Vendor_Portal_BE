const db = require("../model");
const VdetailSchema = db.vdetail;
const vendorCommunicationDetails = db.vendorCommunicationDetails;
const { check, validationResult } = require("express-validator");
var geoCountryZipCode = require('geonames-country-zipcode-lookup');
const { getData } = require('country-list');

exports.postVdetail = (req, res, next) => {
    const userId=req.body.userId;
      const address1 = req.body.address1;
      const address2 = req.body.address2;
      const country = req.body.country;
      const state = req.body.state;
      const city = req.body.city;
      const pinCode = req.body.pinCode;
      const contactName = req.body.contactName;
      const companyName = req.body.companyName;
      const image = new Buffer(req.body.image, 'base64').toString('binary');
      const vendorType = req.body.vendorType;
      const vendorManager = req.body.vendorManager;
      const mkDenialCheque = req.body.mkDenialCheque;
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
        vendorType: vendorType,
        vendorManager: vendorManager,
        mkDenialCheque: mkDenialCheque,
        userId:userId,
      });
      try {
        const result = user.save();
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
    email: req.body.email,
    userId:req.body.userId,
    mastervendor_email:req.body.mastervendor_email,
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

exports.updateVendor = async (req, res) => {
  const userId = req.params.userId;
  const updates = req.body;

  // check if there are any empty fields
  for (const key in updates) {
    if (!updates[key]) {
      updates[key] = null;
    }
  }

  const updateResult = await VdetailSchema.update(updates, {
    where: { userId }
  });

  if (updateResult[0]) {
    res.status(200).json({
      status: "success",
      message: "Vendor updated successfully",
    });
  } else {
    res.status(404).json({
      status: "error",
      message: "Vendor not found"
    });
  }
};

exports.updateCommunication = async (req, res) => {
  const userId = req.params.userId;
  const updates = req.body;

  // check if there are any empty fields
  for (const key in updates) {
    if (!updates[key]) {
      updates[key] = null;
    }
  }
  const updateResult = await vendorCommunicationDetails.update(req.body, {
    where: { userId }
  });

  if (updateResult[0]) {
    res.status(200).json({
      status: "success",
      message: "Communication details updated successfully",
    });
  } else {
    res.status(404).json({
      status: "error",
      message: "Communication details not found"
    });
  }
};