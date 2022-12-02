const db = require("../model");
const tutorialSchema = db.tutorial;

//Save data
exports.save = (req, res) => {
    const tutorial = {
        name: req.body.name,
        emailId: req.body.emailId,
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
    const id = req.params.id;

    tutorialSchema.update(req.body, {
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


