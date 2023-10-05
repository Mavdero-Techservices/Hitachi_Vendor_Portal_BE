const httpntlm = require('httpntlm');
const db = require("../model");
const SignUpSchema = db.singUp;
const xml2js = require('xml2js');
let directory_name = "uploads";
const path = require('path');
var multer = require("multer");
const fs = require('fs');
const StatDetailSchema = db.statdetail;
var vendorCodeDocPath = "";
const vendorCommunicationDetails = db.vendorCommunicationDetails;
var storage = multer.diskStorage({
  destination: (req, file, cb) => {


    cb(null, path.join(directory_name, "/"));
  },
  filename: (req, file, cb) => {


    if (file.fieldname === "docName") {
      let randomNumber = Math.floor(100000 + Math.random() * 900000);

      let filedirect = file.originalname.split(".");

      vendorCodeDocPath =
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



//getErpVendor_API
exports.getErpVendor_API = (req, res) => {
  httpntlm.get({
    url: "http://10.83.152.111:4049/NAVTestDB2/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/Vendor_API?$format=json",
    username: 'ERP-API',
    password: 'HSI@#543DCVB',
    workstation: '',
    domain: ''
  }, function (err, result) {
    if (err) return err;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(result.body);
  })
};

exports.getVendorLedgerEntries = (req, res) => {
  httpntlm.get(
    {
      url: "http://10.83.152.111:4049/NAVTestDB2/OData/Company(%27Hitachi%20Systems%20India%20Pvt%20Ltd%27)/VendorLedgerEntries?$format=json",
      username: "ERP-API",
      password: "HSI@#543DCVB",
      workstation: "",
      domain: "",
    },
    function (err, result) {
      if (err) return err;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(result.body);
    }
  );
};
exports.getVendorLedgerEntriesById = (req, res) => {
  const Vendor_No = req.params.Vendor_No;
  httpntlm.get({
    url: "http://10.83.152.111:4049/NAVTestDB2/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/VendorLedgerEntries?$format=json&$filter=Vendor_No eq '" + Vendor_No + "'",
    username: 'ERP-API',
    password: 'HSI@#543DCVB',
    workstation: '',
    domain: '',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json;odata.metadata=minimal',
      'User-Agent': 'nodejs/httpntlm',
    }
  }, function (err, result) {
    if (err) {
      console.error(err);
    } else {
      const record = JSON.parse(result.body).value[0];
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(record));
    }
  });
};
//
exports.getErpVendor_APIById = (req, res) => {
  const No = req.params.No;
  httpntlm.get({
    url: "http://10.83.152.111:4049/NAVTestDB2/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/Vendor_API?$format=json&$filter=No eq '" + No + "'",
    username: 'ERP-API',
    password: 'HSI@#543DCVB',
    workstation: '',
    domain: '',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json;odata.metadata=minimal',
      'User-Agent': 'nodejs/httpntlm',
    }
  }, function (err, result) {
    if (err) {
      console.error(err);
    } else {
      const record = JSON.parse(result.body).value[0];
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(record));
    }
  });
};
exports.postErpVendor_API = (req, res) => {
  httpntlm.post({
    url: 'http://10.83.152.111:4049/NAVTestDB2/OData/Vendor_API?$format=json&company=Hitachi%20Systems%20India%20Pvt%20Ltd',
    username: 'ERP-API',
    password: 'HSI@#543DCVB',
    workstation: '',
    domain: '',
    headers: {
      'OData-Version': '1.0',
      'Content-Type': 'application/json',
      'Accept': 'application/json;odata.metadata=minimal',
      'User-Agent': 'nodejs/httpntlm'
    },
    body: JSON.stringify(req.body),
  }, function (err, result) {
    if (err) return err;
    console.log("res::", req);
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(result.body);
  })
};
//updateErpVendor_API
exports.updateErpVendor_API = (req, res) => {
  const entryNo = "A003";
  // const url1 = 'http://dnav-appserver.microclinic.in:4049/NAVTestDB2/OData/Company(\'Hitachi%20Systems%20India%20Pvt%20Ltd\')/APITestingOData?$format=json&$filter=Entry_No%20eq%20\'A0029\'';
  const url1 = 'http://10.83.152.111:4049/NAVTestDB2/OData/Company(\'Hitachi%20Systems%20India%20Pvt%20Ltd\')/Vendor_API?$format=json&$filter=No%20eq%20A003';
  httpntlm.get({
    url: url1,
    username: 'ERP-API',
    password: 'HSI@#543DCVB',
    workstation: '',
    domain: '',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json;odata.metadata=minimal',
      'User-Agent': 'nodejs/httpntlm',
    }
  }, function (err, result) {
    if (err) {
      console.error(err);
    } else {
      const responseObject = JSON.parse(result.body);
      console.log('eq::', responseObject);
      const str = responseObject.value[0].ETag;
      const replacedStr = str.replace(/;/g, "%3b");
      console.log("replacedStr:", replacedStr);
      const ETag = `W/"'${replacedStr}'"`;
      console.log("ETag", ETag)
      const url2 = 'http://10.83.152.111:4049/NAVTestDB2/OData/Vendor_API(No=${entryNo})?company=Hitachi%20Systems%20India%20Pvt%20Ltd';
      const payload = {
        Name: "rthi"
      };

      httpntlm.put({
        url: url2,
        username: 'ERP-API',
        password: 'HSI@#543DCVB',
        workstation: '',
        domain: '',
        headers: {
          'OData-Version': '1.0',
          'Content-Type': 'application/json',
          'Accept': 'application/json;odata.metadata=minimal',
          'User-Agent': 'nodejs/httpntlm',
          'If-Match': ETag
        },
        body: JSON.stringify(payload),
      }, function (err, result2) {
        if (err) {
          console.error(err);
          res.end(err);
        } else {
          console.log('PUT request successful.');
          console.log("error", errorResponse["odata.error"].message.value);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(result2.body);
        }
      });
    }
  });



};

