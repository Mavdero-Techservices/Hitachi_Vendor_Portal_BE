const db = require("../model");
const imageSchema = db.imageUpload;
//imageUpload
exports.imageUpload = (req, res, next) => {
  const image = new Buffer(req.body.image, 'base64').toString('binary');
  const user = new imageSchema({
    image: image,
  });
  user.save()
    .then(result => {
      return res.status(200).json({ status: "success", message: "image saved Successfully", result });
    })
}
//getImage
exports.getImage = (req, res, next) => {
  imageSchema.findAll()
    .then(data => {
      return res.status(200).json({ msg: "success", result: data });
    })
    .catch(err => {
      return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
    });
}

