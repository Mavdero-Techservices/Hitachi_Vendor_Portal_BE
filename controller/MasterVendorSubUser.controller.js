const db = require("../model");
const MasterVendorSubUserSchema= db.MasterVendorSubUser;

exports.saveMasterVendorSubUser = (req, res) => {
    const SubUserId = 'SubUserId' + Math.floor(100000 + Math.random() * 900000);
    const userId = req.body.userId;
    const Name=req.body.Name;
    const designation=req.body.designation;
    const Department=req.body.Department;
    const emailId=req.body.emailId;
    const mobileNo=req.body.mobileNo;
    const loginId=req.body.loginId;
    const password=req.body.password;
    const roles=req.body.roles;

    const user = new MasterVendorSubUserSchema({
        SubUserId: SubUserId,
        userId: userId,
        Name:Name,
        designation:designation,
        Department:Department,
        emailId:emailId,
        mobileNo:mobileNo,
        loginId:loginId,
        password:password,
        roles:roles
    });
    user.save()
        .then(result => {
            console.log("user");
            return res.status(200).json({ status: "success", message: "saved Successfully", result });
        }).catch(err => {
            return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
        });
}

exports.getAllMasterVendorSubUser= (req, res) => {
    MasterVendorSubUserSchema.findAll()
        .then(data => {
            return res.status(200).json({ msg: "success", result: data });
        })
        .catch(err => {
            return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
        });
}

exports.getMasterVendorSubUserById= (req, res) => {
    var SubUserId=req.body.SubUserId;
    MasterVendorSubUserSchema.findOne({
        where: {SubUserId: SubUserId },
    }).then(result => {
        return res.status(200).json({ status: "success", message: "saved Successfully", result });  
    }).catch(err => {
        return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
    });
}
exports.UpdateMasterVendorSubUserById= (req, res) => {
  var Name=req.body.Name;
  var designation=req.body.designation;
  var Department=req.body.Department;
  var emailId=req.body.emailId ;
  var mobileNo=req.body.mobileNo;
  var loginId=req.body.loginId;
  var password=req.body.password;
  var roles=req.body.roles;
  var SubUserId=req.body.SubUserId;

MasterVendorSubUserSchema.update(
    {  Name: Name, 
       designation:designation,
        Department:Department,
        emailId:emailId,
        mobileNo:mobileNo,
        loginId:loginId,
        password:password,
        roles:roles },
    { where: { SubUserId:SubUserId} }
  ).then(result => {
    return res.status(200).json({ status: "success", message: "updated Successfully",result });  
  }).catch(err => {
    return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
});
}

exports.deleteMasterVendorSubUserById= (req, res) => {
        const id = req.params.id;    
        MasterVendorSubUserSchema
          .destroy({
            where: { id: id },
          })
          .then((data) => {
            return res
              .status(200)
              .json({ msg: "success", result: "deleted successfully" });
          })
          .catch((err) => {
            return res
              .status(200)
              .json({ status: "error", data: { message: "Error Response", err } });
          });
      
  }