//ResourcePortalVendorlist
exports.getErpResourcePortalVendorlist = (req, res) => {
  const baseUrl = "http://10.83.152.111:4049/NAVTestDB2/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/Vendor_API";
  const username = 'ERP-API';
  const password = 'HSI@#543DCVB';
  const pageSize = 4000;
  let totalLength = 0;
  let allData = []; 
  let page = 1; 

  const makeRequest = (url) => {
    httpntlm.get({
      url: url,
      username: username,
      password: password,
      workstation: '',
      domain: ''
    }, function (err, result) {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        const data = JSON.parse(result.body);
        const records = data.value;

        if (records.length === 0) {
          res.status(200).json({ value: allData }); 
        } else {
          totalLength += records.length; // Accumulate the length of the records
          console.log("length:", records.length);
          allData = allData.concat(records);
          page++;

          const nextPageUrl = `${baseUrl}?$format=json&$top=${pageSize}&$skip=${(page - 1) * pageSize}`;
          makeRequest(nextPageUrl); 
        }
      }
    });
  };

  const initialUrl = `${baseUrl}?$format=json&$top=${pageSize}&$skip=${(page - 1) * pageSize}`;
  makeRequest(initialUrl);
};
///getErpResourcePortalVendorlistById
exports.getErpResourcePortalVendorlistById = (req, res) => {
  const Vendor_No = req.params.Vendor_No;
  httpntlm.get({
    url: "http://10.83.152.111:4049/NAVTestDB2/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/ResourcePortalVendorlist1?$format=json&$filter=Vendor_No eq '" + Vendor_No + "'",
    username: 'ERP-API',
    password: 'HSI@#543DCVB',
    workstation: '',
    domain: '',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json;odata.metadata=minimal',
      'User-Agent': 'nodejs/httpntlm',
    }
  }, function (err, result) {
    if (err) {
      console.error(err);
    } else {
      const record = JSON.parse(result.body).value[0];
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(record));
    }
  });
};
//postErpResourcePortalVendorlist1
// exports.postErpResourcePortalVendorlist= (req, res) => {
//     httpntlm.post({
//       url:'http://10.83.152.111:4049/NAVTestDB2/OData/ResourcePortalVendorlist1?$format=json&company=Hitachi%20Systems%20India%20Pvt%20Ltd', 
//       username: 'ERP-API',
//       password: 'HSI@#543DCVB',
//       workstation: '',
//       domain: '',
//       headers: { 
//         'OData-Version': '1.0', 
//         'Content-Type': 'application/json',
//         'Accept': 'application/json;odata.metadata=minimal',
//         'User-Agent': 'nodejs/httpntlm'
//       },         
//       body:JSON.stringify(req.body),
//   }, function (err, result){
//       if(err) return err;
//       console.log("res::",req);
//       res.setHeader("Content-Type", "application/json");
//                res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.end(result.body);
//   })
//   };
//update
// exports.updateErpResourcePortalVendorlist = (req, res) => {
//   const Refrence_Entry_No = req.params.Refrence_Entry_No;
//   const entryNo = req.body.Entry_No;
//   const odataUrl = `http://10.83.152.111:4049/NAVTestDB2/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/ResourcePortalVendorlist1?Entry_No=VCR170877?$format=json`;
//   const data = req.body;
  
//   // Check if the resource exists
//   const exists = httpntlm.get({
//   url: odataUrl,
//   username: 'ERP-API',
//   password: 'HSI@#543DCVB',
//   workstation: '',
//   domain: '',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json;odata.metadata=minimal',
//     'User-Agent': 'nodejs/httpntlm',
//   }
//   });
  
//   if (!exists) {
//   // The resource does not exist, so we cannot update it
//   const errorObj = {
//   msg: 'error',
//   error: 'Resource does not exist',
//   };
//   res.status(404).json(errorObj);
//   } else {
//   // The resource exists, so we can update it
//   httpntlm.put({
//   url: odataUrl,
//   username: 'ERP-API',
//   password: 'HSI@#543DCVB',
//   workstation: '',
//   domain: '',
//   headers: {
//   'Content-Type': 'application/json',
//   'Accept': 'application/json;odata.metadata=minimal',
//   'OData-Version': '1.0',
//   'User-Agent': 'nodejs/httpntlm',
//   },
//   body: JSON.stringify(data),
//   }, function (err, result) {
//   if (err) {
//   console.error(err);
//   const errorObj = {
//   msg: 'error',
//   error: err.message,
//   };
//   res.status(500).json(errorObj);
//   } else {
//   console.log("response",result)
//   const resultObj = JSON.parse(result.body);
//   const responseObj = {
//   msg: 'success',
//   Result: resultObj,
//   };
//   res.status(200).json(responseObj);
//   }
//   });
//   }
   

