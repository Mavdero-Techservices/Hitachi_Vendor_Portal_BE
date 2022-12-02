const db = require("../model");
const SignUpSchema = db.singUp;
//SignUp
exports.postSingUp = (req, res) => {
  const signUp = {
    companyName: req.body.companyName,
    phoneNumber: req.body.phoneNumber,
    contactPerson: req.body.contactPerson,
    emailId: req.body.emailId,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    verifiedUser: req.body.verifiedUser
  };
  SignUpSchema.create(signUp)
    .then(data => {
      return res.status(200).json({ msg: "success", result: data });
    })
    .catch(err => {
      return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
    });
};
//login
exports.postLogin = (req, res) => {
  const emailId = req.params.emailId;
  SignUpSchema.findOne({
    where: { emailId: emailId },
  })
    .then(user => {
      if (!user) {
        return res.status(200).json("invalid user");
      }
      else {
        return res.status(200).json({ msg: "success", result: user });
      }
    })
    .catch(err => {
      return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
    });
};


