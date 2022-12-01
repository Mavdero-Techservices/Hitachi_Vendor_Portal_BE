const db = require("../model");
const SignUpSchema = db.singUp;

//Save data
exports.postSingUp = (req, res) => {
  const signUp = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    contactNumber: req.body.contactNumber,
  };
  SignUpSchema.create(signUp)
    .then(data => {
      return res.status(200).json({ msg: "success", result: data });
    })
    .catch(err => {
      return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
    });
};
// Find with an id
exports.getUserById = (req, res) => {
  const id = req.params.id;
  SignUpSchema.findByPk(id)
    .then(data => {
      return res.status(200).json({ msg: "success", result: data });
    })
    .catch(err => {
      return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
    });
};

// Update by id in the request
exports.updateUserById = (req, res) => {
  const id = req.params.id;

  SignUpSchema.update(req.body, {
    where: { id: id }
  })
    .then(data => {
      return res.status(200).json({ msg: "success", result: "updated successfully" });
    })
    .catch(err => {
      return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
    });
};

// Delete with the specified id in the request
exports.deleteUserById = (req, res) => {
  const id = req.params.id;
  SignUpSchema.destroy({
    where: { id: id }
  })
    .then(data => {
      return res.status(200).json({ msg: "success", result: "deleted successfully" });
    })
    .catch(err => {
      return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
    });
};