// };
exports.updateErpResourcePortalVendorlist = (req, res) => {
  const Entry_No = req.params.Entry_No;
  const url = `http://10.83.152.111:4049/NAVTestDB2/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/ResourcePortalVendorlist1(Entry_No='${Entry_No}')`;
  const ERPData = {
    Entry_No: req.body.Entry_No,
    Vendor_Type: req.body.Vendor_Type,
    Name: req.body.Name,
    Address: req.body.Address,
    Address_2: req.body.Address_2,
    City: req.body.City,
    MSMED_Number: req.body.MSMED_Number,
    MSMED: req.body.MSMED,   
    MSMED_Vendor_Type: req.body.MSMED_Vendor_Type,
    Country_Region_Code: req.body.Country_Region_Code,
    Post_Code: req.body.Post_Code,
    E_Mail: req.body.E_Mail,
    GST_Vendor_Type: req.body.GST_Vendor_Type,
    GST_Registration_No: req.body.GST_Registration_No,
    P_A_N_No: req.body.P_A_N_No,
    CIN_No: req.body.CIN_No,
    TAN_No: req.body.TAN_No,
    Vendor_Account_Manager: req.body.Vendor_Account_Manager,
    State_Code:req.body.State_Code,
    Finance_Contact_Name: req.body.Finance_Contact_Name,
    Finance_Contact_Designation: req.body.Finance_Contact_Designation,
    Finance_Contact_Phone_No: req.body.Finance_Contact_Phone_No,
    Finance_Contact_E_Mail: req.body.Finance_Contact_E_Mail,
    Operation_Contact_Name: req.body.Operation_Contact_Name,
    Operation_Contact_Designation: req.body.Operation_Contact_Designation,
    Operation_Contact_Phone_No: req.body. Operation_Contact_Phone_No,
    Operation_Contact_E_Mail: req.body.Operation_Contact_E_Mail ,
    Collection_Contact_Name: req.body.Collection_Contact_Name,
    Collection_Contact_Designation: req.body.Collection_Contact_Designation,
    Collection_Contact_Phone_No: req.body.Collection_Contact_Phone_No,
    Collection_Contact_E_Mail: req.body.Collection_Contact_E_Mail,
    Management_Contact_Name: req.body.Management_Contact_Name,
    Management_Contact_Designation: req.body.Management_Contact_Designation,
    Management_Contact_Phone_No: req.body.Management_Contact_Phone_No,
    Management_Contact_E_Mail:req.body.Management_Contact_E_Mail,
    Others_Contact_Name: req.body.Others_Contact_Name,
    Others_Contact_Designation: req.body.Others_Contact_Designation,
    Others_Contact_Phone_No: req.body.Others_Contact_Phone_No,
    Others_Contact_E_Mail: req.body.Others_Contact_E_Mail,
    Master_Vendor_E_Mail_ID: req.body.Master_Vendor_E_Mail_ID,
    MICR_Swift_Code: req.body.MICR_Swift_Code,
    Year_of_audited_financials: req.body.Year_of_audited_financials,
    Revenue: req.body.Revenue,
    Profit: req.body.Profit,
    Networth: req.body.Networth,
    Current_Assets: req.body.Current_Assets,
    Director_Detail: req.body.Director_Detail,
    Account_Holder_Name: req.body.Account_Holder_Name,
    Account_No: req.body.Account_No,
    Bank_Name: req.body.Bank_Name,
    Bank_Address: req.body.Bank_Address,
    IFSC_Code: req.body.IFSC_Code,
    HSI_Contact_Name_1: req.body.HSI_Contact_Name_1,
    HSI_Contact_E_Mail_1: req.body.HSI_Contact_E_Mail_1,
    HSI_Contact_Contact_No_1: req.body.HSI_Contact_Contact_No_1,
    HSI_Contact_Name_2: req.body.HSI_Contact_Name_2,
    HSI_Contact_E_Mail_2: req.body.HSI_Contact_E_Mail_2,
    HSI_Contact_Contact_No_2: req.body.HSI_Contact_Contact_No_2,
    HSI_Contact_Name_3: req.body.HSI_Contact_Name_3,
    HSI_Contact_E_Mail_3: req.body.HSI_Contact_E_Mail_3,
    HSI_Contact_Contact_No_3: req.body.HSI_Contact_Contact_No_3,
    Shareholder_Name: req.body.Shareholder_Name,
    Organization_Type: req.body.Organization_Type,
  };
  // Replace this with your actual update data
  const updatedData = {
    Name: 'Updated Name',
    Address: 'Updated Address',
  };
  const url1 = `http://10.83.152.111:4049/NAVTestDB2/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/ResourcePortalVendorlist1?$format=json&$filter=Entry_No%20eq%20%27${Entry_No}%27`;
  httpntlm.get({
    url: url1,
    username: 'ERP-API',
    password: 'HSI@#543DCVB',
    workstation: '',
    domain: '',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json;odata.metadata=minimal',
      'User-Agent': 'nodejs/httpntlm',
    }
  }, function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error occurred while retrieving ETag' });
    } else {
      try {
        console.log("result::",result);
              const responseObject = JSON.parse(result.body);
      console.log('eq::', responseObject);
      const str = responseObject.value[0].ETag;
      const replacedStr = str.replace(/;/g, "%3b");
      console.log("replacedStr:", replacedStr);
      const ETag = `W/"'${replacedStr}'"`;
      console.log("ETag", ETag)
        const urlpatch = `http://10.83.152.111:4049/NAVTestDB2/OData/ResourcePortalVendorlist1(Entry_No='${Entry_No}')?company=Hitachi%20Systems%20India%20Pvt%20Ltd`;
        httpntlm.patch({
          url: urlpatch,
          username: 'ERP-API',
          password: 'HSI@#543DCVB',
          workstation: '',
          domain: '',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json;odata.metadata=minimal',
            'User-Agent': 'nodejs/httpntlm',
            'If-Match': ETag,
          },
          body: JSON.stringify(ERPData),
        }, function (err, result) {
          if (err) {
            console.error(err);
            res.status(200).json({ error: 'Error occurred while making the PATCH request' });
          } else {
            if (result.statusCode === 200) {
              res.status(200).json({ message: 'Record updated successfully.', result });
            } else if (result.statusCode === 204) {
              res.status(200).json({ message: 'Record updated successfully.', result });
            } else {
              res.status(200).json({ error: 'Update failed.', result });
            }
          }
        });
      } catch (parseError) {
        console.error(parseError);
        res.status(200).json({ error: 'Error occurred while parsing response body' });
      }
    }
  });
};

