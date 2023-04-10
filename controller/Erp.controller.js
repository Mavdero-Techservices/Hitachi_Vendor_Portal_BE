const httpntlm = require('httpntlm');

//getErpVendor_API
exports.getErpVendor_API= (req, res) => {
    httpntlm.get({      
      url: "http://10.83.152.111:4049/NAVTestDB2/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/Vendor_API?$format=json",
      username: 'ERP-API',
      password: 'HSI@#543DCVB',
      workstation: '',
      domain: ''
  }, function (err, result){
      if(err) return err;
               res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(result.body);
  })
  };
//
exports.getErpVendor_APIById= (req, res) => {
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
  }, function(err, result) {
    if (err) {
      console.error(err);
    } else {
      const record = JSON.parse(result.body).value[0];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(record));
    }
  });
};
exports.postErpVendor_API= (req, res) => {
  httpntlm.post({
    url:'http://10.83.152.111:4049/NAVTestDB2/OData/Vendor_API?$format=json&company=Hitachi%20Systems%20India%20Pvt%20Ltd', 
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
    body:JSON.stringify(req.body),
}, function (err, result){
    if(err) return err;
    console.log("res::",req);
    res.setHeader("Content-Type", "application/json");
             res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(result.body);
})
};
//updateErpVendor_API
exports.updateErpVendor_API= (req, res) => {
  // const url1 = 'http://dnav-appserver.microclinic.in:4049/NAVTestDB2/OData/Company(\'Hitachi%20Systems%20India%20Pvt%20Ltd\')/APITestingOData?$format=json&$filter=Entry_No%20eq%20\'A0029\'';
  const url1 = 'http://dnav-appserver.microclinic.in:4049/NAVTestDB2/OData/Company(\'Hitachi%20Systems%20India%20Pvt%20Ltd\')/Vendor_API?$format=json&$filter=Parent_Vendor_Code%20eq%20A0029';
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
  }, function(err, result) {
    if (err) {
      console.error(err);
    } else {
      const responseObject= JSON.parse(result.body);
      console.log('eq::',responseObject);
      const str = responseObject.value[0].ETag;
const replacedStr = str.replace(/;/g, "%3b");
      console.log("replacedStr:",replacedStr);
      const ETag = `W/"'${replacedStr}'"`;
      console.log("ETag",ETag)
  const url2 = 'http://dnav-appserver.microclinic.in:4049/NAVTestDB2/OData/Vendor_API(Parent_Vendor_Code=A0029)?company=Hitachi%20Systems%20India%20Pvt%20Ltd';
  const payload = {
    Ticket_ID: ""
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
      'If-Match':ETag
    },         
    body: JSON.stringify(payload),
  }, function (err, result2) {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      const errorResponse = {
        "odata.error": {
          "code": "",
          "message": {
            "lang": "en-US",
            "value": "Another user has already changed the record."
          }
        }
      };
      console.log('PUT request successful.');
      console.log("error",errorResponse["odata.error"].message.value);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(result2.body);
    }
  });
    }
  });
 
  
  
};

  //ResourcePortalVendorlist
  exports.getErpResourcePortalVendorlist= (req, res) => {
    httpntlm.get({      
      url: "http://10.83.152.111:4049/NAVTestDB2/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/ResourcePortalVendorlist1?$format=json",
      username: 'ERP-API',
      password: 'HSI@#543DCVB',
      workstation: '',
      domain: ''
  }, function (err, result){
      if(err) return err;
               res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(result.body);
  })
  };
  ///getErpResourcePortalVendorlistById
  exports.getErpResourcePortalVendorlistById= (req, res) => {
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
    }, function(err, result) {
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
exports.updateErpResourcePortalVendorlist= (req, res) => {
  const Refrence_Entry_No = req.params.Refrence_Entry_No;
  const url1 = 'http://dnav-appserver.microclinic.in:4049/NAVTestDB2/OData/Company(\'Hitachi%20Systems%20India%20Pvt%20Ltd\')/APITestingOData?$format=json&$filter=Entry_No%20eq%2016';
  httpntlm.get({
    url: "http://10.83.152.111:4049/NAVTestDB2/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/ResourcePortalVendorlist1?$format=json&$filter=Refrence_Entry_No eq '" + Refrence_Entry_No + "'",
    username: 'ERP-API',
    password: 'HSI@#543DCVB',
    workstation: '',
    domain: '',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json;odata.metadata=minimal',
      'User-Agent': 'nodejs/httpntlm',
    }
  }, function(err, result) {
    if (err) {
      console.error(err);
    } else {
      const responseObject= JSON.parse(result.body);
      console.log('eq::',responseObject.value[0].ETag);
      const str = responseObject.value[0].ETag;
const replacedStr = str.replace(/;/g, "%3b");
      console.log("replacedStr:",replacedStr);
      const ETag = `W/"'${replacedStr}'"`;
      console.log("ETag",ETag)
  const url2 = 'http://dnav-appserver.microclinic.in:4049/NAVTestDB2/OData/APITestingOData(Entry_No=16)?company=Hitachi%20Systems%20India%20Pvt%20Ltd';
  const payload = {
    Detail: "karthigaPalani",
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
      'If-Match':ETag
    },         
    body: JSON.stringify(payload),
  }, function (err, result2) {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      const errorResponse = {
        "odata.error": {
          "code": "",
          "message": {
            "lang": "en-US",
            "value": "Another user has already changed the record."
          }
        }
      };
      console.log('PUT request successful.');
      console.log("error",errorResponse["odata.error"].message.value);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(result2.body);
    }
  });
    }
  });
 
  
  
 
  
  
};


// Function to buffer data with Ticket ID
function bufferDataWithTicketId(data, Ticket_ID) {
  const sqlQuery = `INSERT INTO buffer_table (Ticket_ID, column1, column2, ...) VALUES (${Ticket_ID}, '${data.column1}', '${data.column2}', ...)`;
}

exports.postErpResourcePortalVendorlist= (req, res) => {
  // OData endpoint URL
  const odataUrl = 'http://10.83.152.111:4049/NAVTestDB2/OData/ResourcePortalVendorlist1?$format=json&company=Hitachi%20Systems%20India%20Pvt%20Ltd';

  const data = req.body;

  const Ticket_ID = 12345;


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
      ...data, // Include the data in the body of the POST request
      Ticket_ID: Ticket_ID // Include the Ticket ID in the body of the POST request
    })
  }, function (err, result) {
    if (err) {
      console.error(err);
    } else {
      // Call the function to insert the data into the buffer table with the Ticket ID
      bufferDataWithTicketId(data, Ticket_ID);
      console.log('Data buffered successfully.');
      // Return the response from the OData endpoint
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(result.body);
    }
  });
};
//getNobyParentCode
exports.getErpVendor_APIByParent_Vendor_Code= (req, res) => {
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
  }, function(err, result) {
    if (err) {
      console.error(err);
    } else {
      const data = JSON.parse(result.body).value;
      const response = data.map((item) => {
        return { No: item.No,
          City: item.City,
          State_Code: item.State_Code,
          Country_Region_Code: item.Country_Region_Code };
      });
      res.status(200).json(response);
    }
  });
};