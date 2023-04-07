module.exports = (sequelize, Sequelize) => {
    const VendorCodeSchema = sequelize.define("vendorCode", {
        SubUserId: {
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
        },
    })
    return VendorCodeSchema;
}