exports.postErpResourcePortalVendorlist = (req, res) => {
  const odataUrl = 'http://10.83.152.111:4049/NAVTestDB2/OData/ResourcePortalVendorlist1?$format=json&company=Hitachi%20Systems%20India%20Pvt%20Ltd';
  const data = req.body;
  if (data.MSMEDNumber === "") {
    console.log("msmednumber::")
    const errorObj = {
      msg: 'error',
      error: 'MSMEDNumber must be filled first before updating MSMED'
    };
  }
  httpntlm.post({
    url: odataUrl,
    username: 'ERP-API',
    password: 'HSI@#543DCVB',
    workstation: '',
    domain: '',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json;odata.metadata=minimal',
      'OData-Version': '1.0',
      'User-Agent': 'nodejs/httpntlm'
    },
    body: JSON.stringify({
      ...data
    })
  }, function (err, result) {
    if (err) {
      console.error(err);
      const errorObj = {
        msg: 'error',
        error: err.message
      };
      res.status(200).json(errorObj);
    } else {
      const resultObj = JSON.parse(result.body);
      const responseObj = {
        msg: 'success',
        Result: resultObj
      };
      res.status(200).json(responseObj);
    }

  });
};
//getNobyParentCode
exports.getErpVendor_APIByParent_Vendor_Code = (req, res) => {
  const Parent_Vendor_Code = req.params.Parent_Vendor_Code;
  httpntlm.get({
    url: "http://10.83.152.111:4049/NAVTestDB2/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/Vendor_API?$format=json&$filter=Parent_Vendor_Code eq '" + Parent_Vendor_Code + "'",
    username: 'ERP-API',
    password: 'HSI@#543DCVB',
    workstation: '',
    domain: '',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json;odata.metadata=minimal',
      'User-Agent': 'nodejs/httpntlm',
    }
  }, function (err, result) {
    if (err) {
      console.error(err);
    } else {
      const data = JSON.parse(result.body).value;
      const response = data.map((item) => {
        return {
          No: item.No,
          City: item.City,
          State_Code: item.State_Code,
          Country_Region_Code: item.Country_Region_Code
        };
      });
      res.status(200).json(response);
    }
  });
};

//P_A_N_No
exports.getErpVendor_APIByP_A_N_No = (req, res) => {
  const Ticket_ID = req.params.Ticket_ID;
  httpntlm.get({
    url: "http://10.83.152.111:4049/NAVTestDB2/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/ResourcePortalVendorlist1?$format=json&$filter=Entry_No eq '" + Ticket_ID + "'",
    username: 'ERP-API',
    password: 'HSI@#543DCVB',
    workstation: '',
    domain: '',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json;odata.metadata=minimal',
      'User-Agent': 'nodejs/httpntlm',
    }
  }, function (err, result) {
    if (err) {
      console.error(err);
    } else {
      const data = JSON.parse(result.body).value;
      if (data.length > 0) {
        console.log("panNo::", data[0].P_A_N_No);
        const P_A_N_No = data[0].P_A_N_No;
        httpntlm.get({
          url: "http://10.83.152.111:4049/NAVTestDB2/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/ResourcePortalVendorlist1?$format=json&$filter=P_A_N_No eq '" + P_A_N_No + "'",
          username: 'ERP-API',
          password: 'HSI@#543DCVB',
          workstation: '',
          domain: '',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json;odata.metadata=minimal',
            'User-Agent': 'nodejs/httpntlm',
          }
        }, function (err, result) {
          if (err) {
            console.error(err);
          } else {
            const data = JSON.parse(result.body).value;
            const response = data.map((item) => {
              return {
                City: item.City,
                State_Code: item.State_Code,
                Country_Region_Code: item.Country_Region_Code,
                Post_Code: item.Post_Code,
                No: item.Vendor_No
              };
            });
            res.status(200).json({response, message: "success"});
          }
        });
      } else {
        res.status(200).json({ message: 'No record found for the given Ticket_ID' });
      }
    }
  });
};

