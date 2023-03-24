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
  const httpntlm = require('httpntlm');

  exports.getErp= (req, res) => {
    httpntlm.get({
      url: "http://10.83.152.111:9048/DynamicsNav90April22/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/Salespeople_PurchasersAllRecords?$format=json",
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

  //VendorMasterIntegration
  exports.getErpVendorMasterIntegration= (req, res) => {
    httpntlm.get({
      url: "http://dnav-appserver.microclinic.in:4049/NAVTestDB2/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/VendorMasterIntegration?$format=json",
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
  //API Testing OData
  exports.getErpTestingOData= (req, res) => {
    httpntlm.get({
      url: "http://dnav-appserver.microclinic.in:4049/NAVTestDB2/OData/Company('Hitachi%20Systems%20India%20Pvt%20Ltd')/APITestingOData?$format=json",
      username: 'ERP-API',
      password: 'HSI@#543DCVB',
      workstation: '',
      domain: '',
      
  }, function (err, result){
      if(err) return err;
               res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(result.body);
  })
  
  }; 
  //post OData
  const ntlmreq = require('request-ntlm-lite');
  const request = require('request');
  const ntlmCredentials = {
    username: 'ERP-API',
    password: 'HSI@#543DCVB',
    domain: ''
};
const options = {
  method: 'POST',
  url: 'http://dnav-appserver.microclinic.in:4049/NAVTestDB2/OData/Company(\'Hitachi%20Systems%20India%20Pvt%20Ltd\')/VendorMasterIntegration?$format=json',
  auth: {
      user: ntlmCredentials.username,
      pass: ntlmCredentials.password,
      domain: ntlmCredentials.domain
  },
  headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'DataServiceVersion': '2.0',
      'MaxDataServiceVersion': '3.0',
  },
  body: JSON.stringify({

      "Entry_No": 22,
      "Detail": "Test Entry 1",
  })
};


  exports.postErpTestingOData= (req, res) => {
    httpntlm.post({
      url:'http://dnav-appserver.microclinic.in:4049/NAVTestDB2/OData/APITestingOData?$format=json&company=Hitachi%20Systems%20India%20Pvt%20Ltd', 
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

  exports.postErpVendorMasterIntegration= (req, res) => {
    httpntlm.post({
      url:'http://dnav-appserver.MICROCLINIC.IN:4049/NAVTestDB2/OData/VendorMasterIntegration?$format=json&company=Hitachi%20Systems%20India%20Pvt%20Ltd', 
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

  exports.getErpById= (req, res) => {
    const url1 = 'http://dnav-appserver.microclinic.in:4049/NAVTestDB2/OData/Company(\'Hitachi%20Systems%20India%20Pvt%20Ltd\')/APITestingOData?$format=json&$filter=Entry_No%20eq%2015';
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
        console.log('eq::',responseObject.value[0].ETag);   
            res.writeHead(200, { 'Content-Type': 'application/json' });
            
        res.end(result.body);
      }
    });
  };

  exports.updateErpVendorMasterIntegration= (req, res) => {
    // const url1 = 'http://dnav-appserver.microclinic.in:4049/NAVTestDB2/OData/Company(\'Hitachi%20Systems%20India%20Pvt%20Ltd\')/APITestingOData?$format=json&$filter=Entry_No%20eq%20\'A0029\'';
    const url1 = 'http://dnav-appserver.microclinic.in:4049/NAVTestDB2/OData/Company(\'Hitachi%20Systems%20India%20Pvt%20Ltd\')/APITestingOData?$format=json&$filter=Entry_No%20eq%2016';
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
