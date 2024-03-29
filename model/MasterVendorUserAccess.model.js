module.exports = (sequelize, Sequelize) => {
    const MasterVendorUserAccessSchema = sequelize.define("MasterVendorUserAccess", {
        userId: {
            type: Sequelize.STRING,
        },
        vendorCode: {
            type: Sequelize.STRING,
        },
        city: {
            type: Sequelize.STRING,
        },
        Pincode: {
            type: Sequelize.STRING,
        }
    })
    return MasterVendorUserAccessSchema;
}