//ticketid  ---- PAN_NO 
exports.getErpVendor_APIByVendorId = (req, res) => {

  const Ticket_ID = req.params.ticketID;
  console.log("req-----##############--------", Ticket_ID)
  httpntlm.get({
    url: "http://10.83.152.111:4049/NAVTestDB2/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/ResourcePortalVendorlist1?$format=json&$filter=Entry_No eq '" + Ticket_ID + "'",
    username: 'ERP-API',
    password: 'HSI@#543DCVB',
    workstation: '',
    domain: '',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json;odata.metadata=minimal',
      'User-Agent': 'nodejs/httpntlm',
    }
  }, async function (err, result) {
    console.log("result--------------erp--->>>", JSON.parse(result.body).value)
    if (err) {
      console.error(err);
    } else {
      const response = JSON.parse(result.body).value;
      res.status(200).json({ response, message: "success" });
    }
  });
};


//vendorCode
exports.getuserIdByVcode = async (req, res) => {
  const vCode = req.params.vCode;

  httpntlm.get({
    url: "http://10.83.152.111:4049/NAVTestDB2/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/ResourcePortalVendorlist1?$format=json&$filter=Vendor_No eq '" + vCode + "'",
    username: 'ERP-API',
    password: 'HSI@#543DCVB',
    workstation: '',
    domain: '',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json;odata.metadata=minimal',
      'User-Agent': 'nodejs/httpntlm',
    }
  }, async function (err, result) {
    if (err) {
      console.error(err);
    } else {
      const data = JSON.parse(result.body).value;
      if (data.length > 0) {

        const EntryNo = data[0].Entry_No;

        var userID = await SignUpSchema.findOne({
          where: { Ticket_ID : EntryNo },
        });

       
        if (userID !== null&& userID !== '' && userID !== undefined) {
          
          res.status(200).json(userID.userId);
        } else {
          console.log("userID is null");
          res.status(200).json({ message: 'No record found for the given Ticket_ID' });
        }
      } else {
        res.status(200).json({ message: 'No record found for the given Ticket_ID' });
      }
    }
  });
};


//getAllPanNofromvendorCardApi
exports.getAllPanNofromvendorCardApi = (req, res) => {
  httpntlm.get({
    url: "http://10.83.152.111:4049/NAVTestDB2/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/Vendor_API?$format=json",
    username: 'ERP-API',
    password: 'HSI@#543DCVB',
    workstation: '',
    domain: ''
  }, function (err, result) {
    const data = JSON.parse(result.body).value;
    const panNumbers = data.map(obj => ({ P_A_N_No: obj.P_A_N_No }));
    if (err) return err;
    res.status(200).json(panNumbers);
  })
};

exports.getErpPurchaseOrder_API = (req, res) => {

  httpntlm.get({
    url: "http://10.83.152.111:4049/NAVTestDB2/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/PurchaseOrdersList?$format=json",
    // url: "http://10.83.152.111:4049/NAVTestDB2/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/PurchaseOrderCard?$format=json",
    username: 'ERP-API',
    password: 'HSI@#543DCVB',
    workstation: '',
    domain: ''
  }, function (err, result) {
    if (err) return err;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(result.body);
  })
};

exports.getErpPurchaseOrderLineEDD_API = (req, res) => {
  console.log("resuested EDD--------------------->>>>>")
  httpntlm.get({
    url: "http://10.83.152.111:4049/NAVTestDB2/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/PurchaseOrderLine?$format=json",
    username: 'ERP-API',
    password: 'HSI@#543DCVB',
    workstation: '',
    domain: ''
  }, function (err, result) {
    if (err) return err;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(result.body);
  })
};

//getPurchaseOrdersList
exports.getErpPurchaseOrdersLists = (req, res) => {
  httpntlm.get({
    url: "http://10.83.152.111:4049/NAVTestDB2/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/PurchaseOrdersList?$format=json",
    username: 'ERP-API',
    password: 'HSI@#543DCVB',
    workstation: '',
    domain: ''
  }, function (err, result) {
    if (err) return err;
    const data = JSON.parse(result.body).value;
    res.status(200).json({ message: 'success', result: data });
  })
};
exports.getErpPurchaseOrdersListsById = (req, res) => {
  const No = req.params.No;
  httpntlm.get({
    url: "http://10.83.152.111:4049/NAVTestDB2/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/PurchaseOrdersList?$format=json&$filter=No eq '" + No + "'",
    username: 'ERP-API',
    password: 'HSI@#543DCVB',
    workstation: '',
    domain: '',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json;odata.metadata=minimal',
      'User-Agent': 'nodejs/httpntlm',
    }
  }, function (err, result) {
    if (err) {
      console.error(err);
    } else {
      const record = JSON.parse(result.body).value[0];
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(record));
    }
  });
};
const puppeteer = require('puppeteer');
async function refreshSharePointPageAndGetFormDigest() {
  const browser = await puppeteer.launch({
    headless: 'new',
    ignoreHTTPSErrors: true, // Ignore HTTPS errors
  });
  const page = await browser.newPage();

  // Replace with your SharePoint page URL
  const sharepointPageUrl = 'http://sharepnt:42916/sites/Hitachi/ERP-DMS-PROTECTED/SitePages/Home.aspx';

  // Authenticate using basic authentication
  await page.authenticate({ username: 'ERP-API', password: 'HSI@#543DCVB' });

  await page.goto(sharepointPageUrl, { timeout: 60000 });
  await page.reload(); // Simulate a page refresh

  // Extract the new form digest value from the refreshed page
  const formDigestValue = await page.evaluate(() => {
    const formDigestElement = document.querySelector('input[name="__REQUESTDIGEST"]');
    return formDigestElement ? formDigestElement.value : null;
  });

  await browser.close();

  return formDigestValue;
}
exports.getSharepointFolders = (req, res) => {
  const username = 'ERP-API';
  const password = 'HSI@#543DCVB';
  const url = 'http://sharepnt:42916/sites/Hitachi/ERP-DMS-PROTECTED/SitePages/Home.aspx';
  refreshSharePointPageAndGetFormDigest()
  .then(formDigestValue => {
    if (formDigestValue) {
      console.log('New Form Digest Value:', formDigestValue);
      res.status(200).json({ message: 'formDigestValue found',formDigestValue });
    } else {
      console.log('Form Digest Value not found.');
      res.status(200).json({ message: 'formDigestValue found'});
    }
  })
  .catch(error => {
    console.error('Error:', error);
    res.status(200).json({ message: 'error',error});
  });
};

