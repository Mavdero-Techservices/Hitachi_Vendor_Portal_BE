module.exports = (sequelize, Sequelize) => {
    const MasterVendorSubUserSchema = sequelize.define("MasterVendorSubUser", {
        SubUserId: {
            type: Sequelize.STRING,
        },
        userId: {
            type: Sequelize.STRING,
        },
        Name: {
            type: Sequelize.STRING,
        },
        designation: {
            type: Sequelize.STRING,
        },
        Department: {
            type: Sequelize.STRING,
        },
        emailId: {
            type: Sequelize.STRING,
        },
        mobileNo: {
            type: Sequelize.STRING, 
        },
        loginId: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        roles: {
            type: Sequelize.STRING,
        },
        city_vendorCode_Pincode: {
            type: Sequelize.STRING,
        }

    })
    return MasterVendorSubUserSchema;
}