module.exports = (sequelize, Sequelize) => {
    const VendorFileSchema = sequelize.define("vendorFile", {
        userId: {
            type: Sequelize.STRING,
        },
        VendorFileDoc: {
            type: Sequelize.STRING,
        }
    })
    return VendorFileSchema;
}