exports.createsharepointFolderByTicketId = (req, res) => {
  const username = 'ERP-API';
  const password = 'HSI@#543DCVB';
  const ipAddress = '10.83.152.248';
  const port = '42916';
  const sharepointUrl = `http://${ipAddress}:${port}/sites/Hitachi/ERP-DMS-PROTECTED/`;

  try {
    httpntlm.post({
      url: sharepointUrl + '_api/contextinfo',
      username: username,
      password: password
    }, function (err, response) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Error retrieving form digest value',err });
      }

      const xmlResponse = response.body;

      const parser = new xml2js.Parser();
      parser.parseString(xmlResponse, function (parseErr, result) {
        if (parseErr) {
          console.log(parseErr);
          return res.status(500).json({ error: 'Error parsing XML response' });
        }

        try {
          const formDigestValue = result['d:GetContextWebInformation']['d:FormDigestValue'][0];
          const folderName = req.body.Ticket_ID;
          const folderUrl = `${sharepointUrl}Shared%20Documents/${folderName}`;

          const createFolderPayload = {
            __metadata: { type: 'SP.Folder' },
            ServerRelativeUrl: folderUrl
          };

          const createFolderUrl = `${sharepointUrl}/_api/web/GetFolderByServerRelativeUrl('${folderUrl}')/Folders`;

          httpntlm.post({
            url: createFolderUrl,
            username: username,
            password: password,
            headers: {
              'Accept': 'application/json;odata=verbose',
              'Content-Type': 'application/json;odata=verbose',
              'X-RequestDigest': formDigestValue
            },
            body: JSON.stringify(createFolderPayload)
          }, function (folderErr, folderResponse) {
            if (folderErr) {
              console.log('Error creating folder:', folderErr);
              return res.status(500).json({ error: 'Error creating folder' });
            } else {
              console.log('Folder created successfully:', folderUrl);
              const documentFields = req.body;
              const subfolders = [];
              for (const key in documentFields) {
                if (documentFields.hasOwnProperty(key)) {
                  const value = documentFields[key];
                  if (value && value !== undefined && value !== null && value !=="undefined" && value !== "null") {
                    const subfolderName = key;
                    const subfolderUrl = `${folderUrl}/${subfolderName}`;
                    subfolders.push(subfolderUrl);

                    const createSubfolderPayload = {
                      __metadata: { type: 'SP.Folder' },
                      ServerRelativeUrl: subfolderUrl
                    };

                    const createSubfolderUrl = `${sharepointUrl}/_api/web/GetFolderByServerRelativeUrl('${subfolderUrl}')/Folders`;

                    httpntlm.post({
                      url: createSubfolderUrl,
                      username: username,
                      password: password,
                      headers: {
                        'Accept': 'application/json;odata=verbose',
                        'Content-Type': 'application/json;odata=verbose',
                        'X-RequestDigest': formDigestValue
                      },
                      body: JSON.stringify(createSubfolderPayload)
                    }, function (subfolderErr, subfolderResponse) {
                      if (subfolderErr) {
                        console.log('Error creating subfolder:', subfolderErr);
                      } else {
                        console.log('Subfolder created successfully:', subfolderUrl);
                        console.log("documents",req.body.RPD_Doc);
                        if ( key === 'GST_Doc'|| key === 'PAN_Doc'|| key === 'MSME_Doc'|| key === 'form_10f'|| key === 'PE_Declaration_Doc'|| key === 'Tax_residency_Doc'|| key === 'fileDisclosure'|| key === 'TAN_Doc'|| key === 'RPD_Doc'|| key === 'COC_Doc'|| key === 'NDA_Doc'|| key === 'financial_data'|| key === 'financial_data2'|| key === 'bankdetailDoc') {
                          try {
                            const uploadsDir = path.join(__dirname, '..', 'uploads');
                            const fileName = value.split('/').pop(); 
                            const sanitizedFileName = fileName.replace(/[\\#%*:<>?/|]/g, ''); 
                            const filePath = path.join(__dirname, '..', 'uploads', sanitizedFileName);
                            const fileContent = fs.readFileSync(filePath);
                            console.log("directory::",filePath);
                            console.log("fileName::",fileName);
                            const siteUrl = `http://${ipAddress}:${port}/sites/Hitachi/ERP-DMS-PROTECTED`;
                            const folderRelativeUrl = `/sites/Hitachi/ERP-DMS-PROTECTED/Shared%20Documents/${req.body.Ticket_ID}/${key}`;
                            const uploadUrl = `${siteUrl}/_api/web/getfolderbyserverrelativeurl('${folderRelativeUrl}')/Files/add(url='${fileName}', overwrite=true)`;
                            console.log("uploadurll:::",uploadUrl);
                            httpntlm.post({
                              url: uploadUrl,
                              username: username,
                              password: password,
                              headers: {
                                'X-RequestDigest': formDigestValue,
                                "Accept": "application/json; odata=verbose",  
                                "Content-Type": "application/octet-stream"
                              },
                              body: fileContent,
                            }, function (uploadErr, uploadResponse) {
                              if (uploadErr) {
                                console.log("uploadErr", uploadErr);
                                return res.status(500).json({ msg: "error", result: uploadErr });
                              } else {
                                console.log("uploadResponse", uploadUrl);
                              }
                            });
                          } catch (uploadErr) {
                            console.log("Error uploading file:", uploadErr);
                            return res.status(500).json({ error: 'Error uploading file' });
                          }
                        }
                      }
                    });
                  }
                }
              }

              return res.status(200).json({ message: 'success', result: "File Uploaded to SharePoint successfully" });
            }
          });
        } catch (err) {
          console.log('Error retrieving form digest value:', err);
          return res.status(500).json({ error: 'Error retrieving form digest value' });
        }
      });
    });
  } catch (err) {
    console.log('Error performing SharePoint operation:', err);
    return res.status(500).json({ error: 'Error performing SharePoint operation' });
  }
};

