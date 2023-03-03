module.exports = (sequelize, Sequelize) => {
    const MasterVendorUserAccessSchema = sequelize.define("MasterVendorUserAccess", {
        userId: {
            type: Sequelize.STRING,
        },
        Name: {
            type: Sequelize.STRING,
        },
        city_vendorCode_Pincode: {
            type: Sequelize.STRING,
        },
    })
    return MasterVendorUserAccessSchema;
}