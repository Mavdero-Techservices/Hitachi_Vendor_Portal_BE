module.exports = (sequelize, Sequelize) => {
    const VendorIdSchema = sequelize.define("vendorId", {
        userId: {
            type: Sequelize.STRING,
        },
        docName: {
            type: Sequelize.STRING,
        },
        vendorId: {
            type: Sequelize.STRING,
        }
    })
    return VendorIdSchema;
}