exports.getOutOfIndiaVcode = async (req, res) => {
  const ticketId = req.params.ticketId;

  httpntlm.get({
    url: "http://10.83.152.111:4049/NAVTestDB2/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/ResourcePortalVendorlist1?$format=json&$filter=Entry_No eq '" + ticketId + "'",
    username: 'ERP-API',
    password: 'HSI@#543DCVB',
    workstation: '',
    domain: '',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json;odata.metadata=minimal',
      'User-Agent': 'nodejs/httpntlm',
    }
  }, async function (err, result) {
    if (err) {
      console.error(err);
    } else {
      const data = JSON.parse(result.body).value;

      if (data.length > 0) {

        
        if (err) return err;
        res.status(200).json(data);
      } else {
        res.status(200).json({ message: 'Vendor No not found' });
      }
    }
  });
};

exports.uploadDocbyVendorCode = async(req, res) => {

  vendorCodeDocPath = "";

  var upload = multer({ storage: storage }).fields([

    { name: "docName", maxCount: 1, },
    
  ]);

  await upload(req, res, function (err) {

    console.log("req", req.body);
    console.log("req", req.files);
    const username = 'ERP-API';
    const password = 'HSI@#543DCVB';
    const ipAddress = '10.83.152.248';
    const port = '42916';
    const sharepointUrl = `http://${ipAddress}:${port}/sites/Hitachi/ERP-DMS-PROTECTED/`;

    try {
      httpntlm.post({
        url: sharepointUrl + '_api/contextinfo',
        username: username,
        password: password
      }, function (err, response) {
        if (err) {
          console.log(err);
          return res.status(200).json({ error: 'Error retrieving form digest value' });
        }

        const xmlResponse = response.body;

        const parser = new xml2js.Parser();
        parser.parseString(xmlResponse, function (parseErr, result) {
          if (parseErr) {
            console.log(parseErr);
            return res.status(200).json({ error: 'Error parsing XML response' });
          }

          try {
            const formDigestValue = result['d:GetContextWebInformation']['d:FormDigestValue'][0];
            const folderName = req.body.vendorId;

            console.log("folderName------------->", folderName);

            const folderUrl = `${sharepointUrl}Shared%20Documents/${folderName}`;

            const createFolderPayload = {
              __metadata: { type: 'SP.Folder' },
              ServerRelativeUrl: folderUrl
            };

            const createFolderUrl = `${sharepointUrl}/_api/web/GetFolderByServerRelativeUrl('${folderUrl}')/Folders`;

            httpntlm.post({
              url: createFolderUrl,
              username: username,
              password: password,
              headers: {
                'Accept': 'application/json;odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
                'X-RequestDigest': formDigestValue
              },
              body: JSON.stringify(createFolderPayload)
            }, function (folderErr, folderResponse) {
              if (folderErr) {
                console.log('Error creating folder:', folderErr);
                return res.status(200).json({ error: 'Error creating folder' });
              } else {
                console.log('Folder created successfully:', folderUrl);

                const vendorCodeDoc = vendorCodeDocPath;
                console.log("filename", req.body.docName);
console.log("docpath::",vendorCodeDocPath);
                if (vendorCodeDoc) {
                  try {
                    
                    const siteUrl = `http://${ipAddress}:${port}/sites/Hitachi/ERP-DMS-PROTECTED`;
                    const folderRelativeUrl = `/sites/Hitachi/ERP-DMS-PROTECTED/Shared%20Documents/${req.body.vendorId}/${vendorCodeDoc}`;
                    const uploadUrl = `${siteUrl}/_api/web/getfolderbyserverrelativeurl('${folderRelativeUrl}')/Files/add(url='${vendorCodeDoc}', overwrite=true)`;
                    console.log("uploadurll:::", uploadUrl);
                    httpntlm.post({
                      url: uploadUrl,
                      username: username,
                      password: password,
                      headers: {
                        'X-RequestDigest': formDigestValue,
                        "Accept": "application/json; odata=verbose",
                        "Content-Type": "application/octet-stream"
                      },
                      body: fileContent,
                    }, function (uploadErr, uploadResponse) {
                      if (uploadErr) {
                        console.log("uploadErr", uploadErr);
                        return res.status(200).json({ msg: "error", result: uploadErr });
                      } else {
                        console.log("uploadResponse", uploadUrl);
                      }
                    });
                  } catch (uploadErr) {
                    console.log("Error uploading file:", uploadErr);
                    return res.status(200).json({ error: 'Error uploading file' });
                  }
                }


                return res.status(200).json({ message: 'success', result: "File Uploaded to SharePoint successfully" });
              }
            });
          } catch (err) {
            console.log('Error retrieving form digest value:', err);
            return res.status(200).json({ error: 'Error retrieving form digest value' });
          }
        });
      });
    } catch (err) {
      console.log('Error performing SharePoint operation:', err);
      return res.status(200).json({ error: 'Error performing SharePoint operation' });
    }
  
    
  });
}

