module.exports = (sequelize, Sequelize) => {
    const VdetailSchema = sequelize.define("vendorDetail", {
        Address: {
            type: Sequelize.TEXT,
        },
        userId: {
            type: Sequelize.STRING,
          },
        Address_2: {
            type: Sequelize.TEXT,
        },
        country: {
            type: Sequelize.STRING,
        },
        state: {
            type: Sequelize.STRING,
        },
        City: {
            type: Sequelize.STRING,
        },
        pinCode: {
            type: Sequelize.STRING,
        },
        companyName: {
            type: Sequelize.STRING,
        },
        image: {
            type: Sequelize.TEXT('long'),
        },
        Vendor_Type: {
            type: Sequelize.STRING,
        },
        Vendor_Account_Manager: {
            type: Sequelize.STRING        
        },
        mkDenialCheque: {
            type: Sequelize.STRING
        },
        submitStatus: {
            type: Sequelize.STRING
        },
        submitDate: {
            type: Sequelize.DATEONLY
        }
    })
    return VdetailSchema;
}