exports.GenerateVendorCode = (req, res) => {
  const username = 'ERP-API';
  const password = 'HSI@#543DCVB';
  const ticketID = req.body.ticketID;
  const url = 'http://10.83.152.111:4048/NAVTestDB2/WS/Hitachi%20Systems%20India%20Pvt%20Ltd/Codeunit/CodeunitMultipleWork';
  const soapEnvelope = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="urn:microsoft-dynamics-schemas/codeunit/CodeunitMultipleWork">
    <soapenv:Header/>
    <soapenv:Body>
        <tns:Create_Vendor_Against_TicketID>
            <tns:cdRefrenceEntryNo>${ticketID}</tns:cdRefrenceEntryNo>
        </tns:Create_Vendor_Against_TicketID>
    </soapenv:Body>
</soapenv:Envelope>`;
  const headers = {
    'Content-Type': 'text/xml; charset=utf-8',
    'SOAPAction': 'urn:microsoft-dynamics-schemas/codeunit/CodeunitMultipleWork:Create_Vendor_Against_TicketID',
  };
  const ntlmOptions = {
    username: username,
    password: password,
  };
  httpntlm.post({
    url: url,
    headers: headers,
    username: ntlmOptions.username,
    password: ntlmOptions.password,
    body: soapEnvelope,
  }, function (err, response) {
    if (err) {
      console.error('Error:', err);
      return res.status(200).json({ message: 'error', err });
    }
 const xmlResponse = response.body;
 const return_value = xmlResponse.match(/<return_value>(.*?)<\/return_value>/)[1];

    return res.status(200).json({ message: 'success', data: response ,vendorCode:return_value});
  });
};

exports.getErpStateCode = (req, res) => {
  let state = req.params.state;
  let normalizedState = state.replace('&', 'and').replace(/\s/g, ''); 
  let stateWithSpacesRegex = new RegExp('^' + normalizedState, 'i'); 
  let stateWithoutSpacesRegex = new RegExp('^' + normalizedState, 'i'); 

  httpntlm.get({
    url: "http://10.83.152.111:4049/NAVTestDB2/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/States?$format=json",
    username: 'ERP-API',
    password: 'HSI@#543DCVB',
    workstation: '',
    domain: '',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json;odata.metadata=minimal',
      'User-Agent': 'nodejs/httpntlm',
    }
  }, function (err, result) {
    if (err) {
      console.error(err);
      res.status(200).json({ message: 'An error occurred while fetching the data.' });
    } else {
      const data = JSON.parse(result.body);
      const matchingStates = data.value.filter(({ Description }) => {
        return stateWithSpacesRegex.test(Description.replace(/\s/g, '')) || stateWithoutSpacesRegex.test(Description.replace(/\s/g, ''));
      });
      
      if (matchingStates.length > 0) {
        const simplifiedData = matchingStates.map(({ Code, Description }) => ({ Code, Description }));
        res.status(200).json({ message: 'Success', result: simplifiedData });
      } else {
        res.status(200).json({ message: 'State not found in ERP system.' });
      }
    }
  });
};

//findPan_no present or not
exports.SearchpanNo= (req, res) => {
  console.log("pan")
  const requestedPanNo = req.params.P_A_N_No;
  const userId = req.params.userId;
  StatDetailSchema.findOne({
    where: {
      P_A_N_No: requestedPanNo,
    },
  }).then((users) => {
      console.log("pan6")
      if (users) {
        console.log("check it is from same user::")
        if (users.userId === userId) { 
          res.status(200).json({ message: "error", result: "Pan no already exists for the same user!",existingUserId: users.userId});
        } else {
          vendorCommunicationDetails.findOne({
            where: {
              userId:users.userId,
            },
          }).then((masterUsers) => {
            console.log("mastervendoremailiD",masterUsers.mastervendor_email);
            res.status(200).json({message:"success",result: "Pan no already exists!",existingUserId: users.userId,mastervendor_email:masterUsers.mastervendor_email });
          })     
        }
      } else {
        console.log("pan8")
        res.status(200).json({message:"error",result: "Requested pan_no not found" });
      }
    })
    .catch((error) => {
      res.status(200).json({ error: "Error occurred while querying the database." ,error});
    });
  }
